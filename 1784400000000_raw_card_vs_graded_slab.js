module.exports = {
  name: 'raw_card_vs_graded_slab',
  up: async (client) => {

    // ── New affiliate link slug: uv-frames ────────────────────────────────────
    // penny-sleeves, top-loaders, card-boxes already exist (1747616000000)
    // display-cases already exists (1783830000000); uv-frames is the dedicated
    // wall-mounted frame slot called out separately in the comparison.
    await client.query(`
      INSERT INTO affiliate_links (slug, label, program, target_url, commission_rate, link_type, pillar) VALUES
        ('uv-frames', 'UV-Filtering Wall-Mounted Card Display Frames — Amazon', 'Amazon',
         'https://www.amazon.com/s?k=UV+filtering+wall+mounted+card+display+frame&tag=stickvault0f-20',
         '3-10%', 'affiliate', 'Collecting')
      ON CONFLICT (slug) DO NOTHING;
    `);

    // ── New Post: Raw Card vs Graded Slab ─────────────────────────────────────
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description, published)
      VALUES (
        'raw-card-vs-graded-slab',
        'Raw Card vs Graded Slab: When to Grade, When to Keep It Raw, and How to Decide',
        'collecting',
        'Raw card vs graded slab is the decision every collector hits at the protection-stack layer — penny sleeve on one side, slabbed PSA 9 on the other. Here is what each state physically is, when grading earns its fee, and what the math looks like on a real card.',
        $body_raw_vs_graded$
<p>The raw card vs graded slab decision is the missing layer between two articles every collector hits: the <a href="/blog/sports-card-storage-and-display-protection-stack">protection stack guide</a> on the raw side and the <a href="/blog/grading-service-comparison-psa-bgs-sgc-cgc">grading service comparison</a> on the slab side. Each answers half. This piece is the bridge &mdash; when a card is ready for the grading fee, when it is better kept raw, and how to run the math.</p>

<p>One path is a <a href="/r/penny-sleeves" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>BCW penny sleeve</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> and a top loader at 12 cents total; flip, trade, or grade later. The other is a PSA Value submission at $18 plus return shipping plus six weeks of capital tied up. The point is to make the decision repeatable instead of emotional.</p>

<h2>What each state actually is: raw vs slabbed</h2>

<p>A <strong>raw card</strong> is paper stock, ink, surface gloss, edges, corners, and centerness exposed to the air. Whatever holder it sits in is reversible — it can move in and out of submission, be photographed under any lighting, be resold without a third party. The card itself absorbs every surface oil, micro-scratch, and corner rub over its life.</p>

<p>A <strong>graded slab</strong> (PSA, BGS, SGC, or CGC) is a card permanently encapsulated in a sonically welded or screw-tab case. The holder is tamper-evident &mdash; break the seal and the grade is invalidated. Inside the case the card sits in a recessed tray; the label is ultrasonically sealed or printed beneath an acrylic cover; the front and back are visible through UV-protected acrylic. The card cannot be handled. The grade is the product.</p>

<table class="comparison-table">
  <thead>
    <tr>
      <th>Property</th>
      <th>Raw Card</th>
      <th>Graded Slab</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Physical form</td>
      <td>Paper stock, exposed surface, flexible holders</td>
      <td>Sonically welded or screw-tab case, recessed tray, sealed label</td>
    </tr>
    <tr>
      <td>Authentication</td>
      <td>None &mdash; buyer's own inspection</td>
      <td>Third-party verified by the grading service</td>
    </tr>
    <tr>
      <td>Tamper evidence</td>
      <td>None &mdash; holder can be opened and replaced</td>
      <td>Full &mdash; broken seal invalidates the grade</td>
    </tr>
    <tr>
      <td>Buyer trust</td>
      <td>Variable &mdash; depends on seller reputation and listing photos</td>
      <td>Standard &mdash; grade and population are the receipt</td>
    </tr>
  </tbody>
</table>

<p>The two states are not just "before grading" and "after grading." They are different product lines. Raw is a commodity where condition is the seller's claim. Slabbed is a labeled good where condition is the grader's claim.</p>

<h2>Raw card pros and cons</h2>

<p>Raw is the default state. Most cards live and die raw.</p>

<p><strong>Pros.</strong></p>

<ul>
<li><strong>Cost.</strong> Sleeves and loaders run pennies per card. Bulk collection is feasible because the per-card cost approaches zero. A single card's protection layer is <a href="/r/penny-sleeves" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>BCW penny sleeves</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> plus <a href="/r/top-loaders" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Ultra Pro top loaders</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> sized to point thickness.</li>
<li><strong>Accessibility.</strong> Re-holder in five seconds. Photograph under any lighting. Re-submit at a different tier if the first grade disappoints. A broken slab is a wasted grade.</li>
<li><strong>Flexibility.</strong> Move between collections, trade, bundle, give away, or pull into a grading batch on a moment's notice. No irreversible decision attached.</li>
</ul>

<p><strong>Cons.</strong></p>

<ul>
<li><strong>No third-party authentication.</strong> Buyers who do not trust the seller discount raw heavily. A perfectly centered raw rookie an expert would call PSA 10 &mdash; none of that matters until someone with authority says so.</li>
<li><strong>Surface vulnerability.</strong> Every handling event is a downgrade risk. Fingerprints on gloss, micro-scratches from card-to-card contact, corner dings from too-tight holders. Raw cards drop in grade over time.</li>
<li><strong>Resale volatility.</strong> Two identical raw cards can list at $20 and $35 depending on seller, photos, and listing copy. No common label to anchor on.</li>
</ul>

<h2>Graded slab pros and cons</h2>

<p>The slab is the right end-state for some cards. The wrong end-state for most.</p>

<p><strong>Pros.</strong></p>

<ul>
<li><strong>Authentication.</strong> PSA, BGS, SGC, and CGC each run authentication as part of grading. Counterfeits filter at the front door. Buyers pay a real premium for that filter.</li>
<li><strong>Liquidity.</strong> Slabbed cards sell faster than raw at the same dollar value because the buyer pool is wider and price discovery is easier. A PSA 9 buyer knows exactly what they are bidding on.</li>
<li><strong>Display.</strong> A slab is self-contained, UV-protected, tamper-evident, and frame-ready. For permanent wall display, frame it in a <a href="/r/display-cases" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>UV-blocking acrylic display case</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> for tabletop presentation, or a <a href="/r/uv-frames" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>UV-filtering wall-mounted card frame</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> for gallery mounting.</li>
</ul>

<p><strong>Cons.</strong></p>

<ul>
<li><strong>Grading fee.</strong> PSA Value / Bulk starts around $18; Express runs higher; BGS, SGC, and CGC sit nearby. Fee alone is rarely the blocker; fee times expected outcome is.</li>
<li><strong>Sub-grade lottery.</strong> A card returning PSA 8 instead of PSA 9 loses most of the grade premium and now sells below the fee's worth. The fee is paid whether the grade is 10 or 8.</li>
<li><strong>Slab storage footprint.</strong> Slabs are thicker than top loaders. A 3200-count top-loader box holds maybe 800 slabs. Slab-rated boxes are more expensive per slot.</li>
</ul>

<div class="vault-cta">
  <div class="vault-cta-label">From the Vault</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> &mdash; the raw-vs-slab decision matrix, the pre-grade pre-screening checklist, and the storage box layout that scales as your graded collection grows. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit &rarr;</a>
  </div>
</div>

<h2>When to grade: a decision guide by card type and age</h2>

<p>Generic answers ("grade when the value justifies the fee") are useless. The real decisions run by card type and age.</p>

<p><strong>Modern chrome rookies (2018 onward).</strong> Always worth modeling. The raw-to-PSA 10 spread is the largest in the modern card market, and the population stays modest because chrome surfaces are difficult to grade gem. Pre-screen under bright light; commit only on clean centering, no print lines, and square corners.</p>

<p><strong>Vintage rookies, 1970s&ndash;1980s.</strong> Grade when centering is clean. Old stock has print defects that drive grades down; centering is the variable you can pre-screen for. A PSA 7 or 8 vintage rookie returns a meaningful multiple on raw; a PSA 5 does not.</p>

<p><strong>Thick cards / relics / patch autos.</strong> Skip grading. The holder adds cost and breakdown risk; the resale premium rarely clears the fee. For PC preservation, use a one-touch magnetic holder sized to the card's point thickness instead.</p>

<p><strong>High-print-run veterans.</strong> Skip grading. The buyer pool is thin; the grade premium rarely covers the fee. Sell raw to the destination market and stop trying to grade your way to a multiple.</p>

<p><strong>Low-numbered parallels (/25, /10, /5).</strong> Always grade. Low pop means PSA 10 commands a meaningful premium; surface and centering are unforgiving, which is why the pre-screening discipline in the <a href="/blog/grading-prep-system-before-submitting-to-psa">grading prep system guide</a> matters more than the fee.</p>

<p><strong>PC pieces you want preserved.</strong> Use a one-touch, not a slab. The slab adds authentication (you already trust yourself) and reduces accessibility (you want to handle the card).</p>

<p>The grader choice &mdash; PSA, BGS, SGC, or CGC &mdash; is a separate decision based on card type, buyer pool, and tier timing. The <a href="/blog/grading-service-comparison-psa-bgs-sgc-cgc">grading service comparison</a> works through that for each card category.</p>

<h2>Cost/benefit math example: a real card</h2>

<p>Market data moves fast &mdash; verify current comps against eBay sold listings before committing capital. The numbers below are illustrative; the structure is reusable.</p>

<p>You source a raw 2021 Panini Prizm Silver rookie at a local card show for $25. Pre-screen under bright light: corners clean, centering close to 60/40, surface free of print lines. Decide this is a PSA Value / Bulk candidate.</p>

<p>Inputs: raw $25, PSA Value fee $18, return shipping $4, eBay fee 13%, buyer shipping $4, turnaround ~6 weeks. Trailing comps: PSA 9 median $45; PSA 10 median $180. PSA 10 probability from pre-screen ~10%; PSA 9 ~35%; remainder trades at $20&ndash;$35.</p>

<p>Expected sale: (0.10 &times; $180) + (0.35 &times; $45) + (0.55 &times; $28) = $49.15.</p>

<p>Net at expected outcome: $49.15 &minus; $6.39 (eBay) &minus; $4 &minus; $25 &minus; $18 = &minus;$4.24. Slightly negative on a single card. The PSA 10 alone: $180 &minus; $23.40 &minus; $4 &minus; $25 &minus; $18 = $109.60. The PSA 9: $45 &minus; $5.85 &minus; $4 &minus; $25 &minus; $18 = &minus;$7.85.</p>

<p>The profit is in the 10% probability of PSA 10, weighted across a portfolio. One card and hoping is paying $18 for a coin flip that pays nothing on tails and $87 on heads. Ten submissions from a pre-screened cohort is a different EV.</p>

<p>For a reusable calculator with the fee/tier/turnaround inputs, use the <a href="/blog/sports-card-grading-side-hustle-profit-calculator">sports card grading side hustle profit calculator</a>.</p>

<p>The decision rule: submit when (a) the candidate pre-screens toward PSA 10, (b) that branch's comp is large enough to cover fee plus downstream costs, and (c) you have enough candidates to spread fee across the cohort. If any one is missing, the card stays raw.</p>

<div class="vault-next-read">
  <div class="vault-next-read-label">Recommended Next Read</div>
  <div class="vault-next-read-grid">
    <a href="/blog/sports-card-storage-and-display-protection-stack" class="vault-next-card">
      <div class="vault-next-card-title">Storage &amp; Display Protection Stack</div>
      <div class="vault-next-card-desc">The penny sleeve, top loader, one-touch, slab, and storage box layers that keep raw cards mint and slabs preserved &mdash; the holder side of this decision.</div>
    </a>
    <a href="/blog/grading-service-comparison-psa-bgs-sgc-cgc" class="vault-next-card">
      <div class="vault-next-card-title">Grading Service Comparison</div>
      <div class="vault-next-card-desc">PSA vs BGS vs SGC vs CGC across turnaround, cost tiers, resale premium, and submission strategy &mdash; pick the right grader once the card is committed to the path.</div>
    </a>
    <a href="/blog/sports-card-grading-side-hustle-profit-calculator" class="vault-next-card">
      <div class="vault-next-card-title">Grading Side Hustle Profit Calculator</div>
      <div class="vault-next-card-desc">The fee-tiered ROI calculator and submission tracker that takes the math above and runs it across a portfolio of submissions at scale.</div>
    </a>
  </div>
</div>
        $body_raw_vs_graded$,
        7,
        'Raw card vs graded slab: when to grade, when to keep it raw, and how to run the math before shipping. Comparison of the physical state, pros and cons, decision guide by card type, and a worked ROI example.',
        true
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    // ── UPDATE: Back-link in sports-card-storage-and-display-protection-stack ─
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>Storage methods comparison</h2>',
        '<p>The penny sleeve + card saver line item in the table above is the working cost basis for any raw card considering a slab submission &mdash; the <a href="/blog/raw-card-vs-graded-slab">raw card vs graded slab decision guide</a> walks through when the grade premium covers the fee and when it does not.</p>

<h2>Storage methods comparison</h2>'
      )
      WHERE slug = 'sports-card-storage-and-display-protection-stack'
      AND body NOT LIKE '%raw-card-vs-graded-slab%'
    `);

    // ── UPDATE: Back-link in grading-service-comparison-psa-bgs-sgc-cgc ───────
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>Submission strategy: pop reports and tier selection</h2>',
        '<p>For the raw-side context &mdash; what stays raw, what gets slabbed, and when the grade premium clears the fee &mdash; see the <a href="/blog/raw-card-vs-graded-slab">raw card vs graded slab comparison</a>.</p>

<h2>Submission strategy: pop reports and tier selection</h2>'
      )
      WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc'
      AND body NOT LIKE '%raw-card-vs-graded-slab%'
    `);

  },
};
