module.exports = {
  name: 'how_to_sell_sports_cards_guide',
  up: async (client) => {

    // ── 1.1 ── Insert (or no-op) the new guide post row. ───────────────────────
    // Category = collecting (fits existing VALID_CATEGORIES at routes/blog.js:11).
    // Body covers the four head-term intent pillars: who buys, where to sell,
    // raw vs graded pricing, and market timing. Closes with a forward-link
    // into the freshly shipped profit-calculator pillar.
    // In-body anchors back into the storage hub and the profit-calculator pillar
    // sit inside the BODY content itself (sub-block 1.3 notes why no inbound
    // splice is needed).
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description, pin_image, published)
      VALUES (
        'how-to-sell-sports-cards',
        'How to Sell Sports Cards: Who Buys, Where to Sell, Raw vs Graded Pricing, and How to Time the Market',
        'collecting',
        'Selling sports cards means matching the card to the buyer pool that already pays for that exact grade and set — dealers absorb bulk, the goldin/heritage/PWCC trio clears high-value vintage, COMC handles bulk modern at scale, eBay sold listings set the price floor, facebook groups and cardmarket fill the niche and international lanes. Raw-to-graded pricing is fee plus probability-weighted grade premium; timing is rookie-season peak for football and basketball, a 6–12 month post-peak window for those who do not break out, and a structurally soft mid-Q1 trough for vintage.',
        $body_how_to_sell$
<p>Selling sports cards is not one market — it is a stack of overlapping markets, each with a different buyer, different fees, and different timing. The wrong pool for the right card is the most expensive mistake a seller makes. A raw modern Prizm Silver rookie does not want a Goldin auction; a 1952 Topps Mickey Mantle does not want a COMC intake. The job is to match the card to the buyer pool that already pays the premium you are after, and to do that work before the listing goes live.</p>

<p>This guide walks through who actually buys sports cards, where each buyer pool is most efficient, how raw and graded pricing diverge once fees and grade probability are factored in, and how to read the calendar so a card does not sit unsold through a soft window. It closes with a forward link into the <a href="/blog/sports-card-grading-side-hustle-profit-calculator">sports card grading side hustle profit calculator</a> for the cards where grading is the right answer — because selling and grading are two halves of the same math.</p>

<h2>Who actually buys sports cards</h2>

<p>The collector pool is not a single demographic. Every sports card has a buyer on a spectrum, and the spread between the lowest-paying buyer and the highest-paying buyer for the same card is usually 3–10x. Identifying the highest-paying buyer who will actually pay promptly is the entire job.</p>

<ul>
<li><strong>End-user collectors.</strong> The PC (personal collection) buyer who wants the card for a set they are chasing, a player they follow, or a binder page they have been waiting on. PC buyers pay retail-comp prices, are not negotiable, and buy from a channel they trust — usually eBay, a card shop, or a forum. Volume is low; spreads are wide. The most reliable channel for one-off vintage and modern short prints.</li>
<li><strong>Dealers and breakers.</strong> Professional buyers who absorb volume. A breaker buys a sealed case for a livestream; a dealer buys to fill shelf inventory at a card shop or show. Pricing is driven by the wholesale floor — what they can pay and still resell at retail. Dealers are the buyer for raw base cards, high-print-run rookies, and bulk lots. They will not pay PSA 10 premiums on Prizm Silver because they cannot resell at that premium under their margin model.</li>
<li><strong>PSA 10 buyer pools.</strong> A sub-pool of investors and end-users who buy only the top grade. PSA 10 buyers pay multiples of raw and exist in numbers for high-population modern cards they consider liquid (Prizm Silver, Topps Chrome UFC, select Bowman Chrome rookies). They buy on eBay, through PWCC, and increasingly through Heritage and Goldin auctions for the higher end. PSA 10 buyers are the universe the <a href="/blog/sports-card-grading-side-hustle-profit-calculator">sports card grading side hustle profit calculator</a> assumes when it talks about grade premiums.</li>
<li><strong>Long-term investors.</strong> Buyers who treat cards like a position. They absorb autographs and low-numbered parallels of stars and likely Hall of Famers, hold for years, and care less about comps on a day-to-day basis. Goldin, Heritage, and PWCC are their home channels because the consignment infrastructure exists; the lot description sells for them. They pay auction premiums but expect auction-grade authentication.</li>
<li><strong>Flippers and the second-hand market.</strong> Other sellers, basically. Buy one channel, resell another. They will pay 70–80% of the realized sale comp on a fast-turn card because their business model cannot absorb holding time. These buyers live on eBay, in facebook group deals (the "ISO" threads), and on platforms like Cardmarket for the European Pokémon and MTG crossover. They are reliable for high-volume modern at sub-premium prices.</li>
<li><strong>COMC and StockX liquidity.</strong> Platforms that aggregate buyers across the long tail. COMC is a holding-and-listing service: cards go in, get photographed, get listed, sit until they sell at a fixed take-it-or-leave-it price. StockX treats cards like sneakers — bid/ask on a fixed grade. Both are channels for the buyer who wants convenience and standardized grading but will not pay the auction premium.</li>
</ul>

<p>Matching is a tax. Sell a $300 raw modern Prizm Silver on eBay auction to a PC collector who paid $325 last week and the result is $260 after fees. Sell the same card on COMC and it sits for 90 days. Sell as a buy-it-now on eBay at $280 and it goes overnight. Every channel has a price-and-time profile; the work is reading the card and picking the channel whose profile matches.</p>

<h2>Where to sell — the channel stack</h2>

<p>The channel stack works like a funnel. The simplest, lowest-fee channels sell the most reliable pools of cards. The higher-touch channels clear higher-value cards at higher take rates but lower volume. Most sellers use three or four channels simultaneously — one for fast-turn modern, one for vintage, one for the niche international lane, and a price-discovery channel to read comps before listing anywhere.</p>

<table class="comparison-table">
  <thead>
    <tr>
      <th>Channel</th>
      <th>Sweet Spot</th>
      <th>Fees</th>
      <th>Best For</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>eBay (sold listings)</td>
      <td>Price discovery</td>
      <td>~13% final value fee + payment processing</td>
      <td>Reading the floor before listing anywhere; price comps are the single most important number in sports card pricing</td>
    </tr>
    <tr>
      <td>eBay (fixed price)</td>
      <td>Modern short prints, raw rookies</td>
      <td>~13% FVF</td>
      <td>High-volume modern where the buyer pool is large and competitive — Prizm Silver, Mosaic, Bowman Chrome rookies</td>
    </tr>
    <tr>
      <td>eBay (auction)</td>
      <td>Vintage, low-pop modern, autographs</td>
      <td>~13% FVF + listing fee on some tiers</td>
      <td>Cards whose realized price needs to be discovered by bidding, not set — graded vintage, rare autos, low-pop numbered parallels</td>
    </tr>
    <tr>
      <td>Goldin / Heritage / PWCC</td>
      <td>High-value vintage, elite modern</td>
      <td>15–20% take rate, separate authentication</td>
      <td>Cards whose realized price warrants consignment infra — 1950s–1980s vintage, T206, hyper-modern low-pop</td>
    </tr>
    <tr>
      <td>COMC</td>
      <td>Bulk modern</td>
      <td>Lower FVF on sale; holding fee during storage</td>
      <td>Lots and singles of bulk modern where 90-day capital lockup is acceptable</td>
    </tr>
    <tr>
      <td>StockX</td>
      <td>Liquidated slabs</td>
      <td>~9% take rate, transaction fee</td>
      <td>Cards where bid/ask liquidity beats auction premium — Prizm slabs, select modern slabs in volume</td>
    </tr>
    <tr>
      <td>Facebook groups</td>
      <td>Niche sports, regional sets, walk-around vintage</td>
      <td>No platform fee; shipping/payment negotiated</td>
      <td>Cards that do not show on eBay — international soccer, regional Japan releases, niche vintage oddities</td>
    </tr>
    <tr>
      <td>Cardmarket</td>
      <td>European Pokémon, MTG, select non-sport</td>
      <td>~5% platform fee</td>
      <td>International European buyers for Pokémon and MTG; English-language listings on compact cards where the European pool pays more than the US pool</td>
    </tr>
  </tbody>
</table>

<p>The mistake is treating eBay as the only channel. eBay is the price-setting channel — sold listings are the price floor every other channel references. But the realized sale price on eBay is not always the highest realized price. A 1968 Topps Nolan Ryan rookie on eBay with seven-day auction and standard photography will bring less than the same card at Goldin against a curated buyer pool. Read more on the storage side of that equation in the <a href="/blog/sports-card-storage-and-display-protection-stack">sports card storage and display protection stack</a> — the pre-sale display state affects realized price for any card worth photographing.</p>

<h2>Raw vs graded pricing — the math</h2>

<p>Raw-to-graded is the most consequential pricing decision in the modern card market. Submit a $25 raw Prizm Silver to PSA and either come back with a $180 PSA 10 or a $45 PSA 9 or a $20 PSA 8. The fee is fixed. The grade distribution is what you manage by pre-screening — and the expected sale is what you model before shipping.</p>

<p>The pricing formula is straightforward. The decision is whether to execute it.</p>

<pre><code>Expected sale = (PSA 10 probability × PSA 10 comp)
              + (PSA 9 probability × PSA 9 comp)
              + (PSA 8 probability × PSA 8 comp)
              + lower-tail grades weighted by their comp

Net profit = expected sale − 13% eBay fees − $4 shipping
           − raw card cost − grading fee − slabbed shipping</code></pre>

<p>Most grade flips fail on the probability side. Buyers ignore that a $25 raw Prizm Silver returned PSA 10 has a realized probability of about 8–12% from a disciplined pre-screen. The expected value calculation has to weight PSA 9 at 50–55%, PSA 8 at 25–30%, PSA 10 at the long tail — and only the long tail pays the fee. The full fee-tiered ROI math lives in the <a href="/blog/sports-card-grading-side-hustle-profit-calculator">sports card grading side hustle profit calculator</a>; treat the table below as the input the calculator runs on.</p>

<table class="comparison-table">
  <thead>
    <tr>
      <th>Card Class</th>
      <th>Raw Comp</th>
      <th>PSA 9 Comp</th>
      <th>PSA 10 Comp</th>
      <th>PSA 10 Probability (Disciplined Pre-Screen)</th>
      <th>Grade-Flip Decision</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Modern Prizm Silver Rookie (Silver Prizm)</td>
      <td>$20–$30</td>
      <td>$40–$55</td>
      <td>$150–$220</td>
      <td>~10%</td>
      <td>Submit on tight pre-screen; PSA 10 is the profit</td>
    </tr>
    <tr>
      <td>Modern /25 or /10 Numbered Parallel</td>
      <td>$40–$60</td>
      <td>$70–$95</td>
      <td>$220–$400</td>
      <td>~6%</td>
      <td>Submit only on near-perfect centering and surface</td>
    </tr>
    <tr>
      <td>Topps Chrome UFC/FIFA Rookie</td>
      <td>$15–$25</td>
      <td>$35–$50</td>
      <td>$130–$190</td>
      <td>~12%</td>
      <td>Submit at economy tier; meaningful slab premium, lower competition</td>
    </tr>
    <tr>
      <td>Vintage Topps Baseball Rookie (1970s–1980s)</td>
      <td>$10–$40</td>
      <td>$25–$70</td>
      <td>$90–$300</td>
      <td>~8%</td>
      <td>Submit on centering-acceptable raw; PSA 7 or 8 still profit for clean vintage</td>
    </tr>
    <tr>
      <td>Base Rookie (high print run)</td>
      <td>$2–$8</td>
      <td>$3–$9</td>
      <td>$10–$18</td>
      <td>~20% (high PSA 10 pop)</td>
      <td>Do not grade; PSA 9 and PSA 10 prices do not clear the fee</td>
    </tr>
  </tbody>
</table>

<p>Market data moves fast — verify current comps against eBay sold listings before committing capital. The numbers above are illustrative. The decision rule: if the probability-weighted expected sale minus fees and shipping minus raw cost minus grading fee is under 20% of raw cost, sell raw or keep as a PC piece. The full fee-tiered ROI math — including optimal tier selection, turnaround-adjusted capital drag, and grade-failure loss equal to raw plus fee — is worked through the <a href="/blog/sports-card-grading-side-hustle-profit-calculator">sports card grading side hustle profit calculator</a>.</p>

<h2>Timing the market — the calendar that matters</h2>

<p>Selling into a soft window is leaving money on the table. The sports card market is not flat — it has structural seasonality layered on top of player-specific spikes. Three calendar patterns cover most of the inventory in a typical collector's rotation.</p>

<p><strong>Rookie-season peak (August through February).</strong> Football and basketball rookie classes hit their realized-price peak on the back of NFL and NBA seasons. The first 6 weeks of the NFL season (mid-September through Halloween) and the first half of the NBA season (October through December) are when Prizm Silver, Mosaic, and Bowman Chrome flag-ship rookies pay their highest comp. Listing a Prizm Silver Rookie in week 8 of the NFL season misses the peak by margins of 25–40% on players whose performance has trailed.</p>

<p><strong>Post-peak 6–12 month window for cards that did not break out.</strong> The rookie-season peak compresses as the calendar moves into March and April. Players who did not break out in year one have a second-window window around training camp (August) and the start of the subsequent season — but most break-out spreads have already compressed by then. The sellers who do not act in the post-peak window end up listing 18 months later at trendline prices, taking 30–50% less than they would have realized in February of the peak year.</p>

<p><strong>Vintage seasonality tied to auction calendars.</strong> Vintage — T206, 1952–1971 Topps Baseball, 1979–1985 Topps Football — has its own cadence. Auction houses (Goldin, Heritage, PWCC) schedule marquee auctions around February, late May, and October. Listing the same card outside an auction window leaves the realized price to eBay bidder competition, which is thin for vintage. Calendar submission windows for consignment: late December for February auctions, late March for May auctions, mid-August for October auctions.</p>

<p><strong>Mid-Q1 trough.</strong> February and March are structurally soft in the secondary modern and slab market — capital that went into rookie-season purchases in October and December is listing, fresh inventory dilutes realized prices, and buyer activity has not yet pivoted to baseball opening day and the new rookie class. Vintage holds reasonably well through this window because the auction calendar pulls in. Modern and graded modern do not. Listing in mid-Q1 forces sellers to either hold for 60–90 days or accept 20–35% below December comps on the same card.</p>

<h2>Putting it together — the listing decision</h2>

<p>Every listing is a four-question decision: who is the buyer pool, which channel matches that pool, what is the expected sale price net of fees and shipping, and where in the seasonal calendar is the card most likely to clear. The cards worth grading are the cards where the probability-weighted grade premium clears the fee; for the rest, the raw comps on eBay sold listings plus the channel-selection rules above are the answer.</p>

<p>The math changes when the card moves from raw to slabbed. Selling a graded Prizm Silver at the right time on the right channel is a different optimization than selling the raw version. The variables involved — submission tier, grade probability distribution, eBay take rate by category, and the channel-specific realized price spread — are the inputs the <a href="/blog/sports-card-grading-side-hustle-profit-calculator">sports card grading side hustle profit calculator</a> runs on. Run the card through it before submitting and before listing — the calculator handles both directions.</p>

<div class="vault-cta">
  <div class="vault-cta-label">Next Step</div>
  <div class="vault-cta-body">
    <strong>Run the numbers.</strong> Pull the card, the raw cost, the comp, and the grade probability into the <a href="/blog/sports-card-grading-side-hustle-profit-calculator" class="vault-cta-link">sports card grading side hustle profit calculator →</a> It pulls fee-tier costs, eBay take, and probability-weighted grade premium into a single net-profit number so the grade-flip call is made before the card ships.
  </div>
</div>
        $body_how_to_sell$,
        9,
        'How to sell sports cards: who buys (dealers, breakers, PSA 10 buyer pools, investors, COMC/StockX), where to sell (eBay for floor and comps, goldin/heritage/PWCC for high-value vintage, COMC for bulk modern, facebook groups for niche, cardmarket for international Pokémon/MTG), raw vs graded pricing worked as fee plus probability-weighted grade premium, and the seasonal timing window that decides realized price.',
        'https://www.stickvault.com/pins/how-to-sell-sports-cards.png',
        true
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    // ── 1.2 ── Bump created_at so the new guide sits at the top of ?category=collecting.
    // Mirrors 1800000000000_sports_card_grading_side_hustle_pillar.js:189-194.
    await client.query(`
      UPDATE blog_posts
      SET created_at = NOW()
      WHERE slug = 'how-to-sell-sports-cards'
    `);

  },
};
