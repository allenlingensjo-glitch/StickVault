/**
 * pinterest_pins table — stores AI-generated Pinterest marketing pins.
 * Owns: schema for the 30-pin AI media campaign.
 * Does NOT own: pin generation logic (see routes/pinterest-pins.js).
 */
module.exports = {
  name: 'pinterest_pins',
  up: async (client) => {
    await client.query(`
      CREATE TABLE IF NOT EXISTS pinterest_pins (
        id SERIAL PRIMARY KEY,
        pin_number INTEGER NOT NULL UNIQUE,
        headline TEXT NOT NULL,
        pillar VARCHAR(50) NOT NULL,
        r2_url TEXT,
        prompt TEXT,
        status VARCHAR(30) NOT NULL DEFAULT 'pending',
        error_message TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_pinterest_pins_status ON pinterest_pins(status)
    `);
  },
  down: async (client) => {
    await client.query(`DROP TABLE IF EXISTS pinterest_pins`);
  },
};
