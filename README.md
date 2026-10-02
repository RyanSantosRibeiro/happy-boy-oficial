# Happy Boy — SEA SKY

Prévia editorial da coleção SEA SKY em Next.js, TypeScript, React e GSAP. O scroll controla a sequência de cinco looks; títulos e informações continuam em HTML.

Um único `HeroBanner` ocupa `100svh × 5 looks` (500svh no total). A tela de 100svh fica presa durante o percurso; as quatro transformações estão incluídas nessa sequência. Depois do quinto look, a página continua pelas seções editoriais.

O projeto inclui uma prévia de movimento feita com as duas fotografias de referência fornecidas e transições suaves entre imagens. O filme final do Google Flow poderá substituir os dois arquivos sem alterar a lógica do scroll. Os nomes e textos são provisórios, três looks repetem as referências e nenhum preço comercial foi inventado.

## Executar

Requisitos: Node.js 22.18 ou superior e pnpm disponíveis no terminal. O comando de testes usa o suporte do Node a TypeScript.

```sh
pnpm install
pnpm dev
```

Abra `http://localhost:3000`. Se a porta estiver ocupada, use a URL informada pelo Next.js.

## Verificar e gerar a versão de produção

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm start
```

Esses comandos são instruções de verificação, não um registro de resultados. A revisão em Safari/iOS físico e com os arquivos de vídeo finais continua necessária.

## Editar a coleção

- **Conteúdo, fotos e links:** `src/data/sea-sky.ts`.
- **Vídeo:** o hero usa `public/videos/background.mp4` como filme de fundo. Para criar versões específicas por dispositivo, altere `campaign.videoDesktop` e `campaign.videoMobile` em `src/data/sea-sky.ts`.
- **Ritmo, poses e textos:** `collectionTimeline` em `src/data/sea-sky.ts` e padrões de `src/lib/collection-timeline.ts`.
- **Altura do hero:** `campaign.heroViewportHeightsPerLook` (padrão 1) multiplicado pela quantidade de looks.
- **Protótipo com dois looks:** defina `campaign.prototypeLookCount: 2`.
- **Logo:** forneça o asset oficial e preencha `brand.logoSrc`. O marcador atual apenas reserva seu espaço.

Leia o [guia de implementação](docs/implementation.md) para arquitetura, inventário, preparo de vídeo e revisão. A [referência institucional](docs/brand-reference.txt) preserva as orientações da marca; somente SEA SKY orienta a campanha atual.
