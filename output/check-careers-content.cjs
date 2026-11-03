const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const copy=require('../frontend/app/careers/content.json');
const document=JSON.parse(fs.readFileSync('output/careers-updated-document.json','utf8'));
const normalize=text=>text.replace(/\s+/g,' ').trim();
assert.equal(copy.hero.title+' / '+copy.hero.subtitle,document[0]);
assert.equal(copy.hero.description,document[1]);
for(const [index,item] of copy.values.items.entries()) {
  assert.equal(item.headline,document[[13,17,21,25,29,33][index]]);
  assert.equal(item.description,document[[14,18,22,26,30,34][index]]);
}
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{
  for(const [width,height] of [[320,568],[390,844],[1920,1080],[3440,1440]]){
    const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
    await page.addInitScript(()=>sessionStorage.setItem('tsalla_initial_load','true'));
    await page.goto('http://localhost:3000/careers',{waitUntil:'domcontentloaded'});
    await page.waitForTimeout(1400);
    const text=normalize(await page.locator('.careers-page').innerText());
    for(const expected of [copy.hero.title,copy.hero.subtitle,copy.hero.description,copy.rhythm.tagline,copy.rhythm.description,copy.values.tagline,copy.values.description,copy.founder.label,...copy.founder.paragraphs,copy.founder.closing,copy.learningSupport.toUpperCase()]) assert(text.includes(normalize(expected)),`Missing: ${expected.slice(0,50)}`);
    assert.equal(await page.locator('#benefits .careers-label').filter({hasText:/learning support/i}).count(),1,'Learning support appears once');
    const hero=await page.locator('.careers-hero-description').boundingBox();
    assert(hero.y>=0 && hero.y+hero.height<=height+1,'Hero copy stays inside screen');
    await page.screenshot({path:`output/careers-copy-hero-${width}.png`});
    const section=page.locator('#how-we-operate');
    await section.evaluate(el=>window.scrollTo({top:scrollY+el.getBoundingClientRect().top,behavior:'instant'}));
    await page.waitForTimeout(1000);
    for(const item of copy.values.items){
      await section.getByRole('button',{name:item.title,exact:true}).click();
      await page.waitForTimeout(250);
      assert.equal(normalize(await section.locator('.careers-values-visual h3').innerText()),item.headline);
      assert.equal(normalize(await section.locator('.careers-values-visual p').innerText()),item.description);
      const bounds=await section.locator('.careers-values-visual').evaluate(el=>{
        const image=el.getBoundingClientRect(),heading=el.querySelector('h3').getBoundingClientRect(),p=el.querySelector('p').getBoundingClientRect();
        return {top:image.top,bottom:image.bottom,headingTop:heading.top,paragraphBottom:p.bottom};
      });
      assert(bounds.headingTop>=bounds.top-1 && bounds.paragraphBottom<=bounds.bottom+1,`${item.title} caption fits image at ${width}`);
    }
    await page.screenshot({path:`output/careers-copy-values-${width}.png`});
    await page.close();
    console.log(`PASS ${width}x${height}: document content, six value tabs, hero and caption bounds`);
  }
}finally{await browser.close()}})().catch(error=>{console.error(error);process.exitCode=1});
