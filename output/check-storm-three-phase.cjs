const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
  const browser=await chromium.launch({channel:'msedge',headless:true});
  try {
    for (const [width,height] of [[1440,900],[390,844]]) {
      const page=await browser.newPage({viewport:{width,height},reducedMotion:width<768?'reduce':'no-preference'});
      await page.addInitScript(()=>sessionStorage.setItem('tsalla_initial_load','true'));
      const response=await page.goto('http://localhost:3000/storm',{waitUntil:'domcontentloaded'});
      assert.equal(response.status(),200);
      await page.waitForTimeout(1800);
      await page.mouse.wheel(0,120);
      await page.waitForTimeout(1300);
      assert(Math.abs(await page.evaluate(()=>scrollY)-height)<3,'Hero wheel gesture must advance one section');
      const section=page.locator('[data-storm-section="three-phase"]');
      await section.evaluate(el=>window.scrollTo({top:scrollY+el.getBoundingClientRect().top,behavior:'instant'}));
      await page.waitForTimeout(1800);
      await page.waitForFunction(()=>{const image=document.querySelector('[data-storm-section="three-phase"] img');return image?.complete && image.naturalWidth>0});
      const result=await section.evaluate(el=>{
        const image=el.querySelector('img');
        return {width:el.clientWidth,height:el.clientHeight,src:decodeURI(image.currentSrc),previous:el.previousElementSibling?.querySelector('h1')?.textContent?.trim(),next:el.nextElementSibling?.classList.contains('storm-specs'),removed:document.body.innerText.includes('Resilient Offshore Autonomy')};
      });
      assert.equal(result.width,width);
      assert.equal(result.height,height);
      assert.equal(result.previous,'STORM');
      assert(result.next);
      assert(!result.removed);
      assert(result.src.endsWith(width<768?'3 phase mobile.png':'3 phase destop.png'));
      assert.equal((await section.locator('h2').innerText()).replace(/\s+/g,' '),'Ready. Rugged. Relentless.');
      assert(await section.locator('h2').evaluate(el=>[...el.children].every(child=>child.getBoundingClientRect().left>=-1 && child.getBoundingClientRect().right<=innerWidth+1)),'Title columns must fit the screen');
      await section.screenshot({path:`output/storm-three-phase-${width}.png`});
      await page.mouse.wheel(0,120);
      await page.waitForTimeout(1300);
      assert(Math.abs(await page.locator('.storm-specs').evaluate(el=>el.getBoundingClientRect().top))<3,'Next wheel gesture must advance to specifications');
      await page.keyboard.press('PageUp');
      await page.waitForTimeout(1300);
      assert(Math.abs(await section.evaluate(el=>el.getBoundingClientRect().top))<3,'PageUp must return to environment panels');
      console.log(result);
      await page.close();
    }
  } finally {await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1});
