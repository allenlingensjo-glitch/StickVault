/**
 * db/pinterest-pins.js
 * Owns: all DB access for the pinterest_pins table.
 * Does NOT own: pin generation logic, R2 upload, or DALL-E calls.
 */
const pool = require('./index');

// ─── Static metadata per pin ──────────────────────────────────────────────────
// Destination URLs use stickvault.com (canonical domain). UTM content = pin_XX.
const BASE_DOMAIN = 'https://stickvault.com';
const UTM_SUFFIX = 'utm_source=pinterest&utm_medium=social&utm_campaign=stickvault_pins';

function makeUtm(path, pinNum) {
  const padded = String(pinNum).padStart(2, '0');
  return `${BASE_DOMAIN}${path}?${UTM_SUFFIX}&utm_content=pin_${padded}`;
}

// Pin-level metadata: description, destination, board, keywords, CTA, funnel pillar
const PIN_META = {
  // ── COLLECTING (pins 1–6) ───────────────────────────────────────────────────
  1: {
    description: 'PSA, BGS, and CGC explained in plain English. Learn what each grading scale means, how they differ, and which company is right for your cards. The definitive guide for collectors who want real grades, not guesses. #sportscards #cardgrading #PSA #BGS #CGC #collectingguide',
    destination: '/blog/grading-service-comparison-psa-bgs-sgc-cgc',
    board: 'Sports Card Grading & Authentication',
    keywords: 'card grading, PSA grading, BGS grading, CGC cards, sports card authentication, grading scale explained, card collecting',
    cta_angle: 'Read the full grading comparison',
    funnel_pillar: 'Collecting',
  },
  2: {
    description: 'Building a sports card portfolio is more than chasing big names. This guide covers set strategy, budget discipline, condition focus, and knowing when to sell. Structured collecting beats impulse buying every time. #sportscards #cardcollecting #portfoliostrategy #cardflipping',
    destination: '/blog/grading-service-comparison-psa-bgs-sgc-cgc',
    board: 'Sports Card Collecting Systems',
    keywords: 'sports card portfolio, card collecting strategy, card investing, budget collecting, when to sell cards, collector mindset',
    cta_angle: 'Get the Grading Prep Checklist (free)',
    funnel_pillar: 'Collecting',
  },
  3: {
    description: 'PSA vs BGS — the real comparison. Turnaround times, costs, pop reports, and which company protects value better. Data-driven breakdown with no fluff, so you can make the right call on your next submission. #PSA #BGS #cardgrading #sportscards',
    destination: '/blog/grading-service-comparison-psa-bgs-sgc-cgc',
    board: 'Sports Card Grading & Authentication',
    keywords: 'PSA vs BGS, card grading comparison, PSA grading, BGS beckett, grading company review, sports card submission',
    cta_angle: 'Read PSA vs BGS full breakdown',
    funnel_pillar: 'Collecting',
  },
  4: {
    description: 'Card storage done right. Toploaders, one-touches, binders, vaults — when to use each and what to avoid. Protecting your collection is protecting your investment. Start with the right supplies and never fumble a graded card again. #sportscards #cardstorage #collectioncare',
    destination: '/blog/sports-card-flipping-workflow-buy-low-sell-high-system',
    board: 'Sports Card Collecting Systems',
    keywords: 'card storage, sports card protection, toploaders, card sleeves, collection organization, graded card storage',
    cta_angle: 'Learn the full card flip workflow',
    funnel_pillar: 'Collecting',
  },
  5: {
    description: 'Card flipping on eBay without the headaches. Sourcing strategy, listing optimization, pricing psychology, and avoiding common rookie mistakes that kill your margins. The practical guide for collectors who want to turn the hobby into cash flow. #cardflipping #eBay #sportscards #sidehustle',
    destination: '/blog/sports-card-flipping-workflow-buy-low-sell-high-system',
    board: 'Sports Card Collecting Systems',
    keywords: 'card flipping, eBay selling, sports cards for profit, card reselling, collecting side hustle, card arbitrage',
    cta_angle: 'Read the card flip playbook',
    funnel_pillar: 'Collecting',
  },
  6: {
    description: 'A 5-minute weekly review system built for serious collectors. Track what moved, what you paid, what sold, and what to pursue next week. Discipline separates hobbyists from operators. #sportscards #weeklyreview #collectorroutine #cardcollecting',
    destination: '/blog/serious-collector-weekly-routine-workflow-habits',
    board: 'Sports Card Collecting Systems',
    keywords: 'collector weekly review, card portfolio tracking, collecting routine, sports card discipline, collector habits',
    cta_angle: 'Get the Collector\'s Vault Starter Kit',
    funnel_pillar: 'Collecting',
  },
  // ── DRUMS (pins 7–12) ────────────────────────────────────────────────────────
  7: {
    description: '40 drumming rudiments in the right order. Master the paradiddle ladder before anything else — these patterns are the foundation of every beat, fill, and groove you\'ll ever play. Serious drummers start here. #drumming #rudiments #paradiddle #drumlessons',
    destination: '/blog/paradiddle-playbook-exercises-speed-control',
    board: "Drummer's Practice Blueprint",
    keywords: 'drumming rudiments, paradiddle, drum exercises, rudiment ladder, beginner drums, drum practice, stick control',
    cta_angle: 'Get the full rudiment sequence',
    funnel_pillar: 'Drums',
  },
  8: {
    description: 'Reading drum notation doesn\'t have to be painful. This practical breakdown cuts the music theory fluff and gives you exactly what you need to read charts and lead sheets. For drummers who never learned and always wanted to. #drumnotation #readingmusic #drumlessons #drumming',
    destination: '/blog/reading-drum-notation-guide-for-self-taught-drummers',
    board: "Drummer's Practice Blueprint",
    keywords: 'drum notation, reading music drums, drum charts, drum sheet music, music theory drumming, drum lessons',
    cta_angle: 'Download the Drummer\'s Practice Blueprint',
    funnel_pillar: 'Drums',
  },
  9: {
    description: 'Stop wasting practice time. This blueprint gives you a structured daily session — warm-up, rudiments, grooves, fills, free play — with time targets that build measurable improvement. Stop noodling, start progressing. #drumming #drumlessons #practiceplan #drumroutine',
    destination: '/blog/drum-practice-routine-that-actually-sticks',
    board: "Drummer's Practice Blueprint",
    keywords: 'drum practice plan, drummer routine, structured practice drumming, drum improvement, practice schedule drums',
    cta_angle: 'Get the Drummer\'s Practice Blueprint ($9)',
    funnel_pillar: 'Drums',
  },
  10: {
    description: 'No kit? No problem. These drills keep your hands sharp on a practice pad, pillow, or desk. Coordination, dynamics, timing — all trainable away from the drums. For when life gets in the way of the kit. #drumming #practicepad #drumlessons #drumdrill',
    destination: '/blog/drum-practice-routine-that-actually-sticks',
    board: "Drummer's Practice Blueprint",
    keywords: 'practice pad drumming, drums without kit, drum drills, portable drum practice, rudiments practice pad',
    cta_angle: 'Read the away-from-kit practice guide',
    funnel_pillar: 'Drums',
  },
  11: {
    description: 'Single strokes, double strokes, paradiddles — these are the three fundamental stick patterns every drummer must own before anything else. This guide breaks them down with exercises, tempos, and common mistakes. #drumming #stickcontrol #rudiments #drumlessons',
    destination: '/blog/stick-control-drummers-secret-weapon',
    board: "Drummer's Practice Blueprint",
    keywords: 'stick control, single stroke roll, double stroke roll, paradiddle, drum technique, drumming fundamentals',
    cta_angle: 'Read the stick control guide',
    funnel_pillar: 'Drums',
  },
  12: {
    description: 'Flow state on drums isn\'t luck — it\'s engineered. This post breaks down the warm-up sequences, tempo zones, and mindset conditions that reliably get you in the zone during practice. Discipline creates the conditions; flow follows. #drumming #flowstate #mindfulpractice',
    destination: '/blog/flow-state-drumming-when-practice-becomes-play',
    board: "Drummer's Practice Blueprint",
    keywords: 'flow state drumming, mindful practice, drum zone, drumming focus, practice psychology, drummers mindset',
    cta_angle: 'Read the flow state drumming guide',
    funnel_pillar: 'Drums',
  },
  // ── ROUTINES (pins 13–18) ────────────────────────────────────────────────────
  13: {
    description: 'The weekly review is the highest-leverage 30 minutes of your week. This system covers what to capture, what to cut, and how to walk out of every Sunday session with a clear plan. Most people skip it. That\'s why they stay stuck. #weeklyreview #productivity #routines #systemsthinking',
    destination: '/blog/weekly-review-operators-checkpoint',
    board: 'Morning Routines That Stick',
    keywords: 'weekly review system, productivity routine, Sunday planning, review method, GTD weekly review, personal systems',
    cta_angle: 'Read the weekly review system',
    funnel_pillar: 'Routines',
  },
  14: {
    description: 'Motivation is weather. Systems are infrastructure. This post explains how to build showing-up habits that don\'t depend on feeling like it — so your output stays consistent whether you\'re inspired or not. #consistency #habits #routines #systems #productivity',
    destination: '/blog/building-consistency-without-motivation',
    board: 'Morning Routines That Stick',
    keywords: 'consistency without motivation, habit systems, showing up daily, productivity habits, discipline over motivation',
    cta_angle: 'Get the Morning Routine Master Template ($9)',
    funnel_pillar: 'Routines',
  },
  15: {
    description: 'A daily operating system for creators who need to produce, not just consume. Time blocking, input windows, output sessions, and the single question that drives every decision. Build momentum that compounds. #creatoreconomy #dailyroutine #operatingsystem #productivity',
    destination: '/blog/creators-operating-system-manage-multiple-projects',
    board: 'Morning Routines That Stick',
    keywords: 'creator operating system, daily routine creator, content creator productivity, output framework, creator habits',
    cta_angle: 'Get the Morning Routine Master Template',
    funnel_pillar: 'Routines',
  },
  16: {
    description: 'Five systems to run before 9AM that set the trajectory of your day. Email, capture, priorities, body, mind — this morning stack is built for people who create things and need their first hours to actually count. #morningroutine #productivity #earlymorning #dailysystem',
    destination: '/blog/morning-vault-systems-based-morning-routine',
    board: 'Morning Routines That Stick',
    keywords: 'morning routine, 5am club, morning system, morning productivity, early morning habits, morning stack',
    cta_angle: 'Get the Morning Routine Master Template ($9)',
    funnel_pillar: 'Routines',
  },
  17: {
    description: 'Digital clutter is cognitive clutter. This daily reset clears inbox zero, closes open loops, archives decisions, and protects your focused thinking blocks. Run it in 15 minutes at end of day. #digitalhygiene #productivityhack #dailyreset #inbox zero',
    destination: '/blog/digital-hygiene-organizing-your-digital-vault',
    board: 'Morning Routines That Stick',
    keywords: 'digital hygiene, inbox zero, daily reset, digital declutter, end of day routine, focus protection',
    cta_angle: 'Read the daily reset system',
    funnel_pillar: 'Routines',
  },
  18: {
    description: 'Not a morning person? Your best hours might be 10PM–2AM. This output stack is designed for night owls who produce — silence protocols, session framing, wind-down rituals that don\'t kill momentum. #nightowl #latenight #productivity #creativeflow #eveningroutine',
    destination: '/blog/night-owl-output-system-evening-routine',
    board: 'Morning Routines That Stick',
    keywords: 'night owl productivity, late night routine, evening output, night shift creator, creative night routine',
    cta_angle: 'Read the night owl output guide',
    funnel_pillar: 'Routines',
  },
  // ── DISCOVERY / Hidden Gems (pins 19–24) ─────────────────────────────────────
  19: {
    description: 'The weekly review is the single habit that separates people who drift from people who compound. This system runs in under 30 minutes and gives you clarity every single week. Don\'t skip it. #weeklyreview #habits #growthmindset #selfimprovement',
    destination: '/blog/weekly-review-operators-checkpoint',
    board: 'Hidden Gems Worth Knowing',
    keywords: 'weekly review, self improvement, personal growth habits, review ritual, weekly planning, productivity gems',
    cta_angle: 'Read the weekly review system',
    funnel_pillar: 'Hidden Gems',
  },
  20: {
    description: 'Most collectors don\'t know the real difference between PSA and BGS until a slab comes back wrong. This comparison breaks down what actually matters: crossover value, sub-grades, and which grade moves inventory faster. #PSA #BGS #sportscard #hiddengem',
    destination: '/blog/grading-service-comparison-psa-bgs-sgc-cgc',
    board: 'Hidden Gems Worth Knowing',
    keywords: 'PSA vs BGS hidden truth, grading comparison, card grading secret, beckett vs PSA, sports card gems',
    cta_angle: 'Read the grading comparison',
    funnel_pillar: 'Hidden Gems',
  },
  21: {
    description: 'Motivation fails. Systems don\'t. The hidden gem most creators miss: you don\'t need to feel inspired to produce — you need structures that make output the path of least resistance. This is how you build that. #consistency #hiddengems #systemsthinking #habits',
    destination: '/blog/building-consistency-without-motivation',
    board: 'Hidden Gems Worth Knowing',
    keywords: 'consistency secret, motivation vs systems, hidden gem productivity, discipline system, output habit',
    cta_angle: 'Read the consistency system',
    funnel_pillar: 'Hidden Gems',
  },
  22: {
    description: 'Card grading is a hidden language most collectors are only half-fluent in. This guide decodes what the numbers actually mean at PSA, BGS, and CGC — and why the difference between an 8 and a 9 can be thousands of dollars. #cardgrading #PSA #hiddengems #sportscards',
    destination: '/blog/grading-service-comparison-psa-bgs-sgc-cgc',
    board: 'Hidden Gems Worth Knowing',
    keywords: 'card grading scale, PSA number meaning, grading hidden knowledge, BGS subgrades, card grade value',
    cta_angle: 'Read the grading scale guide',
    funnel_pillar: 'Hidden Gems',
  },
  23: {
    description: 'Most collectors store cards wrong. The hidden gem: how you store determines what condition they hold in 5 years. Toploaders, UV protection, humidity control — what actually matters and what\'s marketing fluff. #cardstorage #sportscards #hiddengem #collecting',
    destination: '/blog/sports-card-flipping-workflow-buy-low-sell-high-system',
    board: 'Hidden Gems Worth Knowing',
    keywords: 'card storage secrets, best card storage, UV protection cards, sports card preservation, collector storage tips',
    cta_angle: 'Read the card storage guide',
    funnel_pillar: 'Hidden Gems',
  },
  24: {
    description: 'Flow state isn\'t mystical — it\'s engineered. The hidden framework for getting into the zone on drums (or anything requiring focused skill): structured warm-up, distraction elimination, tempo laddering. Learn to trigger it, not wait for it. #flowstate #drumming #hiddengem',
    destination: '/blog/flow-state-drumming-when-practice-becomes-play',
    board: 'Hidden Gems Worth Knowing',
    keywords: 'flow state trigger, focused practice, hidden gem drumming, zone state, deep work music, performance flow',
    cta_angle: 'Read the flow state framework',
    funnel_pillar: 'Hidden Gems',
  },
  // ── OPERATOR (pins 25–30) ────────────────────────────────────────────────────
  25: {
    description: 'The creator\'s daily OS: capture, create, publish, promote, rest — each in its own time block. Stop mixing modes. Start treating yourself like a business with a schedule. This framework scales from side hustle to full-time. #creatoreconomy #operatorsystem #sidehustle #contentcreator',
    destination: '/shop/side-hustle-launchpad',
    board: "Operator's Side Hustle Blueprint",
    keywords: 'creator operating system, content creator daily schedule, side hustle framework, creator productivity, operator mindset',
    cta_angle: 'Get the Side Hustle Launchpad ($29)',
    funnel_pillar: 'Operator',
  },
  26: {
    description: 'First 30 days of a side hustle: what to build, what to skip, and what kills most new operators before they ever make a dollar. This launchpad walks you through the decisions that actually matter in month one. #sidehustle #entrepreneurship #solopreneur #operatormindset',
    destination: '/shop/side-hustle-launchpad',
    board: "Operator's Side Hustle Blueprint",
    keywords: 'side hustle launchpad, first 30 days business, solopreneur start, operator guide, side hustle plan, creator business',
    cta_angle: 'Get the Side Hustle Launchpad ($29)',
    funnel_pillar: 'Operator',
  },
  27: {
    description: 'Weekly review for operators: what shipped, what stalled, what to prioritize next week. This version goes beyond personal productivity — it\'s a business review in a weekly cadence that keeps a solo operation on track. #weeklyreview #solopreneur #sidehustle #operatorreview',
    destination: '/shop/side-hustle-launchpad',
    board: "Operator's Side Hustle Blueprint",
    keywords: 'operator weekly review, solopreneur check-in, side hustle review, business weekly review, creator business systems',
    cta_angle: 'Get the Side Hustle Launchpad',
    funnel_pillar: 'Operator',
  },
  28: {
    description: 'Operators don\'t wait to feel inspired. Consistency is the product. This framework shows you how to build systems that output content, ship products, and maintain client relationships even when motivation is at zero. #operatormindset #consistency #sidehustle #solopreneur',
    destination: '/shop/side-hustle-launchpad',
    board: "Operator's Side Hustle Blueprint",
    keywords: 'operator consistency, solopreneur discipline, side hustle consistency, business momentum, output without motivation',
    cta_angle: 'Get the Side Hustle Launchpad ($29)',
    funnel_pillar: 'Operator',
  },
  29: {
    description: 'Night owl operators: your quiet hours are your competitive edge. This stack shows you how to structure late-night output sessions — what to build, when to ship, and how to wind down without killing tomorrow\'s momentum. #nightowl #sidehustle #operatorsystem #solopreneur',
    destination: '/shop/side-hustle-launchpad',
    board: "Operator's Side Hustle Blueprint",
    keywords: 'night owl operator, late night hustle, side hustle evening routine, solopreneur night stack, after hours building',
    cta_angle: 'Get the Side Hustle Launchpad ($29)',
    funnel_pillar: 'Operator',
  },
  30: {
    description: 'Digital hygiene is operator infrastructure. A cluttered inbox, open browser tabs, and unsorted files are cognitive debt that slows every decision. This daily reset takes 15 minutes and protects your most productive hours. #digitalhygiene #sidehustle #operatorsystems #solopreneur',
    destination: '/shop/side-hustle-launchpad',
    board: "Operator's Side Hustle Blueprint",
    keywords: 'digital hygiene operator, inbox zero solopreneur, operator daily reset, digital organization, side hustle systems',
    cta_angle: 'Get the Side Hustle Launchpad ($29)',
    funnel_pillar: 'Operator',
  },
};

const PIN_DEFINITIONS = [
  // BATCH A — Collecting
  { pin_number: 1,  headline: 'Card Grading Scale Explained: What PSA, BGS, and CGC Actually Mean', pillar: 'COLLECTING' },
  { pin_number: 2,  headline: 'How to Build a Sports Card Portfolio Without Losing Your Mind', pillar: 'COLLECTING' },
  { pin_number: 3,  headline: 'PSA vs BGS: Which Grading Company Should You Use?', pillar: 'COLLECTING' },
  { pin_number: 4,  headline: 'The Right Way to Store and Protect Your Card Collection', pillar: 'COLLECTING' },
  { pin_number: 5,  headline: 'How to Flip Cards on eBay Without Getting Burned', pillar: 'COLLECTING' },
  { pin_number: 6,  headline: "The Collector's Weekly Review: 5 Minutes That Save You Thousands", pillar: 'COLLECTING' },
  // BATCH B — Drums
  { pin_number: 7,  headline: 'The Ultimate Rudiment Ladder: 40 Drumming Exercises to Master First', pillar: 'DRUMS' },
  { pin_number: 8,  headline: 'How to Read Drum Notation: A Practical Guide for Drummers Who Never Learned to Read Music', pillar: 'DRUMS' },
  { pin_number: 9,  headline: "The Drummer's Practice Blueprint: A System for Getting Better Without Wasting Time", pillar: 'DRUMS' },
  { pin_number: 10, headline: "How to Practice Drums Without a Drum Kit: Drills for When You're Away from Your Kit", pillar: 'DRUMS' },
  { pin_number: 11, headline: 'Stick Control Fundamentals: The Single Strokes, Double Strokes, and Paradiddles Every Drummer Must Own', pillar: 'DRUMS' },
  { pin_number: 12, headline: 'How to Find Your Flow State on the Drums: Discipline, Rhythm, and the Art of Playing in the Zone', pillar: 'DRUMS' },
  // BATCH C — Routines
  { pin_number: 13, headline: 'The Weekly Review System That Actually Changes Your Trajectory', pillar: 'ROUTINES' },
  { pin_number: 14, headline: 'Consistency Without Motivation: The Systems-Based Approach to Showing Up Every Day', pillar: 'ROUTINES' },
  { pin_number: 15, headline: "The Creator's Operating System: Your Daily Framework for Building Momentum", pillar: 'ROUTINES' },
  { pin_number: 16, headline: 'The Morning Vault: 5 Systems to Open Before 9AM', pillar: 'ROUTINES' },
  { pin_number: 17, headline: 'Digital Hygiene: The Daily Reset That Protects Your Best Thinking', pillar: 'ROUTINES' },
  { pin_number: 18, headline: "The Night Owl's Output Stack: How to Produce Your Best Work After Everyone Else is Asleep", pillar: 'ROUTINES' },
  // BATCH D — Discovery
  { pin_number: 19, headline: 'The Weekly Review System That Actually Changes Your Trajectory', pillar: 'DISCOVERY' },
  { pin_number: 20, headline: 'PSA vs BGS: Which Grading Company Should You Use?', pillar: 'DISCOVERY' },
  { pin_number: 21, headline: 'Consistency Without Motivation: The Systems-Based Approach to Showing Up Every Day', pillar: 'DISCOVERY' },
  { pin_number: 22, headline: 'Card Grading Scale Explained: What PSA, BGS, and CGC Actually Mean', pillar: 'DISCOVERY' },
  { pin_number: 23, headline: 'The Right Way to Store and Protect Your Card Collection', pillar: 'DISCOVERY' },
  { pin_number: 24, headline: 'How to Find Your Flow State on the Drums: Discipline, Rhythm, and the Art of Playing in the Zone', pillar: 'DISCOVERY' },
  // BATCH E — Operator
  { pin_number: 25, headline: "The Creator's Operating System: Your Daily Framework for Building Momentum", pillar: 'OPERATOR' },
  { pin_number: 26, headline: 'The Side Hustle Launchpad: The First 30 Days of Building Something Real', pillar: 'OPERATOR' },
  { pin_number: 27, headline: 'The Weekly Review System That Actually Changes Your Trajectory', pillar: 'OPERATOR' },
  { pin_number: 28, headline: 'Consistency Without Motivation: The Systems-Based Approach to Showing Up Every Day', pillar: 'OPERATOR' },
  { pin_number: 29, headline: "The Night Owl's Output Stack: How to Produce Your Best Work After Everyone Else is Asleep", pillar: 'OPERATOR' },
  { pin_number: 30, headline: 'Digital Hygiene: The Daily Reset That Protects Your Best Thinking', pillar: 'OPERATOR' },
];

async function seedPinDefinitions() {
  for (const pin of PIN_DEFINITIONS) {
    const meta = PIN_META[pin.pin_number] || {};
    const destUrl = meta.destination ? `${BASE_DOMAIN}${meta.destination}` : null;
    const utmUrl = meta.destination ? makeUtm(meta.destination, pin.pin_number) : null;

    await pool.query(
      `INSERT INTO pinterest_pins
         (pin_number, headline, pillar, status, description, destination_url, utm_url, board, keywords, cta_angle, funnel_pillar)
       VALUES ($1, $2, $3, 'pending', $4, $5, $6, $7, $8, $9, $10)
       ON CONFLICT (pin_number) DO UPDATE SET
         description     = COALESCE(EXCLUDED.description, pinterest_pins.description),
         destination_url = COALESCE(EXCLUDED.destination_url, pinterest_pins.destination_url),
         utm_url         = COALESCE(EXCLUDED.utm_url, pinterest_pins.utm_url),
         board           = COALESCE(EXCLUDED.board, pinterest_pins.board),
         keywords        = COALESCE(EXCLUDED.keywords, pinterest_pins.keywords),
         cta_angle       = COALESCE(EXCLUDED.cta_angle, pinterest_pins.cta_angle),
         funnel_pillar   = COALESCE(EXCLUDED.funnel_pillar, pinterest_pins.funnel_pillar)`,
      [
        pin.pin_number, pin.headline, pin.pillar,
        meta.description || null,
        destUrl,
        utmUrl,
        meta.board || null,
        meta.keywords || null,
        meta.cta_angle || null,
        meta.funnel_pillar || null,
      ]
    );
  }
}

async function getAllPins() {
  const { rows } = await pool.query(
    `SELECT * FROM pinterest_pins ORDER BY pin_number ASC`
  );
  return rows;
}

async function getPinByNumber(pinNumber) {
  const { rows } = await pool.query(
    `SELECT * FROM pinterest_pins WHERE pin_number = $1`,
    [pinNumber]
  );
  return rows[0] || null;
}

async function updatePinStatus(pinNumber, status, r2Url = null, errorMessage = null, prompt = null) {
  const fields = ['status = $2', 'updated_at = NOW()'];
  const values = [pinNumber, status];

  if (r2Url !== null) {
    values.push(r2Url);
    fields.push(`r2_url = $${values.length}`);
  }
  if (errorMessage !== null) {
    values.push(errorMessage);
    fields.push(`error_message = $${values.length}`);
  }
  if (prompt !== null) {
    values.push(prompt);
    fields.push(`prompt = $${values.length}`);
  }

  await pool.query(
    `UPDATE pinterest_pins SET ${fields.join(', ')} WHERE pin_number = $1`,
    values
  );
}

// Update user-facing workflow fields (posting_status + notes)
async function updatePinWorkflow(pinNumber, postingStatus, notes) {
  await pool.query(
    `UPDATE pinterest_pins
     SET posting_status = $2, notes = $3, updated_at = NOW()
     WHERE pin_number = $1`,
    [pinNumber, postingStatus, notes]
  );
}

/**
 * Update a pin's posting metadata (status, notes, dates).
 * Returns the updated row.
 */
async function updatePinPostingData(pinNumber, fields) {
  const allowed = ['posting_status', 'notes', 'published_date', 'scheduled_date'];
  const setters = [];
  const values = [pinNumber];
  let idx = 2;

  for (const key of allowed) {
    if (key in fields) {
      setters.push(`${key} = $${idx}`);
      values.push(fields[key]);
      idx++;
    }
  }

  if (setters.length === 0) return null;

  setters.push('updated_at = NOW()');
  const { rows } = await pool.query(
    `UPDATE pinterest_pins SET ${setters.join(', ')} WHERE pin_number = $1 RETURNING *`,
    values
  );
  return rows[0] || null;
}

/**
 * Dashboard query: all pins joined with blog post data.
 * Uses SITE_URL env var for all generated URLs (not polsia.app).
 * Supports filtering by status and category, sorting by title/category/status/scheduled_date.
 */
async function getDashboardPins({ status, category, sort = 'pin_number' } = {}) {
  const siteUrl = process.env.SITE_URL || 'https://www.stickvault.com';

  // Extract blog slug from destination_url (e.g. /blog/grading-service-comparison-psa-bgs-sgc-cgc)
  const whereClauses = [];
  const params = [];

  if (status) {
    params.push(status === 'posted' ? 'Posted' : 'Not Posted');
    whereClauses.push(`pp.posting_status = $${params.length}`);
  }

  if (category) {
    params.push(category);
    whereClauses.push(`LOWER(bp.category) = LOWER($${params.length})`);
  }

  const where = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';

  const sortCol = {
    title: 'pp.headline',
    category: 'bp.category',
    status: 'pp.posting_status',
    scheduled_date: 'pp.scheduled_date',
  }[sort] || 'pp.pin_number';

  const { rows } = await pool.query(
    `SELECT
       pp.pin_number,
       pp.headline,
       pp.description,
       pp.pillar,
       pp.status AS generation_status,
       pp.r2_url,
       pp.prompt,
       pp.posting_status,
       pp.notes,
       pp.published_date,
       pp.scheduled_date,
       pp.destination_url,
       pp.utm_url,
       pp.board,
       pp.keywords,
       pp.cta_angle,
       bp.title  AS blog_title,
       bp.slug   AS blog_slug,
       bp.category AS blog_category
     FROM pinterest_pins pp
     LEFT JOIN blog_posts bp
       ON pp.destination_url ILIKE '%/blog/%'
      AND bp.slug = SUBSTRING(pp.destination_url FROM '/blog/([^?]+)')
     ${where}
     ORDER BY ${sortCol} ASC`,
    params
  );

  // Enrich with config-driven URLs (no polsia.app references)
  return rows.map(pin => ({
    pin_number: pin.pin_number,
    headline: pin.headline,
    description: pin.description,
    pillar: pin.pillar,
    generation_status: pin.generation_status,
    r2_url: pin.r2_url,
    prompt: pin.prompt,
    posting_status: pin.posting_status,
    notes: pin.notes,
    published_date: pin.published_date,
    scheduled_date: pin.scheduled_date,
    board: pin.board,
    keywords: pin.keywords,
    cta_angle: pin.cta_angle,
    blog_title: pin.blog_title,
    blog_slug: pin.blog_slug,
    blog_category: pin.blog_category,
    // Config-driven URLs — www.stickvault.com only
    hero_image_url: pin.blog_slug
      ? `${siteUrl}/pins/${pin.blog_slug}.png`
      : null,
    destination_url: pin.blog_slug
      ? `${siteUrl}/blog/${pin.blog_slug}`
      : null,
    utm_url: pin.utm_url || null,
    // Affiliate link detection — has an active /r/:slug redirect
    has_affiliate_link: false, // resolved by caller if needed
  }));
}

async function getPinSummary() {
  const { rows } = await pool.query(`
    SELECT
      COUNT(*) FILTER (WHERE status = 'done') AS done,
      COUNT(*) FILTER (WHERE status = 'pending') AS pending,
      COUNT(*) FILTER (WHERE status = 'generating') AS generating,
      COUNT(*) FILTER (WHERE status = 'failed') AS failed,
      COUNT(*) AS total
    FROM pinterest_pins
  `);
  return rows[0];
}

module.exports = {
  PIN_DEFINITIONS,
  PIN_META,
  seedPinDefinitions,
  getAllPins,
  getPinByNumber,
  updatePinStatus,
  updatePinWorkflow,
  updatePinPostingData,
  getDashboardPins,
  getPinSummary,
};
