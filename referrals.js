/**
 * Affiliate referral dashboard routes.
 * Owns: /admin/referrals page, /api/admin/referrals JSON, /api/admin/referrals/export CSV.
 * Does NOT own: affiliate link management (/affiliate/admin/links), click tracking.
 */
const express = require('express');
const router = express.Router();
const {
  getOrders,
  getMonthlyStats,
  getCategoryStats,
  getTopLinks,
  getStatusBreakdown,
  getTotals,
} = require('../db/referrals');

// GET /admin/referrals — dashboard page
router.get('/referrals', async (req, res) => {
  try {
    const [orders, monthly, categories, topLinks, statuses, totals] = await Promise.all([
      getOrders({ limit: 100 }),
      getMonthlyStats(6),
      getCategoryStats(),
      getTopLinks(10),
      getStatusBreakdown(),
      getTotals(),
    ]);
    res.render('admin/referrals', {
      title: 'Referrals — StickVault Admin',
      noindex: true,
      orders,
      monthly,
      categories,
      topLinks,
      statuses,
      totals,
    });
  } catch (err) {
    console.error('[admin/referrals] error:', err);
    res.status(500).render('error', { message: 'Failed to load referrals dashboard.' });
  }
});

// GET /api/admin/referrals — JSON summary for external tooling
router.get('/referrals/export', async (req, res) => {
  try {
    const orders = await getOrders({ limit: 2000 });
    const header = 'order_id,program,order_date,amount_usd,commission_usd,status,category,description,link_slug,commission_rate';
    const rows = orders.map(o =>
      `"${o.order_id}","${o.program}","${o.order_date}","${o.amount_usd}","${o.commission_usd}","${o.status}","${o.category || ''}","${(o.description || '').replace(/"/g, '""')}","${o.slug || ''}","${o.commission_rate || ''}"`
    );
    const csv = [header, ...rows].join('\n');
    const timestamp = new Date().toISOString().slice(0, 10);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="referrals-${timestamp}.csv"`);
    res.send(csv);
  } catch (err) {
    console.error('[admin/referrals/export] error:', err);
    res.status(500).json({ ok: false, error: 'Failed to export referrals' });
  }
});

module.exports = router;