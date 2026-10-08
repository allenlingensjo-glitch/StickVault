/**
 * Pinterest pin routes.
 * Owns:
 *   GET /pins/:slug.png     — serves on-brand PNG pin image for a blog post
 *   GET /pins/:slug.svg     — serves SVG source (kept for preview/debug)
 *   GET /api/pins/status    — generation progress check
 *   POST /api/pins/generate — admin-triggered DB URL population
 *   auto-trigger on startup — populates pin_image DB column for all posts
 *
 * Does NOT own: blog post content, DB pool (uses db/pins.js), OG tag rendering.
 *
 * Pin images are generated in-memory as SVG, rendered to 1000x1500 PNG via sharp,
 * and served directly from Express. Pinterest requires raster formats (PNG/JPEG)
 * for og:image — SVG is not supported by Pinterest crawlers.
 * pin_image column stores: https://www.stickvault.com/pins/{slug}.png
 */
const express = require('express');
const sharp = require('sharp');
const router = express.Router();
const { getPostBySlug } = require('../db/blog');
const {
  getPostsMissingPins,
  getAllPublishedPosts,
  updatePinImage,
  getPinStatus,
} = require('../db/pins');

// In-memory generation state
let generationInProgress = false;
let lastGenerationLog = [];

// In-memory PNG cache — avoids re-rendering on every request.
// Key: slug, Value: { buffer: Buffer, etag: string }
const pngCache = new Map();

// Canonical site URL — set via SITE_URL env var.
// Used for DB writes (pin_image column) so stored URLs resolve correctly.
// Falls back to RENDER_EXTERNAL_URL or Render's polsia.app subdomain.
const SITE_URL = process.env.SITE_URL || process.env.RENDER_EXTERNAL_URL || 'https://stickvault.polsia.app';

// ─── Category visual configurations ──────────────────────────────────────────
const CATEGORY_CONFIG = {
  'collecting': {
    accent: '#d4af37',
    label: 'COLLECTING',
    // Card slab + vault grid
    icon: `<g transform="rotate(-12, 500, 850)">
      <rect x="370" y="720" width="260" height="350" rx="8"
        fill="none" stroke="#d4af37" stroke-width="2.5" opacity="0.9"/>
      <rect x="388" y="738" width="224" height="298" rx="4"
        fill="#111" stroke="#c9a84c" stroke-width="1" opacity="0.7"/>
      <rect x="388" y="1000" width="224" height="36"
        fill="#d4af37" opacity="0.15"/>
      <line x1="388" y1="1000" x2="612" y2="1000"
        stroke="#d4af37" stroke-width="0.8" opacity="0.6"/>
      <line x1="370" y1="720" x2="370" y2="1070"
        stroke="#d4af37" stroke-width="1.5" opacity="0.4"/>
    </g>
    <g opacity="0.04">
      <line x1="0" y1="500" x2="1000" y2="500" stroke="#d4af37" stroke-width="1"/>
      <line x1="0" y1="700" x2="1000" y2="700" stroke="#d4af37" stroke-width="1"/>
      <line x1="0" y1="900" x2="1000" y2="900" stroke="#d4af37" stroke-width="1"/>
      <line x1="200" y1="0" x2="200" y2="1500" stroke="#d4af37" stroke-width="1"/>
      <line x1="500" y1="0" x2="500" y2="1500" stroke="#d4af37" stroke-width="1"/>
      <line x1="800" y1="0" x2="800" y2="1500" stroke="#d4af37" stroke-width="1"/>
    </g>`,
  },
  'drums': {
    accent: '#d4af37',
    label: 'DRUMS',
    // Crossed drumsticks + rhythm rings
    icon: `<g opacity="0.06">
      <circle cx="500" cy="900" r="280" fill="none" stroke="#d4af37" stroke-width="1.5"/>
      <circle cx="500" cy="900" r="200" fill="none" stroke="#d4af37" stroke-width="1.5"/>
      <circle cx="500" cy="900" r="120" fill="none" stroke="#d4af37" stroke-width="1.5"/>
    </g>
    <g transform="rotate(-35, 500, 900)">
      <rect x="494" y="640" width="12" height="320" rx="6" fill="#e8e0d0" opacity="0.85"/>
      <ellipse cx="500" cy="638" rx="14" ry="14"
        fill="#f0e8d8" stroke="#d4af37" stroke-width="1.5" opacity="0.95"/>
      <rect x="494" y="680" width="4" height="200" rx="2" fill="#d4af37" opacity="0.3"/>
    </g>
    <g transform="rotate(35, 500, 900)">
      <rect x="494" y="640" width="12" height="320" rx="6" fill="#e8e0d0" opacity="0.85"/>
      <ellipse cx="500" cy="638" rx="14" ry="14"
        fill="#f0e8d8" stroke="#d4af37" stroke-width="1.5" opacity="0.95"/>
      <rect x="502" y="680" width="4" height="200" rx="2" fill="#d4af37" opacity="0.3"/>
    </g>`,
  },
  'routines': {
    accent: '#d4af37',
    label: 'ROUTINES',
    // 3x3 system grid with one highlighted cell
    icon: `<g opacity="0.05">
      <line x1="100" y1="750" x2="900" y2="750" stroke="#d4af37" stroke-width="1"/>
      <line x1="100" y1="850" x2="900" y2="850" stroke="#d4af37" stroke-width="1"/>
      <line x1="100" y1="950" x2="900" y2="950" stroke="#d4af37" stroke-width="1"/>
    </g>
    <g transform="translate(310, 740)">
      <rect x="0"   y="0"   width="110" height="80" rx="4" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.3"/>
      <rect x="120" y="0"   width="110" height="80" rx="4" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.3"/>
      <rect x="240" y="0"   width="110" height="80" rx="4" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.3"/>
      <rect x="0"   y="90"  width="110" height="80" rx="4" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.3"/>
      <rect x="120" y="90"  width="110" height="80" rx="4" fill="#d4af37" opacity="0.18"/>
      <rect x="120" y="90"  width="110" height="80" rx="4" fill="none" stroke="#d4af37" stroke-width="2" opacity="0.9"/>
      <rect x="240" y="90"  width="110" height="80" rx="4" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.3"/>
      <rect x="0"   y="180" width="110" height="80" rx="4" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.3"/>
      <rect x="120" y="180" width="110" height="80" rx="4" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.3"/>
      <rect x="240" y="180" width="110" height="80" rx="4" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.3"/>
    </g>
    <rect x="270" y="720" width="460" height="310" rx="6"
      fill="none" stroke="#d4af37" stroke-width="1.5" opacity="0.35"/>`,
  },
  'hidden-gems': {
    accent: '#d4af37',
    label: 'HIDDEN GEMS',
    // Magnifying glass + scatter diamonds
    icon: `<g opacity="0.08">
      <polygon points="150,600 170,630 150,660 130,630" fill="#d4af37"/>
      <polygon points="820,700 838,728 820,756 802,728" fill="#d4af37"/>
      <polygon points="200,1100 212,1120 200,1140 188,1120" fill="#d4af37"/>
      <polygon points="780,1050 795,1075 780,1100 765,1075" fill="#d4af37"/>
      <polygon points="350,1200 360,1215 350,1230 340,1215" fill="#d4af37"/>
    </g>
    <circle cx="500" cy="870" r="140"
      fill="none" stroke="#d4af37" stroke-width="3" opacity="0.85"/>
    <circle cx="500" cy="870" r="134" fill="#d4af37" opacity="0.03"/>
    <circle cx="476" cy="848" r="44" fill="#d4af37" opacity="0.06"/>
    <line x1="600" y1="968" x2="670" y2="1038"
      stroke="#d4af37" stroke-width="12" stroke-linecap="round" opacity="0.85"/>
    <path d="M 430 810 Q 450 795 470 800"
      stroke="#e8d5a0" stroke-width="2.5" fill="none" opacity="0.5" stroke-linecap="round"/>`,
  },
  'side-hustles': {
    accent: '#d4af37',
    label: 'SIDE HUSTLES',
    // Stacked blocks + upward arrow — momentum
    icon: `<g opacity="0.05">
      <line x1="200" y1="1000" x2="450" y2="1000" stroke="#d4af37" stroke-width="1.5"/>
      <line x1="160" y1="940" x2="430" y2="940" stroke="#d4af37" stroke-width="1"/>
      <line x1="120" y1="880" x2="410" y2="880" stroke="#d4af37" stroke-width="0.8"/>
    </g>
    <rect x="330" y="1040" width="340" height="70" rx="5"
      fill="#1a1a1a" stroke="#c9a84c" stroke-width="1.5" opacity="0.8"/>
    <rect x="360" y="960" width="280" height="68" rx="5"
      fill="#1a1a1a" stroke="#c9a84c" stroke-width="1.5" opacity="0.85"/>
    <rect x="390" y="882" width="220" height="66" rx="5"
      fill="#1a1a1a" stroke="#d4af37" stroke-width="1.8" opacity="0.9"/>
    <rect x="420" y="806" width="160" height="64" rx="5"
      fill="#1f1a0e" stroke="#d4af37" stroke-width="2" opacity="0.95"/>
    <rect x="450" y="732" width="100" height="62" rx="5"
      fill="#2a2010" stroke="#d4af37" stroke-width="2.5"/>
    <rect x="450" y="732" width="100" height="62" rx="5"
      fill="#d4af37" opacity="0.12"/>
    <polygon points="500,680 455,740 545,740" fill="#d4af37" opacity="0.9"/>
    <line x1="550" y1="740" x2="570" y2="1110"
      stroke="#d4af37" stroke-width="1.5" opacity="0.25" stroke-dasharray="6,10"/>`,
  },
};

// ─── SVG background generator ─────────────────────────────────────────────────
// Generates the pin background WITHOUT the title text. Title is rendered
// separately via sharp's Pango text engine and composited on top.
//
// WHY not SVG <text>: librsvg ignores textLength/lengthAdjust, and character-
// count heuristics to estimate pixel width are unreliable across platforms
// (different fonts installed on build vs Render). Three prior attempts
// (#1593608, #1594352, #1612311-prev) all used SVG <text> with progressively
// tighter multipliers — none worked because the approach is fundamentally
// flawed. Pango measures with the actual installed fonts and wraps to a hard
// pixel-width constraint, eliminating the estimation problem entirely.
function generateBackgroundSVG(config) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1500" width="1000" height="1500">
  <defs>
    <radialGradient id="bg" cx="50%" cy="38%" r="65%">
      <stop offset="0%" stop-color="#1e1e1e"/>
      <stop offset="100%" stop-color="#070707"/>
    </radialGradient>
    <radialGradient id="vig" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.5"/>
    </radialGradient>
    <style>
      text { font-family: 'DejaVu Sans', 'Liberation Sans', 'Arial Black', Arial, Helvetica, sans-serif; }
    </style>
  </defs>

  <rect width="1000" height="1500" fill="url(#bg)"/>

  <!-- Top rule — 80px inset from each edge -->
  <rect x="80" y="76" width="840" height="1" fill="${config.accent}" opacity="0.22"/>

  <!-- Brand — 80px left inset -->
  <text x="92" y="136" font-size="20" font-weight="700" letter-spacing="6"
    fill="${config.accent}" opacity="0.65">STICKVAULT</text>

  <!-- Category pill — 80px left inset -->
  <rect x="92" y="162" width="6" height="30" rx="1" fill="${config.accent}"/>
  <text x="110" y="184" font-size="16" font-weight="700" letter-spacing="5"
    fill="${config.accent}" opacity="0.9">${config.label}</text>

  <!-- Subtle diagonal accent -->
  <line x1="0" y1="430" x2="1000" y2="525"
    stroke="${config.accent}" stroke-width="0.5" opacity="0.07"/>

  <!-- Category icon -->
  ${config.icon}

  <!-- Vignette -->
  <rect width="1000" height="1500" fill="url(#vig)"/>

  <!-- Bottom rule — 80px inset -->
  <rect x="80" y="1416" width="840" height="1" fill="${config.accent}" opacity="0.22"/>
  <text x="500" y="1458" font-size="16" font-weight="700" letter-spacing="4"
    fill="${config.accent}" opacity="0.45" text-anchor="middle">www.stickvault.com</text>
</svg>`;
}

// ─── Gold rule SVG (composited below title) ──────────────────────────────────
function generateRuleSVG(accent) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="2">
  <rect width="600" height="2" rx="1" fill="${accent}" opacity="0.45"/>
</svg>`;
}

// Escape special chars for Pango markup (uses XML entity references)
function escPango(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Title text width (px). Leaves 120px margin each side on 1000px canvas.
const TITLE_MAX_WIDTH = 760;
// Title vertical center on the 1500px canvas
const TITLE_CENTER_Y = 580;

// ─── Pango title renderer ─────────────────────────────────────────────────────
// Renders the title as a transparent RGBA PNG using sharp's built-in Pango
// text engine. Pango handles word wrapping with pixel-accurate font metrics —
// no character-count estimation needed. Tries font sizes from large to small
// until the rendered text fits within the height budget (max ~260px to leave
// room for brand header and decorative elements).
const TITLE_FONT_SIZES = [48, 42, 36, 32, 28];
const TITLE_MAX_HEIGHT = 280;

async function renderTitleImage(title) {
  for (const size of TITLE_FONT_SIZES) {
    const result = await _renderAtSize(title, size);
    if (result.height <= TITLE_MAX_HEIGHT) {
      return await _ensureFits(result);
    }
  }
  // Even smallest size exceeds budget — use it anyway
  const result = await _renderAtSize(title, TITLE_FONT_SIZES[TITLE_FONT_SIZES.length - 1]);
  return await _ensureFits(result);
}

// Render title text at a given font size via Pango
async function _renderAtSize(title, size) {
  const pangoSize = size * 1024;
  const markup = `<span foreground="#f4efe6" font_weight="ultrabold" font_size="${pangoSize}">${escPango(title)}</span>`;

  const buf = await sharp({
    text: {
      text: markup,
      font: 'DejaVu Sans, Liberation Sans, Arial, sans-serif',
      width: TITLE_MAX_WIDTH,
      align: 'centre',
      rgba: true,
    },
  }).png().toBuffer();

  const meta = await sharp(buf).metadata();
  return { buffer: buf, width: meta.width, height: meta.height, fontSize: size };
}

// Safety check: if Pango produced a buffer wider than the max (shouldn't
// happen, but defensive against broken fontconfig or env quirks), scale it
// down to fit. Also catches suspiciously small renders (broken fonts).
async function _ensureFits(result) {
  const { buffer, width, height, fontSize } = result;

  // WHY: On environments where fontconfig can't find system fonts, Pango
  // renders at a tiny default size (≈12px) regardless of font_size. Detect
  // this and log a warning so production issues are visible.
  if (height < 20 && fontSize >= 28) {
    console.warn(`[pins] WARNING: title rendered at ${width}x${height} for font ${fontSize}pt — likely fontconfig misconfiguration`);
  }

  // If width exceeds the safe zone, resize proportionally to fit
  if (width > TITLE_MAX_WIDTH) {
    console.log(`[pins] Title width ${width}px exceeds ${TITLE_MAX_WIDTH}px limit — resizing`);
    const scaledBuf = await sharp(buffer)
      .resize({ width: TITLE_MAX_WIDTH, fit: 'inside' })
      .png()
      .toBuffer();
    const scaledMeta = await sharp(scaledBuf).metadata();
    return { buffer: scaledBuf, width: scaledMeta.width, height: scaledMeta.height, fontSize };
  }

  return result;
}

// ─── Text shadow renderer ─────────────────────────────────────────────────────
// Creates a dark blurred version of the title for depth/readability.
async function renderTitleShadow(titleBuf, width, height) {
  // Expand canvas to accommodate blur spread (20px padding each side)
  const pad = 20;
  const expanded = await sharp({
    create: { width: width + pad * 2, height: height + pad * 2, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: titleBuf, top: pad, left: pad }])
    .png()
    .toBuffer();

  // Tint to black and blur for shadow effect
  return sharp(expanded)
    .tint({ r: 0, g: 0, b: 0 })
    .blur(12)
    .ensureAlpha(0.85)
    .png()
    .toBuffer();
}

// ─── SVG → PNG conversion ────────────────────────────────────────────────────
// Composites three layers: SVG background, title shadow, title text, gold rule.
// Title is rendered by Pango (pixel-accurate wrapping) instead of SVG <text>
// (which overflows because librsvg ignores width constraints).
async function renderPNG(post) {
  const etag = `"pin-${post.slug}-${post.updated_at || post.created_at}"`;
  const cached = pngCache.get(post.slug);
  if (cached && cached.etag === etag) return cached;

  const config = CATEGORY_CONFIG[post.category] || CATEGORY_CONFIG['collecting'];

  // 1. Render SVG background (no title text)
  const bgSvg = generateBackgroundSVG(config);
  const bgBuffer = await sharp(Buffer.from(bgSvg))
    .resize(1000, 1500)
    .png()
    .toBuffer();

  // 2. Render title via Pango
  const title = await renderTitleImage(post.title);
  console.log(`[pins] ${post.slug}: title=${title.width}x${title.height}px font=${title.fontSize}pt`);

  // 3. Render title shadow
  const shadowPad = 20;
  const shadowBuffer = await renderTitleShadow(title.buffer, title.width, title.height);

  // 4. Render gold rule SVG
  const ruleSvg = generateRuleSVG(config.accent);
  const ruleBuffer = await sharp(Buffer.from(ruleSvg)).png().toBuffer();

  // 5. Calculate positions — title centered at TITLE_CENTER_Y
  // Clamp titleLeft so text never bleeds past 80px margin on either side
  const titleTop = Math.round(TITLE_CENTER_Y - title.height / 2);
  const titleLeft = Math.max(80, Math.round((1000 - title.width) / 2));
  const ruleTop = titleTop + title.height + 40;

  // 6. Composite all layers
  const composites = [
    // Shadow behind title (offset by shadow padding)
    { input: shadowBuffer, top: titleTop - shadowPad, left: titleLeft - shadowPad, blend: 'over' },
    // Title text
    { input: title.buffer, top: titleTop, left: titleLeft, blend: 'over' },
    // Gold rule centered below title
    { input: ruleBuffer, top: ruleTop, left: 200, blend: 'over' },
  ];

  const buffer = await sharp(bgBuffer)
    .composite(composites)
    .png({ compressionLevel: 6 })
    .toBuffer();

  const entry = { buffer, etag };
  pngCache.set(post.slug, entry);
  return entry;
}

// ─── PNG pin endpoint (primary — used by Pinterest og:image) ─────────────────
router.get('/pins/:slug.png', async (req, res) => {
  try {
    const post = await getPostBySlug(req.params.slug);
    if (!post) return res.status(404).send('Pin not found');

    const { buffer, etag } = await renderPNG(post);

    // ETag-based conditional response
    if (req.headers['if-none-match'] === etag) {
      return res.status(304).end();
    }

    res.set({
      'Content-Type': 'image/png',
      'Content-Length': buffer.length,
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
      'ETag': etag,
    });
    res.send(buffer);
  } catch (err) {
    console.error('[pins] PNG serve error:', err.message);
    res.status(500).send('Pin generation failed');
  }
});

// ─── SVG pin endpoint (background only — kept for preview/debug) ─────────────
// Returns only the background SVG (no title). Title is rendered by Pango in the
// PNG endpoint. This is useful for debugging the background layout.
router.get('/pins/:slug.svg', async (req, res) => {
  try {
    const post = await getPostBySlug(req.params.slug);
    if (!post) return res.status(404).send('Pin not found');

    const config = CATEGORY_CONFIG[post.category] || CATEGORY_CONFIG['collecting'];
    const svg = generateBackgroundSVG(config);

    res.set({
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
      'ETag': `"pin-${post.slug}-${post.updated_at || post.created_at}"`,
    });
    res.send(svg);
  } catch (err) {
    console.error('[pins] SVG serve error:', err.message);
    res.status(500).send('Pin generation failed');
  }
});

// ─── DB URL population ────────────────────────────────────────────────────────
// Populates blog_posts.pin_image with the self-hosted PNG URL for each post.
// Pinterest requires raster images — SVG og:image tags are not crawled.
async function populatePinUrls(forceAll = false) {
  if (generationInProgress) return { skipped: true };
  generationInProgress = true;
  lastGenerationLog = [];
  const log = (msg) => {
    lastGenerationLog.push(`${new Date().toISOString()} ${msg}`);
    console.log(`[pins] ${msg}`);
  };

  let succeeded = 0, failed = 0;
  try {
    const posts = forceAll ? await getAllPublishedPosts() : await getPostsMissingPins();
    log(`Populating pin URLs: ${posts.length} post(s)`);

    for (const post of posts) {
      try {
        const pinUrl = `${SITE_URL}/pins/${post.slug}.png`;
        await updatePinImage(post.id, pinUrl);
        log(`\u2713 ${post.slug}`);
        succeeded++;
      } catch (err) {
        log(`\u2717 ${post.slug}: ${err.message}`);
        failed++;
      }
    }

    log(`Complete: ${succeeded} succeeded, ${failed} failed`);
    return { succeeded, failed };
  } finally {
    generationInProgress = false;
  }
}

// ─── Migration: fix legacy SVG URLs → PNG ────────────────────────────────────
// One-time: any posts still referencing .svg URLs get upgraded to .png.
async function migrateSvgUrlsToPng() {
  try {
    const posts = await getAllPublishedPosts();
    let migrated = 0;
    for (const post of posts) {
      if (post.pin_image && post.pin_image.endsWith('.svg')) {
        const pngUrl = post.pin_image.replace(/\.svg$/, '.png');
        await updatePinImage(post.id, pngUrl);
        migrated++;
      }
    }
    if (migrated > 0) {
      console.log(`[pins] Migrated ${migrated} pin URL(s) from .svg to .png`);
    }
  } catch (err) {
    console.error('[pins] SVG→PNG migration error:', err.message);
  }
}

// ─── Migration: fix wrong-domain pin URLs ────────────────────────────────────
// WHY: pin_image URLs were previously set to www.stickvault.com, which has no
// DNS or Render custom-domain configuration. All pin og:image URLs 404'd.
// This one-time migration rewrites them to the actual deployed domain.
async function migrateDomainUrls() {
  try {
    const posts = await getAllPublishedPosts();
    let migrated = 0;
    for (const post of posts) {
      if (post.pin_image && !post.pin_image.startsWith(SITE_URL)) {
        const correctUrl = `${SITE_URL}/pins/${post.slug}.png`;
        await updatePinImage(post.id, correctUrl);
        migrated++;
      }
    }
    if (migrated > 0) {
      console.log(`[pins] Migrated ${migrated} pin URL(s) to domain ${SITE_URL}`);
    }
  } catch (err) {
    console.error('[pins] Domain migration error:', err.message);
  }
}

// ─── Status endpoint ──────────────────────────────────────────────────────────
router.get('/api/pins/status', async (req, res) => {
  try {
    const counts = await getPinStatus();
    res.json({
      ...counts,
      format: 'png',
      site_url: SITE_URL,
      in_progress: generationInProgress,
      cache_size: pngCache.size,
      last_log: lastGenerationLog.slice(-20),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Diagnostic endpoint ──────────────────────────────────────────────────────
// Renders a single pin and returns metadata (not the image) for debugging.
// Verifies that Pango text rendering produces correct dimensions.
router.get('/api/pins/diagnose/:slug', async (req, res) => {
  try {
    const post = await getPostBySlug(req.params.slug);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const title = await renderTitleImage(post.title);
    const titleLeft = Math.max(80, Math.round((1000 - title.width) / 2));
    const titleTop = Math.round(TITLE_CENTER_Y - title.height / 2);

    res.json({
      slug: post.slug,
      title: post.title,
      pin_image_url: post.pin_image,
      rendering: {
        title_width: title.width,
        title_height: title.height,
        font_size: title.fontSize,
        max_width: TITLE_MAX_WIDTH,
        max_height: TITLE_MAX_HEIGHT,
        title_left: titleLeft,
        title_top: titleTop,
        left_margin: titleLeft,
        right_margin: 1000 - titleLeft - title.width,
        within_safe_zone: title.width <= TITLE_MAX_WIDTH,
        fontconfig_ok: title.height >= 20,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Generate/refresh endpoint ────────────────────────────────────────────────
router.post('/api/pins/generate', async (req, res) => {
  const provided = (req.headers.authorization || '').replace('Bearer ', '');
  if (provided !== process.env.POLSIA_API_KEY) return res.status(401).json({ error: 'Unauthorized' });
  if (generationInProgress) return res.status(409).json({ error: 'In progress' });

  const force = req.query.force === 'true';
  // Clear cache on force regeneration
  if (force) pngCache.clear();

  res.json({ started: true, message: `Populating pin URLs${force ? ' (force)' : ' (missing only)'}` });

  populatePinUrls(force).catch(err => {
    console.error('[pins] Population error:', err.message);
    generationInProgress = false;
  });
});

// ─── Auto-populate on startup ─────────────────────────────────────────────────
// Runs 8s after start to let DB pool and migrations settle.
// Runs three migrations in order: SVG→PNG, wrong-domain→correct-domain, then
// populates any posts still missing a pin_image URL.
setTimeout(async () => {
  try {
    // Clear in-memory PNG cache so updated template renders immediately on deploy
    pngCache.clear();

    // Migrate legacy SVG URLs to PNG format
    await migrateSvgUrlsToPng();

    // Migrate pin_image URLs from wrong domain (www.stickvault.com) to actual
    // deployed domain (stickvault.polsia.app)
    await migrateDomainUrls();

    const { missing } = await getPinStatus();
    if (missing > 0) {
      console.log(`[pins] Auto-populating ${missing} missing pin URLs...`);
      populatePinUrls(false).catch(err => {
        console.error('[pins] Auto-populate error:', err.message);
        generationInProgress = false;
      });
    } else {
      console.log('[pins] All pin URLs populated. Ready.');
    }
  } catch (err) {
    console.error('[pins] Startup check failed:', err.message);
  }
}, 8000);

module.exports = router;
