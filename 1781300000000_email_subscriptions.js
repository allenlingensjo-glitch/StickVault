/**
 * Email subscriptions table.
 * Stores email signups from 3 locations: homepage, free_page, blog_footer.
 * Enforces UNIQUE on email so duplicate submits are detected server-side.
 */
module.exports = {
  name: 'email_subscriptions',
  up: async (client) => {
    await client.query(`
      CREATE TABLE IF NOT EXISTS email_subscriptions (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        source VARCHAR(50) NOT NULL DEFAULT 'homepage',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    await client.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS email_subscriptions_email_unique_idx
        ON email_subscriptions (LOWER(email))
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS email_subscriptions_source_idx
        ON email_subscriptions (source)
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS email_subscriptions_created_at_idx
        ON email_subscriptions (created_at)
    `);
  }
};