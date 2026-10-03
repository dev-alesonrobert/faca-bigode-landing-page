import fs from 'node:fs';
import assert from 'node:assert/strict';
import { load } from 'cheerio';
import postcss from 'postcss';
const names=['hero','proof','problems','features','showcase','how-it-works','audience','testimonials','pricing','final-cta','faq'];
const original=load(fs.readFileSync('original/index.html','utf8'));
const rules=[];
for(const name of [...names,'header','footer']) {
 const base=`src/app/components/${name}/${name}.component`;
 assert.ok(fs.existsSync(base+'.ts'));
 const root=postcss.parse(fs.readFileSync(base+'.scss','utf8'));
 root.walkRules(rule=>rules.push(rule));
 if(['header','footer'].includes(name))continue;
 const migrated=load(fs.readFileSync(base+'.html','utf8'));
 const section=original('main > section').eq(names.indexOf(name));
 // Price interpolation is the only dynamic text replacement.
 migrated('strong[data-month]').each((_,el)=>migrated(el).text(migrated(el).attr('data-month')));
 assert.equal(migrated('section').text(),section.text(),name+': texto preservado');
 assert.equal(migrated('.reveal[appReveal]').length,section.find('.reveal').length+(section.hasClass('reveal')?1:0));
 assert.deepEqual(migrated('a').map((_,a)=>migrated(a).attr('href')).get(),section.find('a').map((_,a)=>original(a).attr('href')).get());
 assert.equal(migrated('details').length,section.find('details').length);
}
for(const path of ['src/styles.scss','src/app/app.component.scss'])postcss.parse(fs.readFileSync(path,'utf8')).walkRules(rule=>rules.push(rule));
const css=postcss.parse(fs.readFileSync('original/styles.css','utf8'));
let checked=0;
css.walkRules(rule=>{for(const selector of rule.selectors){assert.ok(rules.some(r=>r.selectors.includes(selector)&&r.nodes.map(n=>n.toString()).join('\n')===rule.nodes.map(n=>n.toString()).join('\n')&&r.parent.type===rule.parent.type&&(r.parent.type!=='atrule'||r.parent.params===rule.parent.params)),`Regra ausente ou alterada: ${selector}`);checked++}});
console.log(`Verificação aprovada: 11 seções, textos, links, FAQ, reveal e ${checked} seletores com declarações originais.`);
