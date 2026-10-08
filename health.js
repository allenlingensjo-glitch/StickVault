/**
 * Health check route.
 * Owns: /api/health for uptime monitoring.
 * Does NOT own: any other API endpoints.
 */
const express = require('express');
const router = express.Router();

router.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;