const {chromium}=require('C:/Users/TA-SYS-012/Documents/Codex/2026-11-21/storm-freeze-browser-check/node_modules/playwright');
const assert=require('node:assert/strict');
const origin=process.env.STORM_TEST_ORIGIN || 'http://127.0.0.1:3000';
async function sample(video){
 return video.evaluate(v=>{
  const c=document.createElement('canvas');c.width=96;c.height=160;
  const ctx=c.getContext('2d');ctx.drawImage(v,0,0,c.width,c.height);
  const p=ctx.getImageData(0,0,c.width,c.height).data;
  let sum=0;for(let i=0;i<p.length;i+=4)sum+=p[i]+p[i+1]+p[i+2];
  return {src:v.currentSrc,time:v.currentTime,paused:v.paused,ended:v.ended,brightness:sum/(c.width*c.height*3),error:v.error?.message};
 });
}
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const cases=process.env.STORM_LIVE_SMOKE ? [[375,667,8000]] : [[375,667,0],[375,667,8000],[768,1024,0],[768,1024,8000],[1440,900,0]]; for(const [width,height,delay] of cases){
   const page=await browser.newPage({viewport:{width,height},isMobile:width<768,hasTouch:width<768});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.addInitScript(()=>sessionStorage.setItem('tsalla_initial_load','true'));
   if(delay){
    const releaseAt=Date.now()+delay;
    await page.route('**/_next/static/**/*.js',async route=>{
     await new Promise(resolve=>setTimeout(resolve,Math.max(0,releaseAt-Date.now())));
     await route.continue();
    });
   }
   await page.goto(origin+'/storm',{waitUntil:'load',timeout:60000});
   if(process.env.STORM_EXPECT_BUILD)assert((await page.content()).includes(process.env.STORM_EXPECT_BUILD),'Latest release must be active'); const video=page.locator('[aria-label="STORM hero video"] video');
   await page.waitForFunction(()=>{const v=document.querySelector('[aria-label="STORM hero video"] video');return v?.paused&&v.currentTime>=5.1&&!v.seeking&&v.readyState>=2},{},{timeout:45000}).catch(async e=>{console.log('TIMEOUT STATE',await video.evaluate(v=>({time:v.currentTime,paused:v.paused,seeking:v.seeking,ready:v.readyState,src:v.currentSrc,error:v.error?.message})));throw e});
   await page.waitForTimeout(1000);
   const before=await sample(video); console.log(JSON.stringify({probe:true,width,height,delay,...before}));
   assert(before.paused && before.brightness>3 && !before.error,'Last displayed frame must contain the drone');
   assert(await page.locator('.storm-hero-subtitle').isVisible(),'Finished video must show the subtitle, including late hydration');
   await page.waitForTimeout(700);
   const after=await sample(video);
   assert(Math.abs(after.time-before.time)<0.001 && after.brightness>3,'The frame must stay frozen');
   await page.screenshot({path:'E:/Tsalla Website/output/storm-freeze-after-'+width+(delay?'-late':'')+'.png'});
   if(width===375 && delay){
    await page.setViewportSize({width:667,height:375});
    await page.waitForFunction(()=>{const v=document.querySelector('[aria-label="STORM hero video"] video');return v?.currentSrc.includes('desktop-')&&v.readyState>=2&&!v.seeking&&v.paused});
    assert((await sample(video)).brightness>3,'Rotation must preserve the frozen visible drone');
   }
   if(width===375 && !delay){
    await page.reload({waitUntil:'load'});
    await page.waitForFunction(()=>{const v=document.querySelector('[aria-label="STORM hero video"] video');return v&&!v.paused&&v.currentTime>0&&v.currentTime<2});
   }
   assert.deepEqual(errors,[]);
   console.log(JSON.stringify({viewport:[width,height],delayedScripts:delay,...before}));
   await page.close();
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});



