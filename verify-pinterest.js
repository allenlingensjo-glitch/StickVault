const { chromium } = require('playwright');

(async () => {
  const cdpUrl = 'wss://connect.anchorbrowser.io/?sessionId=cead8a85-1180-4eda-9ed0-1269c69516e6';
  const browser = await chromium.connectOverCDP(cdpUrl);
  const page = await browser.newPage();
  await page.goto('https://stickvault.polsia.app/', { waitUntil: 'networkidle', timeout: 15000 });

  // Check window.pintrk
  const pintrkExists = await page.evaluate(() => typeof window.pintrk !== 'undefined');
  const pintrkLoaded = await page.evaluate(() => {
    if (typeof window.pintrk === 'undefined') return 'MISSING';
    const queue = window.pintrk.queue || [];
    return 'defined; queue length: ' + queue.length;
  });

  // Get the page source and check for pintrk
  const content = await page.content();
  const hasShim = content.includes('pintrk');
  const tagIdMatch = content.match(/pintrk\n'tag,?\u0020?['"]([^'"]+)['"]/);
  const loadCall = content.match(/pintrk\n'tag'?,\u0020?'([^']+)'/);

  console.log('pintrk defined:', pintrkExists);
  console.log('pintrk info:', pintrkLoaded);
  console.log('has pintrk in source:', hasShim);

  // Check network requests to ct.pinterest.com
  const requests = [];
  page.on('request', req => {
    if (req.url().includes('pinterest.com') || req.url().includes('ct.pinterest')) {
      requests.push(req.url());
    }
  });

  await page.reload({ waitUntil: 'networkidle' });
  await new Promise(r => setTimeout(r, 2000));

  console.log('Pinterest network requests:', requests);

  await browser.close();
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });