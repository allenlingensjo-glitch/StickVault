/**
 * Blog post queries.
 * Owns: all reads/writes against blog_posts table.
 * Does NOT own: product data, subscriber data.
 */
const pool = require('./index');

async function getAllPosts({ category } = {}) {
  if (category) {
    const result = await pool.query(
      'SELECT * FROM blog_posts WHERE published = true AND category = $1 ORDER BY created_at DESC',
      [category]
    );
    return result.rows;
  }
  const result = await pool.query(
    'SELECT * FROM blog_posts WHERE published = true ORDER BY created_at DESC'
  );
  return result.rows;
}

async function getPostBySlug(slug) {
  const result = await pool.query(
    'SELECT * FROM blog_posts WHERE slug = $1 AND published = true',
    [slug]
  );
  return result.rows[0] || null;
}

async function getFeaturedPosts(limit = 3) {
  const result = await pool.query(
    'SELECT * FROM blog_posts WHERE published = true ORDER BY created_at DESC LIMIT $1',
    [limit]
  );
  return result.rows;
}

module.exports = { getAllPosts, getPostBySlug, getFeaturedPosts };
