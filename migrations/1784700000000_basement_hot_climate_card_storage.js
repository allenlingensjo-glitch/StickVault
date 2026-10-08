module.exports = {
  name: 'basement_hot_climate_card_storage',
  up: async (client) => {

    // ── New affiliate link slug: dehumidifier ──────────────────────────────────
    // silica-gel and display-cases already exist (1783830000000)
    await client.query(`
      INSERT INTO affiliate_links (slug, label, program, target_url, commission_rate, link_type, pillar) VALUES
        ('dehumidifier', 'Small Dehumidifier for Card Storage Room — Amazon', 'Amazon',
         'https://www.amazon.com/s?k=small+dehumidifier+for+room&tag=stickvault0f-20',
         '3-10%', 'affiliate', 'Collecting')
      ON CONFLICT (slug) DO NOTHING;
    `);

    // ── New Post: Basement & Hot-Climate Sports Card Storage ───────────────────
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description, published)
      VALUES (
        'basement-hot-climate-sports-card-storage',
        'How to Store Sports Cards in a Basement Without Destroying Them',
        'collecting',
        'Basements and attics are where sports cards go to die slowly. Humidity cycling through concrete, attic heat spikes above 90°F, and exterior-wall condensation are environmental threats the protection stack does not solve. Here is the three-layer remediation that does — silica gel inside the box, a room-level dehumidifier, and a climate-controlled display case.',
        $body_basement_hot$
<p>The general sports card storage guidance &mdash; penny sleeve, top loader, one-touch, slab, storage box &mdash; assumes the storage room is benign. Climate-controlled. Stable. Dry. That assumption is wrong for a meaningful share of the hobby. Basements and attics are both common card storage locations, and both stress the collection in ways the protection stack does not solve on its own.</p>

<p>Every protection layer in the <a href="/blog/sports-card-storage-and-display-protection-stack">storage and display protection stack</a> addresses physical damage &mdash; surface contact, edge pressure, UV exposure. None of it addresses the room. Where you store cards matters as much as how you store them, and the room-by-room realities &mdash; basement humidity cycling with the foundation, attic heat spikes in summer, exterior-wall condensation in winter &mdash; are the layer most collectors never plan for. This piece is that layer.</p>

<h2>Why basements destroy cards</h2>

<p>A basement is wet in ways the rest of the house is not. Concrete walls wick groundwater through capillary action. HVAC vents may not reach the space, so the air sits. Drainage failures during heavy rain dump literal moisture into the room. Even a "dry" basement cycles between 50% and 80% relative humidity across the year as the foundation sweats with weather and temperature swings.</p>

<p>Cardboard &mdash; which is what every penny sleeve, top loader, storage box, and slab backing is made of &mdash; is hygroscopic. It absorbs and releases moisture with the surrounding air. At 70%+ relative humidity over weeks, cardboard waves, softens, and grows micro-mold at the ink edges of any card pressed against the wall of a holder. The mold does not always show up on the card face, but it stains holders and migrates into the cardboard backing of the storage box. Once a box is colonized, the spores spread every time the lid comes off.</p>

<p>Condensation is the second mechanism. A cold concrete wall in a humid basement develops surface condensation when the indoor dew point lands above the wall temperature. That condensation drips onto storage boxes stacked against the wall, softens the bottom edges of the boxes, and over months ruins the structural rigidity of the stack. A box that loses its shape stops keeping cards upright; cards lean into each other; corners chip against the slumping wall.</p>

<p>The remediation at the room level is a <a href="/r/dehumidifier" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>small room dehumidifier</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> sized to the basement floor area. A 35- to 50-pint unit is the common residential range and will pull a 500- to 1000-sq-ft basement into the 40&ndash;55% RH band on its own. Drain the reservoir to a floor drain or run a continuous-drain hose so you are not emptying it weekly. Run it year-round, not just in summer &mdash; basement humidity peaks in spring and fall, when outdoor air is damp but the basement is still cool.</p>

<h2>Why attics and hot climates break cards differently</h2>

<p>An attic is the inverse of a basement: dry but hot. Uninsulated attic spaces routinely reach 110&ndash;130&deg;F in summer sun, and the heat radiates back down through ceiling insulation into the living space below &mdash; but the storage boxes you keep in the attic itself are taking the full brunt. A climate-controlled room upstairs does not protect cards stored in the attic.</p>

<p>Heat accelerates every aging process. Ink dye fades faster at elevated temperatures &mdash; the printed surface of a chrome or refractor card bleaches visibly after one summer in an attic. Cardboard dries out below 30% RH, which is what an unconditioned attic does once the HVAC stops in winter, and gets brittle. The brittleness shows up first at the scored fold lines of the storage box, then at the corners of any cards you are handling directly.</p>

<p>Adhesive creep is a separate failure mode that hits older cards hardest. Vintage stickers and surface-applied patches use pressure-sensitive adhesives that soften with heat and migrate under their own weight. A 1970s hockey sticker stored in an attic for three summers can return with the sticker edges bleeding into the surrounding card. The damage is irreversible and happens even on cards that look fine on the surface.</p>

<p>For attic spaces and hot-climate living spaces (southwestern US summers, second-floor rooms under a sun-beaten roof, garage apartments with no insulation), the right move is to bring the storage inside the climate envelope of the house. Move boxes down from the attic into a climate-controlled closet. If the closet gets afternoon sun through a window, push the boxes to the interior wall. A <a href="/r/display-cases" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>UV-blocking acrylic display case</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> blocks visible-light fade for cards you do keep on display, but the storage boxes should still be in a temperature-stable room.</p>

<h2>The three remediation layers</h2>

<p>Three layers address the room-level threats: a buffer inside the box, a unit for the room, and a sealed case at the display layer.</p>

<p><strong>Layer 1 &mdash; Silica gel inside closed storage boxes.</strong> For boxes stored in a closet, cabinet, or otherwise enclosed space, drop a few <a href="/r/silica-gel" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>silica gel desiccant packets</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> into each storage box. They absorb excess moisture in a closed environment and cost pennies per packet. Replace or recharge (low oven, 250&deg;F for 2&ndash;3 hours) every 6&ndash;12 months. Silica gel is not a substitute for room-level humidity control &mdash; but it buffers the microclimate inside the box against swings. In a basement with a dehumidifier running, silica gel is the second line of defense; without room-level control, silica gel saturates in weeks.</p>

<p><strong>Layer 2 &mdash; Room-level dehumidifier for basement spaces.</strong> For basements specifically, a <a href="/r/dehumidifier" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>small room dehumidifier</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> is the right unit. For other rooms with humidity swings (laundry rooms, bathrooms without ventilation, garage conversions), a smaller 20- to 30-pint dehumidifier covers most residential spaces. Pair the dehumidifier with a $10 hygrometer so you can confirm the room is actually in the 35&ndash;55% range rather than guessing.</p>

<p><strong>Layer 3 &mdash; Climate-controlled display case.</strong> For cards on permanent display, a <a href="/r/display-cases" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>UV-blocking acrylic display case</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> blocks visible-light fade and seals the card against the room air for a small zone around the display. The display case does not solve a 90&deg;F attic &mdash; the heat will still get through to the card &mdash; but it stops humidity swing damage on display pieces that sit in a climate-controlled living space where the rest of the collection lives in the basement.</p>

<p>Apply all three in combination when possible. A basement with a dehumidifier running, silica gel packets in every storage box, and a display case for any graded slab on the wall over the basement stairs is the &ldquo;overkill setup&rdquo; that collectors with a high-value PC end up with eventually.</p>

<h2>Humidity and temperature numbers</h2>

<p>The general targets &mdash; the numbers every storage guide should hit &mdash; are borrowed from the <a href="/blog/sports-card-storage-and-display-protection-stack">storage and display protection stack</a>.</p>

<p><strong>Relative humidity: 35&ndash;55%.</strong> This is the range where cardboard stays dimensionally stable and ink does not bleed. Below 30% the stock dries and gets brittle. Above 60% the cardboard waves and the risk of mold or ink migration rises sharply. Most climate-controlled rooms sit naturally in this range; the risk is attics, basements, garages, and rooms with no HVAC. A $10 hygrometer tells you whether your storage room is in range &mdash; if it is not, you have a problem the holders do not solve.</p>

<p><strong>Temperature: under 70&deg;F, stable.</strong> Heat accelerates every aging process &mdash; ink fade, cardboard brittleness, adhesive failure on older stickers. Cooler is better, but stable is the more important word. A closet that swings from 60&deg;F to 85&deg;F with the seasons is worse than a closet that stays at 72&deg;F year-round. Avoid storing cards in attics, garages, and exterior walls where temperature swings are large.</p>

<p>The room-level numbers are the same regardless of whether the threat source is a basement or a hot climate. What changes is the unit you put in the room to hit those numbers.</p>

<h2>A practical basement setup vs. a practical attic setup</h2>

<p>The two environments break cards differently, and the remediation looks different for each. A basement setup solves humidity first; an attic setup solves heat first.</p>

<table class="comparison-table">
  <thead>
    <tr>
      <th>Threat</th>
      <th>Source</th>
      <th>First Remediation</th>
      <th>When to Escalate</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Humidity above 60%</td>
      <td>Concrete foundation wicking groundwater; no HVAC; drainage failure</td>
      <td>35&ndash;50 pint room dehumidifier with continuous drain</td>
      <td>If RH stays above 55% after a week of operation, add silica gel packets in every box and check for a drainage problem outside the foundation.</td>
    </tr>
    <tr>
      <td>Surface condensation on boxes</td>
      <td>Cold concrete walls in a humid basement; dew point above wall temperature</td>
      <td>Move boxes off the wall by 4&ndash;6 inches onto shelving, away from the coldest wall</td>
      <td>If condensation persists after moving boxes off the wall, run the dehumidifier continuously and consider insulating the wall behind the shelving.</td>
    </tr>
    <tr>
      <td>Heat spikes above 90&deg;F</td>
      <td>Direct sun on attic or upper floor; no insulation between storage and roof</td>
      <td>Move boxes down from the attic into a climate-controlled closet interior wall</td>
      <td>If the closet itself heats above 75&deg;F in summer, add a small window-unit AC or rotate PC keepers into the basement dehumidifier space.</td>
    </tr>
    <tr>
      <td>Adhesive creep on older cards</td>
      <td>Heat softening pressure-sensitive adhesives on 1970s&ndash;1980s stickers and patches</td>
      <td>Move any vintage collection out of hot-climate storage into climate-controlled space</td>
      <td>If vintage pieces are already showing edge bleed, separate them from the rest of the collection and store flat in one-touch holders within the climate envelope.</td>
    </tr>
    <tr>
      <td>Ink fade on chrome / refractor</td>
      <td>Direct sunlight or strong indirect daylight over months</td>
      <td>UV-blocking acrylic display case for any chrome card on display; rotate which chrome cards are out at once</td>
      <td>If the display wall receives direct sun at any hour, move the display to a north- or east-facing wall.</td>
    </tr>
    <tr>
      <td>Mold at storage box edges</td>
      <td>Prolonged humidity above 70% inside an enclosed box</td>
      <td>Discard the box; clean all cards in sleeve with a soft brush before re-housing in a new box with silica gel</td>
      <td>If the closet itself smells damp, address the room with a dehumidifier before re-housing any cards.</td>
    </tr>
  </tbody>
</table>

<p>Two collectors with the same protection stack will store their cards very differently based on which room in the house they have access to. A basement-only collector runs a dehumidifier as standard equipment. An attic-only collector runs a dehumidifier and moves boxes down the stairs in June.</p>

<div class="vault-cta">
  <div class="vault-cta-label">From the Vault</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> &mdash; the basement and attic environment log, the monthly humidity-reading tracker, and the dehumidifier placement checklist that catches the room-level threats the protection stack alone misses. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit &rarr;</a>
  </div>
</div>

<h2>The recursive answer</h2>

<p>The protection stack solves what the holders can solve. The room solves what the stack cannot. Both belong in the storage plan, and ignoring the room is the most common reason a well-protected collection ends up with mold, softened boxes, and brittle corners after a few years.</p>

<p>Run a $10 hygrometer in every room you store cards in for one week. If any room reads above 60% RH or above 75&deg;F daily, that room needs a unit &mdash; dehumidifier, AC, or a relocation of the boxes out of that room altogether. The protection stack on its own will not save a card stored for years in a basement that cycles to 80% RH every spring, and it will not save a chrome refractor stored for years in an attic that hits 110&deg;F every August.</p>

<p>The dealers who keep inventory long-term know this. The collectors who keep PC rookies for the next twenty years know this. Run the room check first, then build the protection stack on top. In that order.</p>

<div class="vault-next-read">
  <div class="vault-next-read-label">Recommended Next Read</div>
  <div class="vault-next-read-grid">
    <a href="/blog/sports-card-storage-and-display-protection-stack" class="vault-next-card">
      <div class="vault-next-card-title">Storage &amp; Display Protection Stack</div>
      <div class="vault-next-card-desc">The penny sleeve, top loader, one-touch, slab, and storage box layers that keep raw cards mint and slabs preserved &mdash; the holder side of this question.</div>
    </a>
    <a href="/blog/building-a-pc-sports-cards-long-term-collection-strategy" class="vault-next-card">
      <div class="vault-next-card-title">Building a PC: Long-Term Collection Strategy</div>
      <div class="vault-next-card-desc">Which cards to keep, which to flip, and how to design a personal collection that holds value &mdash; the long-term hold logic that the basement storage decision supports.</div>
    </a>
    <a href="/blog/grading-service-comparison-psa-bgs-sgc-cgc" class="vault-next-card">
      <div class="vault-next-card-title">Grading Service Comparison</div>
      <div class="vault-next-card-desc">PSA vs BGS vs SGC vs CGC across turnaround, cost tiers, resale premium, and submission strategy &mdash; the path the protection stack ends at for high-value cards.</div>
    </a>
  </div>
</div>
        $body_basement_hot$,
        8,
        'How to store sports cards in a basement or hot climate without destroying them — humidity cycling, attic heat spikes, and the three-layer remediation of silica gel, dehumidifier, and UV-blocking display case.',
        true
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    // ── UPDATE: Back-link in sports-card-storage-and-display-protection-stack ──
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>Environment: humidity, light, and temperature</h2>',
        '<p>The general humidity and temperature numbers above treat storage as a list of targets. The room-by-room realities &mdash; basement humidity cycling with the foundation, attic heat spikes in summer, exterior-wall condensation &mdash; are a different layer. They get their own treatment in the <a href="/blog/basement-hot-climate-sports-card-storage">basement and hot-climate sports card storage guide</a>.</p>

<h2>Environment: humidity, light, and temperature</h2>'
      )
      WHERE slug = 'sports-card-storage-and-display-protection-stack'
      AND body NOT LIKE '%basement-hot-climate-sports-card-storage%'
    `);

  },
};
