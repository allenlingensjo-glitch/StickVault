/**
 * Fix Pinterest pin destination URLs — all 30 pins pointed to non-existent short
 * slugs (e.g. /blog/grading-guide) instead of the real blog post slugs
 * (e.g. /blog/grading-service-comparison-psa-bgs-sgc-cgc). Operator pins also
 * used /products/ path which doesn't exist — shop is at /shop/.
 */
const BASE_DOMAIN = 'https://stickvault.com';
const UTM_SUFFIX = 'utm_source=pinterest&utm_medium=social&utm_campaign=stickvault_pins';

function makeUtm(path, pinNum) {
  const padded = String(pinNum).padStart(2, '0');
  return `${BASE_DOMAIN}${path}?${UTM_SUFFIX}&utm_content=pin_${padded}`;
}

// Correct destination paths — must match actual blog_posts.slug and /shop/:slug routes
const CORRECT_DESTINATIONS = {
  1:  '/blog/grading-service-comparison-psa-bgs-sgc-cgc',
  2:  '/blog/grading-service-comparison-psa-bgs-sgc-cgc',
  3:  '/blog/grading-service-comparison-psa-bgs-sgc-cgc',
  4:  '/blog/sports-card-flipping-workflow-buy-low-sell-high-system',
  5:  '/blog/sports-card-flipping-workflow-buy-low-sell-high-system',
  6:  '/blog/serious-collector-weekly-routine-workflow-habits',
  7:  '/blog/paradiddle-playbook-exercises-speed-control',
  8:  '/blog/stick-control-drummers-secret-weapon',
  9:  '/blog/drum-practice-routine-that-actually-sticks',
  10: '/blog/drum-practice-routine-that-actually-sticks',
  11: '/blog/stick-control-drummers-secret-weapon',
  12: '/blog/flow-state-drumming-when-practice-becomes-play',
  13: '/blog/weekly-review-operators-checkpoint',
  14: '/blog/building-consistency-without-motivation',
  15: '/blog/creators-operating-system-manage-multiple-projects',
  16: '/blog/morning-vault-systems-based-morning-routine',
  17: '/blog/digital-hygiene-organizing-your-digital-vault',
  18: '/blog/night-owl-output-system-evening-routine',
  19: '/blog/weekly-review-operators-checkpoint',
  20: '/blog/grading-service-comparison-psa-bgs-sgc-cgc',
  21: '/blog/building-consistency-without-motivation',
  22: '/blog/grading-service-comparison-psa-bgs-sgc-cgc',
  23: '/blog/sports-card-flipping-workflow-buy-low-sell-high-system',
  24: '/blog/flow-state-drumming-when-practice-becomes-play',
  25: '/shop/side-hustle-launchpad',
  26: '/shop/side-hustle-launchpad',
  27: '/shop/side-hustle-launchpad',
  28: '/shop/side-hustle-launchpad',
  29: '/shop/side-hustle-launchpad',
  30: '/shop/side-hustle-launchpad',
};

module.exports = {
  name: 'fix_pinterest_destination_urls',
  up: async (client) => {
    for (const [pinNumber, destPath] of Object.entries(CORRECT_DESTINATIONS)) {
      const destUrl = `${BASE_DOMAIN}${destPath}`;
      const utmUrl = makeUtm(destPath, Number(pinNumber));
      await client.query(
        `UPDATE pinterest_pins
         SET destination_url = $1, utm_url = $2, updated_at = NOW()
         WHERE pin_number = $3`,
        [destUrl, utmUrl, Number(pinNumber)]
      );
    }
  },
  down: async () => {
    // No rollback — old URLs were broken anyway
  },
};
