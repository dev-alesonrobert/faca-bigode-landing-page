# Faca&Bigode — migração Angular

Projeto Angular 20 standalone, TypeScript estrito e SCSS por componente. Os arquivos fornecidos estão preservados integralmente em `original/`.

## Executar

```sh
npm install
npm start
npm run build
npm run verify
node tools/browser-verify.mjs
```

A aplicação abre em http://127.0.0.1:4200. A verificação de navegador requer o servidor ativo e Google Chrome instalado. O build de produção é gerado em `dist/landing/browser/`.

## Estrutura

```text
src/
  index.html
  main.ts
  styles.scss
  assets/
  app/
    app.component.ts
    app.component.html
    app.component.scss
    components/
      header/
      hero/
      proof/
      problems/
      features/
      showcase/
      how-it-works/
      audience/
      testimonials/
      pricing/
      final-cta/
      faq/
      footer/
    models/
      billing-interval.ts
    shared/
      reveal.directive.ts
original/
  index.html
  styles.css
  script.js
tools/
  migrate.mjs
  verify.mjs
  browser-verify.mjs
verification/
  results.json
  angular-{largura}.png
  original-{largura}.png
```

Cada pasta de componente contém `.component.ts`, `.component.html` e `.component.scss`. Não foram necessários serviços. O componente raiz apenas compõe a página e aplica o ruído de fundo.

## Estilos

`src/styles.scss` contém apenas `:root`, variáveis, reset, `html` e `body`. O ruído de fundo está em `app.component.scss`. Cada seção tem seus próprios estilos, incluindo as regras compartilhadas utilizadas por ela e os breakpoints originais de 900px e 600px. Seletores combinados foram separados sem mudar os valores ou a ordem da cascata. As regras compartilhadas são locais aos componentes para manter o encapsulamento padrão sem dependências entre seções. Não há `::ng-deep`.

As classes e os valores originais foram mantidos. As regras de cabeçalho do componente problems já organizam label, título e parágrafo verticalmente; não foi necessário aplicar `!important`. `preserveWhitespaces` evita que o Angular remova espaços relevantes entre os elementos do título.

## JavaScript convertido

- Reveal: diretiva `appReveal`, com `IntersectionObserver`, threshold `.12`, classe `visible` adicionada via `Renderer2`, animação única e liberação do observer ao destruir o elemento. Cada elemento `.reveal` recebeu a diretiva.
- Preços: `PricingComponent` utiliza `BillingInterval`, estado `billingInterval`, método `setBillingInterval`, `(click)`, `[class.active]` e interpolação. Os valores mensal e anual fornecidos são ambos `XX`; foram preservados, assim como os atributos de dados.
- Menu: `HeaderComponent` utiliza `menuAberto`, `toggleMenu()` e `fecharMenu()`, com `(click)`, `[class.open]` e `[attr.aria-expanded]`.
- FAQ: `<details>` e `<summary>` originais, inclusive rotação do ícone ao abrir.
- Âncoras, rolagem suave, hover e transições originais preservados. Links `href="#"` continuam como no original; não foram criadas rotas ou funcionalidades de produto para esses placeholders.

## Validação realizada

Build de produção aprovado. Auditoria de conteúdo e CSS aprovada para as 11 seções completas e 340 seletores. Comparação automatizada no Chrome de 431 elementos por largura em 1440, 900, 600 e 390 pixels: posições, dimensões, fontes, cores, backgrounds, margens, paddings, bordas, grids e transforms equivalentes ao HTML fornecido. Capturas completas para os dois resultados estão em `verification/`.

Alternância mensal/anual, FAQ e reveal aprovados, sem erros de execução no navegador. As comparações estabilizam reveal e scroll para medir o layout; o reveal também foi testado separadamente com seu comportamento real.

## Pendências de fonte

O header foi fornecido e integrado posteriormente, com um único menu mobile e todos os links e ações enviados. O template original do footer continua pendente.

O CSS declara DM Sans e Outfit, mas não fornece imports, links ou arquivos das fontes. As mesmas famílias e pesos estão carregados por Google Fonts em `src/index.html`; o método de carregamento é uma adaptação, e deve ser substituído se os arquivos originais de fontes forem fornecidos. A referência visual usa exatamente esse mesmo carregamento, pois não havia documento original com configuração de fontes para comparar.

Não foram fornecidos arquivos de imagens ou assets externos, nem existem caminhos relativos de imagens no HTML. SVG inline, textura SVG embutida em CSS, ícones em caracteres e desenhos CSS foram preservados. `src/assets/` está reservado para arquivos futuros.

O CSS original mantinha o menu mobile com `display: none`. Foi acrescentado `display: flex` no breakpoint original de 900px para habilitar o comportamento solicitado, preservando a transição `.25s`. O menu fechado utiliza `inert` para impedir foco em links fora da tela. `node tools/header-verify.mjs` confirmou desktop, menu único, abrir/fechar, âncoras e CTA em 900/600/390px, sem erros de execução.

