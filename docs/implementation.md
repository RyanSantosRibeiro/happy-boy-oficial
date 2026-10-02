# SEA SKY — guia de implementação

## Estado da prévia

O projeto apresenta uma campanha editorial com um único hero cinematográfico, introdução da coleção, conceito provisório, índice assimétrico dos cinco looks, convite para conhecer a marca e rodapé. O `HeroBanner` reúne abertura e experiência dos looks, sem repetir a sequência em outra seção.

A pasta `/docs` não continha documentação anterior disponível. O material de identidade fornecido pelo usuário foi preservado em `docs/brand-reference.txt`. PDFs de identidade, logo oficial e filme da coleção não estão disponíveis no projeto.

As duas fotos enviadas pelo usuário estão em `public/images/`. Elas são referências temporárias; os looks 03, 04 e 05 repetem essas fotos de forma explícita. Os cinco nomes, descrições e fichas são estudos, não informações comerciais aprovadas. Campos de preço permanecem vazios.

## Configuração local

Use Node.js 22.18 ou superior e pnpm. O requisito considera o comando de testes, que executa TypeScript com `--experimental-strip-types`.

```sh
pnpm install
pnpm dev
```

O Next.js apresenta a URL local no terminal, normalmente `http://localhost:3000`. Para servir a versão de produção, execute `pnpm build` e depois `pnpm start`.

## Arquitetura

O App Router mantém a página, o layout e as seções editoriais como Server Components. `Header` concentra a interação do menu; `HeroBanner` é a fronteira de cliente para GSAP, ScrollTrigger, navegação entre looks e controle visual. `useHeroTimeline` coordena a apresentação, e `useVideoScrub` controla a mídia.

React monta a estrutura. Durante o scrub, o progresso é mantido em objetos e refs; GSAP e alterações diretas de estilo sincronizam imagem, texto e indicador. O estado React do vídeo muda em eventos de carregamento ou troca de fonte, não a cada posição do scroll.

`gsap.matchMedia()` reúne animações e ScrollTriggers e executa a reversão no cleanup. Eventos dos botões, listeners de mídia, observadores e agendamentos de frames também possuem descarte.

| Arquivo | Responsabilidade |
| --- | --- |
| `src/app/page.tsx` | Composição da página e ordem das seções |
| `src/app/layout.tsx` | Metadata, idioma `pt-BR` e Roboto local |
| `src/app/globals.css` | Paleta, fonte, reset e foco acessível |
| `src/data/sea-sky.ts` | Marca, campanha, looks e timeline da coleção |
| `src/lib/collection-timeline.ts` | Mapeamento puro de scroll para vídeo, informação e navegação |
| `src/hooks/useVideoScrub.ts` | Carregamento condicional, seleção desktop/mobile e busca de quadros |
| `src/components/happy-boy/BrandMark.tsx` | Asset oficial ou marcador estrutural do logo |
| `src/components/happy-boy/Header.tsx` | Navegação e menu móvel |
| `src/components/happy-boy/HeroBanner.tsx` | Hero único com vídeo, fotografias, informações HTML e navegação |
| `src/hooks/useHeroTimeline.ts` | Pin, progresso compartilhado, textos e navegação reversível |
| `src/components/happy-boy/hero-banner.css` | Altura total, composição fullscreen e responsividade do hero |
| `src/components/happy-boy/CollectionIntro.tsx` | Introdução tipográfica SEA SKY |
| `src/components/happy-boy/CollectionManifesto.tsx` | Conceito editorial identificado como provisório |
| `src/components/happy-boy/EditorialGrid.tsx` | Cinco looks navegáveis e detalhes expansíveis nativos |
| `src/components/happy-boy/ShopCTA.tsx` | Link comercial ou destino institucional disponível |
| `src/components/happy-boy/Footer.tsx` | Navegação complementar e crédito da marca |
| `src/components/happy-boy/campaign.css` | Hero, header e experiência cinematográfica responsivos |
| `src/components/happy-boy/editorial.css` | Introdução, índice, conceito, CTA e rodapé responsivos |
| `tests/collection-timeline.test.ts` | Limites, transições, retorno, holds e protótipo da timeline |
| `public/images/sea-sky-reference-01.jpg` | Referência fornecida: polo bege e calça branca |
| `public/images/sea-sky-reference-02.jpg` | Referência fornecida: polo terracota e calça escura |

`package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `tsconfig.json`, `next.config.ts` e `eslint.config.mjs` mantêm as dependências e a configuração do projeto. `AGENTS.md` e `CLAUDE.md` orientam futuras alterações; consulte também a documentação incluída na versão instalada do Next.js.

`Hero.tsx`, `CollectionExperience.tsx`, `CollectionVideo.tsx`, `LookInformation.tsx` e `CollectionProgress.tsx` foram preservados como a composição anterior, mas não são renderizados na página atual.

## Substituir conteúdo e identidade

Edite `src/data/sea-sky.ts`:

- `collectionLooks`: `name`, `category`, `description`, `details`, `price`, `href`, `image` e `imageAlt`.
- `textPosition`: posiciona a informação à esquerda ou à direita no desktop.
- `objectPositionDesktop` e `objectPositionMobile` de cada look: ajustam o enquadramento das fotos na experiência.
- `placeholder`: mantenha `true` até o conteúdo daquele look ser aprovado.
- `brand.logoSrc`: caminho para o SVG/PNG oficial dentro de `public`. Não redesenhe lettering ou monograma. Revise dimensões e contraste do asset nas aplicações claras e escuras.
- `brand.shopHref`: destino comercial oficial. Enquanto for `null`, o convite final leva ao Instagram oficial, sem simular checkout.
- `brand.contactHref`: contato real; ausente, o rodapé não apresenta link de contato.
- `campaign.isPreview`: controla indicações de prévia; altere somente após a aprovação editorial.

O hero mantém as imagens dos looks como fundo durante ausência, carregamento ou falha do filme. `campaign.fallbackFitDesktop` e `fallbackFitMobile` controlam `contain`/`cover`; por padrão, as fotografias verticais mantêm a roupa inteira no desktop. `campaign.poster` fica disponível à composição anterior. Troque também os textos das seções `CollectionIntro` e `CollectionManifesto` quando houver comunicação oficial aprovada.

## Adicionar o vídeo

Adicione arquivos reais, por exemplo:

```txt
public/videos/campaign-desktop.mp4
public/videos/campaign-mobile.mp4
```

Depois, atualize os campos do objeto `campaign`:

```ts
videoDesktop: "/videos/campaign-desktop.mp4",
videoMobile: "/videos/campaign-mobile.mp4",
```

O hero aponta para `public/videos/background.mp4`, o filme fornecido para a primeira integração. Substitua os campos por exports específicos de desktop e mobile quando eles existirem; se apenas uma versão existir, configure somente esse caminho e a seleção utilizará a fonte disponível como alternativa.

O hook conecta o `src` quando a experiência se aproxima da viewport, com margem de 400 px. A partir daí o elemento usa `preload="auto"`, `muted` e `playsInline`. A escolha mobile considera largura de até 760 px e é reavaliada em mudanças desse breakpoint. Antes do carregamento, o servidor e a primeira renderização do cliente não atribuem URL de mídia.

O vídeo permanece pausado; o scroll altera `currentTime`. O hook agrupa solicitações de busca de quadros, espera a mídia estar disponível e consome a posição mais recente após cada busca. O indicador informa estados reais, sem porcentagem fictícia. Falhas mantêm as fotografias e uma mensagem discreta.

Use `campaign.objectPositionDesktop` e `campaign.objectPositionMobile` para o enquadramento do vídeo. As duas versões devem representar a mesma montagem e os mesmos tempos relativos, pois compartilham a timeline normalizada.

### Preparação do arquivo final

Produza uma montagem contínua com cinco apresentações e quatro transformações. As partículas, reconstruções e mudanças de cenário pertencem ao filme final. A prévia atual faz uma transição suave entre fotografias; ela não simula a desintegração do modelo.

MP4/H.264 com `faststart` e quadros-chave frequentes é um ponto de partida para testar buscas de quadros. Compressão voltada apenas a diminuir o arquivo pode prejudicar o scrub reverso; quadros-chave muito frequentes podem aumentar bastante o download. Avalie resolução, bitrate e intervalo de quadros-chave com o material real e os dispositivos alvo.

`faststart` antecipa os metadados, mas não garante fluidez. A resposta final depende da codificação, duração, rede, cache, navegador e capacidade de decodificação. Ainda não existe vídeo final para validar esse comportamento. Preserve enquadramento suficiente para mostrar roupa e modelo na versão vertical.

## Ajustar a timeline

`collectionTimeline`, em `src/data/sea-sky.ts`, recebe os capítulos de `createCollectionTimeline()`. Com cinco looks, a função gera nove capítulos consecutivos: look, transformação, look, até o quinto look. O último termina com uma desaceleração da pose, sem transformação adicional.

Os padrões ficam em `TIMELINE_DEFAULTS`, em `src/lib/collection-timeline.ts`. A duração real do arquivo não é necessária para definir o roteiro: `videoProgress` é multiplicado por `video.duration` somente no controle de mídia.

| Campos | Referência de 0 a 1 | Efeito |
| --- | --- | --- |
| `start`, `end` | Scroll da experiência inteira | Limites do capítulo |
| `videoStart`, `videoEnd` | Duração do vídeo inteiro | Trecho do filme usado pelo capítulo |
| `infoStart`, `infoFull` | Scroll local do capítulo | Início e fim da entrada das informações |
| `infoFadeStart`, `infoEnd` | Scroll local do capítulo | Início e fim da saída das informações |
| `holdStart`, `holdEnd` | Scroll local do capítulo | Região reservada à observação da roupa |
| `holdVideoStart`, `holdVideoEnd` | Trecho local de vídeo do capítulo | Pequeno avanço visual durante a região de observação |

Por exemplo, o hold padrão ocupa de `0.30` a `0.78` do scroll de um look e avança de `0.46` a `0.60` do seu trecho de vídeo. Assim, a apresentação desacelera e deixa tempo para ler. Esses valores não são segundos nem posições globais do filme.

As transformações sempre resolvem a opacidade principal para zero. A navegação dos números leva a uma posição de leitura do look. Como o cálculo depende da posição atual, avançar e voltar usa o mesmo mapeamento.

Para ajustes gerais:

- `lookScrollWeight` e `transitionScrollWeight`: repartem o percurso entre apresentação e transformação.
- `lookVideoWeight` e `transitionVideoWeight`: repartem o filme enquanto a montagem definitiva não foi configurada.
- Campos `info*` e `hold*`: ajustam os padrões de leitura e pausa visual.
- `finalHoldVideoStart` e `finalHoldVideoEnd`: ajuste de desaceleração do último look.

Para ajustes específicos, personalize os objetos de `collectionTimeline` em `src/data/sea-sky.ts` depois da geração, ou substitua por capítulos explícitos compatíveis com `TimelineChapter`. Mantenha limites consecutivos, ordenados, dentro de 0–1, cobrindo toda a experiência e o filme. Não altere um limite de capítulo sem conferir seu vizinho.

O hero reserva `100svh × quantidade de looks × campaign.heroViewportHeightsPerLook`. Com cinco looks e multiplicador `1`, a seção mede **500svh**; o stage mede **100svh** e fica `position: sticky` no topo. O ScrollTrigger mede `altura da seção − altura do stage`, de modo que o último quadro coincide com a saída do stage, inclusive quando a barra do navegador muda o `svh` no celular. As quatro transições compartilham esse percurso, sem acrescentar telas.

`campaign.scrollSmoothing` define o acompanhamento do scrub; `campaign.finaleStart` determina o retorno do título SEA SKY no encerramento. `introFadeEndWithinFirstLook` controla a saída do título de abertura. O primeiro capítulo reserva sua entrada para esse título antes de mostrar informações. Os campos antigos `viewportHeightsPerLook` e `viewportHeightsPerTransition` só afetam `CollectionExperience`, que não está mais na página.

### Protótipo com dois looks

Defina `campaign.prototypeLookCount: 2`. A experiência passa a exibir Look 1 → Transformação → Look 2, com a mesma lógica e o encerramento no segundo look. Para testar o scrub, use uma edição de vídeo com exatamente essa sequência.

O índice editorial continua mostrando os cinco registros de `collectionLooks`, permitindo revisar a página completa. Volte para `5` ao integrar a montagem dos cinco looks.

## Responsividade e acessibilidade

A área visual usa `100svh`. No mobile, composição e textos ocupam regiões próprias para reduzir a disputa com a roupa. Ajustes de imagem e vídeo podem variar entre desktop e celular.

Com `prefers-reduced-motion: reduce`, a experiência não fica fixada e não baixa o vídeo. Os botões dos looks trocam a apresentação manualmente, sem depender da sequência longa de scroll. As seções editoriais mantêm todos os produtos acessíveis abaixo da experiência.

Há link para pular o conteúdo, opção para pular a experiência, foco visível, navegação por teclado e descrições nas fotos editoriais. Informações visuais inativas recebem `inert` e `aria-hidden`. O índice usa `details`/`summary` nativos para mostrar as fichas, e permanece disponível sem a animação principal.

## SEO e publicação

`src/app/layout.tsx` define título, descrição, Open Graph, idioma e cor do navegador. O protótipo possui `robots: { index: false, follow: false }` para não indexar nomes, fotos e textos ainda não aprovados.

Antes da publicação final, revise conteúdo, destino comercial, identidade, metadados e permissões de indexação. Adicione URL canônica e imagem social quando o domínio e a campanha oficial estiverem definidos. `campaign.isPreview: false` habilita indexação e seguimento de links nos metadados.

## Verificação

Execute:

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

Os testes da timeline cobrem continuidade, limites, ausência de textos em transformações, retorno pelo scroll, desaceleração, navegação e configuração com dois looks. Os comandos acima não constituem um registro de aprovação; resultados devem ser conferidos na execução correspondente.

Na revisão no navegador, verifique:

1. Hero, menu, navegação e âncoras em desktop, tablet e celular.
2. Scroll para baixo e para cima, seleção dos cinco looks e saída do pin.
3. Ausência de texto durante transformações e legibilidade nas poses de observação.
4. Resize, mudança de orientação, recarregamento no meio da página e Fast Refresh sem eventos duplicados.
5. Teclado, foco, expansão dos detalhes e modo de movimento reduzido.
6. Console, hydration, rede, fonte selecionada e recuperação pela fotografia quando o vídeo falhar.

Permanecem pendentes os testes com **o filme final** e em **Safari/iOS em aparelho físico**, incluindo busca reversa, rolagem rápida, rede lenta, troca de orientação e barra dinâmica do navegador. Simulação de viewport não substitui esses testes.

## Materiais ainda necessários

- Logotipo e, se aplicável, símbolo oficiais em arquivos prontos para web.
- Montagem de vídeo desktop e, preferencialmente, versão vertical com tempos compatíveis.
- Fotografias definitivas dos cinco looks, em especial os três que repetem referências.
- Nomes, descrições, fichas, preços e links aprovados dos produtos.
- Texto oficial da coleção, destino da loja e contato, se desejados.
- Imagem social e domínio de publicação.
