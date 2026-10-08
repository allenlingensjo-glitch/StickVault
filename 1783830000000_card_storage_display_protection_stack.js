module.exports = {
  name: 'card_storage_display_protection_stack',
  up: async (client) => {

    // ── New affiliate link slugs: silica-gel and display-cases ────────────────
    // penny-sleeves, top-loaders, one-touch, and card-boxes already exist
    await client.query(`
      INSERT INTO affiliate_links (slug, label, program, target_url, commission_rate, link_type, pillar) VALUES
        ('silica-gel',    'Silica Gel Desiccant Packets — Amazon', 'Amazon', 'https://www.amazon.com/s?k=silica+gel+packets+card+storage', '3-10%', 'affiliate', 'Collecting'),
        ('display-cases', 'UV-Blocking Acrylic Card Display Cases — Amazon', 'Amazon', 'https://www.amazon.com/s?k=UV+blocking+acrylic+card+display+case', '3-10%', 'affiliate', 'Collecting')
      ON CONFLICT (slug) DO NOTHING;
    `);

    // ── New Post: Sports Card Storage and Display: Protection Stack ──────────
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description, published)
      VALUES (
        'sports-card-storage-and-display-protection-stack',
        'Sports Card Storage and Display: The Protection Stack That Keeps Cards Mint',
        'collecting',
        'The right protection stack — penny sleeve, top loader, one-touch, slab, box, and display case — turns the difference between a mint card and a damaged one. Here is how each layer works and where it belongs in your collection.',
        $body_storage$
<p>Most sports card damage is not dramatic. A card does not get crushed, waterlogged, or eaten by a pet — it gets a fingerprint at the edge of the gloss, a micro-scratch across the chrome from sliding against another card, a corner ding from sitting in a too-tight top loader, or a sun-bleached face after six months on a windowsill. None of these are catastrophic on their own. Together, they are the difference between a card that grades a 9 and a card that grades a 6 — and the difference between a $20 card and a $250 card.</p>

<p>The defense against that slow degradation is a <strong>protection stack</strong>: layered holders, boxes, and environment controls that each solve a specific failure mode. None of the layers are expensive. The cost is in discipline — applying every layer consistently, for every card, regardless of what you think it is worth today.</p>

<h2>Threats to your cards</h2>

<p>Before talking about solutions, name the threats in order of how often they actually damage cards in practice.</p>

<p><strong>Surface oils and fingerprints.</strong> Skin oil transfers on contact. On a glossy or chrome surface it leaves a visible print that does not wipe off without risking the finish. On matte or textured stock it sinks into the paper over time and slowly stains. Every handler touching a card surface is a small downgrade event.</p>

<p><strong>Surface scratches.</strong> Card-to-card contact in a stack, or sliding a card across a tabletop, creates micro-abrasions across the gloss. These are the most common reason a near-mint card loses half a grade at PSA. The fix is never "be more careful" — it is to put a barrier between the card and everything that could touch it.</p>

<p><strong>Edge and corner chipping.</strong> The corners and edges of a card are where damage shows up first, because that is where two cards meet in a stack and where a card makes contact with a top loader wall that is slightly too tight. A 35-point card in a 35-point top loader that gets jostled in a box will eventually round its corners against the loader wall.</p>

<p><strong>Humidity.</strong> Cards absorb and release moisture with the room. Above 60% relative humidity the cardboard starts to wave and the inks can bleed at the edges. Below 30% the cardboard dries out and gets brittle. Either extreme is bad over months of storage.</p>

<p><strong>UV fading.</strong> Direct sunlight, or even strong indirect daylight over months, will fade the printed surface of a card. The print does not recover. UV-filtering sleeves and acrylic help; avoiding direct light is better.</p>

<p><strong>Pressure deformation.</strong> A heavy stack of cards on top of a single card, or a card stored flat under weight, can leave a permanent surface impression or curl. The fix is upright storage in a fitted box.</p>

<p>Each of these has a corresponding layer in the protection stack. No single layer addresses all six — that is why it is a stack, not a holder.</p>

<h2>The protection stack: raw to graded</h2>

<p>The protection stack is a layered model. Each layer assumes the layers below it. Skipping a layer breaks the model.</p>

<p><strong>Layer 1 — Penny sleeve.</strong> The base layer for any raw card that gets handled. A soft, clear polypropylene sleeve that covers the card on all four sides with a small flap. The sleeve does two things: it keeps fingerprints off the surface, and it stops card-to-card contact when the card is in a stack. For under-a-dollar per hundred sleeves, this is the single highest-leverage purchase in the hobby. Start every raw card with <a href="/r/penny-sleeves" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>BCW penny sleeves</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> — they fit standard 35-point cards and have a clean open edge that does not catch.</p>

<p><strong>Layer 2 — Top loader.</strong> A rigid plastic holder, sized to the card's point thickness, that gives the card structural protection from pressure and impact. The penny-sleeved card slides into the loader, and the loader walls keep the card from touching anything. For 35-point cards, use <a href="/r/top-loaders" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Ultra Pro top loaders</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> as the standard. For 55- to 130-point thick cards (chrome, relics, patch autos), use 75-point or 130-point loaders so the card does not rattle inside the holder. A top loader that is too tight is a corner-chipping risk; a loader that is too loose is a sliding risk. Match the loader to the card.</p>

<p><strong>Layer 3 — One-touch magnetic holder.</strong> For raw cards you are keeping long-term and not submitting for grading, a one-touch magnetic holder is the upgrade over a penny sleeve plus top loader. The card sits in a recessed tray with the face and back untouched by the holder, and two magnetic panels snap shut around it. The card does not slide, does not get fingerprint contact on either surface, and is held in a UV-protective acrylic case. For PC keepers — vintage, low-numbered parallels, key rookies you are not flipping — use <a href="/r/one-touch" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Ultra Pro One-Touch magnetic holder</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> sized to the card's point thickness. These are 5–10x the cost of a top loader, which is why you reserve them for keepers, not bulk storage.</p>

<p><strong>Layer 4 — Graded slab.</strong> For cards where preservation matters more than accessibility — and where you have decided the grade premium covers the grading fee — the PSA, BGS, SGC, or CGC slab is the protection layer. A properly sealed slab blocks UV, moisture, fingerprints, surface scratches, edge contact, and pressure. The card is essentially in stasis. The decision of when to grade is a separate question (covered in the <a href="/blog/grading-service-comparison-psa-bgs-sgc-cgc">grading service comparison guide</a>), but once a card is slabbed, storage is solved for that piece — it sits upright in a slab-rated box and that is the end of the protection conversation.</p>

<p><strong>Layer 5 — Card storage box.</strong> The box is the storage infrastructure that holds the loaded holders — penny-sleeved top loaders, one-touches, or slabs — in an organized upright position. The right box prevents horizontal stacking pressure and keeps the cards accessible. Standard sizes are 100, 200, 400, 800, and 3200 count; match the box to your collection size. For a working collection that is being added to weekly, <a href="/r/card-boxes" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>BCW card storage boxes</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> with cardboard dividers separate PC from flip from graded so retrieval does not require dumping the box.</p>

<p>The stack applied end-to-end: penny sleeve inside a top loader (or a one-touch for keepers), standing upright in a divided storage box, in a climate-controlled room. That is the entire protection model. Everything else is environment and display.</p>

<div class="vault-cta">
  <div class="vault-cta-label">From the Vault</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> — protection-stack inventory checklist, storage box labeling system, and the environment log that catches humidity and temperature drift before it costs you a card. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit →</a>
  </div>
</div>

<h2>Storage methods comparison</h2>

<p>The table below compares the six most common holder-and-storage combinations across what they are best suited for, the protection level they offer, the per-card cost, and where each one breaks down. Pick by use case, not by default.</p>

<table class="comparison-table">
  <thead>
    <tr>
      <th>Method</th>
      <th>Best For</th>
      <th>Protection Level</th>
      <th>Cost / Card</th>
      <th>Drawbacks</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Penny sleeve + top loader</td>
      <td>Bulk raw cards, singles you are still evaluating, submission prep</td>
      <td>High — surface + structural</td>
      <td>$0.10–$0.20</td>
      <td>Loader wall can ding corners if too tight; not UV-protected on its own</td>
    </tr>
    <tr>
      <td>One-touch magnetic holder</td>
      <td>PC keepers, raw vintage, low-numbered parallels not being graded</td>
      <td>Very high — face untouched, UV acrylic</td>
      <td>$2–$4</td>
      <td>Expensive for bulk; magnetic seal weakens over years; not airtight</td>
    </tr>
    <tr>
      <td>Semi-rigid card saver (CS)</td>
      <td>Submission shipping, temporary handling only</td>
      <td>Medium — face protected, edges exposed</td>
      <td>$0.05–$0.10</td>
      <td>Not a long-term holder; opens easily; not UV-protected</td>
    </tr>
    <tr>
      <td>Graded slab (PSA / BGS / SGC / CGC)</td>
      <td>High-value cards you want authenticated and preserved</td>
      <td>Maximum — full encapsulation, tamper-evident, UV-protected</td>
      <td>$25–$150+ grading fee + $1 slab</td>
      <td>Irreversible without breaking the holder; requires reholder fee if label damaged</td>
    </tr>
    <tr>
      <td>Card storage box</td>
      <td>Holding top-loaded, one-touch, or slabbed cards upright and organized</td>
      <td>Infrastructure only — protects against pressure and disorder</td>
      <td>$10–$20 per box (divided by 200–3200)</td>
      <td>Cardboard degrades if damp; not fire- or flood-rated</td>
    </tr>
    <tr>
      <td>Binder with 9-pocket pages</td>
      <td>Browse-able collection, low-value raw, set-building</td>
      <td>Low to medium — pages scratch cards on insert; binder spine bends</td>
      <td>$0.30–$0.50 per page (9 cards)</td>
      <td>Friction damage on insertion; pages warp; no UV protection</td>
    </tr>
  </tbody>
</table>

<p>The honest read on binders: they are display tools, not protection tools. Use them for cards you accept will downgrade over time — bulk base cards, common parallels, anything you want visible at a glance. Use a top loader plus box for anything you care about the grade of.</p>

<h2>Environment: humidity, light, and temperature</h2>

<p>The holders stop physical damage. Environment stops chemical and aging damage. Three numbers to track.</p>

<p><strong>Relative humidity: 35–55%.</strong> This is the range where cardboard stays dimensionally stable and ink does not bleed. Below 30% the stock dries and gets brittle. Above 60% the cardboard waves and the risk of mold or ink migration rises sharply. Most climate-controlled rooms sit naturally in this range; the risk is attics, basements, garages, and rooms with no HVAC. A $10 hygrometer tells you whether your storage room is in range — if it is not, you have a problem the holders do not solve.</p>

<p><strong>Humidity buffer:</strong> for boxes stored in a closet, cabinet, or otherwise enclosed space, drop a few <a href="/r/silica-gel" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>silica gel desiccant packets</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> into each storage box. They absorb excess moisture in a closed environment and cost pennies per packet. Replace or recharge (low oven, 250°F for 2–3 hours) every 6–12 months. They are not a substitute for room-level humidity control — but they buffer the microclimate inside the box against swings.</p>

<p><strong>Temperature: under 70°F, stable.</strong> Heat accelerates every aging process — ink fade, cardboard brittleness, adhesive failure on older stickers. Cooler is better, but stable is the more important word. A closet that swings from 60°F to 85°F with the seasons is worse than a closet that stays at 72°F year-round. Avoid storing cards in attics, garages, and exterior walls where temperature swings are large.</p>

<p><strong>Light: no direct sun.</strong> UV is the silent degrader. A card on a sunlit shelf for six months will show measurable fade; the same card in a shaded room for six years will not. Indirect daylight through a north-facing window is fine for short-term display. Direct sunlight on any card for any length of time is a downgrade event you can avoid.</p>

<h2>Display without damage</h2>

<p>Displaying a card is, structurally, the opposite of storing it. Storage is hide it from light, air, pressure, and contact. Display is show it to all four. The protection stack at the display layer has to actively reverse those exposures without ruining the visibility that is the point of the display.</p>

<p><strong>UV-filtering acrylic or glass.</strong> Standard glass blocks most UV but lets visible light through, which still causes slow fade over years. UV-filtering acrylic (museum-grade, often branded as Optium Museum Acrylic or equivalent) blocks both UV and a meaningful slice of visible-light damage. A <a href="/r/display-cases" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>UV-blocking acrylic display case</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> sized for trading cards is the right move for anything on permanent display — especially a graded slab where the case label itself can fade if left in direct sun.</p>

<p><strong>Wall placement.</strong> Direct sunlight on the display wall is the single most common display-related damage event. Even with a UV-filtering case, mounting a card on a wall that gets afternoon sun will fade the visible card surface within a year. North- and east-facing walls are safer; south- and west-facing walls need to be checked at the actual mounting location for the time of day they receive direct sun. If the wall gets direct sun, the display does not go there.</p>

<p><strong>Framed displays.</strong> For multi-card displays (a row of PC keepers, a graded rainbow, a set page), use a shadow box frame with UV-filtering glass or acrylic. Spacing between cards matters — cards mounted face-to-face with a clear spacer, or card-to-card with no spacer, will abrade each other over time. Each card in its own one-touch or sleeve, then mounted in the frame, is the right structure.</p>

<p><strong>Rotating display vs. permanent.</strong> If you have a large collection and want to show it off, rotate which cards are on the wall rather than putting the full collection out at once. Three months on display, then into a storage box for a year, then back out. The rotation reduces cumulative light exposure on any single card and keeps the display fresh. Permanent wall mounting is for pieces you have accepted will fade over the years — usually lower-value bulk cards or duplicates.</p>

<p>The principle is the same as storage: every exposure is a downgrade event. Display reverses that, but does not eliminate it. The protection stack applied to display means UV-filtering holder, no direct sun, sensible rotation, and card-to-card spacing.</p>

<div class="vault-cta">
  <div class="vault-cta-label">System Reference</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> — environment log, humidity range tracker, and the display-rotation calendar that spreads light exposure across your keepers evenly. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit →</a>
  </div>
</div>

<div class="vault-next-read">
  <div class="vault-next-read-label">Recommended Next Read</div>
  <div class="vault-next-read-grid">
    <a href="/blog/affordable-collector-tools-under-50" class="vault-next-card">
      <div class="vault-next-card-title">Affordable Collector Tools</div>
      <div class="vault-next-card-desc">The sub-$50 tools that anchor every layer of the protection stack — sleeve, top loader, one-touch, UV lamp, and storage box.</div>
    </a>
    <a href="/blog/grading-service-comparison-psa-bgs-sgc-cgc" class="vault-next-card">
      <div class="vault-next-card-title">Grading Service Comparison</div>
      <div class="vault-next-card-desc">When the protection stack ends in a slab instead of a one-touch — PSA vs BGS vs SGC vs CGC across cost, turnaround, and resale premium.</div>
    </a>
    <a href="/blog/ebay-listing-optimization" class="vault-next-card">
      <div class="vault-next-card-title">eBay Listing Optimization</div>
      <div class="vault-next-card-desc">How well-stored, well-photographed cards close at higher prices — lighting, holder visibility, and listing structure that builds buyer trust.</div>
    </a>
  </div>
</div>
        $body_storage$,
        7,
        'Sports card storage and display: the protection stack that keeps cards mint — penny sleeve, top loader, one-touch, slab, box, and UV-filtering display.',
        true
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    // ── UPDATE: Back-link in affordable-collector-tools-under-50 ─────────────
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>The tools you can skip</h2>',
        '<p>For a deeper dive on how those tools layer together — sleeve, top loader, one-touch, slab, storage box, and display case — see the <a href="/blog/sports-card-storage-and-display-protection-stack">Sports Card Storage and Display guide</a>.</p>

<h2>The tools you can skip</h2>'
      )
      WHERE slug = 'affordable-collector-tools-under-50'
      AND body NOT LIKE '%sports-card-storage-and-display-protection-stack%'
    `);

  },
};
