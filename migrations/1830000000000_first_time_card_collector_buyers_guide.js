module.exports = {
  name: 'first_time_card_collector_buyers_guide',
  up: async (client) => {

    // ── Block A — Insert the 10th collecting-cluster post. ─────────────────────
    // Slug = 'first-time-card-collector-buyers-guide'; category = 'collecting'
    // (fits VALID_CATEGORIES at routes/blog.js:11). Title and excerpt stay
    // specific about "first-time buyer" so the post matches the cluster's
    // top-of-funnel intent (someone inside the front door, not yet on the
    // grading pipeline). Body mirrors the conventions of
    // 1810000000000_how_to_sell_sports_cards_guide.js — single
    // $body_…$ delimited HTML blob, four <h2> sections (what to buy, where
    // to source, grading mindset, storage basics), three forward cross-link
    // anchors in closing paragraphs of substantive sections, a
    // <div class="vault-highlights"> block immediately above the closing
    // <div class="vault-next-read">, and the standard <div class="vault-cta">
    // + <div class="vault-next-read"> closing pair.
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description, pin_image, published)
      VALUES (
        'first-time-card-collector-buyers-guide',
        'Sports Card Collecting for First-Time Buyers: What to Buy First, Where to Source Safely, and How to Think About Grading and Storage Before Submitting Anything',
        'collecting',
        'First-time sports card collecting is built on sequencing — buy modern raw as a default starter, source from established channels with verifiable feedback, hold cards in a penny sleeve + top loader + box from day one, and only consider grading once the raw-to-graded spread clears the fee.',
        $body_first_time_buyers$
<p>Sports card collecting is the easiest hobby to enter badly. A sealed blaster box at Target, a few random cards from a card show, and a binder to throw them in — that is the default start, and it is also the start that loses money fastest. The deeper StackVault guides on <a href="/blog/sports-card-storage-and-display-protection-stack">storage and display</a>, <a href="/blog/when-to-grade-sports-cards">grading trigger points</a>, and the <a href="/blog/sports-card-grading-side-hustle-profit-calculator">side hustle profit calculator</a> are written for collectors who have already moved past those rookie errors. This guide is the front door for someone who has not — the orientation that has to happen before the cluster's deeper dives pay off.</p>

<p>Everything below is sequencing. Buy modern raw as the default starter, not vintage or TCG. Source from established channels with verifiable feedback, not random sellers and not unverified social-media deals. Hold every card in a penny sleeve inside a top loader inside a box from the moment it enters the collection. Only submit a card to PSA, BGS, SGC, or CGC once the raw-to-graded spread is wide enough to clear fee plus eBay plus shipping. None of those rules require experience. They require discipline, applied consistently.</p>

<h2>What to actually buy first — modern, vintage, or TCG</h2>

<p>The first decision a new collector makes is the format. Sports cards split three ways: modern (post-2010, high print runs, deep buyer pools, comps on eBay), vintage (pre-1990, low print runs, narrow buyer pools, auction-anchored comps), and TCG (Pok&eacute;mon, MTG, Lorcana — functionally a separate market with its own grader defaults and channel stack). Each segment has a different rule for what to buy first.</p>

<ul>
<li><strong>Modern is the default for first-time buyers.</strong> Modern print runs create deep comp databases, broad buyer pools, and price stability on commons. A 2020 Prizm Silver rookie is a $20&ndash;$30 card with thousands of transactions per month — exactly the liquidity a first-time buyer needs to learn the market without losing capital to illiquidity.</li>
<li><strong>Vintage is a literacy investment, not a starter inventory.</strong> Vintage cards are scarce but expensive, and the buyer pool is small. A 1975 Topps George Brett rookie at $80 raw looks affordable next to a Mantle, but the realized sale comp set is narrow and the grading math depends on centering and print defects a new collector cannot read. Buy vintage once you can run the <a href="/blog/when-to-grade-sports-cards">when to grade decision tree</a> for a 1970s Topps card, not before.</li>
<li><strong>TCG is a separate market, considered separately.</strong> Pok&eacute;mon, Magic, and Lorcana have their own grader defaults (CGC for the bulk of submissions), their own channel stack (Cardmarket plus eBay plus social), and their own fee structure. A first-time buyer who is interested in TCG should treat it as a parallel hobby, not as a tax on the sports card stack.</li>
</ul>

<p>A reasonable starter budget is $100&ndash;$300. That buys a handful of modern singles across two or three rookies, the holder stack to protect them from day one, and enough margin to cover the first grading submission once the math justifies it. Spend the first $100 on singles, not on sealed wax. Sealed boxes are a long-tail trade with a five-to-ten-year horizon; modern singles are the working inventory for the first six months of the hobby.</p>

<p>The single rule for what to buy: <strong>buy singles, not packs</strong>. A $4 retail pack returns a base card worth $0.05&ndash;$0.15 and a one-in-forty chance of returning a parallel worth $2&ndash;$5. A $4 raw single on eBay (sourced from a verified seller, comp verified against recent sold listings) is an asset with a known comp, a known condition band, and an immediate path to holding or grading. The bulk of a starter budget belongs in singles. Sealed product belongs later, and only as a fraction of the rotation.</p>

<h2>Where to source safely — established channels</h2>

<p>The second decision a new collector makes is the channel. Sports cards move through five distinct lanes, and the safest lanes for a first-time buyer overlap with the cheapest lanes. Buying from unverified sellers on social media, off-the-books, or at premium-to-comps prices is how first-time buyers lose their starter budget.</p>

<table class="comparison-table">
  <thead>
    <tr>
      <th>Channel</th>
      <th>Best For First-Time Buyers</th>
      <th>Verification Standard</th>
      <th>Price vs Comps</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>eBay (sold listings)</td>
      <td>Price discovery first, then auction and fixed price buying</td>
      <td>100+ feedback; 98%+ positive; seller has card-specific sales history</td>
      <td>Comp + 0&ndash;10%; verify against the trailing 90 days of sold listings</td>
    </tr>
    <tr>
      <td>COMC (Check Out My Cards)</td>
      <td>Bulk modern singles; lot decomposition</td>
      <td>Standardized intake and listing by COMC</td>
      <td>10&ndash;25% below eBay; longer capital lockup</td>
    </tr>
    <tr>
      <td>Local card shop / LCS</td>
      <td>Walk-around vintage; local singles; unopened wax at reasonable prices</td>
      <td>Physical inspection; reputation is the Yelp review</td>
      <td>Retail comp; relationship discount possible for repeat buyers</td>
    </tr>
    <tr>
      <td>Card show</td>
      <td>In-person vintage, autographs, in-person negotiation; overproduction tables for modern</td>
      <td>Inspect the card under bright light before paying</td>
      <td>Lower for vintage, higher for new-release modern</td>
    </tr>
    <tr>
      <td>Facebook groups / Discord</td>
      <td>Niche regional and international releases; venue-specific deals</td>
      <td>Vetted post history; references from prior buyers; escrow for any card over $50</td>
      <td>Wide variance; validated only via direct comp check</td>
    </tr>
    <tr>
      <td>Unverified social-media sellers</td>
      <td>Avoid for first-time buyers; capital risk does not justify the savings</td>
      <td>No platform-mediated dispute path</td>
      <td>Below comp; capital risk absorbed by buyer</td>
    </tr>
  </tbody>
</table>

<p>The rule: <strong>buy authenticated or buy with a verifiable comp</strong>. A high-value card from an unverified seller is a money-losing trade nine times out of ten, because the dispute path does not exist. eBay's Money Back Guarantee, COMC's intake inspection, and a card shop's reputation are the dispute infrastructure — pay the comp + 0&ndash;10% premium for it. The price premium is the cost of a working dispute path, not a markup.</p>

<p>The red-flag list for an unverified source: a price below the trailing 90-day comp by 25% or more, a seller whose only channel is direct social-media transfer with no platform protection, a card with no photograph of the actual card (stock photography substituted), or a seller who refuses to let the buyer use an escrow service. Any single red flag is a reason to walk. Two red flags is a reason to block the seller across channels.</p>

<h2>How to think about grading before submitting anything</h2>

<p>Grading is the most expensive mistake a first-time buyer can make. A clean-looking raw card submitted at PSA Value pays $18&ndash;$25 plus shipping, returns PSA 8 most of the time on a disciplined pre-screen, and the PSA 8 realized sale clears the fee only for premium-card comps. The default outcome of a first submission to PSA, BGS, SGC, or CGC is a negative-net trade when raw cost is below $50. The grading math is not intuitive, and it is the math that has to run before any card ships.</p>

<p>The first buyer discipline is <strong>the pre-screen rule</strong>: before paying a fee, hold the card under bright light (a 6500K LED or a <a href="/r/uv-lamp" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>UV inspection lamp</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> is the standard tool) and check corners, edges, surface gloss, and centering. A card with one soft corner is a PSA 9 cap; a card with print-line damage is a PSA 8 cap; a card with surface dimples is a coin-flip on the gem tier. Pre-screening filters fee candidates down to the cohort, not the single card, where the probability-weighted grade premium covers fee plus eBay plus shipping.</p>

<p>The second buyer discipline is <strong>the spread rule</strong>: only grade when the raw-to-graded spread clears the fee. A $20 raw modern Prizm Silver rookie with a PSA 10 comp of $180 and a PSA 9 comp of $45 has a probability-weighted expected value of about $58 (90% PSA 9 / 10% PSA 10). Subtract eBay fees, shipping, raw cost, and grading fee: the net at the expected value is break-even. The profit lives in the PSA 10 long tail. Most cards will not hit it. The fee only pays when the cohort EV is positive, not the single-card lottery.</p>

<p>The full working model — tier fee per grader, probability weighting across PSA 10 / 9 / 8 / off-grade, eBay take, expected sale minus raw cost minus grading fee — lives in the <a href="/blog/sports-card-grading-side-hustle-profit-calculator">sports card grading side hustle profit calculator</a>. A first-time buyer should run the calculator on every candidate before submitting. If the calculator returns a net under 20% of raw cost, the card stays raw. The decision rule: <strong>only grade when the spread clears the fee</strong>. The discipline is the same for first-time buyers as it is for collectors running grading as a side hustle; only the volume differs.</p>

<h2>Storage before anything ships &mdash; the protection stack starts day one</h2>

<p>The fourth decision a new collector makes is the holder. Most first-time buyers skip this step, because raw cards look fine in a binder sleeve for the first six months and only show damage once it is irreversible. The fix is to put every card in a holder on day one. The cost is pennies per card. The protection against the corners-rounding, surface-scratching, sun-fading damage that drives grading outcomes off by one half-grade to one full grade is structural from the first sleeve.</p>

<p>The minimum viable storage stack for a first-time buyer:</p>

<ul>
<li><strong>Penny sleeve.</strong> Soft <a href="/r/penny-sleeves" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>polypropylene sleeve</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> over every card on day one. Stops fingerprint contact and card-to-card surface abrasion in a stack. Under a dollar per hundred sleeves.</li>
<li><strong>Top loader.</strong> Rigid <a href="/r/top-loaders" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>35pt plastic shell</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> sized to point thickness. Stops bending, edge-chip, and contact damage. The standard inventory holder for any card kept raw.</li>
<li><strong>Team bag (optional).</strong> <a href="/r/team-bags" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Resealable protection sleeve</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> over the card-holder sandwich. Seals environment against humidity swings and dust. Worth it for any card you intend to grade or flip.</li>
<li><strong>Storage box.</strong> Upright cardboard box with dividers. Stops horizontal pressure damage and keeps inventory accessible. Match the box size to the collection.</li>
</ul>

<p>Three rules for what to skip:</p>

<ul>
<li><strong>Binders are display, not storage.</strong> Binder pages scratch cards on insertion; binder spines bend; PVC-free pages are archival-safe but not UV-protected. Use a binder for browsing, not for inventory.</li>
<li><strong>Sunlit shelves are card-damaging shelves.</strong> UV fades ink over months. A north-facing wall or an opaque storage box eliminates the exposure entirely.</li>
<li><strong>Attics, garages, and exterior walls are humidity disasters.</strong> Temperature swings and seasonal humidity above 60% RH damage cardboard and ink. Climate-controlled room is the right storage environment.</li>
</ul>

<p>Cards meant for grading should never live in binders. A binder page scratches the surface in a single insertion; the same surface scratches are the side that the grader reads first. Holder the card in a penny sleeve + top loader + resealable team bag from the day it enters the collection, and let the protection carry the card to a slab or a sale without an intermediate scratch event. The full protection stack layer-by-layer — penny sleeve, top loader, one-touch, slab, box, climate, display case — is in the <a href="/blog/sports-card-storage-and-display-protection-stack">sports card storage and display protection stack</a>; this section is the day-one minimum that a starter collection needs to be safe.</p>

<div class="vault-cta">
  <div class="vault-cta-label">From the Vault</div>
  <div class="vault-cta-body">
    <strong>Collector&rsquo;s Vault Starter Kit</strong> &mdash; first-time buyer starter checklist, the four-channel sourcing matrix with verification standard per channel, the pre-screening worksheet that filters fee candidates down to the cohort where the grade premium clears the cost, and the storage-box-by-collection-size guide that keeps inventory accessible from day one. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit &rarr;</a>
  </div>
</div>

<div class="vault-highlights" data-source="first-time-card-collector-buyers-guide">
  <div class="vault-highlights-header">
    <svg class="vault-highlights-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="6" width="18" height="14" rx="1.5"></rect>
      <path d="M3 10h18"></path>
      <circle cx="12" cy="15" r="2.25"></circle>
      <path d="M12 17.25V19.5"></path>
    </svg>
    <div>
      <div class="vault-highlights-title">Vault Highlights</div>
      <div class="vault-highlights-subtitle">First-Time Buyer Starter Stack</div>
    </div>
  </div>
  <div class="vault-highlights-body">
    <p class="vault-highlights-desc">The protection stack layer-by-layer for a first collection, the four-channel sourcing matrix with verification standard per channel, the pre-screening worksheet that filters fee candidates before they ship, and the storage-box-by-collection-size guide that keeps inventory accessible from day one.</p>
    <div class="vault-highlights-items">
      <a href="/r/penny-sleeves" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Sleeves</div>
        <div class="vault-highlights-item-name">BCW Penny Sleeves</div>
        <div class="vault-highlights-item-meta">Layer 1 base protection &mdash; soft polypropylene sleeve for every raw card on day one.</div>
      </a>
      <a href="/r/top-loaders" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Top Loaders</div>
        <div class="vault-highlights-item-name">Ultra Pro Rigid 35pt Loaders</div>
        <div class="vault-highlights-item-meta">Layer 2 structural shell &mdash; 35pt for standard cards; 75pt or 130pt for chrome, relics, and patch autos.</div>
      </a>
      <a href="/r/team-bags" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">Team Bags</div>
        <div class="vault-highlights-item-name">Resealable Protection Sleeves</div>
        <div class="vault-highlights-item-meta">Layer 3 sealed environment &mdash; protects holder-card sandwich against humidity and dust for cards headed to grading.</div>
      </a>
      <a href="/r/uv-lamp" class="vault-highlights-item affiliate-link" rel="nofollow sponsored" target="_blank">
        <div class="vault-highlights-item-label">UV Lamp</div>
        <div class="vault-highlights-item-name">UV Inspection Lamp</div>
        <div class="vault-highlights-item-meta">Layer 4 pre-screen tool &mdash; 365nm UV or 6500K LED bright-light evaluation for corners, edges, surface, centering before grading submission.</div>
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
    <a href="/blog/affordable-collector-tools-under-50" class="vault-next-card">
      <div class="vault-next-card-title">Affordable Collector Tools</div>
      <div class="vault-next-card-desc">The sub-$50 tools that anchor every layer of the protection stack &mdash; sleeve, top loader, one-touch, UV lamp, and storage box.</div>
    </a>
    <a href="/blog/grading-prep-system-before-submitting-to-psa" class="vault-next-card">
      <div class="vault-next-card-title">Grading Prep System</div>
      <div class="vault-next-card-desc">The pre-submission workflow: bright-light evaluation, centering measurement, packing protocol, and tier selection framework &mdash; the pre-screen before any card ships.</div>
    </a>
    <a href="/blog/how-to-grade-sports-cards-psa-guide-for-beginners" class="vault-next-card">
      <div class="vault-next-card-title">PSA Grading for Beginners</div>
      <div class="vault-next-card-desc">The four grading criteria (corners, edges, surface, centering) explained in plain language, with the pre-screen checklist and PSA submission option breakdown for first-time submitters.</div>
    </a>
  </div>
</div>
        $body_first_time_buyers$,
        9,
        'First-time sports card buyer guide: modern vs vintage vs TCG (modern is default starter, vintage is literacy investment, TCG is parallel market), how to source safely (eBay sold listings as comps, COMC for bulk modern, LCS and card shows for in-person buys, verification standard per channel, red flags for unverified sellers), how to think about grading (the pre-screen rule, the spread rule, only grade when the math clears the fee), and storage basics (penny sleeve + top loader + box from day one, binders are display not storage, avoid sunlit shelves and humidity disasters).',
        'https://www.stickvault.com/pins/first-time-card-collector-buyers-guide.png',
        true
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    // ── Block B — Bump created_at so the new guide sits at the top of ?category=collecting. ──
    await client.query(`
      UPDATE blog_posts
      SET created_at = NOW()
      WHERE slug = 'first-time-card-collector-buyers-guide'
    `);

    // ── Block C — Back-link splices into 3 existing cluster posts. ─────────────
    // Each splice anchored on a substring present in the current target body — REPLACE
    // touches only the matched substring, so prior splices on adjacent anchors stay
    // intact. Guarded by destination slugs via body NOT LIKE so re-runs no-op.
    // Anchor inventory checked against migrations/1783830000000 (storage hub),
    // 1784900000000 (when-to-grade), 1800000000000 (profit pillar).

    // ── Splice 1 — INTO sports-card-storage-and-display-protection-stack ───────
    // Anchor: the closing paragraph of the layered model section
    // (<p>The stack applied end-to-end: ...</p>). Adjacent to (and not
    // overlapping with) the prior splicing anchors on Stage1 / Storage
    // methods comparison / Display without damage. Adds a first-time buyer
    // pointer for someone who has not yet built the stack.
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<p>The stack applied end-to-end: penny sleeve inside a top loader (or a one-touch for keepers), standing upright in a divided storage box, in a climate-controlled room. That is the entire protection model. Everything else is environment and display.</p>',
        '<p>The stack applied end-to-end: penny sleeve inside a top loader (or a one-touch for keepers), standing upright in a divided storage box, in a climate-controlled room. That is the entire protection model. Everything else is environment and display. For someone building a first collection from scratch, the day-one ordering of this stack &mdash; sleeves before loaders, loaders before box, UV lamp before grading submission &mdash; is sequenced in the <a href="/blog/first-time-card-collector-buyers-guide">first-time card collector&rsquo;s buyers guide</a>.</p>'
      )
      WHERE slug = 'sports-card-storage-and-display-protection-stack'
      AND body NOT LIKE '%first-time-card-collector-buyers-guide%'
    `);

    // ── Splice 2 — INTO when-to-grade-sports-cards ────────────────────────────
    // Anchor: <h2>Stage 1: The value threshold</h2> (text-only, no surrounding
    // paragraph changes). Prior splice from 1800000000000 sits above this
    // anchor as a separate paragraph — REPLACE inserts the new primer pointer
    // paragraph before the <h2>, preserving the older paragraph.
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>Stage 1: The value threshold</h2>',
        '<p>For a first-time buyer considering whether the math ever justifies the fee &mdash; the pre-screen rule, the spread rule, and the day-one storage stack that has to be in place before any card ships &mdash; the primer is the <a href="/blog/first-time-card-collector-buyers-guide">first-time card collector&rsquo;s buyers guide</a>. This decision tree runs the grader math assuming the pre-screen and the holder stack are already in place as discipline.</p>

<h2>Stage 1: The value threshold</h2>'
      )
      WHERE slug = 'when-to-grade-sports-cards'
      AND body NOT LIKE '%first-time-card-collector-buyers-guide%'
    `);

    // ── Splice 3 — INTO sports-card-grading-side-hustle-profit-calculator ──────
    // Anchor: the post&rsquo;s lead-in paragraph (unique in the corpus; not
    // used by any earlier splice). Orients first-time buyers reading the
    // profit calculator top-down back to the primer before the math runs.
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<p>Most card flips sell for a small premium over the raw price. A grade flip is different &mdash; the same raw card can return five, ten, or twenty times the submission fee if the grade comes back high enough. That spread is the sports card grading side hustle.</p>',
        '<p>Most card flips sell for a small premium over the raw price. A grade flip is different &mdash; the same raw card can return five, ten, or twenty times the submission fee if the grade comes back high enough. That spread is the sports card grading side hustle. A first-time buyer running this math against a $100&ndash;$300 starter budget will want the broader &ldquo;what to buy, where to source&rdquo; primer in the <a href="/blog/first-time-card-collector-buyers-guide">first-time card collector&rsquo;s buyers guide</a> before paying the first fee.</p>'
      )
      WHERE slug = 'sports-card-grading-side-hustle-profit-calculator'
      AND body NOT LIKE '%first-time-card-collector-buyers-guide%'
    `);

  },
};
