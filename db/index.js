/**
 * Database connection singleton.
 * Owns: Pool construction and export.
 * Does NOT own: query logic (belongs in per-entity db files).
 */
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('localhost') ? false : { rejectUnauthorized: false },
});

module.exports = pool;
