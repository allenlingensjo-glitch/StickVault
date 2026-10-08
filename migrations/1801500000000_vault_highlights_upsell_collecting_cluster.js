module.exports = {
  name: 'vault_highlights_upsell_collecting_cluster',
  up: async (client) => {

    // ── Splice 1: binder & portfolio review ──────────────────────────────────
    // Inserts the .vault-highlights premium upgrade block into the
    // sports-card-binder-portfolio-review body, anchored immediately above
    // the existing <div class="vault-next-read"> opening tag (which is a
    // unique substring — only this post matches it in the blog_posts
    // corpus). Items pull exclusively from affiliate_links already
    // referenced in the post body — no new slugs are minted.
    // Affine path: get the Starter Kit → /shop/collectors-vault-starter-kit;
    // secondary → /shop (mirrors routes/shop.js product grid).
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<div class="vault-next-read">',
        '<div class="vault-highlights" data-source="binder-portfolio-review">
  <div class="vault-highlights-header">
    <svg class="vault-highlights-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="6" width="18" height="14" rx="1.5"></rect>
      <path d="M3 10h18"></path>
      <circle cx="12" cy="15" r="2.25"></circle>
      <path d="M12 17.25V19.5"></path>
    </svg>
    <div>
      <div class="vault-highlights-title">Vault Highlights</div>
      <div class="vault-highlights-subtitle">Premium Binder &amp; Portfolio Stack</div>
    </div>
  </div>
  <div class="vault-highlights-body">
    <p class="vault-highlights-desc">The decision matrix that pairs collection size and value tier to format, page material, and brand &mdash; plus the per-page label system and binder-vs-box inventory log that prevent cards from landing in the wrong holder by accident.</p>
    <div class="vault-highlights-items">
      <a href="/r/card-binders" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Binder</div>
        <div class="vault-highlights-item-name">Vault X / BCW / Ultra Pro &mdash; 3-Ring + Zippered</div>
        <div class="vault-highlights-item-meta">Side-loading welded pages, reinforced spine, PVC-free polypropylene default.</div>
      </a>
      <a href="/r/binder-9-pocket-pages" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Pages</div>
        <div class="vault-highlights-item-name">Ultra Pro 9-Pocket Refills</div>
        <div class="vault-highlights-item-meta">Polypropylene, 3&times;3 grid, archival-safe default for binder-stored cards.</div>
      </a>
      <a href="/r/top-loaders" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Top Loaders</div>
        <div class="vault-highlights-item-name">Ultra Pro Rigid 35pt Loaders</div>
        <div class="vault-highlights-item-meta">The upgrade path when a binder page holds a top loader instead of a loose card.</div>
      </a>
      <a href="/r/team-bags" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Team Bags</div>
        <div class="vault-highlights-item-name">Resealable Protection Sleeves</div>
        <div class="vault-highlights-item-meta">Sealed-environment layer for the top-loader-within-the-binder-page storage tier.</div>
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
      WHERE slug = 'sports-card-binder-portfolio-review'
      AND body NOT LIKE '%data-source="binder-portfolio-review"%'
    `);

    // ── Splice 2: shipping & packaging guide ─────────────────────────────────
    // Same shape, anchored immediately above the existing
    // <div class="vault-next-read"> opening tag in
    // sports-card-shipping-packaging-guide (also unique in the corpus).
    // Items pull exclusively from affiliate_links already referenced
    // in the post body. Sentinel uses data-source="shipping-packaging-guide"
    // so re-runs of this migration are no-ops.
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<div class="vault-next-read">',
        '<div class="vault-highlights" data-source="shipping-packaging-guide">
  <div class="vault-highlights-header">
    <svg class="vault-highlights-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="6" width="18" height="14" rx="1.5"></rect>
      <path d="M3 10h18"></path>
      <circle cx="12" cy="15" r="2.25"></circle>
      <path d="M12 17.25V19.5"></path>
    </svg>
    <div>
      <div class="vault-highlights-title">Vault Highlights</div>
      <div class="vault-highlights-subtitle">Premium Shipping Stack</div>
    </div>
  </div>
  <div class="vault-highlights-body">
    <p class="vault-highlights-desc">The per-card packing diagram, the supply checklist (sleeves, loaders, team bags, mailers, cardboard by quantity), the USPS service-tier decision matrix, and the per-shipment insurance log that locks the carrier choice to declared value.</p>
    <div class="vault-highlights-items">
      <a href="/r/penny-sleeves" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Sleeves</div>
        <div class="vault-highlights-item-name">BCW Penny Sleeves</div>
        <div class="vault-highlights-item-meta">Layer 1 base protection &mdash; soft polypropylene sleeve for every shipped card.</div>
      </a>
      <a href="/r/top-loaders" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Top Loaders</div>
        <div class="vault-highlights-item-name">Ultra Pro 35pt Loaders</div>
        <div class="vault-highlights-item-meta">Layer 2 structural shell &mdash; rigid plastic to keep the card from bending in carrier handling.</div>
      </a>
      <a href="/r/team-bags" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Team Bags</div>
        <div class="vault-highlights-item-name">Resealable Protection Sleeves</div>
        <div class="vault-highlights-item-meta">Layer 3 sealed environment &mdash; blocks humidity, dust, and holder-edge abrasion.</div>
      </a>
      <a href="/r/bubble-mailers" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Mailers</div>
        <div class="vault-highlights-item-name">Padded Bubble Mailers</div>
        <div class="vault-highlights-item-meta">Layer 4 carrier-facing cushion &mdash; drops, conveyor vibration, loading pressure.</div>
      </a>
      <a href="/r/silica-gel" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Humidity Buffer</div>
        <div class="vault-highlights-item-name">Silica Gel Packet</div>
        <div class="vault-highlights-item-meta">Heat/cold mitigation for vintage or high-value long-haul grading submissions.</div>
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
      WHERE slug = 'sports-card-shipping-packaging-guide'
      AND body NOT LIKE '%data-source="shipping-packaging-guide"%'
    `);

  },
};
