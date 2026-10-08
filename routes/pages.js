/**
 * Static page routes.
 * Owns: homepage, /about, /free, /subscribe (email capture POST), /admin/analytics dashboard.
 * Does NOT own: /blog routing, /shop routing, /api/* endpoints.
 */
const express = require('express');
const router = express.Router();
const { getFeaturedPosts } = require('../db/blog');
const { getAllProducts } = require('../db/products');
const { addSubscriber, getAllSubscribers, getSubscriberCounts } = require('../db/subscribers');
const { getTopPages, getSignupsBySource, getProductClicks, getTrafficSources, getDailyTrend } = require('../db/analytics');

const HOME_DESCRIPTION = "A vault for people who go deep. Drum practice systems, collecting strategy, morning routines, creator economics, and the overlooked tools that don't make the algorithm.";

router.get('/', async (req, res) => {
  try {
    const [featuredPosts, featuredProducts] = await Promise.all([
      getFeaturedPosts(3),
      getAllProducts(),
    ]);
    res.render('home', {
      featuredPosts,
      featuredProducts: featuredProducts.slice(0, 4),
      title: 'StickVault — Drums, Collecting, Systems, Hidden Gems & Side Moves',
      description: HOME_DESCRIPTION,
      ogImage: `${res.locals.siteUrl}/img/og-default.jpg`,
      canonicalPath: '/',
      heroImage: 'https://pub-629428d185ca4960a0a73c850d32294b.r2.dev/generated-images/company_122731/2a5997a2-b366-4e0b-9a62-5b48d9b886c6.jpg',
    });
  } catch (err) {
    console.error('Homepage error:', err);
    res.render('home', {
      featuredPosts: [],
      featuredProducts: [],
      title: 'StickVault — Drums, Collecting, Systems, Hidden Gems & Side Moves',
      description: 'A vault for people who go deep. Five disciplines, one standard: depth over noise.',
      canonicalPath: '/',
      heroImage: 'https://pub-629428d185ca4960a0a73c850d32294b.r2.dev/generated-images/company_122731/2a5997a2-b366-4e0b-9a62-5b48d9b886c6.jpg',
    });
  }
});

router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About StickVault — Five Disciplines, One Philosophy',
    description: 'StickVault covers drums, collecting, routines, hidden gems, and side hustles — five disciplines united by one standard: depth over noise, tested over theoretical.',
    canonicalPath: '/about',
    heroImage: 'https://pub-629428d185ca4960a0a73c850d32294b.r2.dev/generated-images/company_122731/d11e4828-0def-40ea-954a-701ebcdc4754.jpg',
  });
});

router.get('/free', (req, res) => {
  res.render('free', {
    title: "Free Vault Downloads — Grading Prep Checklist + Operator's Daily Playbook",
    description: "Two free downloads for serious collectors and creators: the PSA/BGS Grading Prep Checklist and the Operator's Daily Playbook. No upsell. Just useful.",
    canonicalPath: '/free',
    heroImage: 'https://pub-629428d185ca4960a0a73c850d32294b.r2.dev/generated-images/company_122731/4d8ccbe9-6e75-4079-8967-306da29678c5.jpg',
  });
});

router.get('/admin/analytics', async (req, res) => {
  try {
    const [topPages7, topPages30, signups, productClicks, sources, trend] = await Promise.all([
      getTopPages(7, 15),
      getTopPages(30, 15),
      getSignupsBySource(30),
      getProductClicks(30),
      getTrafficSources(30),
      getDailyTrend(30),
    ]);
    res.render('admin/analytics', {
      title: 'Analytics Dashboard — StickVault',
      noindex: true,
      topPages7, topPages30, signups, productClicks, sources, trend,
    });
  } catch (err) {
    console.error('[admin/analytics] error:', err);
    res.status(500).render('error', { message: 'Failed to load analytics dashboard.' });
  }
});

router.get('/admin/subscribers', async (req, res) => {
  const sort = ['email', 'source', 'created_at'].includes(req.query.sort) ? req.query.sort : 'created_at';
  const order = req.query.order === 'ASC' ? 'ASC' : 'DESC';
  try {
    const [subscribers, counts] = await Promise.all([
      getAllSubscribers(sort, order),
      getSubscriberCounts(),
    ]);
    res.render('admin/subscribers', {
      title: 'Subscribers — StickVault Admin',
      noindex: true,
      subscribers,
      counts,
      sort,
      order,
    });
  } catch (err) {
    console.error('[admin/subscribers] error:', err);
    res.status(500).render('error', { message: 'Failed to load subscribers.' });
  }
});

router.post('/subscribe', async (req, res) => {
  try {
    const { email, source } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Valid email required.' });
    }
    const result = await addSubscriber(email, source || 'homepage');
    res.json({ success: true, already_subscribed: result.already_subscribed || false });
  } catch (err) {
    console.error('Subscribe error:', err);
    res.status(500).json({ success: false, message: 'Something went wrong. Try again.' });
  }
});

router.get('/subscribe/success', (req, res) => {
  res.render('subscribe-success', {
    title: "You're in — Check Your Inbox",
    description: "Your free Drummer's Practice Toolkit is on its way.",
    canonicalPath: '/subscribe/success',
    pdfUrl: 'https://pub-629428d185ca4960a0a73c850d32294b.r2.dev/generated-images/company_122731/f1bc66ce-6242-41d3-8e07-754608c4c114.jpg',
  });
});

module.exports = router;