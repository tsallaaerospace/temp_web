const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{
  for(const [width,height] of [[1440,900],[390,844]]){
    const page=await browser.newPage({viewport:{width,height}});
    await page.addInitScript(()=>sessionStorage.setItem('tsalla_initial_load','true'));
    await page.goto('http://localhost:3000/storm',{waitUntil:'domcontentloaded'});
    const hero=page.getByRole('region',{name:'STORM hero video'});
    await page.waitForFunction(()=>document.querySelector('[aria-label="STORM hero video"] video')?.readyState>=2);
    const result=await hero.locator('video').evaluate(el=>({src:decodeURI(el.currentSrc),time:el.currentTime,paused:el.paused,error:el.error?.message,width:el.videoWidth,height:el.videoHeight,muted:el.muted,loop:el.loop}));
    assert(result.src.endsWith('/product/STORM/storm-v2-hero.mp4'));
    assert(!result.paused && !result.error && result.muted && !result.loop);
    assert.equal(await hero.locator('p').count(),0,'Subtitle hidden before playback threshold');
    await hero.locator('video').evaluate(el=>{el.pause();el.currentTime=5.0});
    await page.waitForFunction(()=>{const video=document.querySelector('[aria-label="STORM hero video"] video');return video && !video.seeking});
    assert.equal(await hero.locator('p').count(),0,'Subtitle remains hidden at 5 seconds');
    await hero.locator('video').evaluate(el=>{el.currentTime=5.1});
    await hero.locator('p').waitFor();
    const subtitle=await hero.locator('p').evaluate(el=>({font:getComputedStyle(el).fontFamily,size:parseFloat(getComputedStyle(el).fontSize),center:el.getBoundingClientRect().x+el.getBoundingClientRect().width/2,bottom:el.getBoundingClientRect().bottom}));
    assert(subtitle.font.includes('Orbit') && subtitle.size>=20 && Math.abs(subtitle.center-width/2)<2 && subtitle.bottom<=height,'Subtitle uses larger Orbit text centered near bottom');
    assert((await hero.innerText()).includes('Smart Transport Operations for Rugged Missions'));
    const endingBrightness=await hero.locator('video').evaluate(async video=>{
      video.currentTime=video.duration-0.2;await video.play();
      const canvas=document.createElement('canvas');canvas.width=160;canvas.height=90;
      const context=canvas.getContext('2d'),samples=[];
      await new Promise(resolve=>{
        const timer=setInterval(()=>{
          if(video.readyState>=2 && !video.seeking){
            context.drawImage(video,0,0,160,90);const pixels=context.getImageData(0,0,160,90).data;
            let sum=0;for(let i=0;i<pixels.length;i+=4)sum+=(pixels[i]+pixels[i+1]+pixels[i+2])/3;
            samples.push(sum/(160*90));
          }
        },20);
        setTimeout(()=>{clearInterval(timer);resolve()},900);
      });
      return samples;
    });
    assert(endingBrightness.length>5 && Math.min(...endingBrightness)>15,'No black flash during playback-to-held-frame transition');
    await page.waitForFunction(()=>{const video=document.querySelector('[aria-label="STORM hero video"] video');return video?.paused && !video.seeking && video.readyState>=2 && video.duration-video.currentTime<0.01});
    await page.waitForTimeout(600);
    assert(await hero.locator('video').evaluate(el=>el.paused && el.readyState>=2 && el.duration-el.currentTime<0.01),'Video holds its final visible drone frame after finishing');
    const brightness=await hero.locator('video').evaluate(video=>{
      const canvas=document.createElement('canvas');canvas.width=160;canvas.height=90;
      const context=canvas.getContext('2d');context.drawImage(video,0,0,160,90);
      const pixels=context.getImageData(0,0,160,90).data;
      let sum=0;for(let i=0;i<pixels.length;i+=4)sum+=(pixels[i]+pixels[i+1]+pixels[i+2])/3;
      return sum/(160*90);
    });
    assert(brightness>15,'Held video frame must contain the visible drone scene, not black');
    await page.screenshot({path:`output/storm-v2-last-frame-${width}.png`});
    await page.reload({waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>{const video=document.querySelector('[aria-label="STORM hero video"] video');return video && video.readyState>=2 && !video.paused && video.currentTime>0 && !video.ended});
    assert(await hero.locator('video').evaluate(el=>el.currentTime<el.duration/2),'Refresh restarts playback');
    assert.equal(await hero.locator('p').count(),0,'Refresh resets subtitle delay');
    assert.equal(await hero.locator('h1').count(),0);
    assert(!(await hero.innerText()).includes('Where intelligent flight'));
    await page.screenshot({path:`output/storm-v2-hero-${width}.png`});
    console.log({viewport:width,...result});
    await page.close();
  }
}finally{await browser.close()}})().catch(error=>{console.error(error);process.exitCode=1});
