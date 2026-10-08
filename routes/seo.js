/**
 * SEO routes.
 * Owns: /sitemap.xml (dynamic XML sitemap), /robots.txt.
 * Does NOT own: page rendering, blog content, shop products.
 */
const express = require('express');
const router = express.Router();
const { getAllPosts } = require('../db/blog');
const { getAllProducts } = require('../db/products');

// Canonical site URL — set via SITE_URL env var.
// Falls back to RENDER_EXTERNAL_URL (Render auto-sets this) or Render's *.polsia.app domain.
// Does NOT fall back to www.stickvault.com — that domain has no DNS configured.
const SITE_URL = (process.env.SITE_URL || process.env.RENDER_EXTERNAL_URL || `https://${process.env.RENDER ? 'stickvault' : 'www'}.polsia.app`).replace(/\/+$/, '');

// Static pages with priorities
const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/blog', priority: '0.9', changefreq: 'daily' },
  { path: '/shop', priority: '0.8', changefreq: 'weekly' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog?category=collecting', priority: '0.8', changefreq: 'daily' },
  { path: '/blog?category=drums', priority: '0.8', changefreq: 'daily' },
  { path: '/blog?category=side-hustles', priority: '0.7', changefreq: 'weekly' },
  { path: '/blog?category=routines', priority: '0.7', changefreq: 'weekly' },
  { path: '/blog?category=hidden-gems', priority: '0.7', changefreq: 'weekly' },
];

router.get('/sitemap.xml', async (req, res) => {
  try {
    const [posts, products] = await Promise.all([
      getAllPosts(),
      getAllProducts(),
    ]);

    const now = new Date().toISOString().split('T')[0];

    const urls = [
      // Static pages
      ...STATIC_PAGES.map(page => `
  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${now}</lastmod>
  </url>`),
      // Blog posts
      ...posts.map(post => `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <lastmod>${new Date(post.updated_at || post.created_at).toISOString().split('T')[0]}</lastmod>
  </url>`),
      // Shop products
      ...products.map(product => `
  <url>
    <loc>${SITE_URL}/shop/${product.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <lastmod>${new Date(product.created_at).toISOString().split('T')[0]}</lastmod>
  </url>`),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    console.error('Sitemap error:', err);
    res.status(500).send('<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>');
  }
});

module.exports = router;
