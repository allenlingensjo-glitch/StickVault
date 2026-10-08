/**
 * Pinterest pin approval queue route.
 * Owns: GET /api/pinterest-queue — returns structured JSON of all pending pins
 *       GET /admin/pinterest-queue — human-readable HTML review page
 * Does NOT own: pin image generation, posting to Pinterest, DB writes.
 *
 * This is the review gate before any pin reaches Pinterest.
 * Nothing in this file publishes anything automatically.
 */
const express = require('express');
const router = express.Router();
const { PINTEREST_APPROVAL_QUEUE } = require('../data/pinterest-approval-queue');

// GET /api/pinterest-queue
// Returns full approval queue as JSON — useful for programmatic review.
router.get('/api/pinterest-queue', (req, res) => {
  const byPillar = {};
  const qualityIssues = [];
  const SITE = 'https://www.stickvault.com';
  const KNOWN_SLUGS = new Set();

  for (const pin of PINTEREST_APPROVAL_QUEUE) {
    byPillar[pin.pillar] = (byPillar[pin.pillar] || 0) + 1;

    // Quality checks
    const descLen = pin.description ? pin.description.length : 0;
    if (descLen < 300 || descLen > 500) {
      qualityIssues.push({ slug: pin.post_slug, issue: `description ${descLen} chars (target 300–500)` });
    }
    if (!pin.title_variants || pin.title_variants.length < 3) {
      qualityIssues.push({ slug: pin.post_slug, issue: 'fewer than 3 title variants' });
    }
    if (!pin.destination_url || !pin.destination_url.startsWith(SITE)) {
      qualityIssues.push({ slug: pin.post_slug, issue: 'destination_url missing or off-site' });
    }
    if (!pin.lead_magnet_url) {
      qualityIssues.push({ slug: pin.post_slug, issue: 'lead_magnet_url missing' });
    }
    if (!pin.product_url) {
      qualityIssues.push({ slug: pin.post_slug, issue: 'product_url missing' });
    }
    KNOWN_SLUGS.add(pin.post_slug);
  }

  const REQUIRED_PILLARS = ['collecting', 'drums', 'routines', 'hidden-gems', 'side-hustles'];
  const missingPillars = REQUIRED_PILLARS.filter(p => !byPillar[p]);
  if (missingPillars.length) {
    qualityIssues.push({ issue: `missing pillars: ${missingPillars.join(', ')}` });
  }

  const summary = {
    generated_at: new Date().toISOString(),
    total: PINTEREST_APPROVAL_QUEUE.length,
    target_total: 30,
    completion_pct: Math.round((PINTEREST_APPROVAL_QUEUE.length / 30) * 100),
    by_pillar: byPillar,
    quality_issues: qualityIssues,
    quality_ok: qualityIssues.length === 0,
    pins: PINTEREST_APPROVAL_QUEUE,
  };

  res.json(summary);
});

// GET /admin/pinterest-queue
// Human-readable review page — dark vault aesthetic, one card per pin.
// Now shows all batches (A through C) with quality checks.
router.get('/admin/pinterest-queue', (req, res) => {
  const byPillar = {};
  for (const pin of PINTEREST_APPROVAL_QUEUE) {
    if (!byPillar[pin.pillar]) byPillar[pin.pillar] = [];
    byPillar[pin.pillar].push(pin);
  }

  const html = buildQueueHTML(PINTEREST_APPROVAL_QUEUE, byPillar);
  res.send(html);
});

function buildQueueHTML(pins, byPillar) {
  const SITE = 'https://www.stickvault.com';
  const TARGET_TOTAL = 30;
  const REQUIRED_PILLARS = ['collecting', 'drums', 'routines', 'hidden-gems', 'side-hustles'];

  const pillarColors = {
    collecting: '#d4af37',
    drums: '#c8a84b',
    routines: '#b8963e',
    'side-hustles': '#d4a843',
    'hidden-gems': '#c9a040',
  };

  const pillarLabels = {
    collecting: 'Collecting',
    drums: 'Drums / Rhythm',
    routines: 'Routines / Systems',
    'side-hustles': 'Side Moves / Creator',
    'hidden-gems': 'Hidden Gems',
  };

  // Quality check: run per-pin validations
  const qualityIssues = [];
  for (const pin of pins) {
    const descLen = pin.description ? pin.description.length : 0;
    if (descLen < 300 || descLen > 500) {
      qualityIssues.push(`<span style="color:#eb5757">✗</span> <code>${escapeHtml(pin.post_slug)}</code> — description ${descLen} chars (need 300–500)`);
    }
    if (!pin.destination_url || !pin.destination_url.startsWith(SITE)) {
      qualityIssues.push(`<span style="color:#eb5757">✗</span> <code>${escapeHtml(pin.post_slug)}</code> — destination_url missing or off-site`);
    }
    if (!pin.lead_magnet_url) {
      qualityIssues.push(`<span style="color:#eb5757">✗</span> <code>${escapeHtml(pin.post_slug)}</code> — lead_magnet_url missing`);
    }
    if (!pin.product_url) {
      qualityIssues.push(`<span style="color:#eb5757">✗</span> <code>${escapeHtml(pin.post_slug)}</code> — product_url missing`);
    }
  }
  const missingPillars = REQUIRED_PILLARS.filter(p => !byPillar[p]);
  for (const mp of missingPillars) {
    qualityIssues.push(`<span style="color:#eb5757">✗</span> Pillar <strong>${mp}</strong> has zero pins`);
  }

  const qualityPanel = qualityIssues.length === 0
    ? `<div style="background:#0f1f0f;border:1px solid rgba(111,207,151,0.3);border-radius:6px;padding:14px;font-size:13px;color:#6fcf97;">
        <strong>✓ Quality check passed</strong> — all ${pins.length} pins have valid descriptions, destinations, and funnel links.
       </div>`
    : `<div style="background:#1f0f0f;border:1px solid rgba(235,87,87,0.3);border-radius:6px;padding:14px;font-size:13px;color:#eb5757;">
        <strong>Quality issues (${qualityIssues.length}):</strong>
        <ul style="margin-top:8px;padding-left:16px;line-height:1.8;">${qualityIssues.map(i => `<li>${i}</li>`).join('')}</ul>
       </div>`;

  // Pillar progress bar summary
  const pillarProgressBars = REQUIRED_PILLARS.map(pillar => {
    const count = (byPillar[pillar] || []).length;
    const color = pillarColors[pillar] || '#d4af37';
    const target = 6;
    const pct = Math.min(100, Math.round((count / target) * 100));
    const barFill = pct === 100
      ? `<span style="color:#6fcf97">✓</span>`
      : `<span style="color:${color}">${count}/${target}</span>`;
    return `<div style="margin-bottom:10px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
        <span style="font-size:12px;color:#c8c0b0;">${pillarLabels[pillar] || pillar}</span>
        <span style="font-size:12px;">${barFill}</span>
      </div>
      <div style="height:4px;background:#1e1e1e;border-radius:2px;">
        <div style="height:4px;width:${pct}%;background:${pct === 100 ? '#6fcf97' : color};border-radius:2px;transition:width 0.3s;"></div>
      </div>
    </div>`;
  }).join('');

  const pinCards = pins.map((pin, i) => {
    const color = pillarColors[pin.pillar] || '#d4af37';
    const descLen = pin.description ? pin.description.length : 0;
    const descStatus = descLen >= 300 && descLen <= 500
      ? `<span style="color:#6fcf97">✓ ${descLen} chars</span>`
      : `<span style="color:#eb5757">✗ ${descLen} chars (target 300–500)</span>`;

    const titleVariants = pin.title_variants.map((t, ti) =>
      `<div style="padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:13px;color:#e8e0d0;">
        <span style="color:${color};font-weight:600;margin-right:8px;">V${ti + 1}</span>${escapeHtml(t)}
      </div>`
    ).join('');

    return `
    <div style="background:#161616;border:1px solid rgba(212,175,55,0.15);border-radius:8px;padding:24px;margin-bottom:20px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;">
        <div>
          <span style="background:${color}22;color:${color};padding:3px 10px;border-radius:4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">${pin.pillar}</span>
          <span style="margin-left:12px;color:#888;font-size:12px;">Pin ${i + 1} of ${pins.length}</span>
        </div>
        <span style="background:#1f2d1f;color:#6fcf97;padding:3px 10px;border-radius:4px;font-size:11px;font-weight:600;text-transform:uppercase;">● ${pin.status}</span>
      </div>

      <div style="margin-bottom:14px;">
        <div style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Post Slug</div>
        <div style="font-family:monospace;color:${color};font-size:13px;">${escapeHtml(pin.post_slug)}</div>
      </div>

      <div style="margin-bottom:14px;">
        <div style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Pin Image Path</div>
        <div style="font-family:monospace;color:#aaa;font-size:12px;">${escapeHtml(pin.pin_image_path)}
          &nbsp;<a href="${escapeHtml(pin.pin_image_path)}" target="_blank" style="color:${color};font-size:11px;">[preview]</a>
        </div>
      </div>

      <div style="margin-bottom:14px;">
        <div style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Title Variants (A/B)</div>
        ${titleVariants}
      </div>

      <div style="margin-bottom:14px;">
        <div style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Description ${descStatus}</div>
        <div style="font-size:13px;color:#c8c0b0;line-height:1.6;background:#0d0d0d;padding:12px;border-radius:4px;border-left:2px solid ${color};">
          ${escapeHtml(pin.description)}
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:14px;">
        <div>
          <div style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Destination</div>
          <a href="${escapeHtml(pin.destination_url)}" target="_blank" style="color:${color};font-size:12px;word-break:break-all;">${escapeHtml(pin.destination_url.replace(SITE, ''))}</a>
        </div>
        <div>
          <div style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Lead Magnet</div>
          <a href="${escapeHtml(pin.lead_magnet_url)}" target="_blank" style="color:#aaa;font-size:12px;word-break:break-all;">${escapeHtml(pin.lead_magnet_url.replace(SITE, ''))}</a>
        </div>
        <div>
          <div style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Product</div>
          <a href="${escapeHtml(pin.product_url)}" target="_blank" style="color:#aaa;font-size:12px;word-break:break-all;">${escapeHtml(pin.product_url.replace(SITE, ''))}</a>
        </div>
      </div>

      <div>
        <div style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Layout Note</div>
        <div style="font-size:12px;color:#888;font-style:italic;line-height:1.5;">
          ${escapeHtml(pin.layout_note)}
        </div>
      </div>
    </div>`;
  }).join('');

  const totalPct = Math.round((pins.length / TARGET_TOTAL) * 100);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pinterest Pin Approval Queue — StickVault</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0d0d0d; color: #e8e0d0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 40px 24px; }
    a { text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div style="max-width:860px;margin:0 auto;">

    <div style="margin-bottom:32px;padding-bottom:24px;border-bottom:1px solid rgba(212,175,55,0.2);">
      <div style="color:#d4af37;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">StickVault</div>
      <h1 style="font-size:28px;font-weight:700;color:#f0e8d8;margin-bottom:8px;">Pinterest Pin Approval Queue</h1>
      <div style="color:#888;font-size:14px;margin-bottom:16px;">
        All batches (A → C) — ${pins.length} of ${TARGET_TOTAL} pins staged (${totalPct}% complete).
        Nothing publishes until status changes from <code style="color:#d4af37;background:#1a1a1a;padding:2px 6px;border-radius:3px;">pending_approval</code>.
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:28px;">
      <div style="background:#161616;border:1px solid rgba(212,175,55,0.1);border-radius:6px;padding:18px;">
        <div style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:14px;">Progress by Pillar (target: 6 each)</div>
        ${pillarProgressBars}
      </div>
      <div>
        <div style="margin-bottom:12px;">${qualityPanel}</div>
        <div style="background:#161616;border:1px solid rgba(212,175,55,0.1);border-radius:6px;padding:14px;font-size:12px;color:#666;line-height:1.7;">
          <strong style="color:#d4af37;">Funnel path per pin:</strong><br>
          Pinterest → Pin → Article → Email Capture → Product
          <br><br>
          <strong style="color:#d4af37;">To approve:</strong><br>
          Edit <code style="color:#c8a84b;">data/pinterest-approval-queue.js</code> — change status to <code style="color:#c8a84b;">"approved"</code>.
        </div>
      </div>
    </div>

    ${pinCards}

    <div style="margin-top:32px;padding-top:24px;border-top:1px solid rgba(212,175,55,0.1);color:#555;font-size:12px;text-align:center;">
      JSON endpoint: <a href="/api/pinterest-queue" style="color:#888;">/api/pinterest-queue</a>
      &nbsp;·&nbsp;
      Pinterest map: <a href="/api/pinterest-map" style="color:#888;">/api/pinterest-map</a>
    </div>
  </div>
</body>
</html>`;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

module.exports = router;
