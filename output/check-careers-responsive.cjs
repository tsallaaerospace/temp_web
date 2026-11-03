const assert = require('node:assert/strict');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const sizes = [[320,568],[375,667],[390,844],[430,932],[640,800],[768,1024],[820,1180],[1024,768],[1366,768],[1920,1080],[2560,1080],[2560,1440],[3440,1440],[3840,2160],[5120,1440],[5120,2160],[844,390]];
    for (const [width, height] of sizes.filter(([w]) => process.argv.length < 3 || process.argv.slice(2).includes(String(w)))) {
      const page = await browser.newPage({ viewport: { width, height } });
      await page.addInitScript(() => sessionStorage.setItem('tsalla_initial_load', 'true'));
      await page.goto('http://localhost:3000/careers');
      await page.waitForTimeout(1100);
      await page.evaluate(() => document.fonts.ready);
      const result = await page.locator('.careers-page').evaluate(root => ({
        pageWidth: document.documentElement.scrollWidth,
        sections: [...root.children].filter(e => e.matches('section,main,div')).map(e => e.getBoundingClientRect().height),
        overflow: [...root.querySelectorAll('h1,h2,h3,p,button')].filter(e => e.clientWidth && e.scrollWidth > e.clientWidth + 2).map(e => e.textContent.trim().slice(0,40)),
      }));
      assert(result.pageWidth <= width + 1, `Page overflow at ${width}`);
      assert(result.sections.every(h => h >= height - 1), `Section too short at ${width}`);
      assert.deepEqual(result.overflow, [], `Text overflow at ${width}`);
      if (width >= 2500) {
        const wide = await page.evaluate(() => {
          const rect = selector => document.querySelector(selector).getBoundingClientRect();
          return {
            hero: rect('.careers-hero-layout').width,
            image: rect('.careers-values-visual').height,
            rhythmParagraph: rect('.careers-rhythm-intro p').width,
            cultureCard: rect('.careers-culture-card').width,
            cultureWindow: rect('.careers-culture-window').width,
            jobHeading: rect('#open-positions > div:first-child').left,
            jobContent: rect('#open-positions > div:nth-child(2)').left,
          };
        });
        assert(wide.hero >= Math.min(width * .85, 2880), 'Hero should use the ultrawide layout');
        assert(wide.image >= 560, 'Values image should scale beyond desktop size');
        assert(wide.rhythmParagraph >= 600, 'Rhythm paragraph should use its available column');
        assert(Math.abs(wide.cultureCard * 4 - wide.cultureWindow) < 4, 'Four culture cards fit the content area');
        assert(Math.abs(wide.jobHeading - wide.jobContent) < 2, 'Job heading and cards should share a gutter');
      }
      const intro = page.locator('.careers-rhythm-intro');
      const visual = page.locator('.careers-rhythm-visual');
      if (width < 1024) {
        const a = await intro.boundingBox(), b = await visual.boundingBox();
        assert(b.y >= a.y + a.height, 'Stacked content overlaps');
      }
      const next = page.getByRole('button', { name: 'Next mission stage' });
      await page.locator('.careers-rhythm').evaluate(e => e.scrollIntoView({block:'start'}));
      await page.waitForTimeout(800);
      await next.click();
      await page.waitForTimeout(800);
      assert.equal(await page.locator('.careers-rhythm-card').count(), 3);
      const cards = await page.locator('.careers-rhythm-card').evaluateAll(es => es.map(e => ({ x:e.getBoundingClientRect().x, right:e.getBoundingClientRect().right })).sort((a,b)=>a.x-b.x));
      assert(cards.every((e,i) => !i || e.x >= cards[i-1].right - 1), 'Video cards overlap');
      if (width === 390 || width === 3440) await page.screenshot({path:`output/careers-rhythm-${width}.png`});
      await page.close();
      console.log(`PASS ${width}x${height}: sections, text, controls, sliding cards`);
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
