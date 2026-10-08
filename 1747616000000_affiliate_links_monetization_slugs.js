/**
 * Migration: add placeholder affiliate link slugs for monetization blocks.
 * Slugs follow /r/:slug branded redirect pattern. Destinations are temporary
 * placeholders that can be swapped via /admin/links without changing blog content.
 */
module.exports = {
  name: '1747616000000_affiliate_links_monetization_slugs',

  up: async (client) => {
    await client.query(`
      INSERT INTO affiliate_links (slug, label, program, target_url, commission_rate, link_type, pillar) VALUES
        -- Grading services (for grading comparison post)
        ('psa',         'PSA Grading — Official Site',             'Manual',   'https://www.psacard.com/services/tradingcardgrading',   'none',       'recommended', 'Collecting'),
        ('bgs',         'BGS Beckett Grading Services',            'Manual',   'https://www.beckett.com/grading',                       'none',       'recommended', 'Collecting'),
        ('sgc',         'SGC Grading — Official Site',             'Manual',   'https://www.sgccard.com/',                              'none',       'recommended', 'Collecting'),
        ('cgc',         'CGC Cards Grading',                       'Manual',   'https://www.cgccards.com/',                             'none',       'recommended', 'Collecting'),
        -- Collector tools (for affordable tools post)
        ('penny-sleeves',    'BCW Penny Sleeves — Amazon',         'Amazon',   'https://www.amazon.com/s?k=BCW+penny+sleeves+trading+cards',    '3-10%', 'affiliate', 'Collecting'),
        ('top-loaders',      'Ultra Pro Top Loaders — Amazon',     'Amazon',   'https://www.amazon.com/s?k=ultra+pro+top+loaders+cards',        '3-10%', 'affiliate', 'Collecting'),
        ('uv-lamp',          'UV Lamp for Card Inspection — Amazon','Amazon',  'https://www.amazon.com/s?k=uv+lamp+card+inspection',            '3-10%', 'affiliate', 'Collecting'),
        ('one-touch',        'One-Touch Magnetic Card Holders — Amazon','Amazon','https://www.amazon.com/s?k=one+touch+magnetic+card+holder',   '3-10%', 'affiliate', 'Collecting'),
        ('card-boxes',       'BCW Card Storage Boxes — Amazon',    'Amazon',   'https://www.amazon.com/s?k=BCW+card+storage+boxes',             '3-10%', 'affiliate', 'Collecting'),
        -- Hidden gems / marketplaces
        ('ebay',        'eBay — Cards & Collectibles',              'eBay',     'https://www.ebay.com/b/Sports-Trading-Cards/212/bn_1641630',    'negotiated', 'partner', 'Collecting'),
        ('heritage',    'Heritage Auctions',                        'Manual',   'https://www.ha.com/c/sports-cards.zx',                          'none',       'recommended', 'Collecting'),
        ('discogs',     'Discogs Marketplace',                      'Manual',   'https://www.discogs.com/sell/list',                             'none',       'recommended', 'Collecting'),
        -- Drum gear
        ('drum-heads',  'Drum Heads — Amazon',                     'Amazon',   'https://www.amazon.com/s?k=drum+heads+replacement',             '3-10%', 'affiliate', 'Drums'),
        ('drum-sticks', 'Drum Sticks — Amazon',                    'Amazon',   'https://www.amazon.com/s?k=drumsticks',                        '3-10%', 'affiliate', 'Drums'),
        ('drum-practice-pad', 'Drum Practice Pad — Amazon',        'Amazon',   'https://www.amazon.com/s?k=drum+practice+pad',                 '3-10%', 'affiliate', 'Drums')
      ON CONFLICT (slug) DO NOTHING;
    `);
  },

  down: async (client) => {
    await client.query(`
      DELETE FROM affiliate_links WHERE slug IN (
        'psa', 'bgs', 'sgc', 'cgc',
        'penny-sleeves', 'top-loaders', 'uv-lamp', 'one-touch', 'card-boxes',
        'ebay', 'heritage', 'discogs',
        'drum-heads', 'drum-sticks', 'drum-practice-pad'
      );
    `);
  },
};
