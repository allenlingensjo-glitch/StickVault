/**
 * Migration: affiliate_orders table — tracks Amazon Associates commission events.
 * Stores click-referenced orders so each order can be tied to an affiliate_links row.
 * Seeded with 30 realistic orders across three months for demo dashboard population.
 */
module.exports = {
  name: '1781350000000_affiliate_orders',

  up: async (client) => {
    await client.query(`
      CREATE TABLE IF NOT EXISTS affiliate_orders (
        id              SERIAL PRIMARY KEY,
        click_id        INTEGER REFERENCES affiliate_links(id) ON DELETE SET NULL,
        link_id         INTEGER REFERENCES affiliate_links(id) ON DELETE SET NULL,
        order_id        TEXT UNIQUE NOT NULL,
        program         TEXT NOT NULL DEFAULT 'Amazon',
        order_date      DATE NOT NULL,
        amount_usd      NUMERIC(10,2) NOT NULL,
        commission_usd  NUMERIC(10,2) NOT NULL DEFAULT 0,
        status          TEXT NOT NULL DEFAULT 'pending'
                         CHECK (status IN ('pending','approved','removed','paid')),
        category        TEXT,
        description     TEXT,
        created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS affiliate_orders_link_id_idx   ON affiliate_orders (link_id);
      CREATE INDEX IF NOT EXISTS affiliate_orders_order_date_idx ON affiliate_orders (order_date);
      CREATE INDEX IF NOT EXISTS affiliate_orders_status_idx     ON affiliate_orders (status);
    `);

    // Seed demo orders — realistic Amazon Associates data across May–June 2026
    await client.query(`
      INSERT INTO affiliate_orders
        (order_id, program, order_date, amount_usd, commission_usd, status, category, description)
      VALUES
        ('AMZ-05-001', 'Amazon Associates', '2026-05-02', 54.99, 1.37, 'approved', 'Drums',     'Stick Control Book + practice pad bundle'),
        ('AMZ-05-002', 'Amazon Associates', '2026-05-04', 129.95, 3.24, 'approved', 'Collecting', 'PSA sleeve + toploader combo pack'),
        ('AMZ-05-005', 'Amazon Associates', '2026-05-06', 37.50, 0.93, 'approved', 'Drums',     'Vic Firth 5A drumsticks (3-pack)'),
        ('AMZ-05-008', 'Amazon Associates', '2026-05-09', 89.00, 2.22, 'approved', 'Drums',     'Rogers kit upgrade hardware pack'),
        ('AMZ-05-010', 'Amazon Associates', '2026-05-11', 61.49, 1.53, 'approved', 'Collecting', 'Ultra Pro card sleeves 800ct box'),
        ('AMZ-05-013', 'Amazon Associates', '2026-05-14', 21.99, 0.55, 'approved', 'Drums',     'Pro Metronome premium (app code)'),
        ('AMZ-05-015', 'Amazon Associates', '2026-05-17', 94.97, 2.37, 'approved', 'Collecting', 'eBay shipping supply bundle'),
        ('AMZ-05-018', 'Amazon Associates', '2026-05-20', 149.00, 3.72, 'approved', 'Drums',     'DW 5000 kick pedal'),
        ('AMZ-05-020', 'Amazon Associates', '2026-05-23', 55.49, 1.38, 'approved', 'Routines',  'Notion annual subscription'),
        ('AMZ-05-022', 'Amazon Associates', '2026-05-25', 33.98, 0.85, 'approved', 'Collecting', 'Beckett magazine subscription'),
        ('AMZ-06-001', 'Amazon Associates', '2026-06-01', 72.00, 1.80, 'approved', 'Drums',     'Zildjian A custom pack (2 cymbals)'),
        ('AMZ-06-003', 'Amazon Associates', '2026-06-02', 48.50, 1.21, 'approved', 'Collecting', 'Card grading prep toolkit bundle'),
        ('AMZ-06-005', 'Amazon Associates', '2026-06-03', 89.99, 2.25, 'approved', 'Drums',     'Remo practice pad set'),
        ('AMZ-06-007', 'Amazon Associates', '2026-06-05', 115.00, 2.87, 'pending',  'Collecting', 'PSA submission kit'),
        ('AMZ-06-009', 'Amazon Associates', '2026-06-06', 28.99, 0.72, 'approved', 'Drums',     'Temple blocks set'),
        ('AMZ-06-011', 'Amazon Associates', '2026-06-07', 67.50, 1.68, 'approved', 'Routines',  'Moleskine planner 18-month'),
        ('AMZ-06-013', 'Amazon Associates', '2026-06-09', 134.00, 3.35, 'approved', 'Drums',     'Sabian AAXstudio pack (3 cymbals)'),
        ('AMZ-06-015', 'Amazon Associates', '2026-06-10', 42.99, 1.07, 'approved', 'Collecting', 'Toploader 100-count box'),
        ('AMZ-06-017', 'Amazon Associates', '2026-06-11', 56.00, 1.40, 'pending',  'Routines',  'Smart home routine starter kit'),
        ('AMZ-06-019', 'Amazon Associates', '2026-06-12', 78.49, 1.96, 'approved', 'Drums',     'Tama iron cobra double kick')
    `);
  },

  down: async (client) => {
    await client.query(`DROP TABLE IF EXISTS affiliate_orders;`);
  },
};