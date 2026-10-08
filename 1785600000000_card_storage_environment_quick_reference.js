module.exports = {
  name: 'card_storage_environment_quick_reference',
  up: async (client) => {

    // ── No new affiliate link slugs. The /r/penny-sleeves, /r/top-loaders,
    // /r/one-touch, /r/card-boxes slugs were registered in
    // 1747616000000_affiliate_links_monetization_slugs.js; /r/silica-gel and
    // /r/display-cases in 1783830000000_card_storage_display_protection_stack.js;
    // and /r/dehumidifier in 1784700000000_basement_hot_climate_card_storage.js.
    // The body below reuses those slugs rather than minting new ones &mdash; the
    // same monetization-reuse rule documented inline at
    // 1785400000000_climate_controlled_cabinet_guide.js:5-11.

    // ── New Post: Sports Card Storage Environment Quick-Reference ───────────
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description, published)
      VALUES (
        'card-storage-environment-quick-reference',
        'Sports Card Storage Environment Quick-Reference: Match Your Room to the Right Storage Solution',
        'collecting',
        'Six storage environments &mdash; cool/dry basement, hot/humid garage, climate-controlled office, attic, climate cabinet, dehumidifier-equipped room &mdash; map to a specific holder layer and a specific room-level fix. Click the column to filter the table to your situation. Use this as the bridge between the holder layers in the protection stack and the room-level remediations in the basement guide.',
        $body_env$
<p>The <a href="/blog/sports-card-storage-and-display-protection-stack">sports card storage and display protection stack</a> walks the holder layers &mdash; penny sleeve, top loader, one-touch, slab, storage box &mdash; and assumes the room is benign. The <a href="/blog/basement-hot-climate-sports-card-storage">basement and hot-climate sports card storage guide</a> walks the room-level fixes for collectors whose storage location is not benign &mdash; silica gel inside the box, a room-level dehumidifier for the basement, a UV-blocking display case for the wall. Neither page, on its own, answers the question collectors actually ask once they have measured their room with a $10 hygrometer: <em>I have a specific room in mind &mdash; which solution set goes in it?</em></p>

<p>This page is the bridge between those two. The protection stack assumes a benign room, and the basement guide assumes the room is hostile but you can remediate it. This page names the six storage environments a hobby collector actually has on hand &mdash; cool/dry basement, hot/humid garage, climate-controlled office, attic, climate cabinet, dehumidifier-equipped room &mdash; and matches each one to the holder layers and the room-level fix that belong in it. It is the selector that sits between <em>what holder should I use?</em> and <em>what unit do I run in this room?</em></p>

<h2>Storage environments and their default threat profile</h2>

<p>Each storage environment has a dominant threat. The table below maps each environment to the holder layer, the room-level fix, and the consumable add-on that together address that dominant threat. The environments are listed in declining order of how commonly hobby collectors actually use them &mdash; closet-level climate-controlled office first, hostile garage and attic last.</p>

<ul>
  <li><strong>Cool / dry basement.</strong> &le;65&deg;F year-round, 40&ndash;55% RH when perimeter drainage is intact. Dominant threat: winter condensation on cold concrete walls + foundation wicking that swings RH above 60% during spring and fall rain cycles.</li>
  <li><strong>Hot / humid garage.</strong> 80&ndash;110&deg;F summer afternoons, 60&ndash;90% RH swing across the year. Dominant threat: heat-accelerated ink fade and adhesive creep on vintage stickers, plus humidity that pushes cardboard past the 70% mold threshold during summer storms.</li>
  <li><strong>Climate-controlled office.</strong> 68&ndash;72&deg;F year-round, 35&ndash;50% RH maintained by building HVAC. Dominant threat: none material &mdash; the room is the target condition the other environments are remediating toward.</li>
  <li><strong>Attic.</strong> 90&ndash;130&deg;F summer afternoons, 30&ndash;40% RH in winter as the HVAC stops cycling air to the unconditioned space. Dominant threat: heat-spike ink fade and cardboard dry-out brittleness, plus adhesive creep on vintage stickers and patches.</li>
  <li><strong>Climate cabinet.</strong> Internal 40&ndash;50% RH, &le;70&deg;F, sealed interior volume maintained by an integrated dehumidifier. Dominant threat: door-open humidity recovery events every time the cabinet is accessed.</li>
  <li><strong>Dehumidifier-equipped room.</strong> Room RH held at 40&ndash;55% by a compressor or Peltier dehumidifier running year-round. Dominant threat: power outage, drain-line failure, and dehumidifier-cycle-off humidity creep during compressor rest periods.</li>
</ul>

<h2>Six environments to solution sets &mdash; the pick-by-room table</h2>

<p>The table below is the asset of this page. Pick the row that matches the room you actually have on hand. The recommended primary holder, secondary holder, room-level fix, and required add-on are the four columns that resolve which solution set belongs in that room.</p>

<table class="comparison-table">
  <thead>
    <tr>
      <th>Environment</th>
      <th>Typical Temperature</th>
      <th>Typical RH Range</th>
      <th>Dominant Threat</th>
      <th>Primary Holder Layer</th>
      <th>Secondary Holder Layer</th>
      <th>Room-Level Fix</th>
      <th>Required Add-On</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cool / dry basement</td>
      <td>&le;65&deg;F year-round</td>
      <td>40&ndash;55% RH (perimeter drainage intact)</td>
      <td>Winter condensation on cold concrete walls + foundation wicking during spring/fall rain cycles</td>
      <td><a href="/r/top-loaders" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Ultra Pro top loaders</strong> <span class="affiliate-cta">Check Price &rarr;</span></a></td>
      <td><a href="/r/card-boxes" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>BCW card storage boxes</strong> <span class="affiliate-cta">Check Price &rarr;</span></a></td>
      <td>None required if the basement RH stays in the 40&ndash;55% range &mdash; confirm with a $10 hygrometer for at least one full week before declaring the room safe</td>
      <td><a href="/r/silica-gel" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Silica gel packets</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> in every storage box</td>
    </tr>
    <tr>
      <td>Hot / humid garage</td>
      <td>80&ndash;110&deg;F summer</td>
      <td>60&ndash;90% RH swing across the year</td>
      <td>Heat-accelerated ink fade on chrome/refractor + adhesive creep on vintage stickers + summer humidity pushing cardboard past the 70% mold threshold</td>
      <td><a href="/r/one-touch" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Ultra Pro One-Touch magnetic holder</strong> <span class="affiliate-cta">Check Price &rarr;</span></a></td>
      <td><a href="/r/top-loaders" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Ultra Pro top loaders</strong> <span class="affiliate-cta">Check Price &rarr;</span></a></td>
      <td>Move boxes out of the garage and into the climate envelope of the house (interior closet, conditioned hallway, climate cabinet) &mdash; do not attempt to condition a garage with a window-unit AC</td>
      <td><a href="/r/display-cases" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>UV-blocking acrylic display case</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> for any card kept on the garage wall as display</td>
    </tr>
    <tr>
      <td>Climate-controlled office</td>
      <td>68&ndash;72&deg;F year-round</td>
      <td>35&ndash;50% RH maintained by building HVAC</td>
      <td>None material &mdash; the room is already at the target condition every other environment is remediating toward</td>
      <td><a href="/r/penny-sleeves" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>BCW penny sleeves</strong> <span class="affiliate-cta">Check Price &rarr;</span></a></td>
      <td><a href="/r/top-loaders" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Ultra Pro top loaders</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> for bulk, or a binder with 9-pocket pages for cards you actively browse</td>
      <td>None required &mdash; confirm with a $10 hygrometer that the office RH reads in the 35&ndash;50% range during both summer (AC on) and winter (heat on)</td>
      <td>Optional: <a href="/r/display-cases" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>UV-blocking acrylic display case</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> for centerpieces on the wall</td>
    </tr>
    <tr>
      <td>Attic</td>
      <td>90&ndash;130&deg;F summer afternoons</td>
      <td>30&ndash;40% RH winter (unconditioned space)</td>
      <td>Heat-spike ink fade on chrome + cardboard dry-out brittleness at low winter RH + adhesive creep on vintage stickers and patches</td>
      <td><a href="/r/one-touch" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Ultra Pro One-Touch magnetic holder</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> (PC keepers only &mdash; bulk attic storage is not advised)</td>
      <td><a href="/r/top-loaders" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Ultra Pro top loaders</strong> <span class="affiliate-cta">Check Price &rarr;</span></a></td>
      <td>Relocate boxes to a climate-controlled interior closet (do NOT attempt attic remediation &mdash; the heat load on a west-facing attic exceeds what a portable AC can offset)</td>
      <td><a href="/r/silica-gel" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Silica gel packets</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> in the destination closet (not the attic &mdash; desiccant saturates faster in heat)</td>
    </tr>
    <tr>
      <td>Climate cabinet (sealed, internal dehumidifier)</td>
      <td>&le;70&deg;F internal, stable</td>
      <td>40&ndash;50% RH internal, sealed interior</td>
      <td>Door-open humidity recovery events every time the cabinet is accessed &mdash; interior RH climbs to room RH within minutes and the dehumidifier takes hours to pull it back down</td>
      <td><a href="/r/one-touch" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Ultra Pro One-Touch magnetic holder</strong> <span class="affiliate-cta">Check Price &rarr;</span></a></td>
      <td><a href="/r/top-loaders" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Ultra Pro top loaders</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> (slabs stay in their PSA/BGS/SGC/CGC holders)</td>
      <td>N/A &mdash; the cabinet IS the room-level fix. See the <a href="/blog/climate-controlled-sports-card-cabinet-guide">climate-controlled cabinet guide</a> for the active vs. passive dehumidification choice at each tier</td>
      <td>Passive <a href="/r/silica-gel" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>silica gel</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> as power-outage backup for the active dehumidifier</td>
    </tr>
    <tr>
      <td>Dehumidifier-equipped room</td>
      <td>Depends on the dehumidifier unit (Peltier adds 2&ndash;5&deg;F of waste heat; compressor adds negligible)</td>
      <td>40&ndash;55% RH held by the unit (compressor or Peltier)</td>
      <td>Power outage events that drop RH by 10&ndash;20 points within hours; drain-line failure that shuts the compressor down; humidity creep during compressor rest cycles</td>
      <td><a href="/r/one-touch" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Ultra Pro One-Touch magnetic holder</strong> <span class="affiliate-cta">Check Price &rarr;</span></a></td>
      <td><a href="/r/top-loaders" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Ultra Pro top loaders</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> (slabs stay in their graded holders)</td>
      <td><a href="/r/dehumidifier" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Small room dehumidifier</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> sized to the room volume, with continuous-drain line to a floor drain or sink</td>
      <td>Passive <a href="/r/silica-gel" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>silica gel</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> as backup for power-outage events; $10 hygrometer to confirm RH across the room</td>
    </tr>
  </tbody>
</table>

<p>The table values assume the protection stack has already been applied &mdash; that the raw card is in a penny sleeve inside a top loader (or a one-touch for PC keepers), standing upright in a divided storage box. The environment-to-solution coupling is what this page resolves; the holder layer itself is the protection stack foundation covered in the storage hub.</p>

<h2>How to read the table</h2>

<p>Three limitations apply to the table values that are worth naming up front so the rows are not over-applied.</p>

<p><strong>Typical, not measured.</strong> The temperature and RH columns are typical ranges for an environment in nominal condition &mdash; a basement with intact perimeter drainage, an attic with no HVAC supply, a climate-controlled office in a building with operating HVAC. Your actual room can read outside these ranges and still satisfy the dominant threat profile (a basement with a working dehumidifier on a 50-pint unit is effectively a dehumidifier-equipped room regardless of which floor it sits on). Run a $10 hygrometer in the actual room for at least one week &mdash; across all four seasons if you can sustain it &mdash; before declaring the room one or the other. The label on the room is what the measurement says, not what the building layout suggests.</p>

<p><strong>The table assumes the protection stack is already in place.</strong> A room-level fix without the holder layers underneath is a room-level fix on an unprotected card. The stack &mdash; penny sleeve inside top loader for bulk raw, one-touch for PC keepers, slab for high-value graded &mdash; is the counterpart to every row in the table. Consult the <a href="/blog/sports-card-storage-and-display-protection-stack">storage and display protection stack</a> if the holders are the gap, not the room.</p>

<p><strong>For sub-$200 low-value cards in any hostile environment, the cheapest fix is relocation.</strong> A 1972 base-card lot stored in a hot/humid garage is not a candidate for upgrading to one-touch holders across 800 cards. The cheaper fix is to move the box out of the hostile room into a climate-controlled closet. Upgrading holders is the right call for PC keepers and slabs. Relocating boxes is the right call for bulk raw.</p>

<h2>Picking by room, not by upgrade ambition</h2>

<p>Two collector mistakes run in the opposite direction and both stand between hobbyists and correctly-matching rooms to solution sets.</p>

<p><strong>The over-protection mistake.</strong> A collector finds the protection stack, decides every card deserves a one-touch, and then realizes the cost is prohibitive across the bulk collection. Or the collector sees that one-touch is the right holder for a hot garage and over-applies it to bulk raw cards that were always destined to be flipped, traded, or shipped for grading. The honest read: sub-$50 raw cards stored in any hostile environment instead of upgraded holders should be moved out of the hostile environment into a climate-controlled closet. The room-level fix is room-level, not per-card.</p>

<p><strong>The under-protection mistake.</strong> A collector assumes that because the storage room is a climate-controlled office, the holder layer can be relaxed. The penny sleeve still matters &mdash; the protection stack is about card-to-card contact within a stack, not about the room. PC keepers in a benign room still deserve the <a href="/blog/sports-card-storage-and-display-protection-stack">storage and display protection stack</a> upgrade path from penny sleeve to top loader to one-touch. The room being benign does not retire the holder upgrade &mdash; it makes the holder upgrade non-negotiable because any holder gap shows up in the eventual grade.</p>

<p>The room determines the room-level fix. The holder upgrade is the protection stack. Both belong in the plan. For the room-level mechanics &mdash; basement humidity cycling, attic heat spikes, dehumidifier drain discipline &mdash; the <a href="/blog/basement-hot-climate-sports-card-storage">basement and hot-climate sports card storage guide</a> is the playbook. For the holder-layer mechanics, the storage hub is the playbook. This page is the selector that maps a measured room to a solution set in the table above.</p>

<div class="vault-cta">
  <div class="vault-cta-label">From the Vault</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> &mdash; the room measurement log (one-week hygrometer readings per storage room, seasonal baseline, door-open event log for climate-cabinet users), the environment-to-solution lookup worksheet keyed to this page's table, and the per-room upgrade priority list that sequences holder-layer purchases against room-level fixes. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit &rarr;</a>
  </div>
</div>

<div class="vault-next-read">
  <div class="vault-next-read-label">Recommended Next Read</div>
  <div class="vault-next-read-grid">
    <a href="/blog/sports-card-storage-and-display-protection-stack" class="vault-next-card">
      <div class="vault-next-card-title">Storage &amp; Display Protection Stack</div>
      <div class="vault-next-card-desc">The penny sleeve, top loader, one-touch, slab, and storage box layers that keep raw cards mint and slabs preserved &mdash; the holder side this environment-to-solution lookup sits on top of.</div>
    </a>
    <a href="/blog/basement-hot-climate-sports-card-storage" class="vault-next-card">
      <div class="vault-next-card-title">Basement &amp; Hot-Climate Storage</div>
      <div class="vault-next-card-desc">The room-level remediation layers &mdash; silica gel inside the box, room-level dehumidifier for the basement, UV-blocking display case for the wall &mdash; that this page maps onto the six storage environments a collector actually has on hand.</div>
    </a>
    <a href="/blog/climate-controlled-sports-card-cabinet-guide" class="vault-next-card">
      <div class="vault-next-card-title">Climate-Controlled Cabinet Guide</div>
      <div class="vault-next-card-desc">Active vs. passive dehumidification, the three capacity tiers (shelf cabinet / mid-size display / walk-in conversion), and the brand lines that slot into each &mdash; when the storage environment IS the cabinet itself.</div>
    </a>
  </div>
</div>
        $body_env$,
        6,
        'Sports card storage environment quick-reference: six room types &mdash; cool/dry basement, hot/humid garage, climate-controlled office, attic, climate cabinet, dehumidifier-equipped room &mdash; matched to the holder layers and room-level fixes that belong in each. Bridge between the protection stack and the basement guide.',
        true
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    // ── UPDATE: Back-link splice in sports-card-storage-and-display-protection-stack ──
    // Insert an environment-to-solution selector pointer immediately before the
    // "Storage methods comparison" H2. Idempotency guard mirrors
    // 1784200000000_collecting_cluster_cross_links.js:62-65 and
    // 1784400000000_raw_card_vs_graded_slab.js:182-185, which splice at the
    // same needle.
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>Storage methods comparison</h2>',
        '<p>The storage methods comparison table below pairs every holder layer with the use case it is best for. The room those holders live in is the missing variable &mdash; six different storage environments map to six different solution sets, and the holder layer that is right for a climate-controlled office is not the holder layer that is right for a hot garage or an unconditioned attic. The <a href="/blog/card-storage-environment-quick-reference">sports card storage environment quick-reference</a> is the selector that picks the right holder set + room-level fix from a measured room.</p>

<h2>Storage methods comparison</h2>'
      )
      WHERE slug = 'sports-card-storage-and-display-protection-stack'
      AND body NOT LIKE '%card-storage-environment-quick-reference%'
    `);

    // ── UPDATE: Back-link splice in basement-hot-climate-sports-card-storage ──
    // Insert an environment-to-solution pointer immediately before the
    // "The recursive answer" H2. This needle is unique to the basement post
    // and not reused by the cabinet guide splice at
    // 1785400000000_climate_controlled_cabinet_guide.js:214-223, which targets
    // the "A practical basement setup vs. a practical attic setup" H2.
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>The recursive answer</h2>',
        '<p>The recursive answer below is the right framing for the room-level remediation layers (silica gel, dehumidifier, UV case) on a hostile room-by-room basis. For the collector who has already measured a specific room with a $10 hygrometer and wants the holder-layer + room-level-fix combination that belongs in that exact environment &mdash; basement, hot garage, climate-controlled office, attic, climate cabinet, dehumidifier-equipped room &mdash; the <a href="/blog/card-storage-environment-quick-reference">sports card storage environment quick-reference</a> resolves it as a single lookup table.</p>

<h2>The recursive answer</h2>'
      )
      WHERE slug = 'basement-hot-climate-sports-card-storage'
      AND body NOT LIKE '%card-storage-environment-quick-reference%'
    `);

  },
};
