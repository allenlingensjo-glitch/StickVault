/**
 * Admin API routes.
 * Owns: /api/admin/analytics JSON endpoint.
 * Does NOT own: HTML admin pages (those live in routes/pages.js), auth logic (middleware/admin-auth.js).
 */
const express = require('express');
const router = express.Router();
const { getAnalytics } = require('../db/page-views');
const { getAllSubscribers } = require('../db/subscribers');

// GET /api/admin/analytics — JSON analytics dashboard
router.get('/analytics', async (req, res) => {
  try {
    const data = await getAnalytics();
    res.json({ ok: true, generatedAt: new Date().toISOString(), ...data });
  } catch (err) {
    console.error('[admin/analytics] error:', err);
    res.status(500).json({ ok: false, error: 'Failed to load analytics' });
  }
});

// GET /api/admin/subscribers/export — download all subscribers as CSV
router.get('/subscribers/export', async (req, res) => {
  try {
    const subscribers = await getAllSubscribers('created_at', 'DESC');
    const header = 'email,source,created_at';
    const rows = subscribers.map(s =>
      `"${s.email}","${s.source}","${s.created_at.toISOString()}"`
    );
    const csv = [header, ...rows].join('\n');
    const timestamp = new Date().toISOString().slice(0, 10);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="subscribers-${timestamp}.csv"`);
    res.send(csv);
  } catch (err) {
    console.error('[admin/subscribers/export] error:', err);
    res.status(500).json({ ok: false, error: 'Failed to export subscribers' });
  }
});

module.exports = router;