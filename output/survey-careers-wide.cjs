const {chromium}=require('playwright');
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{
  const page=await browser.newPage({viewport:{width:3440,height:1440},reducedMotion:'reduce'});
  await page.addInitScript(()=>sessionStorage.setItem('tsalla_initial_load','true'));
  await page.goto('http://localhost:3000/careers',{waitUntil:'domcontentloaded'});
  await page.waitForTimeout(1800);
  for(const [name,selector] of [['hero','.careers-page > main'],['rhythm','.careers-rhythm'],['values','#how-we-operate'],['jobs','#open-positions'],['culture','.careers-culture']]){
    const el=page.locator(selector).first();
    await el.evaluate(el=>window.scrollTo({top:scrollY+el.getBoundingClientRect().top,behavior:'instant'}));
    await page.waitForTimeout(1300);
    await page.screenshot({path:`output/careers-wide-${process.argv[2]||'before'}-${name}.png`});
    console.log(name,await el.evaluate(el=>({height:el.clientHeight,headings:[...el.querySelectorAll('h1,h2')].slice(0,3).map(h=>({text:h.textContent.trim(),size:getComputedStyle(h).fontSize,width:h.clientWidth})),paragraphs:[...el.querySelectorAll('p')].slice(0,2).map(p=>({size:getComputedStyle(p).fontSize,width:p.clientWidth}))})));
  }
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
