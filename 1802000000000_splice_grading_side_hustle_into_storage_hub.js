module.exports = {
  name: 'splice_grading_side_hustle_into_storage_hub',
  up: async (client) => {

    // ── UPDATE: Grading-side-hustle CTA splice into storage hub "Display without damage" section ──
    // Splices a CTA paragraph after the closing-principle paragraph of the
    // "Display without damage" section in
    // sports-card-storage-and-display-protection-stack (1783830000000), linking
    // out to the new ROI pillar post (sports-card-grading-side-hustle-profit-calculator).
    // Positioned after the uv-frames anchor (1785000000000) and the
    // climate-cabinet anchor (1801000000000) already wired into this post.
    // The four posts already back-linked from the pillar
    // (grading-service-comparison, when-to-grade, psa-2026-submission-checklist,
    // grading-fee-turnaround-reference) are not referenced here.
    // Idempotency guard mirrors 1785000000000_splice_uv_frames_into_storage_article.js:19-20.
    await client.query(`
      UPDATE blog_posts
      SET body = REPLACE(body,
        '<p>The principle is the same as storage: every exposure is a downgrade event. Display reverses that, but does not eliminate it. The protection stack applied to display means UV-filtering holder, no direct sun, sensible rotation, and card-to-card spacing.</p>',
        '<p>The principle is the same as storage: every exposure is a downgrade event. Display reverses that, but does not eliminate it. The protection stack applied to display means UV-filtering holder, no direct sun, sensible rotation, and card-to-card spacing.</p>

<p>Got stored cards wondering whether grading as a side hustle is worth it? The <a href="/blog/sports-card-grading-side-hustle-profit-calculator">sports card grading side hustle profit calculator</a> runs the full raw-to-graded ROI &mdash; submission fee, grade probabilities, eBay take, and net profit &mdash; for every card in those boxes.</p>'
      )
      WHERE slug = 'sports-card-storage-and-display-protection-stack'
      AND body NOT LIKE '%sports-card-grading-side-hustle-profit-calculator%'
    `);

  },
};
