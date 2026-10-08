module.exports = {
  name: 'sports_card_shipping_packaging_guide',
  up: async (client) => {

    // ── New affiliate link slugs: bubble-mailers and team-bags ──────────────
    // team-bags already exists (1784800000000 psa-2026-submission-checklist)
    // bubble-mailers is the dedicated outer-mailer slot in the shipping supply stack
    await client.query(`
      INSERT INTO affiliate_links (slug, label, program, target_url, commission_rate, link_type, pillar) VALUES
        ('bubble-mailers', 'Padded Bubble Mailers for Trading Card Shipping — Amazon', 'Amazon',
         'https://www.amazon.com/s?k=trading+card+bubble+mailers&tag=stickvault0f-20',
         '3-10%', 'affiliate', 'Collecting'),
        ('team-bags',      'Resealable Team Bags for Sandwich-Protected Cards — Amazon', 'Amazon',
         'https://www.amazon.com/s?k=team+bags+trading+cards&tag=stickvault0f-20',
         '3-10%', 'affiliate', 'Collecting')
      ON CONFLICT (slug) DO NOTHING;
    `);

    // ── New Post: Sports Card Shipping & Packaging Guide ─────────────────────
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description, published)
      VALUES (
        'sports-card-shipping-packaging-guide',
        'Sports Card Shipping & Packaging Guide: How to Ship Cards Safely — Trades, eBay Sales, and Grading Submissions',
        'collecting',
        'Sports card shipping is its own supply stack and its own failure-mode list — penny sleeve, top loader, team bag, bubble mailer, cardboard stiffener, then USPS service tier and insurance choice on top of that. Here is the layer-by-layer protocol for peer-to-peer trades, eBay sales, and grading-service returns, including the temperature and humidity risks during transit.',
        $body_shipping$
<p>The protection stack covers what happens around a card in your hands. The minute a card leaves your hands &mdash; in a peer-to-peer trade, headed to an eBay buyer, or shipped to a grading service &mdash; a different stack takes over. The supply stack is different. The failure modes are different. The risks include everything the protection stack already addresses plus heat, cold, multi-day sorting facilities, and the carrier's handling of anything stamped "non-fragile."</p>

<p>This piece is that stack: the supply layers in order, the USPS service tier that fits each scenario, the declared-value insurance math, and the temperature and humidity exposure that turns a clean shipment into a damaged one. The <a href="/blog/sports-card-storage-and-display-protection-stack">storage and display protection stack guide</a> covers the holder side; this one covers the carrier side.</p>

<h2>The shipping supply stack</h2>

<p>Every shipped card needs five layers. Each one addresses a specific failure mode the layer below it does not. Skipping a layer breaks the stack the same way it does in storage &mdash; the card survives the layer it has, and fails the layer it does not.</p>

<p><strong>Layer 1 &mdash; Penny sleeve.</strong> The same base layer as in-hand storage: a soft polypropylene sleeve covering the card on all four sides. For any card being shipped &mdash; even in a top loader &mdash; the penny sleeve keeps the surface off the loader wall and stops the card from sliding against the inside of the holder during carrier handling. For under-a-dollar per hundred sleeves, start every shipped card the same way as every stored card: <a href="/r/penny-sleeves" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>BCW penny sleeves</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> sized to the card's point thickness.</p>

<p><strong>Layer 2 &mdash; Top loader.</strong> The structural layer. The penny-sleeved card slides into a rigid plastic top loader matched to its point thickness &mdash; <a href="/r/top-loaders" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Ultra Pro top loaders</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> as the standard for 35-point stock, 75-point loaders for chrome, 130-point for relics and patch autos. The loader keeps the card from bending around the edges and provides the carrier-facing rigid shell that resists crush. A card loose in a bubble mailer without a loader is one sorting facility away from a bend.</p>

<p><strong>Layer 3 &mdash; Team bag.</strong> The sealed-environment layer. After the card sits inside the top loader, slide the loaded top loader into a resealable <a href="/r/team-bags" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>team bag</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> sized for the holder. The team bag seals out moisture, dust, and any abrasion the holder's open edge would otherwise expose. For multi-day shipments to a grading service, this layer also protects against the humidity swing that can affect older card stock during a long-haul carrier sort.</p>

<p><strong>Layer 4 &mdash; Bubble mailer.</strong> The carrier-facing cushioning layer. The loaded, team-bagged top loader goes into a <a href="/r/bubble-mailers" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>padded bubble mailer</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> sized barely larger than the holder. The mailer absorbs the drops, the conveyor vibration, and the loading pressure that sorting equipment applies. A mailer too large lets the holder slide inside; the bubble cushion only works if the holder sits tight against the inside walls.</p>

<p><strong>Layer 5 &mdash; Cardboard stiffener.</strong> The puncture-resistance layer. Cut two pieces of corrugated cardboard to a size just larger than the holder's footprint, then sandwich the holder between them. The cardboard stops the holder's corners from puncturing through the bubble mailer under a stacked package, which is the most common transit damage pattern for thin mailers. One piece of cardboard on each face of the holder, taped together as a sandwich, then into the mailer.</p>

<p>The full stack, in order: <a href="/r/penny-sleeves" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>penny sleeve</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> &rarr; <a href="/r/top-loaders" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>top loader</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> &rarr; <a href="/r/team-bags" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>team bag</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> &rarr; <a href="/r/bubble-mailers" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>bubble mailer</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> &rarr; cardboard stiffener. The first three address surface, edge, and environment. The last two address the carrier.</p>

<div class="vault-cta">
  <div class="vault-cta-label">From the Vault</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> &mdash; the shipping supply checklist (sleeves, loaders, team bags, mailers, cardboard by quantity), the per-card packing diagram, and the per-shipment insurance log that locks the carrier choice to the declared value. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit &rarr;</a>
  </div>
</div>

<h2>USPS service comparison</h2>

<p>USPS is the default carrier for hobby shipping. The four services that come up repeatedly &mdash; First-Class Package, Parcel Select Ground, Priority Mail, and Certified Mail / Registered Mail &mdash; behave very differently on speed, tracking, insurance ceiling, and signature availability. Pick by value and risk, not by cheapest sticker price.</p>

<table class="comparison-table">
  <thead>
    <tr>
      <th>Service</th>
      <th>Speed</th>
      <th>Tracking</th>
      <th>Insurance Ceiling</th>
      <th>Signature</th>
      <th>Best Use</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>First-Class Package</td>
      <td>1&ndash;5 business days</td>
      <td>Yes</td>
      <td>Up to $100 included</td>
      <td>No</td>
      <td>Trades and eBay sales under $50. Cheap, tracked, no extra insurance needed.</td>
    </tr>
    <tr>
      <td>Parcel Select Ground</td>
      <td>2&ndash;8 business days</td>
      <td>Yes</td>
      <td>Up to $100 included; extra available</td>
      <td>Optional add-on</td>
      <td>Heavier shipments or multiple-card sales between $50 and $200.</td>
    </tr>
    <tr>
      <td>Priority Mail</td>
      <td>1&ndash;3 business days</td>
      <td>Yes</td>
      <td>Up to $100 included; up to $5,000 with add-on</td>
      <td>Optional add-on</td>
      <td>eBay sales $200&ndash;$1,000, grading submissions, anything with insurance math.</td>
    </tr>
    <tr>
      <td>Certified Mail / Registered Mail</td>
      <td>1&ndash;5 business days (Certified); 2&ndash;8 (Registered)</td>
      <td>Yes</td>
      <td>Certified: no insurance by default. Registered: full declared value.</td>
      <td>Required (signature at every sort point on Registered)</td>
      <td>Sales above $1,000, rare cards, anything where the carrier being able to prove chain-of-custody matters at claims time.</td>
    </tr>
  </tbody>
</table>

<p>The trap to avoid: paying Priority Mail prices for what First-Class Package would handle, or shipping a $1,500 card First-Class with $100 of insurance and hoping for the best. The service tier has to match the value tier, not just the box size.</p>

<div class="vault-cta">
  <div class="vault-cta-label">System Reference</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> &mdash; the USPS service-tier decision matrix keyed to declared value and tracking requirement, and the per-shipment invoice template that locks the carrier choice on the label before the package closes. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit &rarr;</a>
  </div>
</div>

<h2>Declared-value insurance</h2>

<p>Shipper-paid insurance is the difference between a lost package and a recoverable one. USPS insurance tiers:</p>

<ul>
<li><strong>Under $100 declared value.</strong> Both First-Class Package and Priority Mail include $100 of insurance at no charge. For trades and low-dollar eBay sales this is the floor &mdash; nothing extra required.</li>
<li><strong>$100&ndash;$500 declared value.</strong> Priority Mail with the $100&ndash;$500 insurance add-on. The add-on is roughly $5&ndash;$15 depending on declared value, paid at the counter or through the USPS shipping platform. Track every add-on purchase by tracking number &mdash; the receipt is the claim evidence.</li>
<li><strong>$500&ndash;$1,000 declared value.</strong> Priority Mail with the $500&ndash;$1,000 insurance add-on. Same process. Add signature confirmation so the carrier's signature service is on file; a missing signature is what underwriters use to deny claims.</li>
<li><strong>$1,000+ declared value.</strong> Certified Mail / Registered Mail. Registered Mail is the only USPS service that covers declared value into the five figures. The package is signed at every sort point along the route, which is the audit trail the claim goes to.</li>
</ul>

<p>Two non-USPS protections overlap. PayPal and eBay seller protection cover buyer-side disputes (item not received, item significantly not as described); neither covers transit loss in transit unless tracking proves the item reached the buyer. The USPS insurance covers transit loss but not buyer disputes. Run both: USPS insurance for transit, eBay's Money Back Guarantee for buyer-side claims when applicable. They are not substitutes.</p>

<p>A clean loss-of-package scenario: ship a $750 card Priority Mail with $500 of insurance add-on (because the next bracket was overkill for the card's actual value). Carrier loses the package. Claim $500 from USPS, refund the buyer from the sale proceeds, take the $250 net loss. The math is ugly, but the alternative &mdash; shipping a $750 card uninsured in hopes the carrier does not lose it &mdash; is worse when the package goes missing and there is no claim path.</p>

<h2>Temperature and humidity in transit</h2>

<p>This is the layer most shipping guides skip. Once the package is in the carrier's hands, the card spends one to eight days inside mail trucks, sorting facilities, and regional hubs. Those environments are not climate-controlled.</p>

<p><strong>Summer mail truck heat.</strong> A USPS mail truck parked in afternoon sun can reach 130&deg;F+ interior temperatures. A Priority Mail package sitting on the truck for the four hours between morning and afternoon routes takes the full heat. The card inside is not the same temperature as the truck, but heat transfer through a cardboard box and a bubble mailer is fast enough that the card reaches the high 90s to low 100s. The damage modes: ink fade on printed surfaces (visible within hours on chrome cards), adhesive creep on older stickers, and softened vintage cardstock that bends under very light pressure.</p>

<p><strong>Winter sorting facility cold.</strong> Regional sorting facilities in northern climates drop into the low 30s inside in winter. Cold makes cardstock more brittle; a card that is handled roughly during a January cold snap is more likely to chip at the corners than the same card shipped in May. Brittle vintage stock is the highest-risk scenario &mdash; a 1970s hockey card shipped Priority Mail in January with no team bag inside a thin mailer is a corner-ding waiting to happen.</p>

<p><strong>Multi-day long-haul risk.</strong> A Priority Mail package from California to New York hits two or three regional sorting facilities and spends one to three weekdays total in transit environments. Each facility exposes the package to a different combination of temperature and humidity. The team bag seals the inner environment of the holder, but the bubble mailer and the cardboard stiffener do not seal against ambient humidity swings &mdash; only the sealed surface of the team bag protects against that.</p>

<p>The mitigation stack, in order of cost and effort: (1) ship early in the week (Monday or Tuesday) so the package does not sit in a weekend facility; (2) drop the package at the counter instead of leaving it in a blue collection mailbox, which reduces the time spent in transit environments at the start; (3) avoid shipping vintage or chrome cards in summer heat waves unless team-bagged inside the holder; (4) for high-value or vintage cards, supplement with a <a href="/r/silica-gel" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>silica gel packet</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> inside the team bag to buffer humidity swings. The same environment logic that drives the <a href="/blog/basement-hot-climate-sports-card-storage">basement and hot-climate storage guide</a> applies in transit, just with shorter exposure windows.</p>

<h2>Peer-to-peer trades vs. eBay sales vs. grading submission</h2>

<p>The three common shipping scenarios are not the same ship. Each has a different default packing protocol and a different default service tier.</p>

<p><strong>Peer-to-peer trades.</strong> Trades are same-network transactions &mdash; the recipient is a known collector with a card to send back, and the trade is rarely insured above $100 in either direction. The default pack is bubble mailer only, no rigid box, tracking required but insurance optional. A trade envelope / PWE-light (bubble mailer, top loader only, no team bag, no cardboard) is acceptable for trades below $25 each side; anything above that runs the full stack. Trades happen fastest when the trade partner's cost basis and risk tolerance are known. Default service: First-Class Package with tracking.</p>

<p><strong>eBay sales.</strong> eBay sales are asymmetrical: the buyer has paid, the seller has not yet shipped, and a damaged-on-arrival card triggers a Money Back Guarantee claim. The default pack is the full stack &mdash; penny sleeve, top loader, team bag, bubble mailer, cardboard stiffener &mdash; for any sale above $30. Default service: First-Class Package below $50 with tracking; Priority Mail with insurance add-on between $50 and $200; Priority Mail with insurance and signature confirmation above $200. eBay Money Back Guarantee covers buyer-side disputes up to $20,000 in most categories; it does not cover items lost before delivery documentation proves arrival.</p>

<p><strong>Grading submissions.</strong> Grading submissions are the highest-value shipments a collector runs routinely. A PSA Value submission at 20 cards averaging $100 raw is a $2,000 declared value shipment; a PSA Express with three cards in the $300&ndash;$500 range is a $1,200 declared value shipment. The default pack is full stack plus a rigid cardboard outer box (not just a bubble mailer), with the holders sandwiched between cardboard stiffeners in both dimensions. Default service: Priority Mail with $500&ndash;$1,000 insurance add-on for batches up to 20 cards, Registered Mail for higher-value single-card submissions above $1,000. The grading service receives and returns shipments separately; return shipping is the grading service's responsibility but inbound shipping is yours.</p>

<ol>
<li>Penny sleeve the card. Confirm the sleeve is the right size for the card's point thickness.</li>
<li>Slide the sleeved card into a top loader sized for that point thickness. The card should not rattle, and the loader should not bend.</li>
<li>Slide the loaded top loader into a team bag. Seal the team bag.</li>
<li>Cut two pieces of corrugated cardboard to size larger than the team bag.</li>
<li>Place the team-bagged loader between the two cardboard pieces. Tape the cardboard sandwich together along the edges.</li>
<li>Place the cardboard sandwich inside a bubble mailer. The sandwich should fit snugly; tape the mailer closed.</li>
<li>Address and label the mailer. Apply the tracking and insurance barcodes (counter-printed for USPS services).</li>
<li>For grading submissions: place the bubble mailer inside a rigid cardboard box with additional bubble wrap on each face.</li>
<li>For sales above $200: add signature confirmation to the label.</li>
<li>Drop at the counter (not a blue collection box) and capture the receipt with the tracking number.</li>
</ol>

<div class="vault-next-read">
  <div class="vault-next-read-label">Recommended Next Read</div>
  <div class="vault-next-read-grid">
    <a href="/blog/sports-card-storage-and-display-protection-stack" class="vault-next-card">
      <div class="vault-next-card-title">Storage &amp; Display Protection Stack</div>
      <div class="vault-next-card-desc">The penny sleeve, top loader, one-touch, slab, and storage box layers that keep cards mint &mdash; the holder side of this shipping story.</div>
    </a>
    <a href="/blog/grading-service-comparison-psa-bgs-sgc-cgc" class="vault-next-card">
      <div class="vault-next-card-title">Grading Service Comparison</div>
      <div class="vault-next-card-desc">PSA vs BGS vs SGC vs CGC across turnaround, cost tiers, resale premium, and submission strategy &mdash; the service-side context the shipping stack feeds into.</div>
    </a>
    <a href="/blog/basement-hot-climate-sports-card-storage" class="vault-next-card">
      <div class="vault-next-card-title">Basement &amp; Hot-Climate Storage</div>
      <div class="vault-next-card-desc">Humidity cycling, attic heat spikes, environmental threats the protection stack does not solve &mdash; the storage-environment logic that also drives transit risk.</div>
    </a>
  </div>
</div>
        $body_shipping$,
        8,
        'Sports card shipping & packaging guide: penny sleeve, top loader, team bag, bubble mailer, and cardboard stiffener supply stack; USPS First-Class vs Parcel Select vs Priority vs Registered Mail; declared-value insurance math; and the temperature and humidity risks during transit.',
        true
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    // ── UPDATE: Back-link in sports-card-storage-and-display-protection-stack ──
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>The protection stack: raw to graded</h2>',
        '<p>The protection stack ends at storage. The next layer &mdash; getting cards safely to a buyer, trade partner, or grading service &mdash; has its own supply stack and its own failure modes. The <a href="/blog/sports-card-shipping-packaging-guide">sports card shipping and packaging guide</a> walks through the mailer, the insurance choice, and the heat/humidity risks in transit.</p>

<h2>The protection stack: raw to graded</h2>'
      )
      WHERE slug = 'sports-card-storage-and-display-protection-stack'
      AND body NOT LIKE '%sports-card-shipping-packaging-guide%'
    `);

    // ── UPDATE: Back-link in grading-service-comparison-psa-bgs-sgc-cgc ─────
    // H2 anchors in this post (PSA / BGS / SGC / CGC) all had inline affiliate
    // CTAs spliced in by 1747700000000_affiliate_links_inline_blog.js, so a
    // plain "<h2>Service Name</h2>" REPLACE no longer matches them. Use the
    // "Submission strategy" anchor that every prior splice on this post uses;
    // the H2 itself is unmodified and the body NOT LIKE guard keeps this
    // idempotent.
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>Submission strategy: pop reports and tier selection</h2>',
        '<p>The shipping side of getting a card to a grading service &mdash; supply stack, USPS service choice, declared-value insurance, and summer heat risk &mdash; is its own operational layer. The <a href="/blog/sports-card-shipping-packaging-guide">sports card shipping and packaging guide</a> walks through the packing and logistics before the card enters the submission pipeline.</p>

<h2>Submission strategy: pop reports and tier selection</h2>'
      )
      WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc'
      AND body NOT LIKE '%sports-card-shipping-packaging-guide%'
    `);

  },
};
