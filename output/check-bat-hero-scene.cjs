const { chromium } = require('playwright');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    for (const [file, width, height] of [
      ['bat-hero-scrub-20261110.mp4', 1920, 1080],
      ['bat-hero-scenes-20261110.mp4', 1280, 720],
    ]) {
      const page = await browser.newPage();
      await page.goto(pathToFileURL(path.resolve('frontend/public/product/T-BAT', file)).href);
      await page.waitForFunction(() => document.querySelector('video')?.readyState >= 2);
      const video = page.locator('video');
      const metadata = await video.evaluate(v => ({ width: v.videoWidth, height: v.videoHeight, duration: v.duration }));
      assert.equal(metadata.width, width);
      assert.equal(metadata.height, height);
      assert(Math.abs(metadata.duration - 557 / 24) < .01);
      // Seek across both edit boundaries, inside the replacement and into the tracked final scene.
      for (const frame of [314, 315, 350, 411, 412, 500, 556]) {
        await video.evaluate((v, frame) => new Promise((resolve, reject) => {
          v.pause();
          const timer = setTimeout(() => reject(new Error('seek timed out')), 5000);
          v.addEventListener('seeked', () => { clearTimeout(timer); resolve(); }, { once: true });
          v.currentTime = (frame + .5) / 24;
        }), frame);
        assert(await video.evaluate(v => v.readyState >= 2 && !v.error));
      }
      console.log(`${file}: dimensions, duration and seven frame seeks passed`);
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
