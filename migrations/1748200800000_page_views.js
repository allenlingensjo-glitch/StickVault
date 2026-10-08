'use strict';

// CREATE TABLE page_views (id SERIAL PRIMARY KEY, path TEXT NOT NULL, referrer TEXT, user_agent TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
// CREATE INDEX idx_page_views_created_at ON page_views (created_at);

module.exports = {
  up: async (pool) => {
    await pool.query(`
      CREATE TABLE page_views (
        id         SERIAL PRIMARY KEY,
        path       TEXT NOT NULL,
        referrer   TEXT,
        user_agent TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    await pool.query(`
      CREATE INDEX idx_page_views_created_at ON page_views (created_at);
    `);
  },
  down: async (pool) => {
    await pool.query('DROP TABLE IF EXISTS page_views;');
  },
};