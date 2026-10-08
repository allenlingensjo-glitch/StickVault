/**
 * Collecting cluster batch 2 — 5 new posts + SEO audit + Pinterest opt + Starter Kit repositioning.
 * Owns: blog_posts INSERT (5 new), products UPDATE (collector_kit page copy + featured_posts),
 *       blog_posts UPDATE (existing posts — add links to new batch + ensure Starter Kit CTA).
 * Does NOT own: schema changes, subscriber data, payment links.
 */

// ── Pinterest Alternate Titles for Each New Post ──────────────────────────────
// POST 6 — PC Building Philosophy:
//   "How to Build a Personal Card Collection With Real Intention"
//   "PC Building for Serious Collectors: Quality Over Everything"
//   "The Long Game: Building a Sports Card PC That Actually Means Something"
//   "How I Defined My PC Focus (And Why It Changed Everything)"
//   "Personal Collection Philosophy: Investment vs Emotional Value in Sports Cards"
//   "What Makes a Great PC? A Framework for Intentional Card Collecting"
//   "Stop Collecting Everything: How to Define Your PC Focus"
//   "Quality Over Quantity: The Collector's PC Building Mindset"
//   "Building a Sports Card PC With Purpose — Not Just Budget"
//   "The Art of the Personal Collection: Long-Game Thinking for Card Collectors"

// POST 7 — Flipping Workflows:
//   "How to Flip Sports Cards for Profit (Step-by-Step System)"
//   "Card Flipping Workflow: From Sourcing to Sold in One System"
//   "The Sports Card Flip System: Buy Low, Sell High, Repeat"
//   "How Serious Card Flippers Source, Price, and Profit Every Week"
//   "Card Arbitrage Strategy: The Flipping Workflow Real Sellers Use"
//   "Sports Card Flipping 101: The System That Scales"
//   "How to Flip Cards on eBay: The Full Workflow"
//   "Buy Low, Sell High: The Collector's Card Flipping Playbook"
//   "Sports Card Flipping Strategy: Sourcing, Comps, and Timing"
//   "The Profitable Card Flipping System (Without Guessing)"

// POST 8 — Collector Routines & Workflows:
//   "The Weekly Routine Serious Card Collectors Actually Use"
//   "How Top Collectors Manage Their Time Every Week"
//   "Collector Habits: The Weekly Workflow Behind a Managed PC"
//   "The Serious Collector's Daily and Weekly Routine"
//   "Card Collecting Routine: What to Do Each Week to Stay Ahead"
//   "How to Build a Weekly Collecting Workflow That Actually Works"
//   "The Organized Collector: Daily Habits and Weekly Systems"
//   "Sports Card Collector Workflow: From Comps to Community in One System"
//   "The Collector's Weekly Operating System"
//   "Managing Your Collection as a Business: The Weekly Routine"

// POST 9 — eBay Listing Optimization:
//   "How to Write eBay Listings That Actually Sell Sports Cards"
//   "eBay Sports Card Listing Strategy: Photography, Titles & Pricing"
//   "eBay Listing Optimization for Card Sellers: The Full Guide"
//   "How to Get More Bids on eBay — Sports Card Seller Playbook"
//   "The eBay Card Listing Template That Gets Views and Sales"
//   "Sports Card eBay Photography + Title Formula That Works"
//   "How to Price Sports Cards on eBay (And Why Most Sellers Get It Wrong)"
//   "eBay Promoted Listings for Sports Cards: Worth It?"
//   "Selling Sports Cards on eBay: Titles, Photos, Shipping Strategy"
//   "The Complete eBay Card Selling Guide: From Photo to Paid"

// POST 10 — Grading Service Comparison:
//   "PSA vs BGS vs SGC: Which Grading Company Should You Use?"
//   "PSA, BGS, SGC, CGC — The Complete Grading Service Comparison"
//   "Which Grading Company Is Best? PSA vs BGS vs SGC Breakdown"
//   "PSA vs Beckett Grading: The Real Differences (For Card Investors)"
//   "SGC vs PSA: Is SGC Grading Worth It for Vintage Cards?"
//   "CGC Cards vs PSA: Should Comic Graders Use CGC for Sports Cards?"
//   "Card Grading Companies Compared: Turnaround, Cost, and Resale Premium"
//   "PSA 10 vs BGS 9.5: Which Grade Gets More on eBay?"
//   "Grading Service Comparison: When to Use PSA vs BGS vs SGC vs CGC"
//   "The Collector's Guide to Choosing a Grading Company"

module.exports = {
  name: 'collecting_cluster_batch2',
  up: async (client) => {

    // ── POST 6: PC Building Philosophy ────────────────────────────────────────
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description, published)
      VALUES (
        'pc-building-philosophy-personal-collection-with-intention',
        'PC Building Philosophy: How to Build a Personal Collection With Intention',
        'collecting',
        'Building a PC is not about owning more cards. It is about defining what you actually want from a collection — and building toward that with discipline instead of impulse.',
        $body6$
<p>Most collections start the same way: you pull something cool, you buy a few more, and before long you have boxes of cards with no coherent theme, no strategy, and no clear sense of why any of it is there. That is not a PC. That is inventory with an identity crisis.</p>

<p>A personal collection — a real one — is defined. It has a focus, a logic, and a reason for each card in it. Building one deliberately is a different skill than buying cards, and most collectors never develop it.</p>

<h2>Define your focus before you buy anything</h2>

<p>The first question for any PC is: what is this collection about? Not at the level of "sports cards" — at the level of something specific enough to make a yes/no decision at the card show or auction page.</p>

<p>Examples of defined focuses:</p>
<ul>
<li>All Mike Trout cards graded PSA 9 or higher — base, parallels, no autos</li>
<li>Vintage Dodgers HOF cards — pre-1980, raw, presentation over grade</li>
<li>Auto rookies from a single position — only starting pitchers drafted in the top 5</li>
<li>One-of-one cards from any player — the rarity is the point</li>
</ul>

<p>None of those is correct. All of them are focused enough to be useful. When you are at a show and someone hands you a card that is outside your focus, the answer is easy: pass. A defined PC makes every buying decision faster and better.</p>

<p>If you cannot explain your PC focus in one sentence, the focus is not clear enough yet. Work backward from the cards you already own that you would never sell — those are your anchors. Build the definition from there.</p>

<h2>Quality vs quantity: the math that matters</h2>

<p>A PC of 20 PSA 9s and 10s in your player will appreciate and remain sellable. A PC of 400 raw cards of the same player is harder to value, harder to sell, and harder to display. Quantity makes tracking harder without making the collection better.</p>

<p>The question is not "how many cards should I own?" It is "what is the collection for?" If it is emotional — you love this player, these cards represent something — then quantity is fine and appreciation is secondary. If it has an investment component, quality matters more. Both are valid. But you need to know which one you are building.</p>

<p>Serious collectors tend toward fewer, better cards over time. This is not because they become less interested — it is because they become more selective. A card that does not belong in the PC is not a win at any price.</p>

<div class="vault-cta">
  <div class="vault-cta-label">From the Vault</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> — the operational system behind every well-run PC: inventory spreadsheet, comp tracking, grading tier logic, and sell vs. hold framework. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit →</a>
  </div>
</div>

<h2>Emotional vs investment value: decide which one you are doing</h2>

<p>There is nothing wrong with collecting for love. The problem is when collectors mix investment logic and emotional decisions without knowing they are doing it — then get frustrated when the math does not work out.</p>

<p>Emotional value: you collect cards because they mean something. You keep the first Rookie Pullmacher you ever pulled. You buy the vintage cards from the era you grew up watching. You do not care about resale. This is the best reason to collect — and it requires zero market discipline. Just enjoy it.</p>

<p>Investment value: you collect cards with an eye on appreciation and eventual sale. You need comp discipline, pop report awareness, and patience. You should not hold cards you are emotionally attached to — emotion makes it hard to sell at the right moment.</p>

<p>Most serious collectors do both, with different cards. The trick is labeling each card honestly: this one is a keeper, this one is an appreciating asset I will sell. Confusion between the two categories is where collectors make expensive mistakes.</p>

<p>For a full operational system covering inventory, comp tracking, and the sell vs. hold decision, the <a href="/blog/collector-value-tracking-system">collector value tracking guide</a> in the vault walks through the framework in detail.</p>

<h2>When to upgrade and when to hold what you have</h2>

<p>As a PC matures, upgrade decisions become important. You have a PSA 8 of a card you love — is it worth finding a 9? Usually the answer depends on three things:</p>

<ul>
<li><strong>The resale premium between grades.</strong> If the market values a 9 at $400 and an 8 at $280, the upgrade cost needs to be less than $120 for it to be financially rational. Check recent sales, not asking prices.</li>
<li><strong>Population report context.</strong> If there are 4,000 PSA 9s of this card, the 9 has limited scarcity value. If there are 12, the upgrade matters more.</li>
<li><strong>Your focus tier.</strong> If your PC is built around NM-MT presentation (8-9), upgrading to a 10 may break the aesthetic logic of the collection.</li>
</ul>

<p>For building your grading strategy and understanding submission economics, the <a href="/blog/grading-prep-system-before-submitting-to-psa">grading prep system</a> covers the full pre-submission workflow and decision logic.</p>

<h2>The long game</h2>

<p>PC building is not a sprint. The best collectors have held key cards for 5, 10, 15 years. The patience to let the right card come to you — rather than overpaying for an inferior copy — is what separates a managed collection from a reactive one.</p>

<p>Define the focus. Buy only what belongs. Track what you own. Let time work. The vault becomes valuable not by growing fast but by growing right.</p>

<div class="vault-cta">
  <div class="vault-cta-label">System Reference</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> — PC inventory tracker, grading submission log, comp tracking sheet, and the frameworks that make a long-game PC manageable. One system. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get it here →</a>
  </div>
</div>

<div class="vault-next-read">
  <div class="vault-next-read-label">Recommended Next Read</div>
  <div class="vault-next-read-grid">
    <a href="/blog/collector-inventory-organization-system" class="vault-next-card">
      <div class="vault-next-card-title">Collector Inventory Organization</div>
      <div class="vault-next-card-desc">Once you know what belongs in your PC, you need a system to track it all. Spreadsheet columns, skip patterns, and the setup that makes a big collection manageable.</div>
    </a>
    <a href="/blog/collector-value-tracking-system" class="vault-next-card">
      <div class="vault-next-card-title">Value Tracking Systems</div>
      <div class="vault-next-card-desc">Comp cadence, watchlist management, and the sell vs. hold framework for PC pieces that have appreciated.</div>
    </a>
    <a href="/blog/grading-service-comparison-psa-bgs-sgc-cgc" class="vault-next-card">
      <div class="vault-next-card-title">Grading Service Comparison</div>
      <div class="vault-next-card-desc">PSA vs BGS vs SGC vs CGC — when to use each, what the resale premiums look like, and how to choose your submission service.</div>
    </a>
  </div>
</div>
        $body6$,
        7,
        'PC Building Philosophy: How to build a personal sports card collection with intention, quality focus, and long-game thinking. Emotional vs investment value, upgrade strategy, and the discipline behind a real PC.',
        true
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    // ── POST 7: Flipping Workflows ─────────────────────────────────────────────
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description, published)
      VALUES (
        'sports-card-flipping-workflow-buy-low-sell-high-system',
        'The Sports Card Flipping Workflow: How to Buy Low, Sell High, and Track Your Profit',
        'collecting',
        'Card flipping is not gambling. It is a system — sourcing, comp analysis, timing, batch listing, and reinvestment. Here is the workflow serious flippers use to make it repeatable.',
        $body7$
<p>Flipping sports cards well is not about luck or connections. It is about having a repeatable system: you know where to source, how to comp, when to list, and how to track your results. Without the system, every flip is a guess. With it, you can run a real operation.</p>

<p>This is the workflow. Build it out over time — the goal is to make each step mechanical so you can focus on the decisions that matter: what to buy and at what price.</p>

<h2>Step 1: Sourcing — where to find underpriced cards</h2>

<p>The flip profit is made at purchase, not at sale. If you buy at market or above, you are not flipping — you are gambling on appreciation. The sourcing step is where the margin lives.</p>

<p>Best sourcing channels in rough priority order:</p>

<ul>
<li><strong>eBay auctions with bad photos or misspelled titles</strong> — cards that do not come up in search sell below value every time. Learn the common misspellings in your niche (e.g., "Mikal" vs "Mikal," common card names). Set saved searches.</li>
<li><strong>Local card shows and shops</strong> — dealers price against the local market, not live eBay comps. If you have live comp access they do not, the spread is yours.</li>
<li><strong>Facebook Marketplace and local groups</strong> — casual sellers who do not want to deal with eBay fees often take 30-50% below market for speed.</li>
<li><strong>Estate sales and thrift stores</strong> — inconsistent, but the best finds when they hit. Requires patience and geographic access.</li>
<li><strong>Bulk lots from overwhelmed collectors</strong> — someone cleaning out their collection wants cash today. The per-card price is low; sorting is the work.</li>
</ul>

<p>Build a sourcing rotation. Hit the same channels weekly. The consistency of looking is what surfaces opportunities.</p>

<div class="vault-cta">
  <div class="vault-cta-label">From the Vault</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> — includes a flip tracking spreadsheet, comp workflow, and the reinvestment calculator that keeps your flipping capital working. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit →</a>
  </div>
</div>

<h2>Step 2: Comp analysis — know the real price before you buy</h2>

<p>eBay sold listings are the closest thing to ground truth for sports card prices. But you need to read them correctly:</p>

<ul>
<li>Filter for sold (not listed) in the past 90 days</li>
<li>Match condition carefully — raw vs graded, and which grade</li>
<li>Strip outliers — one sale at $400 when six others are $120 is not a $400 card</li>
<li>Check sale frequency — if the same card only sells 2-3 times a year, liquidity risk is real</li>
</ul>

<p>A quick comp pull takes 3-4 minutes. Any card you are considering buying deserves this work. Buying without comps is the fastest way to sit on inventory.</p>

<p>For a deeper comp workflow and how to track value over time, the <a href="/blog/collector-value-tracking-system">value tracking system post</a> in the vault covers the 90-day cadence and watchlist methodology in full.</p>

<h2>Step 3: Setting your buy price and target margin</h2>

<p>Know your margin requirements before you buy, not after. The formula is simple:</p>

<pre><code>Max buy price = (expected sale price × 0.87) − cost of grading (if applicable) − shipping cost</code></pre>

<p>The 0.87 accounts for eBay's ~13% total fees (selling fee + payment processing). If you are selling through another channel, adjust accordingly.</p>

<p>Most successful flippers target a minimum 25-30% gross margin after fees. If the math does not work at the available price, pass. The discipline to pass is the discipline that makes flipping profitable.</p>

<h2>Step 4: Batch listing and listing quality</h2>

<p>Listing one card at a time is inefficient. Build a batch workflow: photograph a set, write titles and descriptions in sequence, schedule listings in a block. This makes the listing step much faster and produces more consistent quality.</p>

<p>Listing quality matters. A card with a sharp photo, accurate title, and clear description sells faster at better prices than the same card with a phone snap and a vague title. The time you invest in listing quality pays in sell-through rate and average sale price.</p>

<p>For a full breakdown of eBay listing strategy — titles, photos, pricing, promoted listings — see the <a href="/blog/ebay-listing-optimization-sports-cards-sell-faster">eBay listing optimization guide</a> in the vault.</p>

<h2>Step 5: Profit tracking and reinvestment</h2>

<p>Track every flip. Revenue, cost of goods, fees, grading costs, shipping. Without tracking, you cannot know your actual margin or identify which sourcing channels are most profitable.</p>

<p>A simple spreadsheet works: card, source, buy price, sale price, fees, net profit, days held. Run it weekly. After 3-6 months, you will have real data on which card types, which sources, and which price ranges produce the best returns for your time.</p>

<p>Reinvestment discipline is what grows the operation. If you flip $500 in cards and make $150 profit, the discipline is putting $150 back into sourcing — not spending it. Capital that stays in the system compounds. Capital that exits does not.</p>

<div class="vault-cta">
  <div class="vault-cta-label">System Reference</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> — the flip tracking system, comp worksheet, and reinvestment planner in one download. Built for card sellers who want to run it like a business. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get it here →</a>
  </div>
</div>

<div class="vault-next-read">
  <div class="vault-next-read-label">Recommended Next Read</div>
  <div class="vault-next-read-grid">
    <a href="/blog/ebay-listing-optimization-sports-cards-sell-faster" class="vault-next-card">
      <div class="vault-next-card-title">eBay Listing Optimization</div>
      <div class="vault-next-card-desc">The photography, title formula, pricing strategy, and promoted listing approach that makes cards sell faster at better prices.</div>
    </a>
    <a href="/blog/collector-value-tracking-system" class="vault-next-card">
      <div class="vault-next-card-title">Value Tracking Systems</div>
      <div class="vault-next-card-desc">How to run comp analysis, track 90-day price trends, and know when to move versus when to hold.</div>
    </a>
    <a href="/blog/ebay-sports-card-selling-workflow" class="vault-next-card">
      <div class="vault-next-card-title">eBay Selling Workflow</div>
      <div class="vault-next-card-desc">The full step-by-step eBay selling process — from pricing strategy to batch shipping and store organization.</div>
    </a>
  </div>
</div>
        $body7$,
        8,
        'Sports card flipping workflow: how to source underpriced cards, run comp analysis, set buy prices with target margins, batch list on eBay, and track profit for a repeatable flipping operation.',
        true
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    // ── POST 8: Collector Routines & Workflows ────────────────────────────────
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description, published)
      VALUES (
        'serious-collector-weekly-routine-workflow-habits',
        'The Serious Collector''s Weekly Routine: Habits and Workflows That Keep a PC on Track',
        'collecting',
        'Managing a collection well is not about spending more time on it. It is about building the right weekly habits — comp checks, inventory updates, auction monitoring, grading batch prep — and running them consistently.',
        $body8$
<p>The difference between a managed collection and a chaotic one is usually not knowledge or capital — it is routine. Serious collectors have a weekly operating rhythm. They know what they check and when. The collection does not pile up; it stays current.</p>

<p>This is the weekly workflow. Adapt it to your scale, but maintain the cadence. Consistency is what keeps the system useful.</p>

<h2>Daily habits (under 10 minutes)</h2>

<p>Not every day requires deep work. But a few quick checks keep you from missing opportunities and losing touch with the market:</p>

<ul>
<li><strong>eBay saved search alerts</strong> — check new listings in your sourcing searches. New listings at auction get the least attention in the first 24 hours — that is when to watch.</li>
<li><strong>Active auction monitoring</strong> — if you have bids placed, check endings. Know what you are losing before it ends, not after.</li>
<li><strong>Price alert apps</strong> — Market Movers, Card Ladder, or similar tools send alerts when cards on your watchlist hit certain price points. These are passive and valuable.</li>
</ul>

<p>Total daily time: 5-10 minutes if your alerts are well-configured.</p>

<h2>Weekly comp refresh (30-45 minutes)</h2>

<p>Once per week, pull fresh comps on your top tracked cards. Not every card in your inventory — just the ones you are actively watching for movement: near-ready-to-sell PCs, flip targets you are sourcing, recent buys you want to track.</p>

<p>The routine:</p>
<ol>
<li>Open your comp tracking spreadsheet (one row per card)</li>
<li>Pull the last 10 eBay sold listings for each tracked card</li>
<li>Update the current price column and note the date</li>
<li>Flag any card that has moved more than 15% since last week — those get a decision: sell, hold, or investigate why</li>
</ol>

<p>For the full comp methodology and spreadsheet setup, the <a href="/blog/collector-value-tracking-system">value tracking system post</a> covers what columns to track and how to build the watchlist.</p>

<div class="vault-cta">
  <div class="vault-cta-label">From the Vault</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> — the weekly routine checklist, comp tracking spreadsheet, and inventory worksheet in one organized download. Built for serious collectors who run their collection like a system. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit →</a>
  </div>
</div>

<h2>Inventory updates (as needed, 15-20 minutes per session)</h2>

<p>Every card that enters or exits the collection gets logged. This is not optional if you want to understand your collection financially. The log is simple:</p>

<ul>
<li>Card added: slug, purchase price, source, purchase date, condition/grade</li>
<li>Card sold: sale price, platform, date, final profit vs purchase price</li>
</ul>

<p>Weekly is fine for most collectors. High-volume flippers may need to log daily. The goal is never being more than a week out of date on where your inventory stands.</p>

<p>The <a href="/blog/collector-inventory-organization-system">inventory organization guide</a> walks through the full spreadsheet setup — which columns matter, which to skip, and how to structure it so sorting and searching actually work.</p>

<h2>Grading batch prep (monthly or as-needed)</h2>

<p>Grading submissions work better in batches. Individual card submissions are inefficient — the per-card overhead (packing, forms, shipment tracking) is the same whether you send 5 cards or 30. Building toward a monthly or quarterly batch keeps the economics reasonable.</p>

<p>The batch prep routine:</p>
<ol>
<li>Pull candidate cards from your "consider grading" pile</li>
<li>Evaluate each under bright light (corners, edges, surface, centering)</li>
<li>Decide tier per card: economy, regular, or expedited based on card value</li>
<li>Fill submission forms — one per service, one batch per tier</li>
<li>Sleeve, half-holder, card saver, bubble mailer — in that order</li>
<li>Ship and log submission date, estimated return window</li>
</ol>

<p>The <a href="/blog/grading-prep-system-before-submitting-to-psa">grading prep system post</a> covers each step in detail, including the packing protocol that protects grades in transit.</p>

<h2>Community engagement (15-30 minutes per week)</h2>

<p>The card market is social. Prices, releases, and sentiment move through community channels before they show up in sold listings. Being plugged in is a genuine competitive advantage.</p>

<p>Channels worth monitoring weekly:</p>
<ul>
<li>Reddit (r/baseballcards, r/basketballcards, r/footballcards) — watch for market chatter, population surprises, release announcements</li>
<li>Twitter/X — collector accounts, breakers, set release news</li>
<li>Discord servers for specific player or team communities — player news moves prices fast</li>
<li>YouTube — market recap channels give a useful weekly summary</li>
</ul>

<p>You do not need to post. Listening is enough. The goal is knowing what the market is talking about before it shows in prices.</p>

<div class="vault-cta">
  <div class="vault-cta-label">System Reference</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> — weekly routine template, comp tracking sheet, grading batch log, and inventory tracker in one system. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Download the Starter Kit →</a>
  </div>
</div>

<div class="vault-next-read">
  <div class="vault-next-read-label">Recommended Next Read</div>
  <div class="vault-next-read-grid">
    <a href="/blog/collector-inventory-organization-system" class="vault-next-card">
      <div class="vault-next-card-title">Inventory Organization System</div>
      <div class="vault-next-card-desc">The spreadsheet setup, essential columns, and skip patterns for a collection inventory that actually stays useful as it grows.</div>
    </a>
    <a href="/blog/collector-value-tracking-system" class="vault-next-card">
      <div class="vault-next-card-title">Value Tracking System</div>
      <div class="vault-next-card-desc">The comp cadence, watchlist logic, and sell vs. hold decision framework for your most important PC cards.</div>
    </a>
    <a href="/blog/pc-building-philosophy-personal-collection-with-intention" class="vault-next-card">
      <div class="vault-next-card-title">PC Building Philosophy</div>
      <div class="vault-next-card-desc">Why most collections stall — and how to define your focus, set quality standards, and build something that actually represents your collecting goals.</div>
    </a>
  </div>
</div>
        $body8$,
        8,
        'The serious collector weekly routine: daily habits, comp refreshes, inventory updates, grading batch prep, and community engagement. The operating system behind a well-managed sports card collection.',
        true
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    // ── POST 9: eBay Listing Optimization ────────────────────────────────────
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description, published)
      VALUES (
        'ebay-listing-optimization-sports-cards-sell-faster',
        'eBay Listing Optimization for Sports Cards: Photos, Titles, Pricing, and What Actually Moves Cards',
        'collecting',
        'Most cards sit because the listing is doing them no favors. A sharp photo, a keyword-accurate title, and the right starting price are not hard to get right. Here is the formula.',
        $body9$
<p>Cards that do not sell are usually not the problem. The listing is. A bad photo, a vague title, or a starting price that does not match the market will leave any card sitting — regardless of its actual value. The listing is the product presentation, and it matters as much as the card itself.</p>

<p>Here is what actually drives eBay sales for sports cards, from someone who has watched the difference between listings that move and ones that do not.</p>

<h2>Photography: the non-negotiable</h2>

<p>Card photography has one rule: the buyer needs to see exactly what they are getting. This means:</p>

<ul>
<li><strong>Natural or LED light, not flash.</strong> Flash creates glare on foil and holo cards that obscures surface condition. Natural window light or a soft LED setup shows the card honestly.</li>
<li><strong>Clean background.</strong> A white or black matte surface. A cluttered desk is not a neutral background — it reads as amateur and it distracts from the card.</li>
<li><strong>Front AND back.</strong> Always. Buyers who cannot see the back will either ask (which costs you time) or skip. Show the back. It signals transparency.</li>
<li><strong>High resolution.</strong> Close enough that the serial number is readable on numbered cards. If the buyer cannot confirm the serial, they will not bid.</li>
<li><strong>Honest condition representation.</strong> If there is a surface scratch, it needs to be in the photo. Condition surprises create disputes, returns, and negative feedback. Show what it is.</li>
</ul>

<p>For graded cards in slabs, photograph through the slab under angled light so the grade label and card are both visible and sharp.</p>

<div class="vault-cta">
  <div class="vault-cta-label">From the Vault</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> — includes listing templates, batch listing workflow, and the pricing strategy framework for building a consistent eBay operation. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit →</a>
  </div>
</div>

<h2>Titles: keyword accuracy over cleverness</h2>

<p>eBay search is keyword-based. Your title needs to contain what buyers are actually searching for. Generic titles lose to specific ones every time.</p>

<p>The title formula for raw cards:</p>
<pre><code>[Year] [Brand] [Set Name] [Parallel/Refractor/Insert] [Player Name] [Card Number] [Rookie/RC if applicable] [Condition]</code></pre>

<p>Example: <code>2019 Bowman Chrome Refractor Yordan Alvarez #BCP-146 RC PSA 10 Gem</code></p>

<p>For graded cards, include the grading company and grade in the title. PSA 10, BGS 9.5, SGC 10 — these are search terms buyers use actively. Do not bury them in the description.</p>

<p>Things that do not belong in the title: hype language ("HOT!", "WOW!"), your personal thoughts about the card's value, anything that is not a searchable attribute of the card itself.</p>

<h2>Pricing strategy: auction vs Buy It Now, and where to start</h2>

<p>The pricing decision comes down to how quickly you want to sell and how confident you are in the comp.</p>

<p>Auction (starting at $0.99 or comparable low price):</p>
<ul>
<li>Works best for in-demand cards with multiple recent comps showing consistent prices</li>
<li>Lower starting price drives early bids and eBay algorithmic visibility</li>
<li>Risk: if only one person bids, you sell below value</li>
<li>Best for: hot rookies, in-season players, newly graded cards in a strong pop-report position</li>
</ul>

<p>Buy It Now:</p>
<ul>
<li>Use the 90-day sold comp median, not the high end</li>
<li>Reduces price risk but requires patience — some cards sit for weeks</li>
<li>Best for: older cards with thin comp history, high-value slabs, PC cards you are not in a rush on</li>
<li>Adding Best Offer generates engagement and sometimes closes deals below asking without losing the listing</li>
</ul>

<p>Pull current eBay sold comps before pricing. The <a href="/blog/collector-value-tracking-system">value tracking system post</a> covers how to run a proper comp pull — this is the same process applied to listing pricing.</p>

<h2>Shipping templates and handling time</h2>

<p>Shipping is a trust signal. Buyers look at handling time and shipping cost before they bid. Slow handling time (3+ business days) reduces bids. High shipping on a low-priced card kills the economics for the buyer.</p>

<p>Standard shipping setup for most cards:</p>
<ul>
<li><strong>Raw cards under $50</strong>: PWE (plain white envelope) or top loader in a padded mailer, First Class, $0-$1 shipping. Include tracking even at this tier — it closes disputes.</li>
<li><strong>Cards $50-$500</strong>: Semi-rigid or rigid top loader, bubble mailer, USPS First Class or Ground Advantage. $4-$6 shipping.</li>
<li><strong>Slabs and high-value raw cards</strong>: Team bag → card saver → bubble wrap → box. USPS Priority or FedEx Ground with signature confirmation above $250.</li>
</ul>

<p>Set your handling time to 1-2 business days and stick to it. Shipping within that window consistently builds positive feedback and improves your seller metrics.</p>

<h2>Promoted listings: when they are worth it</h2>

<p>eBay Promoted Listings Standard charges a percentage of sale only when the card sells through a promoted placement. The rate you set determines where you appear in promoted results — higher rate, higher placement.</p>

<p>Promoted listings are worth it for:</p>
<ul>
<li>Cards in competitive search results where organic position is crowded</li>
<li>Buy It Now listings with no deadline (no auction urgency to drive clicks)</li>
<li>Higher-value cards where extra velocity justifies the 5-12% rate</li>
</ul>

<p>Not worth it for: already-ending auctions, cards with strong organic performance, very low-margin flips where the promotion rate kills the margin entirely.</p>

<p>For a full eBay selling workflow from initial list to payout tracking, see the <a href="/blog/ebay-sports-card-selling-workflow">eBay selling workflow post</a> in the vault — the two posts work together.</p>

<div class="vault-cta">
  <div class="vault-cta-label">System Reference</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> — listing templates, batch workflow, and the pricing strategy framework. Run your eBay selling like a system, not a guessing game. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit →</a>
  </div>
</div>

<div class="vault-next-read">
  <div class="vault-next-read-label">Recommended Next Read</div>
  <div class="vault-next-read-grid">
    <a href="/blog/ebay-sports-card-selling-workflow" class="vault-next-card">
      <div class="vault-next-card-title">eBay Selling Workflow</div>
      <div class="vault-next-card-desc">The full end-to-end selling process — from pulling comps to batch shipping to tracking your final margin.</div>
    </a>
    <a href="/blog/sports-card-flipping-workflow-buy-low-sell-high-system" class="vault-next-card">
      <div class="vault-next-card-title">Card Flipping Workflow</div>
      <div class="vault-next-card-desc">Sourcing, comp analysis, buy price logic, and reinvestment strategy for collectors who flip to fund the PC.</div>
    </a>
    <a href="/blog/collector-value-tracking-system" class="vault-next-card">
      <div class="vault-next-card-title">Value Tracking System</div>
      <div class="vault-next-card-desc">How to run comp analysis and know when to list at auction vs Buy It Now based on real market data.</div>
    </a>
  </div>
</div>
        $body9$,
        9,
        'eBay listing optimization for sports cards: photography setup, title keyword formula, auction vs Buy It Now pricing strategy, shipping templates, and when promoted listings are worth the rate.',
        true
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    // ── POST 10: Grading Service Comparison ───────────────────────────────────
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description, published)
      VALUES (
        'grading-service-comparison-psa-bgs-sgc-cgc',
        'Grading Service Comparison: PSA vs BGS vs SGC vs CGC — When to Use Each',
        'collecting',
        'PSA is not always the right choice. BGS, SGC, and CGC each have specific cases where they outperform. Here is the comparison across turnaround, cost, resale premium, and submission strategy.',
        $body10$
<p>The default answer used to be "PSA, always." The market has changed. BGS 9.5s trade above PSA 10s in some niches. SGC has reclaimed its vintage credibility. CGC has expanded into cards with a legitimate following. The right grading service depends on what you are submitting, who you are selling to, and what the pop report looks like.</p>

<p>This is a working comparison — not a theoretical one. All four services are used by serious collectors. Each has a case where it is the right call.</p>

<h2>PSA (Professional Sports Authenticator)</h2>

<p>PSA is the largest grading service by volume and the default market reference for most modern sports cards. A PSA grade is the most recognized across eBay, PWCC, and the major auction houses.</p>

<p><strong>When PSA is the right call:</strong></p>
<ul>
<li>Modern base cards and parallels where PSA 9/10 is the standard trading unit</li>
<li>Any card where you plan to sell on eBay to the broadest possible audience</li>
<li>High-population cards where PSA market data is deepest (more comps, less price ambiguity)</li>
<li>Cards with a PSA-dominant population — if 90% of slabs are PSA, matching the market makes the comp cleaner</li>
</ul>

<p><strong>Turnaround:</strong> Highly variable by tier — economy tiers have run 6-18 months during high-demand periods. Express and above are faster but expensive.</p>
<p><strong>Cost tiers:</strong> Economy (~$25-30/card depending on declared value), Value, Regular, Express, Super Express — scaling from weeks to days.</p>
<p><strong>Resale premium:</strong> PSA 10 is the reference. On modern cards, a PSA 10 typically carries the highest raw premium of any service.</p>

<div class="vault-cta">
  <div class="vault-cta-label">From the Vault</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> — grading submission log, tier selection guide, and the population report methodology that tells you whether grading is worth it before you submit. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit →</a>
  </div>
</div>

<h2>BGS (Beckett Grading Services)</h2>

<p>BGS is the second-largest service and uses a subgrade system: centering, corners, edges, surface — each scored separately, composited into an overall grade. This specificity is why BGS 9.5 "Black Labels" (all subgrades at 9.5 or above) are among the most valuable slabs in the hobby.</p>

<p><strong>When BGS is the right call:</strong></p>
<ul>
<li>Near-perfect cards where the subgrade transparency confirms quality — BGS 9.5 with four 9.5 subgrades is more trusted than a PSA 10 because the detail is visible</li>
<li>High-value vintage cards where BGS has strong market acceptance (especially baseball)</li>
<li>Collector-focused pieces where the buyer cares about condition specifics more than brand recognition</li>
<li>Cards in the BGS-dominant market segments — Prizm basketball, for instance, has strong BGS premium history</li>
</ul>

<p><strong>Turnaround:</strong> Similar tiered structure to PSA. Economy tiers have slowed during high-demand periods but generally faster than PSA economy.</p>
<p><strong>Cost:</strong> Comparable to PSA across tiers.</p>
<p><strong>Resale premium:</strong> BGS 9.5 trades above PSA 10 in specific niches. BGS 9 is typically below PSA 9. The subgrade system creates more price variance than PSA.</p>

<h2>SGC (Sportscard Guaranty)</h2>

<p>SGC went through a significant modernization in 2019-2020 and has re-established itself as the leading service for vintage cards. Its clean, display-friendly slab design has also attracted modern collectors who care about aesthetics. SGC uses a 100-point scale (SGC 100 = Mint) as well as the traditional 10-point scale.</p>

<p><strong>When SGC is the right call:</strong></p>
<ul>
<li>Vintage cards (pre-1980) where SGC has deep market history and collector trust</li>
<li>Cards where turnaround speed matters more than maximum resale premium — SGC historically runs faster economy tiers than PSA/BGS</li>
<li>Display-focused collectors who prefer the SGC slab aesthetic</li>
<li>Niche modern markets where SGC is gaining ground (some vintage-style releases have shifted toward SGC)</li>
</ul>

<p><strong>Turnaround:</strong> Generally faster than PSA at comparable tiers during normal volume periods.</p>
<p><strong>Cost:</strong> Slightly lower at entry tiers than PSA.</p>
<p><strong>Resale premium:</strong> Strong for vintage; lower than PSA for modern cards in most categories. Check card-specific comps — the SGC premium is market-by-market.</p>

<h2>CGC (Certified Guaranty Company)</h2>

<p>CGC is best known for comics and has expanded into trading cards. Its card division (CGC Cards) has grown quickly, particularly among collectors who already trust the CGC ecosystem from comics.</p>

<p><strong>When CGC is the right call:</strong></p>
<ul>
<li>Crossover collectors who collect both comics and cards — the CGC brand trust transfers</li>
<li>Specific markets where CGC has established credibility: TCG cards (Pokémon, Magic), some non-sport cards</li>
<li>Experimental submissions where you want to test market reception outside the PSA/BGS duopoly</li>
</ul>

<p><strong>Turnaround:</strong> Variable; their card division is newer and volume spikes have affected turnaround unpredictably.</p>
<p><strong>Cost:</strong> Competitive with other services at standard tiers.</p>
<p><strong>Resale premium:</strong> Lower than PSA/BGS for mainstream sports cards; stronger in Pokémon and non-sport markets. Verify with sold comps before submitting.</p>

<h2>Submission strategy: pop reports and tier selection</h2>

<p>Before submitting any card, pull the pop report for that card on your target service. The pop report tells you:</p>
<ul>
<li>How many of the same card have been graded at each level</li>
<li>Whether a PSA 10 is a common outcome (pop of 2,000) or rare (pop of 8)</li>
<li>Whether the low-pop service (e.g., a vintage card submitted to SGC when most are PSA) creates a scarcity premium or just reduced liquidity</li>
</ul>

<p>High-pop cards at PSA 10 (thousands of copies) have compressed premiums. If you have a near-perfect copy of a high-pop card, the ROI on grading may be negative. Check the math before you submit.</p>

<p>For the full pre-submission evaluation workflow — including bright-light inspection, centering measurement, and packing protocol — the <a href="/blog/grading-prep-system-before-submitting-to-psa">grading prep system post</a> covers it step by step.</p>

<div class="vault-cta">
  <div class="vault-cta-label">System Reference</div>
  <div class="vault-cta-body">
    <strong>Collector's Vault Starter Kit</strong> — grading tier decision guide, pop report methodology, submission log, and the full collector operating system. <a href="/shop/collectors-vault-starter-kit" class="vault-cta-link">Get the Starter Kit →</a>
  </div>
</div>

<div class="vault-next-read">
  <div class="vault-next-read-label">Recommended Next Read</div>
  <div class="vault-next-read-grid">
    <a href="/blog/grading-prep-system-before-submitting-to-psa" class="vault-next-card">
      <div class="vault-next-card-title">Grading Prep System</div>
      <div class="vault-next-card-desc">The pre-submission workflow: evaluation under bright light, centering measurement, sleeve and packing protocol, and the tier selection framework.</div>
    </a>
    <a href="/blog/how-to-grade-sports-cards-psa-guide-for-beginners" class="vault-next-card">
      <div class="vault-next-card-title">PSA Grading Guide for Beginners</div>
      <div class="vault-next-card-desc">How PSA grades cards, what each criterion means, and how to self-evaluate before you submit to avoid paying to confirm bad news.</div>
    </a>
    <a href="/blog/pc-building-philosophy-personal-collection-with-intention" class="vault-next-card">
      <div class="vault-next-card-title">PC Building Philosophy</div>
      <div class="vault-next-card-desc">How grading fits into a long-game personal collection strategy — when to slab PC pieces, when to keep them raw, and how to think about grade targets.</div>
    </a>
  </div>
</div>
        $body10$,
        10,
        'PSA vs BGS vs SGC vs CGC grading service comparison: when to use each, turnaround times, cost tiers, population report strategy, and the resale premium differences that actually matter for sports card collectors.',
        true
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    // ── UPDATE: Add new post links to existing batch-1 posts that don't yet link to batch-2 ──
    // Grading prep post — add link to grading service comparison
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '</p>\n\n<p>This is the prep system.',
        ' For a comparison of which grading service to use for different card types, see the <a href="/blog/grading-service-comparison-psa-bgs-sgc-cgc">grading service comparison guide</a> in the vault.</p>\n\n<p>This is the prep system.'
      )
      WHERE slug = 'grading-prep-system-before-submitting-to-psa'
      AND body NOT LIKE '%grading-service-comparison-psa-bgs-sgc-cgc%'
    `);

    // Collector mistakes post — append a note linking to flipping and listing posts
    await client.query(`
      UPDATE blog_posts
      SET body = body || $extra_links$
<p>For collectors who want to turn their knowledge of these mistakes into a buying and selling operation, see the <a href="/blog/sports-card-flipping-workflow-buy-low-sell-high-system">card flipping workflow</a> and the <a href="/blog/ebay-listing-optimization-sports-cards-sell-faster">eBay listing optimization guide</a> in the vault.</p>
      $extra_links$
      WHERE slug = 'common-sports-card-collector-mistakes-to-avoid'
      AND body NOT LIKE '%sports-card-flipping-workflow%'
    `);

    // ── UPDATE: Strengthen Collector's Vault Starter Kit product page ──
    // Add "featured in vault posts" data and reposition product intro
    await client.query(`
      UPDATE products
      SET
        long_description = 'The Collector''s Vault Starter Kit is the operational system behind everything we write about in the vault. Every guide on grading prep, inventory organization, value tracking, and building a PC references this kit because it is where the templates, spreadsheets, and decision frameworks actually live. If you read the vault and want to implement what it describes, this is the starting point.',
        use_cases = ARRAY[
          'Building your first serious PC inventory system from scratch',
          'Preparing a grading batch for PSA, BGS, or SGC with a repeatable pre-submission workflow',
          'Running comp analysis on your watchlist cards using the 90-day eBay sold method',
          'Making sell vs. hold decisions with the included decision matrix instead of guessing',
          'Tracking flip profit and reinvestment with the included flip log'
        ]
      WHERE slug = 'collectors-vault-starter-kit'
    `);

  },
};
