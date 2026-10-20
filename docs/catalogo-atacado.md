# Catálogo digital de atacado — operação e entrega

Implementação validada localmente e aprovada para publicação pelo responsável em 19/10/2026.

## O que mudou

- Cabeçalho: **Coleções → /colecoes** e **Sobre nós → /#sobre-nos**.
- Índice editorial de coleções e página própria de Travel Edition com oito famílias,
  filmes oficiais e acesso às 21 galerias existentes.
- Todas as galerias usam **Ver catálogo**, **Falar com o vendedor** e
  **Quero solicitar uma visita de um representante na minha loja**.
- As três ações abrem o WhatsApp oficial. A primeira solicita o catálogo da família
  comercial, sem a cor selecionada; a terceira solicita o agendamento de uma visita.
- WhatsApp global e do rodapé tratam das coleções e das condições de atacado.
- O WhatsApp fixo mantém texto visível em todas as páginas, inclusive galerias.
  Ao clicar, abre um painel com as três ações aprovadas, explicações curtas e
  botão “Fechar”. O hero recebe um único botão “Fale pelo WhatsApp” abaixo do logotipo que abre o mesmo
  painel. Não há abertura automática nem envio de mensagens sem ação do visitante.
- Refinamento na prévia para revisão: chamada do hero em off-white com ícone neon
  e indicação “Clique para ver as opções”; “Explore a coleção” retirado do banner para não disputar
  espaço com o atendimento fixo no desktop.
- Rodapé mantém azul-petróleo e recebe o texto institucional marcado como provisório.
- Orientações visíveis nas fotos, vídeos, galerias e páginas de coleções indicam
  quando o clique abre uma página da peça, troca um ângulo ou leva ao WhatsApp.
- A seção 03 é **Editorial da coleção**. **Sobre nós** identifica somente o bloco
  institucional no rodapé azul-petróleo, com o mesmo destino do menu.
- Prévia da próxima coleção acima dos quatro vídeos: imagem ilustrativa desfocada,
  cadeado e contagem regressiva para 01/11/2026 às 00h, horário de Brasília.
- Os arquivos audiovisuais, fotografias, miniaturas, rotas antigas e lógica das
  galerias foram preservados. O hero recebe os mesmos dados pelo registro da coleção;
  seu vídeo, cortes, textos, animação e reprodução não foram modificados.
- As oito páginas ilustrativas antigas `/produto/...` continuam acessíveis, com
  atendimento por categoria e sem exibir valores ou “Preço a definir”. Não entram
  no catálogo de coleções aprovadas e não foram promovidas como uma nova coleção.
- Coleções em rascunho também bloqueiam o acesso direto às suas novas galerias e
  produtos; ocultar apenas o cartão no índice não seria suficiente.

## Famílias comerciais confirmadas

| Família | Páginas existentes |
|---|---|
| Linha Dry Fit | `/colecao/preto`, `/verde`, `/branco`, `/azul` |
| Conjunto Polo Dry Fit Canelado | `/colecao/conjunto-polo-dry-fit-canelado/{preto,branco,bege,verde}` |
| Conjuntos Polo e Short | `/colecao/polo-short/{verde,cinza,amarelo-claro,azul-claro}` |
| Conjuntos Camisa e Short | `/colecao/camisa-short` |
| Conjuntos Polo e Calça | `/colecao/polo-essential/{marrom,branco,vinho}` |
| Conjuntos Camisa e Calça | `/colecao/camisa-clara` |
| Linha Camiseta Contrast | `/colecao/camiseta-contrast/{preta,branca,areia}` |
| Conjuntos Camiseta e Bermuda | `/colecao/camiseta-bermuda` |

O look Camiseta e Bermuda compartilha um carrossel visual com Camiseta Contrast,
mas mantém sua família comercial própria. O Polo Dry Fit Canelado também continua
separado da linha Dry Fit de camisetas. Os produtos ilustrativos antigos têm
categorias genéricas de polos, camisas, camisetas, calças e bermudas, sem supor
conjuntos que suas fichas não confirmam.

## Novas rotas e páginas afetadas

Novas: `/colecoes` e `/colecoes/travel-edition` (rota dinâmica `/colecoes/[slug]`).
Afetadas: homepage, 21 galerias, oito páginas ilustrativas `/produto/[slug]` e
redirecionamentos já existentes para galerias de polos. As URLs antigas não mudam.

## Como trocar a coleção principal

O registro está em `src/data/catalog.ts`, na lista `catalogCollections`.

1. Adicionar os dados da nova coleção: `id`, `slug`, `name`, `description`, `cover`,
   `status`, `order`, `featured`, `lines` e `presentation`.
2. Em `presentation`, configurar hero desktop/mobile e capas, textos, faixa de
   benefícios, filmes na ordem aprovada, fotos e links do carrossel principal,
   seleção de famílias e fotografia editorial. Reutilizam os componentes existentes.
3. Associar cada nova galeria/produto ao `collectionId` e `commercialFamilyId`
   corretos. Não reutilizar slugs antigos para peças diferentes.
4. Durante a preparação, manter `status: "draft"` e `featured: false`.
5. Após aprovação, usar `status: "published"`, `featured: true` e retirar apenas
   `featured` da coleção anterior, mantendo-a publicada e preservando seus produtos.
6. O build exige exatamente uma coleção publicada em destaque. Nenhuma data troca
   a coleção automaticamente. Revisar a prévia e publicar somente com autorização.

Coleções anteriores seguem disponíveis em `/colecoes/{slug}`. Seus links de produto
continuam válidos e “Voltar à coleção” passa a retornar ao catálogo da coleção antiga.
Novos produtos usam as rotas já existentes, com a inclusão de seus registros de dados
e parâmetros estáticos; nenhuma reconstrução visual é necessária.

## Como adicionar novidades semanais

Editar `src/data/weekly-launches.ts`. A lista contém o teaser autorizado pelo
responsável, com `releaseAt: "2026-11-01T00:00:00-03:00"`. A imagem é um placeholder
ilustrativo da campanha atual, desfocado; não representa uma peça futura confirmada.
Não há link nem desbloqueio automático. Ao zerar, o contador aguarda a divulgação.
Para mostrar o material real, editar o registro após sua aprovação.

Cada registro contém `id`, `collectionId`, `status`, `mode`, `title`, `description`,
`href`, `linkLabel` e, opcionalmente, `media` com `type`, `src`, `alt` e `poster`.

- `mode: "launch"` exibe **Lançamentos da semana**.
- `mode: "preview"` exibe **Prévia do próximo lançamento**.
- `status: "draft"` não aparece. Publicar manualmente somente material aprovado.
- `collectionId` define em qual homepage de coleção o anúncio aparece.
- Fotos e vídeos devem ser oficiais, locais e autorizados. O destino deve existir.
- Sem mídia, o módulo funciona com texto e link. Vídeos opcionais usam controles e
  `preload="none"`, evitando downloads desnecessários antes da interação.

## Como editar as ações de WhatsApp

`src/data/commercial.ts` concentra o número oficial, os textos gerais, o contato com
vendedor, os nomes/assuntos das famílias e a configuração da terceira ação.

`src/lib/wholesale.ts` contém o único gerador de mensagens de consulta de linha e o
construtor de URLs. Alterar o modelo ali atualiza todas as cores da mesma família.

A terceira ação foi definida pelo responsável como solicitação de visita de um
representante à loja. `thirdCommercialAction` está ativada e usa o mesmo número
oficial, com a mensagem: “Olá! Quero solicitar uma visita de um representante da
Happy Boy na minha loja. Como posso agendar?”

Título, mensagem e destino permanecem centralizados nessa configuração. O envio
da mensagem depende do visitante. Nenhum agendamento é confirmado automaticamente.

O catálogo solicitado pelo painel global acompanha a coleção em destaque, via
`catalogRequestMessage` em `src/lib/wholesale.ts`. Vendedor e visita reutilizam
exatamente as mensagens e o contato das ações internas. O painel é compartilhado
pelo layout raiz, sem duplicar botões ao navegar entre páginas. Usa diálogo nativo
com foco contido, Escape, retorno ao botão de origem e fechamento fora do painel.
As cores e a consulta por família nas páginas individuais permanecem preservadas.

## Texto institucional

Editar `institutionalCopy` em `src/data/commercial.ts`. Substituir o texto provisório
pelo oficial e alterar `provisional` para `false` somente após aprovação.
O identificador estável é `sobre-nos`, com margem de rolagem para manter a leitura.

## Arquivos

Novos dados/regras: `src/data/{catalog,commercial,weekly-launches}.ts`,
`src/lib/wholesale.ts`.

Novas interfaces: `src/app/colecoes/page.tsx`, `src/app/colecoes/[slug]/page.tsx`,
`src/components/happy-boy/{CommercialActions,WeeklyLaunches}.tsx`,
`src/components/happy-boy/{catalog,commercial-actions}.css`.

Dados adaptados: `src/data/{collection,collection-families,editorial-looks,
lifestyle-galleries,polo-canelado,products,storefront}.ts` e
`src/lib/product-consultation.ts`.

Proteção de publicação nas rotas: `src/app/colecao/[cor]/page.tsx` e
`src/app/colecao/[cor]/[variacao]/page.tsx`.

Interfaces adaptadas: `src/app/{page,layout}.tsx`, `src/app/produto/[slug]/page.tsx`,
`src/components/happy-boy/{CampaignHero,Header,Footer,WhatsAppButton,CollectionGallery,
LifestyleGallery,ProductConsultationButton,EditorialVideoCarousel,CollectionGrid,
DryFitEditorialSection,DryFitEditorialCarousel,AboutSection}.tsx`.

Testes: `tests/wholesale-catalog.test.ts`, `tests/product-consultation.test.ts`,
`tests/polo-canelado.test.ts`. Este documento: `docs/catalogo-atacado.md`.

## Validação

- 20 testes automatizados: classificação comercial, invariância entre cores,
  URLs/encoding, solicitação de visita ao contato oficial, filtros de publicação, troca manual
  de destaque e manutenção do acervo, mídias oficiais e teaser autorizado; contador
  com fuso de Brasília e término sem valores negativos.
- TypeScript, ESLint e build de produção local.
- 39 rotas públicas verificadas por HTTP, todas com resposta 200 (incluindo
  redirecionamentos existentes); coleção não publicada retorna 404.
- Navegador: 21 galerias com 88 miniaturas mantidas. As três ações comerciais
  compartilham o componente central, com mensagens próprias.
- Viewports de 1440, 1280, 768, 390 e 320 px; sem overflow nos cenários verificados.
- Em 1280 px, três colunas; em 390/320 px, ações em linhas com pelo menos 60 px
  de altura. Tablet mantém três colunas legíveis.
- Menu mobile, navegação de Coleções e Sobre nós desde página interna conferidos.
- Nenhum arquivo em `public/` alterado. Não foram adicionadas dependências.

Evidências locais e resultados detalhados: `C:/Astra 6/reports/happy-boy-atacado-2026-10-19/`.
Testes por emulação de viewport no navegador, sem afirmar validação em aparelhos
físicos. Links de WhatsApp foram inspecionados sem enviar mensagens.

## Pendências de conteúdo

1. Texto institucional definitivo da marca.
2. Material real da próxima coleção para substituir o teaser ilustrativo autorizado.
3. Revisar e aprovar novos conteúdos antes de futuras publicações em produção.
