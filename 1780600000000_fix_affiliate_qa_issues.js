/**
 * Migration: Fix affiliate QA issues — two content fixes.
 *
 * Issue 1 (CRITICAL): UV lamp affiliate link removed from drum warm-up article.
 *   The UV lamp (a card-grading product) was incorrectly injected into Routine 5
 *   of the drums article at "clean sound" — contextually nonsensical in a drumming post.
 *   Migration 1749484800000 line 313-319 is the culprit. Undo the body injection.
 *
 * Issue 2 (HIGH): rel="nofollow" upgraded to rel="nofollow sponsored" on grading service links.
 *   FTC requires "sponsored" on all affiliate links including non-Amazon service links.
 *   Migration 1747700000000 lines 128-154 missed "sponsored" on psa/bgs/sgc/cgc.
 *   Also fixes the comparison table links and the bottom CTA block in the grading post.
 *
 * Does NOT own: schema changes, affiliate_links table.
 */
module.exports = {
  name: '1780600000000_fix_affiliate_qa_issues',

  up: async (client) => {

    // ── Issue 1: Remove UV lamp link from drum warm-up article ─────────────────
    // The body currently reads:
    //   "Focus on: <a href="/r/uv-lamp" ...>UV lamp ...</a> for card condition checks, clean sound ..."
    // Restore to:
    //   "Focus on: clean sound ..."
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<a href="/r/uv-lamp" class="affiliate-link" rel="nofollow sponsored" target="_blank">UV lamp <span class="affiliate-cta">Check Price &rarr;</span></a> for card condition checks, clean sound',
        'clean sound'
      ) WHERE slug = '5-drummer-warm-up-routines-session-musicians';
    `);

    // ── Issue 2: Add "sponsored" to grading service links in grading comparison post ─

    // PSA inline heading link
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<a href="/r/psa" class="affiliate-link affiliate-link--inline" rel="nofollow" target="_blank">',
        '<a href="/r/psa" class="affiliate-link affiliate-link--inline" rel="nofollow sponsored" target="_blank">'
      ) WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc';
    `);

    // BGS inline heading link
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<a href="/r/bgs" class="affiliate-link affiliate-link--inline" rel="nofollow" target="_blank">',
        '<a href="/r/bgs" class="affiliate-link affiliate-link--inline" rel="nofollow sponsored" target="_blank">'
      ) WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc';
    `);

    // SGC inline heading link
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<a href="/r/sgc" class="affiliate-link affiliate-link--inline" rel="nofollow" target="_blank">',
        '<a href="/r/sgc" class="affiliate-link affiliate-link--inline" rel="nofollow sponsored" target="_blank">'
      ) WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc';
    `);

    // CGC inline heading link
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<a href="/r/cgc" class="affiliate-link affiliate-link--inline" rel="nofollow" target="_blank">',
        '<a href="/r/cgc" class="affiliate-link affiliate-link--inline" rel="nofollow sponsored" target="_blank">'
      ) WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc';
    `);

    // PSA in comparison table
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<a href="/r/psa" class="affiliate-table-link" data-link-type="affiliate">PSA Grading →</a>',
        '<a href="/r/psa" class="affiliate-table-link" data-link-type="affiliate" rel="nofollow sponsored">PSA Grading →</a>'
      ) WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc';
    `);

    // BGS in comparison table
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<a href="/r/bgs" class="affiliate-table-link" data-link-type="affiliate">BGS Grading →</a>',
        '<a href="/r/bgs" class="affiliate-table-link" data-link-type="affiliate" rel="nofollow sponsored">BGS Grading →</a>'
      ) WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc';
    `);

    // SGC in comparison table
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<a href="/r/sgc" class="affiliate-table-link" data-link-type="affiliate">SGC Grading →</a>',
        '<a href="/r/sgc" class="affiliate-table-link" data-link-type="affiliate" rel="nofollow sponsored">SGC Grading →</a>'
      ) WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc';
    `);

    // CGC in comparison table
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<a href="/r/cgc" class="affiliate-table-link" data-link-type="affiliate">CGC Grading →</a>',
        '<a href="/r/cgc" class="affiliate-table-link" data-link-type="affiliate" rel="nofollow sponsored">CGC Grading →</a>'
      ) WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc';
    `);

    // Bottom CTA block — "Submit to PSA" link (data-link-type="affiliate" class btn btn-primary)
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<a href="/r/psa" class="btn btn-primary" data-link-type="affiliate">Submit to PSA →</a>',
        '<a href="/r/psa" class="btn btn-primary" data-link-type="affiliate" rel="nofollow sponsored">Submit to PSA →</a>'
      ) WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc';
    `);

  },

  down: async (client) => {

    // ── Revert Issue 1: Restore UV lamp link to drums article ─────────────────
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        'clean sound',
        '<a href="/r/uv-lamp" class="affiliate-link" rel="nofollow sponsored" target="_blank">UV lamp <span class="affiliate-cta">Check Price &rarr;</span></a> for card condition checks, clean sound'
      ) WHERE slug = '5-drummer-warm-up-routines-session-musicians';
    `);

    // ── Revert Issue 2: Strip "sponsored" from grading service links ───────────

    // Inline heading links
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<a href="/r/psa" class="affiliate-link affiliate-link--inline" rel="nofollow sponsored" target="_blank">',
        '<a href="/r/psa" class="affiliate-link affiliate-link--inline" rel="nofollow" target="_blank">'
      ) WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc';
    `);
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<a href="/r/bgs" class="affiliate-link affiliate-link--inline" rel="nofollow sponsored" target="_blank">',
        '<a href="/r/bgs" class="affiliate-link affiliate-link--inline" rel="nofollow" target="_blank">'
      ) WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc';
    `);
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<a href="/r/sgc" class="affiliate-link affiliate-link--inline" rel="nofollow sponsored" target="_blank">',
        '<a href="/r/sgc" class="affiliate-link affiliate-link--inline" rel="nofollow" target="_blank">'
      ) WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc';
    `);
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<a href="/r/cgc" class="affiliate-link affiliate-link--inline" rel="nofollow sponsored" target="_blank">',
        '<a href="/r/cgc" class="affiliate-link affiliate-link--inline" rel="nofollow" target="_blank">'
      ) WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc';
    `);

    // Table links
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<a href="/r/psa" class="affiliate-table-link" data-link-type="affiliate" rel="nofollow sponsored">PSA Grading →</a>',
        '<a href="/r/psa" class="affiliate-table-link" data-link-type="affiliate">PSA Grading →</a>'
      ) WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc';
    `);
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<a href="/r/bgs" class="affiliate-table-link" data-link-type="affiliate" rel="nofollow sponsored">BGS Grading →</a>',
        '<a href="/r/bgs" class="affiliate-table-link" data-link-type="affiliate">BGS Grading →</a>'
      ) WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc';
    `);
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<a href="/r/sgc" class="affiliate-table-link" data-link-type="affiliate" rel="nofollow sponsored">SGC Grading →</a>',
        '<a href="/r/sgc" class="affiliate-table-link" data-link-type="affiliate">SGC Grading →</a>'
      ) WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc';
    `);
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<a href="/r/cgc" class="affiliate-table-link" data-link-type="affiliate" rel="nofollow sponsored">CGC Grading →</a>',
        '<a href="/r/cgc" class="affiliate-table-link" data-link-type="affiliate">CGC Grading →</a>'
      ) WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc';
    `);

    // Bottom CTA
    await client.query(`
      UPDATE blog_posts SET body = replace(body,
        '<a href="/r/psa" class="btn btn-primary" data-link-type="affiliate" rel="nofollow sponsored">Submit to PSA →</a>',
        '<a href="/r/psa" class="btn btn-primary" data-link-type="affiliate">Submit to PSA →</a>'
      ) WHERE slug = 'grading-service-comparison-psa-bgs-sgc-cgc';
    `);

  },
};