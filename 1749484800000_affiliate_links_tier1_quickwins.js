/**
 * Migration: Add Affiliate Links to Top 10 Tier-1 Quick Win Posts.
 * Amazon Associates tag: stickvault0f-20
 *
 * Owns:
 *   - INSERT affiliate_links: new links (drum throne, metronome, practice pad,
 *     acoustic foam, card loupe, card photography) — ON CONFLICT DO NOTHING (re-run safe)
 *   - UPDATE blog_posts: inject contextual /r/ affiliate link CTAs into 10 post bodies
 *     at natural product mention locations
 *
 * Does NOT own: schema changes, existing affiliate_links URL updates.
 *
 * Posts updated:
 *   1. setting-up-first-home-practice-space-budget
 *   2. how-to-grade-sports-cards-psa-guide-for-beginners
 *   3. grading-prep-system-before-submitting-to-psa
 *   4. building-a-pc-sports-cards-long-term-collection-strategy
 *   5. drum-rudiment-ladder-practice-system
 *   6. best-practice-pad-routines-apartment-drummers
 *   7. 5-drummer-warm-up-routines-session-musicians
 *   8. how-to-build-speed-drums-without-sacrificing-technique
 *   9. drum-practice-routine-that-actually-sticks
 *  10. sports-card-flipping-workflow-buy-low-sell-high-system
 */
module.exports = {
  name: '1749484800000_affiliate_links_tier1_quickwins',

  up: async (client) => {

    // ── Step 1: Insert new affiliate links ───────────────────────────────────────────────
    await client.query(`
      INSERT INTO affiliate_links (slug, label, program, target_url, commission_rate, link_type, pillar) VALUES

        -- Drum throne gear
        ('drum-throne',      'Pearl D-710 / Gibraltar 9600 Drum Throne — Amazon',  'Amazon', 'https://www.amazon.com/s?k=Pearl+D-710+drum+throne&tag=stickvault0f-20',              '3-10%', 'affiliate', 'Drums'),

        -- Metronomes
        ('metronome',        'Boss DB-90 Drum Metronome — Amazon',                   'Amazon', 'https://www.amazon.com/dp/B000LN79RS?tag=stickvault0f-20',                               '3-10%', 'affiliate', 'Drums'),

        -- Practice pads
        ('practice-pad',     'Evans RF6G Real Feel Practice Pad — Amazon',           'Amazon', 'https://www.amazon.com/s?k=Evans+RF6G+practice+pad&tag=stickvault0f-20',                   '3-10%', 'affiliate', 'Drums'),

        -- Acoustic foam (room treatment)
        ('acoustic-foam',    'Acoustic Foam Panels — Amazon',                        'Amazon', 'https://www.amazon.com/s?k=acoustic+foam+panels+drum+room&tag=stickvault0f-20',             '3-10%', 'affiliate', 'Drums'),

        -- Card tools
        ('card-loupe',       'Card Loupe / Magnifying Glass — Amazon',              'Amazon', 'https://www.amazon.com/s?k=card+loupe+grading&tag=stickvault0f-20',                        '3-10%', 'affiliate', 'Collecting'),
        ('card-photography', 'Card Photography Setup — Amazon',                      'Amazon', 'https://www.amazon.com/s?k=card+photography+lightbox&tag=stickvault0f-20',                   '3-10%', 'affiliate', 'Collecting')

      ON CONFLICT (slug) DO NOTHING;
    `);

    // ── Step 2: Update blog post bodies with contextual affiliate links ──────────────────

    // ── POST 1: setting-up-first-home-practice-space-budget ──────────────────────────────
    // Pearl D-710 throne in the gear section
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'The Pearl D-710 or Gibraltar 9600 are reliable budget thrones',
        '<a href="/r/drum-throne" class="affiliate-link" rel="nofollow sponsored" target="_blank">The Pearl D-710 or Gibraltar 9600 are reliable budget thrones <span class="affiliate-cta">Check Price &rarr;</span></a>'
      ) WHERE slug = 'setting-up-first-home-practice-space-budget';
    `);

    // Boss DB-90 metronome
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'A Boss DB-90 for pedal input',
        '<a href="/r/metronome" class="affiliate-link" rel="nofollow sponsored" target="_blank">A Boss DB-90 for pedal input <span class="affiliate-cta">Check Price &rarr;</span></a>'
      ) WHERE slug = 'setting-up-first-home-practice-space-budget';
    `);

    // Practice pad mention
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'Quiet practice (using mesh heads, low-volume cymbals, or playing on a pad)',
        'Quiet practice (using mesh heads, low-volume cymbals, or <a href="/r/practice-pad" class="affiliate-link" rel="nofollow sponsored" target="_blank">playing on a practice pad <span class="affiliate-cta">Check Price &rarr;</span></a>)'
      ) WHERE slug = 'setting-up-first-home-practice-space-budget';
    `);

    // ── POST 2: best-practice-pad-routines-apartment-drummers ─────────────────────────────
    // Evans RF6G Real Feel practice pad
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'remountable, 10–12 inch diameter)',
        'remountable, 10–12 inch diameter — <a href="/r/practice-pad" class="affiliate-link" rel="nofollow sponsored" target="_blank">Evans RF6G Real Feel <span class="affiliate-cta">Check Price &rarr;</span></a>'
      ) WHERE slug = 'best-practice-pad-routines-apartment-drummers';
    `);

    // Soundbrenner metronome app
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'Soundbrenner for iOS; the built-in phone metronome works fine)',
        'Soundbrenner for iOS; the built-in phone metronome works fine — or a <a href="/r/metronome" class="affiliate-link" rel="nofollow sponsored" target="_blank">dedicated metronome like the Boss DB-90 <span class="affiliate-cta">Check Price &rarr;</span></a>)'
      ) WHERE slug = 'best-practice-pad-routines-apartment-drummers';
    `);

    // Vic Firth 5A sticks
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'The pad should be on a surface that doesn''t vibrate',
        '<a href="/r/drum-sticks" class="affiliate-link" rel="nofollow sponsored" target="_blank">Vic Firth 5A sticks <span class="affiliate-cta">Check Price &rarr;</span></a> — The pad should be on a surface that doesn''t vibrate'
      ) WHERE slug = 'best-practice-pad-routines-apartment-drummers';
    `);

    // ── POST 3: how-to-grade-sports-cards-psa-guide-for-beginners ────────────────────────
    // BCW penny sleeves in the intro section
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'Store them in penny sleeves inside top loaders before shipping.',
        'Store them in <a href="/r/penny-sleeves" class="affiliate-link" rel="nofollow sponsored" target="_blank">penny sleeves <span class="affiliate-cta">Check Price &rarr;</span></a> inside top loaders before shipping.'
      ) WHERE slug = 'how-to-grade-sports-cards-psa-guide-for-beginners';
    `);

    // Ultra Pro top loaders
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'top loaders before shipping.',
        'top loaders — <a href="/r/top-loaders" class="affiliate-link" rel="nofollow sponsored" target="_blank">Ultra Pro top loaders <span class="affiliate-cta">Check Price &rarr;</span></a> before shipping.'
      ) WHERE slug = 'how-to-grade-sports-cards-psa-guide-for-beginners';
    `);

    // UV lamp in before/while section
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'under strong light and do your own honest assessment',
        'under <a href="/r/uv-lamp" class="affiliate-link" rel="nofollow sponsored" target="_blank">strong light from a UV lamp <span class="affiliate-cta">Check Price &rarr;</span></a> and do your own honest assessment'
      ) WHERE slug = 'how-to-grade-sports-cards-psa-guide-for-beginners';
    `);

    // ── POST 4: grading-prep-system-before-submitting-to-psa ────────────────────────────
    // BCW penny sleeves in prep tools section
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'penny sleeve first (the right size',
        '<a href="/r/penny-sleeves" class="affiliate-link" rel="nofollow sponsored" target="_blank">penny sleeve <span class="affiliate-cta">Check Price &rarr;</span></a> first (the right size'
      ) WHERE slug = 'grading-prep-system-before-submitting-to-psa';
    `);

    // Ultra Pro top loaders
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'regular top loaders. Tight enough',
        'regular top loaders — <a href="/r/top-loaders" class="affiliate-link" rel="nofollow sponsored" target="_blank">Ultra Pro <span class="affiliate-cta">Check Price &rarr;</span></a> is the standard. Tight enough'
      ) WHERE slug = 'grading-prep-system-before-submitting-to-psa';
    `);

    // One Touch magnetic holders
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'semi-rigid holders for high-value cards are worth the cost.',
        'semi-rigid holders — or <a href="/r/one-touch" class="affiliate-link" rel="nofollow sponsored" target="_blank">One Touch magnetic holders <span class="affiliate-cta">Check Price &rarr;</span></a> for your best cards. Worth the cost.'
      ) WHERE slug = 'grading-prep-system-before-submitting-to-psa';
    `);

    // Card loupe
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'Grab a small LED flashlight or an angled lamp',
        'Grab a <a href="/r/card-loupe" class="affiliate-link" rel="nofollow sponsored" target="_blank">card loupe or LED flashlight <span class="affiliate-cta">Check Price &rarr;</span></a> and an angled lamp'
      ) WHERE slug = 'grading-prep-system-before-submitting-to-psa';
    `);

    // ── POST 5: building-a-pc-sports-cards-long-term-collection-strategy ──────────────────
    // Penny sleeves in storage section
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'Raw cards: penny sleeves',
        'Raw cards: <a href="/r/penny-sleeves" class="affiliate-link" rel="nofollow sponsored" target="_blank">penny sleeves <span class="affiliate-cta">Check Price &rarr;</span></a>'
      ) WHERE slug = 'building-a-pc-sports-cards-long-term-collection-strategy';
    `);

    // One Touch in storage section
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'For your best pieces: one-touch magnetic holders.',
        'For your best pieces: <a href="/r/one-touch" class="affiliate-link" rel="nofollow sponsored" target="_blank">One Touch magnetic holders <span class="affiliate-cta">Check Price &rarr;</span></a>.'
      ) WHERE slug = 'building-a-pc-sports-cards-long-term-collection-strategy';
    `);

    // Card storage boxes
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'Graded cards: UV-blocking display cases or cardboard storage boxes.',
        'Graded cards: UV-blocking display cases or <a href="/r/card-boxes" class="affiliate-link" rel="nofollow sponsored" target="_blank">card storage boxes <span class="affiliate-cta">Check Price &rarr;</span></a>.'
      ) WHERE slug = 'building-a-pc-sports-cards-long-term-collection-strategy';
    `);

    // ── POST 6: drum-rudiment-ladder-practice-system ─────────────────────────────────────
    // Practice pad in from-practice-pad section
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'Every rudiment session should include time on both a practice pad',
        'Every rudiment session should include time on both a <a href="/r/practice-pad" class="affiliate-link" rel="nofollow sponsored" target="_blank">practice pad <span class="affiliate-cta">Check Price &rarr;</span></a>'
      ) WHERE slug = 'drum-rudiment-ladder-practice-system';
    `);

    // Stick Control book
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'A month of consistent Stick Control practice produces',
        '<a href="/r/stick-control" class="affiliate-link" rel="nofollow sponsored" target="_blank">Stick Control <span class="affiliate-cta">Get the Book &rarr;</span></a> practice produces'
      ) WHERE slug = 'drum-rudiment-ladder-practice-system';
    `);

    // Drum sticks in the "what actually transfers" section
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<p>Clean singles. Even double strokes. Accent control.',
        '<p><a href="/r/drum-sticks" class="affiliate-link" rel="nofollow sponsored" target="_blank">Vic Firth 5A sticks <span class="affiliate-cta">Check Price &rarr;</span></a>. Clean singles. Even double strokes. Accent control.'
      ) WHERE slug = 'drum-rudiment-ladder-practice-system';
    `);

    // ── POST 7: 5-drummer-warm-up-routines-session-musicians ─────────────────────────────
    // Vic Firth 5A drum sticks in warm-up section
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'Start at 70 BPM and play clean single strokes (RLRL)',
        '<a href="/r/drum-sticks" class="affiliate-link" rel="nofollow sponsored" target="_blank">Vic Firth 5A sticks <span class="affiliate-cta">Check Price &rarr;</span></a> — Start at 70 BPM and play clean single strokes (RLRL)'
      ) WHERE slug = '5-drummer-warm-up-routines-session-musicians';
    `);

    // Metronome mention in session prep
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'Three minutes of this with metronome at 80 BPM.',
        'Three minutes of this with <a href="/r/metronome" class="affiliate-link" rel="nofollow sponsored" target="_blank">metronome at 80 BPM <span class="affiliate-cta">Check Price &rarr;</span></a>.'
      ) WHERE slug = '5-drummer-warm-up-routines-session-musicians';
    `);

    // Practice pad mention
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'or playing on a pad) covers the daily maintenance work.',
        'or playing on a <a href="/r/practice-pad" class="affiliate-link" rel="nofollow sponsored" target="_blank">practice pad <span class="affiliate-cta">Check Price &rarr;</span></a>) covers the daily maintenance work.'
      ) WHERE slug = '5-drummer-warm-up-routines-session-musicians';
    `);

    // ── POST 8: how-to-build-speed-drums-without-sacrificing-technique ───────────────────
    // Inject Recommended Gear CTA section near the end (before the vault-cta or closing content)
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<div class="vault-cta">
  <h3>Build Speed the Right Way, With a System</h3>',
        '<div class="affiliate-gear-block">
  <div class="affiliate-gear-label">Recommended gear to build speed</div>
  <div class="affiliate-gear-items">
    <a href="/r/drum-sticks" class="affiliate-gear-item" rel="nofollow sponsored" target="_blank">
      <span class="affiliate-gear-name">Vic Firth 5A Drum Sticks</span>
      <span class="affiliate-cta">Check Price &rarr;</span>
    </a>
    <a href="/r/metronome" class="affiliate-gear-item" rel="nofollow sponsored" target="_blank">
      <span class="affiliate-gear-name">Boss DB-90 Metronome</span>
      <span class="affiliate-cta">Check Price &rarr;</span>
    </a>
    <a href="/r/stick-control" class="affiliate-gear-item" rel="nofollow sponsored" target="_blank">
      <span class="affiliate-gear-name">Stick Control Book</span>
      <span class="affiliate-cta">Get the Book &rarr;</span>
    </a>
  </div>
</div>

<div class="vault-cta">
  <h3>Build Speed the Right Way, With a System</h3>'
      ) WHERE slug = 'how-to-build-speed-drums-without-sacrificing-technique';
    `);

    // ── POST 9: drum-practice-routine-that-actually-sticks ─────────────────────────────
    // Inject "Gear to support your routine" block before the vault-cta
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<div class="vault-cta">
  <h3>Build the Practice System, Not Just the Room</h3>',
        '<div class="affiliate-gear-block">
  <div class="affiliate-gear-label">Gear to support your routine</div>
  <div class="affiliate-gear-items">
    <a href="/r/drum-sticks" class="affiliate-gear-item" rel="nofollow sponsored" target="_blank">
      <span class="affiliate-gear-name">Vic Firth 5A Drum Sticks</span>
      <span class="affiliate-cta">Check Price &rarr;</span>
    </a>
    <a href="/r/metronome" class="affiliate-gear-item" rel="nofollow sponsored" target="_blank">
      <span class="affiliate-gear-name">Boss DB-90 Metronome</span>
      <span class="affiliate-cta">Check Price &rarr;</span>
    </a>
    <a href="/r/practice-pad" class="affiliate-gear-item" rel="nofollow sponsored" target="_blank">
      <span class="affiliate-gear-name">Evans RF6G Practice Pad</span>
      <span class="affiliate-cta">Check Price &rarr;</span>
    </a>
  </div>
</div>

<div class="vault-cta">
  <h3>Build the Practice System, Not Just the Room</h3>'
      ) WHERE slug = 'drum-practice-routine-that-actually-sticks';
    `);

    // ── POST 10: sports-card-flipping-workflow-buy-low-sell-high-system ───────────────────
    // Penny sleeves in sourcing/protection section
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'photograph a set, write titles and descriptions',
        'penny sleeves → <a href="/r/penny-sleeves" class="affiliate-link" rel="nofollow sponsored" target="_blank">BCW penny sleeves <span class="affiliate-cta">Check Price &rarr;</span></a>, photograph a set, write titles and descriptions'
      ) WHERE slug = 'sports-card-flipping-workflow-buy-low-sell-high-system';
    `);

    // Top loaders
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'top loader in a padded mailer, First Class',
        '<a href="/r/top-loaders" class="affiliate-link" rel="nofollow sponsored" target="_blank">top loaders <span class="affiliate-cta">Check Price &rarr;</span></a> in a padded mailer, First Class'
      ) WHERE slug = 'sports-card-flipping-workflow-buy-low-sell-high-system';
    `);

    // UV lamp — in Part 1 of Routine 5 (groove-based final activation)
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'clean sound (cymbals ring, kick hits land with authority, snare is centered)',
        '<a href="/r/uv-lamp" class="affiliate-link" rel="nofollow sponsored" target="_blank">UV lamp <span class="affiliate-cta">Check Price &rarr;</span></a> for card condition checks, clean sound (cymbals ring, kick hits land with authority, snare is centered)'
      ) WHERE slug = '5-drummer-warm-up-routines-session-musicians';
    `);

    // ── INSERT morning-vault blog-to-blog redirect into affiliate_links ─────────────────────
    // This is a placeholder row so the routing layer recognizes the slug.
    // Uses 'internal' link_type (allowed by the CHECK constraint).
    // The actual 301 redirect is handled in routes/blog.js SLUG_REDIRECTS.
    await client.query(`
      INSERT INTO affiliate_links (slug, label, program, target_url, commission_rate, link_type, is_active)
      VALUES (
        'morning-vault',
        'Morning Vault redirect',
        'internal',
        '/blog/building-consistency-without-motivation',
        '0%',
        'internal',
        false
      )
      ON CONFLICT (slug) DO NOTHING;
    `);

  },

  down: async (client) => {
    // Remove new affiliate link rows
    await client.query(`
      DELETE FROM affiliate_links WHERE slug IN (
        'drum-throne', 'metronome', 'practice-pad', 'acoustic-foam', 'card-loupe',
        'card-photography', 'morning-vault'
      );
    `);

    // Blog post body rollback is intentionally omitted — re-run the seeding migrations to restore.
    // The body changes are additive link injections; reversing them via string-replace in SQL
    // is fragile and unnecessary — a fresh re-seed handles it cleanly.
  },
};
