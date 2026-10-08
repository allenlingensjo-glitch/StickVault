module.exports = {
  name: 'grading_decision_cheat_sheet',
  up: async (client) => {

    // ── 1.1 ── Insert (or no-op) the cheat-sheet post row. Body shape mirrors
    // 1785500000000 (grading_fee_turnaround_reference) so the printable page
    // ships the raw-value × grader × tier decision matrix plus cross-links
    // back to the fee grid and the grading side-hustle pillar.
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description, published)
      VALUES (
        'grading-decision-cheat-sheet',
        'Grading Decision Cheat Sheet: Pick the Right Grader &times; Tier in One View (2026)',
        'collecting',
        'Printable cheat sheet pairing the 2026 PSA/BGS/SGC/CGC fee-and-turnaround grid with a raw-value &times; grader-tier decision matrix and the profit estimator &mdash; one page so a collector picks the optimal submission before shipping the card.',
        $body_cheat_sheet$
<p>The <a href="/blog/grading-fee-turnaround-reference">grading fee and turnaround reference</a> lists every per-tier fee, declared-value cap, and current turnaround window across PSA, BGS, SGC, and CGC. The <a href="/blog/sports-card-grading-side-hustle-profit-calculator">sports card grading side-hustle profit calculator</a> runs the raw-vs-graded ROI math against current comps. This page is the printable bridge between the two &mdash; the raw-value &times; grader &times; tier decision matrix that picks the optimal submission in one view, paired with the profit estimator below so the math stays on the page when you save it as a PDF.</p>

<p>Use the cheat sheet as a working reference, not a quote. The fee values match the 2026 program-tier rates published on each grader&rsquo;s submission portal; the live number lives there. Pull the card&rsquo;s current comp on eBay sold listings before committing capital. The matrix below positions every tier that clears the fee at every card value band collectors actually source in.</p>

<h2>Raw value &times; grader &times; tier &mdash; pick in one view</h2>

<p>Five card-value bands run across all four graders. Each cell names the lowest tier at that grader whose declared-value cap covers the band, with the fee, the cap, and the one-line rationale for picking that tier over the next one up. Start at the band that matches the raw card&rsquo;s eBay 30-day sold median, then read across to the grader column that matches the submission plan.</p>

<table class="cheat-sheet-decision-matrix">
  <thead>
    <tr>
      <th>Raw value bucket</th>
      <th>PSA &mdash; best tier</th>
      <th>BGS &mdash; best tier</th>
      <th>SGC &mdash; best tier</th>
      <th>CGC &mdash; best tier</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Sub-$25</strong></td>
      <td data-tier="skip"><strong>Sell raw</strong><br>$0 fee<br>No declared-value cap<br>The $15 floor at every grader unbonds any tier &mdash; skip the submission entirely.</td>
      <td data-tier="skip"><strong>Sell raw</strong><br>$0 fee<br>No declared-value cap<br>Sub-grade transparency adds nothing on cards the market values raw.</td>
      <td data-tier="skip"><strong>Sell raw</strong><br>$0 fee<br>No declared-value cap<br>SGC economy tier sits at $15 &mdash; the same absolute floor &mdash; and absorbs months of hold.</td>
      <td data-tier="skip"><strong>Sell raw</strong><br>$0 fee<br>No declared-value cap<br>CGC card economy starts at $25, which is already the band ceiling.</td>
    </tr>
    <tr>
      <td><strong>$25&ndash;$99</strong></td>
      <td data-tier="psa_value_bulk"><strong>PSA Value / Bulk</strong><br>$18 / card<br>Cap $199<br>Lowest per-card fee in the band; lock capital longer for the fee savings.</td>
      <td data-tier="bgs_economy"><strong>BGS Economy</strong><br>$18 / card<br>Cap $199<br>Same per-card fee as PSA at the cap; pick only when the BGS buyer pool is already deep on the card.</td>
      <td data-tier="sgc_economy"><strong>SGC Economy</strong><br>$15 / card<br>Cap $199<br>Lowest per-card fee across all four graders; the right default at this band.</td>
      <td data-tier="cgc_economy"><strong>CGC Economy</strong><br>$25 / card<br>Cap $199<br>Highest per-card fee in the band; only when the card type is non-sport TCG where CGC carries the buyer pool.</td>
    </tr>
    <tr>
      <td><strong>$100&ndash;$499</strong></td>
      <td data-tier="psa_regular"><strong>PSA Regular</strong><br>$25 / card<br>Cap $499<br>Default single-card submission; the deepest buyer pool compounds at the slab premium.</td>
      <td data-tier="bgs_standard"><strong>BGS Standard</strong><br>$30 / card<br>Cap $499<br>Pick when sub-grade transparency matters &mdash; BGS 9 or 9.5 with strong sub-grades commands a premium on Prizm and premium vintage.</td>
      <td data-tier="sgc_standard"><strong>SGC Standard</strong><br>$25 / card<br>Cap $499<br>Faster turnaround than PSA at the same fee on vintage; pick when comp window is active.</td>
      <td data-tier="cgc_standard"><strong>CGC Standard</strong><br>$30 / card<br>Cap $499<br>PTCG, MTG, Lorcana default; the CGC brand carries the TCG buyer pool PSA cannot match.</td>
    </tr>
    <tr>
      <td><strong>$500&ndash;$1,499</strong></td>
      <td data-tier="psa_express"><strong>PSA Express</strong><br>$75 / card<br>Cap $1,499<br>When a market-sensitive card&rsquo;s comp window will close before a 4-8-week turnaround opens.</td>
      <td data-tier="bgs_express"><strong>BGS Express</strong><br>$75 / card<br>Cap $1,499<br>Pick when the BGS 9.5 sub-grade premium clears the fee premium on a sub-grade storytelling card.</td>
      <td data-tier="sgc_express"><strong>SGC Express</strong><br>$60 / card<br>Cap $1,499<br>Lowest fee at this band; routinely 1-2 weeks, faster than PSA Express at this cap.</td>
      <td data-tier="cgc_express"><strong>CGC Express</strong><br>$75 / card<br>Cap $1,499<br>Default for market-sensitive TCG where the CGC Pristine 10 premium is in play.</td>
    </tr>
    <tr>
      <td><strong>$1,500+</strong></td>
      <td data-tier="psa_walkthrough"><strong>PSA WalkThrough</strong><br>$150+ / card<br>Cap $10k<br>In-person convention floor only; same-day to one-week turnaround.</td>
      <td data-tier="bgs_walkthrough"><strong>BGS WalkThrough</strong><br>$150+ / card<br>Cap $10k<br>Convention floor only; the right tier when the buyer is waiting on a Black Label slab.</td>
      <td data-tier="sgc_premier"><strong>SGC Premier</strong><br>$150+ / card<br>Cap $10k<br>SGC Premier at a show; the fastest vintage slab turnaround at a comparable cap.</td>
      <td data-tier="cgc_walkthrough"><strong>CGC WalkThrough</strong><br>$150+ / card<br>Cap $10k<br>Convention floor only; CGC In-House signing events for high-value TCG.</td>
    </tr>
  </tbody>
</table>

<h2>Why the matrix lands where it does</h2>

<p>Three variables drive every cell of the matrix &mdash; fee per card, declared-value cap, and capital lock-up vs fee savings. The first band (sub-$25) is a hard skip because the absolute floor at every grader is $15. Below that threshold, no tier clears the fee at any outcome, raw or slab. The graders that look cheaper at the same cap (SGC Economy at $15 vs PSA Value/Bulk at $18) only matter in the band where the cap actually binds; at the $25&ndash;$99 band both fees unlock the same $199 cap and a $3-per-card savings on 20 cards starts to add up once capital hold time is on the table.</p>

<p>The $100&ndash;$499 band is the default for one-card submissions, and the grader choice at this band is not really about fee &mdash; the fees converge ($25&ndash;$30 at the Standard/Regular tiers across all four). The choice is about buyer pool depth and sub-grade storytelling. PSA holds the deepest buyer pool overall; BGS earns the sub-grade premium on the cards where sub-grades tell a story (centering, surface, edges); SGC has the faster turnaround on vintage where the comp window matters; CGC carries the TCG buyer pools PSA cannot match. The cell picks the right default per card type.</p>

<p>The $500&ndash;$1,499 band is where turnaround becomes the deciding variable. The fee premium at Express tier ($60&ndash;$75) is materially larger than at Standard &mdash; the question is whether the comp window will close before a 4-8-week turnaround opens. If yes, SGC Express clears the fee cheaper and finishes faster than PSA Express; if no, Standard at any grader is the right answer because the comp window will still be open at slab return. The $1,500+ band is convention-floor territory at every grader; the matrix keeps the same tier structure so the read-across pattern holds across bands. Above the $10k cap, verify the cap directly with the grader, since high-value submission pricing moves with membership level.</p>

<h2>Cross-link from the grading side-hustle pillar</h2>

<p>The cheat sheet is the printable companion to the <a href="/blog/sports-card-grading-side-hustle-profit-calculator">sports card grading side-hustle profit calculator</a> &mdash; the pillar that already runs the profit estimator below. Print this page at the beginning of a grading session, pull the card&rsquo;s raw value from your sourcing log, read across the matrix row for the band, and the cell tells you which grader &times; tier ships the submission today. For the per-tier fee, declared-value cap, and current turnaround window behind each cell, the <a href="/blog/grading-fee-turnaround-reference">grading fee and turnaround reference card</a> is the working lookup.</p>
        $body_cheat_sheet$,
        4,
        'Printable grading decision cheat sheet: raw value &times; PSA / BGS / SGC / CGC &times; tier decision matrix. Pick the right grader and tier per card value band in one view, save as PDF, ship the submission.',
        true
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    // ── 1.2 ── Forward cross-link splice: prepend the cheat sheet at the top
    // of the grading side-hustle pillar's "Continue reading" block so the new
    // printable page shows as a related next step directly off the pillar's
    // CTA. Idempotent guard mirrors 1800000000000 §1.4.
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<div class="vault-next-read">
  <div class="vault-next-read-label">Continue reading</div>
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
</div>',
        '<div class="vault-next-read">
  <div class="vault-next-read-label">Continue reading</div>
  <div class="vault-next-read-grid">
    <a href="/blog/grading-decision-cheat-sheet" class="vault-next-card">
      <div class="vault-next-card-title">Grading Decision Cheat Sheet</div>
      <div class="vault-next-card-desc">Printable one-page matrix: pick the right grader × tier per raw card band in a single view, paired with the profit estimator below it.</div>
    </a>
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
</div>'
      )
      WHERE slug = 'sports-card-grading-side-hustle-profit-calculator'
      AND body NOT LIKE '%grading-decision-cheat-sheet%'
    `);

  },
};
