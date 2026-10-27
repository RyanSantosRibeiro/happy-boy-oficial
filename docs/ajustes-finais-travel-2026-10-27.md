# Happy Boy — três ajustes finais

> Orientação visual posterior: [fotos antes dos vídeos e retirada das legendas](ordem-colecao-2026-10-27.md). Essa correção substitui a sequência de apresentação descrita abaixo.

Prévia local: http://localhost:3014/. Implementado no clone em 27/10/2026. **Nenhuma publicação ou push foi realizado.**

## Alterações

1. Quatro carrosséis independentes, reutilizando o componente editorial existente. Cada um mostra apenas a capa de uma variação e atualiza nome, cor e link junto com a seleção. Grupos: Polo Dry Fit Canelado (4), Polo Essential (3), Polo e Short (4), Contrast e Camisa e Short (3 + 1). As 15 variações são únicas entre os grupos; Camisa e Short conserva sua família comercial e página próprias. As setas não percorrem os ângulos de um mesmo produto. Esses ângulos permanecem nas páginas individuais.
2. Um único título principal **Coleção Travel Edition**, imediatamente antes de **Conjunto Dry Fit** e dos quatro vídeos. O nome vem da coleção ativa. A âncora `/#collection` agora chega a essa abertura; `#dry-fit` continua disponível no bloco fotográfico para preservar retornos existentes.
3. Explore com exatamente seis links: **Início → Coleção atual → Coleções → Fábrica → Lojas → Atendimento comercial**. Destinos: `/#top`, `/#collection`, `/colecoes`, `/#fabrica`, `/#lojas`, `/#visitas`. Mantidos o rodapé preto, o institucional sob o logo e os contatos aprovados.

O arquivo `/colecoes` foi reutilizado. Ele lista todas as coleções publicadas, enquanto a homepage usa a coleção marcada como destaque. Novas coleções podem ser adicionadas ao cadastro sem apagar as anteriores; nenhuma coleção fictícia ou página duplicada foi criada.

## Validação realizada

- Os quatro botões seguintes foram acionados separadamente no desktop. Cada ação alterou somente o grupo correspondente, com capa e destino corretos. Evidência: `carrosseis-independentes.json` na pasta abaixo.
- No quarto carrossel, navegação por Contrast Branca → Areia → Camisa e Short. O botão abriu a página Camisa e Short, cujo segundo ângulo foi exibido (2/3).
- Em largura mobile, o gesto no primeiro carrossel mudou Preto → Branco, preservando os outros três. O botão abriu a página branca correta; seu segundo ângulo foi exibido (2/4).
- Desktop: 1366 × 768, 1440 × 900 e 1920 × 1080. Sempre quatro colunas, duas setas por carrossel e dimensões iguais entre os quatro, sem overflow da página. Mobile: 360, 375, 390 e 430 px, altura 844 px; quatro grupos empilhados, uma capa ativa por grupo e nenhum overflow horizontal.
- Os seis links Explore foram clicados e conferidos tanto na homepage quanto a partir do arquivo de coleções. Todos chegaram aos destinos listados acima.
- `npm run lint`, `npm run typecheck`, `npm test` e `npm run build`: aprovados. **31 testes passaram; 41 páginas geradas.** O teste de apresentação confirma quatro grupos com 4/3/4/4 variações, sem perdas, duplicações entre grupos ou alterações nas galerias.
- `git diff --check`: sem erros. Console do navegador: nenhum aviso ou erro capturado ao final.
- Hero, arquivos audiovisuais/fotográficos, dados originais dos produtos, páginas individuais, formulários, contatos, Fábrica, atendimento e mapas não foram modificados nesta rodada.

Mobile verificado em viewports de navegador Chromium, não em aparelhos físicos ou Safari. Nenhuma mensagem comercial foi enviada.

## Capturas reais

Pasta: `C:/Astra 6/reports/happy-boy-ajustes-finais-2026-10-27/`.

- [Título antes do Dry Fit — desktop](<C:/Astra 6/reports/happy-boy-ajustes-finais-2026-10-27/titulos-desktop.jpg>) · [mobile](<C:/Astra 6/reports/happy-boy-ajustes-finais-2026-10-27/titulos-mobile.jpg>).
- [Quatro carrosséis desktop](<C:/Astra 6/reports/happy-boy-ajustes-finais-2026-10-27/carrosseis-desktop.jpg>) · [outras cores](<C:/Astra 6/reports/happy-boy-ajustes-finais-2026-10-27/carrosseis-outras-cores.jpg>) · [Camisa e Short no quarto grupo](<C:/Astra 6/reports/happy-boy-ajustes-finais-2026-10-27/carrossel-camisa-short.jpg>).
- [Carrosséis mobile](<C:/Astra 6/reports/happy-boy-ajustes-finais-2026-10-27/carrosseis-mobile-390.jpg>).
- [Rodapé desktop](<C:/Astra 6/reports/happy-boy-ajustes-finais-2026-10-27/rodape-desktop.jpg>) · [rodapé mobile](<C:/Astra 6/reports/happy-boy-ajustes-finais-2026-10-27/rodape-mobile.jpg>).

## Arquivos desta rodada

`src/app/page.tsx`; `src/data/collection-presentation.ts`; `src/components/happy-boy/CollectionLookGallery.tsx`, `collection-look-gallery.css`, `EditorialVideoCarousel.tsx`, `Footer.tsx`; `tests/collection-presentation.test.ts`; este relatório e nota histórica no anterior.

**Versão pronta para revisão, sem publicar em produção.**
