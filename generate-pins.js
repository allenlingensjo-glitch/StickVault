/**
 * Pinterest pin image generator.
 * Owns: generating 1000×1500 DALL-E 3 images for every blog post, uploading to R2,
 *       and updating blog_posts.pin_image with the CDN URL.
 * Does NOT own: blog post content, product images, R2 config.
 *
 * Usage:
 *   node scripts/generate-pins.js              — generates missing pins only
 *   node scripts/generate-pins.js --force      — regenerates all pins
 *   node scripts/generate-pins.js --slug=<slug> — single post only
 */

require('dotenv').config();
const { Pool } = require('pg');
const OpenAI = require('openai');
const fetch = require('node-fetch');
const FormData = require('form-data');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const openai = new OpenAI();

const FORCE = process.argv.includes('--force');
const SLUG_ARG = process.argv.find(a => a.startsWith('--slug='))?.split('=')[1] || null;

// ─── Category visual motifs ───────────────────────────────────────────────────
// Each category gets a signature visual treatment so pins feel like one ecosystem
// while being recognizable by pillar.
const CATEGORY_MOTIFS = {
  'collecting': {
    icon: 'a single graded trading card in a protective slab, angled at 15 degrees, catching light',
    texture: 'subtle vault grid pattern in the background',
    accent: 'warm amber glow rimlight',
    mood: 'preservation, value, precision',
  },
  'drums': {
    icon: 'a pair of drumsticks crossed at an angle, clean minimal composition',
    texture: 'faint concentric rhythm rings emanating from center',
    accent: 'electric gold highlight',
    mood: 'rhythm, flow state, kinetic energy',
  },
  'routines': {
    icon: 'a minimal grid of perfect squares arranged in a 3×3 system layout',
    texture: 'thin horizontal rule lines suggesting structure and order',
    accent: 'crisp geometric gold border frame',
    mood: 'systems thinking, discipline, operational clarity',
  },
  'hidden-gems': {
    icon: 'a single magnifying glass lens with a glowing discovery effect inside',
    texture: 'scattered small diamond shapes suggesting hidden value',
    accent: 'spotlight beam breaking through dark background',
    mood: 'discovery, underground knowledge, curation',
  },
  'side-hustles': {
    icon: 'an upward arrow made of stacked building blocks, momentum visualization',
    texture: 'diagonal motion lines suggesting forward movement',
    accent: 'energetic gold streak',
    mood: 'momentum, leverage, building from scratch',
  },
};

// ─── Prompt builder ───────────────────────────────────────────────────────────
// Produces a DALL-E 3 prompt that reliably generates on-brand editorial pins.
// Key constraints: no text (DALL-E text is unreliable), pure visual composition.
function buildPrompt(post, motif) {
  return `Create a vertical editorial pin image (portrait orientation, 2:3 ratio) for a premium lifestyle publication called StickVault.

VISUAL IDENTITY (non-negotiable):
- Dark charcoal background, almost black, hex range #0d0d0d to #1a1a1a
- Single warm gold accent element, hex range #c9a84c to #d4af37
- Minimalist editorial layout — restrained, premium, no clutter
- No text, no typography, no letters, no words anywhere in the image
- No stock photo aesthetic, no generic AI look, no bright saturated colors
- High contrast, moody, editorial darkness with precise gold illumination

CATEGORY MOTIF FOR THIS PIN (${post.category}):
- Primary visual element: ${motif.icon}
- Background texture: ${motif.texture}
- Accent treatment: ${motif.accent}
- Emotional mood: ${motif.mood}

COMPOSITION:
- Subject occupies center-bottom third of frame
- Top third: pure dark background with subtle texture (leave space for text overlay in post-processing)
- Bottom third: the category icon/motif, slightly illuminated
- One strong diagonal line or element to create visual tension
- Negative space is intentional — do not fill it

QUALITY REQUIREMENTS:
- Photo-realistic rendering quality
- Premium editorial magazine aesthetic
- Save-worthy Pinterest visual — feels like a luxury lifestyle pin
- Consistent with: ${post.title}

Do NOT include: any text, watermarks, logos, human faces, clutter, bright colors, gradients that are not dark-to-darker, white backgrounds, or busy compositions.`;
}

// ─── Alternate pin titles (A/B testing data) ──────────────────────────────────
// 3-4 variants per post for Pinterest copy testing
const PIN_TITLE_VARIANTS = {
  'building-your-first-drum-practice-routine': [
    'The 30-Minute Practice System That Actually Builds Skills',
    'Stop Noodling. Start Progressing. (Drum Routine)',
    'How Serious Drummers Structure Their Practice Time',
    'The Routine That Works When You Have No Time',
  ],
  'how-to-start-a-vinyl-collection-without-losing-your-mind': [
    'Start Your Vinyl Collection the Right Way',
    'Buy These 10 Records First. Then Everything Else.',
    'The Collector\'s Rule: Gear Before Records',
    'How to Build a Vinyl Collection That Lasts',
  ],
  'the-5-am-myth-building-a-routine-that-works-for-night-owls': [
    'Your Chronotype Is Not a Character Flaw',
    'The Real Morning Routine for Night Owls',
    'Peak Hours > Wake Hours (Build Around Your Best Time)',
    '5AM Is a Lie. Here\'s What Actually Works.',
  ],
  'hidden-gems-discogs-strategies-worth-knowing': [
    '5 Discogs Moves Most Collectors Don\'t Know',
    'Find the Records Worth Buying Before Everyone Else',
    'The Smart Buyer\'s Discogs Playbook',
    'Stop Overpaying on Discogs. Do This Instead.',
  ],
  'turning-your-passion-into-income-without-ruining-it': [
    'Monetize Your Passion Without Destroying It',
    'The Line Between Love and Work (Don\'t Cross It)',
    'How to Build a Side Hustle That Doesn\'t Kill the Joy',
    'Charge What Kills the Bad Clients',
  ],
  'how-to-grade-sports-cards-psa-guide-for-beginners': [
    'Everything You Need to Know Before Submitting to PSA',
    'The 4 Grading Criteria That Determine Your Card\'s Value',
    'Is Grading Worth It? Run This Math First.',
    'How PSA Grading Actually Works (No Fluff)',
  ],
  'ebay-sports-card-selling-workflow': [
    'My eBay Card Selling System (Step by Step)',
    'How to Move Cards on eBay Without the Headache',
    'The Workflow That Turns Raw Cards Into Cash',
    'Stop Listing Blindly. Use a System.',
  ],
  'building-a-pc-sports-cards-long-term-collection-strategy': [
    'Build a PC That Actually Appreciates in Value',
    'The Long Game: Personal Collection Strategy',
    'Why Your PC Should Be 10 Players Deep, Not 100',
    'How Serious Collectors Build a PC With Intention',
  ],
  'drum-practice-routine-that-actually-sticks': [
    'The Practice Routine You Won\'t Quit After a Week',
    'Consistency Over Marathon Sessions (Drum System)',
    'Build Real Skill in 30 Minutes Per Session',
    'The Drummer\'s Weekly Structure That Produces Results',
  ],
  'hidden-gem-drum-gear-under-50': [
    'Hidden Gem Drum Gear Most Players Sleep On',
    'Under $50, Over-Delivers. (Drummer\'s Edit)',
    'The Gear Serious Drummers Buy First',
    '5 Drum Tools That Punch Way Above Their Price',
  ],
  'turning-your-collection-into-a-side-hustle': [
    'Turn Your Collection Into a Real Income Stream',
    'The Honest Playbook for Card Flippers',
    'From Collector to Seller: The Transition Guide',
    'How to Make Money From Your PC Without Liquidating It',
  ],
  'morning-vault-systems-based-morning-routine': [
    'The Morning System for People Who Build Things',
    'A Vault-Based Approach to Your First Two Hours',
    'How Collectors and Creators Start Their Day',
    'The Operator\'s Morning: Systems Before Screens',
  ],
  '5-underrated-sports-cards-worth-watching-now': [
    '5 Cards the Market Is Sleeping On Right Now',
    'Underrated. Undervalued. Watch These.',
    'The Vault\'s Watchlist: Cards to Know Now',
    'Before the Pop Report Catches Up (5 Picks)',
  ],
  'grading-prep-system-before-submitting-to-psa': [
    'Prep Your Card Like a Pro Before Grading',
    'The Checklist That Maximizes Your PSA Grade',
    'What to Do Before You Submit to PSA, BGS, or SGC',
    'Most Graders Miss This. Don\'t Be One.',
  ],
  'collector-inventory-organization-system': [
    'The Spreadsheet System Every Serious Collector Needs',
    'Know Exactly What You Own. Finally.',
    'Collection Organization for Serious PCs',
    'Build an Inventory That Actually Tells You Something',
  ],
  'common-sports-card-collector-mistakes': [
    '8 Collector Mistakes That Cost Real Money',
    'Stop Making These Errors Before They Get Expensive',
    'What Separates Beginners From Serious Collectors',
    'The Mistakes Nobody Warns You About (Until It\'s Late)',
  ],
  'collector-value-tracking-system': [
    'How to Actually Track What Your Collection Is Worth',
    'Comps, Watchlists, and Sell Decisions. A System.',
    'The Value Tracker Every Card Collector Needs',
    'Stop Guessing What Your Cards Are Worth',
  ],
  'affordable-collector-tools-under-50': [
    'The Essential Collector Kit Under $50',
    'Tools Every Serious Card Collector Actually Uses',
    'Budget Builds, Professional Results',
    '5 Tools Worth Every Dollar for Collectors',
  ],
  'pc-building-philosophy-personal-collection-with-intention': [
    'Build a Personal Collection With Actual Intention',
    'The Philosophy Behind a Great PC',
    'Curate, Don\'t Accumulate',
    'What Your PC Says About How You Collect',
  ],
  'sports-card-flipping-workflow-buy-low-sell-high-system': [
    'The Card Flipping System That Actually Works',
    'Buy Low, Sell High, Track Everything',
    'How Serious Flippers Structure Their Workflow',
    'Profit Is a System. Here\'s Mine.',
  ],
  'serious-collector-weekly-routine-workflow-habits': [
    'The Weekly Habits That Keep a PC Running',
    'How Serious Collectors Spend Their Week',
    'Systems That Keep Your Collection Under Control',
    'The Collector\'s Weekly Operating System',
  ],
  'ebay-listing-optimization-sports-cards-sell-faster': [
    'eBay Listings That Actually Sell Cards Faster',
    'Photos, Titles, Pricing: The Complete Optimization Guide',
    'Why Your Cards Aren\'t Selling (And How to Fix It)',
    'The Listing System That Moves Cards Consistently',
  ],
  'grading-service-comparison-psa-bgs-sgc-cgc': [
    'PSA vs BGS vs SGC vs CGC: The Honest Comparison',
    'Which Grading Service Should You Use? (Real Answer)',
    'When to Use PSA. When to Use BGS. When to Use SGC.',
    'Grading Services Compared. Pick the Right One.',
  ],
};

// ─── R2 upload helper ─────────────────────────────────────────────────────────
async function uploadToR2(imageBuffer, filename) {
  const formData = new FormData();
  formData.append('file', imageBuffer, {
    filename,
    contentType: 'image/png',
  });

  const response = await fetch('https://polsia.com/api/proxy/r2/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.POLSIA_API_KEY}`,
      ...formData.getHeaders(),
    },
    body: formData,
  });

  const result = await response.json();
  if (!result.success) {
    throw new Error(`R2 upload failed: ${result.error?.message || 'unknown error'}`);
  }
  return result.file.url;
}

// ─── Generate one pin ─────────────────────────────────────────────────────────
async function generatePinForPost(post) {
  const motif = CATEGORY_MOTIFS[post.category] || CATEGORY_MOTIFS['collecting'];
  const prompt = buildPrompt(post, motif);

  console.log(`  Generating DALL-E 3 image for: ${post.slug} (${post.category})`);

  // DALL-E 3 generates 1024×1024 minimum; use 1024×1792 for portrait
  // Pinterest 2:3 ratio → closest supported size is 1024×1792
  const imageResponse = await openai.images.generate({
    model: 'dall-e-3',
    prompt,
    size: '1024x1792',
    quality: 'standard',
    response_format: 'url',
    n: 1,
  });

  const tempUrl = imageResponse.data[0].url;
  console.log(`  Image generated, uploading to R2...`);

  // Fetch the image bytes from the temp DALL-E URL
  const imgFetch = await fetch(tempUrl);
  if (!imgFetch.ok) throw new Error(`Failed to fetch DALL-E image: ${imgFetch.status}`);
  const imgBuffer = Buffer.from(await imgFetch.arrayBuffer());

  const filename = `pins/stickvault-pin-${post.slug}.png`;
  const cdnUrl = await uploadToR2(imgBuffer, filename);

  console.log(`  Uploaded to R2: ${cdnUrl}`);
  return cdnUrl;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const client = await pool.connect();
  try {
    // Query posts that need pin images
    let query, params;
    if (SLUG_ARG) {
      query = 'SELECT id, slug, title, category, pin_image FROM blog_posts WHERE slug = $1 AND published = true';
      params = [SLUG_ARG];
    } else if (FORCE) {
      query = 'SELECT id, slug, title, category, pin_image FROM blog_posts WHERE published = true ORDER BY category, created_at';
      params = [];
    } else {
      query = 'SELECT id, slug, title, category, pin_image FROM blog_posts WHERE published = true AND pin_image IS NULL ORDER BY category, created_at';
      params = [];
    }

    const { rows: posts } = await client.query(query, params);
    console.log(`Pin generation: ${posts.length} post(s) to process`);

    if (posts.length === 0) {
      console.log('All pins already generated. Use --force to regenerate.');
      return;
    }

    let succeeded = 0;
    let failed = 0;

    for (const post of posts) {
      try {
        const pinUrl = await generatePinForPost(post);

        await client.query(
          'UPDATE blog_posts SET pin_image = $1, updated_at = NOW() WHERE id = $2',
          [pinUrl, post.id]
        );

        console.log(`  ✓ ${post.slug}`);
        succeeded++;

        // Rate limit: DALL-E 3 allows ~5 images/min on standard tier
        // Wait 13s between generations to stay comfortably under limit
        if (posts.indexOf(post) < posts.length - 1) {
          await new Promise(r => setTimeout(r, 13000));
        }
      } catch (err) {
        console.error(`  ✗ ${post.slug}: ${err.message}`);
        failed++;
        // Continue with next post — don't let one failure kill the batch
      }
    }

    console.log(`\nPin generation complete: ${succeeded} succeeded, ${failed} failed`);
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(err => {
  console.error('Pin generation failed:', err.message);
  process.exit(1);
});
