/**
 * Email subscriber queries.
 * Owns: all reads/writes against email_subscribers table.
 * Does NOT own: blog data, product data, user auth.
 */
const pool = require('./index');

async function addSubscriber(email, source = 'homepage') {
  const normalized = email.toLowerCase().trim();

  try {
    // Upsert: insert if not exists, ignore if exists
    const result = await pool.query(
      `INSERT INTO email_subscribers (email, source)
       VALUES ($1, $2)
       ON CONFLICT (email) DO NOTHING
       RETURNING id`,
      [normalized, source]
    );
    return { inserted: result.rowCount > 0 };
  } catch (err) {
    // Unique violation — email already in table
    if (err.code === '23505') {
      return { inserted: false, already_subscribed: true };
    }
    throw err;
  }
}

/**
 * Returns all email subscriptions, newest first.
 * Used by /admin/subscribers page and CSV export.
 */
async function getAllSubscribers(sort = 'created_at', order = 'DESC') {
  const allowedSorts = ['email', 'source', 'created_at'];
  const safeSort = allowedSorts.includes(sort) ? sort : 'created_at';
  const safeOrder = order === 'ASC' ? 'ASC' : 'DESC';

  const result = await pool.query(
    `SELECT id, email, source, created_at
     FROM email_subscribers
     ORDER BY ${safeSort} ${safeOrder}`
  );
  return result.rows;
}

/**
 * Returns subscriber counts grouped by source.
 * Used by /admin/subscribers page summary.
 */
async function getSubscriberCounts() {
  const result = await pool.query(
    `SELECT source, COUNT(*)::int AS count
     FROM email_subscribers
     GROUP BY source
     ORDER BY count DESC`
  );
  const total = result.rows.reduce((sum, r) => sum + r.count, 0);
  return { bySource: result.rows, total };
}

module.exports = { addSubscriber, getAllSubscribers, getSubscriberCounts };