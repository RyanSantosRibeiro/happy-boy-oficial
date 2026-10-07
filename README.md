# Happy Boy — SEA SKY

Site editorial da coleção SEA SKY em Next.js, TypeScript e React, com Roboto local e identidade preto, branco e neon.

O novo `CampaignHero` ocupa uma tela e reproduz o vídeo local em loop. Header e textos aparecem após 2,5 segundos. O antigo `<HeroBanner />` permanece comentado em `src/app/page.tsx`.

A página inclui duas vitrines com dois produtos por vez, banners alternados, o grid de coleções existente, cinco imagens do Instagram, sobre nós, WhatsApp e rodapé. Os banners e produtos usam agora as fotos locais da coleção; as seções ainda sem fotos próprias permanecem com placeholders dimensionados. Dados comerciais são ilustrativos; preços não publicados permanecem vazios.

## Executar

Requisitos: Node.js 22.18 ou superior e pnpm disponíveis no terminal. O comando de testes usa o suporte do Node a TypeScript.

```sh
pnpm install
pnpm dev
```

Abra `http://localhost:3001`, porta configurada no script de desenvolvimento. A versão de produção usa a porta padrão 3000.

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

- **Vídeo, atraso de entrada, banners, logo, Instagram e WhatsApp:** `src/data/storefront.ts`.
- **Produtos completos, fotos, preços, tamanhos e descrições:** `src/data/products.ts`.
- **Coleções por cor e suas galerias:** `src/data/collection.ts`.
- **Texto institucional:** `src/components/happy-boy/AboutSection.tsx`.
- **Ordem das seções:** `src/app/page.tsx`.
- **Indexação:** `campaign.isPreview` em `src/data/sea-sky.ts`; mantém `noindex` enquanto os dados são provisórios.

Leia o [guia atual da vitrine](docs/storefront.md). O [guia anterior](docs/implementation.md) documenta a experiência de scroll preservada no código, atualmente desativada. A [referência institucional](docs/brand-reference.txt) preserva as orientações da marca; somente SEA SKY orienta a campanha atual.
