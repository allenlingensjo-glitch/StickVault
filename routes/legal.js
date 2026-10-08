/**
 * Legal page routes.
 * Owns: /privacy-policy, /terms-of-service, /affiliate-disclosure, /cookie-policy
 * Does NOT own: any data routes, API endpoints, or content pages.
 */
const express = require('express');
const router = express.Router();

const SITE_URL = process.env.SITE_URL || 'https://www.stickvault.com';

router.get('/privacy-policy', (req, res) => {
  res.render('privacy-policy', {
    title: 'Privacy Policy | StickVault',
    description: 'How StickVault collects, uses, and protects your information.',
    canonicalUrl: `${SITE_URL}/privacy-policy`,
    noindex: true,
  });
});

router.get('/terms-of-service', (req, res) => {
  res.render('terms-of-service', {
    title: 'Terms of Service | StickVault',
    description: 'Terms and conditions governing your use of StickVault.',
    canonicalUrl: `${SITE_URL}/terms-of-service`,
    noindex: true,
  });
});

router.get('/affiliate-disclosure', (req, res) => {
  res.render('affiliate-disclosure', {
    title: 'Affiliate Disclosure | StickVault',
    description: 'FTC-compliant disclosure of StickVault\'s affiliate relationships and how affiliate links are identified.',
    canonicalUrl: `${SITE_URL}/affiliate-disclosure`,
    noindex: true,
  });
});

router.get('/cookie-policy', (req, res) => {
  res.render('cookie-policy', {
    title: 'Cookie Policy | StickVault',
    description: 'How StickVault uses cookies for analytics, affiliate tracking, and essential site functions.',
    canonicalUrl: `${SITE_URL}/cookie-policy`,
    noindex: true,
  });
});

module.exports = router;
