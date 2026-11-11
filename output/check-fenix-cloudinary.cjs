const { chromium } = require('playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    for (const width of [390, 1440, 3440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const media = [];
      page.on('response', r => { if (r.url().includes('res.cloudinary.com/w0fbhf2u')) media.push({ url: r.url(), status: r.status() }); });
      await page.addInitScript(() => sessionStorage.setItem('tsalla_initial_load', 'true'));
      await page.goto('http://localhost:3000/fenix', { waitUntil: 'domcontentloaded' });
      const video = page.locator('video').first();
      await page.waitForFunction(() => { const v = document.querySelector('video'); return v && v.currentTime > 0.3 && !v.paused; }, { timeout: 90000 });
      const state = await video.evaluate(v => ({ src: v.currentSrc, poster: v.poster, loop: v.loop, muted: v.muted, inline: v.playsInline, width: v.videoWidth, height: v.videoHeight }));
      assert(state.src.startsWith('blob:') || state.src.includes('.m3u8'), 'HLS should use native playback or MediaSource');
      assert(state.poster.includes('res.cloudinary.com'));
      assert(state.loop && state.muted && state.inline);
      assert(media.some(r => r.url.includes('sp_auto:maxres_2160p') && r.status === 200));
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      console.log(width, 'adaptive playback passed', state.width, state.height);
      if (width === 3440) {
        await page.waitForTimeout(12000);
        const looped = await video.evaluate(v => ({ time: v.currentTime, paused: v.paused, ended: v.ended, error: v.error?.message, width: v.videoWidth, height: v.videoHeight }));
        assert(!looped.paused && !looped.ended && !looped.error && looped.time > 0);
        console.log('Playback remains active after the 10-second video loops', looped);
      }
      if (width === 1440) {
        await page.waitForTimeout(5000);
        await page.screenshot({ path: 'output/fenix-cloudinary-desktop.png' });
      }
      await page.close();
    }
    const page = await browser.newPage();
    await page.addInitScript(() => sessionStorage.setItem('tsalla_initial_load', 'true'));
    await page.route('**/*.m3u8', route => route.fulfill({ status: 403, body: '' }));
    await page.goto('http://localhost:3000/fenix', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => { const v = document.querySelector('video'); return v && v.currentTime > 0.3 && v.currentSrc.includes('vc_h264'); }, { timeout: 90000 });
    console.log('Failed HLS switches to optimized Cloudinary MP4');
    await page.close();
    const offlineCloud = await browser.newPage();
    await offlineCloud.addInitScript(() => sessionStorage.setItem('tsalla_initial_load', 'true'));
    await offlineCloud.route('https://res.cloudinary.com/**', route => route.fulfill({ status: 403, body: '' }));
    await offlineCloud.goto('http://localhost:3000/fenix', { waitUntil: 'domcontentloaded' });
    await offlineCloud.waitForFunction(() => { const v = document.querySelector('video'); return v && v.currentTime > 0.3 && v.currentSrc.includes('/product/fenix/'); }, { timeout: 90000 });
    console.log('Unavailable Cloudinary falls back to original local video');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
