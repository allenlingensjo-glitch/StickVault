/**
 * pinterest_pins dates — adds published_date and scheduled_date columns.
 * Owns: date metadata for Pinterest posting dashboard.
 * Does NOT own: pin generation, status/notes columns.
 */
module.exports = {
  name: 'pinterest_pins_dates',
  up: async (client) => {
    await client.query(`
      ALTER TABLE pinterest_pins
        ADD COLUMN IF NOT EXISTS published_date DATE,
        ADD COLUMN IF NOT EXISTS scheduled_date DATE
    `);
  },
  down: async (client) => {
    await client.query(`
      ALTER TABLE pinterest_pins
        DROP COLUMN IF EXISTS published_date,
        DROP COLUMN IF EXISTS scheduled_date
    `);
  },
};