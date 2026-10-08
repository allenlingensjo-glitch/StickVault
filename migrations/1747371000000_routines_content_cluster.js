/**
 * Routines content cluster — 5 new long-form posts + internal linking updates.
 * Owns: blog_posts INSERT for new routines posts, UPDATE for existing routines posts to add internal links.
 * Does NOT own: product data, email_subscribers, schema changes.
 */

// Pinterest alternate titles — POST 1: Weekly Review Operator's Checkpoint
//   "The Weekly Review That Actually Improves Your Systems"
//   "How to Run a Weekly Review (Operator's Edition)"
//   "Your Weekly Checkpoint: The Review That Builds Better Systems"
//   "Weekly Review System for Creators: What to Measure and Adjust"
//   "The Operator's Weekly Checkpoint — Systems Thinking for Creators"
//   "How High-Performers Review Their Week (And What They Fix)"
//   "Weekly Review Framework: Measure What Matters, Drop What Doesn't"
//   "The 45-Minute Weekly Review That Changes How You Work"
//   "How to Build a Weekly Review Ritual That Actually Works"
//   "Operator Mindset: Running Your Week Like a System, Not a Gut Feel"

// Pinterest alternate titles — POST 2: Building Consistency Without Motivation
//   "How to Stay Consistent Without Relying on Motivation"
//   "Systems vs Willpower: Why Discipline Doesn't Work Alone"
//   "The Consistency System: Build Habits That Don't Need Motivation"
//   "How to Stay Consistent When You Don't Feel Like It"
//   "Environment Design for Habits: The Method That Actually Works"
//   "Habit Stacking Guide: Build Consistency Through Smart Sequencing"
//   "The Compound Effect of Small Daily Routines (And How to Build Them)"
//   "Why Motivation Fails and Systems Succeed — Habit Building for Creators"
//   "Building Discipline Without Willpower: The Systems Approach"
//   "Consistency Habits: How to Show Up Every Day Without Burning Out"

// Pinterest alternate titles — POST 3: The Creator's Operating System
//   "The Creator's Operating System: Manage Multiple Projects Without Chaos"
//   "How to Manage Side Hustles, Music, and Collecting at the Same Time"
//   "Time Blocking for Multi-Project Creators: A Working System"
//   "The Creator's Weekly Operating System (No Overhaul Required)"
//   "Priority Frameworks for People With Too Many Projects"
//   "How to Run Multiple Passions Without Losing Your Mind"
//   "Multi-Project Management for Creators Who Don't Want a Day Job"
//   "The Collector-Creator Operating System: One System for Everything"
//   "Managing Music, Collecting, and Side Hustles With One Clean System"
//   "Operator Mindset: Building a Creator OS That Keeps You Moving"

// Pinterest alternate titles — POST 4: Digital Hygiene Organizing Your Digital Vault
//   "Digital Hygiene: Organizing Your Digital Vault the Right Way"
//   "How to Organize Your Files, Notes, and Bookmarks Once and For All"
//   "The Digital Declutter System: Clean Your Digital Life in a Weekend"
//   "File System Organization for Collectors and Creators"
//   "Note-Taking Systems That Actually Work (No App Overload)"
//   "Password Management, File Systems, and Digital Organization for Creators"
//   "Digital Vault Organization: How to Build a System That Stays Clean"
//   "The Minimal Digital Organization System (Less Apps, More Clarity)"
//   "How to Build a Digital Organizational System That Lasts"
//   "Clean Your Digital Life: The Complete Digital Hygiene Guide"

// Pinterest alternate titles — POST 5: The Night Owl's Output System
//   "The Night Owl's Output System: Work With Your Chronotype"
//   "How Night Owls Get More Done by Protecting Their Peak Hours"
//   "Night Owl Productivity: The System for Late-Night Creators"
//   "How to Build a Productive Evening Routine as a Night Owl"
//   "The Anti-5AM Routine: How Late-Night Creators Protect Their Output"
//   "Evening Routine for Night Owls: Protect Your Peak and Ship More"
//   "Night Owl Schedule: The System That Works When 5AM Doesn't"
//   "Late Night Creator Workflow: Output-First Evening Routine"
//   "The Night Owl's Protected Block: Evening Work Ritual for Creators"
//   "How Night Owls Build Consistency Without Waking Up Early"

module.exports = {
  name: 'routines_content_cluster',
  up: async (client) => {

    // ── POST 1: Weekly Review — The Operator's Checkpoint ─────────────────────
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description, published)
      VALUES (
        'weekly-review-operators-checkpoint',
        'Weekly Review: The Operator''s Checkpoint',
        'routines',
        'Most weekly reviews are vague and forgettable. Here''s a structured 45-minute checkpoint that actually surfaces what''s working, what''s not, and what to do next.',
        $body1$<p>The weekly review is the most underrated productivity habit in existence. Most people do a vague mental scan on Sunday night — "how''d last week go?" — and call it done. That''s not a review. That''s a vague feeling followed by a mostly unchanged week.</p>

<p>The version that works is structured, honest, and short enough to actually do. Here''s the system.</p>

<h2>Why most weekly reviews fail</h2>

<p>Two failure modes. First: too vague. "I''ll think about my week" produces nothing actionable. Second: too aspirational. Reviewing your week and then writing a fantasy schedule for next week ignores the data you just gathered.</p>

<p>A useful review is a systems audit, not a journaling session. You''re looking at what you said you''d do, what you actually did, and what that gap tells you about your system — not your character.</p>

<h2>The four-part checkpoint (45 minutes)</h2>

<p><strong>Part 1 — Capture (10 min).</strong> Get everything out of your head and off every surface. Check your calendar, inbox, notes app, desk, and wherever else open loops live. You''re not processing yet — just collecting. The goal is an empty head by the end of this block.</p>

<p><strong>Part 2 — Review (15 min).</strong> Look at last week: What did you complete? What did you push? What came up unexpectedly? Don''t judge — just note. Then look at your goals and projects: is each one moving? Which one hasn''t moved in two weeks? That''s your signal.</p>

<p><strong>Part 3 — Process (10 min).</strong> For everything you captured: either do it now (if it takes under 2 minutes), schedule it, delegate it, or delete it. This is where you process inbox and notes into actual commitments on your calendar or task list.</p>

<p><strong>Part 4 — Plan (10 min).</strong> Based on what you reviewed, set your top 3 priorities for next week. Not 10 things. Three. Write them down. Block time for them now. Everything else is secondary. If those three things happen, the week was successful.</p>

<h2>What to measure in your review</h2>

<p>Keep metrics simple and consistent. For most creators:</p>

<ul>
  <li><strong>Output metric</strong> — how many pieces did you ship? (posts, listings, practice sessions, sales attempts)</li>
  <li><strong>Input metric</strong> — hours of focused work vs. distracted time?</li>
  <li><strong>Health metric</strong> — sleep, movement, nutrition on a 1–10 scale</li>
</ul>

<p>Track just these three for 8 weeks. Patterns emerge. You''ll know exactly which inputs correlate with your best output weeks — and which habits are costing you without you noticing.</p>

<h2>The adjustment process</h2>

<p>The point of measuring is adjusting. If your focused work hours were low, what blocked them? Meetings? Distractions? Underestimating task time? Each answer points to a specific system change — not "work harder," but "block morning time in calendar" or "turn off notifications at 9AM."</p>

<p>Small adjustments compound. Six months of 1% improvements to your weekly system produces a version of your week that looks completely different from where you started — and it happened incrementally, without a dramatic overhaul.</p>

<h2>Protecting the review time</h2>

<p>Schedule it. Same time, same day, every week. Sunday evening and Friday afternoon both work well. The review doesn''t work as a "when I get to it" habit — it only works when it''s non-negotiable.</p>

<p>Combine it with something you look forward to: a good coffee, a quiet room, music you like. The ritual signals your brain that this is a different kind of thinking than task work. It''s systems thinking — stepping back to look at how the whole operation is running.</p>

<div class="vault-cta">
  <h3>Your Weekly Review Starts With a Real System</h3>
  <p>The <a href="/shop/morning-routine-master-template">Morning Routine Master Template ($9)</a> includes a weekly review ritual template alongside your daily system — same vault, different layer. If you''re building a weekly checkpoint, start with the daily structure that gives you something worth reviewing. PDF + Notion format, ready to use.</p>
</div>

<h2>Recommended Next Read</h2>
<div class="next-reads">
  <a href="/blog/morning-vault-systems-based-morning-routine" class="next-read-card">
    <span class="next-read-label">Next Read</span>
    <span class="next-read-title">The Morning Vault: A Systems-Based Morning Routine</span>
  </a>
  <a href="/blog/building-consistency-without-motivation" class="next-read-card">
    <span class="next-read-label">Next Read</span>
    <span class="next-read-title">Building Consistency Without Motivation</span>
  </a>
  <a href="/blog/creators-operating-system-manage-multiple-projects" class="next-read-card">
    <span class="next-read-label">Next Read</span>
    <span class="next-read-title">The Creator''s Operating System</span>
  </a>
</div>$body1$,
        9,
        'A structured 45-minute weekly review system for creators and collectors. Four-part checkpoint: capture, review, process, plan. How to measure what matters and adjust your systems weekly.',
        true
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    // ── POST 2: Building Consistency Without Motivation ────────────────────────
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description, published)
      VALUES (
        'building-consistency-without-motivation',
        'Building Consistency Without Motivation: The Systems Approach',
        'routines',
        'Motivation is unreliable. Discipline requires willpower you don''t always have. Here''s the approach that actually works: design your environment, stack your habits, and let the system do the heavy lifting.',
        $body2$<p>Here''s the thing nobody tells you about motivation: it''s not a resource you can cultivate. It shows up when conditions are right and disappears when they''re not. Building a consistent practice, side hustle, or creative habit on top of motivation is building on sand.</p>

<p>The people who actually show up — day after day, whether they feel like it or not — aren''t more motivated than you. They''ve built better systems.</p>

<h2>Why willpower fails</h2>

<p>Willpower is a finite resource. Research consistently shows that the ability to resist immediate impulses depletes with each use throughout the day. By evening, most people''s willpower is spent. This is why "I''ll do it later" habits almost never get done — later is when your willpower is lowest.</p>

<p>The solution isn''t to build more willpower. It''s to need less of it.</p>

<h2>Environment design: the highest-leverage habit tool</h2>

<p>Your environment is making decisions for you whether you design it or not. If your guitar is in the closet, you''ll play less guitar. If your practice pad is on your desk, you''ll tap rudiments without thinking. If your phone is in your bedroom while you work, you''ll check it constantly. If it''s in another room, you won''t.</p>

<p>The design principles:</p>

<ul>
  <li><strong>Reduce friction for behaviors you want.</strong> Lay out your gym clothes the night before. Keep your practice space ready to use. Pre-load the tab you need open for your morning work block.</li>
  <li><strong>Increase friction for behaviors you don''t.</strong> Log out of social media (not just close the app). Keep your phone in another room during focus time. Make the path to distraction require actual effort.</li>
  <li><strong>Make the right choice the default.</strong> If you have to actively choose to skip something, you''ll skip it less. If you have to actively choose to do something, you''ll do it less.</li>
</ul>

<h2>Habit stacking: the compound approach</h2>

<p>A habit stack anchors a new behavior to an existing one. The formula: "After I [existing habit], I will [new habit]."</p>

<p>This works because the existing habit becomes the trigger. You don''t need to remember to do the new thing or find the motivation — the cue is already built into your day.</p>

<p>Examples that work:</p>
<ul>
  <li>"After I pour my morning coffee, I will open my notebook and write three priorities for the day."</li>
  <li>"After I sit down at my desk, I will put my phone in my drawer before opening anything else."</li>
  <li>"After dinner, I will spend 10 minutes on the eBay listings I photographed."</li>
</ul>

<p>The key is specificity. "I''ll journal in the morning" fails because there''s no trigger. "After I make coffee, I''ll journal for 10 minutes at the kitchen table" has a trigger, a behavior, a duration, and a location. That''s a real habit stack.</p>

<h2>The compound effect of small routines</h2>

<p>Here''s the math that matters: 1% better every day compounds to 37x better in a year. 1% worse every day compounds to nearly zero. The size of the daily action matters less than the consistency.</p>

<p>Ten minutes of focused work every single day beats a heroic 3-hour session once a week. Not because the total minutes are higher — they''re actually lower. But because consistency builds the neural pathway, the identity, and the momentum that makes the next session easier.</p>

<p>The question isn''t "how do I find 3 hours for this?" It''s "can I protect 15 minutes today?" Almost always yes. Stack those days, and the progress accumulates.</p>

<h2>Recovery: the underrated consistency skill</h2>

<p>You will miss days. This is not failure — it''s data. The consistency skill that matters most isn''t never missing. It''s the speed of your recovery.</p>

<p>The rule: never miss twice in a row. One missed day is a blip. Two becomes a pattern. Three becomes the new normal. The moment you miss once, the next day''s action becomes the most important one in the entire sequence.</p>

<p>Don''t try to "make up" for missed days with extended sessions. Just do the normal version tomorrow. Recovery is a return to the standard, not a penance.</p>

<div class="vault-cta">
  <h3>Build the System That Shows Up For You</h3>
  <p>The <a href="/shop/morning-routine-master-template">Morning Routine Master Template ($9)</a> is built specifically around the consistency principles in this post — environment setup, habit stacks, and a recovery framework that doesn''t require willpower. Includes PDF planner + Notion template with night owl edition. One-time download, permanent system.</p>
</div>

<h2>Recommended Next Read</h2>
<div class="next-reads">
  <a href="/blog/morning-vault-systems-based-morning-routine" class="next-read-card">
    <span class="next-read-label">Next Read</span>
    <span class="next-read-title">The Morning Vault: A Systems-Based Morning Routine</span>
  </a>
  <a href="/blog/weekly-review-operators-checkpoint" class="next-read-card">
    <span class="next-read-label">Next Read</span>
    <span class="next-read-title">Weekly Review: The Operator''s Checkpoint</span>
  </a>
  <a href="/blog/the-5-am-myth-building-a-routine-that-works-for-night-owls" class="next-read-card">
    <span class="next-read-label">Next Read</span>
    <span class="next-read-title">The 5AM Myth: Building a Routine for Night Owls</span>
  </a>
</div>$body2$,
        8,
        'How to build consistency without relying on motivation. Environment design, habit stacking, and the compound effect of small routines — the systems approach to showing up every day.',
        true
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    // ── POST 3: The Creator's Operating System ─────────────────────────────────
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description, published)
      VALUES (
        'creators-operating-system-manage-multiple-projects',
        'The Creator''s Operating System: Manage Multiple Projects Without Chaos',
        'routines',
        'You''re building a collection, working on music, growing a side hustle, and keeping a job. Here''s the operating system for managing all of it without dropping anything important.',
        $body3$<p>At some point you stop being a person with one focus and become a person with several. You''re a drummer working on technique, a collector managing a growing PC, and a person trying to build something on the side — all while holding down whatever pays the bills.</p>

<p>Most productivity systems are designed for people with one job. Yours needs to handle multiplicity without collapsing into chaos. Here''s the OS that does it.</p>

<h2>Why typical systems fail multi-project operators</h2>

<p>Single-project productivity advice optimizes for depth: clear your plate, focus on one thing, go deep. Great advice for a sprint. Useless when you have ongoing commitments across multiple domains that all need forward movement.</p>

<p>The failure mode for multi-project people isn''t lack of focus — it''s accumulation. You add things but never subtract. Every new project gets a system, a tool, a capture workflow. Eventually you spend more time managing your systems than doing the work they''re supposed to enable.</p>

<p>The Creator''s OS is designed to be minimal. One weekly cadence. Clear project visibility. A decision framework that takes 30 seconds, not 30 minutes.</p>

<h2>The three-tier project architecture</h2>

<p>Sort everything you''re working on into three tiers:</p>

<p><strong>Tier 1 — Active (max 3 projects).</strong> These get weekly scheduled time. They have momentum. You know exactly what the next action is. Right now, for most readers: job, primary creative pursuit, one thing you''re building. Three is the max. If you have four active projects, one is actually inactive — you''re just lying to yourself about it.</p>

<p><strong>Tier 2 — Slow burn (max 5 projects).</strong> Things you''re moving forward but not prioritizing weekly. A collection that''s growing slowly. A post series you''re building over time. These get attention when Tier 1 is clear, never before.</p>

<p><strong>Tier 3 — Someday/Maybe (no limit).</strong> Ideas, goals, and projects you want to pursue eventually. They live in a list. They get reviewed monthly. Nothing in Tier 3 has scheduled time — it moves to Tier 2 only when something in Tier 2 finishes.</p>

<p>The architecture forces explicit prioritization. When you want to add something new, you have to say what it displaces or where it lives. "I''ll just add it to my list" is how people end up with 15 "active" projects and zero momentum on any of them.</p>

<h2>Time blocking for multi-project operators</h2>

<p>Time blocking works differently when you''re managing several domains. Instead of blocking for individual tasks, block by context:</p>

<ul>
  <li><strong>Deep work blocks</strong> — 90 minutes, your peak hours. One project. No switching.</li>
  <li><strong>Creative blocks</strong> — practice, collection work, making things. Can be shorter (45–60 min). Still single-context.</li>
  <li><strong>Operations blocks</strong> — email, logistics, admin, listings, communications. These don''t need peak energy. Schedule them when you''re at 60–70% capacity.</li>
  <li><strong>Review/plan time</strong> — 30 minutes, end of week. Portfolio view. What moved? What needs attention?</li>
</ul>

<p>The key insight: not all work is equal, and not all of your hours are equal. Matching the right work to the right energy state multiplies what you can produce without adding hours.</p>

<h2>The decision framework: what gets attention today</h2>

<p>When you sit down to work and have multiple projects competing for time, use this hierarchy:</p>

<ol>
  <li><strong>Is anything on fire?</strong> A deadline, a commitment, something that breaks if ignored. Do that first.</li>
  <li><strong>What''s my Tier 1 priority this week?</strong> If nothing''s on fire, this gets the deep work block.</li>
  <li><strong>What hasn''t moved in 2 weeks?</strong> A project that''s stalled needs one concrete action to prevent it from dying. Give it 25 minutes.</li>
</ol>

<p>That''s the entire framework. Three questions, 30 seconds. Anything more complex and you''ll spend your decision bandwidth on meta-work instead of the actual work.</p>

<h2>Cross-pillar connections</h2>

<p>One of the underrated advantages of being a multi-domain creator is that your projects feed each other. Your <a href="/blog/ebay-sports-card-selling-workflow">card-selling workflow</a> teaches you about building systems — which improves your side hustle. Your drum practice builds discipline — which transfers to showing up for creative work. Your collecting habits build pattern recognition — which helps you spot opportunities everywhere.</p>

<p>Build the connections deliberately. When you solve a problem in one domain, ask: "does this apply anywhere else?" Often the answer is yes, and the solution that took you a week in one area takes 20 minutes in another.</p>

<div class="vault-cta">
  <h3>Build Your Operating System on a Real Daily Structure</h3>
  <p>The <a href="/shop/morning-routine-master-template">Morning Routine Master Template ($9)</a> is the daily layer underneath the OS described here. It handles the structure of each day so the weekly architecture can focus on what''s moving. PDF planner + Notion template, ready to customize for your project mix.</p>
</div>

<h2>Recommended Next Read</h2>
<div class="next-reads">
  <a href="/blog/weekly-review-operators-checkpoint" class="next-read-card">
    <span class="next-read-label">Next Read</span>
    <span class="next-read-title">Weekly Review: The Operator''s Checkpoint</span>
  </a>
  <a href="/blog/building-consistency-without-motivation" class="next-read-card">
    <span class="next-read-label">Next Read</span>
    <span class="next-read-title">Building Consistency Without Motivation</span>
  </a>
  <a href="/blog/turning-your-passion-into-income-without-ruining-it" class="next-read-card">
    <span class="next-read-label">Next Read</span>
    <span class="next-read-title">Turning Your Passion Into Income Without Ruining It</span>
  </a>
</div>$body3$,
        10,
        'The Creator''s OS for managing multiple projects — collecting, music, side hustle — without chaos. Three-tier project architecture, context-based time blocking, and a 30-second decision framework.',
        true
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    // ── POST 4: Digital Hygiene — Organizing Your Digital Vault ───────────────
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description, published)
      VALUES (
        'digital-hygiene-organizing-your-digital-vault',
        'Digital Hygiene: Organizing Your Digital Vault',
        'routines',
        'Your digital life is a second layer of clutter that drains your cognitive bandwidth as surely as a messy desk. Here''s the system for organizing your files, notes, passwords, and bookmarks once — and keeping them organized.',
        $body4$<p>Physical collectors spend significant time and energy on organization: binders, top loaders, inventory spreadsheets, storage systems. Most of those same people have a desktop covered in unnamed files, a bookmarks bar that''s a graveyard, and a notes app that''s basically a digital junk drawer.</p>

<p>The cognitive overhead of a disorganized digital environment is the same as a disorganized physical one — it creates low-level friction that compounds across every task. Here''s the system that eliminates it.</p>

<h2>The file system: one folder, one purpose</h2>

<p>The failure mode for digital files is accumulation without hierarchy. "I''ll sort it later" produces a Downloads folder with 847 files and a desktop that makes you slightly anxious every time you open your laptop.</p>

<p>The system that works is simple and opinionated:</p>

<ul>
  <li><strong>One master folder</strong> (call it "Vault" or "Files") that contains everything</li>
  <li><strong>Top-level folders for life areas:</strong> Work / Creative / Collecting / Finance / Reference / Archive</li>
  <li><strong>Inside each:</strong> one folder per active project, one "Archive" folder for completed or inactive material</li>
  <li><strong>Naming convention:</strong> YYYY-MM-DD_description for documents. Consistent, sortable, findable.</li>
</ul>

<p>The maintenance rule: every file you create or download gets filed immediately. Not "into Downloads temporarily." Into its correct location. The 10-second act of naming and filing correctly saves an hour of searching later.</p>

<h2>Password management: the non-negotiable</h2>

<p>If you''re not using a password manager, you''re either using the same password everywhere (a security incident waiting to happen) or spending 15 minutes a month resetting forgotten passwords (death by a thousand cuts).</p>

<p>1Password, Bitwarden, and Dashlane all work. Bitwarden is free and open source. Use any of them. The migration takes 2 hours once. After that, logins become invisible — you never think about them again.</p>

<p>The setup: generate a unique random password for every site. Store it. Never use the same password twice. That''s the entire system. It also makes moving between devices frictionless and locks out anyone who compromises one account from accessing others.</p>

<h2>The bookmark system: curated, not hoarded</h2>

<p>Bookmarks fail when they become a collection — hundreds of pages saved with vague intent to "read later." Most "later" reading never happens, and the bookmarks become a guilt pile that you periodically delete without reading.</p>

<p>The alternative: bookmark nothing unless you have a specific reason and a plan to act on it. Most things you want to save are better handled by:</p>

<ul>
  <li><strong>Read-later apps</strong> (Readwise Reader, Instapaper) for articles you genuinely will read — with a weekly clearing ritual</li>
  <li><strong>Reference folders</strong> in your notes app for research and resources you''ll actually use</li>
  <li><strong>A "to revisit" note</strong> with a weekly review trigger for things you''re unsure about</li>
</ul>

<p>Keep your actual browser bookmarks to a maximum of 20: your most-used tools and resources, nothing else. Every 3 months, audit and delete anything you haven''t used.</p>

<h2>Note-taking: one system, not five</h2>

<p>Most people have notes in their phone, a physical notebook, a desktop sticky note, an email draft, and a notes app. Nothing is findable because everything is everywhere.</p>

<p>The principle: one capture system, one reference system. The capture system (where everything goes first) can be a physical notebook or a quick-entry app — the key is that it''s always with you and frictionless to use. The reference system (where things live once processed) is your permanent, organized archive.</p>

<p>For collectors, the reference system is where you store: grading notes, comp research, purchase history, seller notes, PC tracking. For creators: project notes, drafts, research, reference material. Build the system around what you actually need to find later, not around the tools themselves.</p>

<h2>The weekly digital maintenance ritual</h2>

<p>10 minutes, once a week. As part of your <a href="/blog/weekly-review-operators-checkpoint">weekly review</a>:</p>

<ul>
  <li>File everything in Downloads</li>
  <li>Clear your desktop to zero</li>
  <li>Archive or delete emails over 30 days old</li>
  <li>Process your capture notes into reference</li>
</ul>

<p>That''s it. 10 minutes prevents the accumulation that produces the 8-hour "digital declutter" project you dread every 6 months.</p>

<div class="vault-cta">
  <h3>The Daily System That Keeps Your Digital Life Clean</h3>
  <p>The <a href="/shop/morning-routine-master-template">Morning Routine Master Template ($9)</a> includes a daily digital maintenance block alongside the full day structure — the 10-minute practice that prevents the 8-hour cleanup. PDF + Notion format, works for collectors and creators managing digital-heavy workflows.</p>
</div>

<h2>Recommended Next Read</h2>
<div class="next-reads">
  <a href="/blog/weekly-review-operators-checkpoint" class="next-read-card">
    <span class="next-read-label">Next Read</span>
    <span class="next-read-title">Weekly Review: The Operator''s Checkpoint</span>
  </a>
  <a href="/blog/creators-operating-system-manage-multiple-projects" class="next-read-card">
    <span class="next-read-label">Next Read</span>
    <span class="next-read-title">The Creator''s Operating System</span>
  </a>
  <a href="/blog/building-consistency-without-motivation" class="next-read-card">
    <span class="next-read-label">Next Read</span>
    <span class="next-read-title">Building Consistency Without Motivation</span>
  </a>
</div>$body4$,
        8,
        'Digital hygiene system for collectors and creators. File organization, password management, bookmark curation, and a 10-minute weekly maintenance ritual that keeps your digital life clean.',
        true
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    // ── POST 5: The Night Owl's Output System ──────────────────────────────────
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description, published)
      VALUES (
        'night-owl-output-system-evening-routine',
        'The Night Owl''s Output System: How to Build Consistency After Dark',
        'routines',
        'You''re not broken for not being a morning person. You''re just optimized differently. Here''s the evening routine system that protects your creative peak and helps you ship more work without changing who you are.',
        $body5$<p>Productivity culture has a morning person problem. Every framework, every influencer routine, every "5AM club" post assumes your best work happens before 8AM. If you''re wired differently — if your brain finally comes online at 9PM — you''ve been given advice that fundamentally doesn''t fit your biology.</p>

<p>This is the system for the rest of us. Not a workaround. An actual evening-optimized workflow.</p>

<h2>Your chronotype is not a personality flaw</h2>

<p>Chronotype — your natural inclination toward morning or evening wakefulness — is largely genetic. It''s not laziness. It''s not lack of discipline. It''s a feature of your biology that determines when your cognitive performance peaks.</p>

<p>Research from the University of Toronto found that evening types significantly outperform morning types on measures of sustained attention and cognitive flexibility later in the day. Your brain has genuine advantages during the hours other systems dismiss as "too late to work."</p>

<p>The goal isn''t to become a morning person. The goal is to build a system that honors the chronotype you actually have.</p>

<h2>The evening protected block</h2>

<p>The morning vault concept — protecting your peak hours for your most important work — applies to night owls too. Your vault is just located later in the day.</p>

<p>Identify your peak window honestly. For many night owls, genuine cognitive peak falls between 9PM and midnight. That''s your protected block: it belongs to your primary creative work, not to passive consumption, social media, or anyone else''s priorities.</p>

<p>The evening block structure that works:</p>

<ul>
  <li><strong>Transition ritual (15 min):</strong> Something that marks the shift from "day mode" to "creative mode." Not work tasks — a physical boundary. Short walk, reading for 15 minutes, specific music. The consistency of the transition signal matters more than its content.</li>
  <li><strong>Protected work (60–90 min):</strong> Phone in another room. Single task. This is the block where output happens. The frame is the same as the morning version: one thing, no switching, protected from interruption.</li>
  <li><strong>Wind-down (20–30 min):</strong> Gradual deceleration before sleep. Low stimulation — reading physical media, light notes review, preparing for tomorrow. Screens low or off. This is how you get the quality sleep that makes tomorrow''s focus possible.</li>
</ul>

<h2>Protecting it from the evening entropy problem</h2>

<p>Mornings have a structural advantage: the day hasn''t gotten to you yet. Evenings face entropy — by 9PM you''ve been making decisions and managing inputs for 12+ hours. The protected block has to survive the accumulated weight of the day.</p>

<p>The techniques that work:</p>

<p><strong>Pre-commitment in the morning.</strong> During your morning planning (even a 10-minute version), decide what you''ll work on in the evening block. Writing it down removes the decision-making from your tired brain and turns the evening block into execution, not planning.</p>

<p><strong>Hard stop on consumption.</strong> If you move from passive scrolling directly into creative work, the transition is rough. The ritual above exists to buffer this. Protect the 15 minutes before your work block from inputs that will pull your attention in 10 different directions.</p>

<p><strong>Non-negotiable start time.</strong> Pick a time — 9PM, 9:30PM — and treat it like a meeting you can''t cancel. Not "when I feel ready." A fixed start time removes the moment of decision that your tired brain will try to negotiate around.</p>

<h2>Cross-system consistency</h2>

<p>The night owl system works best when it''s part of a larger weekly structure. Your evening output connects to your <a href="/blog/weekly-review-operators-checkpoint">weekly review</a>, which tracks whether the evening blocks are actually producing the output you intend. Your <a href="/blog/building-consistency-without-motivation">consistency habits</a> — environment design, habit stacking, recovery protocols — apply just as much to evening routines as morning ones.</p>

<p>The identity shift that helps: stop thinking of yourself as someone who "should" be a morning person and isn''t. You''re a night-optimized operator with a specific peak window. Build the system for that person, not the aspirational 5AM version.</p>

<h2>The sleep issue</h2>

<p>Evening output and quality sleep are not in conflict if you manage the wind-down correctly. The common failure is working deep into your peak window without a transition — shutting the laptop at 1AM while your brain is still at 90% intensity and then wondering why you can''t sleep.</p>

<p>The wind-down block is non-optional. 20–30 minutes of low-stimulation activity before sleep. No bright screens, no intense media. If your protected work block ends at midnight, you''re targeting sleep around 12:30–1AM. That''s fine. What''s not fine is zero wind-down and a 3AM bedtime after a spiral into passive content.</p>

<div class="vault-cta">
  <h3>The Template Built for Night Owls</h3>
  <p>The <a href="/shop/morning-routine-master-template">Morning Routine Master Template ($9)</a> includes a full night owl edition — the same vault structure adapted for evening peak workflows. PDF planner + Notion template, daily block planning, and the wind-down ritual that actually protects your sleep. Built for the people the generic systems ignore.</p>
</div>

<h2>Recommended Next Read</h2>
<div class="next-reads">
  <a href="/blog/the-5-am-myth-building-a-routine-that-works-for-night-owls" class="next-read-card">
    <span class="next-read-label">Next Read</span>
    <span class="next-read-title">The 5AM Myth: Building a Routine for Night Owls</span>
  </a>
  <a href="/blog/building-consistency-without-motivation" class="next-read-card">
    <span class="next-read-label">Next Read</span>
    <span class="next-read-title">Building Consistency Without Motivation</span>
  </a>
  <a href="/blog/morning-vault-systems-based-morning-routine" class="next-read-card">
    <span class="next-read-label">Next Read</span>
    <span class="next-read-title">The Morning Vault: A Systems-Based Morning Routine</span>
  </a>
</div>$body5$,
        9,
        'Evening routine system for night owls and late-night creators. Protected work block structure, transition rituals, wind-down protocol. Build consistency after dark without changing your chronotype.',
        true
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    // ── UPDATE existing routines posts — add internal links to new content ─────
    // Update: morning-vault-systems-based-morning-routine — add next-reads + vault-cta
    await client.query(`
      UPDATE blog_posts
      SET body = body || $update1$

<div class="vault-cta">
  <h3>Take Your Morning System Further</h3>
  <p>The <a href="/shop/morning-routine-master-template">Morning Routine Master Template ($9)</a> puts the system in this post into a ready-to-use PDF planner and Notion template. Includes the three-block structure, night owl edition, and weekly review ritual. One download, your full morning operating system.</p>
</div>

<h2>Recommended Next Read</h2>
<div class="next-reads">
  <a href="/blog/building-consistency-without-motivation" class="next-read-card">
    <span class="next-read-label">Next Read</span>
    <span class="next-read-title">Building Consistency Without Motivation</span>
  </a>
  <a href="/blog/weekly-review-operators-checkpoint" class="next-read-card">
    <span class="next-read-label">Next Read</span>
    <span class="next-read-title">Weekly Review: The Operator''s Checkpoint</span>
  </a>
  <a href="/blog/the-5-am-myth-building-a-routine-that-works-for-night-owls" class="next-read-card">
    <span class="next-read-label">Next Read</span>
    <span class="next-read-title">The 5AM Myth: Building a Routine for Night Owls</span>
  </a>
</div>$update1$
      WHERE slug = 'morning-vault-systems-based-morning-routine'
        AND body NOT LIKE '%weekly-review-operators-checkpoint%'
    `);

    // Update: the-5-am-myth — add vault-cta + next-reads for new routines posts
    await client.query(`
      UPDATE blog_posts
      SET body = body || $update2$

<div class="vault-cta">
  <h3>The Template Built for Your Chronotype</h3>
  <p>The <a href="/shop/morning-routine-master-template">Morning Routine Master Template ($9)</a> includes a dedicated night owl edition — the peak-hours system adapted for evening workflows. PDF + Notion format, ready to use immediately.</p>
</div>

<h2>Recommended Next Read</h2>
<div class="next-reads">
  <a href="/blog/night-owl-output-system-evening-routine" class="next-read-card">
    <span class="next-read-label">Next Read</span>
    <span class="next-read-title">The Night Owl''s Output System</span>
  </a>
  <a href="/blog/building-consistency-without-motivation" class="next-read-card">
    <span class="next-read-label">Next Read</span>
    <span class="next-read-title">Building Consistency Without Motivation</span>
  </a>
  <a href="/blog/morning-vault-systems-based-morning-routine" class="next-read-card">
    <span class="next-read-label">Next Read</span>
    <span class="next-read-title">The Morning Vault: A Systems-Based Morning Routine</span>
  </a>
</div>$update2$
      WHERE slug = 'the-5-am-myth-building-a-routine-that-works-for-night-owls'
        AND body NOT LIKE '%night-owl-output-system-evening-routine%'
    `);

  },
  down: async (client) => {
    await client.query(`
      DELETE FROM blog_posts
      WHERE slug IN (
        'weekly-review-operators-checkpoint',
        'building-consistency-without-motivation',
        'creators-operating-system-manage-multiple-projects',
        'digital-hygiene-organizing-your-digital-vault',
        'night-owl-output-system-evening-routine'
      )
    `);
  }
};
