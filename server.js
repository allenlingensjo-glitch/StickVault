const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { buildThemeCSS, buildAnalyticsSnippet } = require('./lib/landing-context');
const { createHelmetMiddleware } = require('./middleware/helmet-config');
const { requireAdmin, adminAuthRoutes } = require('./middleware/admin-auth');
const { apiLimiter, formLimiter, adminWriteLimiter, redirectLimiter, analyticsLimiter } = require('./middleware/rate-limit');
const { pageViewMiddleware } = require('./middleware/page-views');

// ─── In-memory page cache ───────────────────────────────────────────────────
// WHY: TTFB was 1.6-2.8s due to DB-heavy EJS renders. Content changes rarely;
// caching rendered HTML cuts repeat-visit TTFB to <50ms.
const pageCache = new Map();
const CACHE_TTL = {
  blog_post:    300 * 1000, // 5 min — individual blog posts
  listing:      120 * 1000, // 2 min — /blog, /shop
  homepage:      60 * 1000, // 1 min — /
};

function getCacheTTL(urlPath) {
  if (urlPath === '/') return CACHE_TTL.homepage;
  if (urlPath === '/blog' || urlPath === '/shop') return CACHE_TTL.listing;
  if (urlPath.startsWith('/blog/') || urlPath.startsWith('/shop/')) return CACHE_TTL.blog_post;
  return null; // don't cache anything else
}

function pageCacheMiddleware(req, res, next) {
  // Only cache GET requests; skip admin, API, subscribe, health
  if (req.method !== 'GET') return next();
  const url = req.path;
  if (url.startsWith('/admin') || url.startsWith('/api') || url === '/subscribe' || url === '/health') {
    return next();
  }
  const ttl = getCacheTTL(url);
  if (!ttl) return next();

  const cached = pageCache.get(url);
  if (cached && Date.now() < cached.expiresAt) {
    res.setHeader('X-Cache', 'HIT');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // Preserve the original Cache-Control (set by the CC middleware below)
    if (cached.cacheControl) res.setHeader('Cache-Control', cached.cacheControl);
    return res.send(cached.html);
  }

  // Intercept res.render to capture the output
  const originalRender = res.render.bind(res);
  res.__originalRender = originalRender;
  res.render = function(view, locals, callback) {
    originalRender(view, locals, function(err, html) {
      if (!err && html) {
        pageCache.set(url, {
          html,
          expiresAt: Date.now() + ttl,
          cacheControl: res.getHeader('Cache-Control') || null,
        });
      }
      res.setHeader('X-Cache', 'MISS');
      if (callback) return callback(err, html);
      if (err) return next(err);
      res.send(html);
    });
  };
  next();
}

const app = express();
const port = process.env.PORT || 3000;

if (!process.env.DATABASE_URL) {
  console.error('ERROR: DATABASE_URL environment variable is required');
  process.exit(1);
}

// ─── Trust proxy (Render reverse proxy) ────────────────────────────────────
// WHY: Required for secure cookies and accurate rate-limit IP detection behind Render's proxy
app.set('trust proxy', 1);

// ─── Canonical domain redirect ──────────────────────────────────────────────
// WHY: stickvault.com (apex) must 301 to www.stickvault.com with full path preserved.
// GoDaddy forwarding only redirects the root path — subpaths like /blog/... get 404.
// This middleware catches any request that reaches Express on the bare domain.
app.use((req, res, next) => {
  const host = req.hostname;
  if (host === 'stickvault.com') {
    return res.redirect(301, `https://www.stickvault.com${req.originalUrl}`);
  }
  next();
});

// ─── Security headers (Helmet) ─────────────────────────────────────────────
app.use(createHelmetMiddleware());

// ─── Body parsers + cookies ────────────────────────────────────────────────
// Cookie signing secret: ADMIN_TOKEN or a fallback for dev environments
const cookieSecret = process.env.ADMIN_TOKEN || 'REDACTED';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(cookieSecret));

// EJS template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Shared template locals injected on every render
app.use((req, res, next) => {
  res.locals.themeCSS = buildThemeCSS();
  res.locals.analyticsSnippet = buildAnalyticsSnippet(process.env.POLSIA_ANALYTICS_SLUG || '');
  res.locals.siteUrl = process.env.SITE_URL || process.env.RENDER_EXTERNAL_URL || 'https://stickvault.polsia.app';
  res.locals.ga4Id = process.env.GA4_MEASUREMENT_ID || '';
  res.locals.gscVerificationToken = process.env.GSC_VERIFICATION_TOKEN || '';
  res.locals.pinterestVerificationToken = process.env.PINTEREST_VERIFICATION_TOKEN || '';
  res.locals.pinterestTagId = process.env.PINTEREST_TAG_ID || '';
  next();
});

// Static assets — immutable for CSS/JS (fingerprint in query string on deploy), long for images
app.use(express.static(path.join(__dirname, 'public'), {
  index: false,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.css') || filePath.endsWith('.js')) {
      // WHY: immutable tells CDN/browser never to revalidate; safe because Render deploys a fresh
      // URL on every push (cache busting via ?v= query or content-hash). max-age=31536000 = 1 yr.
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.svg') || filePath.endsWith('.webp') || filePath.endsWith('.ico')) {
      res.setHeader('Cache-Control', 'public, max-age=604800, stale-while-revalidate=2592000');
    }
  },
}));

// Health check — required by Render, must not query DB
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Cache-Control headers for CDN/browser — set before pageCacheMiddleware so values are captured
app.use((req, res, next) => {
  const url = req.path;
  if (url.startsWith('/admin') || url.startsWith('/api') || url === '/subscribe' || url === '/health') {
    res.setHeader('Cache-Control', 'no-store');
  } else if (url.startsWith('/blog/') || url.startsWith('/shop/')) {
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400');
  } else if (url === '/blog' || url === '/shop') {
    res.setHeader('Cache-Control', 'public, max-age=120, s-maxage=600, stale-while-revalidate=3600');
  } else if (url === '/') {
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300');
  }
  next();
});

// ─── In-memory page cache (server-side) ────────────────────────────────────
// Must come after Cache-Control middleware (so CC header is already set when captured)
app.use(pageCacheMiddleware);

// ─── Rate limiters (applied before route handlers) ─────────────────────────
app.use('/api/analytics', analyticsLimiter);
app.use('/r/', redirectLimiter);
app.post('/subscribe', formLimiter);

// ─── Page view tracking (fire-and-forget, tracks public page GETs) ────────
app.use(pageViewMiddleware);

// ─── Admin auth: login/logout routes (public, must come before requireAdmin) ─
app.use('/', adminAuthRoutes);

// ─── Admin protection: all /admin/* pages and admin APIs ───────────────────
app.use('/admin', requireAdmin);
app.use('/api/admin', requireAdmin);
app.use('/api/affiliate', requireAdmin);
app.use('/api/pinterest-pins', requireAdmin);
app.use('/api/pinterest-queue', requireAdmin);

// ─── Admin API rate limiting (after auth, before handlers) ─────────────────
app.use('/api/affiliate', adminWriteLimiter);
app.use('/api/admin', adminWriteLimiter);
app.use('/api/pinterest-pins', adminWriteLimiter);

// ─── Cache management endpoint ─────────────────────────────────────────────
app.post('/api/admin/clear-cache', requireAdmin, (req, res) => {
  const count = pageCache.size;
  pageCache.clear();
  res.json({ ok: true, cleared: count });
});

// ─── Route modules ─────────────────────────────────────────────────────────
app.use('/', require('./routes/seo'));
app.use('/', require('./routes/pages'));
app.use('/', require('./routes/health'));
app.use('/blog', require('./routes/blog'));
app.use('/shop', require('./routes/shop'));
app.use('/', require('./routes/pins'));
app.use('/api/pinterest-map', require('./routes/pinterest'));
app.use('/', require('./routes/pinterest-queue'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/', require('./routes/pinterest-pins'));
app.use('/', require('./routes/pinterest-posting-guide'));
app.use('/', require('./routes/legal'));
app.use('/', require('./routes/affiliate'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/admin', require('./routes/pinterest-dashboard'));
app.use('/admin', require('./routes/pinterest-dashboard-page'));
app.use('/admin', require('./routes/referrals'));

// Redirect /products/:slug → /shop/:slug (Pinterest pins used wrong path prefix)
app.get('/products/:slug', (req, res) => {
  res.redirect(301, `/shop/${req.params.slug}`);
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', { message: 'Page not found.' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  // Restore original res.render in case pageCacheMiddleware intercepted it.
  // The middleware marks intercepted res.render objects with __originalRender.
  // This prevents double-error cascading (render error → error handler tries
  // to render with a broken interceptor → Express accesses req.query on broken state).
  if (res.__originalRender) {
    res.render = res.__originalRender;
  }
  res.status(500).render('error', { message: 'Something went wrong.' });
});

// Debug endpoint — reads res.locals set by context middleware to confirm Pinterest tag ID reaches templates
app.get('/api/debug/pinterest', (req, res) => {
  res.json({
    res_locals_pinterestTagId: res.locals.pinterestTagId,
    process_env_PINTEREST_TAG_ID: process.env.PINTEREST_TAG_ID || null
  });
});

app.listen(port, () => {
  console.log(`StickVault running on port ${port}`);
  console.log(`[pinterest] PINTEREST_TAG_ID = ${process.env.PINTEREST_TAG_ID || '(not set)'}`);
});
