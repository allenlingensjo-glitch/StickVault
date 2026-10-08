/**
 * Admin authentication middleware.
 * Owns: admin login/logout, session cookie verification for /admin/* and /api/admin/* routes.
 * Does NOT own: user registration, public routes, rate limiting.
 *
 * Auth model: single admin token stored in ADMIN_TOKEN env var.
 * Admin enters the token on /admin/login → signed cookie set → middleware checks cookie.
 * API callers can also use Bearer token in Authorization header.
 */
const express = require('express');
const router = express.Router();

const COOKIE_NAME = 'sv_admin';
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Check if the request has valid admin credentials.
 * Accepts: signed cookie, unsigned cookie, Bearer header, or ?token= query param.
 */
function requireAdmin(req, res, next) {
  const token = process.env.ADMIN_TOKEN;
  if (!token) {
    // No ADMIN_TOKEN configured — block all admin access as a safety measure
    return res.status(503).json({ error: 'Admin access not configured' });
  }

  // Check signed cookie first (set by server-side POST handler)
  const signedToken = req.signedCookies && req.signedCookies[COOKIE_NAME];
  if (signedToken === token) {
    return next();
  }
  // Also accept unsigned cookie (set client-side when ?token= in URL)
  const unsignedToken = req.cookies && req.cookies[COOKIE_NAME];
  if (unsignedToken === token) {
    return next();
  }

  // Check Authorization header (for API clients)
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ') && authHeader.slice(7) === token) {
    return next();
  }

  // Check ?token= query param (for direct deep links to admin pages)
  const queryToken = req.query && req.query.token;
  if (queryToken === token) {
    return next();
  }

  // Not authenticated — API endpoints return 401 JSON, HTML pages redirect to login
  // WHY originalUrl: when mounted as app.use('/api/admin', requireAdmin), req.path is relative
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  // Redirect to login with return URL
  const returnUrl = encodeURIComponent(req.originalUrl);
  return res.redirect(302, `/admin/login?return=${returnUrl}`);
}

// ─── Login page (GET) ────────────────────────────────────────────────────────
router.get('/admin/login', (req, res) => {
  const error = req.query.error || '';
  const returnUrl = req.query.return || '/admin/analytics';
  res.render('admin/login', {
    title: 'Admin Login — StickVault',
    noindex: true,
    error,
    returnUrl,
  });
});

// ─── Login handler (POST) ────────────────────────────────────────────────────
router.post('/admin/login', (req, res) => {
  const { token } = req.body;
  const expected = process.env.ADMIN_TOKEN;

  if (!expected) {
    return res.redirect(302, '/admin/login?error=not_configured');
  }

  if (!token || token !== expected) {
    const returnUrl = encodeURIComponent(req.body.returnUrl || '/admin/analytics');
    return res.redirect(302, `/admin/login?error=invalid&return=${returnUrl}`);
  }

  // Set signed cookie and redirect to the requested admin page
  const returnUrl = req.body.returnUrl || '/admin/analytics';
  res.cookie(COOKIE_NAME, token, {
    signed: true,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' || process.env.RENDER === 'true',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
  res.redirect(302, returnUrl);
});

// ─── Logout handler ──────────────────────────────────────────────────────────
router.get('/admin/logout', (req, res) => {
  res.clearCookie(COOKIE_NAME, { path: '/' });
  res.redirect(302, '/');
});

module.exports = { requireAdmin, adminAuthRoutes: router };
