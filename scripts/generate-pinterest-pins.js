// scripts/generate-pinterest-pins.js
// Generates 30 branded Pinterest pins via DALL-E 3.
// Saves PNGs to /public/pinterest-pins/pin-01.png ... pin-30.png
// Usage: node scripts/generate-pinterest-pins.js [--force] [--only=01]

const OpenAI = require('openai');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const client = new OpenAI();
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'pinterest-pins');

const FORCE = process.argv.includes('--force');
const ONLY = (process.argv.find(a => a.startsWith('--only=')) || '').replace('--only=', '');

const pins = [
  // BATCH A — Collecting
  { num: '01', headline: 'Card Grading Scale Explained: What PSA, BGS, and CGC Actually Mean', pillar: 'COLLECTING' },
  { num: '02', headline: 'How to Build a Sports Card Portfolio Without Losing Your Mind', pillar: 'COLLECTING' },
  { num: '03', headline: 'PSA vs BGS: Which Grading Company Should You Use?', pillar: 'COLLECTING' },
  { num: '04', headline: 'The Right Way to Store and Protect Your Card Collection', pillar: 'COLLECTING' },
  { num: '05', headline: 'How to Flip Cards on eBay Without Getting Burned', pillar: 'COLLECTING' },
  { num: '06', headline: "The Collector's Weekly Review: 5 Minutes That Save You Thousands", pillar: 'COLLECTING' },
  // BATCH B — Drums
  { num: '07', headline: 'The Ultimate Rudiment Ladder: 40 Drumming Exercises to Master First', pillar: 'DRUMS' },
  { num: '08', headline: "How to Read Drum Notation: A Practical Guide for Drummers Who Never Learned to Read Music", pillar: 'DRUMS' },
  { num: '09', headline: "The Drummer's Practice Blueprint: A System for Getting Better Without Wasting Time", pillar: 'DRUMS' },
  { num: '10', headline: "How to Practice Drums Without a Drum Kit: Drills for When You're Away from Your Kit", pillar: 'DRUMS' },
  { num: '11', headline: 'Stick Control Fundamentals: The Single Strokes, Double Strokes, and Paradiddles Every Drummer Must Own', pillar: 'DRUMS' },
  { num: '12', headline: 'How to Find Your Flow State on the Drums: Discipline, Rhythm, and the Art of Playing in the Zone', pillar: 'DRUMS' },
  // BATCH C — Routines
  { num: '13', headline: 'The Weekly Review System That Actually Changes Your Trajectory', pillar: 'ROUTINES' },
  { num: '14', headline: 'Consistency Without Motivation: The Systems-Based Approach to Showing Up Every Day', pillar: 'ROUTINES' },
  { num: '15', headline: "The Creator's Operating System: Your Daily Framework for Building Momentum", pillar: 'ROUTINES' },
  { num: '16', headline: 'The Morning Vault: 5 Systems to Open Before 9AM', pillar: 'ROUTINES' },
  { num: '17', headline: 'Digital Hygiene: The Daily Reset That Protects Your Best Thinking', pillar: 'ROUTINES' },
  { num: '18', headline: "The Night Owl's Output Stack: How to Produce Your Best Work After Everyone Else is Asleep", pillar: 'ROUTINES' },
  // BATCH D — Hidden Gems / Discovery
  { num: '19', headline: 'The Weekly Review System That Actually Changes Your Trajectory', pillar: 'DISCOVERY' },
  { num: '20', headline: 'PSA vs BGS: Which Grading Company Should You Use?', pillar: 'DISCOVERY' },
  { num: '21', headline: 'Consistency Without Motivation: The Systems-Based Approach to Showing Up Every Day', pillar: 'DISCOVERY' },
  { num: '22', headline: 'Card Grading Scale Explained: What PSA, BGS, and CGC Actually Mean', pillar: 'DISCOVERY' },
  { num: '23', headline: 'The Right Way to Store and Protect Your Card Collection', pillar: 'DISCOVERY' },
  { num: '24', headline: 'How to Find Your Flow State on the Drums: Discipline, Rhythm, and the Art of Playing in the Zone', pillar: 'DISCOVERY' },
  // BATCH E — Creator Systems / Operator
  { num: '25', headline: "The Creator's Operating System: Your Daily Framework for Building Momentum", pillar: 'OPERATOR' },
  { num: '26', headline: 'The Side Hustle Launchpad: The First 30 Days of Building Something Real', pillar: 'OPERATOR' },
  { num: '27', headline: 'The Weekly Review System That Actually Changes Your Trajectory', pillar: 'OPERATOR' },
  { num: '28', headline: 'Consistency Without Motivation: The Systems-Based Approach to Showing Up Every Day', pillar: 'OPERATOR' },
  { num: '29', headline: "The Night Owl's Output Stack: How to Produce Your Best Work After Everyone Else is Asleep", pillar: 'OPERATOR' },
  { num: '30', headline: 'Digital Hygiene: The Daily Reset That Protects Your Best Thinking', pillar: 'OPERATOR' },
];

function buildPrompt(pin) {
  return `Create a premium Pinterest pin image (vertical, 2:3 aspect ratio, like 1000x1500px).

STYLE: Dark editorial magazine — luxury vault aesthetic.
- Background: near-black charcoal (#1a1a1a), solid, no gradients, no photographs
- A subtle thin gold (#c9a84c) horizontal rule or decorative line element as an accent
- Clean editorial layout with strong typographic hierarchy

TEXT (render exactly as shown, large and legible):
- PILLAR LABEL (small, top-left or top-right corner): "${pin.pillar}" — serif or all-caps sans, muted gold color, small size
- HEADLINE (centered, bold, white, large): "${pin.headline}"
  - CRITICAL: Leave at least 80px of empty dark space on BOTH left and right edges — NO text touching the edges
  - Text must be fully contained in the safe zone
- BRAND (bottom, small): "StickVault" — muted gold or white, subtle

LAYOUT guidelines:
- The headline is the hero — it should dominate the center of the pin with generous padding
- Minimal, editorial, no clutter
- Dark background must fill entire frame
- No stock photography, no real people, no brand logos

OUTPUT: A single tall vertical image ready for Pinterest.`;
}

async function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(destPath);
    proto.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        file.close();
        return downloadImage(res.headers.location, destPath).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function generatePin(pin) {
  const filename = `pin-${pin.num}.png`;
  const dest = path.join(OUTPUT_DIR, filename);

  if (!FORCE && fs.existsSync(dest)) {
    console.log(`[SKIP] ${filename} already exists`);
    return;
  }

  console.log(`[GEN]  pin-${pin.num}: ${pin.pillar} — ${pin.headline.slice(0, 60)}...`);

  const response = await client.images.generate({
    model: 'dall-e-3',
    prompt: buildPrompt(pin),
    size: '1024x1792',
    quality: 'standard',
    n: 1,
  });

  const imageUrl = response.data[0].url;
  await downloadImage(imageUrl, dest);
  console.log(`[DONE] ${filename} saved`);
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const toGenerate = ONLY ? pins.filter(p => p.num === ONLY) : pins;

  console.log(`Generating ${toGenerate.length} pin(s)...`);

  let done = 0;
  let failed = [];

  for (const pin of toGenerate) {
    try {
      await generatePin(pin);
      done++;
      // Brief pause to avoid rate limits
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.error(`[FAIL] pin-${pin.num}: ${err.message}`);
      failed.push(pin.num);
    }
  }

  console.log(`\n✓ Done: ${done}/${toGenerate.length}`);
  if (failed.length) {
    console.log(`✗ Failed: ${failed.join(', ')}`);
    console.log('Re-run with --only=XX for individual retries');
  }
}

main().catch(console.error);
