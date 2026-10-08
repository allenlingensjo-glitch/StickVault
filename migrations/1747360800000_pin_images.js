/**
 * Add pin_image column to blog_posts.
 * Owns: schema change only — no seeding, no generation.
 * Does NOT own: image generation (see scripts/generate-pins.js).
 */
module.exports = {
  name: 'pin_images',
  up: async (client) => {
    await client.query(`
      ALTER TABLE blog_posts
      ADD COLUMN IF NOT EXISTS pin_image VARCHAR(1000)
    `);
  },
};
