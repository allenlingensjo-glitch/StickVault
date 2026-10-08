/**
 * Product queries.
 * Owns: all reads/writes against products table.
 * Does NOT own: blog data, subscriber data.
 */
const pool = require('./index');

async function getAllProducts() {
  const result = await pool.query(
    'SELECT * FROM products WHERE active = true ORDER BY created_at ASC'
  );
  return result.rows;
}

async function getProductBySlug(slug) {
  const result = await pool.query(
    'SELECT * FROM products WHERE slug = $1 AND active = true',
    [slug]
  );
  return result.rows[0] || null;
}

module.exports = { getAllProducts, getProductBySlug };
