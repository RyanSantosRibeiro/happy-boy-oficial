# Happy Boy — refinamento premium da Travel Edition

> Registro da rodada anterior. A galeria e o rodapé foram posteriormente refinados conforme [a rodada de 27/10](refinamento-editorial-2026-10-27.md), que substitui as orientações conflitantes deste documento.

Versão local pronta para aprovação em 26/10/2026. Prévia: http://localhost:3012/.
Base: `66e855e446e6ea71f2109f1a1461c25f6904076a`. Branch: `feat/travel-premium-refinement-2026-10-26`.
Nenhum deploy, push ou substituição da versão pública foi realizado nesta tarefa.

## Alterações implementadas

1. Quatro CTAs do hero com o mesmo neon #EBF308, tipografia, seta SVG, dimensões e estados de interação. Em notebook 1366 × 768: 360 × 44 px; em 1440 e 1920: 390 × 48 px. No celular: largura disponível e 50 px de altura.
2. “Uma marca. Uma parceria de longo prazo.” com título e CTA à esquerda e área 16:9 “EM BREVE” à direita. O texto desde 1998 está concentrado no rodapé.
3. Faixa animada original extraída e reutilizada imediatamente após o hero. Uma única instância na homepage; distância medida entre hero e faixa: zero.
4. Sequência: hero → faixa → vídeo vertical temporário → prévia existente → abertura Travel Edition → quatro vídeos existentes → fotografias → áreas institucionais/comerciais. A abertura lê o nome da coleção no catálogo. Nenhuma segunda contagem foi criada.
5. Quatro cores de Conjunto Polo Dry Fit Canelado lado a lado, cada uma com carrossel de seus próprios ângulos. Outra linha contém os quatro looks Polo e Short. A linha Polo e Calça conserva os três looks reais cadastrados; não foi inventado um quarto. Contrast recebe Camisa e Short como composição editorial, conservando nome, família comercial, fotos e página próprios. Camiseta e Bermuda continua acessível no arquivo e em link abaixo de Contrast.
6. “Estilo que acompanha você” mais compacto, mantendo a fotografia e o acesso ao look.
7. Botões de visita comercial e showroom com contorno neon fino, fundo petróleo e hover neon. Mesma altura de 48 px e destinos independentes.
8. Formulário com bordas discretas, cantos suaves, seleção petróleo com detalhe neon e CTA principal neon. Campos, regras, mensagens e preparação do WhatsApp preservados.
9. Removida a unidade desativada da configuração, contagem, cards, mapas e documentação anterior. Permanecem apenas Pátio Central e Shopping Fortaleza Sul, com cards maiores, mapas Google reais carregados automaticamente na proximidade e links específicos. Há fallback com endereço/link em caso de falha.
10. Rodapé petróleo com colunas equilibradas, texto institucional aprovado e CTA WhatsApp neon com seta SVG. Fábrica recebe título, dois parágrafos e CTA à esquerda, e “EM BREVE” 16:9 à direita.
11. Menu: Coleções | Fábrica | Atendimento | Lojas | Sobre nós. Arquivo independente mantido e acessível.

## Vídeo temporário

Fonte: `C:/Users/Loyola/Downloads/IMG_8678.MOV`, preservada integralmente.
Incluída cópia web local em `public/videos/institutional/happyboy-apresentacao-vertical.mp4` e capa correspondente.
O original HLG/HEVC foi convertido para H.264/BT.709/AAC compatível com navegadores: 1080 × 1920, 30 fps, duração integral de 140,37 s, aproximadamente 64 MB. Sem cortes, mudança de velocidade, reenquadramento ou alteração da narrativa. A transformação de cor HDR para SDR é técnica, necessária para reprodução consistente.
O vídeo ocupa proporção 9:16 com `object-fit: contain`, controles nativos e carregamento `preload="none"`. Não inicia com som nem reprodução automática. No celular, a altura está limitada a 66svh. O hero e os quatro vídeos da coleção não tiveram seus arquivos alterados.
Reprodução real iniciada no navegador, metadados 1080 × 1920 / 140,37 s confirmados, tempo avançou e não houve erro de mídia. O vídeo foi pausado após o teste.

## Destinos conferidos

| Entrada | Destino |
| --- | --- |
| Coleções | `/#colecao-atual` — abertura Travel Edition |
| Fábrica | `/#fabrica` — Muito além de uma peça de roupa |
| Atendimento | `/#visitas` — representante e showroom |
| Lojas | `/#lojas` — dois cards com mapas |
| Sobre nós | `/#sobre-nos` — Uma marca. Uma parceria de longo prazo |
| Quero comprar no atacado | `#atendimento-atacado`, modalidade atacado |
| Receber representante / Solicitar visita comercial | `#atendimento-representante`, campo de endereço |
| Agendar showroom | `#atendimento-showroom`, campo de preferência |
| Conhecer nossas lojas | `#lojas` |
| Conhecer operação | `#atendimento-operacao`, modalidade showroom com indicação de operação preservada |
| Ver fotos e detalhes | Página original do produto e da cor |
| Logotipo | `/#top` |

Os cinco itens foram clicados no desktop; Coleções também no menu mobile. O retorno do arquivo `/colecoes` para a Fábrica da homepage foi confirmado. A página interna do Polo Preto foi aberta, seu segundo ângulo selecionado, e o logotipo retornou ao início.
As URLs do WhatsApp continuam usando o número já configurado no projeto. Uma mensagem de showroom foi preparada com dados fictícios locais e conferida. Nenhuma mensagem foi enviada.

## Verificações executadas

- Build de produção Next.js concluído: 41 páginas geradas, TypeScript válido.
- ESLint de `src` e `tests`: sem erros ou avisos.
- 31 testes automatizados passaram, incluindo separação das galerias, classificação comercial, arquivos locais, modalidades, validação e mensagens comerciais.
- 38 rotas públicas responderam HTTP 200 na prévia local; lista em `rotas.json`.
- `git diff --check`: sem erros de whitespace.
- Desktop real no navegador com viewports 1366 × 768, 1440 × 900 e 1920 × 1080. Quatro botões iguais, quatro colunas, uma faixa, sem overflow horizontal.
- Mobile no navegador com larguras 360, 375, 390 e 430 px, altura 844 px. Sem overflow horizontal; vídeo 280 × 497,77 px; campos entre 48 e 50 px de altura; quatro CTAs de 50 px. Em 360/375, campos/opções reorganizados para maior conforto.
- Swipe do carrossel de vídeos: Branco → Verde, uma única ficha centralizada, scroll horizontal interno de 0 → 347 px. Swipe da fotografia do Polo Preto: 1 → 2 de 3. Ativação da seta pelo teclado também alterou o ângulo.
- Os dois mapas reais apareceram automaticamente no desktop e no mobile, com os pins de Pátio Central e Shopping Fortaleza Sul. Links preservam os endereços completos solicitados.
- Validação de formulário vazio exibiu erros nos campos corretos. Visita comercial e showroom ativaram seus respectivos campos condicionais. Mensagem completa de showroom preparada sem transmissão.
- Console do navegador: nenhum erro ou aviso capturado ao final.
- Conferido diff sem alterações nos arquivos originais do hero, vídeos da coleção, fotografias, catálogo/famílias, páginas individuais e lógica do formulário.

Os testes mobile foram realizados em viewports de navegador Chromium; não representam ensaio em aparelhos físicos ou Safari. O fallback de mapas está implementado, mas não foi provocado bloqueio artificial de rede durante esta revisão.

## Capturas reais

Pasta de evidências: `C:/Astra 6/reports/happy-boy-premium-2026-10-26/`.

- [Hero 1366](<C:/Astra 6/reports/happy-boy-premium-2026-10-26/hero-1366.jpg>) · [1440](<C:/Astra 6/reports/happy-boy-premium-2026-10-26/hero-1440.jpg>) · [1920](<C:/Astra 6/reports/happy-boy-premium-2026-10-26/hero-1920.jpg>).
- [Quatro looks desktop](<C:/Astra 6/reports/happy-boy-premium-2026-10-26/looks-desktop.jpg>) · [Polo/Short](<C:/Astra 6/reports/happy-boy-premium-2026-10-26/polo-short-desktop.jpg>) · [Contrast](<C:/Astra 6/reports/happy-boy-premium-2026-10-26/contrast-desktop.jpg>).
- [Sobre](<C:/Astra 6/reports/happy-boy-premium-2026-10-26/sobre-desktop.jpg>) · [Fábrica](<C:/Astra 6/reports/happy-boy-premium-2026-10-26/fabrica-desktop.jpg>) · [Atendimento](<C:/Astra 6/reports/happy-boy-premium-2026-10-26/atendimento-desktop.jpg>) · [Formulário](<C:/Astra 6/reports/happy-boy-premium-2026-10-26/formulario-desktop.jpg>) · [Lojas](<C:/Astra 6/reports/happy-boy-premium-2026-10-26/lojas-desktop.jpg>) · [Rodapé](<C:/Astra 6/reports/happy-boy-premium-2026-10-26/rodape-desktop.jpg>).
- [Hero mobile 360](<C:/Astra 6/reports/happy-boy-premium-2026-10-26/hero-mobile-360.jpg>) · [375](<C:/Astra 6/reports/happy-boy-premium-2026-10-26/hero-mobile-375.jpg>) · [390](<C:/Astra 6/reports/happy-boy-premium-2026-10-26/hero-mobile-390.jpg>) · [430](<C:/Astra 6/reports/happy-boy-premium-2026-10-26/hero-mobile-430.jpg>).
- [Coleção mobile](<C:/Astra 6/reports/happy-boy-premium-2026-10-26/colecao-mobile.jpg>) · [Fotos mobile](<C:/Astra 6/reports/happy-boy-premium-2026-10-26/looks-mobile.jpg>) · [Vídeo 9:16](<C:/Astra 6/reports/happy-boy-premium-2026-10-26/video-mobile.jpg>) · [Formulário mobile](<C:/Astra 6/reports/happy-boy-premium-2026-10-26/formulario-mobile.jpg>) · [Lojas mobile](<C:/Astra 6/reports/happy-boy-premium-2026-10-26/lojas-mobile.jpg>) · [Rodapé mobile](<C:/Astra 6/reports/happy-boy-premium-2026-10-26/rodape-mobile.jpg>).

## Arquivos

Novos: `CollectionLookRows.tsx`, `CollectionMarquee.tsx`, `ComingSoonFilm.tsx`, `TemporaryPresentation.tsx`, `premium-refinement.css` em `src/components/happy-boy/`; `src/data/collection-presentation.ts`; `tests/collection-presentation.test.ts`; MP4 e capa em `public/videos/institutional/`; este relatório.

Alterados: `src/app/page.tsx`; `DryFitEditorialCarousel.tsx`, `EditorialVideoCarousel.tsx`, `Footer.tsx`, `Header.tsx`, `PhysicalStores.tsx`, `WholesaleSections.tsx` em `src/components/happy-boy/`; `src/data/wholesale-landing.ts`; `tests/commercial-lead.test.ts`; `docs/landing-atacado-2026-10-26.md`.

## Materiais futuros

Vídeos definitivos da marca e da operação ainda não foram fornecidos: as duas reservas “EM BREVE” estão prontas para recebê-los por configuração. Depoimentos e mídia adicional de operação continuam vazios, sem conteúdo fictício. O vídeo temporário solicitado já está incluído. Publicação aguarda aprovação do usuário.
