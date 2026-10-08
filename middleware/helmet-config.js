/**
 * Helmet.js security headers configuration.
 * Owns: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy.
 * Does NOT own: CORS, auth, rate limiting.
 */
const helmet = require('helmet');

function createHelmetMiddleware() {
  return helmet({
    // Content Security Policy — permissive enough for EJS inline styles/scripts,
    // Google Fonts, GA4, and Polsia analytics, but blocks everything else.
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'", // Required: cookie-consent, JSON-LD schema, inline analytics
          'https://www.googletagmanager.com',
          'https://www.google-analytics.com',
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'", // Required: <%- themeCSS %> inline injection + admin HTML pages
          'https://fonts.googleapis.com',
        ],
        fontSrc: [
          "'self'",
          'https://fonts.gstatic.com',
        ],
        imgSrc: [
          "'self'",
          'data:',
          'https://*.polsia.app',
          'https://polsia.com',
          'https://www.google-analytics.com',
          'https://www.googletagmanager.com',
        ],
        connectSrc: [
          "'self'",
          'https://www.google-analytics.com',
          'https://www.googletagmanager.com',
          'https://analytics.google.com',
          'https://*.polsia.app',
        ],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        upgradeInsecureRequests: [],
      },
    },
    // X-Frame-Options — prevent clickjacking
    frameguard: { action: 'deny' },
    // HSTS — force HTTPS for 1 year, include subdomains
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    // Prevent MIME-type sniffing
    noSniff: true,
    // Referrer-Policy — send origin only on cross-origin, full on same-origin
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    // Hide X-Powered-By header
    hidePoweredBy: true,
    // DNS Prefetch Control — allow for performance
    dnsPrefetchControl: { allow: true },
  });
}

module.exports = { createHelmetMiddleware };
