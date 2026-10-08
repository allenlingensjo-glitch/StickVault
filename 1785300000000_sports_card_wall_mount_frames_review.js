module.exports = {
  name: 'sports_card_wall_mount_frames_review',
  up: async (client) => {

    // ── New affiliate link slug: magnetic-frames ──────────────────────────────
    // uv-frames and display-cases already exist (registered in
    // 1784400000000_raw_card_vs_graded_slab.js and
    // 1783830000000_card_storage_display_protection_stack.js). The remaining
    // clean slot for the four wall-mount formats is the single-card magnetic
    // wall-mount frame — a distinct product from one-touch (it's the wall
    // version of that holder, frame-integrated with a magnet closure).
    await client.query(`
      INSERT INTO affiliate_links (slug, label, program, target_url, commission_rate, link_type, pillar) VALUES
        ('magnetic-frames', 'Magnetic-Mount Wall Card Display Frames — Amazon', 'Amazon',
         'https://www.amazon.com/s?k=magnetic+sports+card+wall+frame&tag=stickvault0f-20',
         '3-10%', 'affiliate', 'Collecting')
      ON CONFLICT (slug) DO NOTHING;
    `);

    // ── New Post: Sports Card Wall-Mount Display & Frame Review ──────────────
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description, published)
      VALUES (
        'sports-card-wall-mount-display-frame-review',
        'Sports Card Wall-Mount Display & Frame Review: UV Frames vs. Magnetic Frames vs. Acrylic Shadow Boxes vs. Custom Framing',
        'collecting',
        'Wall-mounting a sports card means choosing between four formats — single-card UV-filtering frames, magnetic-mount card frames, deep-set acrylic shadow boxes, and bespoke custom framing — and four material tiers (museum glass, UV-filtering acrylic, plain acrylic, standard glass). Here is the format mechanics, the brand comparison (Frame My TV, Ultrawolves, BCW, Vault X), and the tier list by display-piece value.',
        $body_wall_mount_review$
<p>The <a href="/blog/sports-card-storage-and-display-protection-stack">storage and display protection stack</a> gets to wall-mounting in its <em>Display without damage</em> section and stops at the rule: UV-filtering acrylic, no direct sun, north or east wall, mounting height at eye level. What that article does not do is walk the four wall-mount formats against each other, compare brands within each format, or tier-list the formats by what card is going on the wall. The <a href="/blog/raw-card-vs-graded-slab">raw card vs graded slab decision guide</a> covers when a slabbed graded piece deserves a wall spot and when it should stay in the safe. This piece is the deep dive those two reference only briefly &mdash; the four format mechanics, the brand-by-brand comparison, the wall placement rules, and the tier list by display-piece value.</p>

<p>The wall is the only place in the protection stack where the holder <em>is</em> the display piece. In a top loader, in a one-touch, in a binder page, in a storage box, the holder is doing protection work and the card is the artifact. On the wall, the frame is doing both jobs: protecting the card <em>and</em> showing it at distance, at angle, under room light, for years. That dual role is exactly why the wrong wall-mount format on the wrong card is faster damage than no frame at all: the wrong glass yellows under UV, the wrong backing traps moisture against the card, the wrong gap depth lets the card shift inside the frame, and the wrong mount type fails and sends the card to the floor.</p>

<h2>Why wall-mount is a separate decision from a tabletop display case</h2>

<p>The display-protection layer of the stack ends at the tabletop display case &mdash; the acrylic box that holds a centerpiece card on a shelf or desk, face-up, with a removable top. Wall-mounting is a different problem. A tabletop case sits in controlled indoor light; a wall frame sits under ambient light that varies through the day, in a south-facing room or a north-facing hallway, above a heat vent or near a window. The physics of light exposure, mounting stress, and viewing angle all change &mdash; and so does the format decision.</p>

<p>The four wall-mount formats each solve a different visibility-versus-protection trade-off. UV-filtering single-card frames protect and present one centerpiece slab. Magnetic-mount single-card frames let the card be swapped without opening the frame, which is the right answer for rotating PC display. Acrylic shadow boxes hold a row, a rainbow, or a set page with museum-style mounting. Custom framing is bespoke &mdash; a picture framer cuts a mat and a frame around a specific card or around a composition of cards in their holders. None of these is the same as a tabletop case. Each one has a brand tier, a price tier, and a card-type tier that matches it.</p>

<p>The practical implication: a wall frame is a <em>display</em> tool <em>and</em> a <em>protection</em> tool at the same time. UV-filtering at the glass (or acrylic) layer is mandatory; museum spacers at the card-to-glass interface are mandatory; the frame backing must allow air exchange (sealed backings trap moisture); the wall location determines light exposure. None of these is fiddly. All four are format questions, not preference questions.</p>

<div class="vault-cta">
  <div class="vault-cta-label">From the Vault</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> &mdash; the wall-mount format decision matrix keyed to card type and value tier, the wall placement audit checklist (light direction, mounting height, distance from windows), and the brand-vs-format tier list that prevents the wrong frame on the wrong centerpiece. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit &rarr;</a>
  </div>
</div>

<h2>Format breakdown: UV frame vs. magnetic frame vs. acrylic shadow box vs. custom framing</h2>

<p>Wall-mounting comes in four formats. Each one solves a different visibility-and-protection trade-off.</p>

<p><strong>Single-card UV-filtering frame.</strong> The default for a single centerpiece slab &mdash; a PSA 10 rookie, a low-numbered patch auto, a vintage graded piece. The frame is sized to the slab dimensions (standard PSA slab is 2.5" x 3.25" outer; BGS and SGC slabs are slightly thicker), with UV-filtering glass or UV-filtering acrylic at the front, a foam or acid-free mat behind the card, and a sealed or semi-sealed backing. The card is mounted once and stays mounted. Trade-off: the card cannot be swapped out without removing the frame from the wall and disassembling it. The upside is the cleanest possible presentation: single-card, shadow-boxed, museum-style, UV-protected. Examples: <a href="/r/uv-frames" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>UV-filtering wall-mounted card frames</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> in the BCW and Frame My TV line.</p>

<p><strong>Single-card magnetic-mount frame.</strong> The right answer for rotating PC display. A magnetic-mount frame has a hinged front panel held closed by small magnets at the corners. Open the panel, swap the card, close the panel. The card is not sealed into the frame &mdash; it sits in a recessed pocket inside, held against a backing by the closed magnet panel. Trade-off: the magnetic closure is not airtight, so dust can migrate in over time; the card can shift slightly inside the pocket; and the magnet hardware adds bulk to the frame. The upside: a collector can rotate which card sits on the wall without unmounting the frame itself, which is exactly the use case for a working PC. Examples: <a href="/r/magnetic-frames" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Magnetic-mount wall card frames</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> in the Ultrawolves and Vault X lines.</p>

<p><strong>Acrylic shadow box.</strong> The right answer for a multi-card composition &mdash; a graded rainbow, a set page, a row of PC keepers, a foul-piece jersey card pairing. A shadow box is a deep-set frame (typically 1.5" to 3" deep) with UV-filtering glass or acrylic at the front, a fabric or acid-free paper backing, and enough interior depth that the cards can sit in their holders without being pressed against the glass. The cards are typically mounted with museum putty or pinned through the backing, with spacers between cards to prevent face-to-face abrasion. The cards are visible from outside the frame but recessed enough that they are not touched by the glass. Trade-off: more expensive than a single-card frame, requires assembly (mounting each card in the box), and the format is wrong for a single centerpiece. For multi-card wall display, the shadow box is the right structure. Examples: <a href="/r/display-cases" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>acrylic shadow boxes and display cases</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> across the hobby display shelf and the IKEA-compatible deep-frame lines.</p>

<p><strong>Custom framing.</strong> The bespoke option. A local picture framer cuts a mat, mounts the card (slabbed or in a one-touch) onto acid-free mat board under UV-filtering glass or museum glass, and builds a wood or metal frame around the composition. Custom framing is the right answer for a piece that does not match standard frame sizes, for a composition that combines a card with memorabilia (a slabbed rookie next to a piece of game-used jersey), or for a vault centerpiece commissioned to a specific wall size. Trade-off: 4-8 weeks lead time, $150 to $500+ per piece depending on materials, and no Amazon-friendly single-product link &mdash; the work is done by a framer, not ordered from a catalog. The upside: anything standard frames cannot do, custom can.</p>

<table class="comparison-table">
  <thead>
    <tr>
      <th>Format</th>
      <th>Front Material</th>
      <th>Capacity</th>
      <th>Mount Type</th>
      <th>Best Use</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Single-card UV frame</td>
      <td>UV-filtering glass or acrylic</td>
      <td>1 slabbed or raw card (fixed)</td>
      <td>Wall-mounted; card sealed into frame</td>
      <td>Single centerpiece &mdash; PSA 10 rookie, low-numbered patch auto, vintage graded piece</td>
    </tr>
    <tr>
      <td>Single-card magnetic-mount frame</td>
      <td>UV-filtering acrylic (most common) or glass</td>
      <td>1 slabbed or raw card (swappable)</td>
      <td>Wall-mounted; hinged magnetic panel</td>
      <td>Rotating PC display &mdash; swap centerpiece monthly</td>
    </tr>
    <tr>
      <td>Acrylic shadow box</td>
      <td>UV-filtering glass or acrylic</td>
      <td>3&ndash;12 cards in holders (composition)</td>
      <td>Wall-mounted; cards recessed 1.5&ndash;3" from glass</td>
      <td>Rainbow row, set page, multi-card PC composition, jersey-card pairing</td>
    </tr>
    <tr>
      <td>Custom framing</td>
      <td>UV-filtering glass, museum glass, or UV-filtering acrylic</td>
      <td>Any composition (bespoke)</td>
      <td>Wall-mounted; cut and assembled by a framer</td>
      <td>Bespoke centerpiece &mdash; non-standard size, memorabilia pairing, vault commission</td>
    </tr>
  </tbody>
</table>

<p>The format decision drives almost everything else. Choose single-card UV frame for a fixed centerpiece. Choose magnetic-mount for swappable PC rotation. Choose shadow box for a multi-card composition. Choose custom framing when none of the standard formats fit. The brand decision comes after the format locks.</p>

<h2>Wall placement rules: light direction, mounting height, ambient light at the actual spot</h2>

<p>The format choice is only half the question. The wall location determines what the format is exposed to, and a UV-filtering frame under direct sunlight still ages faster than a plain-glass frame in a north-facing hallway.</p>

<p><strong>Wall direction.</strong> North-facing and east-facing walls get indirect light and are the right choices for any wall-mounted card. South-facing and west-facing walls get direct sun through parts of the day and accelerate UV aging even under UV-filtering glass. The general rule, restated from the protection stack: <strong>no wall-mounted card on a south or west wall unless that wall is shaded the entire day by an overhang, a curtain, or an interior partition.</strong></p>

<p><strong>Mounting height.</strong> Eye level when standing in the room where the wall lives. For a living room or office, that's typically 57" to 62" from the floor to the center of the frame. For a hallway or stairwell, that's 60" to 66". Higher than 66" pushes the card out of casual visual range, which defeats the purpose of wall-mounting; lower than 50" puts the card in reach of children and pets and at risk of being bumped.</p>

<p><strong>Window distance.</strong> A wall-mounted card should sit at least 4 to 6 feet from any window that gets direct sun. Indirect light from a north-facing window is fine at any distance. Direct light from any unfiltered east, south, or west exposure is bad at any distance, but especially bad within 4 feet &mdash; the side-lighting angle bleaches the edges of a slab label faster than full sun on the front face.</p>

<p><strong>Above heat sources.</strong> No wall-mounted card above a heat vent, a radiator, a fireplace mantel with active use, or a TV that runs warm. Heat cycles stress the card's surface (PSA slabs can develop micro-fractures at the holder case corners under repeated heating) and degrade the foam or acid-free mat inside the frame. The rule: same temperature zone as the room, no heat-stack effect from a wall-mounted source.</p>

<p><strong>Ambient light at the actual spot.</strong> This rule is the one that gets missed most often. A UV-filtering frame in a room with no direct sun but with a bright LED ceiling fixture 18 inches from the wall is exposed to more cumulative light than a UV-filtering frame in a north-facing hallway with dim ambient lighting. Check the actual spot at noon, at 3pm, and at dusk before deciding it's a "safe" wall. The protection stack's "no direct sun" rule is a minimum, not a maximum.</p>

<div class="vault-cta">
  <div class="vault-cta-label">System Reference</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> &mdash; the wall placement audit (light direction, mounting height, distance from windows, ambient light at noon/3pm/dusk), the format-by-card-type matrix, and the brand tier list that maps each centerpiece card to the right frame. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit &rarr;</a>
  </div>
</div>

<h2>Brand comparison: Frame My TV vs. Ultrawolves vs. BCW vs. Vault X</h2>

<p>Four brands dominate the sports card wall-mount market. Each one is positioned differently on format coverage, front material, and price.</p>

<p><strong>Frame My TV.</strong> The premium-tier single-card UV frame brand. Frame My TV makes wall-mount frames sized to standard PSA, BGS, SGC, and CGC slabs, with UV-filtering acrylic fronts (museum-grade on the upper tier, standard UV-filtering on the entry tier), acid-free foam matting, and a sealed backing that reduces dust and moisture migration. The frames are deeper than hobby display frames (typically 1" to 1.25" interior) so the slab sits recessed from the acrylic surface. The price is 2-3x the entry hobby brands; the build quality matches. For centerpiece slabs where the wall presentation is the dominant value, Frame My TV is the brand the premium tier resolves to.</p>

<p><strong>Ultrawolves.</strong> The magnetic-mount specialist. Ultrawolves makes hinged magnetic-mount single-card frames in the mid-to-premium tier. The closure is a four-corner magnet system that holds the front panel flush to the frame body without visible hardware. UV-filtering acrylic is standard on the production line. Capacity is one slab or one card-in-one-touch. The format is wrong for a fixed centerpiece (the magnetic closure adds bulk and the format is designed for swap-ability, not permanence) and is the right answer for rotating PC display where the centerpiece changes monthly. Mid price point, well-positioned between the budget tier and the bespoke tier.</p>

<p><strong>BCW.</strong> The hobby default across single-card frames and acrylic shadow boxes. BCW makes a wide range of wall-mount frames at the entry-to-mid price tier, including single-card UV-filtering frames sized to the common slab dimensions and acrylic shadow boxes in standard hobby sizes. The build quality is acceptable; the UV-filtering is on the front acrylic, not on a museum-glass upgrade; the backs are sealed but not air-tight. The right answer for working collections with multiple wall pieces, hobby default for collectors who want a consistent frame across the wall, and the right price tier for cards the collector would not describe as a "vault centerpiece."</p>

<p><strong>Vault X.</strong> The premium magnetic-mount alternative to Ultrawolves. Vault X frames are positioned at the premium tier (similar to Frame My TV for UV frames, similar pricing across formats) with a focus on materials: bonded exteriors where applicable, UV-filtering acrylic as standard, sealed backings. Vault X lines extend beyond magnetic-mount into single-card UV frames and small shadow boxes. The premium tier across formats means the brand is consistent across a wall of frames &mdash; a Vault X single-card UV frame and a Vault X magnetic-mount frame on the same wall will match in exterior material and depth. The right answer for collectors building a multi-piece wall who want a consistent brand aesthetic.</p>

<p>The brand decision matrix, in one paragraph: Frame My TV for a single premium UV centerpiece; Ultrawolves for a magnetic-mount rotating display; BCW for hobby default across multiple frames and shadow boxes; Vault X for a consistent premium brand across a multi-piece wall. Pick format first (single UV, magnetic-mount, shadow box, or custom) and brand second.</p>

<h2>Tier list by display-piece value</h2>

<p>Three tiers, keyed to the value and rarity of the card being wall-mounted. The bracket maps to the wall display piece, not to the total collection value &mdash; a $5,000 centerpiece slab on the wall lives next to a $100 working binder on the shelf and the wall piece sets the tier.</p>

<table class="comparison-table">
  <thead>
    <tr>
      <th>Display-Piece Value</th>
      <th>Format</th>
      <th>Front Material</th>
      <th>Brand Tier</th>
      <th>Wall Cost (per piece)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Under $100 (low-value PC keeper, low-numbered parallel)</td>
      <td>Single-card UV frame or magnetic-mount</td>
      <td>UV-filtering acrylic</td>
      <td>BCW (entry hobby)</td>
      <td>$15&ndash;$30</td>
    </tr>
    <tr>
      <td>$100&ndash;$1,000 (mid-value PC keeper, modern rookie auto, low-numbered patch)</td>
      <td>Single-card UV frame or shadow box (2&ndash;6 cards)</td>
      <td>UV-filtering acrylic (standard) or UV-filtering glass (premium)</td>
      <td>BCW or Ultrawolves (mid hobby) / Vault X (premium)</td>
      <td>$30&ndash;$80 acrylic / $100&ndash;$200 glass</td>
    </tr>
    <tr>
      <td>$1,000+ (vault centerpiece &mdash; PSA 10 rookie, vintage graded, ultra-low-numbered patch auto)</td>
      <td>Single-card UV frame (Frame My TV) or custom framing</td>
      <td>Museum glass or UV-filtering acrylic (premium tier)</td>
      <td>Frame My TV (premium UV) / Vault X (premium magnetic) / bespoke framer (custom)</td>
      <td>$150&ndash;$400 frame / $200&ndash;$500+ custom</td>
    </tr>
  </tbody>
</table>

<p>The wall cost is the framing only &mdash; not the card. The tier logic: under-$100 wall pieces should not exceed 30% of the card's value in frame cost; $100-$1,000 wall pieces can justify a frame up to 20% of card value; $1,000+ wall pieces justify the premium tier (museum glass, UV-filtering glass, vault-brand frame) at 5-15% of card value. A $5,000 centerpiece in a $25 BCW frame under-sells the card; a $200 card in a $400 Frame My TV frame over-protects it.</p>

<h2>What to skip</h2>

<p>Three traps that come up repeatedly in wall-mount collecting, none of which are obvious until you have already paid for the wrong frame or already damaged the wrong card.</p>

<p><strong>The cheapest magnetic-mount frames warp cards.</strong> Magnetic-mount frames in the under-$15 range typically use thin non-archival foam at the card backing and a front panel that does not apply uniform pressure across the card surface. Over months, the card develops a slight bow along its long axis from the uneven pressure, and the bow compromises the holder fit (cards that bow do not slide cleanly back into a one-touch or top loader). The visible failure mode takes 6-12 months to show up; the rule is mid-tier magnetic frames (Ultrawolves or Vault X) or nothing.</p>

<p><strong>Glass-on-glass at quarter-inch spacing instead of museum spacers.</strong> The trap here is a shadow box with the card surface less than 1/4" from the inside face of the glass. Even with UV-filtering glass, surface condensation cycles and slight thermal expansion will press the card surface against the glass over time, and the result is a faint imprint on the card's chrome surface (especially on holofoil and refractor parallels). Museum spacers &mdash; thin foam or acid-free card strips around the perimeter of the mounted card &mdash; keep a minimum 1/8" gap and prevent the contact. A shadow box without spacers is a shadow box that will, within a year, leave a glass-shaped mark on the card.</p>

<p><strong>Drilling through a graded slab to wall-mount without the frame.</strong> Some collectors try to skip the frame and drill through the PSA/BGS slab case to mount the slab directly to the wall, with a screw through the top of the holder and a screw through the bottom. The slab case is held together by ultrasonic welds at the corners and along the edges; a screw hole through the case compromises the case seal, allows moisture and dust to migrate onto the card surface, and breaks the holder's structural integrity. The slab will eventually crack at the screw point as the case flexes under thermal cycling. If the card is important enough to wall-mount, it is important enough to wall-mount in a frame. Drilling the slab is not an option.</p>

<div class="vault-next-read">
  <div class="vault-next-read-label">Recommended Next Read</div>
  <div class="vault-next-read-grid">
    <a href="/blog/sports-card-storage-and-display-protection-stack" class="vault-next-card">
      <div class="vault-next-card-title">Storage &amp; Display Protection Stack</div>
      <div class="vault-next-card-desc">The five layers from penny sleeve to storage box, the wall placement rules that the frame decision above assumes, and the UV-filtering acrylic baseline every wall frame has to meet.</div>
    </a>
    <a href="/blog/sports-card-binder-portfolio-review" class="vault-next-card">
      <div class="vault-next-card-title">Binder &amp; Portfolio Review</div>
      <div class="vault-next-card-desc">The binder format and brand comparison for cards that are not on the wall &mdash; the rest-of-collection context for a centerpiece-wall strategy.</div>
    </a>
    <a href="/blog/raw-card-vs-graded-slab" class="vault-next-card">
      <div class="vault-next-card-title">Raw Card vs Graded Slab</div>
      <div class="vault-next-card-desc">When a card deserves slab-and-frame wall treatment and when it should stay in a one-touch inside a storage box &mdash; the upstream decision that determines whether the frame decision applies at all.</div>
    </a>
  </div>
</div>
        $body_wall_mount_review$,
        8,
        'Sports card wall-mount display and frame review: UV-filtering single-card frames vs magnetic-mount frames vs acrylic shadow boxes vs custom framing, plus brand comparison (Frame My TV, Ultrawolves, BCW, Vault X) and a tier list by display-piece value.',
        true
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    // ── UPDATE: Back-link splice in storage hub before "Display without damage" H2 ─
    // The "Framed displays" paragraph at 1783830000000_card_storage_display_protection_stack.js:150
    // already carries the uv-frames affiliate link from the 1785000000000 splice; this paragraph
    // introduces the wall-mount format deep-dive before the "Display without damage" section,
    // keeping the one-way link graph into the new review post. Idempotency guard mirrors
    // 1785200000000_sports_card_binder_portfolio_review.js:247 and 1785100000000_sports_card_shipping_packaging_guide.js.
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>Display without damage</h2>',
        '<p>Wall-mounting a card &mdash; UV frame, magnetic-mount frame, deep-set acrylic shadow box, or bespoke custom framing &mdash; is its own format and brand layer beyond what the protection stack discusses. The <a href="/blog/sports-card-wall-mount-display-frame-review">sports card wall-mount display and frame review</a> walks through the four formats, the brand comparison, and the tier list by display-piece value.</p>

<h2>Display without damage</h2>'
      )
      WHERE slug = 'sports-card-storage-and-display-protection-stack'
      AND body NOT LIKE '%sports-card-wall-mount-display-frame-review%'
    `);

  },
};
