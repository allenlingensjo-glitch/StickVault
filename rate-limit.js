/**
 * Rate limiting middleware configs.
 * Owns: per-endpoint rate limits for API abuse prevention.
 * Does NOT own: auth, CORS, security headers.
 */
const rateLimit = require('express-rate-limit');

// Shared config: trust proxy (Render sits behind a reverse proxy)
const baseConfig = {
  standardHeaders: true,  // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false,   // Disable `X-RateLimit-*` headers
};

// General API limit — 100 req/min per IP
const apiLimiter = rateLimit({
  ...baseConfig,
  windowMs: 60 * 1000,
  max: 100,
  message: { error: 'Too many requests. Try again in a minute.' },
});

// Strict limiter for form submissions (subscribe, contact) — 5 req/min
const formLimiter = rateLimit({
  ...baseConfig,
  windowMs: 60 * 1000,
  max: 5,
  message: { error: 'Too many submissions. Try again in a minute.' },
});

// Admin API write operations — 20 req/min
const adminWriteLimiter = rateLimit({
  ...baseConfig,
  windowMs: 60 * 1000,
  max: 20,
  message: { error: 'Too many admin requests. Slow down.' },
});

// Redirect abuse prevention — 60 req/min per IP
const redirectLimiter = rateLimit({
  ...baseConfig,
  windowMs: 60 * 1000,
  max: 60,
  message: 'Too many redirects. Try again in a minute.',
});

// Analytics event ingestion — 120 req/min per IP (clients fire events frequently)
const analyticsLimiter = rateLimit({
  ...baseConfig,
  windowMs: 60 * 1000,
  max: 120,
  message: { ok: true }, // Never fail from client's perspective — just drop
});

module.exports = {
  apiLimiter,
  formLimiter,
  adminWriteLimiter,
  redirectLimiter,
  analyticsLimiter,
};
