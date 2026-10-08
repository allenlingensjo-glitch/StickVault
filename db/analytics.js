/**
 * Analytics event queries.
 * Owns: analytics_events table reads/writes.
 * Does NOT own: blog_posts, products, subscribers, or any user identity.
 */
const pool = require('./index');

// Insert a single analytics event. Fire-and-forget safe (caller should not await in hot paths).
async function recordEvent({ eventType, eventData = {}, pageUrl, referrer, userAgent, sessionId }) {
  await pool.query(
    `INSERT INTO analytics_events (event_type, event_data, page_url, referrer, user_agent, session_id)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [eventType, JSON.stringify(eventData), pageUrl || null, referrer || null, userAgent || null, sessionId || null]
  );
}

// Top pages by view count for a given window (e.g. last 7 or 30 days).
async function getTopPages(days = 7, limit = 20) {
  const { rows } = await pool.query(
    `SELECT
       event_data->>'slug'  AS slug,
       event_data->>'title' AS title,
       COUNT(*)             AS views
     FROM analytics_events
     WHERE event_type = 'page_view'
       AND created_at >= NOW() - ($1 || ' days')::INTERVAL
     GROUP BY event_data->>'slug', event_data->>'title'
     ORDER BY views DESC
     LIMIT $2`,
    [days, limit]
  );
  return rows;
}

// Email signups grouped by source.
async function getSignupsBySource(days = 30) {
  const { rows } = await pool.query(
    `SELECT
       event_data->>'source' AS source,
       COUNT(*)              AS signups
     FROM analytics_events
     WHERE event_type = 'email_signup'
       AND created_at >= NOW() - ($1 || ' days')::INTERVAL
     GROUP BY event_data->>'source'
     ORDER BY signups DESC`,
    [days]
  );
  return rows;
}

// Product clicks grouped by product slug + name.
async function getProductClicks(days = 30) {
  const { rows } = await pool.query(
    `SELECT
       event_data->>'product_slug'  AS product_slug,
       event_data->>'product_title' AS product_title,
       event_data->>'click_type'    AS click_type,
       COUNT(*)                     AS clicks
     FROM analytics_events
     WHERE event_type = 'product_click'
       AND created_at >= NOW() - ($1 || ' days')::INTERVAL
     GROUP BY event_data->>'product_slug', event_data->>'product_title', event_data->>'click_type'
     ORDER BY clicks DESC`,
    [days]
  );
  return rows;
}

// Traffic sources derived from referrer / UTM params.
async function getTrafficSources(days = 30) {
  const { rows } = await pool.query(
    `SELECT
       COALESCE(event_data->>'utm_source', 'direct') AS source,
       COUNT(*)                                       AS sessions
     FROM analytics_events
     WHERE event_type = 'page_view'
       AND created_at >= NOW() - ($1 || ' days')::INTERVAL
     GROUP BY event_data->>'utm_source'
     ORDER BY sessions DESC`,
    [days]
  );
  return rows;
}

// Daily view counts for the last N days (for trend chart).
async function getDailyTrend(days = 30) {
  const { rows } = await pool.query(
    `SELECT
       DATE_TRUNC('day', created_at)::DATE AS day,
       COUNT(*) AS views
     FROM analytics_events
     WHERE event_type = 'page_view'
       AND created_at >= NOW() - ($1 || ' days')::INTERVAL
     GROUP BY day
     ORDER BY day ASC`,
    [days]
  );
  return rows;
}

// Summary object used by GET /api/analytics/summary (for Data agent).
async function getSummary() {
  const [topPages7, topPages30, signups, productClicks, sources, trend] = await Promise.all([
    getTopPages(7, 10),
    getTopPages(30, 10),
    getSignupsBySource(30),
    getProductClicks(30),
    getTrafficSources(30),
    getDailyTrend(30),
  ]);
  return { topPages7, topPages30, signups, productClicks, sources, trend };
}

module.exports = { recordEvent, getTopPages, getSignupsBySource, getProductClicks, getTrafficSources, getDailyTrend, getSummary };
