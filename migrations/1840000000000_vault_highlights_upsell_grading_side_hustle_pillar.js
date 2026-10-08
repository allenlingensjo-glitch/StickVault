module.exports = {
  name: 'vault_highlights_upsell_grading_side_hustle_pillar',
  up: async (client) => {

    // ── Splice: sports card grading side hustle profit calculator ──────────
    // Inserts the .vault-highlights premium upgrade block into the
    // sports-card-grading-side-hustle-profit-calculator body, anchored
    // immediately above the existing <div class="vault-next-read"> opening
    // tag (which is a unique substring — only this post matches it in the
    // blog_posts corpus; pillar post body at
    // 1800000000000_sports_card_grading_side_hustle_pillar.js:164 confirms
    // exactly one opening tag). Items pull exclusively from affiliate_links
    // already referenced in the post body (card-loupe on line 131,
    // penny-sleeves and top-loaders on line 137, one-touch on line 139) —
    // no new slugs are minted, and we deliberately skip the four-grader
    // PSA/BGS/SGC/CGC block already covered by the
    // grading-fee-turnaround-reference splice. Sentinel uses
    // data-source="sports-card-grading-side-hustle-profit-calculator" so
    // re-runs of this migration are deterministic no-ops (satisfied by the
    // body NOT LIKE predicate below). Affine path: get the Starter Kit →
    // /shop/collectors-vault-starter-kit; secondary → /shop (mirrors
    // routes/shop.js product grid).
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<div class="vault-next-read">',
        '<div class="vault-highlights" data-source="sports-card-grading-side-hustle-profit-calculator">
  <div class="vault-highlights-header">
    <svg class="vault-highlights-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="6" width="18" height="14" rx="1.5"></rect>
      <path d="M3 10h18"></path>
      <circle cx="12" cy="15" r="2.25"></circle>
      <path d="M12 17.25V19.5"></path>
    </svg>
    <div>
      <div class="vault-highlights-title">Vault Highlights</div>
      <div class="vault-highlights-subtitle">Premium Submission Stack</div>
    </div>
  </div>
  <div class="vault-highlights-body">
    <p class="vault-highlights-desc">The pre-screen loupe &rarr; penny-sleeve &rarr; top-loader &rarr; one-touch slab-storage holder path that protects every card from raw-pick to eBay listing &mdash; plus the per-tier submission packaging (card savers, sub-team bags) that ensures corners and surfaces arrive grade-ready at the grader window.</p>
    <div class="vault-highlights-items">
      <a href="/r/card-loupe" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Pre-Screen</div>
        <div class="vault-highlights-item-name">10x Magnifier Loupe &mdash; Bright-Light Pre-Screen</div>
        <div class="vault-highlights-item-meta">The first gate &mdash; corners, edges, centering, and surface defects caught before the card ever leaves the workbench and the fee is committed.</div>
      </a>
      <a href="/r/penny-sleeves" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Sleeves</div>
        <div class="vault-highlights-item-name">BCW Penny Sleeves &mdash; Layer 1 Holder</div>
        <div class="vault-highlights-item-meta">Soft polypropylene base layer that goes on every raw card the moment it lands &mdash; prevents surface scuffs during the grading-decision wait.</div>
      </a>
      <a href="/r/top-loaders" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Top Loaders</div>
        <div class="vault-highlights-item-name">Ultra Pro Rigid 35pt Loaders &mdash; Layer 2 Holder</div>
        <div class="vault-highlights-item-meta">Sized to point thickness for the working-storage layer while the grading decision is open &mdash; deformed loader walls nick corners in transit.</div>
      </a>
      <a href="/r/one-touch" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Slab Storage</div>
        <div class="vault-highlights-item-name">One-Touch Magnetic Holder &mdash; Returned Slab</div>
        <div class="vault-highlights-item-meta">Inventory and pre-listing photo layer once the slab comes back &mdash; magnetic closure, UV-clear front, sized to slab dimensions.</div>
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
      WHERE slug = 'sports-card-grading-side-hustle-profit-calculator'
      AND body NOT LIKE '%data-source="sports-card-grading-side-hustle-profit-calculator"%'
    `);

  },
};
