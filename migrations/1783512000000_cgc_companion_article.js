module.exports = {
  name: 'cgc_companion_article',
  up: async (client) => {

    // ── New Post: CGC Grading Guide for Pokemon & MTG ────────────────────────
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description, published)
      VALUES (
        'cgc-grading-guide-pokemon-mtg-tcg',
        'CGC Grading Guide: Why Pokemon and MTG Collectors Are Switching',
        'collecting',
        'CGC started in comics but its card division has earned serious traction in Pokemon and Magic: The Gathering markets. Here is how CGC grading works, where it beats PSA, and the decision framework for non-sports collectibles.',
        $body_cgc$
<p>CGC built its reputation on comics. For decades, "a CGC book" meant a sonically-welded, tamper-evident slab from the company that defined third-party authentication in the comic world. Then the trading card market exploded, CGC opened a dedicated card division, and something unexpected happened: Pokémon and Magic: The Gathering collectors started choosing CGC over PSA in meaningful numbers.</p>

<p>The <a href="/blog/grading-service-comparison-psa-bgs-sgc-cgc">grading service comparison guide</a> flagged CGC as gaining real TCG market share. This companion piece goes deeper — how CGC's scale actually works, why TCG collectors trust the slab, where the value premiums show up, and a concrete decision guide for when to choose CGC over PSA for non-sports collectibles.</p>

<h2>CGC's grading scale — how it maps to PSA</h2>

<p>CGC Cards uses a 10-point numeric scale with one important distinction at the top: a grade of 10 is labeled "Pristine," not just "10." This is intentional. CGC's Pristine 10 is reserved for cards with virtually no surface wear, perfect centering, flawless corners and edges, and no print defects visible under magnification. It is meant to be rare — and it is.</p>

<p>Below Pristine, CGC issues half-point grades: 9.5, 9, 8.5, 8, 7.5, 7, and down from there. This mirrors the half-point structure you see from BGS and is more granular than PSA's whole-number scale.</p>

<p>The practical mapping for most TCG collectors:</p>
<ul>
<li><strong>CGC Pristine 10</strong> — equivalent to a PSA 10 Gem Mint, with arguably stricter surface standards. Population is intentionally thin.</li>
<li><strong>CGC 9.5</strong> — the most common "near-perfect" grade; roughly between PSA 9 and PSA 10 in condition, closer to a BGS 9.5 in spirit</li>
<li><strong>CGC 9</strong> — clean card with minor centering or surface variance; comparable to PSA 9</li>
<li><strong>CGC 8.5 / 8</strong> — light wear visible under close inspection; PSA 8 approximate equivalent</li>
</ul>

<p>One thing that matters for pop-report strategy: because CGC labels the top grade "Pristine" rather than "10," PSA 10 population numbers are not directly comparable. A card with 50 CGC Pristine 10s and 2,000 PSA 10s is not symmetrical — the CGC grading standard for that top label is genuinely different.</p>

<h2>Why the slab design matters for TCG collectors</h2>

<p>CGC's slab is sonically welded — the two halves are fused with ultrasonic vibration, leaving no screws or snap joints. Once sealed, opening it destroys the case visibly. This is the same tamper-evident technology CGC has used for comics since 2000, and it is meaningfully different from PSA's screw-tab construction, which can be opened and resealed without obvious evidence.</p>

<p>For TCG collectors, this matters more than it does in mainstream sports cards. Pokémon cards — especially vintage Base Set and modern Special Illustration Rares — have a collector culture that overlaps significantly with comic book collecting. The same person who submits a raw Amazing Fantasy #15 to CGC for comics authentication already trusts the CGC process. Switching to CGC for their Charizard submission is a low-friction decision.</p>

<p>The inner well design is also notable: CGC Cards holders suspend the card in a recessed tray that contacts only the edges, not the face or back surfaces. For high-value cards where surface preservation matters, this is not a trivial detail.</p>

<p>The label aesthetic is a factor too. CGC uses a clean, matte-finish label with a subdued color palette — compared to PSA's bright red and blue. For collectors displaying slabs alongside comics or in modern display cases, CGC's visual consistency across categories is a genuine advantage.</p>

<h2>Turnaround tiers and pricing</h2>

<p>CGC Cards currently offers four main submission tiers:</p>
<ul>
<li><strong>Economy</strong> — lowest cost, longest turnaround; aimed at bulk submissions where speed is not critical</li>
<li><strong>Standard</strong> — mid-tier; suitable for most single-card submissions where you are not in a hurry</li>
<li><strong>Express</strong> — significantly faster, priced accordingly; the right tier for market-sensitive cards</li>
<li><strong>Walkthrough</strong> — fastest available; convention floor or same-day equivalent for high-value submissions</li>
</ul>

<p>Pricing runs roughly $25–30 at Economy, scaling to $150+ at Walkthrough depending on declared card value. This is broadly competitive with PSA's equivalent tier structure.</p>

<p>The meaningful operational difference: CGC's card division is newer than PSA's. PSA has processed tens of millions of cards and has historically seen the longest economy backlogs in the hobby — sometimes 12–18 months during high-demand cycles. CGC's card operation launched at a smaller volume base, which means economy-tier turnaround has generally been faster during normal periods. If you are submitting a batch where quick turnaround matters more than maximizing the resale ceiling, CGC's economy tier is worth modeling.</p>

<div class="vault-cta">
  <div class="vault-cta-label">From the Vault</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> — grading tier decision guide, submission log, and the pop report methodology that tells you whether grading is worth it before you commit a card. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit →</a>
  </div>
</div>

<h2>Value premiums on key TCG cards</h2>

<p>Market data in this hobby moves fast. Rather than cite specific sale prices that will be stale within months, here is the structural picture — and where to verify current spread.</p>

<p><strong>Charizard Base Set (1st Edition, Shadowless):</strong> PSA 10 remains the most liquid top-grade slab for this card by volume — there are thousands of PSA 10 comps. CGC Pristine 10 has a meaningfully smaller population, which in theory creates a scarcity premium, but it also means fewer recent sold comps and more price discovery uncertainty. The CGC 10 premium over PSA 10 has appeared in auction results but is inconsistent. For sellers, PSA 10 is the lower-variance choice. For buyers who prioritize slab integrity over maximum resale liquidity, CGC Pristine is worth the consideration.</p>

<p><strong>Black Lotus (Alpha/Beta):</strong> This is where CGC's comic-collector credibility carries direct weight. The vintage Magic market overlaps substantially with high-end comic collecting — the same buyers who track CGC census data for Action Comics #1 also participate in Black Lotus auctions. CGC slabs of Alpha/Beta Power Nine have sold at major auction houses with competitive results. The brand recognition is not borrowed here; it is earned from the same collector base.</p>

<p><strong>Modern Pokémon (Alternate Art, Special Illustration Rares):</strong> This is CGC's strongest growth market. Modern Pokémon collectors skew younger and are less attached to PSA as the default. CGC 9.5 and Pristine 10 comps on high-demand SIRs have shown near-parity with PSA 10 in some auctions, and in a handful of cases a premium — particularly when CGC population is thin. This is the category to watch most actively.</p>

<p>To verify current spread on any specific card: search eBay sold listings filtered to the last 90 days, compare the median CGC 9.5/10 price against PSA 10 for the same set and variant. That is always more reliable than any static figure.</p>

<h2>The analog market: non-sport cards and the comics crossover</h2>

<p>CGC's natural territory outside sports is broad. Vintage non-sport trading cards — Garbage Pail Kids, Wacky Packages, Topps Star Wars, Mars Attacks — sit in a collector segment that has always leaned toward CGC for authentication. The same buyers who grade their vintage GPK sets with CGC for consistency are a natural market for any non-sport slabs you list.</p>

<p>The submission activation energy is lower here than PSA. A collector who already has a CGC account, knows the process, and trusts the brand from comics does not need to evaluate a new service when deciding to grade a card. They default to CGC. That default behavior creates a self-reinforcing market: more CGC slabs in non-sport means more CGC comps, which means more buyer comfort with CGC grades, which means higher realized prices.</p>

<p>If you are sitting on raw vintage non-sport material and weighing grading options, CGC is the primary choice — not an alternative to consider. PSA has a smaller buyer pool for this category, and SGC's strength is sports.</p>

<h2>Decision guide: when to choose CGC over PSA</h2>

<p>Use this as a working checklist, not a hard rule — sold comps for your specific card always override general guidance.</p>

<p><strong>Choose CGC when:</strong></p>
<ul>
<li>You are submitting Pokémon or MTG cards where the buyer pool is TCG-native and CGC has established comp history for that set</li>
<li>The card will be displayed alongside a CGC comic collection — brand aesthetic consistency matters for display-focused collectors</li>
<li>Faster economy-tier turnaround is more important than maximizing the resale ceiling</li>
<li>You are testing market reception for non-sport cards — GPK, Wacky Packages, vintage non-sport sets</li>
<li>CGC's population for that specific card is meaningfully lower than PSA (low pop can create scarcity premium if buyer demand exists)</li>
<li>The card is Black Lotus or similar high-end MTG where the comic-collector buyer base gives CGC direct credibility</li>
</ul>

<p><strong>When NOT to choose CGC:</strong></p>
<ul>
<li>Mainstream modern sports cards — PSA and BGS dominate buyer expectations; a CGC slab on a Shohei Ohtani rookie is harder to sell</li>
<li>Ultra-high-value modern cards where the PSA 10 premium is proven and non-negotiable — when market data shows PSA 10 commands a reliable premium, matching the market wins</li>
<li>Any submission where you need maximum buy-it-now liquidity fast — PSA's buyer volume is larger across most mainstream categories</li>
</ul>

<p>The through-line: CGC is not a second-tier choice. It is the right choice for a specific set of cards and a specific buyer base. Match your submission to the market that buys it.</p>

<div class="vault-cta">
  <div class="vault-cta-label">System Reference</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> — grading tier selection, submission tracking, and the decision matrix for when grading adds value versus when it does not. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit →</a>
  </div>
</div>

<div class="vault-next-read">
  <div class="vault-next-read-label">Recommended Next Read</div>
  <div class="vault-next-read-grid">
    <a href="/blog/grading-service-comparison-psa-bgs-sgc-cgc" class="vault-next-card">
      <div class="vault-next-card-title">Grading Service Comparison</div>
      <div class="vault-next-card-desc">PSA vs BGS vs SGC vs CGC across turnaround, cost tiers, resale premium, and submission strategy — the full breakdown for every card type.</div>
    </a>
    <a href="/blog/grading-prep-system-before-submitting-to-psa" class="vault-next-card">
      <div class="vault-next-card-title">Grading Prep System</div>
      <div class="vault-next-card-desc">The pre-submission workflow: bright-light evaluation, centering measurement, sleeve and packing protocol, and tier selection framework.</div>
    </a>
    <a href="/blog/affordable-collector-tools-under-50" class="vault-next-card">
      <div class="vault-next-card-title">Affordable Collector Tools</div>
      <div class="vault-next-card-desc">The sub-$50 tools that matter for prep, storage, and display — from loupe to top-loaders to the scale that saves submissions.</div>
    </a>
  </div>
</div>
        $body_cgc$,
        7,
        'CGC grading guide for Pokemon and MTG collectors: how CGC''s scale compares to PSA, why TCG collectors prefer the tamper-evident slab design, value premiums on key cards, turnaround tiers, and a decision guide for non-sports collectibles.',
        true
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    // ── UPDATE: Back-link in grading comparison post ──────────────────────────
    // Add a link to the CGC companion article after the CGC section
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>Submission strategy: pop reports and tier selection</h2>',
        '<p>For a deeper dive into CGC''s scale, slab design, and when CGC outperforms PSA for TCG submissions, see the <a href="/blog/cgc-grading-guide-pokemon-mtg-tcg">CGC grading guide for Pokémon and MTG collectors</a>.</p>

<h2>Submission strategy: pop reports and tier selection</h2>'
      )
      WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc'
      AND body NOT LIKE '%cgc-grading-guide-pokemon-mtg-tcg%'
    `);

  },
};
