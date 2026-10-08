module.exports = {
  name: 'when_to_grade_decision_tree',
  up: async (client) => {

    // ── New Post: When to Grade Sports Cards — Decision Tree ──────────────────
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description, published)
      VALUES (
        'when-to-grade-sports-cards',
        'When to Grade Sports Cards: The Value, Condition, and Use-Case Decision Tree for PSA, BGS, SGC, and CGC',
        'collecting',
        'When to grade a card is not a single question; it is four stages in series &mdash; value threshold, condition pre-screen, use case by card type, and final grader selection. This decision tree walks each stage in order so the fee is paid only on cards where the grade premium clears the cost.',
        $body_when_to_grade$
<p>Every collector hits the same fork: keep the card raw in a <a href="/r/penny-sleeves" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>BCW penny sleeve</strong> <span class="affiliate-cta">Check Price &rarr;</span></a>, or commit to a PSA, BGS, SGC, or CGC submission and a six-week capital tie-up. The answer is not a single rule; it is a four-stage decision tree run in order. First, the value threshold: does the raw-to-graded spread clear fee plus downstream costs. Second, the condition pre-screen: does the card pre-screen toward the gem tier that earns the spread. Third, the use case: which grader fits the card type and the buyer pool. Fourth, the final grader selection &mdash; PSA, BGS, SGC, or CGC &mdash; based on the answer to the first three stages. The <a href="/blog/raw-card-vs-graded-slab">raw card vs graded slab comparison</a> works through the cost-benefit math in depth; this tree runs the rule across card type and grader fit.</p>

<p>The mistake most collectors make is skipping stage 1 and going straight from &ldquo;the card looks clean&rdquo; to a paid submission. A clean center does not clear the fee by itself &mdash; the pre-screen returns a probability of PSA 10, and the PSA 10 branch has to cover fee plus eBay plus shipping across a weighted cohort, not a single card. Run stage 1 before stage 2. Run stage 2 before stage 3. Run stage 3 before committing.</p>

<h2>Stage 1: The value threshold</h2>

<p>Stage 1 answers the only question that justifies a fee: does the card&rsquo;s expected grade premium cover fee plus downstream costs. Run the math with the realistic tier fee, the realistic turnaround, and the actual trailing comps &mdash; not optimistic numbers, not auction-house outlier sales.</p>

<p>The inputs are raw cost, tier fee, return shipping, eBay&rsquo;s 13% fee, buyer shipping, and the expected sale price weighted across PSA 10, PSA 9, PSA 8, and the off-grade remainder. The single-card expected-value worked example lives in the <a href="/blog/raw-card-vs-graded-slab">raw card vs graded slab comparison</a>; the reusable fee-tiered ROI formula is in the <a href="/blog/sports-card-grading-side-hustle-profit-calculator">sports card grading side hustle profit calculator</a>. Run the calculator on every candidate before filling out the submission form.</p>

<table class="comparison-table">
  <thead>
    <tr>
      <th>Outcome Branch</th>
      <th>Comp Multiple</th>
      <th>Pre-Screen Probability</th>
      <th>Fee-Clearing Rule</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>PSA 10 / BGS 9.5</td>
      <td>5&ndash;20&times; raw</td>
      <td>5&ndash;15%</td>
      <td>Rarely clears fee alone; portfolio EV flips it positive</td>
    </tr>
    <tr>
      <td>PSA 9 / BGS 9</td>
      <td>2&ndash;5&times; raw</td>
      <td>30&ndash;50%</td>
      <td>Most common profitable branch; the spine of any side hustle</td>
    </tr>
    <tr>
      <td>PSA 8 / BGS 8</td>
      <td>1&ndash;2&times; raw</td>
      <td>20&ndash;30%</td>
      <td>Marginal &mdash; covers fee only on premium-card comps</td>
    </tr>
    <tr>
      <td>PSA &le; 7 / off-grade</td>
      <td>&lt;1&times; raw</td>
      <td>10&ndash;25%</td>
      <td>Net negative once fees are paid; cancel pre-fee</td>
    </tr>
  </tbody>
</table>

<p>The decision rule for stage 1 is binary. If the candidate&rsquo;s weighted expected sale does not cover raw plus fee plus eBay plus shipping, the card stays raw. If it does, advance to stage 2 &mdash; but only on cards that pass the pre-screen. Mis-tiered submissions (a card that pre-screens to PSA 8 submitted at Express) burn the fee across the wrong tier.</p>

<h2>Stage 2: The condition pre-screen</h2>

<p>Stage 2 is the free upgrade trade. A bright-light evaluation pre-screens cards toward gem tier before the fee is paid; a card that pre-screens to PSA 9 is a fee candidate, a card that pre-screens to PSA 7 is a cost candidate. Hold a 6500K LED source 12 inches from the card and check the four corners, all four edges, the surface gloss, and the centering delta against the back. The full workflow lives in the <a href="/blog/grading-prep-system-before-submitting-to-psa">grading prep system guide</a>; the short version runs as:</p>

<ul>
<li><strong>Corners.</strong> All four square with no whitening. A single soft corner is a two-grade loss on chrome; a dinged corner is a PSA 9 cap.</li>
<li><strong>Edges.</strong> All four straight with no chipping. Chrome shows chipping as small bright specks; vintage shows edge wear as surface dullness.</li>
<li><strong>Surface gloss.</strong> Free of print lines, scratches, and dimples. Print lines run in straight parallel strokes; dimples are minute circular impressions.</li>
<li><strong>Centering.</strong> 60/40 closer to 55/45 on modern chrome; tighter on vintage. Centering is the variable pre-fee that the post-fee grade reflects.</li>
</ul>

<p>Pre-screen under bright light, then holder the survivors only. Penny sleeve, then <a href="/r/top-loaders" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Ultra Pro top loader</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> sized to point thickness for thin stock; <a href="/r/one-touch" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>magnetic one-touch holder</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> sized to point thickness for thick stock such as relics and patch autos. The top loader sits between penny sleeve and slab during the pre-fee waiting period, holding the card flat and clean.</p>

<p>The pre-screen output is a probability estimate &mdash; not a guarantee &mdash; that drives stage 3. Cards that pre-screen to PSA 10 with 70% confidence are Express-tier candidates. Cards that pre-screen to PSA 9 with 50% confidence are Regular or Value candidates. Cards that pre-screen to PSA 8 with 30% confidence are margin candidates; submit only when the cohort, not the single card, makes it profitable.</p>

<h2>Stage 3: Use case by card type</h2>

<p>Stage 3 maps card type to grader fit. The grader is not interchangeable across card categories; the buyer pool differs and the comp window timing differs. Match the right grader to the right card type before filling out the submission form.</p>

<ul>
<li><strong>Modern chrome rookies (2018+).</strong> <a href="/r/psa" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>PSA</strong> <span class="affiliate-cta">Visit Site &rarr;</span></a> &mdash; the buyer pool and the chrome comps both run through PSA&rsquo;s population. BGS only if the sub-grade story will clear a premium.</li>
<li><strong>Vintage rookies (1970s&ndash;1980s).</strong> <a href="/r/psa" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>PSA</strong> <span class="affiliate-cta">Visit Site &rarr;</span></a> for the PSA-anchored majority. <a href="/r/sgc" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>SGC</strong> <span class="affiliate-cta">Visit Site &rarr;</span></a> for strong-centering cards that can earn the SGC crossover premium.</li>
<li><strong>Thick relics, patch autos.</strong> <a href="/r/sgc" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>SGC</strong> <span class="affiliate-cta">Visit Site &rarr;</span></a> for thicker casings, or skip grading and use a one-touch sized to point thickness.</li>
<li><strong>High-print-run veterans, common parallels.</strong> Skip grading. Sell raw to the destination market.</li>
<li><strong>Low-numbered parallels (/25, /10, /5).</strong> <a href="/r/psa" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>PSA</strong> <span class="affiliate-cta">Visit Site &rarr;</span></a> always &mdash; low pop drives a premium that clears even modest fees. <a href="/r/bgs" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>BGS</strong> <span class="affiliate-cta">Visit Site &rarr;</span></a> if sub-grades earn a stickered premium.</li>
<li><strong>PC keepers, irreplaceable pieces.</strong> Skip grading. Authentication adds nothing; encapsulation reduces accessibility. One-touch, not slab.</li>
<li><strong>TCG &mdash; Pokémon, MTG, Lorcana.</strong> <a href="/r/cgc" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>CGC</strong> <span class="affiliate-cta">Visit Site &rarr;</span></a> for the bulk of TCG submissions. The <a href="/blog/cgc-grading-guide-pokemon-mtg-tcg">CGC grading guide for Pokémon and MTG collectors</a> works through that segment in depth.</li>
</ul>

<p>Stage 3 output is a shortlist of one to three graders ranked by fit. The final grader choice narrows it further on buyer pool and tier timing.</p>

<h2>Stage 4: Which grader &mdash; PSA, BGS, SGC, or CGC</h2>

<p>Stage 4 picks from the shortlist. The full PSA vs BGS vs SGC vs CGC breakdown lives in the <a href="/blog/grading-service-comparison-psa-bgs-sgc-cgc">grading service comparison</a>; the four-grader row used inside this tree:</p>

<table class="comparison-table">
  <thead>
    <tr>
      <th>Grader</th>
      <th>Best-Fit Card Type</th>
      <th>Buyer Pool</th>
      <th>Default Turnaround</th>
      <th>Send When</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/r/psa" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>PSA</strong> <span class="affiliate-cta">Visit Site &rarr;</span></a></td>
      <td>Chrome rookies, vintage, low-numbered parallels</td>
      <td>Largest, eBay-anchored</td>
      <td>Value 8&ndash;14 wks; Regular 4&ndash;8; Express 2&ndash;4</td>
      <td>Default for sports; high ceiling on any card category</td>
    </tr>
    <tr>
      <td><a href="/r/bgs" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>BGS</strong> <span class="affiliate-cta">Visit Site &rarr;</span></a></td>
      <td>Sub-grade stories &mdash; centering plus edge plus surface</td>
      <td>Smaller, premium-skewed</td>
      <td>Similar tier-based windows; slower economy</td>
      <td>Premium on BGS 9.5/10 Black Label; parity on simple grades</td>
    </tr>
    <tr>
      <td><a href="/r/sgc" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>SGC</strong> <span class="affiliate-cta">Visit Site &rarr;</span></a></td>
      <td>Tighter-graded vintage, thick relics, 1980s/90s crossover</td>
      <td>Mid-size, registry-active</td>
      <td>Faster on economy versus PSA; consistent across categories</td>
      <td>Solid mid-tier; outpaces PSA for premium-grade vintage</td>
    </tr>
    <tr>
      <td><a href="/r/cgc" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>CGC</strong> <span class="affiliate-cta">Visit Site &rarr;</span></a></td>
      <td>TCG &mdash; Pokémon, MTG, Lorcana; some crossover vintage</td>
      <td>Largest in TCG; smaller for sports</td>
      <td>Faster on economy than PSA; consistent tier structure</td>
      <td>Premium in TCG; parity in sports crossover</td>
    </tr>
  </tbody>
</table>

<p>The decision rule for stage 4: send to the grader whose buyer pool is dominant for the card type and whose default turnaround lands within the card&rsquo;s comp window. A chrome rookie outside an active comp window is PSA Regular or Value &mdash; not PSA Express. A vintage with centering strong enough for the SGC crossover is SGC even when PSA is the default. A TCG card is CGC unless the comp destination is PSA-anchored. The grader is the last filter &mdash; the first three stages already determined whether the card should have been submitted.</p>

<h2>The end-state across the four stages</h2>

<p>Across the tree, the rule is: (a) value threshold passes &mdash; weighted sale covers raw plus fee plus downstream costs across a cohort, not a single card; (b) pre-screen clears toward gem tier under bright light; (c) use case maps to a shortlist of one to three graders; (d) grader shortlist narrows to the one whose buyer pool is dominant and whose turnaround lands within the comp window. If any one of (a) through (d) fails, the card stays raw. The end state is a smaller batch and a higher hit rate &mdash; the side-hustle discipline, applied as a routine instead of a one-off hedge.</p>

<div class="vault-cta">
  <div class="vault-cta-label">From the Vault</div>
  <div class="vault-cta-body">
    <strong>Collector&rsquo;s Vault Starter Kit</strong> &mdash; the four-stage decision worksheet, the bright-light pre-screen checklist, the grader-fit matrix by card type, and the per-tier turnaround log that closes the loop on every batch. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit &rarr;</a>
  </div>
</div>

<div class="vault-next-read">
  <div class="vault-next-read-label">Recommended Next Read</div>
  <div class="vault-next-read-grid">
    <a href="/blog/raw-card-vs-graded-slab" class="vault-next-card">
      <div class="vault-next-card-title">Raw Card vs Graded Slab</div>
      <div class="vault-next-card-desc">The cost-benefit math for whether a card should be submitted at all &mdash; the stage-1 value threshold this decision tree expands into the four-stage filter across value, condition, use case, and grader.</div>
    </a>
    <a href="/blog/grading-service-comparison-psa-bgs-sgc-cgc" class="vault-next-card">
      <div class="vault-next-card-title">Grading Service Comparison</div>
      <div class="vault-next-card-desc">PSA vs BGS vs SGC vs CGC across buyer pool, default turnaround, price-ceiling tier, and submission strategy &mdash; the stage-4 grader breakdown this decision tree stays narrow through.</div>
    </a>
    <a href="/blog/psa-2026-submission-checklist" class="vault-next-card">
      <div class="vault-next-card-title">PSA Submission Checklist 2026</div>
      <div class="vault-next-card-desc">The end-to-end PSA workflow that runs once the four stages resolve &mdash; account setup, card preparation, tier selection, shipping protocol, and expected turnaround.</div>
    </a>
  </div>
</div>
        $body_when_to_grade$,
        6,
        'When to grade sports cards: the value threshold, condition pre-screen, use case by card type, and grader selection rule for PSA, BGS, SGC, and CGC. A four-stage decision tree that filters fee candidates before they ship.',
        true
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    // ── UPDATE: Back-link in grading-service-comparison-psa-bgs-sgc-cgc ───────
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>Submission strategy: pop reports and tier selection</h2>',
        '<p>For the upstream decision tree &mdash; the value threshold, condition pre-screen, use-case stage, and grader selection rule &mdash; see the <a href="/blog/when-to-grade-sports-cards">when to grade sports cards decision tree</a>.</p>

<h2>Submission strategy: pop reports and tier selection</h2>'
      )
      WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc'
      AND body NOT LIKE '%when-to-grade-sports-cards%'
    `);

    // ── UPDATE: Back-link in raw-card-vs-graded-slab ──────────────────────────
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>When to grade: a decision guide by card type and age</h2>',
        '<p>For a structured four-stage decision tree &mdash; value threshold, condition pre-screen, use case by card type, and final grader selection &mdash; see the <a href="/blog/when-to-grade-sports-cards">when to grade sports cards guide</a>.</p>

<h2>When to grade: a decision guide by card type and age</h2>'
      )
      WHERE slug = 'raw-card-vs-graded-slab'
      AND body NOT LIKE '%when-to-grade-sports-cards%'
    `);

  },
};
