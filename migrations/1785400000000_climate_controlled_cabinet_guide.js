module.exports = {
  name: 'climate_controlled_cabinet_guide',
  up: async (client) => {

    // ── No new affiliate link slug. The /r/dehumidifier and /r/silica-gel slugs
    // were both registered in prior migrations (1784700000000 basement guide
    // for dehumidifier; 1783830000000 storage stack for silica-gel). The user
    // requirement explicitly says to "Hook into the existing dehumidifier
    // affiliate slug introduced with the basement storage guide" — so the
    // cabinet-dehumidifiers / peltier-dehumidifiers / climate-cabinets slot
    // that other migrations would normally mint is intentionally omitted here.

    // ── New Post: Climate-Controlled Sports Card Cabinet Guide ───────────────
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description, published)
      VALUES (
        'climate-controlled-sports-card-cabinet-guide',
        'Climate-Controlled Sports Card Cabinet Guide: Active vs. Passive Dehumidification, Capacity Tiers, and Top Furniture SKUs',
        'collecting',
        'When a PC outgrows closet shelving, the three remediation layers from the basement &amp; hot-climate guide &mdash; silica gel, room dehumidifier, UV-blocking display case &mdash; become too many moving parts to manage across a large collection. A sealed, climate-controlled display cabinet is the convergent upgrade: the dehumidifier, the desiccant buffer, and the case collapse into one piece of dedicated furniture. This is the active-vs-passive breakdown, the three capacity tiers, and the brand lines that slot into each.',
        $body_cabinet$
<p>The <a href="/blog/sports-card-storage-and-display-protection-stack">storage and display protection stack</a> walks the holder layers &mdash; penny sleeve, top loader, one-touch, slab, storage box &mdash; and the <a href="/blog/basement-hot-climate-sports-card-storage">basement and hot-climate sports card storage guide</a> walks the room-level fixes for collectors whose storage location is not benign (silica gel inside the box, a room-level dehumidifier for the basement, a UV-blocking display case for the centerpieces on the wall). Both pieces are aimed at the collector whose PC lives in a closet, a shelf unit, or a basement corner. This piece is for the collector whose PC has outgrown that logic &mdash; the collector whose personal collection is sized beyond closet shelving, and who needs a single piece of dedicated furniture that holds the climate control, the display, and the storage at once. That piece of furniture is a climate-controlled sports card cabinet.</p>

<p>A climate-controlled cabinet is the convergent answer when the three remediation layers become too many moving parts to manage. Silica gel saturates and needs recharging. A room dehumidifier needs a drain line, a hygrometer check, and seasonal power-on discipline. A display case protects a few centerpieces but does not solve humidity for the rest of the collection. Stack those three across a 2,000-slab PC and you have a setup that is technically correct and operationally fragile. The cabinet collapses all three into a sealed interior volume with a single environmental target. Smaller surface area, fewer seams, one setpoint instead of three. The trade-off is price and footprint &mdash; cabinets start around $300 for an entry-tier shelf unit and climb past $2,500 for a walk-in conversion with a built-in compressor dehumidifier.</p>

<h2>What a climate-controlled cabinet actually is</h2>

<p>The label &ldquo;climate-controlled&rdquo; gets used loosely in hobby listings. The serious version has five structural elements that distinguish it from a glass-door bookshelf with a hygrometer taped to the side. Knowing the five elements is what separates a cabinet you can trust with a $20,000 PC from a cabinet that just looks like one.</p>

<p><strong>Sealed door.</strong> Either a gasket seal (rubber or foam compression strip around the door perimeter, similar to a wine cooler or a refrigerator) or a magnetic seal (the door closes against a magnet strip in the frame, like a refrigerator-freezer door). A cabinet without a seal is just a glass-door bookshelf &mdash; humidity inside the cabinet equilibrates with the room within hours, and any desiccant or built-in dehumidifier has to fight the unsealed volume, not a closed one.</p>

<p><strong>Internal humidity control.</strong> Three valid methods, in order of capacity: passive desiccant (silica gel packets, DampRid containers, or art-grade calcium chloride packs inside the cabinet, manually recharged or exchanged); active thermoelectric Peltier dehumidifier (a small electric module that condenses moisture on a cold plate inside the cabinet, drains to an internal reservoir or a tube out the back); or compressor dehumidifier (a refrigeration-cycle dehumidifier sized to the cabinet's interior volume &mdash; used in larger cabinets and walk-in conversions). A cabinet with no humidity control is a display case, not a climate-controlled cabinet.</p>

<p><strong>Internal hygrometer and thermometer.</strong> Either analog dial hygrometers built into the cabinet frame or digital hygrometer-thermometer units mounted inside, visible through the glass. Without a readout, you are guessing whether the cabinet is actually at the 35&ndash;55% RH / under 70&deg;F targets. The readout is non-optional.</p>

<p><strong>Glass or acrylic front.</strong> Either UV-filtering or standard; UV-filtering is the right choice for any cabinet that holds cards on permanent display (the protection stack's UV rule applies inside the cabinet as well as on the wall). Magnetic-mount card holders on trays inside the cabinet can also serve as the display surface if there is no separate glass front, but the dominant design is a glass or acrylic panel that lets the contents be seen without opening the door.</p>

<p><strong>Internal lighting.</strong> LED strips or puck lights mounted at the top or under shelves, designed for enclosed furniture. LED is the right choice &mdash; halogen or incandescent adds 5&ndash;10&deg;F to the interior temperature over hours of operation and shifts the humidity setpoint. A cabinet with halogen interior lighting is a cabinet running warmer than the readout says.</p>

<p>A unit that has all five of these is a climate-controlled cabinet. A unit that has only the glass front and a hygrometer sticker is a display case. A unit with the glass front and the dehumidifier but no seal is a bookshelf with a dehumidifier running to compensate for its own lack of a seal &mdash; it works but it costs more in electricity than it should.</p>

<h2>Active vs. passive dehumidification</h2>

<p>The choice between passive (desiccant) and active (Peltier or compressor) is the first structural decision once the five-element check is passed. The right answer depends on cabinet volume, tolerance for electrical infrastructure, and tolerance for recharging discipline.</p>

<table class="comparison-table">
  <thead>
    <tr>
      <th>Method</th>
      <th>RH range maintained</th>
      <th>Capacity</th>
      <th>Noise</th>
      <th>Power</th>
      <th>Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Passive desiccant (<a href="/r/silica-gel" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>silica gel desiccant packets</strong> <span class="affiliate-cta">Check Price &rarr;</span></a>, DampRid, art-grade calcium chloride)</td>
      <td>35&ndash;55% sustained only in a sealed enclosure; regular recharging required</td>
      <td>Best under 5 cu ft cabinet volume; saturates quickly in larger cabinets</td>
      <td>Silent</td>
      <td>None</td>
      <td>~$30/yr desiccant budget (recharge or replace)</td>
    </tr>
    <tr>
      <td>Active Peltier thermoelectric dehumidifier (a small <a href="/r/dehumidifier" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>room dehumidifier</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> wired into the cabinet interior)</td>
      <td>35&ndash;55% sustained without recharging</td>
      <td>Suited to enclosed cabinet volumes up to ~30 cu ft</td>
      <td>Very quiet (low fan speed)</td>
      <td>30&ndash;60W continuous</td>
      <td>~$150&ndash;$400 unit</td>
    </tr>
    <tr>
      <td>Active compressor dehumidifier (room-level dehumidifier inside the cabinet, or in-line with a walk-in conversion)</td>
      <td>35&ndash;55% sustained without recharging; faster recovery after door-open events</td>
      <td>Best for 30+ cu ft cabinets and walk-in conversions</td>
      <td>Noticeable compressor cycle (similar to a small refrigerator)</td>
      <td>200&ndash;500W during compressor cycle</td>
      <td>~$300&ndash;$900 unit, plus drain line installation</td>
    </tr>
  </tbody>
</table>

<p>The tradeoff line, stated directly: passive desiccant is the right method for cabinets under about 5 cubic feet and for cabinets that see only short humidity excursions &mdash; a door opened a few times a week, a closet-level baseline environment, no extreme swings. Active Peltier is the right method for sealed cabinets in the 5- to 30-cu-ft range with a closed-door baseline and infrequent access. Active compressor is the right method for cabinets larger than 30 cu ft, for walk-in conversions, and for any cabinet in a room where the baseline humidity drifts well above 60%.</p>

<p>Collectors with both passive and active in the same cabinet &mdash; active Peltier or compressor for sustained control, passive silica gel as the backup buffer when the power fails or when the active unit cycles off &mdash; have the most robust setup. The passive layer is insurance against the active layer's failure modes (power outage, compressor failure, drain-line clog). At $30/yr in silica gel, the backup is cheap. <a href="/r/dehumidifier" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Match the active dehumidifier</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> to the cabinet volume and intersperse a few desiccant trays at the corners.</p>

<h2>Capacity tiers: shelf cabinet vs. mid-size vs. walk-in</h2>

<p>Three cabinet tiers cover the collector space. The choice between them is driven by PC size, available floor space, and budget, in that order.</p>

<table class="comparison-table">
  <thead>
    <tr>
      <th>Tier</th>
      <th>Volume</th>
      <th>Holds (graded slabs)</th>
      <th>Built-in Climate</th>
      <th>Best For</th>
      <th>Price Band</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Shelf cabinet</td>
      <td>5&ndash;12 cu ft</td>
      <td>200&ndash;600 graded slabs vertically, or plus raw/top-loader storage in drawers</td>
      <td>Passive silica gel only OR Peltier insert</td>
      <td>Single-PC tower, low-noise bedroom or office placement, small footprint</td>
      <td>$300&ndash;$900</td>
    </tr>
    <tr>
      <td>Mid-size display cabinet</td>
      <td>15&ndash;40 cu ft</td>
      <td>600&ndash;2,500 graded slabs across multiple shelves and drawers</td>
      <td>Peltier insert OR small compressor unit with internal drain</td>
      <td>Multi-PC display with both bulk storage and a few centerpieces on the upper shelves, dedicated den or basement room placement</td>
      <td>$800&ndash;$2,500</td>
    </tr>
    <tr>
      <td>Walk-in conversion / gun-room style</td>
      <td>50+ cu ft (often 100&ndash;300 cu ft)</td>
      <td>Thousands of graded slabs; raw boxes and binders on floor along walls</td>
      <td>Compressor dehumidifier at room level + passive silica gel in each shelf zone</td>
      <td>Bulk collection, dealer-grade storage, hobby business inventory, multi-collector shared space</td>
      <td>$2,500&ndash;$8,000+ with shelving</td>
    </tr>
  </tbody>
</table>

<p>The shelf tier is the entry point. A 5- to 12-cu-ft cabinet &mdash; roughly the size of a small refrigerator or a tall five-shelf bookcase &mdash; holds a single-PC tower of graded slabs and a few raw cards in the drawers. Passive silica gel is sufficient if the cabinet is sealed and the surrounding room is in the 40&ndash;55% RH range; add an <a href="/r/dehumidifier" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>active Peltier dehumidifier</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> insert if the surrounding room drifts above 60% in summer.</p>

<p>The mid-size tier is where most serious collectors land once the PC crosses about 600 slabs. The cabinet has the footprint of a wider dresser or a small sideboard, holds centerpieces on the upper glass shelves and bulk storage in the lower drawers, and runs a Peltier unit or a small compressor with an internal drain. The Peltier-vs-compressor choice at this tier depends on noise tolerance &mdash; Peltier is silent enough for a bedroom wall; compressor is borderline for a bedroom but fine for a basement, garage conversion, or den. For the active + passive combination, see the previous section &mdash; the same logic applies at every tier.</p>

<p>The walk-in tier is a different project &mdash; a closet, a small room, or a sectioned-off area of a basement converted into a climate-controlled storage room. The dehumidifier is a room-level compressor unit sized to the whole space (the same kind covered in the basement guide, but now standing inside the enclosed space rather than fighting an open basement). Shelving is built-in or freestanding; the cabinet-as-furniture concept gives way to the room-as-cabinet concept. The price band climbs fast because shelving, lighting, and the dehumidifier-with-drain installation are all separate line items.</p>

<h2>Top furniture SKUs (categories, not single-product affiliates)</h2>

<p>Six brand lines cover the hobby climate-controlled cabinet space. The article intentionally keeps <code>/r/dehumidifier</code> and <code>/r/silica-gel</code> as the monetization anchors rather than spinning up single-product affiliate links for every brand. The active dehumidifier and the silica gel buffer are the consumables that recur across every tier; the cabinet itself is a one-time purchase that does not need an affiliate slot per brand.</p>

<p><strong>SentrySafe.</strong> Fire-rated and water-resistant safe-style cabinets. The SentrySafe line is built around the security and fire-survival use case rather than the climate-controlled-display use case, but several models include a gasketed door and an interior that holds humidity steady enough for short-to-medium-term storage. The right answer for collectors whose priority is fire and water survival (a basement in a flood zone, a garage conversion) more than display.</p>

<p><strong>Cubic Defender / SUNTHIN.</strong> Small Peltier display-case inserts designed to drop into an existing glass-door cabinet. These are not cabinets &mdash; they are dehumidifier modules marketed for the &ldquo;convert your existing bookcase into climate-controlled&rdquo; use case. The right answer for collectors who already own a glass-door display cabinet and want to add active dehumidification without replacing the furniture.</p>

<p><strong>Vault X.</strong> Premium hobby display cabinet with optional Peltier dehumidifier insert and interior lighting. Vault X's higher-end hobby cabinet line is one of the few hobby-brand products that genuinely integrates active climate control into the furniture design rather than treating it as an aftermarket add-on. The right answer for collectors who want the hobby-brand aesthetic with built-in climate control rather than a converted bookcase.</p>

<p><strong>BCW.</strong> The hobby default for cabinet furniture with passive desiccant trays. BCW's wood and laminate cabinet line is the most common hobby-grade cabinet in working collections, with passive desiccant trays as the standard humidity-control layer. The right answer for collectors who want hobby default furniture at the entry-to-mid price tier and are willing to add their own Peltier insert or step up to silica gel recharging discipline rather than buying a built-in active unit.</p>

<p><strong>SnapSafe.</strong> Modular closet-to-cabinet conversion frames. SnapSafe's lockdown-style modular frames are designed for the gun-room conversion case; they adapt cleanly to a card-room conversion and stack into walk-in-tier setups. The right answer for the walk-in tier where the collector wants modular, expandable shelf-and-frame furniture rather than built-in shelving.</p>

<p><strong>IKEA-compatible deep-frame / Best&aring; / Pax-with-glass-door.</strong> The budget display path. IKEA's Best&aring; and Pax lines accept glass-door inserts, accept internal lighting strips, and combine with a separately-mounted Peltier dehumidifier module for an entry-tier climate-controlled display cabinet at a fraction of the hobby-brand price. The build-it-yourself aspect is the trade-off &mdash; the cabinet is not pre-engineered for the dehumidifier, the hygrometer mounting is DIY, and the seal depends on how carefully the glass-door panels are installed. The right answer for the collector who wants a mid-size-tier footprint at a shelf-tier price and is comfortable sourcing the Peltier insert and the seal upgrades separately.</p>

<h2>Humidity and temperature targets inside the cabinet</h2>

<p>The cabinet-internal targets are the same numbers as the room-level targets from the protection stack: 35&ndash;55% relative humidity and under 70&deg;F, stable. What changes inside a sealed cabinet is the speed of the environmental response, which is faster than a room and slower than a single one-touch holder.</p>

<p><strong>35&ndash;55% RH.</strong> The same band the protection stack sets for the room. Cardboard stays dimensionally stable, ink does not bleed, and surface mold does not colonize. The cabinet should have its own hygrometer so the interior reading can be confirmed separately from the room reading &mdash; a cabinet that reads 45% in a room that reads 75% is evidence the cabinet's seal and dehumidifier are doing their job; a cabinet that reads 60% in a 45% room is evidence the seal is failing or the desiccant is saturated.</p>

<p><strong>Under 70&deg;F, stable.</strong> The same temperature target as the room. Cooler is better, stable is more important. A cabinet in a south-facing room that drifts from 65&deg;F in winter to 78&deg;F in summer is worse than a cabinet in a north-facing room that holds 68&deg;F year-round. The cabinet's interior lighting matters &mdash; LED strips add negligible heat; halogen or incandescent puck lights add 5&ndash;10&deg;F to the interior over hours of operation and shift the humidity setpoint the same amount. LED is the right choice for any cabinet with internal lighting.</p>

<p><strong>Door-open recovery.</strong> A passive silica gel cabinet recovers slowly from a door-open event &mdash; the interior RH climbs to the room RH within minutes, and the silica gel takes hours to pull it back down. An active Peltier or compressor cabinet recovers in minutes after the door closes. For a cabinet accessed a few times a week, passive is fine. For a cabinet accessed daily or multiple times per day, active is the right infrastructure &mdash; even at the shelf tier, the active unit's faster recovery keeps the interior out of the 60%+ danger zone that frequent door-opens cause. Plan a <a href="/r/silica-gel" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>silica gel passive backup</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> alongside the active unit regardless &mdash; the passive layer catches the active unit's failure modes.</p>

<div class="vault-cta">
  <div class="vault-cta-label">From the Vault</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> &mdash; the cabinet climate log template (weekly interior RH and temperature readings, door-open event log, desiccant recharge calendar), the monthly humidity sweep across the cabinet zones, and the cabinet-tier selection matrix keyed to PC size and available floor space. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit &rarr;</a>
  </div>
</div>

<h2>The two-tradeoff summary</h2>

<p>Two tradeoffs run through every tier and every brand. Stated directly because the cabinet decision collapses to two questions:</p>

<p><strong>Tradeoff 1: passive vs. active.</strong> Passive (silica gel) is silent, zero-power, and ~$30/yr to maintain &mdash; the right method for cabinets under about 5 cu ft and short humidity excursions. Active (Peltier or compressor) is quieter than the basement version but uses 30&ndash;500W continuous, requires drain-line discipline on the compressor tier, and recovers from door-open events in minutes instead of hours. The active + passive combination is the most robust setup across every tier.</p>

<p><strong>Tradeoff 2: shelf, mid-size, or walk-in.</strong> Shelf (5&ndash;12 cu ft, 200&ndash;600 slabs, $300&ndash;$900) is the entry tier for the single-PC outgrowing the closet. Mid-size (15&ndash;40 cu ft, 600&ndash;2,500 slabs, $800&ndash;$2,500) is where most larger PCs land. Walk-in (50+ cu ft, thousands of slabs, $2,500&ndash;$8,000+ with shelving) is the dealer-grade tier or the multi-collector shared tier. The choice depends on PC size, available floor space, and budget, in that order &mdash; not on display ambition.</p>

<p>Below 200 graded slabs and a closet-shelf setup: the basement guide's three remediation layers are the right infrastructure. Between 200 and 600 slabs: the shelf-tier cabinet. Between 600 and 2,500: the mid-size. Above 2,500: the walk-in. The cabinet is the upgrade that consolidates the three layers into one piece of furniture, not the replacement for the three layers in a small collection.</p>

<div class="vault-next-read">
  <div class="vault-next-read-label">Recommended Next Read</div>
  <div class="vault-next-read-grid">
    <a href="/blog/sports-card-storage-and-display-protection-stack" class="vault-next-card">
      <div class="vault-next-card-title">Storage &amp; Display Protection Stack</div>
      <div class="vault-next-card-desc">The penny sleeve, top loader, one-touch, slab, and storage box layers that keep raw cards mint and slabs preserved &mdash; the holder side this cabinet decision sits on top of.</div>
    </a>
    <a href="/blog/basement-hot-climate-sports-card-storage" class="vault-next-card">
      <div class="vault-next-card-title">Basement &amp; Hot-Climate Storage</div>
      <div class="vault-next-card-desc">The room-level remediation layers &mdash; silica gel inside the box, room-level dehumidifier for the basement, UV-blocking display case on the wall &mdash; that this cabinet consolidates for collectors whose PC outgrows the closet-shelf setup.</div>
    </a>
    <a href="/blog/sports-card-wall-mount-display-frame-review" class="vault-next-card">
      <div class="vault-next-card-title">Wall-Mount Display &amp; Frame Review</div>
      <div class="vault-next-card-desc">The four wall-mount formats (UV frame, magnetic-mount, acrylic shadow box, custom framing) and the brand tier list for centerpieces that graduate from inside-the-cabinet display to dedicated wall treatment.</div>
    </a>
  </div>
</div>
        $body_cabinet$,
        9,
        'Climate-controlled sports card cabinet guide: active vs passive dehumidification, the three capacity tiers (shelf cabinet / mid-size display / walk-in conversion), furniture SKU categories, and the 35-55% RH and under-70F targets inside the sealed cabinet.',
        true
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    // ── UPDATE: Back-link splice in basement/hot-climate storage post ────────
    // One-paragraph intro before the "A practical basement setup vs. a practical
    // attic setup" H2 routes readers from the room-level fixes into the new
    // dedicated-furniture upgrade. Idempotency guard mirrors
    // 1784700000000_basement_hot_climate_card_storage.js:175,
    // 1785300000000_sports_card_wall_mount_frames_review.js:230, and
    // 1785200000000_sports_card_binder_portfolio_review.js:247.
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>A practical basement setup vs. a practical attic setup</h2>',
        '<p>For collectors with a PC sized beyond closet shelving &mdash; and for the basement setup that becomes the dedicated overstock room for the entire collection &mdash; the next step above the three remediation layers is a sealed, climate-controlled display cabinet. The room above becomes the cabinet itself; the dehumidifier, silica gel, and display case converge into a single piece of dedicated furniture. The <a href="/blog/climate-controlled-sports-card-cabinet-guide">climate-controlled sports card cabinet guide</a> walks through active vs passive dehumidification, the three capacity tiers (shelf cabinet / mid-size display / walk-in conversion), and the brand lines that slot into each.</p>

<h2>A practical basement setup vs. a practical attic setup</h2>'
      )
      WHERE slug = 'basement-hot-climate-sports-card-storage'
      AND body NOT LIKE '%climate-controlled-sports-card-cabinet-guide%'
    `);

  },
};
