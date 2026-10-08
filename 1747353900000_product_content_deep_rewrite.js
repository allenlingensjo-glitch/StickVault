/**
 * Deep product content rewrite.
 * Owns: products table content update + vault_sections JSONB column.
 * Does NOT own: blog_posts, email_subscribers.
 */
module.exports = {
  name: 'product_content_deep_rewrite',
  up: async (client) => {
    // Add new columns — migrations run once (tracked in _migrations table) so no IF NOT EXISTS needed
    await client.query(`ALTER TABLE products ADD COLUMN vault_sections JSONB`);
    await client.query(`ALTER TABLE products ADD COLUMN use_cases TEXT[]`);
    await client.query(`ALTER TABLE products ADD COLUMN outcomes TEXT[]`);
    await client.query(`ALTER TABLE products ADD COLUMN for_whom TEXT`);

    // ── Collector's Vault Starter Kit — sports card focus ─────────────────────
    const collectorsVaultSections = JSON.stringify([
      {
        label: 'Inventory System',
        preview: 'Card · Set · Year · Variation · Raw/Graded · Paid · Current Comp · Location · Notes',
        detail: 'Every card in one place. Columns for PSA pop report data and comp delta.',
      },
      {
        label: 'PSA/BGS/SGC Submission Log',
        preview: 'Submission # · Service Level · Cards Submitted · Date Sent · Est. Return · Grades Received · P&L',
        detail: 'Track every batch across all three grading companies. Know your grade-up rate over time.',
      },
      {
        label: 'eBay Workflow System',
        preview: 'Listing title formula · Shipping protocol · Price vs comp · Watchers-to-offers tracking',
        detail: 'A repeatable listing system so every card ships clean and prices right.',
      },
      {
        label: 'Comp Tracking Sheet',
        preview: 'Card · 30-day avg sold · 90-day avg sold · High · Low · Grade premium vs raw',
        detail: 'Pull eBay sold data into one view. Know grade vs raw premium for every card you own.',
      },
      {
        label: 'Insurance Documentation',
        preview: 'High-value registry · Purchase date · Paid · Grade · Estimated current value · Photo log',
        detail: 'A formatted document your insurance company will actually accept.',
      },
    ]);

    await client.query(
      `UPDATE products SET
        title = $1,
        description = $2,
        long_description = $3,
        features = $4,
        for_whom = $5,
        use_cases = $6,
        outcomes = $7,
        vault_sections = $8
      WHERE slug = 'collectors-vault-starter-kit'`,
      [
        "Collector's Vault Starter Kit",
        "The operating system for serious sports card collectors. Inventory tracking, PSA/BGS/SGC grading prep, eBay workflow, comp tracking, and submission organization — built by someone who actually grades and sells.",
        "Most collectors are running their collection out of their head and a notes app. That's fine until you have 300 cards, two pending PSA submissions, a box of raw cards you haven't comped, and no idea what you paid for half of it. This kit fixes that. It's the exact system for tracking inventory, preparing cards for grading, monitoring market comps, organizing eBay listings, and documenting your collection for insurance. Built around the PSA/BGS/SGC workflow, not a generic spreadsheet.",
        [
          'Master inventory tracker — title, year, set, variation, raw/graded status, paid, current comp, location',
          'Grading submission log — PSA, BGS, SGC batch tracking with turnaround estimates and grade outcomes',
          'Comp tracking sheet — pull 90-day eBay sold data per card, track comp trends over time',
          'eBay listing workflow — title formula, shipping protocol, pricing vs comp, watchers-to-sale ratio',
          'Submission prep checklist — cleaning protocol, sleeve/case selection, grading notes per card',
          'PC (Personal Collection) tracker — set targets, priority acquisitions, want list with ceiling prices',
          'Insurance documentation template — high-value card registry with photos, grades, purchase receipts',
          'Storage and organization guide — card room setup, binder systems, top-loader vs slab storage',
          'Google Sheets + Excel compatible, fully offline',
        ],
        "Collectors with 50+ cards who are tired of losing track. Sellers who are leaving money on eBay. Anyone who has sent cards to PSA and lost track of what grade came back.",
        [
          "You've got a box of rookies to comp before deciding which ones to grade — use the comp tracking sheet to pull 90-day sold data and score each one",
          "You're submitting 15 cards to PSA — the submission prep checklist walks you through cleaning, sleeve selection, and grading tier decisions",
          "You just sold a card on eBay and need to update your inventory — log the sale price, calculate profit vs paid, update your running P&L",
          "Your PC is getting out of control — the PC tracker helps you set acquisition targets and stop buying off-theme",
        ],
        [
          'Know exactly what every card in your collection is worth at any given moment',
          'Never lose track of a PSA submission or forget what grade came back',
          'Stop underpricing on eBay by having real comp data before every listing',
          "Build a documented collection that's insurable and sellable",
        ],
        collectorsVaultSections,
      ]
    );

    // ── Drummer's Practice Blueprint ──────────────────────────────────────────
    const drummerVaultSections = JSON.stringify([
      {
        label: 'Weekly Schedule Templates',
        preview: '30-min · 45-min · 60-min · Weekend Warrior · Pre-Gig Prep · Technique Focus · Reading Focus',
        detail: 'Pick the template that matches your day. Each one has time-blocked sections for warm-up, focus work, and play.',
      },
      {
        label: 'Rudiment Progression Ladder',
        preview: 'Level 1: Single Stroke Roll → Level 2: Double Stroke → Level 3: Paradiddle families → ... Level 8: Advanced combinations',
        detail: '40 rudiments in logical order with tempo checkpoints. Know which one to work next.',
      },
      {
        label: 'Practice Journal System',
        preview: 'Session log · What I worked on · What felt hard · BPM goal vs actual · Weekly review prompts',
        detail: 'A lightweight log that makes your progress visible over time. Monthly review template included.',
      },
      {
        label: 'Focus Block Framework',
        preview: 'Skill target → Drill structure → Tempo progression → Checkpoints',
        detail: 'How to structure 20 minutes on a single skill so it actually sticks.',
      },
    ]);

    await client.query(
      `UPDATE products SET
        description = $1,
        long_description = $2,
        features = $3,
        for_whom = $4,
        use_cases = $5,
        outcomes = $6,
        vault_sections = $7
      WHERE slug = 'drummers-practice-blueprint'`,
      [
        "The complete drum practice operating system — rudiment progressions, weekly schedule templates, focus frameworks, and a practice journal system that actually shows you where you're improving.",
        "Most drummers practice randomly and wonder why they plateau. This blueprint is a structured practice system built around what actually drives improvement: deliberate focused blocks, progressive rudiment ladders, and a journaling approach that makes invisible progress visible. Works for complete beginners building their first routine or intermediate players who've been stuck for a while.",
        [
          '7 weekly schedule templates (30-min, 45-min, 60-min, weekend warrior, pre-gig, technique focus, reading focus)',
          'Rudiment progression ladder — 40 rudiments organized from foundational to advanced with tempo checkpoints',
          'Focus block system — structure for single-skill practice that beats 2 hours of unfocused playing',
          'Practice journal with built-in progress prompts (weekly + monthly review)',
          'Metronome roadmap — tempo targets for each rudiment milestone',
          'Warm-up sequence library (5 different 8-minute warm-ups for different focus areas)',
          'PDF print-ready format + Notion template included',
        ],
        "Drummers who sit down to practice and end up noodling for an hour. Players who haven't improved in months but can't figure out why. Beginners who want structure from day one.",
        [
          "You have 30 minutes before dinner — open the 30-min template, run the warm-up, drop into the focused block, done",
          "You've been stuck on double bass for 6 weeks — the rudiment ladder shows you exactly which building-block skills to work first",
          "You just finished a month of practice — the monthly journal review shows you which skills moved and which are still stuck",
        ],
        [
          'Know exactly what to work on every single session',
          'Make measurable progress on specific skills instead of general "playing"',
          "Build a practice habit that survives busy weeks because the minimum viable session is just 30 minutes",
        ],
        drummerVaultSections,
      ]
    );

    // ── Side Hustle Launchpad ─────────────────────────────────────────────────
    const sideHustleVaultSections = JSON.stringify([
      {
        label: '30-Day Daily Action Plan',
        preview: 'Day 1: Define your niche in one sentence. Day 2: Find 10 people who need what you do. Day 3: Run the validation worksheet. Day 4: Study one competitor...',
        detail: 'Every day has one task. Each task has a 45-minute time cap and a clear output.',
      },
      {
        label: 'Niche Validation Worksheet',
        preview: 'Q1: Do people already pay for this? Q2: Is there buyer urgency? Q3: Can you reach the buyers? Q4: Is the market big enough to matter? Q5: Can you win at this price?',
        detail: 'A 20-minute process that saves you from spending months building the wrong thing.',
      },
      {
        label: 'Outreach Script Library',
        preview: 'Cold DM (Instagram) · Cold email · Warm intro · LinkedIn · Community post · Reply to a question · Follow-up · The no-pitch opener',
        detail: '8 templates. Each one is a real message — copy, adjust the details, send.',
      },
      {
        label: 'Offer Design Template',
        preview: "Name · Problem it solves · Who it's for · What's included · What outcome they get · Price · How to buy",
        detail: 'Turn your knowledge into a structured offer someone can say yes to.',
      },
    ]);

    await client.query(
      `UPDATE products SET
        description = $1,
        long_description = $2,
        features = $3,
        for_whom = $4,
        use_cases = $5,
        outcomes = $6,
        vault_sections = $7
      WHERE slug = 'side-hustle-launchpad'`,
      [
        "A 30-day action system to validate, launch, and make your first sale from a passion-based side hustle. One hour a day. Specific daily tasks. No fluff.",
        "Most side hustle guides are written by people who don't have day jobs. This one assumes you have 45-60 minutes a day, limited energy after work, and zero interest in building an empire. The goal is simple: go from idea to first dollar in 30 days. The daily tasks are specific and executable. The niche validation framework actually tells you whether your idea is viable before you invest months in it.",
        [
          '30-day daily action plan — one specific task per day, each under 60 minutes',
          'Niche validation worksheet — 5 questions that tell you if your idea has a market before you build anything',
          'Offer design template — package your knowledge into something people will actually buy',
          'Outreach script library — 8 message templates for cold DMs, emails, and warm introductions',
          'First customer framework — find your first 3 buyers without social media',
          'Pricing calculator — how to price your first offer without underselling or scaring people off',
          'Week-by-week milestone tracker — know exactly where you should be at day 7, 14, 21, 30',
          'Notion + PDF format',
        ],
        "People with a skill or knowledge people pay for who haven't figured out how to turn it into cash. Anyone who has said 'I should really start that thing' for 6+ months.",
        [
          "Day 3: You're doing the niche validation worksheet — it tells you your first idea has no buyer urgency, so you pivot to your second idea before wasting time",
          "Day 12: You use the cold DM template to reach out to 5 potential clients — one responds and books a call",
          "Day 28: You close your first sale using the offer design template you built in week 2",
        ],
        [
          'Know within a week whether your idea is worth pursuing',
          'Have a real offer with a real price before day 10',
          'Make your first sale within 30 days or know exactly why you did not',
        ],
        sideHustleVaultSections,
      ]
    );

    // ── Morning Routine Master Template ───────────────────────────────────────
    const morningVaultSections = JSON.stringify([
      {
        label: 'Daily Planner (PDF)',
        preview: 'Morning intention · Top 3 priorities · Time blocks · Evening reflection · Tomorrow\'s first task',
        detail: 'One-page format. Designed to take 3 minutes to fill out and be useful all day. Print the week on Sunday.',
      },
      {
        label: 'Minimum Viable Morning',
        preview: '0:00 — Wake up, no phone. 0:03 — Drink water. 0:05 — 5-minute breathing sequence. 0:10 — Write your one priority. 0:12 — Begin.',
        detail: 'The version of the routine that survives late nights, travel, and difficult weeks.',
      },
      {
        label: 'Habit Stacking Guide',
        preview: 'If/Then format. Stack new habits after existing anchors. Morning anchor options: coffee, brushing teeth, opening laptop, morning alarm.',
        detail: 'How to attach your new routine behaviors to habits you already have so they stop requiring willpower.',
      },
      {
        label: 'Night Owl Edition',
        preview: 'Peak window identification · Evening creative block protocol · Wind-down ritual · Morning prep the night before',
        detail: 'The same framework restructured for people whose peak hours are after 9PM.',
      },
    ]);

    await client.query(
      `UPDATE products SET
        description = $1,
        long_description = $2,
        features = $3,
        for_whom = $4,
        use_cases = $5,
        outcomes = $6,
        vault_sections = $7
      WHERE slug = 'morning-routine-master-template'`,
      [
        "Build a morning ritual that actually works for your schedule. Printable PDF planner, Notion template, and a habit stacking guide built for creative people who don't naturally wake up motivated.",
        "Generic morning routines fail creative people because they're designed for people who love mornings. This one is built around three realities: you probably aren't a morning person, your best creative work doesn't happen at 6AM, and every perfect morning system collapses the first time you have a late night. The Minimum Viable Morning inside this template is 12 minutes. It scales up from there when you have the energy and time.",
        [
          'Printable PDF daily planner — one-page format, designed for real desk use',
          'Notion template — ready to duplicate, mobile-friendly, includes weekly review',
          'Minimum Viable Morning protocol — 12-minute version for difficult days',
          'Habit stacking guide — how to attach new habits to existing ones so they actually stick',
          'Night owl edition — same system restructured for peak creative hours in the evening',
          'Energy mapping worksheet — find your actual peak hours (not what you think they are)',
          'Weekly review ritual — 15-minute Sunday process to plan the week without dreading it',
          'Failure-mode playbook — what to do when you miss a day (because you will)',
        ],
        "Creative people who want a morning routine but can't make the standard ones stick. Night owls who still want more structure. Anyone who starts strong on Monday and falls apart by Thursday.",
        [
          "Wednesday night you stayed up until 2AM — Thursday morning you run the 12-minute Minimum Viable Morning instead of skipping entirely",
          "You use the energy mapping worksheet and realize your creative peak is 10AM-1PM, so you restructure your morning to protect that window",
          "Sunday you run the 15-minute weekly review and walk into Monday knowing exactly what the three most important things are",
        ],
        [
          'A morning routine that survives real life, not just perfect mornings',
          'Know your actual peak creative hours and start protecting them',
          'Build a habit of intentional mornings without needing to wake up at 5AM',
        ],
        morningVaultSections,
      ]
    );
  },
};
