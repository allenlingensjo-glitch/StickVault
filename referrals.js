/**
 * Affiliate referral queries.
 * Owns: affiliate_orders table reads and aggregations.
 * Does NOT own: affiliate_links (db/affiliate-links.js), click tracking (routes/affiliate.js).
 */
const pool = require('./index');

/** All orders with optional date range filter. */
async function getOrders({ startDate, endDate, limit = 200 } = {}) {
  let sql = `
    SELECT o.*, l.label, l.slug, l.program as link_program, l.commission_rate
    FROM affiliate_orders o
    LEFT JOIN affiliate_links l ON l.id = o.link_id
    WHERE 1=1
  `;
  const params = [];
  if (startDate) { params.push(startDate); sql += ` AND o.order_date >= $${params.length}`; }
  if (endDate)   { params.push(endDate);   sql += ` AND o.order_date <= $${params.length}`; }
  sql += ` ORDER BY o.order_date DESC, o.created_at DESC LIMIT $${params.push(limit)}`;
  const { rows } = await pool.query(sql, params);
  return rows;
}

/** Orders grouped by month for trend chart. */
async function getMonthlyStats(months = 6) {
  const { rows } = await pool.query(`
    SELECT
      TO_CHAR(order_date, 'YYYY-MM') AS month,
      TO_CHAR(order_date, 'Mon YYYY') AS label,
      COUNT(*)                          AS order_count,
      SUM(amount_usd)    AS total_amount,
      SUM(commission_usd) AS total_commission
    FROM affiliate_orders
    WHERE order_date >= (CURRENT_DATE - (INTERVAL '1 month' * $1))
      AND status != 'removed'
    GROUP BY 1, 2
    ORDER BY 1 ASC
  `, [months]);
  return rows;
}

/** Orders grouped by category for breakdown. */
async function getCategoryStats() {
  const { rows } = await pool.query(`
    SELECT
      COALESCE(category, 'Uncategorized') AS category,
      COUNT(*)                          AS order_count,
      SUM(amount_usd)    AS total_amount,
      SUM(commission_usd) AS total_commission,
      ROUND(AVG(commission_usd) FILTER (WHERE commission_usd > 0), 2) AS avg_commission
    FROM affiliate_orders
    WHERE status != 'removed'
    GROUP BY 1
    ORDER BY total_commission DESC
  `);
  return rows;
}

/** Top performing affiliate links by commission. */
async function getTopLinks(limit = 10) {
  const { rows } = await pool.query(`
    SELECT
      l.id, l.label, l.slug, l.program, l.commission_rate, l.link_type, l.pillar,
      COALESCE(SUM(o.amount_usd), 0)     AS total_sales,
      COALESCE(SUM(o.commission_usd), 0) AS total_commission,
      COUNT(o.id)                        AS order_count
    FROM affiliate_links l
    LEFT JOIN affiliate_orders o ON o.link_id = l.id AND o.status != 'removed'
    WHERE l.is_active = true
    GROUP BY l.id, l.label, l.slug, l.program, l.commission_rate, l.link_type, l.pillar
    HAVING COALESCE(SUM(o.commission_usd), 0) > 0
       OR l.click_count > 0
    ORDER BY total_commission DESC
    LIMIT $1
  `, [limit]);
  return rows;
}

/** Order counts and totals by status. */
async function getStatusBreakdown() {
  const { rows } = await pool.query(`
    SELECT
      status,
      COUNT(*)                          AS order_count,
      SUM(amount_usd)    AS total_amount,
      SUM(commission_usd) AS total_commission
    FROM affiliate_orders
    GROUP BY status
    ORDER BY
      CASE status
        WHEN 'approved'  THEN 1
        WHEN 'paid'      THEN 2
        WHEN 'pending'   THEN 3
        WHEN 'removed'   THEN 4
        ELSE 5
      END
  `);
  return rows;
}

/** Grand totals across all time. */
async function getTotals() {
  const { rows } = await pool.query(`
    SELECT
      COUNT(*)                          AS total_orders,
      COALESCE(SUM(amount_usd), 0)      AS total_sales,
      COALESCE(SUM(commission_usd), 0)  AS total_commission
    FROM affiliate_orders
    WHERE status NOT IN ('removed')
  `);
  return rows[0];
}

module.exports = {
  getOrders,
  getMonthlyStats,
  getCategoryStats,
  getTopLinks,
  getStatusBreakdown,
  getTotals,
};