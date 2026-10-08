/**
 * Migration: affiliate_links table + seed with StickVault initial links.
 * Stores branded redirect slugs, click tracking, and FTC compliance metadata.
 */
module.exports = {
  name: '1747450000000_affiliate_links',

  up: async (client) => {
    await client.query(`
      CREATE TABLE IF NOT EXISTS affiliate_links (
        id              SERIAL PRIMARY KEY,
        slug            TEXT UNIQUE NOT NULL,
        label           TEXT NOT NULL,
        program         TEXT NOT NULL DEFAULT 'Manual',
        target_url      TEXT NOT NULL,
        commission_rate TEXT NOT NULL DEFAULT 'negotiated',
        link_type       TEXT NOT NULL DEFAULT 'affiliate' CHECK (link_type IN ('affiliate', 'partner', 'recommended', 'internal')),
        pillar          TEXT,
        is_active       BOOLEAN NOT NULL DEFAULT true,
        click_count     INTEGER NOT NULL DEFAULT 0,
        last_clicked_at TIMESTAMP,
        last_checked_at TIMESTAMP,
        last_status     INTEGER,
        created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS affiliate_links_slug_idx   ON affiliate_links (slug);
      CREATE INDEX IF NOT EXISTS affiliate_links_pillar_idx ON affiliate_links (pillar);
      CREATE INDEX IF NOT EXISTS affiliate_links_active_idx ON affiliate_links (is_active);
    `);

    // Seed initial affiliate links for StickVault
    await client.query(`
      INSERT INTO affiliate_links (slug, label, program, target_url, commission_rate, link_type, pillar) VALUES
        ('drum-blueprint-rb',     'Drummer''s Practice Blueprint — Redbubble',       'Redbubble',  'https://www.redbubble.com/shop/ap/drums',                  '10-15%',    'affiliate',   'Drums'),
        ('stick-control',         'Stick Control Book — Amazon',                      'Amazon',     'https://www.amazon.com/s?k=stick+control+drums',           '3-10%',     'affiliate',   'Drums'),
        ('metronome-app',         'Pro Metronome App',                                'Manual',     'https://apps.apple.com/us/app/pro-metronome/id477960671',  'none',      'recommended', 'Drums'),
        ('collectors-starter-rb', 'Sports Card Collector Starter Guide — Redbubble',  'Redbubble',  'https://www.redbubble.com/shop/ap/collecting',             '10-15%',    'affiliate',   'Collecting'),
        ('ebay-seller',           'eBay Seller Tools',                                'eBay',       'https://www.ebay.com/sh/ovw',                              'negotiated', 'partner',    'Collecting'),
        ('psa-grading',           'PSA Card Grading — Official Site',                 'Manual',     'https://www.psacard.com/services/tradingcardgrading',      'none',      'recommended', 'Collecting'),
        ('beckett-grading',       'Beckett Grading Services',                         'Manual',     'https://www.beckett.com/grading',                          'none',      'recommended', 'Collecting'),
        ('morning-routine-rb',    'Morning Routine Templates — Redbubble',            'Redbubble',  'https://www.redbubble.com/shop/ap/productivity',           '10-15%',    'affiliate',   'Routines'),
        ('notion-template',       'Notion Productivity Templates',                    'Manual',     'https://www.notion.so/templates',                          'none',      'recommended', 'Routines')
      ON CONFLICT (slug) DO NOTHING;
    `);
  },

  down: async (client) => {
    await client.query(`DROP TABLE IF EXISTS affiliate_links;`);
  },
};
