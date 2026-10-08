/**
 * routes/pinterest-dashboard-page.js
 * Owns: /admin/pinterest-dashboard HTML page render.
 * Does NOT own: API endpoints (routes/pinterest-dashboard.js), pin generation.
 */
const express = require('express');
const router = express.Router();
const pool = require('../db');
const { getDashboardPins } = require('../db/pinterest-pins');

const SITE_URL = process.env.SITE_URL || 'https://www.stickvault.com';
const PINTEREST_TAG_ID = process.env.PINTEREST_TAG_ID || '549769429445';

// GET /admin/pinterest-dashboard
router.get('/pinterest-dashboard', async (req, res) => {
  try {
    const pins = await getDashboardPins({});

    // Resolve affiliate links for blog-linked pins
    const blogSlugs = [...new Set(pins.map(p => p.blog_slug).filter(Boolean))];
    let affiliateSlugs = new Set();
    if (blogSlugs.length) {
      const { rows } = await pool.query(
        'SELECT slug FROM affiliate_links WHERE slug = ANY($1::text[]) AND is_active = true',
        [blogSlugs]
      );
      affiliateSlugs = new Set(rows.map(r => r.slug));
    }

    const enriched = pins.map(pin => ({
      ...pin,
      has_affiliate_link: pin.blog_slug ? affiliateSlugs.has(pin.blog_slug) : false,
    }));

    const total = enriched.length;
    const postedCount = enriched.filter(p => p.posting_status === 'Posted').length;

    res.render('admin/pinterest-dashboard', {
      title: 'Pinterest Posting Dashboard — StickVault',
      noindex: true,
      siteUrl: SITE_URL,
      pinterestTagId: PINTEREST_TAG_ID,
      pins: enriched,
      summary: {
        total,
        posted: postedCount,
        not_posted: total - postedCount,
      },
    });
  } catch (err) {
    console.error('[pinterest-dashboard-page] render error:', err.message, err.stack);
    res.status(500).render('error', { message: 'Failed to load Pinterest dashboard.' });
  }
});

module.exports = router;