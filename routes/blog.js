/**
 * Blog routes.
 * Owns: /blog listing (with optional ?category= filter) and /blog/:slug post detail.
 * Does NOT own: shop routes, email capture, homepage rendering.
 */
const express = require('express');
const router = express.Router();
const { getAllPosts, getPostBySlug } = require('../db/blog');
const { getAllProducts } = require('../db/products');

const VALID_CATEGORIES = ['drums', 'collecting', 'side-hustles', 'routines', 'hidden-gems'];

// Category display names and SEO titles
const CATEGORY_META = {
  'drums': {
    display: 'Drums',
    title: 'Drum Practice Tips, Routines & Gear — StickVault',
    description: 'Deep dives on building drum practice routines, finding hidden-gem gear, and developing real skills. For the serious drummer who wants to improve systematically.',
  },
  'collecting': {
    display: 'Cards & Collecting',
    title: 'Sports Card Grading, Collecting Tips & Investor Strategies — StickVault',
    description: 'How to grade sports cards, track collection value, find undervalued cards, and build a PC (personal collection). Real collector knowledge, no fluff.',
  },
  'side-hustles': {
    display: 'Side Hustles',
    title: 'Side Hustle Ideas for Collectors & Creators — StickVault',
    description: 'How to turn your collection or skill into income. eBay selling strategies, card flipping playbooks, and no-fluff 30-day launch frameworks.',
  },
  'routines': {
    display: 'Routines',
    title: 'Morning Routines & Systems for Creators — StickVault',
    description: 'Discipline systems and daily routines for creative people. Morning rituals that work for night owls, habit stacking guides, and focus frameworks.',
  },
  'hidden-gems': {
    display: 'Hidden Gems',
    title: 'Underrated Cards, Gear & Finds — StickVault Hidden Gems',
    description: 'The underrated cards worth watching, hidden-gem drum gear under $50, and collectibles most people sleep on. Curated finds from deep in the vault.',
  },
};

// Blog index — optional ?category= query param
router.get('/', async (req, res) => {
  try {
    const category = VALID_CATEGORIES.includes(req.query.category) ? req.query.category : null;
    const posts = await getAllPosts({ category });
    // Pinterest pin R2 URLs (pub-629428d185ca4960.r2.dev/company_122731/images/*.png) are not
    // accessible from the browser — use blog_posts.pin_image directly (www.stickvault.com/pins/).
    posts.forEach(post => { post.heroPinUrl = null; });
    const meta = category ? CATEGORY_META[category] : null;
    const canonicalPath = category ? `/blog?category=${category}` : '/blog';
    res.render('blog/index', {
      posts,
      activeCategory: category,
      categories: VALID_CATEGORIES,
      title: meta ? meta.title : 'The Vault Blog — Sports Cards, Drums, Side Hustles & More',
      description: meta ? meta.description : 'Deep dives on sports card collecting and grading, drum practice routines, side hustles, morning systems, and hidden-gem finds. Real knowledge, no filler.',
      canonicalPath,
      heroImage: 'https://pub-629428d185ca4960a0a73c850d32294b.r2.dev/generated-images/company_122731/69f0228a-bfc5-482c-82b1-6a932c9f0244.jpg',
    });
  } catch (err) {
    console.error('Blog index error:', err);
    res.status(500).render('error', { message: 'Failed to load blog posts.' });
  }
});

// 301 redirects: Pinterest pins were posted with short slugs that don't exist.
// Map old broken slugs → real published slugs so already-shared links still work.
const SLUG_REDIRECTS = {
  'grading-guide':               'grading-service-comparison-psa-bgs-sgc-cgc',
  'grading-comparison':          'grading-service-comparison-psa-bgs-sgc-cgc',
  'card-flipping':               'sports-card-flipping-workflow-buy-low-sell-high-system',
  'collecting-routine':          'serious-collector-weekly-routine-workflow-habits',
  'paradiddle-playbook':         'paradiddle-playbook-exercises-speed-control',
  'stick-control-guide':         'stick-control-drummers-secret-weapon',
  'drummer-practice-routine':    'drum-practice-routine-that-actually-sticks',
  'flow-state-drumming':         'flow-state-drumming-when-practice-becomes-play',
  'weekly-review-systems':       'weekly-review-operators-checkpoint',
  'consistency-without-motivation': 'building-consistency-without-motivation',
  'underrated-gear':             'hidden-gem-drum-gear-under-50',
  'hidden-gems-overview':        'hidden-gems-discogs-strategies-worth-knowing',
  // Pinterest posting schedule had old slugs that don't exist — map to current posts
  'what-card-grading-services-look-for':        'how-to-grade-sports-cards-psa-guide-for-beginners',
  'affordable-starter-guide-sports-card-collecting': 'affordable-collector-tools-under-50',
  // Planned but never written; redirect to closest existing drums post
  'drum-exercises-for-busy-schedules':          'building-your-first-drum-practice-routine',
  // old Pinterest pin slugs — morning-vault was never written as a standalone post
  'morning-vault-systems-based-morning-routine': 'building-consistency-without-motivation',
};

// Grading fee & turnaround reference — dedicated route with Product/Service
// schema for external citation. Mounted ABOVE the `:slug` catch-all so the
// explicit path resolves before the param route fires.
router.get('/grading-fee-turnaround-reference', async (req, res) => {
  try {
    const post = await getPostBySlug('grading-fee-turnaround-reference');
    if (!post) {
      return res.status(404).render('error', { message: 'Post not found.' });
    }

    // Same related-content enrichment as the :slug handler
    let relatedProduct = null;
    let relatedPosts = [];
    const heroPinUrl = null;
    try {
      const [products, allPosts] = await Promise.all([
        getAllProducts(),
        getAllPosts({ category: post.category }),
      ]);
      relatedProduct = products.find(p => p.category === post.category) || products[0] || null;
      relatedPosts = allPosts
        .filter(p => p.slug !== post.slug)
        .slice(0, 3);
      if (relatedPosts.length < 3) {
        const crossPosts = (await getAllPosts()).filter(p => p.slug !== post.slug && p.category !== post.category);
        relatedPosts = [...relatedPosts, ...crossPosts].slice(0, 3);
      }
    } catch (_) { /* non-fatal */ }

    const postUrl = `${res.locals.siteUrl}/blog/${post.slug}`;

    // Per-tier offer data — must stay in sync with the body table. Hobby blogs,
    // wikis, and price trackers cite these rows directly.
    const offers = [
      { grader: 'PSA', tier: 'Value / Bulk', cap: 199,    fee: 18,  window: '8-14 weeks',    url: 'https://www.psacard.com/services/tradingcardgrading' },
      { grader: 'PSA', tier: 'Regular',    cap: 499,    fee: 25,  window: '4-8 weeks',     url: 'https://www.psacard.com/services/tradingcardgrading' },
      { grader: 'PSA', tier: 'Express',    cap: 1499,   fee: 75,  window: '2-4 weeks',     url: 'https://www.psacard.com/services/tradingcardgrading' },
      { grader: 'PSA', tier: 'WalkThrough', cap: 10000, fee: 150, window: 'Same day-1 wk', url: 'https://www.psacard.com/services/tradingcardgrading' },
      { grader: 'BGS', tier: 'Economy',    cap: 199,    fee: 18,  window: '6-12 weeks',    url: 'https://www.beckett.com/grading' },
      { grader: 'BGS', tier: 'Standard',   cap: 499,    fee: 30,  window: '3-6 weeks',     url: 'https://www.beckett.com/grading' },
      { grader: 'BGS', tier: 'Express',    cap: 1499,   fee: 75,  window: '1-3 weeks',     url: 'https://www.beckett.com/grading' },
      { grader: 'BGS', tier: 'WalkThrough', cap: 10000, fee: 150, window: 'Same day-1 wk', url: 'https://www.beckett.com/grading' },
      { grader: 'SGC', tier: 'Economy',    cap: 199,    fee: 15,  window: '4-8 weeks',     url: 'https://www.sgccards.com/grading/' },
      { grader: 'SGC', tier: 'Standard',   cap: 499,    fee: 25,  window: '2-4 weeks',     url: 'https://www.sgccards.com/grading/' },
      { grader: 'SGC', tier: 'Express',    cap: 1499,   fee: 60,  window: '1-2 weeks',     url: 'https://www.sgccards.com/grading/' },
      { grader: 'SGC', tier: 'Premier',    cap: 10000,  fee: 150, window: 'Same day-1 wk', url: 'https://www.sgccards.com/grading/' },
      { grader: 'CGC', tier: 'Economy',    cap: 199,    fee: 25,  window: '4-8 weeks',     url: 'https://www.cgccards.com/' },
      { grader: 'CGC', tier: 'Standard',   cap: 499,    fee: 30,  window: '2-4 weeks',     url: 'https://www.cgccards.com/' },
      { grader: 'CGC', tier: 'Express',    cap: 1499,   fee: 75,  window: '1-3 weeks',     url: 'https://www.cgccards.com/' },
      { grader: 'CGC', tier: 'WalkThrough', cap: 10000, fee: 150, window: 'Same day-1 wk', url: 'https://www.cgccards.com/' },
    ];

    // @graph bundles editorial Article (for ranking) AND the Product/Service
    // (the actual reference structure hobby blogs can cite). Single-page
    // structured-data validation requires exactly one top-level @context.
    const schemaOrg = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          'headline': post.title,
          'description': post.excerpt,
          'image': post.pin_image || post.cover_image || res.locals.siteUrl + '/img/og-default.jpg',
          'datePublished': post.created_at,
          'dateModified': post.updated_at || post.created_at,
          'author': { '@type': 'Organization', 'name': 'StickVault', 'url': res.locals.siteUrl },
          'publisher': {
            '@type': 'Organization',
            'name': 'StickVault',
            'url': res.locals.siteUrl,
            'logo': { '@type': 'ImageObject', 'url': res.locals.siteUrl + '/img/og-default.jpg' },
          },
          'mainEntityOfPage': { '@type': 'WebPage', '@id': postUrl },
          'url': postUrl,
          'articleSection': formatCategory(post.category),
          'keywords': buildKeywords(post.category, post.title),
        },
        {
          '@type': ['Product', 'Service'],
          'name': 'PSA vs BGS vs SGC vs CGC Fee & Turnaround Reference (2026)',
          'serviceType': 'Third-party card authentication and grading',
          'description': post.excerpt,
          'url': postUrl,
          'provider': [
            { '@type': 'Organization', 'name': 'PSA — Professional Sports Authenticator', 'url': 'https://www.psacard.com/' },
            { '@type': 'Organization', 'name': 'BGS — Beckett Grading Services',           'url': 'https://www.beckett.com/grading' },
            { '@type': 'Organization', 'name': 'SGC — Sportscard Guaranty',                'url': 'https://www.sgccards.com/' },
            { '@type': 'Organization', 'name': 'CGC — Certified Guaranty Company',         'url': 'https://www.cgccards.com/' },
          ],
          'hasOfferCatalog': {
            '@type': 'OfferCatalog',
            'name': 'Grader × Tier Fee & Turnaround Grid',
            'itemListElement': offers.map(function (o) {
              return {
                '@type': 'OfferCatalog',
                'name': o.grader + ' — ' + o.tier,
                'itemListElement': [{
                  '@type': 'Offer',
                  'name': o.grader + ' ' + o.tier + ' grading',
                  'category': 'Card grading',
                  'priceCurrency': 'USD',
                  'price': o.fee,
                  'eligibleQuantity': { '@type': 'QuantitativeValue', 'value': 1, 'unitText': 'card' },
                  'availability': 'https://schema.org/InStock',
                  'priceValidUntil': new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0],
                  'url': o.url,
                  'seller': { '@type': 'Organization', 'name': o.grader },
                  'description': o.grader + ' ' + o.tier + ' tier: declared value cap $' + o.cap + ', ' + o.window + ' turnaround.',
                }],
              };
            }),
          },
        },
      ],
    });

    const breadcrumbSchema = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': res.locals.siteUrl },
        { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': res.locals.siteUrl + '/blog' },
        { '@type': 'ListItem', 'position': 3, 'name': formatCategory(post.category), 'item': `${res.locals.siteUrl}/blog?category=${post.category}` },
        { '@type': 'ListItem', 'position': 4, 'name': post.title, 'item': postUrl },
      ],
    });

    const ogImage = post.pin_image || post.cover_image || `${res.locals.siteUrl}/img/og-default.jpg`;
    const ogImageWidth = '1000';
    const ogImageHeight = '1500';

    res.render('blog/grading-fee-turnaround-reference', {
      post,
      title: buildPostTitle(post),
      description: post.excerpt,
      ogImage,
      ogType: 'article',
      ogTitle: post.title,
      pinterestDescription: post.pinterest_description || post.excerpt,
      canonicalPath: `/blog/${post.slug}`,
      canonicalUrl: postUrl,
      schemaOrg,
      breadcrumbSchema,
      relatedProduct,
      relatedPosts,
      ogImageWidth,
      ogImageHeight,
      heroPinUrl,
      articlePublishedTime: new Date(post.created_at).toISOString(),
      articleModifiedTime: new Date(post.updated_at || post.created_at).toISOString(),
      articleSection: formatCategory(post.category),
    });
  } catch (err) {
    console.error('Grading fee reference error:', err);
    res.status(500).render('error', { message: 'Failed to load post.' });
  }
});

// Grading decision cheat sheet — printable one-page view pairing the
// decision matrix with the inline profit estimator. Mounted ABOVE the
// `:slug` catch-all so the explicit path resolves before the param route.
router.get('/grading-decision-cheat-sheet', async (req, res) => {
  try {
    const post = await getPostBySlug('grading-decision-cheat-sheet');
    if (!post) {
      return res.status(404).render('error', { message: 'Post not found.' });
    }

    let relatedProduct = null;
    let relatedPosts = [];
    const heroPinUrl = null;
    try {
      const [products, allPosts] = await Promise.all([
        getAllProducts(),
        getAllPosts({ category: post.category }),
      ]);
      relatedProduct = products.find(p => p.category === post.category) || products[0] || null;
      relatedPosts = allPosts
        .filter(p => p.slug !== post.slug)
        .slice(0, 3);
      if (relatedPosts.length < 3) {
        const crossPosts = (await getAllPosts()).filter(p => p.slug !== post.slug && p.category !== post.category);
        relatedPosts = [...relatedPosts, ...crossPosts].slice(0, 3);
      }
    } catch (_) { /* non-fatal */ }

    const postUrl = `${res.locals.siteUrl}/blog/${post.slug}`;

    const schemaOrg = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': post.title,
      'description': post.excerpt,
      'image': post.pin_image || post.cover_image || res.locals.siteUrl + '/img/og-default.jpg',
      'datePublished': post.created_at,
      'dateModified': post.updated_at || post.created_at,
      'author': {
        '@type': 'Organization',
        'name': 'StickVault',
        'url': res.locals.siteUrl,
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'StickVault',
        'url': res.locals.siteUrl,
        'logo': {
          '@type': 'ImageObject',
          'url': res.locals.siteUrl + '/img/og-default.jpg',
        },
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': postUrl,
      },
      'url': postUrl,
      'articleSection': formatCategory(post.category),
      'keywords': buildKeywords(post.category, post.title),
    });

    const breadcrumbSchema = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': res.locals.siteUrl },
        { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': res.locals.siteUrl + '/blog' },
        { '@type': 'ListItem', 'position': 3, 'name': formatCategory(post.category), 'item': `${res.locals.siteUrl}/blog?category=${post.category}` },
        { '@type': 'ListItem', 'position': 4, 'name': post.title, 'item': postUrl },
      ],
    });

    const ogImage = post.pin_image || post.cover_image || `${res.locals.siteUrl}/img/og-default.jpg`;
    const ogImageWidth = '1000';
    const ogImageHeight = '1500';

    res.render('blog/grading-decision-cheat-sheet', {
      post,
      title: buildPostTitle(post),
      description: post.excerpt,
      ogImage,
      ogType: 'article',
      ogTitle: post.title,
      pinterestDescription: post.pinterest_description || post.excerpt,
      canonicalPath: `/blog/${post.slug}`,
      canonicalUrl: postUrl,
      schemaOrg,
      breadcrumbSchema,
      relatedProduct,
      relatedPosts,
      ogImageWidth,
      ogImageHeight,
      heroPinUrl,
      articlePublishedTime: new Date(post.created_at).toISOString(),
      articleModifiedTime: new Date(post.updated_at || post.created_at).toISOString(),
      articleSection: formatCategory(post.category),
    });
  } catch (err) {
    console.error('Grading decision cheat sheet error:', err);
    res.status(500).render('error', { message: 'Failed to load post.' });
  }
});

// Individual blog post
router.get('/:slug', async (req, res) => {
  // Check redirect map first — serves already-posted Pinterest pins
  const redirect = SLUG_REDIRECTS[req.params.slug];
  if (redirect) {
    return res.redirect(301, `/blog/${redirect}`);
  }

  try {
    const post = await getPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).render('error', { message: 'Post not found.' });
    }

    // Fetch related content — non-fatal if any fail
    let relatedProduct = null;
    let relatedPosts = [];
    const heroPinUrl = null; // R2 pin URLs (pub-629428d185ca4960.r2.dev/company_122731/images/) are not
                             // accessible from the browser; blog_posts.pin_image is always correct.
    try {
      const [products, allPosts] = await Promise.all([
        getAllProducts(),
        getAllPosts({ category: post.category }),
      ]);
      relatedProduct = products.find(p => p.category === post.category) || products[0] || null;
      // Up to 3 posts from same category, excluding current post
      relatedPosts = allPosts
        .filter(p => p.slug !== post.slug)
        .slice(0, 3);
      // If fewer than 3 same-category posts, supplement with cross-pillar posts
      if (relatedPosts.length < 3) {
        const crossPosts = (await getAllPosts()).filter(p => p.slug !== post.slug && p.category !== post.category);
        relatedPosts = [...relatedPosts, ...crossPosts].slice(0, 3);
      }
    } catch (_) { /* non-fatal — images are enhancements */ }

    // Article schema.org markup — use res.locals.siteUrl so URLs resolve to the deployed domain
    const postUrl = `${res.locals.siteUrl}/blog/${post.slug}`;
    const schemaOrg = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': post.title,
      'description': post.excerpt,
      'image': post.pin_image || post.cover_image || res.locals.siteUrl + '/img/og-default.jpg',
      'datePublished': post.created_at,
      'dateModified': post.updated_at || post.created_at,
      'author': {
        '@type': 'Organization',
        'name': 'StickVault',
        'url': res.locals.siteUrl,
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'StickVault',
        'url': res.locals.siteUrl,
        'logo': {
          '@type': 'ImageObject',
          'url': res.locals.siteUrl + '/img/og-default.jpg',
        },
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': postUrl,
      },
      'url': postUrl,
      'articleSection': formatCategory(post.category),
      'keywords': buildKeywords(post.category, post.title),
    });

    // BreadcrumbList for Google discovery — uses res.locals.siteUrl for canonical domain
    const breadcrumbSchema = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': res.locals.siteUrl },
        { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': res.locals.siteUrl + '/blog' },
        { '@type': 'ListItem', 'position': 3, 'name': formatCategory(post.category), 'item': `${res.locals.siteUrl}/blog?category=${post.category}` },
        { '@type': 'ListItem', 'position': 4, 'name': post.title, 'item': postUrl },
      ],
    });

    // Use generated SVG pin image when available (1000×1500, 2:3 Pinterest standard).
    // Falls back to cover_image, then site default. Always stickvault.com domain.
    const ogImage = post.pin_image || post.cover_image || `${res.locals.siteUrl}/img/og-default.jpg`;
    // SVG pins are 1000×1500 (declared in viewBox); Pinterest reads og:image dimensions
    const ogImageWidth = '1000';
    const ogImageHeight = '1500';

    res.render('blog/post', {
      post,
      title: buildPostTitle(post),
      description: post.excerpt,
      ogImage,
      ogType: 'article',
      ogTitle: post.title,
      pinterestDescription: post.pinterest_description || post.excerpt,
      canonicalPath: `/blog/${post.slug}`,
      canonicalUrl: postUrl,
      schemaOrg,
      breadcrumbSchema,
      relatedProduct,
      relatedPosts,
      ogImageWidth,
      ogImageHeight,
      heroPinUrl,
      // article: OG meta tags — required for Pinterest Rich Pins + GSC article rich results
      articlePublishedTime: new Date(post.created_at).toISOString(),
      articleModifiedTime: new Date(post.updated_at || post.created_at).toISOString(),
      articleSection: formatCategory(post.category),
    });
  } catch (err) {
    console.error('Blog post error:', err);
    res.status(500).render('error', { message: 'Failed to load post.' });
  }
});

function formatCategory(slug) {
  const map = {
    'drums': 'Drums',
    'collecting': 'Cards & Collecting',
    'side-hustles': 'Side Hustles',
    'routines': 'Routines',
    'hidden-gems': 'Hidden Gems',
  };
  return map[slug] || slug;
}

// Build keyword-rich post title with long-tail SEO intent
function buildPostTitle(post) {
  // Title already has strong SEO — just append brand
  return `${post.title} — StickVault`;
}

// Per-category keyword hints for schema
function buildKeywords(category, title) {
  const base = {
    'drums': 'drum practice routine, drummer tips, drum technique, rudiments',
    'collecting': 'sports card grading, PSA grading, card collecting, PC building, trading cards',
    'side-hustles': 'side hustle ideas, card flipping, eBay selling, collector income',
    'routines': 'morning routine, discipline system, habit stacking, creator schedule',
    'hidden-gems': 'underrated cards, hidden gem finds, undervalued collectibles',
  };
  return base[category] || title;
}

module.exports = router;
