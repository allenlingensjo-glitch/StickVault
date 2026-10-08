/**
 * Page view tracking middleware.
 * Owns: recording page views to the page_views table.
 * Does NOT own: analytics_events, blog data, or subscriber logic.
 */
const { recordPageView } = require('../db/page-views');

// Paths to skip: admin, API, health, subscribe, static assets
const SKIP_PREFIXES = ['/admin', '/api', '/health', '/subscribe', '/r/'];
const SKIP_EXTENSIONS = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico', '.woff', '.woff2'];

function shouldSkip(req) {
  if (req.method !== 'GET') return true;
  const url = req.path;
  if (SKIP_PREFIXES.some((p) => url.startsWith(p))) return true;
  if (SKIP_EXTENSIONS.some((ext) => url.endsWith(ext))) return true;
  return false;
}

function pageViewMiddleware(req, res, next) {
  if (shouldSkip(req)) return next();

  // Fire-and-forget — do not block the response on DB latency
  recordPageView({
    path: req.path,
    referrer: req.headers['referer'] || null,
    userAgent: req.headers['user-agent'] || null,
  }).catch((err) => console.error('[page-views] record error:', err));

  next();
}

module.exports = { pageViewMiddleware };