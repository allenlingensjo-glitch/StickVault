/**
 * Pinterest pin approval queue — Batch A (10 pins) + Batch B (10 pins).
 * Owns: structured pin data for review before scheduling/posting.
 * Does NOT own: pin image generation, DB writes, posting to Pinterest.
 *
 * Fields per pin:
 *   pillar           — content category
 *   batch            — 'A' or 'B' for tracking
 *   post_slug        — maps to blog_posts.slug
 *   pin_image_path   — served at /pins/{slug}.png (self-hosted)
 *   title_variants   — 3-4 A/B options, curiosity-first, no clickbait
 *   description      — 300-500 chars, keyword-dense, natural tone
 *   destination_url  — where the pin lands (article, product, category, lead magnet)
 *   lead_magnet_url  — closest email capture entry point
 *   product_url      — revenue conversion destination
 *   layout_note      — unique visual composition instructions for this pin
 *   funnel           — Pin → Article → CTA → Product (documented path)
 *   status           — pending_approval | approved | scheduled | published
 */

const SITE = 'https://www.stickvault.com';

const PINTEREST_APPROVAL_QUEUE = [

  // ─── BATCH A: COLLECTING PINS (6) ─────────────────────────────────────────

  {
    pillar: 'collecting',
    batch: 'A',
    post_slug: 'how-to-grade-sports-cards-psa-guide-for-beginners',
    pin_image_path: `/pins/how-to-grade-sports-cards-psa-guide-for-beginners.png`,
    title_variants: [
      'PSA Grading Explained: The Only Guide You Actually Need',
      'Is Your Card Worth Grading? Run This Math First',
      'The 4 Criteria That Determine Your PSA Grade',
      'Before You Submit to PSA — Read This',
    ],
    description: 'PSA grading breaks down to four things: corners, edges, surface, centering. Master these before you submit a single card. A raw card that comps at $40 with a PSA 9 selling at $120 makes sense at $18 service. A raw card at $15 with a PSA 9 at $25 is a money loser. Run the math. The pop report tells you how crowded your grade is — low-pop 10s command serious premiums. This is the beginner PSA guide without the fluff.',
    destination_url: `${SITE}/blog/how-to-grade-sports-cards-psa-guide-for-beginners`,
    lead_magnet_url: `${SITE}/free#grading-checklist`,
    product_url: `${SITE}/shop/collectors-vault-starter-kit`,
    funnel: 'Pin → PSA Grading Guide → Grading Prep Checklist lead magnet → Collector\'s Vault Starter Kit',
    layout_note: 'Card slab icon bottom-center, slight rotation. Title text block top-left, gold rule line dividing text zone from visual zone. Accent: single gold rimlight on the slab. Dark charcoal bg. Text: "PSA GRADING" large, subtitle smaller below.',
    status: 'pending_approval',
  },

  {
    pillar: 'collecting',
    batch: 'A',
    post_slug: 'ebay-sports-card-selling-workflow',
    pin_image_path: `/pins/ebay-sports-card-selling-workflow.png`,
    title_variants: [
      'The eBay Card Selling System That Actually Moves Cards',
      'Stop Listing Blindly. Here\'s the Workflow.',
      'How to Sell Sports Cards on eBay Without the Chaos',
      'Batch, Price, Ship: The Card Seller\'s Operating System',
    ],
    description: 'Selling cards on eBay without a system is how you spend three hours per sale. The workflow: batch 15-20 cards on one day, photograph front/back/flaw on a black velvet background, price from eBay completed sold listings (not active — sold), ship within 24 hours. Comp-based pricing is non-negotiable. The sellers moving cards consistently aren\'t luckier — they\'re more systematic. PSA slabs need cert number clearly visible. Raw cards need all four corners in frame.',
    destination_url: `${SITE}/blog/ebay-sports-card-selling-workflow`,
    lead_magnet_url: `${SITE}/free#grading-checklist`,
    product_url: `${SITE}/shop/collectors-vault-starter-kit`,
    funnel: 'Pin → eBay Selling Workflow → Grading Prep Checklist → Collector\'s Vault Starter Kit',
    layout_note: 'Visual: multiple card tops fanned out from bottom, like a dealer hand, gold border on each. Text block centered-top. Large numeral "4" or "3 steps" accent element right-side. Wide margin left gives breathing room. No clutter.',
    status: 'pending_approval',
  },

  {
    pillar: 'collecting',
    batch: 'A',
    post_slug: 'sports-card-flipping-workflow-buy-low-sell-high-system',
    pin_image_path: `/pins/sports-card-flipping-workflow-buy-low-sell-high-system.png`,
    title_variants: [
      'The Card Flipping System That Actually Works',
      'Buy Low, Sell High — With a Real System Behind It',
      'How Profitable Card Flippers Structure Every Week',
      'Raw to Graded Arbitrage: The Full Workflow',
    ],
    description: 'Card flipping is a system, not a feeling. Source undergraded raw cards from eBay, card shows, and estate sales. Check comp spread between raw and PSA 9/10. Submit only when the math pencils out (spread > grading cost + hold time). List graded returns using completed sold data, not gut pricing. Track every buy, every submission, every sale. The flippers who scale are the ones running it like a spreadsheet, not a hobby. PSA grading + eBay workflow in one integrated system.',
    destination_url: `${SITE}/blog/sports-card-flipping-workflow-buy-low-sell-high-system`,
    lead_magnet_url: `${SITE}/free#grading-checklist`,
    product_url: `${SITE}/shop/collectors-vault-starter-kit`,
    funnel: 'Pin → Card Flipping Workflow → Grading Prep Checklist → Collector\'s Vault Starter Kit',
    layout_note: 'Diagonal composition: arrow shape formed by 3 card images ascending left to right. Text block bottom, title top in large Syne. Gold diagonal accent line bisecting the composition. Vault grid texture subtly visible behind cards.',
    status: 'pending_approval',
  },

  {
    pillar: 'collecting',
    batch: 'A',
    post_slug: 'grading-prep-system-before-submitting-to-psa',
    pin_image_path: `/pins/grading-prep-system-before-submitting-to-psa.png`,
    title_variants: [
      'The Grading Prep Checklist Every Serious Collector Needs',
      'What to Do Before Submitting to PSA (Most Graders Miss This)',
      'Prep Your Card Like a Pro — Before It Leaves Your Hands',
      'The Pre-Submission System That Protects Your Grade',
    ],
    description: 'Ninety percent of grading disappointments are preventable. The prep system: examine corners under bright light at 45°, check edges by feel not just sight, inspect surface under direct overhead light for print lines and scratches, measure centering front and back before submitting. Never clean a card. Never handle with bare hands. Ship in penny sleeve + semi-rigid holder + team bag, card centered in a padded box. One compromised submission is often more expensive than a free grading checklist. Download it at the link.',
    destination_url: `${SITE}/blog/grading-prep-system-before-submitting-to-psa`,
    lead_magnet_url: `${SITE}/free#grading-checklist`,
    product_url: `${SITE}/shop/collectors-vault-starter-kit`,
    funnel: 'Pin → Grading Prep System → Grading Prep Checklist lead magnet → Collector\'s Vault Starter Kit',
    layout_note: 'Checklist motif: 4-5 subtle checkmark marks arranged vertically right-side, each gold. Card slab icon top-right, slightly out of frame (cropped). Text block large on left half. Clean, document-like feel — precise and methodical.',
    status: 'pending_approval',
  },

  {
    pillar: 'collecting',
    batch: 'A',
    post_slug: 'collector-inventory-organization-system',
    pin_image_path: `/pins/collector-inventory-organization-system.png`,
    title_variants: [
      'The Spreadsheet System Every Serious Collector Actually Uses',
      'Know Exactly What You Own — Finally',
      'Collection Organization for a PC That Scales',
      'Build an Inventory That Tells You Something Useful',
    ],
    description: 'Most collectors don\'t know what they own. Serious collectors do — down to condition, grade, purchase price, current comp, and storage location. The system: one master spreadsheet with acquisition log, condition tracker, comp column updated monthly, insurance registry for anything over $50. Separate tab for submission log. No card leaves or enters without being logged. Your inventory is your business\'s balance sheet. If you can\'t read it at a glance, it\'s costing you money in missed sells and duplicate buys.',
    destination_url: `${SITE}/blog/collector-inventory-organization-system`,
    lead_magnet_url: `${SITE}/free#grading-checklist`,
    product_url: `${SITE}/shop/collectors-vault-starter-kit`,
    funnel: 'Pin → Inventory System → Grading Prep Checklist → Collector\'s Vault Starter Kit',
    layout_note: 'Grid motif: faint 4×4 vault grid fills the background at low opacity. In front: clean card slab icon centered. Text positioned top-center, large title. The overall feel is "organized system" — precise lines, geometric quiet, nothing extraneous.',
    status: 'pending_approval',
  },

  {
    pillar: 'collecting',
    batch: 'A',
    post_slug: 'grading-service-comparison-psa-bgs-sgc-cgc',
    pin_image_path: `/pins/grading-service-comparison-psa-bgs-sgc-cgc.png`,
    title_variants: [
      'PSA vs BGS vs SGC vs CGC: The Real Comparison',
      'Which Grading Service Should You Use? (Honest Answer)',
      'When PSA. When BGS. When SGC. A Decision Framework.',
      'Four Grading Services. One Framework for Choosing.',
    ],
    description: 'PSA has the largest population reports and best secondary market liquidity — use it for high-value cards where the PSA label adds a premium. BGS gives subgrades and a 9.5 tier that some markets prefer over PSA 10. SGC has the fastest turnaround and is gaining momentum for vintage. CGC dominates comics and is expanding into cards. The right service depends on the card\'s market, the buyer\'s preference, and your budget. BGS vs PSA comparison, SGC grading, CGC cards — full breakdown.',
    destination_url: `${SITE}/blog/grading-service-comparison-psa-bgs-sgc-cgc`,
    lead_magnet_url: `${SITE}/free#grading-checklist`,
    product_url: `${SITE}/shop/collectors-vault-starter-kit`,
    funnel: 'Pin → Grading Service Comparison → Grading Prep Checklist → Collector\'s Vault Starter Kit',
    layout_note: 'Four-quadrant composition: each quadrant subtly differentiated with a thin gold dividing line. One card slab per quadrant area (small, outline only). Text block spans the top — title large. Bottom of each quadrant: tiny label text (PSA, BGS, SGC, CGC). Very clean, comparison-chart feel.',
    status: 'pending_approval',
  },

  // ─── BATCH A: DRUMS / RHYTHM PINS (4) ─────────────────────────────────────

  {
    pillar: 'drums',
    batch: 'A',
    post_slug: 'building-your-first-drum-practice-routine',
    pin_image_path: `/pins/building-your-first-drum-practice-routine.png`,
    title_variants: [
      'The 30-Minute Drum Practice System That Builds Real Skills',
      'Stop Noodling. Build a System. (Drummer\'s Guide)',
      'How Serious Drummers Structure Their Practice Time',
      'The Routine That Works When You Have No Time',
    ],
    description: 'Most drummers never build a practice routine that lasts. The system: 5-minute warm-up (same sequence every session), 20-minute focused block on one skill, 5-minute free play to stay motivated. Three sessions a week beats one weekend marathon. Consistency over volume — always. Track what you worked on in a simple notes log. Six weeks in, read it back: the progress that felt invisible becomes undeniable. Drum practice routine for beginners. How to practice drums with structure.',
    destination_url: `${SITE}/blog/building-your-first-drum-practice-routine`,
    lead_magnet_url: `${SITE}/free#daily-playbook`,
    product_url: `${SITE}/shop/drummers-practice-blueprint`,
    funnel: 'Pin → First Drum Routine Article → Daily Playbook lead magnet → Drummer\'s Practice Blueprint',
    layout_note: 'Crossed drumsticks icon center-bottom, electric gold highlights on the tips. Title text top-third in large Syne, two lines max. Concentric rhythm ring texture radiating from stick cross point — very faint, gold. Dark background, strong diagonal tension from stick placement. Kinetic energy, not stillness.',
    status: 'pending_approval',
  },

  {
    pillar: 'drums',
    batch: 'A',
    post_slug: 'drum-practice-routine-that-actually-sticks',
    pin_image_path: `/pins/drum-practice-routine-that-actually-sticks.png`,
    title_variants: [
      'The Practice Routine You Won\'t Quit After Two Weeks',
      'Consistency Over Marathon Sessions (Drummer\'s System)',
      'Build Real Skill in 30 Minutes — The Two-Day Rule',
      'The Weekly Structure That Produces Actual Drumming Progress',
    ],
    description: 'The two-day rule is the most important drumming habit: never miss two practice sessions in a row. One missed day is rest. Two in a row is a pattern that needs breaking. Build your routine with a fixed structure (warm-up block, focused work block, play block) and rotating content so you never have to decide what to practice at the kit. Minimum viable session: 20 minutes. Optimize for the floor, not the ceiling. Paradiddle exercises, drum metronome practice, stick control routines.',
    destination_url: `${SITE}/blog/drum-practice-routine-that-actually-sticks`,
    lead_magnet_url: `${SITE}/free#daily-playbook`,
    product_url: `${SITE}/shop/drummers-practice-blueprint`,
    funnel: 'Pin → Routine That Sticks Article → Daily Playbook lead magnet → Drummer\'s Practice Blueprint',
    layout_note: 'Text-forward layout: large "2" numeral gold, positioned left-center, stylized as a circle (the two-day rule). Drumsticks icon small, bottom-right. Title flows right side of the numeral. The "2" is the visual anchor — unusual, eye-catching, immediately gives context. Subtle rhythm line texture across background.',
    status: 'pending_approval',
  },

  {
    pillar: 'drums',
    batch: 'A',
    post_slug: 'hidden-gem-drum-gear-under-50',
    pin_image_path: `/pins/hidden-gem-drum-gear-under-50.png`,
    title_variants: [
      'Hidden Gem Drum Gear Most Players Sleep On',
      'Under $50, Over-Delivers — The Drummer\'s Edit',
      '5 Drum Tools That Punch Way Above Their Price',
      'The Gear Serious Drummers Buy First (Under $50)',
    ],
    description: 'Evans EQ pad ($12) tightens your bass drum without EQ. Evans Real Feel practice pad ($35) replicates snare bounce better than foam. Moongel ($8) dampens overtones anywhere, removable, reusable. A dedicated metronome ($25) removes phone distraction from practice. Vater Vintage Bomber sticks ($14) give more control for intricate work. Total: under $90. Impact on your sound and focus: immediate. Hidden gem drum gear for beginners and serious drummers. Best drum practice pads affordable.',
    destination_url: `${SITE}/blog/hidden-gem-drum-gear-under-50`,
    lead_magnet_url: `${SITE}/free#daily-playbook`,
    product_url: `${SITE}/shop/drummers-practice-blueprint`,
    funnel: 'Pin → Hidden Gem Drum Gear Article → Daily Playbook lead magnet → Drummer\'s Practice Blueprint',
    layout_note: 'Five-item vertical list layout: subtle numbered 1-5 on left margin, each in gold. Main title top spanning full width. The composition feels like an editorial gear list — restrained, magazine-style. One drumstick diagonal crossing the lower third creates visual interest. Background: deepest charcoal, zero clutter.',
    status: 'pending_approval',
  },

  {
    pillar: 'drums',
    batch: 'A',
    post_slug: 'building-a-pc-sports-cards-long-term-collection-strategy',
    // Cross-pillar pin: vault methodology angle bridges drums discipline with collecting.
    // Actual post category: collecting — pin frames it through the lens of practiced discipline.
    pin_image_path: `/pins/building-a-pc-sports-cards-long-term-collection-strategy.png`,
    title_variants: [
      'The Long Game: How Serious People Build Collections With Intention',
      'Curate, Don\'t Accumulate — The Collector\'s Mindset',
      'One Player, Deep — The PC Philosophy That Scales',
      'Build a Personal Collection That Actually Means Something',
    ],
    description: 'Whether it\'s a sports card PC or a practice discipline, the same principle applies: intentional depth beats scattered breadth. Pick a player, a genre, a skill — and go ten levels deep instead of one level wide across ten things. Define your focus before you buy. Tier your targets: blue-chip core, aspirational grails, opportunistic pickups. Every item in your vault should have a reason to be there. Vault philosophy applied to collecting and creative practice. Personal collection strategy sports cards.',
    destination_url: `${SITE}/blog/building-a-pc-sports-cards-long-term-collection-strategy`,
    lead_magnet_url: `${SITE}/free#daily-playbook`,
    product_url: `${SITE}/shop/collectors-vault-starter-kit`,
    funnel: 'Pin → PC Strategy Article → Daily Playbook lead magnet → Collector\'s Vault Starter Kit',
    layout_note: 'Structural: single card slab icon on left, single drumstick on right — mirrored, same gold treatment. Title runs across the top spanning both. A single gold horizontal rule between the two icons. The visual says "two disciplines, one standard." Quiet, editorial, intentional. Speaks to the collector who also practices.',
    status: 'pending_approval',
  },

  // ─── BATCH B: DRUMS / RHYTHM PINS (2) ─────────────────────────────────────
  // All 3 drums posts were covered in Batch A. These two pins use the same posts
  // but with entirely different keyword angles, visual layouts, and search intents
  // (rudiments/technique vs. flow state/advanced) to reach different search queries.

  {
    pillar: 'drums',
    batch: 'B',
    post_slug: 'building-your-first-drum-practice-routine',
    // Different angle from Batch A pin: rudiments + paradiddle focus instead of structure/system.
    pin_image_path: `/pins/building-your-first-drum-practice-routine.png`,
    title_variants: [
      'Paradiddles Are the Foundation. Here\'s Why.',
      'The 5 Rudiments Every Drummer Should Know Cold',
      'Start With Rudiments — Everything Else Builds From Here',
      'Why Serious Drummers Always Come Back to the Basics',
    ],
    description: 'Paradiddles, flams, drags, rolls, and ratamacues — five rudiment families that unlock everything else in drumming. They\'re not beginner content. They\'re the vocabulary serious drummers return to for decades. Practice them at 50 bpm until they\'re automatic. Then push the tempo 2 bpm at a time. The drummers who plateau are the ones who skipped this layer. Drum rudiments guide for serious practice. Paradiddle exercises, how to practice drumming fundamentals, stick control drills.',
    destination_url: `${SITE}/blog/building-your-first-drum-practice-routine`,
    lead_magnet_url: `${SITE}/free#daily-playbook`,
    product_url: `${SITE}/shop/drummers-practice-blueprint`,
    funnel: 'Pin → First Drum Routine Article (rudiments section) → Daily Playbook lead magnet → Drummer\'s Practice Blueprint',
    layout_note: 'Single drumstick vertical center-left, perfectly upright, gold tip at top like a pointer. Text block right half — large title, small descriptor below. Background: dark charcoal with ultra-faint staff lines running horizontally. No sticks crossed this time — singular, vertical, intentional. The composition reads like a music notation diagram. Completely different feel from Batch A.',
    status: 'pending_approval',
  },

  {
    pillar: 'drums',
    batch: 'B',
    post_slug: 'drum-practice-routine-that-actually-sticks',
    // Different angle from Batch A pin: flow state + consistency focus vs. structure.
    pin_image_path: `/pins/drum-practice-routine-that-actually-sticks.png`,
    title_variants: [
      'Flow State at the Kit: How to Get There Every Session',
      'The Secret to Never Dreading Practice Again',
      'What Happens When You Practice Drums the Right Way',
      'Consistency Without Willpower — The Drummer\'s Method',
    ],
    description: 'Flow state isn\'t a reward for advanced drummers — it\'s what happens when the warm-up is right and the session goal is specific. The mistake: starting a session cold and deciding what to work on at the kit. The fix: have one thing to focus on before you sit down, warm up the exact same way every time, and let the groove pull you forward. Minimum viable session on hard days is 20 minutes. The habit matters more than the duration. Flow state drumming, consistency habits for drummers, drum practice motivation.',
    destination_url: `${SITE}/blog/drum-practice-routine-that-actually-sticks`,
    lead_magnet_url: `${SITE}/free#daily-playbook`,
    product_url: `${SITE}/shop/drummers-practice-blueprint`,
    funnel: 'Pin → Routine That Sticks Article → Daily Playbook lead magnet → Drummer\'s Practice Blueprint',
    layout_note: 'Waveform / rhythm visualization: abstract horizontal rhythm wave in gold (simple sine-like wave with beats marked) spanning the middle third. Text above the wave, large title. Text below the wave, small descriptor. Drumstick silhouette icon small at bottom-right corner. The wave is the hero visual — kinetic, musical, unlike any other layout in either batch. Charcoal bg, no crossed sticks anywhere.',
    status: 'pending_approval',
  },

  // ─── BATCH B: ROUTINES / SYSTEMS PINS (6) ─────────────────────────────────
  // 2 posts: morning-vault-systems-based-morning-routine + the-5-am-myth-building-a-routine-that-works-for-night-owls
  // 6 pins: 3 per post, each targeting a distinct search intent and keyword cluster.
  // Product: Morning Routine Master Template ($9)

  {
    pillar: 'routines',
    batch: 'B',
    post_slug: 'morning-vault-systems-based-morning-routine',
    // Intent: Systems-minded creators looking for a structured morning routine.
    pin_image_path: `/pins/morning-vault-systems-based-morning-routine.png`,
    title_variants: [
      'The Systems-Based Morning Routine for Creators Who Build Things',
      'Build Your Morning Like an Operating System',
      'A Morning Routine Designed Around Output, Not Vibes',
      'Your Morning Determines Your Day. Treat It Like a System.',
    ],
    description: 'Morning routines fail because they\'re designed around inspiration, not structure. The Morning Vault approach: three protected blocks — creative work first, admin second, reactive last. No decision-making in the first 30 minutes. No phone until the first block is complete. Every output block is time-boxed and named. The structure doesn\'t restrict creativity — it protects it. Systems-based morning routine for creators. Morning productivity habits, daily systems for deep work, creator morning ritual.',
    destination_url: `${SITE}/blog/morning-vault-systems-based-morning-routine`,
    lead_magnet_url: `${SITE}/free#daily-playbook`,
    product_url: `${SITE}/shop/morning-routine-master-template`,
    funnel: 'Pin → Morning Vault Article → Daily Playbook lead magnet → Morning Routine Master Template',
    layout_note: 'Grid-structure motif (routines pillar). Three horizontal blocks stacked — each labeled in small caps: CREATIVE / ADMIN / REACTIVE. Gold thin rule separating each block. Title text large above the block stack. The whole composition reads like a daily time block diagram — clean, structured, no ornamentation. Charcoal bg. No humanizing imagery — pure system visualization.',
    status: 'pending_approval',
  },

  {
    pillar: 'routines',
    batch: 'B',
    post_slug: 'morning-vault-systems-based-morning-routine',
    // Intent: Habit stacking + discipline — discipline/consistency searchers.
    pin_image_path: `/pins/morning-vault-systems-based-morning-routine.png`,
    title_variants: [
      'Discipline Is a Design Problem, Not a Willpower Problem',
      'How to Make Your Morning Routine Actually Stick',
      'The Habit Stack That Protects Your Best Creative Hours',
      'Stop Relying on Motivation. Build a Morning System.',
    ],
    description: 'Willpower is the wrong tool for morning routines. The right tool is design. Remove decisions: same wake time, same first action, same first output block — every day. Stacking small wins at the start of the day changes your brain\'s read on your own capability. The creator who writes 200 words every morning publishes more than the one who writes 2,000 words once a week. Minimum viable morning routine. Habit stacking guide for creatives. How to build consistency without 5AM wake-ups. Daily systems for output.',
    destination_url: `${SITE}/blog/morning-vault-systems-based-morning-routine`,
    lead_magnet_url: `${SITE}/free#daily-playbook`,
    product_url: `${SITE}/shop/morning-routine-master-template`,
    funnel: 'Pin → Morning Vault Article → Daily Playbook lead magnet → Morning Routine Master Template',
    layout_note: 'Text-dominant, bold editorial. A single large typographic element: the word "DISCIPLINE" set large, partially clipped off at the right edge (intentional). Below it, a thin gold underline. Then title text in smaller Syne. Very stark, very intentional — typographic tension, no icons. Bottom-right: tiny crossed drumstick/grid mark (the vault symbol). Black-on-charcoal-on-dark layered feel.',
    status: 'pending_approval',
  },

  {
    pillar: 'routines',
    batch: 'B',
    post_slug: 'morning-vault-systems-based-morning-routine',
    // Intent: Deep work / protect creative hours — productivity for creatives searchers.
    pin_image_path: `/pins/morning-vault-systems-based-morning-routine.png`,
    title_variants: [
      'Protect Your Creative Hours — Before Anyone Else Claims Them',
      'The Morning Block That Changed How I Work',
      'Deep Work First. Everything Else After.',
      'Your Creative Best Deserves the First Two Hours',
    ],
    description: 'Every creator\'s most important hours are the first two after waking. Not email. Not social. Not Slack. The work that moves things forward — writing, building, practicing, thinking — happens before the world starts demanding. The Morning Vault system is built on one rule: protect the first block before anything reactive enters. What you produce in that block is the day\'s anchor. Everything else is maintenance. Morning routine that protects creative work. Deep work morning routine for side hustlers and collectors. Productivity for creators.',
    destination_url: `${SITE}/blog/morning-vault-systems-based-morning-routine`,
    lead_magnet_url: `${SITE}/free#daily-playbook`,
    product_url: `${SITE}/shop/morning-routine-master-template`,
    funnel: 'Pin → Morning Vault Article → Daily Playbook lead magnet → Morning Routine Master Template',
    layout_note: 'Clock motif — analog clock outline (just hands and rim, no numbers) positioned center-right. Hands set to 7:00. Text block left side, large title. Gold circle arc echoes the clock rim on the left edge (partial). The visual reads: "your morning, your time." Quiet, contemplative, editorial — very different from the structured-blocks layout above.',
    status: 'pending_approval',
  },

  {
    pillar: 'routines',
    batch: 'B',
    post_slug: 'the-5-am-myth-building-a-routine-that-works-for-night-owls',
    // Intent: Night owl morning routine — people who hate 5am content.
    pin_image_path: `/pins/the-5-am-myth-building-a-routine-that-works-for-night-owls.png`,
    title_variants: [
      'You Don\'t Need a 5AM Wake-Up to Have a Great Morning Routine',
      'The Morning Routine Built for Night Owls',
      'Why 5AM Fails and What to Do Instead',
      'Stop Faking 5AM. Build a Routine That Actually Fits You.',
    ],
    description: 'The 5AM myth: waking up early is the prerequisite for discipline. It\'s not. Discipline is about protecting your best hours — whatever time those are. Night owls who force 5AM wake-ups get chronically underslept, cognitively compromised versions of themselves doing "morning routines." The alternative: identify when you\'re sharpest, protect that window, and build structure around it. A 9AM creative block is worth more than a miserable 5AM journal session. Morning routine for night owls. How to build a routine without 5AM. Flexible daily systems.',
    destination_url: `${SITE}/blog/the-5-am-myth-building-a-routine-that-works-for-night-owls`,
    lead_magnet_url: `${SITE}/free#daily-playbook`,
    product_url: `${SITE}/shop/morning-routine-master-template`,
    funnel: 'Pin → Night Owl Routine Article → Daily Playbook lead magnet → Morning Routine Master Template',
    layout_note: 'Moon/night motif inverted into morning framing. Upper half: dark, deep charcoal with a subtle crescent moon icon (gold outline, small, top-center). Lower half: lighter charcoal band — implying dawn without being cheesy. Text spans both halves. Title bold and large. The image should feel calm and unhurried — the anti-hustle morning. Very different from the structured-blocks and clock layouts.',
    status: 'pending_approval',
  },

  {
    pillar: 'routines',
    batch: 'B',
    post_slug: 'the-5-am-myth-building-a-routine-that-works-for-night-owls',
    // Intent: Routine recovery / habit reset — people who fell off their routine.
    pin_image_path: `/pins/the-5-am-myth-building-a-routine-that-works-for-night-owls.png`,
    title_variants: [
      'Fell Off Your Routine? Here\'s How to Reset Without Drama',
      'The One-Day Recovery System for When Life Breaks Your Routine',
      'How to Get Back on Track After Missing Days',
      'Your Routine Doesn\'t Have to Be All-or-Nothing',
    ],
    description: 'Missing two days isn\'t falling off — it\'s normal. Treating it like a failure is what kills routines. The recovery system: don\'t restart from zero, don\'t add guilt to the missed sessions, just run the minimum viable version tomorrow. Reduce the barrier instead of increasing the commitment. A 15-minute session on a hard day is more valuable than a 90-minute session after skipping all week. Habit recovery when routine breaks. How to stay consistent without 5AM wake-ups. Flexible morning routine for irregular schedules.',
    destination_url: `${SITE}/blog/the-5-am-myth-building-a-routine-that-works-for-night-owls`,
    lead_magnet_url: `${SITE}/free#daily-playbook`,
    product_url: `${SITE}/shop/morning-routine-master-template`,
    funnel: 'Pin → Night Owl Routine Article (recovery section) → Daily Playbook lead magnet → Morning Routine Master Template',
    layout_note: 'Arrow-restart motif: a circular reset arrow in gold, center composition, not too large. Text above: large title. Text below: small descriptor. Background has a very subtle grid texture (routines pillar visual language) at 5% opacity. The reset arrow is the emotional anchor — empathetic, not punishing. Clean and white-space-heavy. Nothing aggressive.',
    status: 'pending_approval',
  },

  {
    pillar: 'routines',
    batch: 'B',
    post_slug: 'the-5-am-myth-building-a-routine-that-works-for-night-owls',
    // Intent: Minimum viable routine — searchers wanting the smallest effective habit.
    pin_image_path: `/pins/the-5-am-myth-building-a-routine-that-works-for-night-owls.png`,
    title_variants: [
      'The Minimum Viable Morning Routine (For Real Life)',
      '20 Minutes. Same Thing Every Day. That\'s the Routine.',
      'The Smallest Routine That Actually Changes Things',
      'What If Your Morning Routine Only Takes 20 Minutes?',
    ],
    description: 'The minimum viable morning routine: 5 minutes of the same physical trigger (stretch, cold water, same beverage), 15 minutes of one output task with no phone. That\'s it. Everything else is optimization. The obsession with elaborate routines misses the point — the point is consistency, not comprehensiveness. A 20-minute routine done every day beats a 2-hour routine done three times a week. Minimum viable morning routine. How to build a simple daily routine. Consistency habits for creators and side hustlers.',
    destination_url: `${SITE}/blog/the-5-am-myth-building-a-routine-that-works-for-night-owls`,
    lead_magnet_url: `${SITE}/free#daily-playbook`,
    product_url: `${SITE}/shop/morning-routine-master-template`,
    funnel: 'Pin → Night Owl Routine Article → Daily Playbook lead magnet → Morning Routine Master Template',
    layout_note: 'Minimalist timer layout: large "20" numeral centered, gold, dominant. Below it: "MIN" in smaller caps. Title wraps above the number. Thin gold ring around the "20" — like a timer ring. The design IS the content: 20 minutes, done. Extremely clean. No extra icons. The starkness is the message. One accent dot at bottom center.',
    status: 'pending_approval',
  },

  // ─── BATCH B: HIDDEN GEMS PINS (2) ────────────────────────────────────────

  {
    pillar: 'hidden-gems',
    batch: 'B',
    post_slug: '5-underrated-sports-cards-worth-watching-now',
    pin_image_path: `/pins/5-underrated-sports-cards-worth-watching-now.png`,
    title_variants: [
      '5 Sports Cards Flying Under the Radar Right Now',
      'The Underrated Cards Worth Watching Before the Market Wakes Up',
      'Hidden Value in Plain Sight — 5 Cards Most Collectors Miss',
      'Pre-Hype Picks: 5 Cards I\'d Add to a Watchlist Today',
    ],
    description: 'The best time to find hidden gem cards is before the algorithm finds them. Five categories worth watching: pre-call-up prospects with rising trajectory, junk wax era stars with low PSA 10 pop counts, regional variants most collectors don\'t know exist, second-year cards that missed the rookie premium, and error cards with small correction windows. None of these are tips — they\'re frameworks for finding your own. Underrated sports cards flying under the radar. Hidden gem card finds, pre-rookie card investing, overlooked cards worth buying.',
    destination_url: `${SITE}/blog/5-underrated-sports-cards-worth-watching-now`,
    lead_magnet_url: `${SITE}/free#grading-checklist`,
    product_url: `${SITE}/shop/collectors-vault-starter-kit`,
    funnel: 'Pin → Underrated Cards Article → Grading Prep Checklist → Collector\'s Vault Starter Kit',
    layout_note: 'Magnifier / discovery motif (hidden-gems pillar). Magnifying glass icon: gold rim, positioned right-center, overlapping a faint card outline behind the lens. Title text top-left, large, 2 lines max. Five small dots (• • • • •) in gold below the title — representing the 5 picks. Very editorial. The composition reads like a curator\'s find: deliberate, earned, not loud. Deep charcoal, no bright highlights.',
    status: 'pending_approval',
  },

  {
    pillar: 'hidden-gems',
    batch: 'B',
    post_slug: 'hidden-gems-discogs-strategies-worth-knowing',
    pin_image_path: `/pins/hidden-gems-discogs-strategies-worth-knowing.png`,
    title_variants: [
      'The Discogs Strategies That Find Cheap Gems Before Anyone Else',
      'How to Use Discogs to Find Records Most Collectors Skip',
      '5 Discogs Search Tricks That Surface Hidden Value',
      'The Discogs Method: Buy Better, Find More, Pay Less',
    ],
    description: 'Most Discogs buyers search by artist and sort by price. That\'s the floor. The ceiling: filter by pressing country to find regional variants with low supply, sort by "for sale: fewest" to catch rare pressings before they\'re noticed, check "in 0 wantlists" for genuinely undiscovered records, use label filtering on cult imprints. Five strategies that surface what general search buries. Discogs hidden gems, how to find cheap records on Discogs, overlooked vinyl records worth collecting, Discogs buying tips for collectors.',
    destination_url: `${SITE}/blog/hidden-gems-discogs-strategies-worth-knowing`,
    lead_magnet_url: `${SITE}/free#grading-checklist`,
    product_url: `${SITE}/shop/collectors-vault-starter-kit`,
    funnel: 'Pin → Discogs Strategies Article → Grading Prep Checklist → Collector\'s Vault Starter Kit',
    layout_note: 'Stacked-list discovery layout: five horizontal rows, each with a small search icon (magnifier, tiny, gold) at the start and a descriptor line. The list IS the design. Title at top, spanning full width. The composition reads like a search-result card — dry, informational, deliberately understated. A vertical gold rule on the left margin anchors the list. No card slabs, no vinyl discs — the discovery method is the subject, not the object.',
    status: 'pending_approval',
  },

];

module.exports = { PINTEREST_APPROVAL_QUEUE };
