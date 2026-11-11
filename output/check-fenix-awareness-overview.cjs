const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const names = ['RGB Camera', 'LiDAR Sensor', 'Thermal Camera', 'White LED', 'Blue LED'];

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    for (const [width, height] of [[320, 568], [390, 844], [768, 1024], [1366, 768], [1920, 1080], [3440, 1440]]) {
      const page = await browser.newPage({ viewport: { width, height } });
      const frameRequests = [];
      const pageErrors = [];
      page.on('pageerror', error => pageErrors.push(error.message));
      page.on('request', r => { if (r.url().includes('awareness-frames-hq')) frameRequests.push(r.url()); });
      await page.addInitScript(() => sessionStorage.setItem('tsalla_initial_load', 'true'));
      await page.goto('http://localhost:3001/fenix', { waitUntil: 'domcontentloaded' });
      const section = page.locator('.fenix-awareness');
      await section.waitFor();
      await page.waitForTimeout(1800);
      await section.evaluate(el => scrollTo({ top: el.getBoundingClientRect().top + scrollY, behavior: 'instant' }));
      await page.waitForTimeout(1000);
      const cards = section.locator('article');
      assert.deepEqual(await cards.evaluateAll(items => items.map(e => e.getAttribute('aria-label'))), names);
      for (const card of await cards.all()) {
        const bounds = await card.boundingBox();
        assert(bounds.y >= 0 && bounds.y + bounds.height <= height + 3, `${width} ${await card.getAttribute('aria-label')} must fit in one viewport: ${JSON.stringify(bounds)}`);
        assert(bounds.x >= 0 && bounds.x + bounds.width <= width + 1);
        assert(await card.locator(width >= 1024 ? '.awareness-feature-description' : '.awareness-feature-summary').isVisible());
        assert(await card.evaluate(e => e.scrollHeight <= e.clientHeight + 2), 'Card content must not overflow');
      }
      assert(Math.abs(await section.evaluate(el => el.getBoundingClientRect().height) - height) <= 3, `${width}: section must be one screen high`);
      assert.equal(frameRequests.length, 0, 'Static section must not fetch the scroll sequence');
      assert.equal(await section.getAttribute('data-snap-sequence'), null);
      assert.equal(await section.locator('.awareness-highlight').count(), 5, 'Every sensor must have its blue region');
      assert.equal(await section.locator('.awareness-connectors path').count(), 5, 'Every card must have its dashed connector');
      const alignment = await section.evaluate(() => {
        const model = document.querySelector('.awareness-model');
        const overlay = document.querySelector('.awareness-connectors');
        const matrix = model.getScreenCTM();
        const overlayMatrix = overlay.getScreenCTM();
        const anchors = [[1415,302],[1100,330],[1415,493],[1390,616],[1022,667]];
        return Array.from(overlay.querySelectorAll('circle')).map((circle, index) => {
          const expected = new DOMPoint(...anchors[index]).matrixTransform(matrix);
          const actual = new DOMPoint(circle.cx.baseVal.value, circle.cy.baseVal.value).matrixTransform(overlayMatrix);
          return Math.hypot(expected.x-actual.x, expected.y-actual.y);
        });
      });
      assert(alignment.every(distance => distance < 1), `Sensor endpoints must stay aligned: ${alignment}`);
      if (width === 1366) {
        await page.setViewportSize({ width: 1024, height: 768 });
        await page.waitForTimeout(300);
        const resizedAlignment = await section.evaluate(() => {
          const model = document.querySelector('.awareness-model');
          const overlay = document.querySelector('.awareness-connectors');
          const target = new DOMPoint(1415, 302).matrixTransform(model.getScreenCTM());
          const dot = overlay.querySelector('circle');
          const endpoint = new DOMPoint(dot.cx.baseVal.value, dot.cy.baseVal.value).matrixTransform(overlay.getScreenCTM());
          return Math.hypot(target.x - endpoint.x, target.y - endpoint.y);
        });
        assert(resizedAlignment < 1, 'Connectors must realign when the same page is resized');
        await page.setViewportSize({ width, height });
        await page.waitForTimeout(300);
      }
      const before = await cards.allTextContents();
      await page.waitForTimeout(1200);
      assert.deepEqual(await cards.allTextContents(), before, 'All five cards must remain visible without a timed animation');
      await page.screenshot({ path: `output/fenix-awareness-static-${width}.png` });
      assert.deepEqual(pageErrors, [], 'The section must not introduce runtime errors');
      await page.mouse.wheel(0, 100);
      await page.waitForTimeout(1400);
      assert((await section.evaluate(el => el.getBoundingClientRect().bottom)) < 4, 'One normal scroll should leave the static section');
      console.log(`${width}x${height}: five static features, blue regions and aligned connectors fit; normal scrolling`);
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
