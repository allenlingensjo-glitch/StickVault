/**
 * Shop routes.
 * Owns: /shop product grid, /shop/:slug product detail, /shop/success payment confirmation.
 * Does NOT own: Stripe payment processing (handled by Stripe links), blog routing.
 */
const express = require('express');
const router = express.Router();
const { getAllProducts, getProductBySlug } = require('../db/products');

// Collecting posts that reference the Collector's Vault Starter Kit — surfaces on product page
const COLLECTOR_KIT_FEATURED_IN = [
  { slug: 'grading-prep-system-before-submitting-to-psa',              title: 'The Grading Prep System: How to Prepare Cards Before Submitting' },
  { slug: 'collector-inventory-organization-system',                   title: 'Collector Inventory Organization: The Spreadsheet System That Works' },
  { slug: 'common-sports-card-collector-mistakes',                     title: 'Common Sports Card Collector Mistakes and How to Avoid Them' },
  { slug: 'collector-value-tracking-system',                           title: 'How to Track Your Sports Card Collection Value Over Time' },
  { slug: 'affordable-collector-tools-under-50',                       title: 'The Best Sports Card Collecting Tools Under $50' },
  { slug: 'pc-building-philosophy-personal-collection-with-intention', title: 'PC Building Philosophy: How to Build a Personal Collection With Intention' },
  { slug: 'sports-card-flipping-workflow-buy-low-sell-high-system',    title: 'The Sports Card Flipping Workflow: Buy Low, Sell High, Track Profit' },
  { slug: 'serious-collector-weekly-routine-workflow-habits',          title: 'The Serious Collector\'s Weekly Routine: Habits and Workflows' },
  { slug: 'ebay-listing-optimization-sports-cards-sell-faster',        title: 'eBay Listing Optimization for Sports Cards: Photos, Titles, Pricing' },
  { slug: 'grading-service-comparison-psa-bgs-sgc-cgc',               title: 'Grading Service Comparison: PSA vs BGS vs SGC vs CGC' },
];

// Shop index
router.get('/', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.render('shop/index', {
      products,
      title: 'Digital Guides for Collectors, Drummers & Side Hustlers — StickVault Shop',
      description: 'Download instantly: sports card collection tracker, drum practice blueprints, side hustle launchpad, and morning routine templates. Built by collectors and creators, for collectors and creators.',
      canonicalPath: '/shop',
      heroImage: 'https://pub-629428d185ca4960a0a73c850d32294b.r2.dev/generated-images/company_122731/0fedbf82-f6cd-4c07-aa2c-dec489480be1.jpg',
    });
  } catch (err) {
    console.error('Shop index error:', err);
    res.status(500).render('error', { message: 'Failed to load shop.' });
  }
});

// Payment success page
router.get('/success', (req, res) => {
  res.render('shop/success', {
    title: 'Purchase Complete — StickVault',
    description: 'Your digital download is on its way.',
    canonicalPath: '/shop/success',
  });
});

// Product detail — must come after /success to avoid slug conflict
router.get('/:slug', async (req, res) => {
  try {
    const product = await getProductBySlug(req.params.slug);
    if (!product) {
      return res.status(404).render('error', { message: 'Product not found.' });
    }

    // BreadcrumbList schema for product pages
    const breadcrumbSchema = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': res.locals.siteUrl },
        { '@type': 'ListItem', 'position': 2, 'name': 'Shop', 'item': `${res.locals.siteUrl}/shop` },
        { '@type': 'ListItem', 'position': 3, 'name': product.title, 'item': `${res.locals.siteUrl}/shop/${product.slug}` },
      ],
    });

    // Product schema.org markup
    const schemaOrg = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': product.title,
      'description': product.long_description || product.description,
      'offers': {
        '@type': 'Offer',
        'price': (product.price_cents / 100).toFixed(2),
        'priceCurrency': 'USD',
        'availability': 'https://schema.org/InStock',
        'url': `${res.locals.siteUrl}/shop/${product.slug}`,
        'seller': {
          '@type': 'Organization',
          'name': 'StickVault',
        },
      },
      'category': product.category,
      'url': `${res.locals.siteUrl}/shop/${product.slug}`,
    });

    res.render('shop/product', {
      product,
      title: `${product.title} — Digital Download | StickVault`,
      description: product.description,
      ogImage: product.cover_image || `${res.locals.siteUrl}/img/og-default.jpg`,
      canonicalPath: `/shop/${product.slug}`,
      schemaOrg,
      breadcrumbSchema,
      // "As referenced in" list — only for the collector kit
      featuredIn: product.slug === 'collectors-vault-starter-kit' ? COLLECTOR_KIT_FEATURED_IN : null,
    });
  } catch (err) {
    console.error('Product detail error:', err);
    res.status(500).render('error', { message: 'Failed to load product.' });
  }
});

module.exports = router;
