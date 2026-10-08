module.exports = {
  name: 'splice_uv_frames_into_storage_article',
  up: async (client) => {

    // ── UPDATE: Splice uv-frames anchor into storage article's "Display without damage" section
    // The uv-frames row in affiliate_links was registered by 1784400000000_raw_card_vs_graded_slab.js
    // and is referenced in that article. This splice places the same anchor inside the protection
    // stack article — after the existing "Framed displays" paragraph — so the wall-mounted UV frame
    // option sits alongside the existing multi-card frame guidance. Idempotency guard matches the
    // pattern in 1784200000000_collecting_cluster_cross_links.js and 1784400000000_raw_card_vs_graded_slab.js.
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<p><strong>Framed displays.</strong> For multi-card displays (a row of PC keepers, a graded rainbow, a set page), use a shadow box frame with UV-filtering glass or acrylic. Spacing between cards matters — cards mounted face-to-face with a clear spacer, or card-to-card with no spacer, will abrade each other over time. Each card in its own one-touch or sleeve, then mounted in the frame, is the right structure.</p>',
        '<p><strong>Framed displays.</strong> For multi-card displays (a row of PC keepers, a graded rainbow, a set page), use a shadow box frame with UV-filtering glass or acrylic. Spacing between cards matters &mdash; cards mounted face-to-face with a clear spacer, or card-to-card with no spacer, will abrade each other over time. Each card in its own one-touch or sleeve, then mounted in the frame, is the right structure.</p>

<p>For a single centerpiece slab &mdash; a PSA 10 rookie, a low-numbered patch auto, or any graded piece that anchors the wall &mdash; wall-mount it in a <a href="/r/uv-frames" class="affiliate-link" rel="nofollow sponsored" target="_blank"><strong>UV-filtering wall-mounted card frame</strong> <span class="affiliate-cta">Check Price &rarr;</span></a> sized to the slab. Wall-mounted frames keep the holder oriented and shadow-boxed the way a museum mount would, block direct sun on the case label, and let the grade read clearly at a distance &mdash; the right structure when the display piece is the centerpiece rather than part of a rainbow row.</p>'
      )
      WHERE slug = 'sports-card-storage-and-display-protection-stack'
      AND body NOT LIKE '%href="/r/uv-frames"%';
    `);

  },
};
