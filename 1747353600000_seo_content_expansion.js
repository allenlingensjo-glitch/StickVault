/**
 * SEO content expansion.
 * Owns: Seeding 8 additional blog posts targeting long-tail keywords.
 * Does NOT own: table DDL (in core migration), product data.
 */
module.exports = {
  name: 'seo_content_expansion',
  up: async (client) => {
    await client.query(`
      INSERT INTO blog_posts (slug, title, category, excerpt, body, read_time_minutes, pinterest_description) VALUES

      -- COLLECTING: How to grade sports cards (PSA grading guide for beginners)
      (
        'how-to-grade-sports-cards-psa-guide-for-beginners',
        'How to Grade Sports Cards: A Complete PSA Guide for Beginners',
        'collecting',
        'You''ve got a card worth grading. Here''s exactly how PSA grading works, what it costs, and whether it''s worth submitting.',
        '<p>You pulled something good. Maybe it''s a rookie card you''ve been sitting on, or a card you snagged for cheap that the population report says barely anyone has graded. Either way, you''re thinking about sending it to PSA. Here''s everything you need to know before you do.</p>

<h2>What PSA grading actually is</h2>

<p>PSA (Professional Sports Authenticator) is the largest third-party grading company in the hobby. When you submit a card, they authenticate it (confirm it''s real), assess its condition, and assign it a numeric grade from 1 to 10. A PSA 10 is gem mint — essentially perfect. A PSA 9 is mint with minor flaws. Most raw cards grade somewhere between 5 and 8.</p>

<p>The grade gets printed on a label and the card gets sealed in a hard plastic case called a slab. The slab protects the card and makes the grade permanent and verifiable by anyone.</p>

<h2>The four grading criteria (corners, edges, surface, centering)</h2>

<p><strong>Corners</strong> — Flip the card under a bright light and look at all four corners. Fraying, chips, or rounding kill grades fast. This is where most cards lose points.</p>

<p><strong>Edges</strong> — Run your fingernail lightly along the edges. Rough texture, chips, or nicks drop a card from a 9 to a 7 immediately.</p>

<p><strong>Surface</strong> — Look at both front and back at a 45-degree angle under bright light. Scratches, print lines, stains, or creases all count. On holographic cards, look for foil wear.</p>

<p><strong>Centering</strong> — PSA measures the white border from all four sides. For a PSA 10, centering needs to be roughly 50/50 or better on front, and 75/25 on back. Off-center cards are common and often uncorrectable.</p>

<h2>How to prep a card for submission</h2>

<p>Never clean a card with anything. Don''t use your fingers, cloths, or any chemical. Handle cards by the edges only. Store them in penny sleeves inside top loaders before shipping.</p>

<p>Pull the card out under strong light and do your own honest assessment before submitting. Grading costs money — there''s no point paying to confirm a PSA 6.</p>

<h2>What does PSA grading cost?</h2>

<p>PSA charges by service tier, and prices change — always check their current rate sheet. At time of writing, Economy service (slowest, 60+ business days) runs $18–$25 per card for cards valued under $499. Express and super-express tiers run much higher. For high-value cards or time-sensitive submissions, costs jump significantly.</p>

<p>The math: if a raw card sells for $40 and a PSA 9 sells for $120, submitting at $18 makes sense. If a raw card sells for $15 and a PSA 9 sells for $25, you''re losing money. Run the numbers first.</p>

<h2>Is it worth grading?</h2>

<p>Depends entirely on the card. For rookie cards of stars with clean surfaces and sharp corners, almost always yes. For base set commons, almost never. For modern hits, the answer is usually: check eBay sold comps for the graded version and decide if the spread justifies the cost and wait.</p>

<p>The population report on PSA''s site shows how many copies of each card have been graded at each grade. Low-pop 10s are often worth a dramatic premium. High-pop cards in a crowded grade are worth closer to raw.</p>',
        8,
        'Complete beginner''s guide to PSA sports card grading. What it costs, how corners/edges/surface/centering are graded, and how to decide if submitting is worth it.'
      ),

      -- COLLECTING: eBay selling workflow for sports cards
      (
        'ebay-sports-card-selling-workflow',
        'My eBay Sports Card Selling Workflow: How I Move Cards Without Losing My Mind',
        'collecting',
        'Selling cards on eBay doesn''t have to be chaotic. Here''s the system I use to list, ship, and track everything without it taking over my evenings.',
        '<p>eBay is the best venue for selling sports cards. It''s also a chaos machine if you don''t have a system. Here''s the workflow I''ve refined over hundreds of sales — from deciding what to list to getting feedback.</p>

<h2>Step 1: Batching, not one-offs</h2>

<p>Don''t list one card at a time. Pick a day each week — Sunday evenings work well for ending on Tuesday/Wednesday, which historically performs better than weekends for cards. Batch your listings: photograph 15–20 cards, then list them all at once. Once you get the rhythm, 20 cards takes about 90 minutes.</p>

<h2>Step 2: Photography that actually sells</h2>

<p>You need: a lightbox or bright indirect daylight, a black velvet background, and a phone with a decent camera. Photograph card front, card back, and a close-up of any notable flaw. Buyers will ask about condition anyway — show them proactively and you cut questions in half.</p>

<p>For slabs, photograph the label clearly. Grade, cert number, and both sides of the card through the case.</p>

<h2>Step 3: Pricing — don''t guess</h2>

<p>Search eBay completed listings (not active — completed) filtered to "Sold." Look at the last 10–15 sales of the same card in the same condition. Raw cards have their own market, graded cards have theirs. Don''t list at what you paid — list at what the market will pay today.</p>

<p>For cards that haven''t sold recently (low volume), check COMC and Check Out My Cards for reference pricing. If there''s no data, you''re pricing in the dark — start slightly high and drop.</p>

<h2>Step 4: Listing best practices</h2>

<p>Title format: <em>Player Name Year Brand Set Card# /Print Run — Condition</em>. Pack your title with searchable terms because that''s how buyers find you. Include player name, year, card company, set name, card number, and any relevant attribute (rookie, refractor, auto, /25).</p>

<p>Use auction for hot, recent, or rare cards. Buy It Now for slower-moving inventory. eBay''s "Best Offer" is worth enabling — motivated buyers often just want to transact quickly.</p>

<h2>Step 5: Shipping that protects and doesn''t overprice</h2>

<p>Standard card shipping: penny sleeve → top loader → team bag → sandwich it between two pieces of cardboard → bubble mailer. Total materials cost: ~$0.50. Use First Class Package for anything under 13 oz (most single cards) — it''s usually $4–$5 and trackable. Never ship loose cards in an envelope.</p>

<p>For slabs: the PSA case provides protection, but still wrap in bubble wrap inside a padded box. One drop on concrete equals a cracked case equals a ruined grade.</p>

<h2>Step 6: Tracking and bookkeeping</h2>

<p>Spreadsheet with: card name, what you paid, sale price, eBay fees (roughly 12–13%), shipping cost, net profit. Look at it every month. You''ll immediately spot which category of cards is profitable for you and which you should stop chasing.</p>',
        9,
        'The complete eBay sports card selling workflow. Batch your listings, photograph properly, price from sold comps, ship safely, and track your profits. A real system, not theory.'
      ),

      -- COLLECTING: Building a PC — long-term collection strategy
      (
        'building-a-pc-sports-cards-long-term-collection-strategy',
        'Building a PC: The Long-Term Sports Card Collection Strategy That Actually Builds Value',
        'collecting',
        'A PC (personal collection) isn''t just cards you like — it''s a deliberate strategy. Here''s how to build one that holds value and stays meaningful.',
        '<p>In the hobby, a PC (personal collection) means the cards you''re keeping, not flipping. But "cards I like" isn''t a strategy — it''s how you end up with a bloated binder and a vague sense of money spent.</p>

<h2>Define your player or theme first</h2>

<p>The strongest PCs are focused. Pick one player, one team, or one concept (e.g., "all refractors of this prospect," "every printing plate ever made of this set"). Focus creates boundaries, which keeps you from buying everything and regretting half of it.</p>

<p>Player PCs work best around someone at the beginning of their career with upside, or a legend whose cards have established historical value. Buying into a hot player at peak hype is expensive. Buying into an underrated player before the breakout is where real gains happen.</p>

<h2>Tier your targets</h2>

<p>Not every card of your player is worth owning. Set tiers:</p>

<p><strong>Tier 1 — Must haves:</strong> RC (rookie card), first autograph, low-numbered parallels (/25 or less), 1/1s if attainable. These are the anchor pieces that define the PC.</p>

<p><strong>Tier 2 — Nice to own:</strong> Refractors, base parallels, team-set cards, insert sets. Buy these when prices are right, not at peak.</p>

<p><strong>Tier 3 — Complete the collection:</strong> Base cards, sticker autos, high-numbered parallels. Low priority, buy cheap or skip.</p>

<h2>Track population reports</h2>

<p>For graded cards, PSA''s population report tells you how many copies of each card have been graded at each grade. A PSA 10 with a pop of 3 is worth dramatically more than one with a pop of 500. Low-pop 10s in your player''s PC are the pieces that appreciate most over time.</p>

<h2>Storage that protects the value</h2>

<p>Raw cards: penny sleeves → semi-rigid holders for important cards, regular top loaders for others. Never store in binders with soft sleeves long-term — the card shifts and corners get damaged. For your best pieces: one-touch magnetic holders.</p>

<p>Graded cards: UV-blocking display cases or cardboard storage boxes. Keep away from direct sunlight and humidity fluctuations. Fade and case yellowing reduce resale value.</p>

<h2>When to sell from your PC</h2>

<p>A PC should have an exit thesis for each card: "I''m keeping this unless it hits $X" or "I''ll sell if he gets traded" or "I''m keeping this forever." Without an exit thesis, you''ll either sell too early or hold through a collapse.</p>',
        7,
        'How to build a sports card PC (personal collection) that holds value. Focus on one player, tier your targets, track pop reports, and define your exit thesis before buying.'
      ),

      -- DRUMS: Building a practice routine that sticks
      (
        'drum-practice-routine-that-actually-sticks',
        'Building a Drum Practice Routine That Actually Sticks (Not Just for a Week)',
        'drums',
        'Most drum practice routines die in two weeks. Here''s the system for building one that you''re still doing six months from now.',
        '<p>You''ve built a practice routine before. You did it for a week, maybe two. Then something happened — a busy week, a gig, a bad mood — and you stopped. A month later you realize you haven''t practiced in weeks.</p>

<p>This isn''t a discipline problem. It''s a design problem. Here''s how to fix it.</p>

<h2>The minimum viable session</h2>

<p>The biggest killer of consistency is the "I only have 15 minutes so it''s not worth it" trap. Wrong. Fifteen minutes of focused practice beats zero minutes every single time. The session length you should optimize for is the one you can actually do on a hard day.</p>

<p>For most drummers, that''s 20–30 minutes. Set that as your floor, not your target. On good days you''ll go longer. On hard days you hit the floor and leave feeling accomplished instead of defeated.</p>

<h2>Fix the structure, vary the content</h2>

<p>Your routine should have a fixed structure that you don''t have to think about. The content within each block rotates. Structure:</p>

<p><strong>Block 1 (5–8 min): Warm-up.</strong> Same sequence every session. Single stroke roll at 60 BPM, hands only. Double stroke roll. Paradiddle. This isn''t sexy but it prepares your muscles and gets your mind focused on the instrument.</p>

<p><strong>Block 2 (15–20 min): Focused work.</strong> One skill you''re actively developing. Not "drumming generally." One specific thing: double bass at 120 BPM, reading a new piece of notation, ghost note dynamics, hi-hat foot independence. Write this down in advance so you don''t have to decide at the kit.</p>

<p><strong>Block 3 (5–10 min): Play.</strong> Improvise, jam along to something you love, explore. No goals. This is the fun block that keeps you coming back.</p>

<h2>The practice log: how to make progress visible</h2>

<p>Keeping a simple log does two things: makes invisible progress visible (which is motivating), and reveals the patterns in where you get stuck (which is diagnostic). You don''t need anything fancy — a notes app works fine. Date, what you worked on, where you struggled, BPM if relevant.</p>

<p>After 30 days, read it back. You''ll be surprised at how much has shifted.</p>

<h2>Protecting the habit</h2>

<p>Habit research is consistent: the environment matters more than the intention. If your kit is set up in a place where you have to move things to play, you''ll play less. If it''s ready to go, you''ll play more. Optimize for friction removal: sticks on the snare, metronome already set, practice notes already written.</p>

<p>Missing one day is fine. Missing two in a row is a pattern that needs breaking immediately. The two-day rule: never miss twice in a row. Non-negotiable.</p>',
        7,
        'How to build a drum practice routine that lasts longer than two weeks. Minimum viable session, fixed structure, rotating content, and the two-day rule for staying consistent.'
      ),

      -- DRUMS: Hidden gem drum gear under $50
      (
        'hidden-gem-drum-gear-under-50',
        'Hidden Gem Drum Gear Under $50 That Serious Drummers Actually Use',
        'drums',
        'Not everything worth owning costs $200. Here are five pieces of drum gear under $50 that make a real difference in how you sound and practice.',
        '<p>The drum gear world is full of expensive rabbit holes. New snares, upgraded hi-hats, better cymbals — it adds up fast. But some of the most impactful upgrades cost less than a nice dinner. Here''s what''s actually worth buying.</p>

<h2>1. Evans EQ Pad — $12</h2>

<p>A small foam pad that sits inside your bass drum. It muffles the overtones that make an unprocessed bass drum sound washy and undefined. The result: a tighter, punchier sound without EQ. Drummers who record will hear the difference immediately. Drummers who don''t record will feel it — a cleaner, more controlled sound under your foot. It''s $12 and takes five minutes to install.</p>

<h2>2. A quality practice pad — $25–$40</h2>

<p>Most of the cheap practice pads feel nothing like a real head. The Evans RF6G Real Feel practice pad has a gum rubber surface that replicates the bounce of a real snare head more accurately than foam. If you''re doing rudiment work off the kit, the surface you practice on matters. This is a $35 upgrade that changes how your hands feel at the real kit.</p>

<h2>3. Moongel — $8</h2>

<p>Translucent gel squares that dampen overtones on any drum or cymbal. The difference between a snare with a controlled ring and one that sounds like it''s in a cave is often a piece of Moongel in the right spot. Completely removable, reusable, and cheap enough that you can experiment liberally. Every serious drummer has a pack.</p>

<h2>4. A dedicated metronome (not your phone) — $20–$30</h2>

<p>Practicing with your phone out is practicing with a distraction machine out. A small dedicated metronome — the Korg TM60 is a reliable one — keeps you focused and on beat without the pull of notifications. This sounds like a small thing. It isn''t. The number of practice sessions derailed by a text message is embarrassingly high.</p>

<h2>5. Vater Vintage Bomber sticks — $14</h2>

<p>Stick choice matters more than most drummers admit. The VB5B (5B profile, shorter taper) gives you more control for intricate work and a heavier feel that''s useful for building hand strength. If you''ve been playing whatever sticks came with your kit, trying a quality stick is like switching from store-brand to fresh-ground coffee — immediately obvious.</p>

<p>Total cost for all five: under $90. Impact on your sound and practice: significant.</p>',
        6,
        'The best drum gear under $50 that actually matters. Evans EQ pad, Real Feel practice pad, Moongel, dedicated metronome, and the right sticks. Hidden gems for serious drummers.'
      ),

      -- SIDE HUSTLES: Turning your collection into a side hustle
      (
        'turning-your-collection-into-a-side-hustle',
        'Turning Your Card Collection Into a Side Hustle: The Honest Playbook',
        'side-hustles',
        'Flipping cards sounds easy. It''s not — but it is learnable. Here''s the honest framework for turning a collection habit into actual income.',
        '<p>The sports card flip is the fantasy: buy low, sell high, repeat. The reality is messier but also more sustainable than most people think. Here''s how to approach it like a business instead of a hobby with aspirations.</p>

<h2>Know the difference: collector vs. dealer mindset</h2>

<p>Collectors buy cards they want to own. Dealers buy cards the market wants. These aren''t mutually exclusive, but you need to know which mode you''re in at any given time. Buying cards you love with dealer math is how you end up with an expensive collection you can''t liquidate. Buying cards purely as inventory is how you end up bored.</p>

<p>The sustainable model: run a small dealer operation in niches you''re passionate about. You know the market intuitively, you don''t get burned by trends you didn''t see coming, and you enjoy the work.</p>

<h2>The arbitrage opportunity: raw to graded</h2>

<p>The consistent money in cards right now is in the grade spread: the difference between what a card sells for raw and what it sells for in a PSA slab. For high-demand cards with clean surfaces and good centering, submitting to PSA and selling the graded version generates real margin.</p>

<p>The skill: evaluating raw cards accurately. If you can look at a card and reliably predict what it will grade, you can buy raw at raw prices and sell graded at graded prices. This is learnable — it just takes reps.</p>

<h2>Sourcing: where to actually buy cheap</h2>

<p>Retail store pulls (packs) are expected value negative. Experienced flippers source elsewhere:</p>

<p><strong>Local card shows:</strong> Dealers move volume at shows and often price below eBay market. Know your comps before you go.</p>

<p><strong>Facebook Marketplace and local groups:</strong> People selling their childhood collections don''t know what they have. This is where significant value is found.</p>

<p><strong>eBay lots:</strong> Bulk lots priced by the seller who just wants it gone. Sort through them, keep what''s worth keeping, resell the rest.</p>

<p><strong>Estate sales:</strong> The original treasure hunt. Inconsistent but occasionally extraordinary.</p>

<h2>The math you have to run</h2>

<p>For every potential flip: (expected sale price) - (eBay fees, ~13%) - (shipping, ~$4) - (your cost) - (grading fees if applicable) = net profit. Run this before every purchase. Not after. When you''re excited about a card is when the math gets sloppy.</p>

<h2>Reinvest or exit</h2>

<p>Most successful card dealers started with $200–$500 in seed capital and reinvested profits for the first year before taking anything out. Compounding your inventory bankroll is how you scale. Taking money out too early keeps you stuck at the same transaction size indefinitely.</p>',
        8,
        'How to turn your sports card collection into a real side hustle. The raw-to-graded arbitrage, where to source cheap cards, running the math before every flip, and building scale.'
      ),

      -- ROUTINES: The Morning Vault — systems-based morning routine
      (
        'morning-vault-systems-based-morning-routine',
        'The Morning Vault: A Systems-Based Morning Routine for Creators and Collectors',
        'routines',
        'Not a 5AM manifesto. A flexible, honest morning system built around protecting your creative work and shipping output before the day interrupts you.',
        '<p>The morning routine industrial complex wants you to believe that waking at 5AM, journaling for 20 minutes, and meditating for 10 will transform your life. Maybe. But the actual goal is simpler: use your highest-energy hours for your most important work. Everything else is scaffolding.</p>

<h2>Identify your protected block</h2>

<p>Before building a routine, identify the 90-minute window in your day when you''re most alert and least interrupted. For some people this is 6–7:30AM before the world wakes up. For others it''s 9–10:30AM after coffee kicks in. For night owls, it might be 10PM–midnight.</p>

<p>Whatever that window is: it belongs to your primary work. Not email. Not Slack. Not the news. Your most important output.</p>

<h2>The three-block structure</h2>

<p><strong>Block 1 — Prep (15–20 min):</strong> The physical ritual that transitions your brain from sleep/passive mode to work mode. Could be coffee and reading, a short walk, or reviewing your top priority for the day. The content matters less than the consistency. Same sequence, same signal to your brain: work time.</p>

<p><strong>Block 2 — Protected work (60–90 min):</strong> Phone in another room. Notifications off. One tab open. If you''re a collector working on listings, you''re listing. If you''re a creator writing, you''re writing. If you''re a drummer, you''re at the kit. No multitasking.</p>

<p><strong>Block 3 — Admin (30 min):</strong> Email, messages, logistics. This is where you respond, process, and catch up. Front-loading admin kills the protected block — it drains the cognitive bandwidth you need for real work.</p>

<h2>Protecting the routine from real life</h2>

<p>The routine will break. The question is whether it breaks for a day or breaks forever. The rule: if you miss a morning, you don''t try to "make it up" or feel guilty. You just do the routine the next morning. No debt, no catch-up session, no extended punishing session to compensate. Just: back on track tomorrow.</p>

<h2>What goes in the vault</h2>

<p>The "vault" framing is useful: the morning is where you deposit your best work before the world makes withdrawals. A day full of meetings and messages and other people''s priorities feels less draining when you started with two hours of your own output already in the bank.</p>',
        7,
        'A systems-based morning routine for collectors and creators. Protect your 90-minute creative block, structure it as three clear phases, and recover fast when life breaks the habit.'
      ),

      -- HIDDEN GEMS: 5 underrated cards worth watching
      (
        '5-underrated-sports-cards-worth-watching-now',
        '5 Underrated Sports Cards Worth Watching Right Now',
        'hidden-gems',
        'Not the obvious rookies everyone''s chasing. These are the cards flying under the radar with real upside — and the thesis behind each one.',
        '<p>The obvious cards are expensive. Everybody knows about them. The interesting plays are the ones the market hasn''t priced correctly yet — either undervalued veterans, emerging prospects before the breakout, or historically significant cards the current generation of collectors has forgotten.</p>

<p>This isn''t financial advice. It''s a collector''s read on five cards worth paying attention to.</p>

<h2>1. Vintage base cards of second-tier stars from the junk wax era</h2>

<p>The 1980s and early 1990s overproduction era left mountains of base cards that collectors dismissed as worthless for decades. But there''s a growing market for high-grade junk wax — not because the cards are rare (they''re not), but because finding them in PSA 10 condition is genuinely difficult. Print lines, rough handling, and poor storage mean that even common cards in Gem Mint are legitimately scarce. The PSA 10 premium on a card with a 400-card print run can be dramatic. This is a patient collector''s play.</p>

<h2>2. Refractor parallels of current prospects before the call-up</h2>

<p>The pattern repeats: a prospect''s cards are cheap while he''s in the minors, spike hard at the call-up, correct after the initial excitement, then either sustain or collapse based on performance. The window to buy is 6–12 months before the call-up, if you''ve done your scouting. Refractor parallels offer more upside than base on a per-card basis and are more liquid than high-numbered limited cards.</p>

<h2>3. Pre-war cards of Hall of Famers you''ve never heard of</h2>

<p>Early 20th century cards of players outside the Babe Ruth / Ty Cobb tier are systematically underpriced relative to their historical significance. A 1910 T206 card of a solid Hall of Famer — not a marquee name — in VG condition often sells for under $200. For a 115-year-old piece of cardboard with genuine historical weight, that''s remarkable. The collector base for pre-war is aging but dedicated, and the supply of quality specimens only decreases.</p>

<h2>4. International printing variants and regional issues</h2>

<p>Many American cards had Canadian, Latin American, or European versions printed simultaneously with different branding, backs, or designs. Collectors who focus on domestic issues often ignore these entirely. Regional variants in high grade have low population counts almost by definition — fewer were produced and fewer were preserved. If you''re building a comprehensive PC, these are the pieces nobody else is competing for.</p>

<h2>5. Error cards from modern sets</h2>

<p>Printing errors, wrong backs, misspelled names — modern sets produce errors regularly, and they''re only recognized as valuable after the fact. Following collectors on social media who track print quality closely often surfaces these early. The risk is that corrections get issued and the error loses significance; the upside is on cards where the error was never corrected and the population stays permanently low.</p>',
        7,
        '5 underrated sports cards worth watching — junk wax PSA 10s, pre-call-up refractors, pre-war Hall of Famers, regional variants, and modern error cards. The collector plays most people miss.'
      )
      ON CONFLICT (slug) DO NOTHING
    `);
  },
};
