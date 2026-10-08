module.exports = {
  name: 'grading_fee_turnaround_reference',
  up: async (client) => {

    // ── New Post: PSA vs BGS vs SGC vs CGC Fee & Turnaround Reference Card ──
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description, published)
      VALUES (
        'grading-fee-turnaround-reference',
        'PSA vs BGS vs SGC vs CGC: 2026 Fee &amp; Turnaround Reference Card &mdash; Side-by-Side Tier Comparison',
        'collecting',
        'PSA, BGS, SGC, and CGC each price declared-value tiers from Economy to WalkThrough differently, and each publishes different turnaround windows by tier. This reference card puts all four side-by-side in one sortable table so the fee plus turnaround math fits on one page.',
        $body_fee_reference$
<p>The <a href="/blog/grading-service-comparison-psa-bgs-sgc-cgc">grading service comparison</a> walks through which grader fits which card type and why a PSA submission is not always the right call. The <a href="/blog/when-to-grade-sports-cards">when to grade decision tree</a> runs the four-stage filter that determines whether a card should be submitted at all. This page is the third leg of that stool &mdash; the actual fee schedule and current turnaround window for every grader × tier combination, in one sortable table, with the declared-value cap that drives insurance and the submission URL on each row.</p>

<p>Use the table as a working reference, not as a quote. Each of the four graders updates tier pricing and window ranges periodically &mdash; the row values here reflect public 2026 program-tier rates and normal-demand turnaround windows, but the live number lives on each grader's submission portal (linked per row). Pull the current fee and current window from the portal before committing a card; pull the current comp from eBay sold listings before pricing the slab.</p>

<h2>The four-grader fee &amp; turnaround grid</h2>

<p>Click any column header to sort. Fee is listed in USD per card at the typical declared-value cap for the tier &mdash; members of each grader's paid submission tier typically see $5&ndash;$10 off per card versus the public Member rate, which is noted in the methodology below.</p>

<table class="comparison-table comparison-table--sortable">
  <thead>
    <tr>
      <th data-sort-col="grader">Grader</th>
      <th data-sort-col="tier">Tier</th>
      <th data-sort-col="cap">Declared Value Cap</th>
      <th data-sort-col="fee">Fee (per card)</th>
      <th data-sort-col="turnaround">Current Turnaround Window</th>
      <th data-sort-col="fit">Best-Fit Card Type</th>
      <th data-sort-col="url">Submission URL</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/r/psa" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>PSA</strong></a></td>
      <td>Value / Bulk</td>
      <td data-sort-value="199">Up to $199</td>
      <td data-sort-value="18">~$18 / card</td>
      <td data-sort-value="11">8&ndash;14 weeks</td>
      <td>Bulk batches where individual cards are not market-sensitive; fee-times-count economics on 20+ cards</td>
      <td><a href="https://www.psacard.com/services/tradingcardgrading" target="_blank" rel="noopener noreferrer">PSACard.com</a></td>
    </tr>
    <tr>
      <td><a href="/r/psa" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>PSA</strong></a></td>
      <td>Regular</td>
      <td data-sort-value="499">Up to $499</td>
      <td data-sort-value="25">~$25 / card</td>
      <td data-sort-value="6">4&ndash;8 weeks</td>
      <td>Default tier for pre-screened cohorts; mid-range fee, mid-range window</td>
      <td><a href="https://www.psacard.com/services/tradingcardgrading" target="_blank" rel="noopener noreferrer">PSACard.com</a></td>
    </tr>
    <tr>
      <td><a href="/r/psa" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>PSA</strong></a></td>
      <td>Express</td>
      <td data-sort-value="1499">Up to $1,499</td>
      <td data-sort-value="75">~$75 / card</td>
      <td data-sort-value="3">2&ndash;4 weeks</td>
      <td>Market-sensitive cards with an active comp window &mdash; recent release, hot player move, release-date rookie</td>
      <td><a href="https://www.psacard.com/services/tradingcardgrading" target="_blank" rel="noopener noreferrer">PSACard.com</a></td>
    </tr>
    <tr>
      <td><a href="/r/psa" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>PSA</strong></a></td>
      <td>WalkThrough</td>
      <td data-sort-value="10000">Higher (in-person)</td>
      <td data-sort-value="150">~$150+ / card</td>
      <td data-sort-value="0">Same day &ndash; 1 week</td>
      <td>Convention floor submissions only; reserved for high-value cards in active comp windows</td>
      <td><a href="https://www.psacard.com/services/tradingcardgrading" target="_blank" rel="noopener noreferrer">PSACard.com</a></td>
    </tr>
    <tr>
      <td><a href="/r/bgs" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>BGS</strong></a></td>
      <td>Economy</td>
      <td data-sort-value="199">Up to $199</td>
      <td data-sort-value="18">~$18 / card</td>
      <td data-sort-value="9">6&ndash;12 weeks</td>
      <td>Bulk tiers with batch discount; sub-$200 single cards where the sub-grade premium is not in play</td>
      <td><a href="https://www.beckett.com/grading" target="_blank" rel="noopener noreferrer">Beckett.com</a></td>
    </tr>
    <tr>
      <td><a href="/r/bgs" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>BGS</strong></a></td>
      <td>Standard</td>
      <td data-sort-value="499">Up to $499</td>
      <td data-sort-value="30">~$30 / card</td>
      <td data-sort-value="5">3&ndash;6 weeks</td>
      <td>Default single-card submission; sub-grade transparency on centering, corners, edges, surface</td>
      <td><a href="https://www.beckett.com/grading" target="_blank" rel="noopener noreferrer">Beckett.com</a></td>
    </tr>
    <tr>
      <td><a href="/r/bgs" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>BGS</strong></a></td>
      <td>Express</td>
      <td data-sort-value="1499">Up to $1,499</td>
      <td data-sort-value="75">~$75 / card</td>
      <td data-sort-value="2">1&ndash;3 weeks</td>
      <td>Market-sensitive cards where the BGS 9.5 sub-grade premium clears the fee premium</td>
      <td><a href="https://www.beckett.com/grading" target="_blank" rel="noopener noreferrer">Beckett.com</a></td>
    </tr>
    <tr>
      <td><a href="/r/bgs" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>BGS</strong></a></td>
      <td>WalkThrough</td>
      <td data-sort-value="10000">Higher (in-person)</td>
      <td data-sort-value="150">~$150+ / card</td>
      <td data-sort-value="0">Same day &ndash; 1 week</td>
      <td>Convention floor only; BGS Black Label candidates where the buyer is waiting on a sub-grade slab</td>
      <td><a href="https://www.beckett.com/grading" target="_blank" rel="noopener noreferrer">Beckett.com</a></td>
    </tr>
    <tr>
      <td><a href="/r/sgc" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>SGC</strong></a></td>
      <td>Economy</td>
      <td data-sort-value="199">Up to $199</td>
      <td data-sort-value="15">~$15 / card</td>
      <td data-sort-value="6">4&ndash;8 weeks</td>
      <td>Bulk vintage batches; sub-$200 single cards on a budget</td>
      <td><a href="https://www.sgccards.com/grading/" target="_blank" rel="noopener noreferrer">SGCCards.com</a></td>
    </tr>
    <tr>
      <td><a href="/r/sgc" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>SGC</strong></a></td>
      <td>Standard</td>
      <td data-sort-value="499">Up to $499</td>
      <td data-sort-value="25">~$25 / card</td>
      <td data-sort-value="3">2&ndash;4 weeks</td>
      <td>Default single-card vintage submission; strong-centering vintage chasing the SGC crossover premium</td>
      <td><a href="https://www.sgccards.com/grading/" target="_blank" rel="noopener noreferrer">SGCCards.com</a></td>
    </tr>
    <tr>
      <td><a href="/r/sgc" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>SGC</strong></a></td>
      <td>Express</td>
      <td data-sort-value="1499">Up to $1,499</td>
      <td data-sort-value="60">~$60 / card</td>
      <td data-sort-value="1">1&ndash;2 weeks</td>
      <td>Market-sensitive vintage with active comp window; faster than PSA Express at this tier</td>
      <td><a href="https://www.sgccards.com/grading/" target="_blank" rel="noopener noreferrer">SGCCards.com</a></td>
    </tr>
    <tr>
      <td><a href="/r/sgc" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>SGC</strong></a></td>
      <td>Premier</td>
      <td data-sort-value="10000">Higher (in-person)</td>
      <td data-sort-value="150">~$150+ / card</td>
      <td data-sort-value="0">Same day &ndash; 1 week</td>
      <td>Convention floor (SGC Premier) &mdash; top-graded vintage where the buyer is on-site</td>
      <td><a href="https://www.sgccards.com/grading/" target="_blank" rel="noopener noreferrer">SGCCards.com</a></td>
    </tr>
    <tr>
      <td><a href="/r/cgc" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>CGC</strong></a></td>
      <td>Economy</td>
      <td data-sort-value="199">Up to $199</td>
      <td data-sort-value="25">~$25 / card</td>
      <td data-sort-value="6">4&ndash;8 weeks</td>
      <td>Bulk TCG and non-sport batches; CGC card volume is newer so economy tier often clears faster than PSA's</td>
      <td><a href="https://www.cgccards.com/" target="_blank" rel="noopener noreferrer">CGCcards.com</a></td>
    </tr>
    <tr>
      <td><a href="/r/cgc" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>CGC</strong></a></td>
      <td>Standard</td>
      <td data-sort-value="499">Up to $499</td>
      <td data-sort-value="30">~$30 / card</td>
      <td data-sort-value="3">2&ndash;4 weeks</td>
      <td>Default TCG submission &mdash; Pokémon, MTG, Lorcana; consistent turnaround tier structure</td>
      <td><a href="https://www.cgccards.com/" target="_blank" rel="noopener noreferrer">CGCcards.com</a></td>
    </tr>
    <tr>
      <td><a href="/r/cgc" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>CGC</strong></a></td>
      <td>Express</td>
      <td data-sort-value="1499">Up to $1,499</td>
      <td data-sort-value="75">~$75 / card</td>
      <td data-sort-value="2">1&ndash;3 weeks</td>
      <td>Market-sensitive TCG and modern release; competing for the CGC Pristine 10 premium on niche prints</td>
      <td><a href="https://www.cgccards.com/" target="_blank" rel="noopener noreferrer">CGCcards.com</a></td>
    </tr>
    <tr>
      <td><a href="/r/cgc" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>CGC</strong></a></td>
      <td>WalkThrough</td>
      <td data-sort-value="10000">Higher (in-person)</td>
      <td data-sort-value="150">~$150+ / card</td>
      <td data-sort-value="0">Same day &ndash; 1 week</td>
      <td>Convention floor only; CGC In-House signing events for high-value TCG</td>
      <td><a href="https://www.cgccards.com/" target="_blank" rel="noopener noreferrer">CGCcards.com</a></td>
    </tr>
  </tbody>
</table>

<h2>Methodology: how to read the table</h2>

<p>Three variables drive the row values &mdash; declared value tier, member vs. public fee rate, and current demand window. They are worth understanding because the table value is misleading without them.</p>

<p><strong>Declared-value tiers.</strong> Each grader assigns a per-card declared-value cap to every submission tier. The cap drives both the inbound shipping insurance the grader carries and the maximum liability on a lost or damaged card. Expressions 199, 499, and 1499 are the dominant breakpoints on the public Member rate across all four graders; higher dollar caps on the Premium / Diamond / paid tier unlock higher tiers and higher per-card declared values. For cards above $1,500 in raw value, the submission form generally routes to the highest tier at the grader &mdash; check the grader portal for the exact cap at your membership level.</p>

<p><strong>Member vs. public fee.</strong> All four graders discount per-card fees by $5&ndash;$10 when the submitter is on a paid membership tier (PSA Premium, Beckett Grading membership, SGC Dealer plan, etc.). A PSA Economy at $25 public is closer to $18 on Premium. The rows in the table above list the typical fee at each tier for the public Member submitter &mdash; verify your effective fee at the form, not at the table.</p>

<p><strong>Turnaround windows.</strong> Each grader's published window is itself an estimate, and the actual returned time moves with backlog. PSA economy tiers have historically run 8&ndash;14 weeks in normal conditions and stretched to 6&ndash;18 months during 2020&ndash;2022 demand spikes. SGC runs faster at economy during normal periods; CGC's card division is newer and volume has been historically less volatile. Plan any tier choice around the realistic window for normal-demand conditions; add a buffer for the cycle you are submitting in.</p>

<p>The table reads as a reference once these three variables are fixed. The fee and the turnaround move together up the tier ladder &mdash; higher fee, faster window, higher declared-value cap. Lower fee, slower window, lower cap. The tier choice is the trade-off in the row, not the row-fee itself; the comparison across graders is the trade-off in the column.</p>

<h2>How to use the grid in practice</h2>

<p>The grid is most useful at three decision points in the workflow this vault has been building.</p>

<p><strong>Point 1: tier selection on a single submission.</strong> When the four-stage <a href="/blog/when-to-grade-sports-cards">decision tree</a> returns one grader for one card, the grid resolves which tier. Run the weighted expected sale from the <a href="/blog/raw-card-vs-graded-slab">raw card vs graded slab</a> math; pull the declared value of the card under realistic PSA 10 / BGS 9.5 / SGC 10 / CGC Pristine 10 conditions; pick the lowest tier whose declared-value cap covers the card. Default to that tier; upgrade only when the comp window will close before the window opens.</p>

<p><strong>Point 2: grader-to-grader comparison on a hot card.</strong> When the four-stage tree returns two graders and the card is comp-window sensitive, the grid rows for that declared-value cap across both graders resolve which grader is faster at the right fee. Turnaround is the tiebreaker &mdash; the fee will be close at the same tier across all four; the window is where the difference compounds.</p>

<p><strong>Point 3: methodology spot-check when stale.</strong> When a fee or window on the table is more than a quarter old, refresh from the grader portal linked in the Submission URL column. The redirect to the grader portal is deliberate &mdash; the table is a working comparison, not a published quote, and the live number lives on the live page.</p>

<h2>Cross-grader notes that don't fit in the table</h2>

<p>Three structural differences across the four graders are worth noting because they do not show up in a fee + window row comparison and they drive grader fit on specific cards.</p>

<p><strong>BGS sub-grade transparency.</strong> BGS is the only one of the four that returns sub-grades (centering, corners, edges, surface) on the label. A BGS 9.5 with all four sub-grades at 9.5 is a &ldquo;Black Label&rdquo; slab and trades at a meaningful premium over a PSA 10 in the segments where BGS buyer pools are deep (Prizm basketball, premium vintage baseball, sub-grade storytelling cards). A BGS 9 with mixed 9 / 9.5 sub-grades trades below a PSA 9 because the detail exposes the variance. The grid does not capture this &mdash; the fee and the window are tier-comparable, but the realized value on the back end is not.</p>

<p><strong>SGC slab design and vintage registry.</strong> SGC's clean slab design has earned it the vintage registry by default and a fast-economy tier reputation. Strong-centering vintage cards that pre-screen to SGC 96+ / 100 have an SGC crossover premium that can clear the PSA cap on the same card. The two-week tier at SGC is meaningfully faster than the same tier at PSA, and that window differential is the reason fee-comparable tiers at SGC price in lower across the same window at PSA.</p>

<p><strong>CGC comic-collector brand.</strong> CGC's brand carries weight with the collector base that has spent decades trusting CGC on comics, and that brand translated directly to TCG when CGC opened its card division. The grid treats CGC as fee-comparable and slightly faster at economy versus PSA on a card-for-card basis &mdash; but the realized value on the back end is materially different between PSA and CGC on TCG, and that gap is where the grader fit decision lives. See the <a href="/blog/cgc-grading-guide-pokemon-mtg-tcg">CGC grading guide</a> on where CGC is the right call by card type.</p>

<p>The table above and the structural notes below are designed to be quoted, cited, and linked to. Hobby blogs, Wikis, and comp trackers are welcome to reference any row with attribution back to this page.</p>

<div class="vault-cta">
  <div class="vault-cta-label">From the Vault</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> &mdash; the per-tier turnaround log, the grader-fit worksheet by card type, and the cost-benefit math template that closes the loop on every batch once the table above resolves which tier at which grader. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit &rarr;</a>
  </div>
</div>

<div class="vault-next-read">
  <div class="vault-next-read-label">Recommended Next Read</div>
  <div class="vault-next-read-grid">
    <a href="/blog/grading-service-comparison-psa-bgs-sgc-cgc" class="vault-next-card">
      <div class="vault-next-card-title">Grading Service Comparison</div>
      <div class="vault-next-card-desc">PSA vs BGS vs SGC vs CGC across buyer pool, default turnaround, price-ceiling tier, and submission strategy &mdash; the stage-4 grader breakdown this fee grid underlies.</div>
    </a>
    <a href="/blog/when-to-grade-sports-cards" class="vault-next-card">
      <div class="vault-next-card-title">When to Grade Sports Cards</div>
      <div class="vault-next-card-desc">The four-stage decision tree &mdash; value threshold, condition pre-screen, use case by card type, and grader selection &mdash; that the per-tier grid runs once the decision to submit is settled.</div>
    </a>
    <a href="/blog/psa-2026-submission-checklist" class="vault-next-card">
      <div class="vault-next-card-title">PSA Submission Checklist 2026</div>
      <div class="vault-next-card-desc">The end-to-end PSA workflow &mdash; account setup, card preparation, tier selection, shipping protocol, and expected turnaround at the chosen tier.</div>
    </a>
  </div>
</div>
        $body_fee_reference$,
        6,
        'PSA vs BGS vs SGC vs CGC fee and turnaround reference: 2026 declared-value tier comparison across Economy, Value/Bulk, Standard, Regular, Express, and WalkThrough tiers. Sortable per-card fee grid, current turnaround windows, declared-value caps, and submission URLs.',
        true
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    // ── UPDATE: Back-link in grading-service-comparison-psa-bgs-sgc-cgc ───────
    // Insert a reference-card pointer immediately before the "Submission strategy"
    // H2 — the same needle every prior splice on this post uses
    // (1783512000000, 1784000000000, 1784400000000, 1784800000000,
    // 1784900000000, 1785100000000). Guard with body NOT LIKE to keep idempotent.
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>Submission strategy: pop reports and tier selection</h2>',
        '<p>For a side-by-side per-tier fee and current-turnaround grid across PSA, BGS, SGC, and CGC &mdash; the reference card that pairs with the breakdown here &mdash; see the <a href="/blog/grading-fee-turnaround-reference">grading fee and turnaround reference</a>.</p>

<h2>Submission strategy: pop reports and tier selection</h2>'
      )
      WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc'
      AND body NOT LIKE '%grading-fee-turnaround-reference%'
    `);

    // ── UPDATE: Back-link in when-to-grade-sports-cards ───────────────────────
    // Splice a paragraph immediately before the Stage 4 H2 — the needle used by
    // the when_to_grade_decision_tree migration (1784900000000). Idempotent guard.
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>Stage 4: Which grader &mdash; PSA, BGS, SGC, or CGC</h2>',
        '<p>For the comprehensive per-tier fee and turnaround grid &mdash; declared value caps, per-card fees, current windows by tier across all four graders, and a sortable comparison view &mdash; see the <a href="/blog/grading-fee-turnaround-reference">grading fee and turnaround reference card</a>.</p>

<h2>Stage 4: Which grader &mdash; PSA, BGS, SGC, or CGC</h2>'
      )
      WHERE slug = 'when-to-grade-sports-cards'
      AND body NOT LIKE '%grading-fee-turnaround-reference%'
    `);

  },
};
