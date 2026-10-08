module.exports = {
  name: 'collecting_cluster_cross_links',
  up: async (client) => {

    // ── Splice 1: grading-service-comparison-psa-bgs-sgc-cgc → storage ───────
    // Anchor: post-affiliate-migration heading (inline CGC affiliate CTA appended)
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>CGC (Certified Guaranty Company) <a href="/r/cgc" class="affiliate-link affiliate-link--inline" rel="nofollow" target="_blank"><span class="affiliate-cta">Submit &rarr;</span></a></h2>',
        '<p>Once a card lives in a CGC slab, the protection conversation shifts from the holder to the storage environment — humidity, light, and display case all become the next layer of preservation. The <a href="/blog/sports-card-storage-and-display-protection-stack">sports card storage and display protection stack guide</a> walks through what surrounds the slab once authentication is done.</p>

<h2>CGC (Certified Guaranty Company) <a href="/r/cgc" class="affiliate-link affiliate-link--inline" rel="nofollow" target="_blank"><span class="affiliate-cta">Submit &rarr;</span></a></h2>'
      )
      WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc'
      AND body NOT LIKE '%sports-card-storage-and-display-protection-stack%'
    `);

    // ── Splice 2: cgc-grading-guide-pokemon-mtg-tcg → storage ─────────────────
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>Why the slab design matters for TCG collectors</h2>',
        '<p>CGC''s recessed-tray slab construction shows up again in how the slab sits inside a display case — UV-filtering acrylic, climate-controlled room, and card-to-card spacing all interact with the slab geometry. The <a href="/blog/sports-card-storage-and-display-protection-stack">sports card storage and display protection stack</a> covers what surrounds the slab once authentication is done.</p>

<h2>Why the slab design matters for TCG collectors</h2>'
      )
      WHERE slug = 'cgc-grading-guide-pokemon-mtg-tcg'
      AND body NOT LIKE '%sports-card-storage-and-display-protection-stack%'
    `);

    // ── Splice 3: cgc-grading-guide-pokemon-mtg-tcg → side-hustle ─────────────
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>Turnaround tiers and pricing</h2>',
        '<p>Long economy-tier turnaround is not just a fee trade-off — it ties up capital that could fund the next raw batch. The <a href="/blog/sports-card-grading-side-hustle-profit-calculator">sports card grading side hustle profit calculator</a> works through how CGC''s normally-faster economy tier (versus PSA''s longer queues) changes the ROI math for non-baseball submissions.</p>

<h2>Turnaround tiers and pricing</h2>'
      )
      WHERE slug = 'cgc-grading-guide-pokemon-mtg-tcg'
      AND body NOT LIKE '%sports-card-grading-side-hustle-profit-calculator%'
    `);

    // ── Splice 4: sports-card-storage-and-display-protection-stack → CGC ───────
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>Display without damage</h2>',
        '<p>Slab aesthetics stay consistent when the slab and the display case come from the same authentication family — a CGC slab behind UV-filtering acrylic reads visually cleaner than mixing PSA reds underneath museum glass. For the slab-design side of that pairing, see the <a href="/blog/cgc-grading-guide-pokemon-mtg-tcg">CGC grading guide for Pokémon and MTG collectors</a>.</p>

<h2>Display without damage</h2>'
      )
      WHERE slug = 'sports-card-storage-and-display-protection-stack'
      AND body NOT LIKE '%cgc-grading-guide-pokemon-mtg-tcg%'
    `);

    // ── Splice 5: sports-card-storage-and-display-protection-stack → side-hustle
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>Storage methods comparison</h2>',
        '<p>The penny sleeve + card saver line item in the table above is the working cost basis for any raw card entering the grading submission pipeline. The <a href="/blog/sports-card-grading-side-hustle-profit-calculator">sports card grading side hustle profit calculator</a> pulls that and the grading fee into the same raw-to-graded ROI math.</p>

<h2>Storage methods comparison</h2>'
      )
      WHERE slug = 'sports-card-storage-and-display-protection-stack'
      AND body NOT LIKE '%sports-card-grading-side-hustle-profit-calculator%'
    `);

    // ── Splice 6: sports-card-grading-side-hustle-profit-calculator → storage ─
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>Pre-shipment prep</h2>',
        '<p>The exact holder-sleeve-loader-sizing-saver layering — and the failure modes when sizing is off — gets its own deep dive in the <a href="/blog/sports-card-storage-and-display-protection-stack">sports card storage and display protection stack guide</a>. Worth pairing with this pre-shipment section before a high-value submission.</p>

<h2>Pre-shipment prep</h2>'
      )
      WHERE slug = 'sports-card-grading-side-hustle-profit-calculator'
      AND body NOT LIKE '%sports-card-storage-and-display-protection-stack%'
    `);

    // ── Splice 7: sports-card-grading-side-hustle-profit-calculator → CGC ─────
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>The profit calculator</h2>',
        '<p>One ROI variable worth modeling on its own tier row: CGC''s normally-faster economy turnaround versus PSA''s longer queues. For non-baseball, non-sports cards, that speed advantage changes when the calculator is worth running. The <a href="/blog/cgc-grading-guide-pokemon-mtg-tcg">CGC grading guide for Pokémon and MTG collectors</a> maps when CGC''s economy tier beats PSA''s on the TCG side.</p>

<h2>The profit calculator</h2>'
      )
      WHERE slug = 'sports-card-grading-side-hustle-profit-calculator'
      AND body NOT LIKE '%cgc-grading-guide-pokemon-mtg-tcg%'
    `);

  },
};
