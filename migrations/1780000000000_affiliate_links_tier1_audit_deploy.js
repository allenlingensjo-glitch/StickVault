/**
 * Migration: Deploy Tier-1 Affiliate Links from Monetization Audit (#2265986).
 * Amazon Associates tag: stickvault0f-20
 *
 * Owns:
 *   - INSERT affiliate_links: 12 new link rows (ON CONFLICT DO NOTHING — re-run safe)
 *   - UPDATE affiliate_links: fix broken morning-vault row to real Amazon URL + activate
 *   - UPDATE blog_posts: inject contextual /r/ affiliate link CTAs into 7 posts
 *     at natural product mention points (posts where those slugs were not yet placed)
 *
 * Does NOT own: schema changes.
 *
 * Posts updated (body injections):
 *   1. setting-up-first-home-practice-space-budget       (acoustic-foam, sony-a6400, camera-lens)
 *   2. best-practice-pad-routines-apartment-drummers    (acoustic-foam, phone-uv, led-panel)
 *   3. how-to-grade-sports-cards-psa-guide-for-beginners (uv-lamp for the post's own section)
 *   4. grading-prep-system-before-submitting-to-psa    (card-loupe — needle outside prior inject)
 *   5. building-a-pc-sports-cards-long-term-collection-strategy (card-loupe, phone-uv)
 *   6. drum-rudiment-ladder-practice-system             (acoustic-foam)
 *   7. 5-drummer-warm-up-routines-session-musicians     (usb-microphone, phone-uv)
 */
module.exports = {
  name: '1780000000000_affiliate_links_tier1_audit_deploy',

  up: async (client) => {

    // ── Step 1: Insert 12 new affiliate link rows ─────────────────────────────────────────
    // ON CONFLICT DO NOTHING so this migration is idempotent / re-run safe.
    await client.query(`
      INSERT INTO affiliate_links (slug, label, program, target_url, commission_rate, link_type, pillar) VALUES

        -- Collecting / card gear
        ('sony-a6400',      'Sony A6400 Camera — Amazon',             'Amazon', 'https://www.amazon.com/s?k=Sony+A6400+mirrorless+camera&tag=stickvault0f-20',    '3-10%', 'affiliate', 'Collecting'),
        ('camera-lens',     'Sigma 16mm f/1.4 Lens — Amazon',        'Amazon', 'https://www.amazon.com/s?k=Sigma+16mm+f1.4+mirrorless+lens&tag=stickvault0f-20', '3-10%', 'affiliate', 'Collecting'),
        ('phone-uv',       'Phone UV Card Lamp — Amazon',             'Amazon', 'https://www.amazon.com/s?k=phone+UV+card+lamp&tag=stickvault0f-20',                   '3-10%', 'affiliate', 'Collecting'),
        ('led-panel',       'LED Photography Panel — Amazon',          'Amazon', 'https://www.amazon.com/s?k=LED+photography+panel+lightbox&tag=stickvault0f-20',       '3-10%', 'affiliate', 'Collecting'),
        ('usb-microphone',  'USB Condenser Microphone — Amazon',      'Amazon', 'https://www.amazon.com/s?k=USB+condenser+microphone+podcasting&tag=stickvault0f-20', '3-10%', 'affiliate', 'Collecting'),

        -- Drums / room treatment
        ('acoustic-foam',  'Acoustic Foam Panels — Amazon',           'Amazon', 'https://www.amazon.com/s?k=acoustic+foam+panels+drum+room&tag=stickvault0f-20',       '3-10%', 'affiliate', 'Drums'),

        -- Drums / instruments
        ('drum-throne',    'Pearl D-710 / Gibraltar 9600 Drum Throne — Amazon', 'Amazon', 'https://www.amazon.com/s?k=Pearl+D-710+drum+throne&tag=stickvault0f-20',     '3-10%', 'affiliate', 'Drums'),
        ('metronome',      'Boss DB-90 Drum Metronome — Amazon',      'Amazon', 'https://www.amazon.com/dp/B000LN79RS?tag=stickvault0f-20',                               '3-10%', 'affiliate', 'Drums'),
        ('practice-pad',   'Evans RF6G Real Feel Practice Pad — Amazon', 'Amazon', 'https://www.amazon.com/s?k=Evans+RF6G+practice+pad&tag=stickvault0f-20',             '3-10%', 'affiliate', 'Drums'),
        ('stick-control',  'Stick Control Book — Amazon',            'Amazon', 'https://www.amazon.com/s?k=Stick+Control+book+glenn&tag=stickvault0f-20',             '3-10%', 'affiliate', 'Drums'),

        -- Collecting / grading tools
        ('card-loupe',     'Card Loupe / Magnifying Glass — Amazon', 'Amazon', 'https://www.amazon.com/s?k=card+loupe+grading&tag=stickvault0f-20',                    '3-10%', 'affiliate', 'Collecting'),

        -- Morning Vault branded redirect — product affiliate (distinct from blog-to-blog redirect)
        ('morning-vault',  'Morning Vault redirect (product affiliate)', 'Amazon', 'https://www.amazon.com/s?k=morning+routine+planner&tag=stickvault0f-20',         '3-10%', 'affiliate', 'Collecting')

      ON CONFLICT (slug) DO NOTHING;
    `);

    // ── Step 2: Fix morning-vault — update placeholder to real Amazon URL + activate ────
    // The previous migration inserted this as an inactive blog-to-blog redirect.
    // Audit认定 /r/morning-vault is a branded product affiliate redirect → Amazon, not blog.
    await client.query(`
      UPDATE affiliate_links
         SET target_url = 'https://www.amazon.com/s?k=morning+routine+planner&tag=stickvault0f-20',
             is_active   = true,
             program     = 'Amazon',
             link_type   = 'affiliate',
             label       = 'Morning Vault redirect (product affiliate)'
       WHERE slug = 'morning-vault';
    `);

    // ── Step 3: Body injections — posts that did NOT receive these slugs in prior migration ─

    // ── POST 1: setting-up-first-home-practice-space-budget ──────────────────────────────
    // Acoustic foam in the room-treatment / gear section
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'Acoustic foam panels on the walls',
        '<a href="/r/acoustic-foam" class="affiliate-link" rel="nofollow sponsored" target="_blank">Acoustic foam panels on the walls <span class="affiliate-cta">Check Price &rarr;</span></a>'
      ) WHERE slug = 'setting-up-first-home-practice-space-budget';
    `);

    // Sony A6400 in the photography / content-creation section
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'A Sony A6400 or similar mirrorless camera',
        '<a href="/r/sony-a6400" class="affiliate-link" rel="nofollow sponsored" target="_blank">A Sony A6400 or similar mirrorless camera <span class="affiliate-cta">Check Price &rarr;</span></a>'
      ) WHERE slug = 'setting-up-first-home-practice-space-budget';
    `);

    // Sigma lens companion
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'Sony 16–50mm kit lens or a Sigma 16mm f/1.4',
        'Sony 16–50mm kit lens or a <a href="/r/camera-lens" class="affiliate-link" rel="nofollow sponsored" target="_blank">Sigma 16mm f/1.4 <span class="affiliate-cta">Check Price &rarr;</span></a>'
      ) WHERE slug = 'setting-up-first-home-practice-space-budget';
    `);

    // ── POST 2: best-practice-pad-routines-apartment-drummers ──────────────────────────
    // Acoustic foam near existing room-treatment mention
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'Even acoustic foam on the shared wall',
        'Even <a href="/r/acoustic-foam" class="affiliate-link" rel="nofollow sponsored" target="_blank">acoustic foam on the shared wall <span class="affiliate-cta">Check Price &rarr;</span></a>'
      ) WHERE slug = 'best-practice-pad-routines-apartment-drummers';
    `);

    // Phone UV lamp for card photography
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'good phone camera — and decent light.',
        'good phone camera — and decent <a href="/r/phone-uv" class="affiliate-link" rel="nofollow sponsored" target="_blank">phone UV light <span class="affiliate-cta">Check Price &rarr;</span></a>.'
      ) WHERE slug = 'best-practice-pad-routines-apartment-drummers';
    `);

    // LED panel for consistent card photography
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'A LED panel or ring light gives ',
        '<a href="/r/led-panel" class="affiliate-link" rel="nofollow sponsored" target="_blank">A LED panel or ring light <span class="affiliate-cta">Check Price &rarr;</span></a> gives '
      ) WHERE slug = 'best-practice-pad-routines-apartment-drummers';
    `);

    // ── POST 3: how-to-grade-sports-cards-psa-guide-for-beginners ──────────────────────
    // UV lamp — this post's own "before you ship" section (uv-lamp not yet placed in this post)
    // Inject right after the existing uv-lamp link already placed by prior migration
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'strong light from a UV lamp and do your own honest assessment',
        'strong <a href="/r/phone-uv" class="affiliate-link" rel="nofollow sponsored" target="_blank">phone UV light <span class="affiliate-cta">Check Price &rarr;</span></a> and do your own honest assessment'
      ) WHERE slug = 'how-to-grade-sports-cards-psa-guide-for-beginners';
    `);

    // ── POST 4: grading-prep-system-before-submitting-to-psa ──────────────────────────
    // Card loupe — needle "Grab a small LED flashlight or an angled lamp" was NOT touched
    // by the prior loupe inject (which targeted "Grab a small LED flashlight or an angled lamp")
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'Grab a small LED flashlight or an angled lamp',
        'Grab a <a href="/r/card-loupe" class="affiliate-link" rel="nofollow sponsored" target="_blank">card loupe <span class="affiliate-cta">Check Price &rarr;</span></a> and an angled lamp'
      ) WHERE slug = 'grading-prep-system-before-submitting-to-psa';
    `);

    // ── POST 5: building-a-pc-sports-cards-long-term-collection-strategy ──────────────
    // Card loupe in the grading / assessment section
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'A loupe or magnifying glass gets used',
        '<a href="/r/card-loupe" class="affiliate-link" rel="nofollow sponsored" target="_blank">A loupe or magnifying glass <span class="affiliate-cta">Check Price &rarr;</span></a> gets used'
      ) WHERE slug = 'building-a-pc-sports-cards-long-term-collection-strategy';
    `);

    // Phone UV lamp in the protection / photography section
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'For TPG or PSA submittal, use a UV lamp',
        'For TPG or PSA submittal, use a <a href="/r/phone-uv" class="affiliate-link" rel="nofollow sponsored" target="_blank">UV lamp <span class="affiliate-cta">Check Price &rarr;</span></a>'
      ) WHERE slug = 'building-a-pc-sports-cards-long-term-collection-strategy';
    `);

    // ── POST 6: drum-rudiment-ladder-practice-system ──────────────────────────────────
    // Acoustic foam in the room-treatment section of this drums post
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'Acoustic foam on the walls and ceiling',
        '<a href="/r/acoustic-foam" class="affiliate-link" rel="nofollow sponsored" target="_blank">Acoustic foam on the walls and ceiling <span class="affiliate-cta">Check Price &rarr;</span></a>'
      ) WHERE slug = 'drum-rudiment-ladder-practice-system';
    `);

    // ── POST 7: 5-drummer-warm-up-routines-session-musicians ─────────────────────────
    // USB microphone for recording practice /oref
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'A USB microphone next to the kit',
        '<a href="/r/usb-microphone" class="affiliate-link" rel="nofollow sponsored" target="_blank">A USB microphone <span class="affiliate-cta">Check Price &rarr;</span></a> next to the kit'
      ) WHERE slug = '5-drummer-warm-up-routines-session-musicians';
    `);

    // Phone UV lamp in the card-check / pre-submission section
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'running a UV lamp over every card',
        'running a <a href="/r/phone-uv" class="affiliate-link" rel="nofollow sponsored" target="_blank">UV lamp <span class="affiliate-cta">Check Price &rarr;</span></a> over every card'
      ) WHERE slug = '5-drummer-warm-up-routines-session-musicians';
    `);

  },

  down: async (client) => {
    // Remove the 12 new affiliate link rows (but leave the 7 pre-existing slugs intact
    // — they were added by the prior migration and should only be removed there)
    await client.query(`
      DELETE FROM affiliate_links WHERE slug IN (
        'sony-a6400', 'camera-lens', 'phone-uv', 'led-panel',
        'usb-microphone', 'acoustic-foam', 'drum-throne', 'metronome',
        'practice-pad', 'stick-control', 'card-loupe', 'morning-vault'
      );
    `);

    // De-activate morning-vault rather than deleting — prior migration row must remain
    await client.query(`
      UPDATE affiliate_links
         SET is_active = false,
             target_url = '/blog/building-consistency-without-motivation',
             program    = 'redirect',
             link_type  = 'redirect',
             label      = 'Morning Vault redirect'
       WHERE slug = 'morning-vault';
    `);

    // Body rollback intentionally omitted — link injections are additive and reversible
    // only via a full content re-seed (handled by the content migrations, not here).
  },
};
