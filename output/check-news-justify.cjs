const {chromium}=require('C:/Users/TA-SYS-012/Documents/Codex/2026-11-21/storm-freeze-browser-check/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  for(const width of (process.env.NEWS_LIVE_SMOKE ? [375] : [375,768])){
   const page=await browser.newPage({viewport:{width,height:800}});
   await page.addInitScript(()=>sessionStorage.setItem('tsalla_initial_load','true'));
   await page.goto((process.env.NEWS_TEST_ORIGIN || 'http://127.0.0.1:3000')+'/',{waitUntil:'load',timeout:60000});
   const paragraph=page.getByText('Our integrated suite of software, hardware, and services empowers businesses to operate smarter and grow faster.',{exact:true});
   await paragraph.scrollIntoViewIfNeeded();
   const align=await paragraph.evaluate(e=>getComputedStyle(e).textAlign);
   assert.equal(align,width<640?'justify':'left');
   await page.waitForTimeout(1200);
   await page.screenshot({path:'E:/Tsalla Website/output/news-justify-'+width+'.png'});
   console.log(JSON.stringify({width,textAlign:align}));
   await page.close();
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});

