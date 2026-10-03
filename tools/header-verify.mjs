import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4200/');
 await page.setViewportSize({width:1440,height:900});
 assert.equal(await page.locator('.desktop-nav').isVisible(),true);
 assert.equal(await page.locator('.menu-toggle').isVisible(),false);
 assert.equal(await page.locator('.mobile-nav').count(),1);
 for(const width of [900,600,390]) {
  await page.setViewportSize({width,height:900});
  const toggle=page.locator('.menu-toggle');await toggle.click();
  await page.waitForFunction(()=>document.querySelector('.menu-toggle')?.getAttribute('aria-expanded')==='true');
  await page.locator('.mobile-nav a[href="#recursos"]').click();
  await page.waitForFunction(()=>document.querySelector('.menu-toggle')?.getAttribute('aria-expanded')==='false');
  assert.equal(await page.locator('.mobile-nav').getAttribute('inert'),'');
  await toggle.click();await page.locator('.mobile-nav .button').click();
  await page.waitForFunction(()=>document.querySelector('.menu-toggle')?.getAttribute('aria-expanded')==='false');
  assert.equal(new URL(page.url()).hash,'#planos');
 }
 assert.deepEqual(errors,[]);console.log('Header aprovado: desktop, menu único, abrir/fechar, âncoras e CTA em 900/600/390px; sem erros no navegador.');
} finally {await browser.close();}
