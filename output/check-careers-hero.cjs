const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{
  const page=await browser.newPage({reducedMotion:'reduce'});
  await page.addInitScript(()=>sessionStorage.setItem('tsalla_initial_load','true'));
  await page.goto('http://localhost:3000/careers',{waitUntil:'domcontentloaded'});
  await page.waitForTimeout(1400);
  for(const [width,height] of [[320,568],[390,844],[1024,768],[1440,900],[1920,1080],[3440,1440],[5120,1440]]){
    await page.setViewportSize({width,height});
    await page.waitForTimeout(200);
    const result=await page.locator('.careers-hero-title').evaluate(el=>({height:el.clientHeight,font:parseFloat(getComputedStyle(el).fontSize),width:el.clientWidth,scrollWidth:el.scrollWidth}));
    assert(result.height<result.font*1.2,'Title stays on one line');
    assert(result.scrollWidth<=result.width+1,'Title fits its column');
    console.log(width,result);
  }
  assert.equal(await page.locator('#benefits .careers-label').count(),10);
  assert.equal(await page.locator('#benefits .careers-label').filter({hasText:/learning support/i}).count(),1);
  assert.equal(await page.locator('#benefits').getByText(/GYM DISCOUNT/).count(),0);
  console.log('PASS: one-line heading and Learning support replaces gym benefit without duplication');
}finally{await browser.close()}})().catch(error=>{console.error(error);process.exitCode=1});
