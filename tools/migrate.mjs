import fs from 'node:fs';
import {load} from 'cheerio';
import postcss from 'postcss';
const html=fs.readFileSync('original/index.html','utf8');
const css=postcss.parse(fs.readFileSync('original/styles.css','utf8'));
const $=load(html); const sections=$('main > section').toArray();
const names=['hero','proof','problems','features','showcase','how-it-works','audience','testimonials','pricing','final-cta','faq'];
const write=(p,s)=>{fs.mkdirSync(p.slice(0,p.lastIndexOf('/'))||'.',{recursive:true});fs.writeFileSync(p,s)};
const globalSelectors=new Set([':root','*','html','body']);
function filter(nodes,predicate){return nodes.map(node=>{
 if(node.type==='rule'){const selectors=node.selectors.filter(predicate);return selectors.length?node.clone({selector:selectors.join(',\n')}).toString():'';}
 if(node.type==='atrule'){const inner=filter(node.nodes||[],predicate);return inner.trim()?`@${node.name} ${node.params} {\n${inner}\n}`:'';}return '';
}).filter(Boolean).join('\n\n')}
const globals=filter(css.nodes,s=>globalSelectors.has(s));write('src/styles.scss',globals+'\n');
write('src/app/app.component.scss',filter(css.nodes,s=>s==='.noise'));
let imports=[],classes=[];
for(let i=0;i<names.length;i++){
 const name=names[i],className=name.split('-').map(s=>s[0].toUpperCase()+s.slice(1)).join('')+'Component';
 const markup=$.html(sections[i]);const part=load(markup);
 const matches=s=>{if(globalSelectors.has(s)||s==='.noise')return false;let clean=s.replace(/\.visible/g,'').replace(/\[open\]/g,'').replace(/::[\w-]+/g,'').replace(/:(hover|first-of-type|first-child|last-child|first-letter|before|after)/g,'').replace(/:not\([^)]*\)/g,'');try{return part(clean).length>0}catch{return false}};
 let template=markup.replace(/class="([^"]*\breveal\b[^"]*)"/g,'class="$1" appReveal');
 let body='';let extra='';
 if(name==='pricing'){
 template=template.replace('class="active" data-price="monthly"','[class.active]="billingInterval === \'monthly\'" (click)="setBillingInterval(\'monthly\')" data-price="monthly"').replace('data-price="annual"','[class.active]="billingInterval === \'annual\'" (click)="setBillingInterval(\'annual\')" data-price="annual"');
 template=template.replace(/<strong data-month="([^"]*)" data-year="([^"]*)">[^<]*<\/strong>/g,`<strong data-month="$1" data-year="$2">{{ billingInterval === 'annual' ? '$2' : '$1' }}</strong>`);
 extra="import { BillingInterval } from '../../models/billing-interval';\n";
 body="\n  billingInterval: BillingInterval = 'monthly';\n  setBillingInterval(interval: BillingInterval): void { this.billingInterval = interval; }\n";
 }
 const base=`src/app/components/${name}/${name}.component`;
 write(base+'.html',template+'\n');write(base+'.scss',filter(css.nodes,matches)+'\n');
 write(base+'.ts',`import { Component, ChangeDetectionStrategy } from '@angular/core';\nimport { RevealDirective } from '../../shared/reveal.directive';\n${extra}\n@Component({selector: 'app-${name}', standalone: true, preserveWhitespaces: true, imports: [RevealDirective], templateUrl: './${name}.component.html', styleUrl: './${name}.component.scss', changeDetection: ChangeDetectionStrategy.OnPush})\nexport class ${className} {${body}}\n`);
 imports.push(`import { ${className} } from './components/${name}/${name}.component';`);classes.push(className);
}
for(const name of ['header','footer']){
 const cl=name==='header'?'HeaderComponent':'FooterComponent',base=`src/app/components/${name}/${name}.component`;
 const header=s=>/\.(site-header|brand|desktop-nav|login|header-actions|menu-toggle|mobile-nav|button)/.test(s);
 const footer=s=>/footer|\.socials|\.brand/.test(s);
 write(base+'.scss',filter(css.nodes,name==='header'?header:footer)+'\n');
 write(base+'.html',`<!-- PENDENTE: template original do ${name} não foi fornecido. -->\n`);
 write(base+'.ts',`import { Component, ChangeDetectionStrategy } from '@angular/core';\n@Component({selector:'app-${name}', standalone:true, preserveWhitespaces:true, templateUrl:'./${name}.component.html', styleUrl:'./${name}.component.scss', changeDetection:ChangeDetectionStrategy.OnPush})\nexport class ${cl} {${name==='header'?`\n  isMenuOpen = false;\n  toggleMenu(): void { this.isMenuOpen = !this.isMenuOpen; }\n  closeMenu(): void { this.isMenuOpen = false; }\n`:''}}\n`);
 imports.push(`import { ${cl} } from './components/${name}/${name}.component';`);classes.push(cl);
}
write('src/app/app.component.ts',`import { Component } from '@angular/core';\n${imports.join('\n')}\n@Component({selector:'app-root', standalone:true, imports:[${classes.join(', ')}], templateUrl:'./app.component.html', styleUrl:'./app.component.scss'})\nexport class AppComponent {}\n`);
write('src/app/app.component.html',`<div class="noise"></div>\n<app-header></app-header>\n<main>\n${names.map(n=>'  <app-'+n+'></app-'+n+'>').join('\n')}\n</main>\n<app-footer></app-footer>\n`);
write('src/app/models/billing-interval.ts',"export type BillingInterval = 'monthly' | 'annual';\n");
write('src/main.ts',"import { bootstrapApplication } from '@angular/platform-browser';\nimport { provideZonelessChangeDetection } from '@angular/core';\nimport { AppComponent } from './app/app.component';\nbootstrapApplication(AppComponent, {providers: [provideZonelessChangeDetection()]}).catch(error => { throw error; });\n");
write('src/index.html','<!doctype html>\n<html lang="pt-BR"><head><meta charset="utf-8"><title>Faca&Bigode</title><base href="/"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap"></head><body><app-root></app-root></body></html>\n');
write('angular.json',JSON.stringify({version:1,projects:{landing:{projectType:'application',root:'',sourceRoot:'src',architect:{build:{builder:'@angular/build:application',options:{browser:'src/main.ts',tsConfig:'tsconfig.app.json',index:'src/index.html',styles:['src/styles.scss'],assets:[{glob:'**/*',input:'src/assets',output:'assets'}],outputPath:'dist/landing'},configurations:{production:{outputHashing:'all'},development:{optimization:false,sourceMap:true}},defaultConfiguration:'production'},serve:{builder:'@angular/build:dev-server',configurations:{development:{buildTarget:'landing:build:development'},production:{buildTarget:'landing:build:production'}},defaultConfiguration:'development'}}}}},null,2));
write('tsconfig.json',JSON.stringify({compilerOptions:{target:'ES2022',module:'preserve',moduleResolution:'bundler',strict:true,experimentalDecorators:true,skipLibCheck:true,isolatedModules:true,lib:['ES2022','dom']},angularCompilerOptions:{strictTemplates:true,strictInjectionParameters:true}},null,2));
write('tsconfig.app.json',JSON.stringify({extends:'./tsconfig.json',compilerOptions:{outDir:'./out-tsc/app'},files:['src/main.ts'],include:['src/**/*.d.ts']},null,2));
write('.gitignore','node_modules/\ndist/\n.angular/\nout-tsc/\nverification/\n');


