/**
 * Pinterest distribution routes.
 * Owns: GET /api/pinterest-map — structured JSON reference for all pin funnel data.
 * Does NOT own: pin image generation (routes/pins.js), blog post rendering (routes/blog.js).
 *
 * /api/pinterest-map is the operational reference for manual or automated pinning.
 * Every entry includes: pin titles, optimized description, destination URL,
 * lead magnet URL, product URL, and category — the full funnel in one payload.
 */
const express = require('express');
const router = express.Router();
const { getAllPosts } = require('../db/blog');
const { getAllProducts } = require('../db/products');

const SITE_URL = 'https://www.stickvault.com';

// Lead magnet mapping by category
// collecting → Grading Prep Checklist (email capture)
// side-hustles / routines → Operator's Daily Playbook (email capture)
// drums / hidden-gems → Operator's Daily Playbook (closest fit)
const LEAD_MAGNET_MAP = {
  'collecting':    { name: "Grading Prep Checklist",      url: `${SITE_URL}/free#grading-checklist` },
  'drums':         { name: "Operator's Daily Playbook",   url: `${SITE_URL}/free#daily-playbook` },
  'routines':      { name: "Operator's Daily Playbook",   url: `${SITE_URL}/free#daily-playbook` },
  'side-hustles':  { name: "Operator's Daily Playbook",   url: `${SITE_URL}/free#daily-playbook` },
  'hidden-gems':   { name: "Grading Prep Checklist",      url: `${SITE_URL}/free#grading-checklist` },
};

// Category → product slug mapping (same-category match)
const PRODUCT_SLUG_MAP = {
  'collecting':   'collectors-vault-starter-kit',
  'drums':        'drummers-practice-blueprint',
  'routines':     'morning-routine-master-template',
  'side-hustles': 'side-hustle-launchpad',
  // hidden-gems has no direct product — fallback to collector kit
  'hidden-gems':  'collectors-vault-starter-kit',
};

// GET /api/pinterest-map
// Returns full Pinterest funnel reference for all published posts.
router.get('/', async (req, res) => {
  try {
    const [posts, products] = await Promise.all([getAllPosts(), getAllProducts()]);

    // Index products by slug for fast lookup
    const productIndex = {};
    for (const p of products) {
      productIndex[p.slug] = p;
    }

    const map = posts.map(post => {
      const productSlug = PRODUCT_SLUG_MAP[post.category] || products[0]?.slug;
      const product = productIndex[productSlug] || products[0];
      const leadMagnet = LEAD_MAGNET_MAP[post.category] || LEAD_MAGNET_MAP['collecting'];

      return {
        post_slug:       post.slug,
        category:        post.category,
        pin_image_url:   post.pin_image || null,
        pin_titles:      buildPinTitles(post),
        pin_description: post.pinterest_description || post.excerpt,
        destination_url: `${SITE_URL}/blog/${post.slug}`,
        lead_magnet: {
          name: leadMagnet.name,
          url:  leadMagnet.url,
        },
        product: product ? {
          slug:   product.slug,
          title:  product.title,
          url:    `${SITE_URL}/shop/${product.slug}`,
          price:  `$${(product.price_cents / 100).toFixed(0)}`,
        } : null,
      };
    });

    res.json({
      generated_at: new Date().toISOString(),
      total_pins:   map.length,
      site_url:     SITE_URL,
      pins:         map,
    });
  } catch (err) {
    console.error('Pinterest map error:', err);
    res.status(500).json({ error: 'Failed to build Pinterest map.' });
  }
});

// Build 3-4 pin title variants for A/B testing
// Titles pull from post title with reformatted hooks
function buildPinTitles(post) {
  const base = post.title;
  const category = post.category;

  // Category-specific title hooks
  const hooks = {
    'collecting':   ['The Collector Guide:', 'Vault Method:', 'For Serious Collectors:'],
    'drums':        ['Drummer Playbook:', 'Practice System:', 'For Drummers:'],
    'routines':     ['Morning System:', 'Daily Routine:', 'Vault Method:'],
    'side-hustles': ['Side Hustle Playbook:', 'Income System:', 'Creator Blueprint:'],
    'hidden-gems':  ['Hidden Gem Alert:', 'Overlooked Finds:', 'Vault Picks:'],
  };

  const categoryHooks = hooks[category] || ['Vault Guide:'];

  return [
    base,
    `${categoryHooks[0]} ${base}`,
    `${categoryHooks[1] || categoryHooks[0]} ${base}`,
    reformatAsQuestion(base),
  ].filter(Boolean).slice(0, 4);
}

function reformatAsQuestion(title) {
  // Convert declarative titles to question format for curiosity-click variant
  if (title.includes('How to')) return title.replace('How to', 'How Do You');
  if (title.includes('Building')) return `How to Build ${title.replace(/^Building /, '')}`;
  if (title.includes('The Best')) return `What Are ${title.replace(/^The /, '')}`;
  return `Why ${title}?`;
}

module.exports = router;
