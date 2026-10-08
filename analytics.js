/**
 * Analytics API routes (mounted at /api/analytics).
 * Owns: POST /event (ingest), GET /summary (machine-readable for Data agent).
 * Does NOT own: /admin/analytics dashboard (that lives in routes/pages.js), subscriber logic, product data.
 */
const express = require('express');
const router = express.Router();
const { recordEvent, getSummary } = require('../db/analytics');

// Ingest a client-side event. Fire-and-forget — always 200 to the client.
router.post('/event', async (req, res) => {
  try {
    const { eventType, eventData, pageUrl, referrer, sessionId } = req.body;
    if (!eventType) return res.status(400).json({ ok: false, error: 'eventType required' });

    // Fire-and-forget — do not block the client on DB latency
    recordEvent({
      eventType,
      eventData: eventData || {},
      pageUrl: pageUrl || req.headers['referer'] || null,
      referrer: referrer || req.headers['referer'] || null,
      userAgent: req.headers['user-agent'] || null,
      sessionId: sessionId || null,
    }).catch((err) => console.error('[analytics] recordEvent error:', err));

    res.json({ ok: true });
  } catch (err) {
    console.error('[analytics] event endpoint error:', err);
    res.json({ ok: true }); // Never fail silently from client's perspective
  }
});

// Machine-readable summary for the Data agent.
router.get('/summary', async (req, res) => {
  try {
    const data = await getSummary();
    res.json({ ok: true, generatedAt: new Date().toISOString(), ...data });
  } catch (err) {
    console.error('[analytics] summary error:', err);
    res.status(500).json({ ok: false, error: 'Failed to load summary' });
  }
});

module.exports = router;
