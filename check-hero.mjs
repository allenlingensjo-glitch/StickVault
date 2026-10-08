import { chromium } from 'playwright';

const browser = await chromium.connectOverCDP('wss://connect.anchorbrowser.io/?sessionId=18d39bd0-9099-45f9-9c4c-48566b90216f');
const page = await browser.newPage();

// Test 1: Grading post (uses R2 hero image)
const resp1 = await page.goto('https://www.stickvault.com/blog/grading-service-comparison-psa-bgs-sgc-cgc', { waitUntil: 'networkidle' });

const ogImage = await page.$eval('meta[property="og:image"]', el => el.content).catch(() => 'NOT FOUND');
const heroImg = await page.$eval('.post-hero-img', el => el.src).catch(() => 'NOT FOUND');
const twitterImage = await page.$eval('meta[name="twitter:image"]', el => el.content).catch(() => 'NOT FOUND');

const schemaImg = await page.evaluate(() => {
  const scripts = document.querySelectorAll('script[type="application/ld+json"]');
  for (const s of scripts) {
    try {
      const obj = JSON.parse(s.textContent);
      if (obj && obj['@type'] === 'Article' && obj.image) return obj.image;
    } catch(e) {}
  }
  return 'NOT FOUND';
});

const bodyText = await page.content();
const polsiaRefs = (bodyText.match(/stickvaultos.polsia.app/g) || []);
const polsiaUrls = bodyText.match(/https?:\/\/stickvaultos[^\"'\n]+/g) || [];

console.log('=== GRADING POST (R2 hero) ===');
console.log('HTTP Status:', resp1.status());
console.log('og:image:', ogImage);
console.log('.post-hero-img src:', heroImg);
console.log('twitter:image:', twitterImage);
console.log('schema.org image:', schemaImg);
console.log('polsia.app refs:', polsiaRefs.length, polsiaRefs.length ? polsiaRefs : '');

// Test 2: Reading post (uses /pins/ self-hosted image)
await page.goto('https://www.stickvault.com/blog/reading-drum-sheet-music-no-bs-starter-guide', { waitUntil: 'networkidle' });
const ogImage2 = await page.$eval('meta[property="og:image"]', el => el.content).catch(() => 'NOT FOUND');
const heroImg2 = await page.$eval('.post-hero-img', el => el.src).catch(() => 'NOT FOUND');
const bodyText2 = await page.content();
const polsiaRefs2 = (bodyText2.match(/stickvaultos.polsia.app/g) || []);

console.log('\n=== READING POST (/pins/ self-hosted) ===');
console.log('og:image:', ogImage2);
console.log('.post-hero-img src:', heroImg2);
console.log('polsia.app refs:', polsiaRefs2.length);

await browser.close();