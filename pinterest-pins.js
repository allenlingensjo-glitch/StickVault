/**
 * routes/pinterest-pins.js
 * Owns: Server-rendered Pinterest marketing pin images (1000×1500 PNG) + admin dashboard.
 *   GET   /admin/pinterest-pins          — admin dashboard (view all pins + workflow)
 *   POST  /api/pinterest-pins/generate   — trigger batch generation (auth required)
 *   GET   /api/pinterest-pins/status     — progress summary JSON
 *   PATCH /api/pinterest-pins/:num       — update posting_status + notes (workflow tracking)
 *   GET   /api/pinterest-pins/export.csv — bulk CSV export of all pin metadata
 *   GET   /api/pinterest-pins/batch.zip  — bulk ZIP download of all done pin images
 *
 * Does NOT own: blog post pin images (see routes/pins.js), analytics, shop.
 *
 * Pin generation pipeline:
 *   1. SVG background rendered with sharp (dark vault aesthetic, category icon)
 *   2. Title text rendered via Pango (pixel-accurate font metrics, margin-safe)
 *   3. Layers composited into 1000×1500 PNG
 *   4. PNG uploaded to R2 for permanent storage
 *   5. R2 URL saved to pinterest_pins table
 */
const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const fetch = require('node-fetch');
const FormData = require('form-data');
const archiver = require('archiver');
const {
  seedPinDefinitions,
  getAllPins,
  getPinSummary,
  updatePinStatus,
  updatePinWorkflow,
} = require('../db/pinterest-pins');

const R2_BASE_URL = process.env.POLSIA_R2_BASE_URL || 'https://polsia.com';
const R2_UPLOAD_URL = `${R2_BASE_URL}/api/proxy/r2/upload`;
const API_KEY = process.env.POLSIA_API_KEY;

// In-memory generation state
let generationInProgress = false;
let generationLog = [];

// ─── Pillar visual configs ─────────────────────────────────────────────────────
const PILLAR_CONFIG = {
  COLLECTING: {
    accent: '#d4af37',
    label: 'COLLECTING',
    icon: `<g transform="rotate(-8, 500, 900)">
      <rect x="360" y="750" width="280" height="370" rx="8"
        fill="none" stroke="#d4af37" stroke-width="2.5" opacity="0.85"/>
      <rect x="378" y="768" width="244" height="318" rx="4"
        fill="#111" stroke="#c9a84c" stroke-width="1" opacity="0.6"/>
      <rect x="378" y="1050" width="244" height="36" rx="0 0 4 4"
        fill="#d4af37" opacity="0.12"/>
      <line x1="378" y1="1050" x2="622" y2="1050"
        stroke="#d4af37" stroke-width="0.8" opacity="0.5"/>
    </g>
    <g opacity="0.04">
      <line x1="0" y1="600" x2="1000" y2="600" stroke="#d4af37" stroke-width="1"/>
      <line x1="0" y1="800" x2="1000" y2="800" stroke="#d4af37" stroke-width="1"/>
      <line x1="200" y1="0" x2="200" y2="1500" stroke="#d4af37" stroke-width="1"/>
      <line x1="500" y1="0" x2="500" y2="1500" stroke="#d4af37" stroke-width="1"/>
      <line x1="800" y1="0" x2="800" y2="1500" stroke="#d4af37" stroke-width="1"/>
    </g>`,
  },
  DRUMS: {
    accent: '#d4af37',
    label: 'DRUMS',
    icon: `<g opacity="0.05">
      <circle cx="500" cy="920" r="300" fill="none" stroke="#d4af37" stroke-width="1.5"/>
      <circle cx="500" cy="920" r="210" fill="none" stroke="#d4af37" stroke-width="1.5"/>
      <circle cx="500" cy="920" r="120" fill="none" stroke="#d4af37" stroke-width="1.5"/>
    </g>
    <g transform="rotate(-38, 500, 920)">
      <rect x="493" y="650" width="14" height="340" rx="7" fill="#e8e0d0" opacity="0.8"/>
      <ellipse cx="500" cy="648" rx="16" ry="16"
        fill="#f0e8d8" stroke="#d4af37" stroke-width="2" opacity="0.9"/>
    </g>
    <g transform="rotate(38, 500, 920)">
      <rect x="493" y="650" width="14" height="340" rx="7" fill="#e8e0d0" opacity="0.8"/>
      <ellipse cx="500" cy="648" rx="16" ry="16"
        fill="#f0e8d8" stroke="#d4af37" stroke-width="2" opacity="0.9"/>
    </g>`,
  },
  ROUTINES: {
    accent: '#d4af37',
    label: 'ROUTINES',
    icon: `<g transform="translate(300, 760)">
      <rect x="0"   y="0"   width="120" height="88" rx="5" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.3"/>
      <rect x="130" y="0"   width="120" height="88" rx="5" fill="#d4af37" opacity="0.15"/>
      <rect x="130" y="0"   width="120" height="88" rx="5" fill="none" stroke="#d4af37" stroke-width="2" opacity="0.8"/>
      <rect x="260" y="0"   width="120" height="88" rx="5" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.3"/>
      <rect x="0"   y="98"  width="120" height="88" rx="5" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.3"/>
      <rect x="130" y="98"  width="120" height="88" rx="5" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.3"/>
      <rect x="260" y="98"  width="120" height="88" rx="5" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.3"/>
      <rect x="0"   y="196" width="120" height="88" rx="5" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.3"/>
      <rect x="130" y="196" width="120" height="88" rx="5" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.3"/>
      <rect x="260" y="196" width="120" height="88" rx="5" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.3"/>
    </g>`,
  },
  DISCOVERY: {
    accent: '#d4af37',
    label: 'DISCOVERY',
    icon: `<g opacity="0.07">
      <polygon points="140,620 162,658 140,696 118,658" fill="#d4af37"/>
      <polygon points="830,720 850,755 830,790 810,755" fill="#d4af37"/>
      <polygon points="180,1120 198,1148 180,1176 162,1148" fill="#d4af37"/>
      <polygon points="790,1080 808,1108 790,1136 772,1108" fill="#d4af37"/>
    </g>
    <circle cx="500" cy="880" r="145"
      fill="none" stroke="#d4af37" stroke-width="3" opacity="0.8"/>
    <circle cx="476" cy="858" r="48" fill="#d4af37" opacity="0.05"/>
    <line x1="606" y1="980" x2="678" y2="1052"
      stroke="#d4af37" stroke-width="13" stroke-linecap="round" opacity="0.8"/>
    <path d="M 428 818 Q 448 802 468 808"
      stroke="#e8d5a0" stroke-width="2.5" fill="none" opacity="0.45" stroke-linecap="round"/>`,
  },
  OPERATOR: {
    accent: '#d4af37',
    label: 'OPERATOR',
    icon: `<rect x="330" y="1060" width="340" height="72" rx="5"
      fill="#1a1a1a" stroke="#c9a84c" stroke-width="1.5" opacity="0.8"/>
    <rect x="360" y="978" width="280" height="70" rx="5"
      fill="#1a1a1a" stroke="#c9a84c" stroke-width="1.5" opacity="0.85"/>
    <rect x="392" y="898" width="216" height="68" rx="5"
      fill="#1a1a1a" stroke="#d4af37" stroke-width="1.8" opacity="0.9"/>
    <rect x="424" y="820" width="152" height="66" rx="5"
      fill="#1f1a0e" stroke="#d4af37" stroke-width="2" opacity="0.95"/>
    <rect x="456" y="744" width="88" height="64" rx="5"
      fill="#2a2010" stroke="#d4af37" stroke-width="2.5"/>
    <rect x="456" y="744" width="88" height="64" rx="5"
      fill="#d4af37" opacity="0.14"/>
    <polygon points="500,690 455,754 545,754" fill="#d4af37" opacity="0.88"/>`,
  },
};

// ─── Background SVG (no title text) ──────────────────────────────────────────
function buildBackgroundSVG(config) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1500" width="1000" height="1500">
  <defs>
    <radialGradient id="bg" cx="50%" cy="38%" r="65%">
      <stop offset="0%" stop-color="#1e1e1e"/>
      <stop offset="100%" stop-color="#070707"/>
    </radialGradient>
    <radialGradient id="vig" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.45"/>
    </radialGradient>
  </defs>

  <rect width="1000" height="1500" fill="url(#bg)"/>

  <!-- Top rule — 80px inset -->
  <rect x="80" y="78" width="840" height="1" fill="${config.accent}" opacity="0.22"/>

  <!-- STICKVAULT brand -->
  <text x="92" y="138" font-size="20" font-weight="700" letter-spacing="6"
    font-family="DejaVu Sans, Liberation Sans, Arial, sans-serif"
    fill="${config.accent}" opacity="0.65">STICKVAULT</text>

  <!-- Pillar label with rule accent -->
  <rect x="92" y="164" width="6" height="30" rx="1" fill="${config.accent}"/>
  <text x="110" y="186" font-size="16" font-weight="700" letter-spacing="5"
    font-family="DejaVu Sans, Liberation Sans, Arial, sans-serif"
    fill="${config.accent}" opacity="0.9">${config.label}</text>

  <!-- Subtle diagonal accent line -->
  <line x1="0" y1="440" x2="1000" y2="530"
    stroke="${config.accent}" stroke-width="0.5" opacity="0.06"/>

  <!-- Category icon -->
  ${config.icon}

  <!-- Vignette overlay -->
  <rect width="1000" height="1500" fill="url(#vig)"/>

  <!-- Bottom rule + URL -->
  <rect x="80" y="1418" width="840" height="1" fill="${config.accent}" opacity="0.22"/>
  <text x="500" y="1462" font-size="15" font-weight="700" letter-spacing="4"
    font-family="DejaVu Sans, Liberation Sans, Arial, sans-serif"
    fill="${config.accent}" opacity="0.4" text-anchor="middle">stickvault.com</text>
</svg>`;
}

// Escape for Pango markup
function escPango(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const TITLE_MAX_WIDTH = 760;   // 80px margins on 1000px canvas
const TITLE_MAX_HEIGHT = 290;
const TITLE_CENTER_Y = 560;
const FONT_SIZES = [48, 42, 36, 32, 28];

async function renderTitle(headline) {
  for (const size of FONT_SIZES) {
    const pangoSize = size * 1024;
    const markup = `<span foreground="#f4efe6" font_weight="ultrabold" font_size="${pangoSize}">${escPango(headline)}</span>`;
    const buf = await sharp({
      text: { text: markup, font: 'DejaVu Sans, Liberation Sans, Arial, sans-serif', width: TITLE_MAX_WIDTH, align: 'centre', rgba: true },
    }).png().toBuffer();
    const meta = await sharp(buf).metadata();
    if (meta.height <= TITLE_MAX_HEIGHT) {
      return { buffer: buf, width: meta.width, height: meta.height, fontSize: size };
    }
  }
  // Fallback: smallest size
  const pangoSize = FONT_SIZES[FONT_SIZES.length - 1] * 1024;
  const markup = `<span foreground="#f4efe6" font_weight="ultrabold" font_size="${pangoSize}">${escPango(headline)}</span>`;
  const buf = await sharp({
    text: { text: markup, font: 'DejaVu Sans, Liberation Sans, Arial, sans-serif', width: TITLE_MAX_WIDTH, align: 'centre', rgba: true },
  }).png().toBuffer();
  const meta = await sharp(buf).metadata();
  return { buffer: buf, width: meta.width, height: meta.height, fontSize: FONT_SIZES[FONT_SIZES.length - 1] };
}

// ─── Render a full 1000×1500 PNG for a pin ───────────────────────────────────
async function renderPin(pin) {
  const config = PILLAR_CONFIG[pin.pillar] || PILLAR_CONFIG.COLLECTING;

  // 1. SVG background
  const bgSvg = buildBackgroundSVG(config);
  const bgBuf = await sharp(Buffer.from(bgSvg)).resize(1000, 1500).png().toBuffer();

  // 2. Pango title
  const title = await renderTitle(pin.headline);
  console.log(`[pinterest-pins] pin-${pin.pin_number}: ${title.width}×${title.height}px @${title.fontSize}pt`);

  // 3. Title shadow
  const pad = 20;
  const shadowExpanded = await sharp({
    create: { width: title.width + pad * 2, height: title.height + pad * 2, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  }).composite([{ input: title.buffer, top: pad, left: pad }]).png().toBuffer();
  const shadowBuf = await sharp(shadowExpanded).tint({ r: 0, g: 0, b: 0 }).blur(12).ensureAlpha(0.8).png().toBuffer();

  // 4. Gold rule below title
  const ruleWidth = Math.min(600, title.width + 80);
  const ruleSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${ruleWidth}" height="2"><rect width="${ruleWidth}" height="2" rx="1" fill="${config.accent}" opacity="0.45"/></svg>`;
  const ruleBuf = await sharp(Buffer.from(ruleSvg)).png().toBuffer();

  // 5. Layout positions — title centered at TITLE_CENTER_Y
  const titleTop = Math.round(TITLE_CENTER_Y - title.height / 2);
  const titleLeft = Math.max(80, Math.round((1000 - title.width) / 2));
  const ruleTop = titleTop + title.height + 42;
  const ruleLeft = Math.round((1000 - ruleWidth) / 2);

  // 6. Composite
  const finalBuf = await sharp(bgBuf)
    .composite([
      { input: shadowBuf, top: titleTop - pad, left: titleLeft - pad, blend: 'over' },
      { input: title.buffer, top: titleTop, left: titleLeft, blend: 'over' },
      { input: ruleBuf, top: ruleTop, left: ruleLeft, blend: 'over' },
    ])
    .png({ compressionLevel: 6 })
    .toBuffer();

  return finalBuf;
}

// ─── Upload to R2 ─────────────────────────────────────────────────────────────
async function uploadToR2(buffer, filename) {
  const formData = new FormData();
  formData.append('file', buffer, { filename, contentType: 'image/png' });

  const res = await fetch(R2_UPLOAD_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      ...formData.getHeaders(),
    },
    body: formData,
  });

  const result = await res.json();
  if (!result.success) throw new Error(result.error?.message || 'R2 upload failed');
  return result.file.url;
}

// ─── Generate one pin ─────────────────────────────────────────────────────────
async function generatePin(pin) {
  const log = (msg) => {
    const entry = `[pin-${String(pin.pin_number).padStart(2, '0')}] ${msg}`;
    generationLog.push(`${new Date().toISOString()} ${entry}`);
    console.log(entry);
  };

  try {
    await updatePinStatus(pin.pin_number, 'generating');
    log('Rendering...');

    const buffer = await renderPin(pin);
    log(`Rendered ${buffer.length} bytes, uploading to R2...`);

    const filename = `pinterest-pins/pin-${String(pin.pin_number).padStart(2, '0')}.png`;
    const r2Url = await uploadToR2(buffer, filename);
    log(`Done → ${r2Url}`);

    await updatePinStatus(pin.pin_number, 'done', r2Url);
    return { success: true, url: r2Url };
  } catch (err) {
    log(`FAILED: ${err.message}`);
    await updatePinStatus(pin.pin_number, 'failed', null, err.message);
    return { success: false, error: err.message };
  }
}

// ─── Batch generation ─────────────────────────────────────────────────────────
async function runBatchGeneration(force = false) {
  if (generationInProgress) return;
  generationInProgress = true;
  generationLog = [];
  const log = (msg) => {
    generationLog.push(`${new Date().toISOString()} ${msg}`);
    console.log(`[pinterest-pins] ${msg}`);
  };

  try {
    await seedPinDefinitions();
    const allPins = await getAllPins();
    const toGenerate = force ? allPins : allPins.filter(p => p.status !== 'done');
    log(`Batch: ${toGenerate.length} pin(s) to generate`);

    let done = 0, failed = 0;
    for (const pin of toGenerate) {
      const result = await generatePin(pin);
      if (result.success) done++; else failed++;
    }
    log(`Batch complete: ${done} done, ${failed} failed`);
  } catch (err) {
    log(`Batch error: ${err.message}`);
  } finally {
    generationInProgress = false;
  }
}

// ─── Admin dashboard ──────────────────────────────────────────────────────────
router.get('/admin/pinterest-pins', async (req, res) => {
  try {
    await seedPinDefinitions();
    const pins = await getAllPins();
    const summary = await getPinSummary();
    res.render('admin/pinterest-pins', {
      pins,
      summary,
      inProgress: generationInProgress,
      recentLog: generationLog.slice(-30),
    });
  } catch (err) {
    console.error('[pinterest-pins] admin error:', err.message);
    res.status(500).render('error', { message: 'Pinterest pins dashboard error.' });
  }
});

// ─── Status API ───────────────────────────────────────────────────────────────
router.get('/api/pinterest-pins/status', async (req, res) => {
  try {
    const summary = await getPinSummary();
    res.json({ ...summary, in_progress: generationInProgress, recent_log: generationLog.slice(-20) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Generation trigger ───────────────────────────────────────────────────────
router.post('/api/pinterest-pins/generate', async (req, res) => {
  const provided = (req.headers.authorization || '').replace('Bearer ', '');
  if (provided !== process.env.POLSIA_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (generationInProgress) {
    return res.status(409).json({ error: 'Generation already in progress' });
  }

  const force = req.query.force === 'true';
  res.json({ started: true, message: `Batch generation started${force ? ' (force)' : ' (pending only)'}` });

  runBatchGeneration(force).catch(err => {
    console.error('[pinterest-pins] runBatchGeneration error:', err.message);
    generationInProgress = false;
  });
});

// ─── Workflow PATCH (posting_status + notes) ─────────────────────────────────
router.patch('/api/pinterest-pins/:num', async (req, res) => {
  const pinNumber = parseInt(req.params.num, 10);
  if (isNaN(pinNumber) || pinNumber < 1 || pinNumber > 30) {
    return res.status(400).json({ error: 'Invalid pin number' });
  }
  const { posting_status, notes } = req.body;
  const allowed = ['Not Posted', 'Posted', 'Needs Edit'];
  if (posting_status && !allowed.includes(posting_status)) {
    return res.status(400).json({ error: 'Invalid posting_status' });
  }
  try {
    await updatePinWorkflow(pinNumber, posting_status || 'Not Posted', notes || '');
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── CSV export ───────────────────────────────────────────────────────────────
router.get('/api/pinterest-pins/export.csv', async (req, res) => {
  try {
    const pins = await getAllPins();
    const header = 'pin_number,title,description,image_filename,destination_url,utm_url,board,keywords,cta_angle,funnel_pillar,status,notes\n';
    const csvEsc = (v) => `"${String(v || '').replace(/"/g, '""')}"`;
    const rows = pins.map(p => [
      p.pin_number,
      csvEsc(p.headline),
      csvEsc(p.description),
      `pin_${String(p.pin_number).padStart(2, '0')}.png`,
      csvEsc(p.destination_url),
      csvEsc(p.utm_url),
      csvEsc(p.board),
      csvEsc(p.keywords),
      csvEsc(p.cta_angle),
      csvEsc(p.funnel_pillar),
      csvEsc(p.posting_status || 'Not Posted'),
      csvEsc(p.notes),
    ].join(',')).join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="stickvault_pins.csv"');
    res.send(header + rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Bulk ZIP download ────────────────────────────────────────────────────────
// Streams all done-status pin images from R2 into a ZIP archive.
router.get('/api/pinterest-pins/batch.zip', async (req, res) => {
  try {
    const pins = await getAllPins();
    const done = pins.filter(p => p.status === 'done' && p.r2_url);
    if (done.length === 0) {
      return res.status(404).json({ error: 'No generated pins available yet.' });
    }

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="stickvault_pins_batch.zip"');

    const archive = archiver('zip', { zlib: { level: 6 } });
    archive.on('error', (err) => { console.error('[pinterest-pins] zip error:', err.message); });
    archive.pipe(res);

    for (const pin of done) {
      try {
        const imgRes = await fetch(pin.r2_url);
        if (!imgRes.ok) continue;
        const filename = `pin_${String(pin.pin_number).padStart(2, '0')}.png`;
        archive.append(imgRes.body, { name: filename });
      } catch (e) {
        console.error(`[pinterest-pins] zip fetch pin-${pin.pin_number}: ${e.message}`);
      }
    }

    await archive.finalize();
  } catch (err) {
    if (!res.headersSent) res.status(500).json({ error: err.message });
  }
});

// Seed pin definitions on startup (idempotent)
setTimeout(() => {
  seedPinDefinitions().catch(err => console.error('[pinterest-pins] seed error:', err.message));
}, 10000);

module.exports = router;
