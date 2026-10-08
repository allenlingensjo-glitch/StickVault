/**
 * Analytics events table.
 * Owns: analytics_events — raw event log for page views, signups, clicks, referrals.
 * Does NOT own: user identity, blog_posts, products, subscribers.
 */
module.exports = {
  name: 'analytics_events',
  up: async (client) => {
    await client.query(`
      CREATE TABLE analytics_events (
        id BIGSERIAL PRIMARY KEY,
        event_type VARCHAR(100) NOT NULL,
        event_data JSONB DEFAULT '{}',
        page_url TEXT,
        referrer TEXT,
        user_agent TEXT,
        session_id VARCHAR(64),
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    await client.query(`
      CREATE INDEX analytics_events_type_created_idx
        ON analytics_events(event_type, created_at DESC)
    `);

    await client.query(`
      CREATE INDEX analytics_events_created_idx
        ON analytics_events(created_at DESC)
    `);
  },

  down: async (client) => {
    await client.query(`DROP TABLE IF EXISTS analytics_events`);
  },
};
