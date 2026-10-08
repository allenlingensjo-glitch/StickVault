/**
 * pinterest_pins workflow columns — adds Pinterest scheduling metadata.
 * Owns: schema additions for the full Pinterest upload-to-analytics workflow.
 * Does NOT own: pin generation logic, R2 storage.
 */
module.exports = {
  name: 'pinterest_pins_workflow',
  up: async (client) => {
    await client.query(`
      ALTER TABLE pinterest_pins
        ADD COLUMN IF NOT EXISTS description TEXT,
        ADD COLUMN IF NOT EXISTS destination_url TEXT,
        ADD COLUMN IF NOT EXISTS utm_url TEXT,
        ADD COLUMN IF NOT EXISTS board TEXT,
        ADD COLUMN IF NOT EXISTS keywords TEXT,
        ADD COLUMN IF NOT EXISTS cta_angle TEXT,
        ADD COLUMN IF NOT EXISTS funnel_pillar TEXT,
        ADD COLUMN IF NOT EXISTS posting_status TEXT NOT NULL DEFAULT 'Not Posted',
        ADD COLUMN IF NOT EXISTS notes TEXT NOT NULL DEFAULT ''
    `);
  },
  down: async (client) => {
    await client.query(`
      ALTER TABLE pinterest_pins
        DROP COLUMN IF EXISTS description,
        DROP COLUMN IF EXISTS destination_url,
        DROP COLUMN IF EXISTS utm_url,
        DROP COLUMN IF EXISTS board,
        DROP COLUMN IF EXISTS keywords,
        DROP COLUMN IF EXISTS cta_angle,
        DROP COLUMN IF EXISTS funnel_pillar,
        DROP COLUMN IF EXISTS posting_status,
        DROP COLUMN IF EXISTS notes
    `);
  },
};
