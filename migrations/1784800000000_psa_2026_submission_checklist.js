module.exports = {
  name: 'psa_2026_submission_checklist',
  up: async (client) => {

    // ── New affiliate link slugs: card-mailers and team-bags ──────────────────
    // one-touch, silica-gel already exist (1747616000000, 1783830000000)
    await client.query(`
      INSERT INTO affiliate_links (slug, label, program, target_url, commission_rate, link_type, pillar) VALUES
        ('card-mailers', 'Card-Size Bubble Mailers for PSA Submission Shipments — Amazon', 'Amazon',
         'https://www.amazon.com/s?k=trading+card+bubble+mailers&tag=stickvault0f-20',
         '3-10%', 'affiliate', 'Collecting'),
        ('team-bags',    'Resealable Team Bags for Trading Cards — Amazon',                'Amazon',
         'https://www.amazon.com/s?k=team+bags+trading+cards&tag=stickvault0f-20',
         '3-10%', 'affiliate', 'Collecting')
      ON CONFLICT (slug) DO NOTHING;
    `);

    // ── New Post: PSA Submission Checklist 2026 ───────────────────────────────
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description, published)
      VALUES (
        'psa-2026-submission-checklist',
        'PSA Submission Checklist 2026: From Account Setup to Slab Return — Account, Card Prep, Tier, Shipping, Turnaround',
        'collecting',
        'PSA submission is a five-step workflow, not a single act: account setup, card preparation, tier selection, shipping protocol, and turnaround tracking. This checklist covers each stage end-to-end for 2026 submissions, so collectors stop missing steps that cost grades, time, or cards.',
        $body_psa_2026$
<p>PSA submission is the final layer in the grading workflow narrative this vault has been building. The <a href="/blog/grading-service-comparison-psa-bgs-sgc-cgc">grading service comparison</a> works through which grader fits which card. The <a href="/blog/grading-prep-system-before-submitting-to-psa">grading prep system</a> handles pre-submission evaluation and packing. The <a href="/blog/raw-card-vs-graded-slab">raw card vs graded slab decision guide</a> answers whether the card should be submitted at all. This piece is the workflow that runs once those three are settled: from creating a PSA account through receiving slabs back in the mail.</p>

<p>The end-to-end checklist matters because grading is five separate decisions in series, and a mistake in any one of them costs grades, time, or cards. A poorly packed card loses a corner in transit. A wrong tier pushes a market-sensitive card past the comp window. An uninsured $1,000 card vanishes at the courier and is unrecoverable. The collectors who grade consistently well are not the ones with the best eye for centering; they are the ones with the most repeatable submission process.</p>

<h2>Step 1: PSA account setup</h2>

<p>Submitting to PSA starts at <a href="/r/psa" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>PSACard.com</strong> <span class="affiliate-cta">Visit Site &rarr;</span></a> under the <em>Services &gt; Trading Card Grading</em> path. New accounts register with email, payment method, and shipping address; the activation email confirms the account and unlocks the submission form.</p>

<p>Two account tiers matter for collectors submitting anything above a few hundred dollars in declared value. The free Member tier caps declared value per card at the lowest band, which restricts the higher-priced tiers' insurance. The paid Premium and Diamond tiers raise the per-card declared-value ceiling &mdash; Premium is the meaningful upgrade for most submitters; Diamond adds higher return shipping insurance and faster support. For consistent submitters running monthly batches, the Premium membership pays back inside a year on tier and insurance savings.</p>

<p>Set the return shipping address early. PSA returns come back via insured carrier; a wrong address at registration means a return shipment heading to the wrong state, and PSA support can take weeks to redirect a misrouted package. Verify the address on the account dashboard before the first submission.</p>

<h2>Step 2: Card preparation standards</h2>

<p>This article stays high-level on prep because the full pre-submission workflow is covered in the <a href="/blog/grading-prep-system-before-submitting-to-psa">grading prep system guide</a>. The checklist items, in order:</p>

<ul>
<li><strong>Pre-screen under bright light.</strong> Corners, edges, surface gloss, centering. Reject cards with print lines, soft corners, or whitening before filling out the submission form &mdash; the fee is paid whether the grade is 10 or 8.</li>
<li><strong>Penny sleeve + semi-rigid holder.</strong> Top loader for point thickness under 130pt; magnetic one-touch for thicker cards. No soft sleeves, no team bags visible at the front edge &mdash; the holder obscures surface inspection if misaligned.</li>
<li><strong>No tape, no stickers, no writing on the holder or sleeve.</strong> PSA rejects shipments with identifying marks that suggest tampering.</li>
<li><strong>Sort by tier.</strong> Pre-sort the batch into the tiers each card will be submitted at. A mismatched card in a Value/Bulk submission is downgraded in priority; a mismatched card in an Express submission costs money without speeding it up.</li>
<li><strong>Document the batch.</strong> Photograph each card top and bottom, log card description and serial number if applicable, save the submission ID. This is the audit trail if a card is lost in transit or mis-graded.</li>
</ul>

<p>The prep step is where most amateur submitters lose grades. Cards that looked mint under ambient light show whitening, print lines, or corner softness under the bright-light evaluation &mdash; rejecting those cards before submission is the free grade improvement.</p>

<h2>Step 3: Service tier selection</h2>

<p>PSA's three core submission tiers in 2026 run approximately:</p>

<ul>
<li><strong>Value / Bulk.</strong> Lowest fee (around $18 per card), longest turnaround. Right tier for bulk batches where individual cards are not market-sensitive, and shop savings on fee times card count.</li>
<li><strong>Regular.</strong> Mid-tier fee (around $25 per card), mid-tier turnaround. The default for collectors who have a pre-screened cohort and want a reasonable but not premium timeline.</li>
<li><strong>Express.</strong> Premium fee (around $75 per card), significantly faster turnaround. Right tier when the card is market-sensitive &mdash; recent release, comp window open, hot player move, or a release-date rookie the buyer pool wants graded now.</li>
</ul>

<p>Declared-value ceilings are the second dimension that drives tier choice. Express and WalkThrough tiers allow higher per-card declared values, which affects both the insurance on the inbound shipment and the resale potential of the slab. For cards above $1,000 in expected PSA 10 comp, the higher tier is not optional.</p>

<p>For the broader question of which grader fits which card, the <a href="/blog/grading-service-comparison-psa-bgs-sgc-cgc">grading service comparison guide</a> walks through PSA versus BGS, SGC, and CGC across every card category. PSA is not always the right choice; the prep work above applies to any grader but the tier map and the fee economics are PSA-specific.</p>

<h2>Step 4: Shipping protocol</h2>

<p>Shipping is the step where the most expensive cards vanish. PSA accepts submissions by mail or in-person drop-off; mail submissions are the default, and the packing protocol determines whether the cards arrive intact.</p>

<p><strong>Outer box.</strong> A rigid cardboard box, not a bubble mailer. Bubble mailers deform under anything stacked on top, and USPS sorting facilities stack everything. A 6&times;6&times;6 or 8&times;8&times;8 cardboard box with the corners reinforced is the right form factor. Do not use free Priority Mail boxes &mdash; they are not as rigid, and they are harder to insure at full declared value.</p>

<p><strong>Inner protection.</strong> Sandwich the loaded holders between two pieces of rigid cardboard (cut slightly larger than the holder footprint), then wrap in bubble wrap. The cardboard prevents corner puncture during the carrier sort; the bubble wrap absorbs shock. For thick relics or patch autos, additional bubble wrap layers are cheap insurance.</p>

<p><strong>Per-card wrapping.</strong> Each card sits inside a <a href="/r/team-bags" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>resealable team bag</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> before going into its top loader or <a href="/r/one-touch" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>one-touch magnetic holder</strong> <span class="affiliate-cta">Check Price &rarr;</span></a>. The team bag adds a moisture and abrasion barrier in the box &mdash; the holder protects against physical contact, but the team bag protects against anything that gets past the holder. For high-value cards, this layered protection is the difference between a clean return and a corner-ding downgrade that PSA correctly attributes to in-transit damage.</p>

<p><strong>Moisture control.</strong> Drop a <a href="/r/silica-gel" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>silica gel desiccant packet</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> in the box to buffer against any moisture the package picks up in transit. A sealed envelope in a sorting facility for two days is not a controlled environment; the silica gel costs pennies and prevents the moisture cycling that can affect older card stock.</p>

<p><strong>Outer mailer.</strong> Once the inner box is sealed, place it inside a <a href="/r/card-mailers" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>card-sized padded bubble mailer</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> for the handoff to the carrier. The mailer is the carrier-facing protection layer; the inner box is the structural layer. Both are needed, and skipping the inner box is the single most common amateur shipping mistake.</p>

<p><strong>Carrier and service level.</strong> USPS Priority Mail or UPS Ground with insurance is the standard. For shipments above $500 in declared value, add signature confirmation &mdash; the carrier's signature service is the difference between an insurance claim that pays out and one that does not. For shipments above $1,000, registered mail or UPS Ground with declared-value coverage is the right call.</p>

<h2>Step 5: Expected turnaround</h2>

<p>PSA's published turnaround is a moving target &mdash; the company does not commit to fixed windows the way a courier does, and econometric backlog swings can stretch any tier by weeks to months. The table below reflects typical turnaround in 2026 normal-demand conditions:</p>

<table class="comparison-table">
  <thead>
    <tr>
      <th>Tier</th>
      <th>Typical Turnaround</th>
      <th>When to Choose</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Value / Bulk</td>
      <td>8&ndash;14 weeks</td>
      <td>Bulk batches where individual cards are not market-sensitive; shop savings on fee times card count across 20+ cards.</td>
    </tr>
    <tr>
      <td>Regular</td>
      <td>4&ndash;8 weeks</td>
      <td>Default tier for pre-screened cohorts; reasonable but not premium timeline; mid-range fee economics.</td>
    </tr>
    <tr>
      <td>Express</td>
      <td>2&ndash;4 weeks</td>
      <td>Market-sensitive cards: recent release, active comp window, hot player move, release-date rookie the buyer pool wants graded now.</td>
    </tr>
    <tr>
      <td>WalkThrough</td>
      <td>Same day to 1 week</td>
      <td>Convention floor submissions only; reserved for high-value cards where the buyer is waiting on a graded slab.</td>
    </tr>
  </tbody>
</table>

<p>Plan turnaround into the comp math. A card submitted at Express with a 2-week turnaround hits the comp window in time for the price premium; a card submitted at Value with a 14-week turnaround lands after the comp window has closed and prices have softened. The tier choice is not just a fee decision; it is a timing decision. The cost-benefit math in the <a href="/blog/raw-card-vs-graded-slab">raw card vs graded slab guide</a> uses assumed turnaround windows &mdash; run the math at the realistic turnaround for the tier being chosen, not the optimistic one.</p>

<h2>The end-to-end checklist</h2>

<p>Pick up the checklist at this point: account created and verified, address confirmed, payment method linked. Cards pre-screened under bright light, sleeved and holdered, batch sorted by tier, batch documented with photos and submission IDs. Tier selected per card &mdash; the lower fee tiers where timing is not critical, the higher tiers where comp windows matter. Shipment packed &mdash; inner cardboard sandwich, bubble wrap, team bags inside the holders, silica gel in the box, outer padded mailer. Carrier with insurance and signature confirmation above $500 declared value.</p>

<p>The collectors who grade consistently well are not the ones with the best eye for centering. They are the ones with the most repeatable process. Run the checklist as a list, not as a routine: each step gets checked off, each batch gets documented, and the next submission is faster than the last because the workflow is no longer a system of one-off decisions.</p>

<div class="vault-cta">
  <div class="vault-cta-label">From the Vault</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> &mdash; the PSA submission tracker, the per-tier turnaround log, the pre-shipment packing checklist, and the post-return slab audit template that closes the loop on every batch. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit &rarr;</a>
  </div>
</div>

<div class="vault-next-read">
  <div class="vault-next-read-label">Recommended Next Read</div>
  <div class="vault-next-read-grid">
    <a href="/blog/grading-service-comparison-psa-bgs-sgc-cgc" class="vault-next-card">
      <div class="vault-next-card-title">Grading Service Comparison</div>
      <div class="vault-next-card-desc">PSA vs BGS vs SGC vs CGC across turnaround, cost tiers, resale premium, and submission strategy &mdash; the grader-fit question that runs before PSA-specific tier selection.</div>
    </a>
    <a href="/blog/grading-prep-system-before-submitting-to-psa" class="vault-next-card">
      <div class="vault-next-card-title">Grading Prep System</div>
      <div class="vault-next-card-desc">The bright-light evaluation, sleeve and holder selection, batch organization, and packing protocol that feeds the account-setup-through-shipping workflow above.</div>
    </a>
    <a href="/blog/raw-card-vs-graded-slab" class="vault-next-card">
      <div class="vault-next-card-title">Raw Card vs Graded Slab</div>
      <div class="vault-next-card-desc">The decision logic for whether a card should be submitted at all &mdash; the upstream question that the PSA submission checklist answers downstream.</div>
    </a>
  </div>
</div>
        $body_psa_2026$,
        7,
        'PSA submission checklist 2026: account setup, card preparation standards, service tier selection, shipping protocol, and expected turnaround. The end-to-end workflow from registration through slabbed-card return, with affiliate anchors on submission supplies.',
        true
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    // ── UPDATE: Back-link in grading-service-comparison-psa-bgs-sgc-cgc ───────
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>Submission strategy: pop reports and tier selection</h2>',
        '<p>For the full end-to-end PSA submission workflow &mdash; account setup, card preparation, tier selection shipping protocol, and expected turnaround &mdash; see the <a href="/blog/psa-2026-submission-checklist">PSA submission checklist 2026</a>.</p>

<h2>Submission strategy: pop reports and tier selection</h2>'
      )
      WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc'
      AND body NOT LIKE '%psa-2026-submission-checklist%'
    `);

    // ── UPDATE: Back-link in grading-prep-system-before-submitting-to-psa ─────
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>Step 5: Packing for shipment</h2>',
        '<p>For the end-to-end workflow that runs after packing is complete &mdash; PSA account setup, service tier selection, carrier and insurance choice, and expected turnaround across Value, Regular, Express, and WalkThrough tiers &mdash; see the <a href="/blog/psa-2026-submission-checklist">PSA submission checklist 2026</a>.</p>

<h2>Step 5: Packing for shipment</h2>'
      )
      WHERE slug = 'grading-prep-system-before-submitting-to-psa'
      AND body NOT LIKE '%psa-2026-submission-checklist%'
    `);

    // ── UPDATE: Back-link in raw-card-vs-graded-slab ──────────────────────────
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>Cost/benefit math example: a real card</h2>',
        '<p>The math above assumes a Value/Bulk submission with a ~6-week turnaround. The end-to-end workflow from PSA account setup through slab return, including tier selection, shipping protocol, and the realistic turnaround windows by tier, is in the <a href="/blog/psa-2026-submission-checklist">PSA submission checklist 2026</a>.</p>

<h2>Cost/benefit math example: a real card</h2>'
      )
      WHERE slug = 'raw-card-vs-graded-slab'
      AND body NOT LIKE '%psa-2026-submission-checklist%'
    `);

  },
};
