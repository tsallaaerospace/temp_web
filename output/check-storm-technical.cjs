const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({channel: 'msedge', headless: true});
  try {
    for (const [width, height] of [[1920,1080], [1440,900], [390,844]]) {
      const page = await browser.newPage({viewport: {width,height}, reducedMotion: 'reduce'});
      await page.addInitScript(() => sessionStorage.setItem('tsalla_initial_load','true'));
      await page.goto('http://localhost:3000/storm', {waitUntil:'domcontentloaded'});
      await page.waitForTimeout(1500);
      await page.locator('.storm-specs').evaluate(el => window.scrollTo({top: scrollY + el.getBoundingClientRect().top, behavior:'instant'}));
      await page.waitForTimeout(1800);
      const metrics = await page.locator('.storm-specs').evaluate(el => {
        const image = el.querySelector('img');
        const rect = node => {const r=node.getBoundingClientRect();return {top:r.top,bottom:r.bottom,left:r.left,right:r.right,width:r.width,height:r.height}};
        return {section:rect(el), heading:rect(el.querySelector('h2')), image:rect(image), dimensions:rect(el.querySelector('.bat-specs-dimensions')), loaded:image.complete && image.naturalWidth===2048, src:image.getAttribute('src'), overflow:el.scrollWidth>el.clientWidth, pageOverflow:document.documentElement.scrollWidth>innerWidth};
      });
      assert(metrics.loaded, 'Render must load');
      assert(metrics.src.endsWith('storm-top-view-black-outline.webp'));
      assert(!metrics.overflow, 'No horizontal section overflow');
      assert(metrics.heading.bottom <= metrics.image.top + 1, 'Heading must clear render');
      assert(metrics.image.bottom <= metrics.dimensions.top + 1, 'Render must clear dimensions');
      assert(metrics.dimensions.bottom <= metrics.section.bottom + 1, 'Dimensions inside section');
      await page.screenshot({path:`E:/Tsalla Website/output/storm-technical-${width}.png`});
      console.log(JSON.stringify({width,height,...metrics}));
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => {console.error(error);process.exitCode=1});
