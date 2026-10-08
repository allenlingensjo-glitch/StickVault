/**
 * Affiliate link routes.
 * Owns: /r/:slug branded redirects, /admin/links dashboard,
 *       /api/affiliate/* CRUD + link-checker, /api/admin/check-links.
 * Does NOT own: /affiliate-disclosure page (routes/legal.js owns it),
 *               analytics_events ingest (routes/analytics.js), Stripe logic.
 */
const express = require('express');
const router = express.Router();
const https = require('https');
const http = require('http');
const {
  getLinkBySlug,
  getAllLinks,
  recordClick,
  createLink,
  updateLink,
  resetClicks,
  updateLinkStatus,
  reactivateLink,
} = require('../db/affiliate-links');

// ─── Branded Redirect ────────────────────────────────────────────────────────

router.get('/r/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const link = await getLinkBySlug(slug);
    if (!link) {
      return res.redirect(302, process.env.SITE_URL || 'https://www.stickvault.com');
    }

    // Fire-and-forget click tracking — never block the redirect
    recordClick(link.id).catch((err) => console.error('[affiliate] recordClick error:', err));

    // UTM passthrough — preserve any utm_* params from the inbound request on the destination URL.
    // e.g. /r/psa?utm_source=pinterest passes utm_source through to the affiliate destination.
    const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    const utmFromQuery = UTM_PARAMS.reduce((acc, key) => {
      if (req.query[key]) acc[key] = req.query[key];
      return acc;
    }, {});

    let destination = link.target_url;
    if (Object.keys(utmFromQuery).length > 0) {
      try {
        const destUrl = new URL(destination);
        Object.entries(utmFromQuery).forEach(([k, v]) => destUrl.searchParams.set(k, v));
        destination = destUrl.toString();
      } catch (_) {
        // Malformed target_url — redirect as-is, no UTM appended
      }
    }

    res.redirect(302, destination);
  } catch (err) {
    console.error('[affiliate] redirect error:', err);
    res.redirect(302, process.env.SITE_URL || 'https://www.stickvault.com');
  }
});

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
// Note: /affiliate-disclosure page is owned by routes/legal.js

router.get('/admin/links', async (req, res) => {
  try {
    const links = await getAllLinks();
    res.render('admin/links', {
      title: 'Affiliate Links — StickVault Admin',
      links,
    });
  } catch (err) {
    console.error('[affiliate] admin/links error:', err);
    res.status(500).render('error', { message: 'Failed to load affiliate links.' });
  }
});

// ─── API: CRUD ────────────────────────────────────────────────────────────────

// Create a new link
router.post('/api/affiliate/links', async (req, res) => {
  try {
    const { slug, label, program, target_url, commission_rate, link_type, pillar } = req.body;
    if (!slug || !label || !target_url) {
      return res.status(400).json({ ok: false, error: 'slug, label, and target_url are required' });
    }
    const link = await createLink({ slug, label, program, target_url, commission_rate, link_type, pillar });
    res.json({ ok: true, link });
  } catch (err) {
    // Unique slug violation
    if (err.code === '23505') {
      return res.status(409).json({ ok: false, error: 'Slug already exists' });
    }
    console.error('[affiliate] createLink error:', err);
    res.status(500).json({ ok: false, error: 'Failed to create link' });
  }
});

// Update an existing link
router.patch('/api/affiliate/links/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updated = await updateLink(id, req.body);
    if (!updated) return res.status(404).json({ ok: false, error: 'Link not found' });
    res.json({ ok: true, link: updated });
  } catch (err) {
    console.error('[affiliate] updateLink error:', err);
    res.status(500).json({ ok: false, error: 'Failed to update link' });
  }
});

// Reset clicks for a link
router.post('/api/affiliate/links/:id/reset-clicks', async (req, res) => {
  try {
    await resetClicks(parseInt(req.params.id, 10));
    res.json({ ok: true });
  } catch (err) {
    console.error('[affiliate] resetClicks error:', err);
    res.status(500).json({ ok: false, error: 'Failed to reset clicks' });
  }
});

// Force-reactivate a broken link after upstream fix
router.post('/api/affiliate/links/:id/reactivate', async (req, res) => {
  try {
    await reactivateLink(parseInt(req.params.id, 10));
    res.json({ ok: true });
  } catch (err) {
    console.error('[affiliate] reactivateLink error:', err);
    res.status(500).json({ ok: false, error: 'Failed to reactivate' });
  }
});

// All links as JSON (for CSV export, external tooling)
router.get('/api/affiliate/links', async (req, res) => {
  try {
    const links = await getAllLinks();
    res.json({ ok: true, links });
  } catch (err) {
    console.error('[affiliate] getAllLinks error:', err);
    res.status(500).json({ ok: false, error: 'Failed to load links' });
  }
});

// ─── Broken Link Checker ──────────────────────────────────────────────────────

/**
 * HEAD-check a single URL, returning its HTTP status code.
 * Falls back to GET if HEAD is not supported. Times out at 8s.
 */
function checkUrl(targetUrl) {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => resolve(408), 8000);
    const lib = targetUrl.startsWith('https') ? https : http;
    const req = lib.request(targetUrl, { method: 'HEAD', timeout: 6000 }, (res) => {
      clearTimeout(timeout);
      resolve(res.statusCode);
    });
    req.on('error', () => { clearTimeout(timeout); resolve(0); });
    req.on('timeout', () => { req.destroy(); clearTimeout(timeout); resolve(408); });
    req.end();
  });
}

router.get('/api/admin/check-links', async (req, res) => {
  try {
    const links = await getAllLinks();
    const results = [];

    for (const link of links) {
      const status = await checkUrl(link.target_url);
      await updateLinkStatus(link.id, status);
      results.push({
        id: link.id,
        slug: link.slug,
        label: link.label,
        target_url: link.target_url,
        http_status: status,
        broken: status >= 400 || status === 0,
      });
    }

    const broken = results.filter((r) => r.broken);
    res.json({ ok: true, checked: results.length, broken_count: broken.length, results });
  } catch (err) {
    console.error('[affiliate] check-links error:', err);
    res.status(500).json({ ok: false, error: 'Link check failed' });
  }
});

module.exports = router;
