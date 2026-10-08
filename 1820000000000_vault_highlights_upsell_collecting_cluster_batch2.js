module.exports = {
  name: 'vault_highlights_upsell_collecting_cluster_batch2',
  up: async (client) => {

    // ── Splice 1: grading fee turnaround reference ───────────────────────────
    // Inserts the .vault-highlights premium upgrade block into the
    // grading-fee-turnaround-reference body, anchored immediately above
    // the existing <div class="vault-next-read"> opening tag (which is a
    // unique substring — only this post matches it in the blog_posts
    // corpus). Items pull exclusively from affiliate_links already
    // referenced in the post body (PSA, BGS, SGC, CGC — every grader row
    // in the per-tier fee table) — no new slugs are minted.
    // Affine path: get the Starter Kit → /shop/collectors-vault-starter-kit;
    // secondary → /shop (mirrors routes/shop.js product grid).
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<div class="vault-next-read">',
        '<div class="vault-highlights" data-source="grading-fee-turnaround-reference">
  <div class="vault-highlights-header">
    <svg class="vault-highlights-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="6" width="18" height="14" rx="1.5"></rect>
      <path d="M3 10h18"></path>
      <circle cx="12" cy="15" r="2.25"></circle>
      <path d="M12 17.25V19.5"></path>
    </svg>
    <div>
      <div class="vault-highlights-title">Vault Highlights</div>
      <div class="vault-highlights-subtitle">Premium Grading Submission Stack</div>
    </div>
  </div>
  <div class="vault-highlights-body">
    <p class="vault-highlights-desc">The four grader &times; tier submission protocols, the per-grader account setup sequence (paid membership upgrade path), the value-tier declaration rules that route cards to the right submission tier, and the per-batch insurance log that locks the chosen grader to declared value.</p>
    <div class="vault-highlights-items">
      <a href="/r/psa" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Grader</div>
        <div class="vault-highlights-item-name">PSA &mdash; Default Submission Path</div>
        <div class="vault-highlights-item-meta">The volume-tier leader; default destination for Value/Bulk and Regular batches where buyer-pool depth beats sub-grade transparency.</div>
      </a>
      <a href="/r/bgs" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Alt Tier 1</div>
        <div class="vault-highlights-item-name">BGS Beckett &mdash; Sub-Grade Premium</div>
        <div class="vault-highlights-item-meta">The sub-grade transparency tier &mdash; the only grader that publishes centering, corners, edges, surface individually; Black Label candidates favor BGS.</div>
      </a>
      <a href="/r/sgc" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Alt Tier 2</div>
        <div class="vault-highlights-item-name">SGC &mdash; Vintage &amp; Fast Economy</div>
        <div class="vault-highlights-item-meta">The vintage registry default; faster economy-tier windows than PSA on the same declared-value cap; SGC crossover premium on strong-centering vintage.</div>
      </a>
      <a href="/r/cgc" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Vintage / TCG</div>
        <div class="vault-highlights-item-name">CGC &mdash; TCG Specialist</div>
        <div class="vault-highlights-item-meta">The TCG and non-sport tier &mdash; Pok&eacute;mon, MTG, Lorcana; comic-collector brand translated to card grading; Pristine 10 premium on niche prints.</div>
      </a>
    </div>
    <div class="vault-highlights-cta">
      <a href="/shop/collectors-vault-starter-kit" class="btn btn-primary">Get the Starter Kit &rarr;</a>
      <a href="/shop" class="btn btn-ghost">Browse the Vault &rarr;</a>
    </div>
  </div>
</div>

<div class="vault-next-read">'
      )
      WHERE slug = 'grading-fee-turnaround-reference'
      AND body NOT LIKE '%data-source="grading-fee-turnaround-reference"%'
    `);

    // ── Splice 2: raw card vs graded slab ─────────────────────────────────────
    // Same shape, anchored immediately above the existing
    // <div class="vault-next-read"> opening tag in
    // raw-card-vs-graded-slab (also unique in the corpus).
    // Items pull exclusively from affiliate_links already referenced
    // in the post body (penny-sleeves on lines 28/77, top-loaders on
    // line 77, uv-frames on line 99, display-cases on line 99).
    // Sentinel uses data-source="raw-card-vs-graded-slab" so re-runs
    // of this migration are no-ops.
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<div class="vault-next-read">',
        '<div class="vault-highlights" data-source="raw-card-vs-graded-slab">
  <div class="vault-highlights-header">
    <svg class="vault-highlights-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="6" width="18" height="14" rx="1.5"></rect>
      <path d="M3 10h18"></path>
      <circle cx="12" cy="15" r="2.25"></circle>
      <path d="M12 17.25V19.5"></path>
    </svg>
    <div>
      <div class="vault-highlights-title">Vault Highlights</div>
      <div class="vault-highlights-subtitle">Raw &rarr; Slab Decision Stack</div>
    </div>
  </div>
  <div class="vault-highlights-body">
    <p class="vault-highlights-desc">The raw-card pre-screen checklist (centering, corners, surface, print defects), the holder-upgrade path from penny sleeve to one-touch, the per-card-type grading decision guide, and the cost-benefit math template that closes the loop once the grade window opens.</p>
    <div class="vault-highlights-items">
      <a href="/r/penny-sleeves" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Sleeves</div>
        <div class="vault-highlights-item-name">BCW Penny Sleeves</div>
        <div class="vault-highlights-item-meta">Layer 1 base protection &mdash; soft polypropylene sleeve for every raw card in the pre-decision queue.</div>
      </a>
      <a href="/r/top-loaders" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Top Loaders</div>
        <div class="vault-highlights-item-name">Ultra Pro Rigid 35pt Loaders</div>
        <div class="vault-highlights-item-meta">Layer 2 structural shell &mdash; sized to point thickness; the working storage layer while the grading decision is open.</div>
      </a>
      <a href="/r/uv-frames" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">UV Wall Frame</div>
        <div class="vault-highlights-item-name">UV-Filtering Wall-Mounted Card Frame</div>
        <div class="vault-highlights-item-meta">The post-slab destination for a card that grades 10 &mdash; UV-filtering acrylic over a recessed, sealed backing.</div>
      </a>
      <a href="/r/display-cases" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Tabletop Display</div>
        <div class="vault-highlights-item-name">UV-Blocking Acrylic Display Case</div>
        <div class="vault-highlights-item-meta">The non-wall destination for a centerpiece slab &mdash; removable top, shelf or desk presentation, UV-protected front.</div>
      </a>
    </div>
    <div class="vault-highlights-cta">
      <a href="/shop/collectors-vault-starter-kit" class="btn btn-primary">Get the Starter Kit &rarr;</a>
      <a href="/shop" class="btn btn-ghost">Browse the Vault &rarr;</a>
    </div>
  </div>
</div>

<div class="vault-next-read">'
      )
      WHERE slug = 'raw-card-vs-graded-slab'
      AND body NOT LIKE '%data-source="raw-card-vs-graded-slab"%'
    `);

    // ── Splice 3: sports card wall-mount display & frame review ───────────────
    // Same shape, anchored immediately above the existing
    // <div class="vault-next-read"> opening tag in
    // sports-card-wall-mount-display-frame-review (also unique in the corpus).
    // Items pull exclusively from affiliate_links already referenced in the
    // post body (uv-frames on line 52, magnetic-frames on line 54,
    // display-cases on line 56) — three items since the post only references
    // three distinct slots in its format mechanics section. Sentinel uses
    // data-source="sports-card-wall-mount-display-frame-review" (hyphens
    // match the slug) so re-runs are no-ops.
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<div class="vault-next-read">',
        '<div class="vault-highlights" data-source="sports-card-wall-mount-display-frame-review">
  <div class="vault-highlights-header">
    <svg class="vault-highlights-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="6" width="18" height="14" rx="1.5"></rect>
      <path d="M3 10h18"></path>
      <circle cx="12" cy="15" r="2.25"></circle>
      <path d="M12 17.25V19.5"></path>
    </svg>
    <div>
      <div class="vault-highlights-title">Vault Highlights</div>
      <div class="vault-highlights-subtitle">Premium Wall Mount Stack</div>
    </div>
  </div>
  <div class="vault-highlights-body">
    <p class="vault-highlights-desc">The four wall-mount format mechanics, the brand tier list by display-piece value (Frame My TV, Ultrawolves, BCW, Vault X), the wall placement audit (light direction, mounting height, distance from windows), and the format-by-card-type matrix that prevents the wrong frame on the wrong centerpiece.</p>
    <div class="vault-highlights-items">
      <a href="/r/uv-frames" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">UV Frame</div>
        <div class="vault-highlights-item-name">Frame My TV / BCW &mdash; Single-Card UV</div>
        <div class="vault-highlights-item-meta">The default centerpiece format &mdash; UV-filtering acrylic front, acid-free mat, sealed backing; card sealed into frame for permanence.</div>
      </a>
      <a href="/r/magnetic-frames" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Magnetic Frame</div>
        <div class="vault-highlights-item-name">Ultrawolves / Vault X &mdash; Swappable Mount</div>
        <div class="vault-highlights-item-meta">The rotating-PC format &mdash; hinged magnetic-front panel swaps the centerpiece without unmounting the frame from the wall.</div>
      </a>
      <a href="/r/display-cases" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Shadow Box</div>
        <div class="vault-highlights-item-name">Acrylic Shadow Box &mdash; Multi-Card Depth</div>
        <div class="vault-highlights-item-meta">The composition format &mdash; deep-set box for a rainbow row, set page, or jersey-card pairing; museum spacers prevent glass contact.</div>
      </a>
    </div>
    <div class="vault-highlights-cta">
      <a href="/shop/collectors-vault-starter-kit" class="btn btn-primary">Get the Starter Kit &rarr;</a>
      <a href="/shop" class="btn btn-ghost">Browse the Vault &rarr;</a>
    </div>
  </div>
</div>

<div class="vault-next-read">'
      )
      WHERE slug = 'sports-card-wall-mount-display-frame-review'
      AND body NOT LIKE '%data-source="sports-card-wall-mount-display-frame-review"%'
    `);

  },
};
