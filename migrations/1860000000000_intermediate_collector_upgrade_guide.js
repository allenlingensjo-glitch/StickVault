module.exports = {
  name: 'intermediate_collector_upgrade_guide',
  up: async (client) => {

    // ── Block A — Insert the 11th collecting-cluster post. ───────────────────
    // Slug = 'intermediate-collector-upgrade-guide'; category = 'collecting'
    // (matches VALID_CATEGORIES at routes/blog.js:11). Title and excerpt stay
    // specific about "intermediate" so the post is thematically distinct from
    // the 10th post (first-time-card-collector-buyers-guide = front-door
    // primer: what to buy, where to source, day-one storage) and from the
    // mid-funnel sports-card-grading-side-hustle-profit-calculator (full ROI
    // math at submission time). Intermediate = specialize + upgrade storage
    // tiers + batch-cost-per-grade analysis. Body mirrors the conventions of
    // 1830000000000_first_time_card_collector_buyers_guide.js — single
    // $body_…$ delimited HTML blob, four <h2> sections backed by reverse-link
    // forward anchors to cluster deep dives (sports-card-binder-portfolio-
    // review, sports-card-storage-and-display-protection-stack,
    // climate-controlled-sports-card-cabinet-guide, grading-decision-cheat-
    // sheet, sports-card-grading-side-hustle-profit-calculator,
    // when-to-grade-sports-cards), a mid-body
    // <div class="vault-cta"> block linking to /shop/collectors-vault-
    // starter-kit, a <div class="vault-highlights"> block immediately above
    // the closing <div class="vault-next-read"> reusing existing affiliate
    // slugs (penny-sleeves, top-loaders, one-touch, card-boxes, uv-lamp) so
    // no new affiliate links are minted, and the standard
    // <div class="vault-next-read"> with three forward cards.
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description, pin_image, published)
      VALUES (
        'intermediate-collector-upgrade-guide',
        'Sports Card Collecting for Intermediate Collectors: When to Specialize, When to Upgrade Storage, and How to Read Cost-per-Grade Before Your Second Submission Batch',
        'collecting',
        'Intermediate collecting is built on three transitions: concentrate spend on a player or set thesis instead of breadth, rotate PC keepers out of top loaders into one-touch holders once the per-card value clears the upcharge, and read cost-per-grade by batch — tier mix, declared-value cap stacking, fee exposure ceiling — instead of card-by-card. Everything below is the decision rule for each transition.',
        $body_intermediate_collector$
<p>The <a href="/blog/first-time-card-collector-buyers-guide">first-time card collector&rsquo;s buyers guide</a> closes with the day-one protection stack &mdash; penny sleeve, top loader, box, climate-controlled room &mdash; and the threshold math for whether a card ever justifies a grading fee. The <a href="/blog/sports-card-grading-side-hustle-profit-calculator">sports card grading side hustle profit calculator</a> runs the full ROI at submission time: fee, grade probabilities, eBay take, net. This guide is the chapter between those two &mdash; the specialization, the storage-tier upgrade decision, and the batch cost-per-grade analysis that a collector running their second submission batch has to internalize before the next round ships.</p>

<p>Three transitions separate the intermediate collector from the first-time buyer. Spend stops being a roster of singletons across the latest release and starts concentrating on a player or set thesis that the holder stack and the grader math can support. Storage stops being a uniform penny sleeve + top loader + box and starts differentiating PC keepers from flip inventory from graded slab returns. Submission stops being a single card sent at Value tier and starts being a batch with a tier mix, a declared-value cap stack, a fee exposure ceiling, and a probability-weighted grade distribution. None of those transitions require new tools. They require sequencing, applied consistently.</p>

<h2>When to specialize — by player, set, era, or grade tier</h2>

<p>The first decision an intermediate collector makes is depth vs breadth. A $1,000 starter budget spread evenly across fifty $20 modern rookies is a breadth portfolio with no position large enough to learn anything. The same $1,000 placed on three rookies of a single prospect &mdash; or five parallels of a single set release &mdash; is a thesis with compounding knowledge: comp patterns, surface variations, print-run scarcity, grading outcomes across a cohort. The specialization question is not whether to specialize. It is which axis to specialize on.</p>

<p>Four specialization axes each solve a different problem:</p>

<ul>
<li><strong>Player thesis.</strong> Concentrate on a single active player across rookies, parallels, and inserts. The thesis scales with the player&rsquo;s career &mdash; a prospect whose rookie is a $30 card today is a $300 card if the career breaks out, and your portfolio follows the career. The risk: a prospect bust, in which case the entire thesis re-rates to a single-card liquidation event.</li>
<li><strong>Set thesis.</strong> Concentrate on a single release &mdash; 2023 Prizm, 2024 Topps Chrome, 2022 Panini Mosaic. The thesis scales with the set&rsquo;s secondary-market depth: a set that develops a deep buyer pool rewards completion sales and parallel-up marketing. The risk: a set that gets overshadowed by the next release and stops trading.</li>
<li><strong>Era thesis.</strong> Concentrate on a single era &mdash; 1980s Topps baseball, 1990s Fleer basketball, 2010s Prizm football. The thesis scales with vintage literacy &mdash; print-run scarcity, centering norms per set, surface chemistry variance, the LCS inventory. The intermediate reader now has the eye to read vintage correctly. The risk: vintage literacy is hard to build and even harder to verify without sustained sourcing.</li>
<li><strong>Grade-tier thesis.</strong> Concentrate on PSA 10 / BGS 9.5 Black Label only. The thesis scales with sub-grade storytelling: centering, surface, edges, corners. The risk: the cohort gets small fast and the grader math compounds fee exposure on every card that misses the gem tier.</li>
</ul>

<p>A second specialization axis that opens at the intermediate tier is <strong>TCG as a parallel vertical</strong>: Pok&eacute;mon, Magic, or Lorcana. The intermediate collector has the working capital to seed a second vertical, and TCG lives in a market where CGC carries the buyer pool PSA cannot match. The two verticals share sourcing discipline (comp-based pricing, channel verification, holder-stack protection) but diverge on grader default and fee structure. The full cross-vertical collecting reference is in the <a href="/blog/sports-card-storage-and-display-protection-stack">storage and display protection stack</a>; running TCG as a parallel thesis is referenced in the <a href="/blog/raw-card-vs-graded-slab">raw card vs graded slab comparison</a> for the cross-format decision.</p>

<p>The discipline: <strong>pick one axis first, add a second only when the first has comp literacy</strong>. Three theses at $300 each is not concentration; it is three shallow breadth portfolios. One thesis at $900 plus a $100 supplemental allocation to test a second axis is concentration with a measured expansion plan. The specialization returns compound when the comp literacy is deep enough to read grading outcomes accurately across the cohort.</p>

<h2>When to upgrade storage from starter to collector stack</h2>

<p>The intermediate collector&rsquo;s storage stack stops being uniform. The first-time stack &mdash; penny sleeve, top loader, team bag, divided box, climate-controlled room &mdash; was a one-size solution. The intermediate stack differentiates PC keepers from flip inventory from graded returns, and the upgrade decisions are keyed to per-card value bands rather than collection size.</p>

<p>Three storage upgrade vectors, each with a triggering value band:</p>

<ul>
<li><strong>Penny sleeve + top loader &rarr; one-touch magnetic holder.</strong> The one-touch upgrade is triggered when a raw card&rsquo;s per-card value crosses approximately $50 raw. Below $50 raw, the per-card upcharge for a one-touch (5&ndash;10x a top loader) is more than the protection premium it delivers on a flip card. Above $50 raw, the holder upgrade is justified because the per-card value is large enough that the corner-rounding risk a one-touch eliminates starts to dominate the holder-cost premium. <a href="/r/one-touch" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Ultra Pro One-Touch magnetic holder</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> is sized to the point thickness; use 35pt for standard cards, 75pt or 130pt for chrome, relics, and patch autos.</li>
<li><strong>Standard divided box &rarr; climate-controlled cabinet.</strong> The cabinet upgrade is triggered when the collection&rsquo;s aggregate value exceeds the cost of a single dehumidifier setup plus a sealed cabinet. The threshold varies by region (humidity-prone basements clear this bar at $1,000&ndash;$2,000 collection value; dry climates clear it at $3,000&ndash;$5,000). Below the threshold, a divided box in a climate-controlled room is sufficient. Above the threshold, the cabinets-under-dehumidifier setup pays for itself through reduced humidity-driven card degradation. The full environment-deep-dive is in the <a href="/blog/sports-card-storage-and-display-protection-stack">storage and display protection stack</a>; the cabinet-specific guide is the <a href="/blog/climate-controlled-sports-card-cabinet-guide">climate controlled sports card cabinet guide</a>.</li>
<li><strong>Binder &rarr; graded slab or pull-back-archive.</strong> The binder-vs-holder decision is keyed to whether the card is headed for grading or for long-term PC display. A card on the grading pipeline exits the binder the moment the decision to submit is made &mdash; every binder insertion is a surface event that drives a gem-tier probability down. A card held long-term in a PC collection rotates out of the binder into a one-touch (for raw PC keepers) or stays in a top-loading portfolio with archival-polyester pages (for vintage PC). The binder format decision is its own deep dive in the <a href="/blog/sports-card-binder-portfolio-review">sports card binder and portfolio review</a>.</li>
</ul>

<p>The discipline across all three vectors: <strong>upgrade by per-card value, not by collection size</strong>. A 500-card collection where every card is a $20 modern common does not need one-touches. A 200-card collection where every card is a $200 PC keeper does. The storage upgrade scales with the value band of the cards being stored, not the total count.</p>

<div class="vault-cta">
  <div class="vault-cta-label">From the Vault</div>
  <div class="vault-cta-body">
    <strong>Collector&rsquo;s Vault Starter Kit</strong> &mdash; the per-card value-band storage-upgrade decision matrix (when top loader becomes one-touch, when box becomes cabinet, when binder becomes slab), the per-thesis allocation worksheet that converts a flat budget into a coherent specialization plan, and the batch-cost-per-grade ledger that locks the second submission to a pre-committed fee exposure ceiling. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit &rarr;</a>
  </div>
</div>

<h2>Cost-per-grade before the second submission batch</h2>

<p>The intermediate collector sends batches, not single cards. The cost-per-grade calculation has to run at the cohort level, not the card level, because the cohort&rsquo;s probability-weighted grade distribution is what clears (or fails to clear) the fee budget for the second submission round. Five variables drive the cohort math:</p>

<ul>
<li><strong>Tier mix.</strong> The proportion of cards sent at Value/Bulk versus Regular versus Express tiers. A pure-Value submission batch costs less per card but locks capital for months; a mixed batch (most at Value, a single premium card at Express) yields faster turn on the premium while keeping the bulk at the lowest per-card fee. The intermediate default: Value/Bulk for the bulk (matched to the $25&ndash;$99 comp band per the <a href="/blog/grading-decision-cheat-sheet">grading decision cheat sheet</a>), Regular for comp-bands the buyer pool rewards, Express only when a market-sensitive comp window will close before the bulk returns.</li>
<li><strong>Declared-value cap stacking.</strong> Across the batch, the declared-value cap per tier caps the recovery value at grader return. A $250 raw premium card submitted at Value (cap $199) under-declares; the grader return value is treated as $199 for any insurance or recovery claim. The intermediate collector batches cards by cap tier, not randomly &mdash; every card&rsquo;s comp-checked raw value sits at or below the batch&rsquo;s declared-value cap, and the batch ships as a coherent set.</li>
<li><strong>Batch shipping amortization.</strong> The shipment to the grader batches across cards; the per-card shipping cost drops as batch size grows. A 5-card batch pays $3&ndash;$5 per card in shipping; a 25-card batch pays $0.80&ndash;$1.20 per card. The intermediate collector runs submissions in scheduled batches (quarterly, monthly at scale) to amortize the shipment.</li>
<li><strong>Fee exposure ceiling.</strong> The intermediate collector pre-commits a fee ceiling for the batch &mdash; the maximum aggregate fee exposure before any card ships. A 20-card batch at Value/Bulk commits $360&ndash;$500 in fees before the card leaves the bench. The exposure ceiling is the discipline that stops the batch from drifting to 35 cards when the comp window opens on a new card mid-batch.</li>
<li><strong>Expected grade distribution.</strong> The cohort&rsquo;s probability-weighted grade distribution, computed pre-batch from a bright-light pre-screen. An undisciplined pre-screen returns PSA 8 / PSA 9 / PSA 10 in roughly 50 / 40 / 10 distribution; a disciplined pre-screen returns 20 / 60 / 20. The distribution shifts the cohort EV by hundreds of dollars on a 20-card batch; the fee only pays when the <em>cohort</em> EV exceeds the fee, not when the single-card lottery hits.</li>
</ul>

<p>The <a href="/blog/when-to-grade-sports-cards">when to grade decision tree</a> runs the single-card math. The <a href="/blog/grading-decision-cheat-sheet">grading decision cheat sheet</a> pairs fee, declared-value cap, and turnaround across all four graders so the batch is matched to grader before any card ships. The full cohort ROI runs in the <a href="/blog/sports-card-grading-side-hustle-profit-calculator">sports card grading side hustle profit calculator</a>; the intermediate collector runs the calculator on the batch before the batch ships, not on a card after a comp window has closed.</p>

<p>The discipline: <strong>batch before ship, calculate before commit, accept the cohort EV before the cohort returns</strong>. The intermediate collector who submits single cards on impulse is the intermediate collector who paid $480 in fees on a 24-card cohort that returned PSA 8 majority and cleared $260 net. The intermediate collector who runs the cohort math pre-batch accepts that 24 cards will return a mix and the mix either pays or it does not &mdash; but the discipline is what keeps the fee exposure bounded.</p>

<h2>What to skip at the intermediate tier</h2>

<p>Four splurge traps that catch intermediate collectors compounding spend before the operation has the discipline to absorb it. Each one is a forward-link to the deep dive that resolves it, so the skip list doubles as the next chapter in the cluster.</p>

<ul>
<li><strong>Professional photo setup before a sales channel is open.</strong> A lightbox, a copy stand, a tripod, a remote trigger &mdash; the photo rig costs $80&ndash;$150 before the first eBay listing is up. Open the eBay (or COMC, or social) channel first with phone-camera photos, then upgrade the rig when sales velocity justifies it. Photo discipline is downstream of channel velocity, not upstream. The full sell-side deep dive is the <a href="/blog/how-to-sell-sports-cards-guide">how to sell sports cards guide</a>.</li>
<li><strong>Vintage before the eye is trained.</strong> A 1968 Topps Roberto Clemente at $80 raw in a card shop looks like an upgrade from a $20 modern rookie. The reading is wrong unless the eye can catch centering variance, print-line damage, surface chemistry, and corner wear at the level that determines whether the card grades PSA 8 or PSA 3. The intermediate collector has the eye &mdash; the first-time buyer does not. The vintage investment is in the literacy, not the inventory. The vintage literacy walk is in the raw-vs-graded and binder review deep dives (links at the post end).</li>
<li><strong>Raw vintage before card-stock chemistry is read.</strong> Pre-1980 cardstock off-gasses, yellows, and de-laminates at different rates than modern stock. Buying raw vintage without understanding stock chemistry ends in inventory that downgrades before the next conservation step. The intermediate collector batches vintage buys through the binder review&rsquo;s archival-polypropylene / polyester pages and through the storage hub&rsquo;s sealed-environment layer. The full vintage-storage deep dive is in the <a href="/blog/sports-card-storage-and-display-protection-stack">storage and display protection stack</a>.</li>
<li><strong>Premium display before the PC is established.</strong> UV-blocking acrylic display cases, magnetic wall-mount frames, premium Vault X portfolios &mdash; the display tier is the marker that the PC is mature. Buying the display tier before the PC has stabilized across at least one full rotation is buying the case for a collection that will change. The intermediate collector rotates display upgrades in lockstep with PC rotation. The display-tier comparison is the <a href="/blog/sports-card-wall-mount-frames-review">wall mount frames review</a>.</li>
</ul>

<p>The discipline: <strong>defer the spend that compounds before the operation has the discipline to absorb it</strong>. The intermediate collector&rsquo;s budget is finite. The four skip items above are line items that look like upgrades but function as capital they cannot recover. Spend instead on the cohort math, the second batch, and the storage-tier rotation that the card values now justify.</p>

<div class="vault-highlights" data-source="intermediate-collector-upgrade-guide">
  <div class="vault-highlights-header">
    <svg class="vault-highlights-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="6" width="18" height="14" rx="1.5"></rect>
      <path d="M3 10h18"></path>
      <circle cx="12" cy="15" r="2.25"></circle>
      <path d="M12 17.25V19.5"></path>
    </svg>
    <div>
      <div class="vault-highlights-title">Vault Highlights</div>
      <div class="vault-highlights-subtitle">Layer Upgrades for the Intermediate Stack</div>
    </div>
  </div>
  <div class="vault-highlights-body">
    <p class="vault-highlights-desc">The tier-mix batch submission costs (Value/Bulk to Express per card, declared-value cap stacking, batch-shipping amortization, fee exposure ceiling), the per-card value-band storage-upgrade decision matrix, the per-thesis allocation worksheet, and the cohort-EV calculator that locks the second submission round to a probability-weighted outcome before any card ships.</p>
    <div class="vault-highlights-items">
      <a href="/r/one-touch" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">PC Upgrade</div>
        <div class="vault-highlights-item-name">Ultra Pro One-Touch Magnetic Holder</div>
        <div class="vault-highlights-item-meta">The first storage-tier upgrade once a raw card clears the per-card value band where the holder upcharge is justified by the corner-rounding risk it eliminates.</div>
      </a>
      <a href="/r/card-boxes" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Box Rotation</div>
        <div class="vault-highlights-item-name">BCW Card Storage Boxes</div>
        <div class="vault-highlights-item-meta">Upright divided storage box sized to the differentiated stack &mdash; PC keepers separate from flip inventory separate from graded slab returns &mdash; so retrieval does not require dumping the box.</div>
      </a>
      <a href="/r/top-loaders" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Std Holder</div>
        <div class="vault-highlights-item-name">Ultra Pro Rigid 35pt Loaders</div>
        <div class="vault-highlights-item-meta">The flip-inventory workhorse &mdash; sized to point thickness for the cards not yet graded and not yet PC, kept distinct from the one-touch tier in the storage rotation.</div>
      </a>
      <a href="/r/penny-sleeves" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Base Layer</div>
        <div class="vault-highlights-item-name">BCW Penny Sleeves</div>
        <div class="vault-highlights-item-meta">Layer 1 base protection that every card in the intermediate stack still gets on day one &mdash; soft polypropylene sleeve beneath the holder tier, regardless of which holder is above.</div>
      </a>
      <a href="/r/uv-lamp" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Pre-Screen</div>
        <div class="vault-highlights-item-name">UV Inspection Lamp</div>
        <div class="vault-highlights-item-meta">365nm UV or 6500K LED bright-light evaluation for corners, edges, surface, centering &mdash; the gate that determines whether a card makes the second submission batch at all.</div>
      </a>
    </div>
    <div class="vault-highlights-cta">
      <a href="/shop/collectors-vault-starter-kit" class="btn btn-primary">Get the Starter Kit &rarr;</a>
      <a href="/shop" class="btn btn-ghost">Browse the Vault &rarr;</a>
    </div>
  </div>
</div>

<div class="vault-next-read">
  <div class="vault-next-read-label">Recommended Next Read</div>
  <div class="vault-next-read-grid">
    <a href="/blog/sports-card-grading-side-hustle-profit-calculator" class="vault-next-card">
      <div class="vault-next-card-title">Grading ROI Calculator</div>
      <div class="vault-next-card-desc">The cohort-level expected-value math beyond the per-card cost-per-grade analysis &mdash; submission fee, grade probabilities, eBay take, and net profit for every card in the second submission batch.</div>
    </a>
    <a href="/blog/grading-decision-cheat-sheet" class="vault-next-card">
      <div class="vault-next-card-title">Grading Decision Cheat Sheet</div>
      <div class="vault-next-card-desc">The printable reference pairing the 2026 PSA/BGS/SGC/CGC fee-and-turnaround grid with the raw-value &times; grader-tier decision matrix for the cohort before it ships.</div>
    </a>
    <a href="/blog/sports-card-binder-portfolio-review" class="vault-next-card">
      <div class="vault-next-card-title">Binder &amp; Portfolio Review</div>
      <div class="vault-next-card-desc">When a card on the intermediate stack stops belonging in the binder and moves to a one-touch or a graded slab &mdash; the format and brand comparison that resolves the rotation.</div>
    </a>
  </div>
</div>
        $body_intermediate_collector$,
        10,
        'Intermediate sports card collector upgrade guide: specialization axes (player thesis vs set thesis vs era thesis vs grade-tier thesis) plus the vintage literacy gate that opens at the intermediate tier, storage upgrade decision matrix by per-card value band (top loader to one-touch, box to climate-controlled cabinet, binder to slab), and batch cost-per-grade analysis (tier mix, declared-value cap stacking, batch-shipping amortization, fee exposure ceiling, expected grade distribution) before the second submission round ships.',
        'https://www.stickvault.com/pins/intermediate-collector-upgrade-guide.png',
        true
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    // ── Block B — Bump created_at so the new guide sits at the top of ?category=collecting. ──
    await client.query(`
      UPDATE blog_posts
      SET created_at = NOW()
      WHERE slug = 'intermediate-collector-upgrade-guide'
    `);

    // ── Block C — Back-link splice INTO sports-card-binder-portfolio-review. ──
    // Anchor: the closing-principle paragraph at
    // 1785200000000_sports_card_binder_portfolio_review.js:207
    // (`<p>The thesis, restated: binders are display tools…</p>` — unique in the
    // corpus). Adds a sibling paragraph that defers the
    // "when binder stops being the right holder for a card" question — the
    // upgrade-from-binder-to-top-loader-or-slab moment that drives the
    // intermediate-tier storage decision — to the new 11th post. Mirrors the
    // splice precedent at 1785200000000 (the binder review itself back-linked
    // into the storage hub on a similar single-paragraph extension).
    // Idempotency: WHERE body NOT LIKE '%intermediate-collector-upgrade-guide%'.
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<p>The thesis, restated: binders are display tools, not protection tools. Pick format by card type and value, pick page material at polypropylene minimum, pick brand at the price tier your binder-stored cards justify. The wrong binder on the wrong card is faster damage than no binder at all.</p>',
        '<p>The thesis, restated: binders are display tools, not protection tools. Pick format by card type and value, pick page material at polypropylene minimum, pick brand at the price tier your binder-stored cards justify. The wrong binder on the wrong card is faster damage than no binder at all.</p>

<p>The next question after format-and-brand is when a binder-stored card stops belonging in the binder altogether &mdash; the rotation point where raw PC keepers move to a one-touch, grading-bound cards move back to a top loader, and flip-inventory leaves the binder for a divided box. The value-band thresholds for that rotation (and the specialization thesis that drives why the rotation matters now, not six months from now) live in the <a href="/blog/intermediate-collector-upgrade-guide">intermediate collector&rsquo;s upgrade guide</a>.</p>'
      )
      WHERE slug = 'sports-card-binder-portfolio-review'
      AND body NOT LIKE '%intermediate-collector-upgrade-guide%'
    `);

    // ── Block D — Back-link splice INTO sports-card-storage-and-display-protection-stack. ──
    // Anchor: the paragraph close added by 1830000000000 — the spliced-in
    // first-time-buyer pointer that now ends the closing-paragraph of the
    // "layered model" section. Substring is unique in the corpus and the
    // anchor only exists post-183, so this splice lands in a paragraph
    // that already lives immediately above the opening
    // <div class="vault-cta">. The intermediate-post splice adds a
    // follow-on <p> between the existing 183 paragraph and the
    // <div class="vault-cta"> opening, pointing readers past the
    // starter-stack stage toward the specialize / upgrade-storage /
    // batch-cost tier.
    // Idempotency: WHERE body NOT LIKE '%intermediate-collector-upgrade-guide%'.
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<p>The stack applied end-to-end: penny sleeve inside a top loader (or a one-touch for keepers), standing upright in a divided storage box, in a climate-controlled room. That is the entire protection model. Everything else is environment and display. For someone building a first collection from scratch, the day-one ordering of this stack &mdash; sleeves before loaders, loaders before box, UV lamp before grading submission &mdash; is sequenced in the <a href="/blog/first-time-card-collector-buyers-guide">first-time card collector&rsquo;s buyers guide</a>.</p>',
        '<p>The stack applied end-to-end: penny sleeve inside a top loader (or a one-touch for keepers), standing upright in a divided storage box, in a climate-controlled room. That is the entire protection model. Everything else is environment and display. For someone building a first collection from scratch, the day-one ordering of this stack &mdash; sleeves before loaders, loaders before box, UV lamp before grading submission &mdash; is sequenced in the <a href="/blog/first-time-card-collector-buyers-guide">first-time card collector&rsquo;s buyers guide</a>.</p>

<p>For a collector past the first collection &mdash; running a specialization thesis, sending the second submission batch, and rotating PC keepers from top loaders up to one-touch magnetic holders as the per-card value clears the upcharge band &mdash; the next chapter is the <a href="/blog/intermediate-collector-upgrade-guide">intermediate collector&rsquo;s upgrade guide</a>. It picks up where the day-one stack ends: when to specialize, when to upgrade storage tier, and how to read cost-per-grade at the cohort level before the batch ships.</p>'
      )
      WHERE slug = 'sports-card-storage-and-display-protection-stack'
      AND body NOT LIKE '%intermediate-collector-upgrade-guide%'
    `);

    // ── Block E — Forward cross-link splice INTO first-time-card-collector-buyers-guide. ──
    // Anchor: the closing paragraph of the storage section at
    // 1830000000000_first_time_card_collector_buyers_guide.js:132-133
    // (ends in the storage-hub link and the "day-one minimum" closing
    // sentence — unique in the corpus). Adds a follow-on paragraph that
    // points a first-time reader who has internalized the day-one stack
    // into the intermediate stage — what to specialize in, when to
    // upgrade storage tiers, and how to think about cost-per-grade
    // before the second submission batch. This keeps the 10th → 11th →
    // mid-funnel reading order explicit, which is the request&rsquo;s
    // "reading like a clean chapter between storage and grading in the
    // funnel" acceptance criterion — together with Block D, this gives
    // the new 11th post a clean two-way-in + one-way-out mesh across
    // the cluster (binder review, storage hub, and the 10th post).
    // Idempotency: WHERE body NOT LIKE '%intermediate-collector-upgrade-guide%'.
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<p>Cards meant for grading should never live in binders. A binder page scratches the surface in a single insertion; the same surface scratches are the side that the grader reads first. Holder the card in a penny sleeve + top loader + resealable team bag from the day it enters the collection, and let the protection carry the card to a slab or a sale without an intermediate scratch event. The full protection stack layer-by-layer &mdash; penny sleeve, top loader, one-touch, slab, box, climate, display case &mdash; is in the <a href="/blog/sports-card-storage-and-display-protection-stack">sports card storage and display protection stack</a>; this section is the day-one minimum that a starter collection needs to be safe.</p>',
        '<p>Cards meant for grading should never live in binders. A binder page scratches the surface in a single insertion; the same surface scratches are the side that the grader reads first. Holder the card in a penny sleeve + top loader + resealable team bag from the day it enters the collection, and let the protection carry the card to a slab or a sale without an intermediate scratch event. The full protection stack layer-by-layer &mdash; penny sleeve, top loader, one-touch, slab, box, climate, display case &mdash; is in the <a href="/blog/sports-card-storage-and-display-protection-stack">sports card storage and display protection stack</a>; this section is the day-one minimum that a starter collection needs to be safe.</p>

<p>What comes after the day-one stack is in the <a href="/blog/intermediate-collector-upgrade-guide">intermediate collector&rsquo;s upgrade guide</a>: which specialization axis to concentrate spend on (player, set, era, or grade-tier thesis), when to rotate a PC keeper from a top loader up to a one-touch as the per-card value clears the holder-upcharge band, and how to read cost-per-grade at the cohort level &mdash; tier mix, declared-value cap stacking, fee exposure ceiling &mdash; before the second submission batch ships.</p>'
      )
      WHERE slug = 'first-time-card-collector-buyers-guide'
      AND body NOT LIKE '%intermediate-collector-upgrade-guide%'
    `);

  },
};
