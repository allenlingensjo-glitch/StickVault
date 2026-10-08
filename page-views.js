/**
 * Page view tracking queries.
 * Owns: page_views table reads/writes.
 * Does NOT own: analytics_events, blog data, subscribers, or any user identity.
 */
const pool = require('./index');

// Insert a page view. Fire-and-forget safe — caller should not await in hot paths.
async function recordPageView({ path, referrer, userAgent }) {
  await pool.query(
    `INSERT INTO page_views (path, referrer, user_agent) VALUES ($1, $2, $3)`,
    [path, referrer || null, userAgent || null]
  );
}

// Total page views for a time window.
async function getPageViewCounts() {
  const { rows } = await pool.query(`
    SELECT
      (SELECT COUNT(*) FROM page_views WHERE created_at >= CURRENT_DATE)                           AS today,
      (SELECT COUNT(*) FROM page_views WHERE created_at >= NOW() - INTERVAL '7 days')                AS last_7d,
      (SELECT COUNT(*) FROM page_views WHERE created_at >= NOW() - INTERVAL '30 days')              AS last_30d
  `);
  return rows[0];
}

// Top pages by view count.
async function getTopPages(limit = 20) {
  const { rows } = await pool.query(
    `SELECT path, COUNT(*) AS views
     FROM page_views
     WHERE created_at >= NOW() - INTERVAL '30 days'
     GROUP BY path
     ORDER BY views DESC
     LIMIT $1`,
    [limit]
  );
  return rows;
}

// Referrer breakdown with source categorization.
async function getReferrerBreakdown() {
  const { rows } = await pool.query(`
    SELECT
      CASE
        WHEN referrer LIKE '%pinterest%'  THEN 'pinterest'
        WHEN referrer LIKE '%google%'     THEN 'google'
        WHEN referrer LIKE '%facebook%'   THEN 'facebook'
        WHEN referrer LIKE '%twitter%'    THEN 'twitter'
        WHEN referrer LIKE '%instagram%'  THEN 'instagram'
        WHEN referrer IS NULL OR referrer = '' THEN 'direct'
        ELSE 'other'
      END AS source,
      COUNT(*) AS visits
    FROM page_views
    WHERE created_at >= NOW() - INTERVAL '30 days'
    GROUP BY source
    ORDER BY visits DESC
  `);
  return rows;
}

// Daily page views for the last N days.
async function getDailyViews(days = 30) {
  const { rows } = await pool.query(
    `SELECT
       DATE_TRUNC('day', created_at)::DATE AS day,
       COUNT(*) AS views
     FROM page_views
     WHERE created_at >= NOW() - ($1 || ' days')::INTERVAL
     GROUP BY day
     ORDER BY day ASC`,
    [days]
  );
  return rows;
}

// Full analytics snapshot for /api/admin/analytics
async function getAnalytics() {
  const [counts, topPages, referrers, daily] = await Promise.all([
    getPageViewCounts(),
    getTopPages(20),
    getReferrerBreakdown(),
    getDailyViews(30),
  ]);

  // Subscriber count from email_subscribers
  const { rows: subRows } = await pool.query('SELECT COUNT(*)::int AS total FROM email_subscribers');
  const subscriberCount = subRows[0]?.total ?? 0;

  return { counts, topPages, referrers, daily, subscriberCount };
}

module.exports = { recordPageView, getPageViewCounts, getTopPages, getReferrerBreakdown, getDailyViews, getAnalytics };