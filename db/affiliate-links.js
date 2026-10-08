/**
 * Affiliate link queries.
 * Owns: affiliate_links table reads, writes, and click tracking.
 * Does NOT own: analytics_events, blog_posts, products, or any redirect HTTP logic.
 */
const pool = require('./index');

/** Look up one active link by slug. Returns null if not found or inactive. */
async function getLinkBySlug(slug) {
  const { rows } = await pool.query(
    `SELECT * FROM affiliate_links WHERE slug = $1 AND is_active = true LIMIT 1`,
    [slug]
  );
  return rows[0] || null;
}

/** All links — for admin table; no active filter. */
async function getAllLinks() {
  const { rows } = await pool.query(
    `SELECT * FROM affiliate_links ORDER BY pillar ASC, label ASC`
  );
  return rows;
}

/** Increment click counter and update last_clicked_at atomically. */
async function recordClick(id) {
  await pool.query(
    `UPDATE affiliate_links
     SET click_count = click_count + 1, last_clicked_at = NOW(), updated_at = NOW()
     WHERE id = $1`,
    [id]
  );
}

/** Insert a new affiliate link. Returns the created row. */
async function createLink({ slug, label, program, target_url, commission_rate, link_type, pillar }) {
  const { rows } = await pool.query(
    `INSERT INTO affiliate_links (slug, label, program, target_url, commission_rate, link_type, pillar)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [slug, label, program || 'Manual', target_url, commission_rate || 'negotiated', link_type || 'affiliate', pillar || null]
  );
  return rows[0];
}

/** Update mutable fields on an existing link. Returns updated row. */
async function updateLink(id, { label, program, target_url, commission_rate, link_type, pillar, is_active }) {
  const { rows } = await pool.query(
    `UPDATE affiliate_links
     SET label           = COALESCE($2, label),
         program         = COALESCE($3, program),
         target_url      = COALESCE($4, target_url),
         commission_rate = COALESCE($5, commission_rate),
         link_type       = COALESCE($6, link_type),
         pillar          = COALESCE($7, pillar),
         is_active       = COALESCE($8, is_active),
         updated_at      = NOW()
     WHERE id = $1
     RETURNING *`,
    [id, label, program, target_url, commission_rate, link_type, pillar, is_active]
  );
  return rows[0] || null;
}

/** Reset click_count to 0 for a single link. */
async function resetClicks(id) {
  await pool.query(
    `UPDATE affiliate_links SET click_count = 0, updated_at = NOW() WHERE id = $1`,
    [id]
  );
}

/** Persist HTTP status after a link check. Sets last_checked_at + last_status. Marks inactive if 4xx/5xx. */
async function updateLinkStatus(id, httpStatus) {
  const broken = httpStatus >= 400;
  await pool.query(
    `UPDATE affiliate_links
     SET last_checked_at = NOW(),
         last_status     = $2,
         is_active       = CASE WHEN $3 THEN false ELSE is_active END,
         updated_at      = NOW()
     WHERE id = $1`,
    [id, httpStatus, broken]
  );
}

/** Force-reactivate a link after upstream fix. */
async function reactivateLink(id) {
  await pool.query(
    `UPDATE affiliate_links SET is_active = true, last_status = NULL, updated_at = NOW() WHERE id = $1`,
    [id]
  );
}

module.exports = {
  getLinkBySlug,
  getAllLinks,
  recordClick,
  createLink,
  updateLink,
  resetClicks,
  updateLinkStatus,
  reactivateLink,
};
