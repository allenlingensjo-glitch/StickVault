/**
 * Generate "The Drummer's Practice Toolkit" PDF-style image.
 * Renders an SVG document to PNG and uploads to R2.
 * Run: node scripts/generate-pdf.js
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

// The SVG document styled like a printable one-page toolkit
// Uses only system fonts so sharp can render it without fontconfig
const SVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1100" viewBox="0 0 800 1100">
  <!-- Background -->
  <rect fill="#0d0d0d" width="800" height="1100"/>

  <!-- Gold border -->
  <rect fill="none" stroke="#d4af37" stroke-width="2" x="32" y="32" width="736" height="1036" rx="2"/>

  <!-- Stamp -->
  <text x="60" y="72" font-family="sans-serif" font-size="11" letter-spacing="3" fill="#d4af37">StickVault · Free Download</text>

  <!-- Title -->
  <text x="60" y="145" font-family="Georgia, serif" font-size="40" font-weight="bold" fill="#f5f0e8">The Drummer's</text>
  <text x="60" y="192" font-family="Georgia, serif" font-size="40" font-weight="bold" fill="#f5f0e8">Practice Toolkit</text>
  <line stroke="#d4af37" stroke-width="0.75" x1="60" y1="210" x2="740" y2="210"/>
  <text x="60" y="236" font-family="sans-serif" font-size="14" fill="#999">The session system serious drummers use to actually improve —</text>
  <text x="60" y="256" font-family="sans-serif" font-size="14" fill="#999">without burning out, without wasting time on the wrong things.</text>

  <!-- Section 1 -->
  <line stroke="#d4af37" stroke-width="0.75" x1="60" y1="284" x2="740" y2="284"/>
  <text x="60" y="314" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="2" fill="#d4af37">01 · SESSION FRAMEWORK</text>
  <text x="60" y="344" font-family="sans-serif" font-size="14" fill="#d4af37">✓</text><text x="84" y="344" font-family="sans-serif" font-size="13" fill="#ccc">Warm-up is a ritual, not a warmup. Same 3 things, same order, every session.</text>
  <text x="60" y="372" font-family="sans-serif" font-size="14" fill="#d4af37">✓</text><text x="84" y="372" font-family="sans-serif" font-size="13" fill="#ccc">The 60/20/20 split: 60% on the weakness, 20% on maintaining strengths,</text>
  <text x="84" y="392" font-family="sans-serif" font-size="13" fill="#ccc">20% on creative/experimental work. Most drummers have this backwards.</text>
  <text x="60" y="420" font-family="sans-serif" font-size="14" fill="#d4af37">✓</text><text x="84" y="420" font-family="sans-serif" font-size="13" fill="#ccc">End every session with a "clean close" — 2 minutes of the most controlled</text>
  <text x="84" y="440" font-family="sans-serif" font-size="13" fill="#ccc">playing of the day. This is your new baseline reference.</text>

  <!-- Section 2 -->
  <line stroke="#d4af37" stroke-width="0.75" x1="60" y1="468" x2="740" y2="468"/>
  <text x="60" y="498" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="2" fill="#d4af37">02 · RUDIMENT ARCHITECTURE</text>
  <text x="60" y="528" font-family="sans-serif" font-size="14" fill="#d4af37">✓</text><text x="84" y="528" font-family="sans-serif" font-size="13" fill="#ccc">Single strokes → Double strokes → Paradiddles → Flams — in that order.</text>
  <text x="60" y="556" font-family="sans-serif" font-size="14" fill="#d4af37">✓</text><text x="84" y="556" font-family="sans-serif" font-size="13" fill="#ccc">Three-stickings to unlock independence: LRL, LRR, LRL, RLL (and reverse).</text>
  <text x="60" y="584" font-family="sans-serif" font-size="14" fill="#d4af37">✓</text><text x="84" y="584" font-family="sans-serif" font-size="13" fill="#ccc">The Moeller method in plain English: whip, bounce, control —</text>
  <text x="84" y="604" font-family="sans-serif" font-size="13" fill="#ccc">not a magic trick, it's a physics principle applied to the stick.</text>

  <!-- Tip box -->
  <rect fill="#161616" stroke="#333" stroke-width="1" x="60" y="626" width="680" height="56" rx="2"/>
  <text x="80" y="650" font-family="sans-serif" font-size="11" fill="#d4af37" letter-spacing="2">TACTICAL NOTE</text>
  <text x="80" y="668" font-family="sans-serif" font-size="12" fill="#aaa">Speed is a byproduct of accuracy, not the other way around.</text>
  <text x="80" y="686" font-family="sans-serif" font-size="12" fill="#aaa">Practice at 60% speed with perfect technique before chasing tempo.</text>

  <!-- Section 3 -->
  <line stroke="#d4af37" stroke-width="0.75" x1="60" y1="710" x2="740" y2="710"/>
  <text x="60" y="740" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="2" fill="#d4af37">03 · TIME &amp; FEEL</text>
  <text x="60" y="770" font-family="sans-serif" font-size="14" fill="#d4af37">✓</text><text x="84" y="770" font-family="sans-serif" font-size="13" fill="#ccc">Play with a click 50% of the time. The other 50%, play in the pocket —</text>
  <text x="84" y="790" font-family="sans-serif" font-size="13" fill="#ccc">your internal clock is the instrument, not the device.</text>
  <text x="60" y="818" font-family="sans-serif" font-size="14" fill="#d4af37">✓</text><text x="84" y="818" font-family="sans-serif" font-size="13" fill="#ccc">Subdivide in 16ths while walking a groove. If you can't do both,</text>
  <text x="84" y="838" font-family="sans-serif" font-size="13" fill="#ccc">your groove isn't locked — it's luck.</text>
  <text x="60" y="866" font-family="sans-serif" font-size="14" fill="#d4af37">✓</text><text x="84" y="866" font-family="sans-serif" font-size="13" fill="#ccc">Record yourself playing with a metronome. Listen back with fresh ears.</text>
  <text x="84" y="886" font-family="sans-serif" font-size="13" fill="#ccc">You'll hear exactly what you think you sound like. Humbling and necessary.</text>

  <!-- Section 4 -->
  <line stroke="#d4af37" stroke-width="0.75" x1="60" y1="914" x2="740" y2="914"/>
  <text x="60" y="944" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="2" fill="#d4af37">04 · MAINTENANCE &amp; GEAR</text>
  <text x="60" y="974" font-family="sans-serif" font-size="14" fill="#d4af37">✓</text><text x="84" y="974" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f5f0e8">Tune your drums like a drummer, not a technician. Kick toms 2–3 Hz</text>
  <text x="84" y="994" font-family="sans-serif" font-size="13" fill="#ccc">apart, snare in the 400–440Hz range, floor tom a 4th below the rack.</text>
  <text x="60" y="1022" font-family="sans-serif" font-size="14" fill="#d4af37">✓</text><text x="84" y="1022" font-family="sans-serif" font-size="13" fill="#ccc">Check tension rods monthly. Loose hardware = tone loss + bad habits</text>
  <text x="84" y="1042" font-family="sans-serif" font-size="13" fill="#ccc">from overcompensating for pitch inconsistency.</text>

  <!-- Footer -->
  <line stroke="#d4af37" stroke-width="0.75" x1="60" y1="1066" x2="740" y2="1066"/>
  <text x="60" y="1088" font-family="sans-serif" font-size="10" letter-spacing="2" fill="#555">stickvault.com · No email required to download · CC0</text>
</svg>`;

async function main() {
  const R2_BASE_URL = process.env.POLSIA_R2_BASE_URL || 'https://polsia.com';
  const R2_UPLOAD_URL = `${R2_BASE_URL}/api/proxy/r2/upload`;
  const API_KEY = process.env.POLSIA_API_KEY;

  console.log('Generating Drummer Practice Toolkit image...');

  // Render SVG → PNG via sharp (no Google Fonts import, system fonts only)
  const pngBuffer = await sharp(Buffer.from(SVG))
    .png({ quality: 90 })
    .toBuffer();

  console.log(`PNG generated: ${pngBuffer.length} bytes`);

  // Save local copy first
  const outDir = path.join(__dirname, '..', 'public', 'downloads');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'drummer-practice-toolkit.png'), pngBuffer);
  console.log('Local copy saved to public/downloads/drummer-practice-toolkit.png');

  // Upload to R2 using form-data package
  const FormData = require('form-data');
  const formData = new FormData();
  formData.append('file', pngBuffer, {
    filename: 'downloads/drummer-practice-toolkit.png',
    contentType: 'image/png',
  });

  console.log('Uploading to R2...');
  const res = await fetch(R2_UPLOAD_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      ...formData.getHeaders(),
    },
    body: formData,
  });

  const result = await res.json();
  if (!result.success) {
    console.error('R2 upload failed:', result.error?.message || JSON.stringify(result.error));
    console.log('Local file is available at /downloads/drummer-practice-toolkit.png');
    return;
  }

  console.log('Success! R2 URL:', result.file.url);
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});