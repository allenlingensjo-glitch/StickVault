/**
 * routes/pinterest-dashboard.js
 * Owns: Pinterest posting dashboard API endpoints.
 *   GET  /api/admin/pinterest-dashboard — all pins with blog post data + affiliate status
 *   PATCH /api/admin/pinterest-pins/:id — update posting_status / notes / published_date / scheduled_date
 * Does NOT own: pin generation (routes/pinterest-pins.js), analytics.
 */
const express = require('express');
const router = express.Router();
const pool = require('../db');
const {
  getDashboardPins,
  updatePinPostingData,
} = require('../db/pinterest-pins');

const SITE_URL = process.env.SITE_URL || 'https://www.stickvault.com';

const VALID_CATEGORIES = ['drums', 'collecting', 'side-hustles', 'routines', 'hidden-gems'];
const VALID_STATUSES = ['posted', 'not_posted'];
const VALID_SORT = ['title', 'category', 'status', 'scheduled_date', 'pin_number'];

function isIsoDate(val) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(val));
}

async function resolveAffiliateStatus(blogSlugs) {
  if (!blogSlugs.length) return new Set();
  const { rows } = await pool.query(
    'SELECT slug FROM affiliate_links WHERE slug = ANY($1::text[]) AND is_active = true',
    [blogSlugs]
  );
  return new Set(rows.map(r => r.slug));
}

// GET /api/admin/pinterest-dashboard
router.get('/pinterest-dashboard', async (req, res) => {
  const { status, category, sort } = req.query;

  if (status && !VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Invalid status. Must be one of: posted, not_posted' });
  }
  if (category && !VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({ error: 'Invalid category.' });
  }
  if (sort && !VALID_SORT.includes(sort)) {
    return res.status(400).json({ error: 'Invalid sort.' });
  }

  try {
    const pins = await getDashboardPins({ status, category, sort });
    const blogSlugs = [...new Set(pins.map(p => p.blog_slug).filter(Boolean))];
    const activeSlugs = await resolveAffiliateStatus(blogSlugs);

    const enriched = pins.map(pin => ({
      ...pin,
      has_affiliate_link: pin.blog_slug ? activeSlugs.has(pin.blog_slug) : false,
    }));

    const total = enriched.length;
    const postedCount = enriched.filter(p => p.posting_status === 'Posted').length;

    res.json({
      site_url: SITE_URL,
      pins: enriched,
      summary: { total, posted: postedCount, not_posted: total - postedCount },
      filters_applied: { status: status || null, category: category || null, sort: sort || 'pin_number' },
    });
  } catch (err) {
    console.error('[pinterest-dashboard] GET error:', err.message);
    res.status(500).json({ error: 'Failed to load dashboard data' });
  }
});

// PATCH /api/admin/pinterest-pins/:id
router.patch('/pinterest-pins/:id', async (req, res) => {
  const pinId = parseInt(req.params.id, 10);
  if (isNaN(pinId) || pinId < 1 || pinId > 30) {
    return res.status(400).json({ error: 'Invalid pin ID. Must be an integer 1-30.' });
  }

  const { posting_status, notes, published_date, scheduled_date } = req.body;

  if (posting_status !== undefined) {
    if (!['Not Posted', 'Posted', 'Needs Edit'].includes(posting_status)) {
      return res.status(400).json({ error: 'Invalid posting_status.' });
    }
  }

  if (published_date !== undefined && published_date !== null && !isIsoDate(published_date)) {
    return res.status(400).json({ error: 'published_date must be YYYY-MM-DD or null' });
  }
  if (scheduled_date !== undefined && scheduled_date !== null && !isIsoDate(scheduled_date)) {
    return res.status(400).json({ error: 'scheduled_date must be YYYY-MM-DD or null' });
  }

  const fields = {};
  if (posting_status !== undefined)  fields.posting_status = posting_status;
  if (notes !== undefined)            fields.notes = notes;
  if (published_date !== undefined)  fields.published_date = published_date;
  if (scheduled_date !== undefined)  fields.scheduled_date = scheduled_date;

  if (Object.keys(fields).length === 0) {
    return res.status(400).json({ error: 'No valid fields provided to update' });
  }

  try {
    const updated = await updatePinPostingData(pinId, fields);
    if (!updated) {
      return res.status(404).json({ error: 'Pin not found' });
    }
    res.json({
      ok: true,
      pin: {
        pin_number: updated.pin_number,
        posting_status: updated.posting_status,
        notes: updated.notes,
        published_date: updated.published_date,
        scheduled_date: updated.scheduled_date,
        updated_at: updated.updated_at,
      },
    });
  } catch (err) {
    console.error('[pinterest-dashboard] PATCH error:', err.message);
    res.status(500).json({ error: 'Failed to update pin' });
  }
});

module.exports = router;