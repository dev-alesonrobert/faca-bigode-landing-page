import fs from 'node:fs';
import http from 'node:http';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
const html=fs.readFileSync('original/index.html','utf8');const css=fs.readFileSync('original/styles.css','utf8');
const fonts='<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap">';
const server=http.createServer((req,res)=>{res.setHeader('Content-Type','text/html; charset=utf-8');res.end(`<!doctype html><html lang="pt-BR"><head><meta name="viewport" content="width=device-width, initial-scale=1">${fonts}<style>${css}</style></head><body>${html}</body></html>`)}).listen(4201,'127.0.0.1');
let browser;
try {
 browser=await chromium.launch({channel:'chrome',headless:true});
 fs.mkdirSync('verification',{recursive:true});
 const page=await browser.newPage();const reference=await browser.newPage();const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const results=[];
 for(const width of [1440,900,600,390]){
  await page.setViewportSize({width,height:900});await reference.setViewportSize({width,height:900});
  await page.goto('http://127.0.0.1:4200');await reference.goto('http://127.0.0.1:4201');
  await page.locator('app-hero h1').waitFor();
  for(const p of [page,reference]) {await p.evaluate(()=>document.fonts.ready);await p.addStyleTag({content:'.reveal { opacity:1 !important; transform:none !important; transition:none !important; } html { scroll-behavior:auto !important; }'});}
  const measure=()=>Array.from(document.querySelectorAll('section, section *')).map(el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);return {tag:el.tagName,x:r.x,y:r.y,w:r.width,h:r.height,color:s.color,background:s.background,font:s.font,padding:s.padding,margin:s.margin,border:s.border,display:s.display,gap:s.gap,grid:s.gridTemplateColumns,transform:s.transform}});
  const actual=await page.evaluate(measure),expected=await reference.evaluate(measure);
  const differences=actual.map((a,i)=>({index:i,actual:a,expected:expected[i]})).filter(d=>JSON.stringify(d.actual)!==JSON.stringify(d.expected)); fs.writeFileSync(`verification/differences-${width}.json`,JSON.stringify(differences,null,2)); assert.equal(differences.length,0,`Comparação visual em ${width}px: veja verification/differences-${width}.json`);
  await page.screenshot({path:`verification/angular-${width}.png`,fullPage:true});await reference.screenshot({path:`verification/original-${width}.png`,fullPage:true});
  await page.locator('.billing button[data-price="annual"]').click();await page.waitForFunction(() => document.querySelector('.billing button.active')?.getAttribute('data-price') === 'annual');
  await page.locator('.billing button[data-price="monthly"]').click();await page.waitForFunction(() => document.querySelector('.billing button.active')?.getAttribute('data-price') === 'monthly');
  await page.locator('summary').first().click();assert.equal(await page.locator('details').first().getAttribute('open'),'');
  results.push({width,matchedElements:actual.length,billing:'passed',faq:'passed'});
 }
 await page.goto('http://127.0.0.1:4200');await page.locator('.hero-copy.visible').waitFor();
 await page.locator('.faq-list').scrollIntoViewIfNeeded();await page.locator('.faq-list.visible').waitFor();assert.deepEqual(errors,[]);
 fs.writeFileSync('verification/results.json',JSON.stringify({results,reveal:'passed',runtimeErrors:errors},null,2));
 console.log(JSON.stringify(results));
} finally {await browser?.close();server.close();}



