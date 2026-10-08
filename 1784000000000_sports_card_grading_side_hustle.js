module.exports = {
  name: 'sports_card_grading_side_hustle',
  up: async (client) => {

    // ── New Post: Sports Card Grading Side Hustle — Profit Calculator ──────────
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description, published)
      VALUES (
        'sports-card-grading-side-hustle-profit-calculator',
        'Sports Card Grading Side Hustle: The Profit Calculator That Tells You If a Card Is Worth Submitting',
        'collecting',
        'Grading for profit is raw-to-graded arbitrage — buy raw, pay the fee, sell the slab. Submission cost vs. grade premium, which cards grade best for resale, flipping ROI worked through, and the profit calculator that decides before you ship.',
        $body_grading_hustle$
<p>Most card flips sell for a small premium over the raw price. A grade flip is different — the same raw card can return five, ten, or twenty times the submission fee if the grade comes back high enough. That spread is the sports card grading side hustle.</p>

<p>Buy raw at the low end of their condition range, submit to <a href="/r/psa" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>PSA</strong> <span class="affiliate-cta">Check Price &rarr;</span></a>, <a href="/r/bgs" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>BGS</strong> <span class="affiliate-cta">Check Price &rarr;</span></a>, <a href="/r/sgc" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>SGC</strong> <span class="affiliate-cta">Check Price &rarr;</span></a>, or <a href="/r/cgc" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>CGC</strong> <span class="affiliate-cta">Check Price &rarr;</span></a>, list the slab on eBay. The grading fee is a cost of goods, like shipping or eBay's 13%. The decision: does the grade premium cover the fee plus the time and capital tied up during turnaround?</p>

<h2>What grading-as-a-side-hustle actually is</h2>

<p>Grading authenticates a card and assigns a numeric condition label. The market pays a higher price for the labeled card; that price difference, minus fees, is the profit. Run the math for every candidate: (expected sale price) - (eBay fees, ~13%) - (shipping, ~$4) - (card cost) - (grading fee) = net profit.</p>

<p>Two things make this a side hustle rather than a hobby: volume (twenty submissions a month is a small business; one submission is a hobby expense) and an inventory loop where capital from sold slabs funds the next raw batch.</p>

<h2>Submission costs vs. grade premiums</h2>

<p>The grading fee is the input you control; the grade premium is the output the market controls. Most failed grade flips fail because the buyer ignored one of those two numbers.</p>

<table class="comparison-table">
  <thead>
    <tr>
      <th>Tier</th>
      <th>Typical Fee</th>
      <th>Turnaround</th>
      <th>Best Used For</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>PSA Value / Bulk</td>
      <td>Lowest per-card; minimum order sizes</td>
      <td>Months — economy</td>
      <td>High-volume sourcing in the $25–$200 band with strong PSA 9/10 comps</td>
    </tr>
    <tr>
      <td>PSA Regular / Economy</td>
      <td>Mid-tier, single-card</td>
      <td>Weeks to months</td>
      <td>Single submissions under $500 declared value</td>
    </tr>
    <tr>
      <td>PSA Express</td>
      <td>Higher fee, faster return</td>
      <td>Days to weeks</td>
      <td>Market-sensitive cards — new rookies, trending players</td>
    </tr>
    <tr>
      <td>PSA Walkthrough</td>
      <td>Premium fee</td>
      <td>Same day or next day</td>
      <td>$1,000+ raw inputs at a show</td>
    </tr>
    <tr>
      <td>BGS / SGC standard</td>
      <td>Comparable to PSA regular</td>
      <td>Weeks to months</td>
      <td>Vintage or specialty cards; default to PSA for liquidity elsewhere</td>
    </tr>
    <tr>
      <td>CGC sub-tier</td>
      <td>Competitive with PSA mid-tier</td>
      <td>Faster economy than PSA normally</td>
      <td>Non-baseball, non-sports cards — Pokémon, MTG, select non-sport sets</td>
    </tr>
  </tbody>
</table>

<p>The honest read: the cheapest tier wins only if the grade premium clears the fee. A long-economy bulk submission ties up capital for months — capital that cannot redeploy. Build tier decisions around both fee and turnaround.</p>

<h2>Which cards grade best for resale</h2>

<p>The cards with the highest grade-premium-to-fee ratios share three properties: high raw volume (buyers and comps exist), tight grade distribution (a 9 or 10 is a real upgrade), and a buyer pool that pays a premium for the slab.</p>

<ul>
<li><strong>Modern Prizm Silver Prizms (football, basketball).</strong> High print runs create a deep raw market; PSA 10 populations stay modest because chrome surfaces are hard to grade gem. The raw-to-PSA 10 spread on rookie silvers is the largest in the modern card market.</li>
<li><strong>Topps Chrome UFC and FIFA subsets.</strong> Smaller print runs than the flagship sets, more marginal centering, and tight PSA 10 pop create meaningful slab premiums with less competition.</li>
<li><strong>Vintage Topps Baseball rookies in the 1970s and 1980s.</strong> Centering and print defects dominate the grade outcome. Raw vintage is cheap; a clean PSA 7 or 8 returns a meaningful multiple, and vintage forgives lower top grades.</li>
<li><strong>Low-numbered modern parallels (/25, /10, /5).</strong> Low pop; PSA 10 sells at multiples of raw that dwarf the fee. Surface and centering are unforgiving — pre-screen carefully.</li>
</ul>

<p>Avoid grading base cards, high-print-run veterans, or cards where PSA 9 and PSA 10 sale prices are within $10 of each other. The fee eats the spread.</p>

<h2>Flipping ROI: a working example</h2>

<p>Market data moves fast — verify current comps against eBay sold listings before committing capital. Treat any figure here as illustrative.</p>

<p>Suppose you source a raw modern Prizm Silver rookie at a show for $25. Pre-screen under bright light — corners clean, centering close to 60/40, surface free of print lines. Submit at PSA Value / Bulk. Six weeks later it returns PSA 9. PSA 9 comp over the trailing 90 days: $45 median. PSA 10 comp: $180 median, with a realistic 10% probability from your pre-screening. Expected value: 90% × $45 + 10% × $180 = $58.50.</p>

<p>Subtract eBay's 13% fee ($7.60), $4 shipping, $25 raw, $18 grading fee. Net at the expected outcome: $3.90 — effectively break-even. The PSA 10 outcome is the real profit: $180 − $23.40 − $4 − $25 − $18 = $109.60.</p>

<p>The lesson: most of the expected value of a grade flip comes from the small probability of a top grade. The system is not "submit everything and hope" — it is "submit cards whose pre-screening profile tilts the distribution toward the top grade."</p>

<div class="vault-cta">
  <div class="vault-cta-label">From the Vault</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> — grading-tier decision guide, raw-to-graded ROI calculator, and the pre-screening checklist that tilts top-grade probability in your favor. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit →</a>
  </div>
</div>

<h2>The profit calculator</h2>

<pre><code>Expected sale = (PSA 10 probability × PSA 10 comp)
              + (PSA 9 probability × PSA 9 comp)
              + lower-tail grades weighted by their comp

Net profit = expected sale − 13% eBay fees − $4 shipping
           − raw card cost − grading fee − slabbed shipping</code></pre>

<p>If net profit at your probability-weighted comp is under 20% of raw cost, the grade flip is not worth it. Track two extras once you have volume: the failure rate (cards returning "Authentic" or with cracks are a loss equal to raw plus fee) and resale time (a slab sitting unsold for 90 days is still capital that cannot redeploy).</p>

<h2>When grading earns — and when it doesn't</h2>

<p>The hardest discipline is passing on cards where the math is close. Three rules:</p>

<p><strong>Only grade when the multiplier exceeds the fee.</strong> A raw $10 card with a PSA 9 comp of $11 and a PSA 10 comp of $13 has no profitable outcome — both results sit below the grading fee. Submitting on hope is paying for the privilege of losing.</p>

<p><strong>Only grade cards with meaningful top-grade probability.</strong> Centering problems, print lines, and corner dings collapse PSA 10 probability to near zero. Expected value then drops to the PSA 9 comp; if that does not justify the fee, sell raw or keep as a PC piece.</p>

<p><strong>Only grade when the buyer pool pays the slab premium.</strong> Use <a href="/r/card-loupe" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>a magnifier loupe</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> for pre-screening, then verify on eBay sold listings that grader-labeled buyers exist at the grade you expect. Thin buyer pools depress realized sale prices below the median comp.</p>

<h2>Pre-shipment prep</h2>

<p>The grade outcome is not luck. Submission packaging skews toward the top grade.</p>

<p><strong>Holder selection.</strong> Raw cards go into <a href="/r/penny-sleeves" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>penny sleeves</strong> <span class="affiliate-cta">Check Price &rarr;</span></a>, then <a href="/r/top-loaders" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>top loaders</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> sized to point thickness, then card savers for the submission. A damaged top loader wall can nick a corner in transit.</p>

<p><strong>Slab storage.</strong> Returned slabs go into <a href="/r/one-touch" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>one-touch magnetic holders</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> for inventory display and pre-listing photography.</p>

<p><strong>Raw sourcing.</strong> Where you buy sets the spread. <a href="/r/ebay" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>eBay lots and misspelled auctions</strong> <span class="affiliate-cta">Check Price &rarr;</span></a>, local card shows, and estate sales are the channels where raw prices sit below comp-adjusted slab prices. Buy there, sell slabbed elsewhere.</p>

<h2>The side-hustle checklist</h2>

<ol>
<li>Pull 30–60 days of comp history on every card type in your sourcing rotation.</li>
<li>Identify three to five card types where the raw-to-graded multiplier clears the fee.</li>
<li>Source raw in those categories at the lowest available price for the condition profile you want.</li>
<li>Pre-screen each candidate under bright light with a loupe: centering, corners, edges, surface.</li>
<li>Submit in tier-appropriate batches — Value/Bulk for low-fee candidates, Regular for singles, Express only when market timing matters.</li>
<li>Track every submission: card, source, raw cost, tier, grade back, sale price, fees, net, days held.</li>
<li>Reinvest. Compounding raw inventory bankroll is what scales hobby to side hustle.</li>
</ol>

<p>This is not a get-rich scheme. Most cards will come back PSA 8 or 9 — that is the design of the system, not a failure. Run it monthly on the right categories and the data tells you where to specialize.</p>

<div class="vault-cta">
  <div class="vault-cta-label">System Reference</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> — the raw-to-graded ROI calculator, tier decision matrix, and submission tracker designed for collectors running grading as a real side hustle. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit →</a>
  </div>
</div>

<div class="vault-next-read">
  <div class="vault-next-read-label">Recommended Next Read</div>
  <div class="vault-next-read-grid">
    <a href="/blog/grading-service-comparison-psa-bgs-sgc-cgc" class="vault-next-card">
      <div class="vault-next-card-title">Grading Service Comparison</div>
      <div class="vault-next-card-desc">PSA vs BGS vs SGC vs CGC across turnaround, cost tiers, resale premium, and submission strategy — pick the right grader per card type.</div>
    </a>
    <a href="/blog/grading-prep-system-before-submitting-to-psa" class="vault-next-card">
      <div class="vault-next-card-title">Grading Prep System</div>
      <div class="vault-next-card-desc">The pre-submission workflow: bright-light evaluation, centering measurement, packing protocol, and tier selection framework.</div>
    </a>
    <a href="/blog/sports-card-flipping-workflow-buy-low-sell-high-system" class="vault-next-card">
      <div class="vault-next-card-title">Card Flipping Workflow</div>
      <div class="vault-next-card-desc">Sourcing, comp analysis, batch listing, and profit tracking — the operational backbone for a card flipping side hustle.</div>
    </a>
  </div>
</div>
        $body_grading_hustle$,
        7,
        'Sports card grading side hustle: raw-to-graded arbitrage, submission cost vs. grade premium, which cards grade best for resale, flipping ROI worked through a real example, and the profit calculator that decides before you ship.',
        true
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    // ── UPDATE: Back-link in grading-service-comparison-psa-bgs-sgc-cgc ───────
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>Submission strategy: pop reports and tier selection</h2>',
        '<p>For the side-hustle math — raw &rarr; graded profit, ROI per grade tier, and which cards grade best for resale — see the <a href="/blog/sports-card-grading-side-hustle-profit-calculator">sports card grading side hustle profit calculator</a>.</p>

<h2>Submission strategy: pop reports and tier selection</h2>'
      )
      WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc'
      AND body NOT LIKE '%sports-card-grading-side-hustle-profit-calculator%'
    `);

    // ── UPDATE: Back-link in sports-card-flipping-workflow-buy-low-sell-high-system ─
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>Step 3: Setting your buy price and target margin</h2>',
        '<p>For the full raw-to-graded ROI breakdown — submission costs, grade probabilities, and which cards grade best for the fee — see the <a href="/blog/sports-card-grading-side-hustle-profit-calculator">sports card grading side hustle profit calculator</a>.</p>

<h2>Step 3: Setting your buy price and target margin</h2>'
      )
      WHERE slug = 'sports-card-flipping-workflow-buy-low-sell-high-system'
      AND body NOT LIKE '%sports-card-grading-side-hustle-profit-calculator%'
    `);

  },
};
