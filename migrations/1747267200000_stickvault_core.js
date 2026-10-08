/**
 * Core StickVault tables.
 * Owns: blog_posts, products, email_subscribers
 * Does NOT own: users (core template table)
 */
module.exports = {
  name: 'stickvault_core',
  up: async (client) => {
    // Blog posts with category + slug
    await client.query(`
      CREATE TABLE blog_posts (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) NOT NULL UNIQUE,
        title VARCHAR(500) NOT NULL,
        category VARCHAR(100) NOT NULL,
        excerpt TEXT,
        body TEXT NOT NULL,
        cover_image VARCHAR(500),
        pinterest_description TEXT,
        read_time_minutes INTEGER DEFAULT 5,
        published BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    await client.query(`
      CREATE INDEX blog_posts_category_idx ON blog_posts(category)
    `);

    await client.query(`
      CREATE INDEX blog_posts_published_idx ON blog_posts(published, created_at DESC)
    `);

    // Digital products with Stripe link
    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) NOT NULL UNIQUE,
        title VARCHAR(500) NOT NULL,
        description TEXT NOT NULL,
        long_description TEXT,
        price_cents INTEGER NOT NULL,
        stripe_url VARCHAR(500) NOT NULL,
        cover_image VARCHAR(500),
        category VARCHAR(100),
        features TEXT[],
        active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Email subscribers (interest capture)
    await client.query(`
      CREATE TABLE email_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        source VARCHAR(100) DEFAULT 'homepage',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Seed initial products with real Stripe links
    await client.query(`
      INSERT INTO products (slug, title, description, long_description, price_cents, stripe_url, category, features) VALUES
      (
        'drummers-practice-blueprint',
        'Drummer''s Practice Blueprint',
        'The complete system for building a consistent drum practice routine. Rudiment progressions, weekly schedules, focus frameworks.',
        'Stop noodling. Start progressing. This blueprint is the exact practice system used by working drummers who balance improvement with real life. Covers warm-up sequences, targeted practice blocks, rudiment ladders, and how to measure progress without burning out.',
        1700,
        'https://buy.stripe.com/fZufZh13V0iegWD4FXgw000',
        'drums',
        ARRAY['7 weekly schedule templates', 'Rudiment progression ladder', 'Practice journal prompts', 'Focus timer frameworks', 'PDF + printable format']
      ),
      (
        'collectors-vault-starter-kit',
        'Collector''s Vault Starter Kit',
        'Spreadsheet templates, grading guides, and valuation checklists for serious collectors — vinyl, cards, sneakers, and more.',
        'Every serious collector needs a system. Track acquisitions, grade condition, monitor values, and know exactly what you own. Works for vinyl records, trading cards, sneakers, vintage toys, or whatever you''re into.',
        1200,
        'https://buy.stripe.com/28EeVd6offd87m37S9gw001',
        'collecting',
        ARRAY['Master collection spreadsheet', 'Condition grading rubric', 'Value tracking dashboard', 'Insurance documentation template', 'Works offline (Google Sheets + Excel)']
      ),
      (
        'side-hustle-launchpad',
        'Side Hustle Launchpad',
        'A no-fluff 30-day roadmap to validate, launch, and make your first sale from a passion-based side hustle.',
        'Most side hustle advice is garbage — generic frameworks that ignore what actually works when you have a day job and limited time. This is 30 days of specific actions, each taking under an hour, designed to get you from idea to first dollar.',
        2700,
        'https://buy.stripe.com/28E7sL27Zghc0XF8Wdgw002',
        'side-hustles',
        ARRAY['30-day daily action plan', 'Niche validation worksheet', 'First offer templates', 'Outreach scripts that don''t feel gross', 'Notion + PDF format']
      ),
      (
        'morning-routine-master-template',
        'Morning Routine Master Template',
        'Build a morning ritual that actually sticks. PDF planner, Notion template, and habit stacking guide for creative people.',
        'Generic morning routines fail creative people. This one doesn''t. Built around the reality of night-owl schedules, creative work blocks, and protecting your best mental hours for what matters.',
        900,
        'https://buy.stripe.com/8x2eVddQHe947m35K1gw003',
        'routines',
        ARRAY['Printable PDF daily planner', 'Notion template (ready to duplicate)', 'Habit stacking guide', 'Night owl edition included', 'Weekly review ritual']
      )
    `);

    // Seed initial blog posts
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description) VALUES
      (
        'building-your-first-drum-practice-routine',
        'Building Your First Real Drum Practice Routine',
        'drums',
        'Most drummers never build a practice routine that sticks. Here''s why — and the system that fixes it.',
        '<p>You sit down at the kit. You noodle on the groove you already know. You stumble through that fill you''ve been "working on" for three months. You put the sticks down 20 minutes later having accomplished nothing.</p>

<p>Sound familiar? This is the default mode for 90% of drummers — not because they lack talent, but because they lack a system.</p>

<h2>The three things a real practice routine needs</h2>

<p><strong>1. A warm-up that actually prepares you.</strong> Not scales, not random rudiments — a deliberate sequence that builds hand independence while warming your muscles. We''re talking 5–8 minutes max, same every session.</p>

<p><strong>2. A focused block for the skill you''re actually developing.</strong> One skill. Not "improve my drumming." One thing: maybe it''s double bass consistency, or ghost notes at tempo, or reading notation. Twenty focused minutes beats ninety minutes of unfocused playing every time.</p>

<p><strong>3. A fun block to stay motivated.</strong> Play along to something you love. Improvise. Explore. This is the reward that keeps you coming back. Skip it and your practice starts feeling like homework.</p>

<h2>The minimum viable session: 30 minutes</h2>

<p>Warm-up: 5 minutes. Focused work: 20 minutes. Fun block: 5 minutes.</p>

<p>That''s it. That''s enough to make real progress if you show up consistently. Three sessions a week beats one marathon session every weekend. Consistency is the skill.</p>

<h2>Tracking progress without obsessing over it</h2>

<p>Keep a simple log. Date, what you worked on, what felt hard. That''s all. After six weeks, read it back. You''ll surprise yourself with how much has shifted — and you''ll see exactly where you''re still stuck.</p>

<p>The goal isn''t to track every BPM gain. It''s to create evidence that you''re moving, because the brain is wired to discount invisible progress.</p>',
        6,
        'How to build a drum practice routine that actually sticks. A 30-minute system for consistent progress — warm-up, focused work, and fun blocks that keep you motivated.'
      ),
      (
        'how-to-start-a-vinyl-collection-without-losing-your-mind',
        'How to Start a Vinyl Collection Without Losing Your Mind',
        'collecting',
        'The first 10 records you buy will define whether vinyl becomes a lifelong thing or an expensive regret.',
        '<p>Vinyl is a rabbit hole. A gorgeous, warm, obsessive rabbit hole that has claimed the wallets and wall space of millions of people who thought they were "just buying a few records."</p>

<p>You are going to be one of them. The question is whether you do it smart or chaotic.</p>

<h2>Start with what you actually love</h2>

<p>The worst vinyl collections are curated to impress. The best ones are curated to be played. Buy albums you already know and love before you go hunting for "important" records you feel like you should own.</p>

<p>Your first 10 records should all be things you''ll play on a random Tuesday. The cool stuff comes later — once you actually have a setup worth playing it on.</p>

<h2>Gear first, records second</h2>

<p>A $30 record played on a garbage turntable sounds worse than Spotify. Don''t buy 40 records before you have a decent setup.</p>

<p>Budget reality: a respectable entry-level setup (turntable, preamp, powered speakers) runs $300–$500. Buy that before you spend $200 on records. It will change how you hear everything.</p>

<h2>Condition is everything</h2>

<p>A mint copy of a mediocre album beats a trashed original pressing of a masterpiece. Learn grading before you start buying used: VG+ is the minimum you want for records you''ll actually play. NM/M is what you want for anything you''re buying to keep.</p>

<h2>Track what you own from day one</h2>

<p>You will forget what you have. You will buy duplicates. You will lose track of what you paid. Start a simple spreadsheet from record one: title, artist, year, pressing, condition, paid. Future you will be grateful.</p>',
        7,
        'How to start a vinyl collection the right way. Tips for beginners: gear first, buy what you love, learn condition grading, and track everything from day one.'
      ),
      (
        'the-5-am-myth-building-a-routine-that-works-for-night-owls',
        'The 5AM Myth: Building a Routine That Works for Night Owls',
        'routines',
        'The productivity world is obsessed with early mornings. If that''s not you, here''s what actually works.',
        '<p>Every productivity influencer wakes up at 5AM. They drink lemon water. They journal for 20 minutes. They exercise. They''re at peak performance by 7AM when you''re still sleeping.</p>

<p>This is great for them. It''s irrelevant for you.</p>

<h2>Chronotype is real</h2>

<p>There''s actual science behind why some people are sharp at 6AM and others don''t hit their stride until 10PM. Fighting your chronotype doesn''t make you disciplined — it makes you chronically underslept and cognitively impaired.</p>

<p>The question isn''t "how do I become a morning person?" The question is "when am I actually at my sharpest, and what am I using those hours for?"</p>

<h2>Build your routine around your peak, not the clock</h2>

<p>Map your energy in honest terms: when do you feel most creative? Most focused? Most capable of hard thinking? For night owls, this might be 10AM–1PM, or 9PM–midnight. Those are your protected hours — they go to your most important work.</p>

<p>The "morning routine" advice isn''t wrong. It''s just misnamed. It should be called "peak routine" — the ritual you do before your best work window, whenever that is.</p>

<h2>The night owl''s protected block</h2>

<p>If your creative peak is in the evening, protect it ruthlessly. That means: notifications off, no social media, no email after 8PM. Use that window for creation, not consumption.</p>

<p>The hardest part isn''t the work — it''s explaining to people why you can''t take 9PM calls. The answer is "I''m working." It''s fine.</p>',
        5,
        'The 5AM routine isn''t for everyone. Here''s how night owls can build a morning routine that works with their chronotype — protect your peak hours instead of fighting your biology.'
      ),
      (
        'hidden-gems-discogs-strategies-worth-knowing',
        'Hidden Gems: 5 Discogs Strategies Most Collectors Don''t Know',
        'hidden-gems',
        'Discogs has tens of millions of listings. Here''s how to find the ones worth buying before everyone else does.',
        '<p>Discogs is the world''s largest marketplace for physical music — and it''s both wonderfully deep and genuinely hard to use well. Most buyers stick to obvious search patterns and overpay. Here''s what the smart buyers do instead.</p>

<h2>1. Search by country pressing, not just title</h2>

<p>The same album pressed in Japan, Germany, or the Netherlands often sounds better than the domestic pressing and costs less because American buyers ignore it. Search with country filters. The Japanese audiophile market in particular produced exceptional pressings across decades.</p>

<h2>2. Sort by lowest-rated sellers</h2>

<p>Counterintuitively, sellers with 97–98% ratings often have better deals than 99.9% sellers because buyers avoid them. Read the negative feedback — often it''s shipping complaints, not condition misrepresentation. Those sellers frequently have great records at lower prices.</p>

<h2>3. Set wantlist alerts for specific condition thresholds</h2>

<p>Don''t just wantlist a record — set it to alert only for NM or VG+ condition from sellers in your region. Cuts the noise dramatically and surfaces the right copies when they appear.</p>

<h2>4. Check "last sold" before buying</h2>

<p>Every listing shows sale history. If 10 copies sold last year for $15 and one is currently listed at $40, you know it''s overpriced. The sale history is the real market price — the listing price is the seller''s wish.</p>

<h2>5. Buy collections, not individual records</h2>

<p>When a collector liquidates, they often sell everything as a lot for a fraction of individual prices. Monitor the "Marketplace" section for multi-item lots. You''ll get duplicates — sell those and keep the gems.</p>',
        6,
        '5 Discogs strategies serious collectors use to find hidden gems. Sort by pressing country, check sale history, buy lots — find the records worth buying before everyone else.'
      ),
      (
        'turning-your-passion-into-income-without-ruining-it',
        'Turning Your Passion Into Income Without Ruining It',
        'side-hustles',
        'Monetizing what you love is the dream. The nightmare version is when the money turns the thing you loved into a job you hate.',
        '<p>Here''s the tension nobody talks about: the fastest way to kill the joy in a passion is to make your income dependent on it.</p>

<p>You love something purely. You start doing it for money. Suddenly you''re doing it for clients who don''t get it, on deadlines you didn''t set, for rates you''re too nervous to raise. Within a year, you can''t remember why you loved it.</p>

<p>This isn''t inevitable. But it requires design.</p>

<h2>Separate the passion from the business</h2>

<p>The thing you love and the business you build around it are not the same thing. A photographer who loves portraits might build a business around headshots — that''s not the same as fine art portraiture. Keep a version of the pure thing just for yourself, untouched by commercial constraints.</p>

<h2>Charge what kills the bad clients</h2>

<p>Bad clients — the ones who don''t value your work, who micromanage, who drain your energy — are always price-sensitive. A rate that filters them out is doing double duty: it values your work correctly AND protects your creative energy from the people who''d spend it badly.</p>

<h2>Build products, not just services</h2>

<p>Trading time for money caps your income and your energy. The better model: package what you know into a product — a guide, a template, a course — that earns while you sleep. It''s slower to build, but it''s how you avoid the grind.</p>

<h2>Know your exit ramp</h2>

<p>Before you go all-in, define what "enough" looks like. How much revenue makes this feel worth it? What would have to be true for you to walk it back? Having an exit ramp makes the risk feel manageable — and often means you never need to use it.</p>',
        7,
        'How to monetize your passion without losing the love for it. Keep a pure version for yourself, charge rates that filter bad clients, build products not just services.'
      )
    `);
  },
};
