/**
 * Migration: Activate Amazon Associates monetization across 7 high-intent blog posts.
 * Amazon Associates tag: stickvault0f-20
 *
 * Owns:
 *   - UPDATE affiliate_links: upgrades placeholder search URLs to real ASIN-based affiliate URLs
 *   - INSERT affiliate_links: new links (photo gear, drum gear, vinyl gear, Evans/Vater/Moongel)
 *   - UPDATE blog_posts: injects inline affiliate link CTAs into post bodies at natural product mentions
 *
 * Does NOT own: schema changes, subscriber data, analytics schema, Pinterest data.
 *
 * Posts updated:
 *   1. affordable-collector-tools-under-50
 *   2. grading-service-comparison-psa-bgs-sgc-cgc
 *   3. ebay-listing-optimization-sports-cards-sell-faster
 *   4. drum-practice-routine-that-actually-sticks
 *   5. hidden-gem-drum-gear-under-50
 *   6. stick-control-drummers-secret-weapon
 *   7. how-to-start-a-vinyl-collection-without-losing-your-mind
 */
module.exports = {
  name: '1747700000000_affiliate_links_inline_blog',

  up: async (client) => {

    // ── Step 1: Upgrade existing placeholder search URLs to real ASIN-based affiliate URLs ──
    await client.query(`
      UPDATE affiliate_links SET target_url = 'https://www.amazon.com/dp/B087Z2L182?tag=stickvault0f-20'
        WHERE slug = 'penny-sleeves';
      UPDATE affiliate_links SET target_url = 'https://www.amazon.com/dp/B00095M5C2?tag=stickvault0f-20'
        WHERE slug = 'top-loaders';
      UPDATE affiliate_links SET target_url = 'https://www.amazon.com/dp/B07PKP4J75?tag=stickvault0f-20'
        WHERE slug = 'uv-lamp';
      UPDATE affiliate_links SET target_url = 'https://www.amazon.com/dp/B07JGW8BRD?tag=stickvault0f-20'
        WHERE slug = 'one-touch';
      UPDATE affiliate_links SET target_url = 'https://www.amazon.com/dp/B000K3XQ8U?tag=stickvault0f-20'
        WHERE slug = 'card-boxes';
      UPDATE affiliate_links SET target_url = 'https://www.amazon.com/dp/B0002F741Q?tag=stickvault0f-20'
        WHERE slug = 'drum-sticks';
      UPDATE affiliate_links SET target_url = 'https://www.amazon.com/dp/B000FMDIXY?tag=stickvault0f-20'
        WHERE slug = 'drum-practice-pad';
      UPDATE affiliate_links SET target_url = 'https://www.amazon.com/dp/1892764040?tag=stickvault0f-20'
        WHERE slug = 'stick-control';
    `);

    // Upgrade grading services to their submission/order form pages
    await client.query(`
      UPDATE affiliate_links SET target_url = 'https://www.psacard.com/submit'
        WHERE slug = 'psa';
      UPDATE affiliate_links SET target_url = 'https://www.gosgc.com/card-grading/submissions'
        WHERE slug = 'sgc';
      UPDATE affiliate_links SET target_url = 'https://www.cgccards.com/orderform/'
        WHERE slug = 'cgc';
    `);

    // ── Step 2: Insert new affiliate links ────────────────────────────────────────────────
    await client.query(`
      INSERT INTO affiliate_links (slug, label, program, target_url, commission_rate, link_type, pillar) VALUES

        -- eBay listing photography gear
        ('ring-light',        'Neewer Ring Light — Amazon',                 'Amazon',   'https://www.amazon.com/dp/B08B642TF8?tag=stickvault0f-20',   '3-10%', 'affiliate', 'Collecting'),
        ('photo-backdrop',    'Savage Seamless White Backdrop — Amazon',    'Amazon',   'https://www.amazon.com/dp/B0002ER2YQ?tag=stickvault0f-20',   '3-10%', 'affiliate', 'Collecting'),
        ('photo-lightbox',    'EMART Photography Lightbox — Amazon',        'Amazon',   'https://www.amazon.com/dp/B07922MDPG?tag=stickvault0f-20',   '3-10%', 'affiliate', 'Collecting'),

        -- Drum gear (hidden gems post)
        ('evans-eq-pad',      'Evans EQ Pad — Amazon',                      'Amazon',   'https://www.amazon.com/s?k=Evans+EQ+pad+bass+drum&tag=stickvault0f-20',  '3-10%', 'affiliate', 'Drums'),
        ('evans-practice-pad','Evans RealFeel Practice Pad — Amazon',       'Amazon',   'https://www.amazon.com/dp/B000FMDIXY?tag=stickvault0f-20',   '3-10%', 'affiliate', 'Drums'),
        ('moongel',           'Moongel Drum Damper Pads — Amazon',          'Amazon',   'https://www.amazon.com/s?k=Moongel+drum+damper&tag=stickvault0f-20',     '3-10%', 'affiliate', 'Drums'),
        ('korg-metronome',    'Korg TM60 Tuner/Metronome — Amazon',         'Amazon',   'https://www.amazon.com/dp/B078C5HCVP?tag=stickvault0f-20',   '3-10%', 'affiliate', 'Drums'),
        ('vater-sticks',      'Vater Vintage Bomber Sticks — Amazon',       'Amazon',   'https://www.amazon.com/s?k=Vater+Vintage+Bomber+drum+sticks&tag=stickvault0f-20', '3-10%', 'affiliate', 'Drums'),

        -- Vinyl collection gear
        ('at-turntable',      'Audio-Technica AT-LP120XUSB Turntable — Amazon', 'Amazon', 'https://www.amazon.com/dp/B07N3S4X3P?tag=stickvault0f-20', '3-10%', 'affiliate', 'Collecting'),
        ('record-cleaning',   'Boundless Audio Vinyl Record Cleaning Kit — Amazon', 'Amazon', 'https://www.amazon.com/dp/B0CCNMRVDB?tag=stickvault0f-20', '3-10%', 'affiliate', 'Collecting'),
        ('record-sleeves',    'BCW Poly-Lined Record Inner Sleeves — Amazon','Amazon',  'https://www.amazon.com/dp/B019R8HBMK?tag=stickvault0f-20',   '3-10%', 'affiliate', 'Collecting'),
        ('outer-sleeves',     'LP Outer Poly Sleeves — Amazon',             'Amazon',   'https://www.amazon.com/dp/B096FMRQR1?tag=stickvault0f-20',   '3-10%', 'affiliate', 'Collecting'),

        -- Metronome for drum practice post
        ('metronome',         'Korg TM60 Metronome — Amazon',               'Amazon',   'https://www.amazon.com/dp/B078C5HCVP?tag=stickvault0f-20',   '3-10%', 'affiliate', 'Drums')

      ON CONFLICT (slug) DO NOTHING;
    `);

    // ── Step 3: Update blog post bodies with inline affiliate links ───────────────────────

    // --- POST 1: affordable-collector-tools-under-50 ---
    // Inject links on product name mentions in the body
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<strong>BCW penny sleeves</strong> for standard cards, <strong>Ultra Pro</strong> for standard and thick card variants.',
        '<a href="/r/penny-sleeves" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>BCW penny sleeves</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> for standard cards, <a href="/r/top-loaders" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Ultra Pro</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> for standard and thick card variants.'
      ) WHERE slug = 'affordable-collector-tools-under-50';
    `);

    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<strong>Ultra Pro top loaders</strong>. Every card show dealer uses them.',
        '<a href="/r/top-loaders" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Ultra Pro top loaders</strong> <span class="affiliate-cta">Check Price &rarr;</span></a>. Every card show dealer uses them.'
      ) WHERE slug = 'affordable-collector-tools-under-50';
    `);

    // UV lamp — replace the h2 heading link to include a CTA after the section heading
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<h2>3. A UV lamp or flashlight ($15–$25)</h2>',
        '<h2>3. A UV lamp or flashlight ($15–$25) <a href="/r/uv-lamp" class="affiliate-link affiliate-link--inline" rel="nofollow sponsored" target="_blank"><span class="affiliate-cta">Check Price &rarr;</span></a></h2>'
      ) WHERE slug = 'affordable-collector-tools-under-50';
    `);

    // One-touch heading
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<h2>4. One-touch magnetic holders — for the pieces that matter ($20–$35 for 10)</h2>',
        '<h2>4. One-touch magnetic holders — for the pieces that matter ($20–$35 for 10) <a href="/r/one-touch" class="affiliate-link affiliate-link--inline" rel="nofollow sponsored" target="_blank"><span class="affiliate-cta">Check Price &rarr;</span></a></h2>'
      ) WHERE slug = 'affordable-collector-tools-under-50';
    `);

    // Card storage boxes — link inline mention
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<strong>Card storage boxes</strong> (the classic white corrugated card boxes)',
        '<a href="/r/card-boxes" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Card storage boxes</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> (the classic white corrugated card boxes)'
      ) WHERE slug = 'affordable-collector-tools-under-50';
    `);

    // --- POST 2: grading-service-comparison-psa-bgs-sgc-cgc ---
    // Add "Submit to PSA →" style links after each grading service heading
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<h2>PSA (Professional Sports Authenticator)</h2>',
        '<h2>PSA (Professional Sports Authenticator) <a href="/r/psa" class="affiliate-link affiliate-link--inline" rel="nofollow" target="_blank"><span class="affiliate-cta">Submit &rarr;</span></a></h2>'
      ) WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc';
    `);

    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<h2>BGS (Beckett Grading Services)</h2>',
        '<h2>BGS (Beckett Grading Services) <a href="/r/bgs" class="affiliate-link affiliate-link--inline" rel="nofollow" target="_blank"><span class="affiliate-cta">Submit &rarr;</span></a></h2>'
      ) WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc';
    `);

    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<h2>SGC (Sportscard Guaranty)</h2>',
        '<h2>SGC (Sportscard Guaranty) <a href="/r/sgc" class="affiliate-link affiliate-link--inline" rel="nofollow" target="_blank"><span class="affiliate-cta">Submit &rarr;</span></a></h2>'
      ) WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc';
    `);

    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<h2>CGC (Certified Guaranty Company)</h2>',
        '<h2>CGC (Certified Guaranty Company) <a href="/r/cgc" class="affiliate-link affiliate-link--inline" rel="nofollow" target="_blank"><span class="affiliate-cta">Submit &rarr;</span></a></h2>'
      ) WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc';
    `);

    // --- POST 3: ebay-listing-optimization-sports-cards-sell-faster ---
    // Inject a photography gear recommendation block after the photography h2 section intro
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<p>For graded cards in slabs, photograph through the slab under angled light so the grade label and card are both visible and sharp.</p>',
        '<p>For graded cards in slabs, photograph through the slab under angled light so the grade label and card are both visible and sharp.</p>

<div class="affiliate-gear-block">
  <div class="affiliate-gear-label">Recommended gear</div>
  <div class="affiliate-gear-items">
    <a href="/r/ring-light" class="affiliate-gear-item" rel="nofollow sponsored" target="_blank">
      <span class="affiliate-gear-name">Neewer Ring Light</span>
      <span class="affiliate-cta">Check Price &rarr;</span>
    </a>
    <a href="/r/photo-lightbox" class="affiliate-gear-item" rel="nofollow sponsored" target="_blank">
      <span class="affiliate-gear-name">Photography Lightbox</span>
      <span class="affiliate-cta">Check Price &rarr;</span>
    </a>
    <a href="/r/photo-backdrop" class="affiliate-gear-item" rel="nofollow sponsored" target="_blank">
      <span class="affiliate-gear-name">White Backdrop Paper</span>
      <span class="affiliate-cta">Check Price &rarr;</span>
    </a>
  </div>
</div>'
      ) WHERE slug = 'ebay-listing-optimization-sports-cards-sell-faster';
    `);

    // --- POST 4: drum-practice-routine-that-actually-sticks ---
    // Link metronome mention in "Protecting the habit" section
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'sticks on the snare, metronome already set, practice notes already written.',
        'sticks on the snare, <a href="/r/metronome" class="affiliate-link" rel="nofollow sponsored" target="_blank">metronome <span class="affiliate-cta">Check Price &rarr;</span></a> already set, practice notes already written.'
      ) WHERE slug = 'drum-practice-routine-that-actually-sticks';
    `);

    // --- POST 5: hidden-gem-drum-gear-under-50 ---
    // Evans EQ Pad — link in the heading
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<h2>1. Evans EQ Pad — $12</h2>',
        '<h2>1. Evans EQ Pad — $12 <a href="/r/evans-eq-pad" class="affiliate-link affiliate-link--inline" rel="nofollow sponsored" target="_blank"><span class="affiliate-cta">Check Price &rarr;</span></a></h2>'
      ) WHERE slug = 'hidden-gem-drum-gear-under-50';
    `);

    // Evans RealFeel practice pad — link the specific product name
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'The Evans RF6G Real Feel practice pad',
        '<a href="/r/evans-practice-pad" class="affiliate-link" rel="nofollow sponsored" target="_blank">The Evans RF6G Real Feel practice pad <span class="affiliate-cta">Check Price &rarr;</span></a>'
      ) WHERE slug = 'hidden-gem-drum-gear-under-50';
    `);

    // Moongel heading
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<h2>3. Moongel — $8</h2>',
        '<h2>3. Moongel — $8 <a href="/r/moongel" class="affiliate-link affiliate-link--inline" rel="nofollow sponsored" target="_blank"><span class="affiliate-cta">Check Price &rarr;</span></a></h2>'
      ) WHERE slug = 'hidden-gem-drum-gear-under-50';
    `);

    // Korg TM60 metronome — link the specific model name
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'the Korg TM60 is a reliable one',
        '<a href="/r/korg-metronome" class="affiliate-link" rel="nofollow sponsored" target="_blank">the Korg TM60 is a reliable one <span class="affiliate-cta">Check Price &rarr;</span></a>'
      ) WHERE slug = 'hidden-gem-drum-gear-under-50';
    `);

    // Vater Vintage Bomber sticks heading
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<h2>5. Vater Vintage Bomber sticks — $14</h2>',
        '<h2>5. Vater Vintage Bomber sticks — $14 <a href="/r/vater-sticks" class="affiliate-link affiliate-link--inline" rel="nofollow sponsored" target="_blank"><span class="affiliate-cta">Check Price &rarr;</span></a></h2>'
      ) WHERE slug = 'hidden-gem-drum-gear-under-50';
    `);

    // --- POST 6: stick-control-drummers-secret-weapon ---
    // Link the book title on first substantive mention
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'Stick Control for the Snare Drummer, written by George Lawrence Stone in 1935, is 76 pages of hand exercises.',
        '<a href="/r/stick-control" class="affiliate-link" rel="nofollow sponsored" target="_blank">Stick Control for the Snare Drummer <span class="affiliate-cta">Get the Book &rarr;</span></a>, written by George Lawrence Stone in 1935, is 76 pages of hand exercises.'
      ) WHERE slug = 'stick-control-drummers-secret-weapon';
    `);

    // --- POST 7: how-to-start-a-vinyl-collection-without-losing-your-mind ---
    // Link "turntable" in the gear first section
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'a respectable entry-level setup (turntable, preamp, powered speakers) runs $300–$500.',
        'a respectable entry-level setup (<a href="/r/at-turntable" class="affiliate-link" rel="nofollow sponsored" target="_blank">turntable <span class="affiliate-cta">Check Price &rarr;</span></a>, preamp, powered speakers) runs $300–$500.'
      ) WHERE slug = 'how-to-start-a-vinyl-collection-without-losing-your-mind';
    `);

    // Add a gear block after the "Condition is everything" section — before "Track what you own"
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<h2>Track what you own from day one</h2>',
        '<div class="affiliate-gear-block">
  <div class="affiliate-gear-label">Essential vinyl gear</div>
  <div class="affiliate-gear-items">
    <a href="/r/at-turntable" class="affiliate-gear-item" rel="nofollow sponsored" target="_blank">
      <span class="affiliate-gear-name">Audio-Technica AT-LP120XUSB</span>
      <span class="affiliate-cta">Check Price &rarr;</span>
    </a>
    <a href="/r/record-cleaning" class="affiliate-gear-item" rel="nofollow sponsored" target="_blank">
      <span class="affiliate-gear-name">Vinyl Record Cleaning Kit</span>
      <span class="affiliate-cta">Check Price &rarr;</span>
    </a>
    <a href="/r/record-sleeves" class="affiliate-gear-item" rel="nofollow sponsored" target="_blank">
      <span class="affiliate-gear-name">Inner Record Sleeves</span>
      <span class="affiliate-cta">Check Price &rarr;</span>
    </a>
    <a href="/r/outer-sleeves" class="affiliate-gear-item" rel="nofollow sponsored" target="_blank">
      <span class="affiliate-gear-name">Outer Poly Sleeves</span>
      <span class="affiliate-cta">Check Price &rarr;</span>
    </a>
  </div>
</div>

<h2>Track what you own from day one</h2>'
      ) WHERE slug = 'how-to-start-a-vinyl-collection-without-losing-your-mind';
    `);

  },

  down: async (client) => {
    // Revert affiliate link URLs to search-based placeholders
    await client.query(`
      UPDATE affiliate_links SET target_url = 'https://www.amazon.com/s?k=BCW+penny+sleeves+trading+cards'
        WHERE slug = 'penny-sleeves';
      UPDATE affiliate_links SET target_url = 'https://www.amazon.com/s?k=ultra+pro+top+loaders+cards'
        WHERE slug = 'top-loaders';
      UPDATE affiliate_links SET target_url = 'https://www.amazon.com/s?k=uv+lamp+card+inspection'
        WHERE slug = 'uv-lamp';
      UPDATE affiliate_links SET target_url = 'https://www.amazon.com/s?k=one+touch+magnetic+card+holder'
        WHERE slug = 'one-touch';
      UPDATE affiliate_links SET target_url = 'https://www.amazon.com/s?k=BCW+card+storage+boxes'
        WHERE slug = 'card-boxes';
      UPDATE affiliate_links SET target_url = 'https://www.amazon.com/s?k=drumsticks'
        WHERE slug = 'drum-sticks';
      UPDATE affiliate_links SET target_url = 'https://www.amazon.com/s?k=drum+practice+pad'
        WHERE slug = 'drum-practice-pad';
      UPDATE affiliate_links SET target_url = 'https://www.amazon.com/s?k=stick+control+drums'
        WHERE slug = 'stick-control';
      UPDATE affiliate_links SET target_url = 'https://www.psacard.com/services/tradingcardgrading'
        WHERE slug = 'psa';
      UPDATE affiliate_links SET target_url = 'https://www.sgccard.com/'
        WHERE slug = 'sgc';
      UPDATE affiliate_links SET target_url = 'https://www.cgccards.com/'
        WHERE slug = 'cgc';
    `);

    // Remove new links
    await client.query(`
      DELETE FROM affiliate_links WHERE slug IN (
        'ring-light', 'photo-backdrop', 'photo-lightbox',
        'evans-eq-pad', 'evans-practice-pad', 'moongel', 'korg-metronome', 'vater-sticks',
        'at-turntable', 'record-cleaning', 'record-sleeves', 'outer-sleeves', 'metronome'
      );
    `);

    // Blog post body rollback is intentionally omitted — re-run the seeding migrations to restore.
    // The body changes are additive link injections; reversing them via string-replace in SQL is
    // fragile and unnecessary — a fresh re-seed handles it cleanly.
  },
};
