module.exports = {
  name: 'splice_cabinet_into_storage_hub',
  up: async (client) => {

    // ── UPDATE: Forward-link splice in storage hub's environment section ─────
    // Splices a paragraph at the tail of the "Environment: humidity, light,
    // and temperature" section in
    // sports-card-storage-and-display-protection-stack (1783830000000) that
    // links out to the new climate-cabinet guide
    // (climate-controlled-sports-card-cabinet-guide). The reciprocal back-link
    // from the cabinet guide's vault-next-read block is already wired in
    // 1785400000000_climate_controlled_cabinet_guide.js:184-187 — this
    // migration closes the round trip. Reuses the existing /r/dehumidifier
    // (registered by 1784700000000_basement_hot_climate_card_storage.js:9)
    // and /r/silica-gel (registered by
    // 1783830000000_card_storage_display_protection_stack.js:9) affiliate
    // slugs as in-content anchors; no new affiliate slugs minted. Idempotency
    // guard mirrors 1784700000000_basement_hot_climate_card_storage.js:175,
    // 1785000000000_splice_uv_frames_into_storage_article.js:19-20, and
    // 1785400000000_climate_controlled_cabinet_guide.js:221-223.
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<p><strong>Light: no direct sun.</strong> UV is the silent degrader. A card on a sunlit shelf for six months will show measurable fade; the same card in a shaded room for six years will not. Indirect daylight through a north-facing window is fine for short-term display. Direct sunlight on any card for any length of time is a downgrade event you can avoid.</p>',
        '<p><strong>Light: no direct sun.</strong> UV is the silent degrader. A card on a sunlit shelf for six months will show measurable fade; the same card in a shaded room for six years will not. Indirect daylight through a north-facing window is fine for short-term display. Direct sunlight on any card for any length of time is a downgrade event you can avoid.</p>

<p>For collectors whose PC outgrows the closet-shelf setup &mdash; a few hundred slabs and up, a room-level <a href="/r/dehumidifier" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>room dehumidifier</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> plus a <a href="/r/silica-gel" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>silica gel buffer</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> in every box becomes too many moving parts across the collection &mdash; the convergent upgrade is a sealed, climate-controlled display cabinet that collapses the dehumidifier, the silica gel buffer, and the display case into one piece of dedicated furniture. The <a href="/blog/climate-controlled-sports-card-cabinet-guide">climate-controlled sports card cabinet guide</a> walks through active vs. passive dehumidification, the three capacity tiers (shelf / mid-size / walk-in), and the brand lines that slot into each.</p>'
      )
      WHERE slug = 'sports-card-storage-and-display-protection-stack'
      AND body NOT LIKE '%climate-controlled-sports-card-cabinet-guide%'
    `);

  },
};
