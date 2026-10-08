module.exports = {
  name: 'sports_card_binder_portfolio_review',
  up: async (client) => {

    // ── New affiliate link slugs: card-binders and binder-9-pocket-pages ──────
    // card-binders covers the outer product reviewed in this article (Vault X,
    // BCW, Ultra Pro, Monster binders/portfolios); binder-9-pocket-pages covers
    // the inner-page refills collectors buy to fill an existing binder.
    await client.query(`
      INSERT INTO affiliate_links (slug, label, program, target_url, commission_rate, link_type, pillar) VALUES
        ('card-binders',          'Vault X / BCW / Ultra Pro Sports Card Binders & Portfolios — Amazon', 'Amazon',
         'https://www.amazon.com/s?k=sports+card+binder+portfolio&tag=stickvault0f-20',
         '3-10%', 'affiliate', 'Collecting'),
        ('binder-9-pocket-pages', 'Ultra Pro / BCW 9-Pocket Binder Pages — Amazon', 'Amazon',
         'https://www.amazon.com/s?k=9+pocket+binder+pages+trading+cards&tag=stickvault0f-20',
         '3-10%', 'affiliate', 'Collecting')
      ON CONFLICT (slug) DO NOTHING;
    `);

    // ── New Post: Sports Card Binder & Portfolio Review ──────────────────────
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description, published)
      VALUES (
        'sports-card-binder-portfolio-review',
        'Sports Card Binder & Portfolio Review: Vault X vs. Ultra Pro vs. BCW vs. Monster — Ring-Bound vs. Zippered vs. Snap-Close',
        'collecting',
        'Card binders and portfolios come in four formats (ring-bound, zippered, snap-close, top-loading) and four material tiers (PVC, polypropylene, archival polyester, premium Vault X composite) — and the wrong binder on the wrong card is faster damage than no binder at all. Here is the format and brand comparison, plus the tier list by collection size and value.',
        $body_binder_review$
<p>The <a href="/blog/sports-card-storage-and-display-protection-stack">storage and display protection stack</a> covers every holder but one: the binder. Top loaders, one-touches, slabs, and storage boxes all get a layer in the stack; binders get a single row in the comparison table and a one-line thesis &mdash; display tools, not protection tools. The <a href="/blog/raw-card-vs-graded-slab">raw card vs graded slab decision guide</a> covers when binder-stored raw cards make sense as a browsing format. This piece is the deep dive those two reference only briefly &mdash; the four formats, the four material tiers, the brand-by-brand comparison, and the tier list by collection size and value.</p>

<p>The binder is the only holder in the protection stack that is also an accessibility tool. Every other holder hides the card. The binder shows it. That dual role is exactly why the wrong binder on the wrong card is faster damage than no binder at all: the cards are visible, the pages scratch on insert, the spine bends over time, and the format choice (ring-bound vs. zippered vs. snap-close vs. top-loading portfolio) changes which cards stay mint and which downgrade within a year.</p>

<h2>Why binders are a separate decision from top loaders</h2>

<p>The five-layer protection stack in the storage guide ends at the storage box. Binders are not on that stack &mdash; not because the storage guide forgot them, but because binders solve a different problem. Top loaders and one-touches protect a card from being touched. Binders let you browse a card without taking it out of the holder. Different problem, different holder, different cost trade-off.</p>

<p>The practical implication: a binder is a <em>display</em> tool, not a <em>protection</em> tool. Insertion friction minutely scratches chrome surfaces. Page warping from humidity puts lateral pressure on the card edges over months. The three-ring spine bends and the cards in the page closest to the punch holes take the most wear. None of this is news to anyone who has pulled a card out of a binder page after a year and seen a faint abrasion line down the chrome surface. The card in a binder is a card that is slowly downgrading toward raw shipping condition, even while it sits in a "protective" page.</p>

<p>That is not an argument against binders. It is an argument against using binders for the wrong cards. Binders are perfect for: bulk base cards you want to flip through, low-value parallels, set-building pages where the whole page is the unit, and raw cards visible enough that the binder format itself adds value (PC display, trade show browsing, kids learning the hobby). Binders are wrong for: cards being prepped for grading, low-numbered parallels resting on value, vintage cards whose condition drives the price, chrome cards where surface scratches are the dominant grade-downgrade driver. The format choice is downstream of which cards go in it.</p>

<div class="vault-cta">
  <div class="vault-cta-label">From the Vault</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> &mdash; the binder format decision matrix keyed to card type and value tier, the per-page label system that lets you find any page in seconds, and the binder-vs-box inventory log that prevents cards from being stored in the wrong format by accident. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit &rarr;</a>
  </div>
</div>

<h2>Format breakdown: ring-bound vs. zippered vs. snap-close vs. top-loading portfolio</h2>

<p>Binders come in four formats. Each one solves a different accessibility-and-protection trade-off.</p>

<p><strong>Ring-bound (three-ring binder).</strong> The classic three-ring binder with a soft zippered or velcro closure and 9-pocket pages inside. Pages are punched and held by the rings; pages can be flipped, reordered, added, and removed. The trade-off: the pages closest to the rings sit at a slight angle and receive more lateral wear over time. Pages can also bend or tear under heavy use, and the rings themselves bend the page's punch-hole edge. Capacity scales linearly with binder thickness (typically 50 to 200 pages per binder). The most popular hobby format because of the modularity. Examples: Vault X 9-Pocket Binder, BCW 3-Ring Binder, Ultra Pro 3-Ring Binder.</p>

<p><strong>Zippered binder.</strong> A ring-bound binder with a heavy zip closure around three edges. The zip seals the binder shut, which addresses the number-one complaint about open ring binders (pages falling out if the binder is dropped). Trade-off: the zipper bulk adds thickness the binder does not use for cards; the zip itself can fail at the corners over years. Capacity and modularity are otherwise the same as ring-bound. Best for: binders that move (trade shows, conventions, mobile browsing).</p>

<p><strong>Snap-close binder.</strong> A ring-bound binder with snap-button closures instead of a zip. Lighter than a zippered binder, faster to open, but the snaps do not seal as tight. Used more in non-trading-card contexts (photo albums, document binders) but some hobby binders use this format. Less common in sports card collecting than in other collecting hobbies.</p>

<p><strong>Top-loading portfolio.</strong> A non-ring-bound format: pages with top-loading pockets sewn or welded into a soft or rigid cover, no rings, no punch holes. Cards slide in from the top of each pocket and sit there until pulled. The portfolio opens like a book, with pages either side-bound (book-style) or welded (one-piece fold-out). Trade-off: pages cannot be reordered; adding cards means committing to that page's order. But there is no ring-spine compression and no punch-hole wear. Best for: fixed-order PC displays, graded card photo books, set pages that will not be edited.</p>

<table class="comparison-table">
  <thead>
    <tr>
      <th>Format</th>
      <th>Page Modularity</th>
      <th>Spine Wear</th>
      <th>Closure</th>
      <th>Mobility</th>
      <th>Best Use</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Ring-bound (3-ring)</td>
      <td>Full &mdash; add, remove, reorder</td>
      <td>Yes &mdash; ring-spine compression bends page edges</td>
      <td>None (open) or zippered variant</td>
      <td>Acceptable</td>
      <td>General hobby collecting &mdash; bulk base, low-value parallels, set pages</td>
    </tr>
    <tr>
      <td>Zippered binder</td>
      <td>Full &mdash; same as ring-bound</td>
      <td>Yes &mdash; same as ring-bound; zip adds bulk</td>
      <td>Heavy zipper around 3 edges</td>
      <td>Best for moving (drop-resistant)</td>
      <td>Trade shows, conventions, mobile browsing, kids</td>
    </tr>
    <tr>
      <td>Snap-close binder</td>
      <td>Full &mdash; same as ring-bound</td>
      <td>Yes &mdash; same as ring-bound</td>
      <td>Snap buttons (less airtight than zip)</td>
      <td>Acceptable</td>
      <td>Lightweight display, casual flipping</td>
    </tr>
    <tr>
      <td>Top-loading portfolio</td>
      <td>None &mdash; page order is fixed</td>
      <td>No ring compression</td>
      <td>None or book-style binding</td>
      <td>Best &mdash; no rings means no spine punch wear</td>
      <td>Fixed PC display, set pages, graded card portfolios</td>
    </tr>
  </tbody>
</table>

<p>The format decision drives almost everything else. Choose ring-bound if you want modularity. Choose zippered if you want drop safety. Choose top-loading if you want the lowest possible wear rate on a fixed collection. For most working collections &mdash; cards being added and re-sorted monthly &mdash; ring-bound with optional zip closure is the default.</p>

<h2>Sleeve / page types: 9-pocket vs. 12-pocket vs. 18-pocket vs. toploader-sheet</h2>

<p>The pages inside the binder matter more than the binder itself. A premium binder with cheap pages is worse than a budget binder with premium pages, because the pages are what touches the cards.</p>

<p><strong>9-pocket pages (3x3 grid).</strong> The default. Nine standard-size card pockets per page, arranged in a 3-across / 3-down grid. Each pocket fits a single standard 35-point card. The most popular page count because it matches the standard card aspect ratio exactly. Brands: <a href="/r/binder-9-pocket-pages" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Ultra Pro 9-pocket pages</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> as the hobby default, BCW 9-pocket as the budget tier. Per-card cost is the highest in this list (~$0.05 to $0.10 per card slot including amortization), but the pages are the most widely compatible and the easiest to source.</p>

<p><strong>12-pocket pages (3x4 grid).</strong> Same width as 9-pocket but a tighter vertical spacing; designed for cards slightly shorter than standard or for collectors willing to accept reduced vertical slack on standard cards. Common in Japanese card collecting, less common in US sports cards. Per-card cost is slightly lower than 9-pocket; trade-off is reduced vertical fit on standard 35-point cards, which means the card can shift inside the pocket over time.</p>

<p><strong>18-pocket pages (3x6 grid).</strong> Same width as 9-pocket but the pockets are sized for thinner cards (topps baseball mini-cards, gaming cards, sticker pages). Sports cards at 35-point thickness do not fit. Sometimes used by collectors who mix sports cards with gaming cards, but for a pure sports card binder the 18-pocket page is the wrong format.</p>

<p><strong>Top-loader sheet pages.</strong> Pages with pockets wide enough to hold a top loader (full rigid plastic card holder, not just a card). The card stays in the top loader and the loaded holder slides into the page. This is the upgrade path for collectors who want binder accessibility with top-loader protection. Trade-off: top-loader sheets hold roughly 4 to 6 cards per page (instead of 9), so a binder holds a quarter to a third as many cards. Worth it for higher-value binder-stored cards (PC keepers stored in top loaders but browsed in a binder).</p>

<p>The per-card friction question: every page insertion drags the card across the page's pocket opening. Soft polypropylene pocket edges are forgiving; stiff PVC pocket edges scratch. The page material is doing more work than the page count. Which brings us to the next section.</p>

<h2>Archival material: PVC vs. polypropylene vs. archival polyester</h2>

<p>Page material is the single most consequential choice in binder collecting. PVC off-gasses hydrochloric acid over years, which yellows cards, softens ink, and de-laminates chrome surfaces. Polypropylene is chemically inert and is the hobby default. Archival polyester (Mylar, Melinex) is museum-grade and is what archival document storage uses.</p>

<p><strong>PVC (polyvinyl chloride).</strong> The cheap option. PVC pages are clear, stiff, and the lowest per-page cost. They are also the worst for long-term card storage: PVC off-gasses HCl over years, and the off-gassing is faster in binders because enclosed environments concentrate the gas. Visible damage timeline: yellowing of card edges within 1-3 years, ink softening within 3-5 years, surface de-lamination on chrome within 5-10 years. PVC pages are acceptable for bulk base cards you will flip or trade within a season, and nothing else. Most unlabeled "clear trading card pages" sold as bulk packs are PVC.</p>

<p><strong>Polypropylene (PP).</strong> The hobby default for serious collectors. Chemically inert, no off-gassing, slightly softer than PVC so the pocket opening is less abrasive on insertion. Clear pages are slightly less optically clear than PVC (a faint haze) but the long-term safety profile is dramatically better. <a href="/r/binder-9-pocket-pages" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Ultra Pro and BCW premium 9-pocket pages</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> are polypropylene as standard. For any binder-stored card you intend to keep more than a year, polypropylene is the floor.</p>

<p><strong>Archival polyester (Mylar / Melinex).</strong> Museum-grade. Used by libraries and archives for document preservation. Chemically inert for decades, optically clear, scratch-resistant to a high degree. The per-page cost is 3-5x polypropylene and the pages are noticeably stiffer (which can paradoxically cause more insertion friction if the pockets are tight). Reserved for: vintage cards, low-numbered parallels stored raw for PC, anything where the off-gassing risk over a 10-20 year horizon matters. Overkill for base and common parallels.</p>

<p>The rule: <strong>PVC-free is a hard requirement</strong> for any binder-stored card whose condition you care about in three years. Polypropylene is the default. Archival polyester is the upgrade for vintage or PC keepers. Page material will outlast the card if you pick wrong, and the card will not outlast a PVC page.</p>

<h2>Brand comparison: Vault X vs. Ultra Pro vs. BCW vs. Monster</h2>

<p>Four brands dominate hobby binder sales. Each one is positioned differently on price, build quality, and material.</p>

<p><strong>Vault X.</strong> The premium tier. Vault X 9-pocket binders are widely considered the best-built ring binders in the hobby: reinforced spine, hardcover exterior, side-loading welded pages (which hold cards more securely than top-loading pockets), polypropylene default material, and a bonded leather or vegan leather cover that takes handling wear better than cardboard. The price is 2-3x the budget brands, but the binder is also a 5-10 year product, not a 2-year product. The welded-page format means cards cannot fall out of the page sideways; only top-loading is possible, which adds 5-10 seconds per card during page fill but eliminates the "cards sliding out when the binder is tipped" failure mode. For PC keepers and binder-stored cards held long-term, the <a href="/r/card-binders" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>Vault X binder</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> is the brand the premium tier resolves to.</p>

<p><strong>Ultra Pro.</strong> The hobby default. Ultra Pro makes the most widely-sold ring binders and 9-pocket pages at the mid-tier. The build quality is good; the materials are polypropylene as standard; the price is 1.5-2x the budget brands and noticeably below Vault X. The trade-off is in fit and finish: Ultra Pro binders have a softer cover (more prone to denting if dropped), and the side-loading pages use a top-loading slot which can let cards shift on a tipped binder. For most working collections, Ultra Pro is the right balance of price and quality.</p>

<p><strong>BCW.</strong> The budget brand. BCW makes the cheapest ring binders and the cheapest 9-pocket pages in the hobby. Build quality is acceptable for a 1-3 year binder; the materials are polypropylene default but the cover and spine are thinner cardboard that does not handle heavy use as well. Best for: bulk storage of base cards, working collections being added and re-sorted frequently, kids learning the hobby. Not for: long-term PC storage, premium display, anything where the binder itself is the display piece.</p>

<p><strong>Monster.</strong> The niche premium. Monster binders are positioned as a boutique alternative to Vault X, with leather covers and welded pages at a similar price point. Smaller distribution, more limited page selection, but the build quality is on par with Vault X. The choice between Vault X and Monster comes down to cover aesthetic and page format preference; both are premium-tier products.</p>

<p>The brand decision matrix, in one paragraph: Vault X for premium PC and long-term display; Ultra Pro for the working default; BCW for the working budget; Monster for the boutique alternative. The brand matters less than the material &mdash; a polypropylene Vault X page inside a BCW budget binder outperforms a PVC Ultra Pro page inside a Vault X premium binder, every time.</p>

<div class="vault-cta">
  <div class="vault-cta-label">System Reference</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> &mdash; the brand-vs-format decision matrix keyed to collection size and value tier, the per-binder page inventory that lets you refill without losing organization, and the binder rotation log that spreads page-wear evenly across your collection. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit &rarr;</a>
  </div>
</div>

<h2>Tier list by collection size and value</h2>

<p>Three tiers, keyed to collection size and the value of the cards you intend to binder-store. The bracket does not have to match your total collection size &mdash; only the cards destined for binder storage.</p>

<table class="comparison-table">
  <thead>
    <tr>
      <th>Collection Size (binder-stored)</th>
      <th>Format</th>
      <th>Page Material</th>
      <th>Brand</th>
      <th>Per-Card Budget</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Under 500 cards</td>
      <td>Ring-bound (3-ring) with zip closure</td>
      <td>Polypropylene, 9-pocket</td>
      <td>BCW or Ultra Pro</td>
      <td>$0.30&ndash;$0.50</td>
    </tr>
    <tr>
      <td>500&ndash;3,000 cards</td>
      <td>Ring-bound with zip closure; multiple binders by category</td>
      <td>Polypropylene, 9-pocket; archival polyester for PC pages</td>
      <td>Ultra Pro (working binders) + Vault X (PC binder)</td>
      <td>$0.50&ndash;$1.00 working / $1.50&ndash;$3.00 PC</td>
    </tr>
    <tr>
      <td>3,000+ cards</td>
      <td>Mixed: ring-bound for working binders, top-loading portfolio for PC display</td>
      <td>Polypropylene default, archival polyester for vintage/PC, never PVC</td>
      <td>Vault X (PC), Ultra Pro (working), BCW (bulk-budget)</td>
      <td>$0.50&ndash;$2.00 working / $2.00&ndash;$5.00 PC</td>
    </tr>
  </tbody>
</table>

<p>The PVC-free rule applies to all three tiers. Bracket-skipping only happens if the value of the cards in the binder exceeds $2 per card &mdash; then jump to archival polyester pages inside a Vault X binder, regardless of collection size. The format decision locks from there.</p>

<h2>What to skip</h2>

<p>Three traps that come up repeatedly in binder collecting, none of which are obvious until you have already paid for the wrong supply.</p>

<p><strong>PVC pages sold as "premium clear trading card pages."</strong> If the packaging does not say "polypropylene" or "PVC-free" or "archival," assume PVC. The visible failure mode (yellow edges, ink softening) takes 18-36 months to show up, which is past the return window and past the moment you would have noticed. Default rule: polypropylene or nothing.</p>

<p><strong>Grading-prep cards in binders.</strong> A card you intend to submit to PSA, BGS, SGC, or CGC stays in a penny sleeve inside a top loader inside a storage box, never in a binder page. Every binder insertion is a small surface event; a small surface event on a card being pre-screened for gem grade is a coin flip you do not need to take. The raw-vs-slab decision in the <a href="/blog/raw-card-vs-graded-slab">raw card vs graded slab comparison</a> assumes the card is held in a top loader, not a binder, until the grading submission ships.</p>

<p><strong>Vintage cards in standard 9-pocket pages.</strong> Vintage cardstock (pre-1980 generally) is more brittle and more chemically reactive than modern stock. Default 9-pocket polypropylene pages work for modern cards; for vintage, use oversized 9-pocket pages sized for the card's actual dimensions, or move vintage cards into a top-loading portfolio with side-pocket pages, or skip the binder entirely and store vintage cards in penny sleeves inside card savers inside storage boxes. The protection stack in the <a href="/blog/sports-card-storage-and-display-protection-stack">storage and display guide</a> covers the alternative path.</p>

<p>The thesis, restated: binders are display tools, not protection tools. Pick format by card type and value, pick page material at polypropylene minimum, pick brand at the price tier your binder-stored cards justify. The wrong binder on the wrong card is faster damage than no binder at all.</p>

<div class="vault-next-read">
  <div class="vault-next-read-label">Recommended Next Read</div>
  <div class="vault-next-read-grid">
    <a href="/blog/sports-card-storage-and-display-protection-stack" class="vault-next-card">
      <div class="vault-next-card-title">Storage &amp; Display Protection Stack</div>
      <div class="vault-next-card-desc">The penny sleeve, top loader, one-touch, slab, and storage box layers that keep cards mint &mdash; the holder-side foundation of the binder decision above.</div>
    </a>
    <a href="/blog/raw-card-vs-graded-slab" class="vault-next-card">
      <div class="vault-next-card-title">Raw Card vs Graded Slab</div>
      <div class="vault-next-card-desc">When binder-stored raw cards make sense and when they should move into a one-touch or a submission &mdash; the raw-side context for the format choice.</div>
    </a>
    <a href="/blog/sports-card-shipping-packaging-guide" class="vault-next-card">
      <div class="vault-next-card-title">Shipping &amp; Packaging Guide</div>
      <div class="vault-next-card-desc">The supply stack and USPS service tier for getting binder-stored cards safely to a buyer, trade partner, or grading service &mdash; the carrier-side context.</div>
    </a>
  </div>
</div>
        $body_binder_review$,
        8,
        'Sports card binder and portfolio review: Vault X vs. Ultra Pro 9-pocket vs. BCW vs. Monster across ring-bound, zippered, and snap-close formats; PVC-free vs polypropylene sleeve types; sheet capacity; and a tier list by collection size and value.',
        true
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    // ── UPDATE: Back-link splice in storage hub before "Environment" H2 ───────
    // The "honest read on binders" paragraph at line 128 already endorses the
    // binder-as-display-tool thesis; this paragraph defers the format and brand
    // deep dive to the new article.
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>Environment: humidity, light, and temperature</h2>',
        '<p>The binder-vs-top-loader decision at the format-and-brand layer is its own deep dive &mdash; ring-bound vs zippered vs snap-close vs top-loading portfolio, polypropylene vs PVC pages, Vault X vs Ultra Pro vs BCW vs Monster. The <a href="/blog/sports-card-binder-portfolio-review">sports card binder and portfolio review</a> walks through the format choice, the page material chemistry, the brand comparison, and the tier list by collection size and value.</p>

<h2>Environment: humidity, light, and temperature</h2>'
      )
      WHERE slug = 'sports-card-storage-and-display-protection-stack'
      AND body NOT LIKE '%sports-card-binder-portfolio-review%'
    `);

    // ── UPDATE: Back-link splice in raw-vs-graded before "Raw card pros and cons" H2 ──
    // Defers the accessibility / browsing-format piece to the new binder review.
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<h2>Raw card pros and cons</h2>',
        '<p>For raw cards kept accessible rather than graded &mdash; bulk base, common parallels, set-building pages &mdash; the binder is the trade-off between visibility and long-term condition. The <a href="/blog/sports-card-binder-portfolio-review">sports card binder and portfolio review</a> covers the format choice (ring-bound vs zippered vs snap-close vs top-loading portfolio), the page material chemistry (polypropylene vs PVC vs archival polyester), and the brand tier list by collection value.</p>

<h2>Raw card pros and cons</h2>'
      )
      WHERE slug = 'raw-card-vs-graded-slab'
      AND body NOT LIKE '%sports-card-binder-portfolio-review%'
    `);

  },
};
