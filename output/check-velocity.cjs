const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const content = JSON.parse(fs.readFileSync('frontend/app/velocity/content.json','utf8'));
(async () => {
  const browser = await chromium.launch({channel:'msedge',headless:true});
  try {
    const page = await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
    await page.addInitScript(() => sessionStorage.setItem('tsalla_initial_load','true'));
    const response = await page.goto('http://localhost:3000/velocity',{waitUntil:'domcontentloaded'});
    assert.equal(response.status(),200);
    await page.waitForTimeout(1800);
    assert.equal(await page.title(),'Velocity Complex - Tsalla Aerospace');
    const paragraphs = [content.lead,...content.introduction];
    for (const section of content.sections) {
      paragraphs.push(section.title,...section.paragraphs,...section.closing);
      if (section.cycle) paragraphs.push(section.cycle);
      if (section.image) paragraphs.push(section.image.caption);
    }
    const text = await page.locator('.velocity-page').innerText();
    for (const paragraph of paragraphs) assert(text.includes(paragraph),`Missing document content: ${paragraph.slice(0,60)}`);
    for (const [width,height] of [[320,568],[390,844],[768,1024],[1440,900],[1920,1080],[3440,1440]]) {
      await page.setViewportSize({width,height});
      await page.waitForTimeout(350);
      await page.locator('.velocity-page img').evaluateAll(images => images.forEach(image => image.loading='eager'));
      await page.waitForFunction(() => [...document.querySelectorAll('.velocity-page img')].every(image => image.complete && image.naturalWidth>0));
      const metrics = await page.locator('.velocity-page').evaluate(el => ({
        overflow:document.documentElement.scrollWidth>innerWidth,
        images:[...el.querySelectorAll('img')].length,
        clipped:[...el.querySelectorAll('h1,h2,p,figcaption')].filter(node=>node.scrollWidth>node.clientWidth+2).length,
      }));
      assert(!metrics.overflow,`Horizontal overflow at ${width}`);
      assert.equal(metrics.clipped,0,`Clipped text at ${width}`);
      assert.equal(metrics.images,2);
      assert.equal(await page.locator('.velocity-page img[src="/home/Velocity-Complex.jpg"]').count(),1);
      if ([390,1440].includes(width)) {
        await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
        await page.waitForTimeout(300);
        await page.screenshot({path:`output/velocity-${width}.png`});
      }
      console.log(JSON.stringify({width,height,...metrics}));
    }
    await page.setViewportSize({width:1440,height:900});
    await page.locator('.velocity-page figure').last().scrollIntoViewIfNeeded();
    await page.waitForTimeout(1800);
    console.log(await page.locator('.velocity-page figure img').last().evaluate(el=>({src:el.currentSrc,opacity:getComputedStyle(el).opacity,visibility:getComputedStyle(el).visibility,rect:el.getBoundingClientRect().toJSON()})));
    await page.screenshot({path:'output/velocity-meeting.png'});
    await page.goto('http://localhost:3000/',{waitUntil:'domcontentloaded'});
    await page.waitForTimeout(1200);
    const link=page.getByRole('link',{name:'Explore Velocity'});
    assert.equal(await link.getAttribute('href'),'/velocity');
    await link.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await link.click();
    await page.waitForURL('**/velocity');
    await page.getByRole('heading',{name:'100 acres. From first principles to first flight.'}).waitFor();
    console.log('Homepage Explore Velocity click navigates successfully; document copy, campus image and meeting photo present; repeated campus banner removed.');
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1});
