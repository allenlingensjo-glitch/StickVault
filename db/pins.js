/**
 * Pin image queries.
 * Owns: reads/writes to blog_posts.pin_image column.
 * Does NOT own: blog post content, product data, generation logic.
 */
const pool = require('./index');

/** Returns all published posts missing a pin image. */
async function getPostsMissingPins() {
  const result = await pool.query(
    'SELECT id, slug, title, category FROM blog_posts WHERE published = true AND pin_image IS NULL ORDER BY category, created_at'
  );
  return result.rows;
}

/** Returns all published posts (for force-regenerate and SVG→PNG migration). */
async function getAllPublishedPosts() {
  const result = await pool.query(
    'SELECT id, slug, title, category, pin_image FROM blog_posts WHERE published = true ORDER BY category, created_at'
  );
  return result.rows;
}

/** Updates the pin_image URL for a specific post. */
async function updatePinImage(postId, pinUrl) {
  await pool.query(
    'UPDATE blog_posts SET pin_image = $1, updated_at = NOW() WHERE id = $2',
    [pinUrl, postId]
  );
}

/** Returns pin generation status counts. */
async function getPinStatus() {
  const result = await pool.query(
    'SELECT COUNT(*) as total, COUNT(pin_image) as with_pins FROM blog_posts WHERE published = true'
  );
  return {
    total: parseInt(result.rows[0].total),
    with_pins: parseInt(result.rows[0].with_pins),
    missing: parseInt(result.rows[0].total) - parseInt(result.rows[0].with_pins),
  };
}

module.exports = { getPostsMissingPins, getAllPublishedPosts, updatePinImage, getPinStatus };
