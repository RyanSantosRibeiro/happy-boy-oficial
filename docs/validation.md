# Registro de validação — 1 de outubro de 2026

## Verificações executadas

- TypeScript: sem erros.
- ESLint: sem erros.
- Build de produção do Next.js 16.3.8: concluído, página inicial pré-renderizada.
- Verificação da versão de produção: título, altura de 500svh, navegação, restauração do scroll e stage sticky único, sem erros de console ou hydration.
- 12 testes da timeline: limites de capítulos, continuidade, monotonicidade, retorno, ausência de texto durante transformações, hold, encerramento e protótipo de dois looks.
- Navegador Microsoft Edge/Chromium: viewports 1440×900, 768×1024, 375×667, 320×568 e 844×390.
- Hero com exatamente cinco alturas de viewport, um único stage sticky, navegação nos cinco looks, quatro transições sem informações visíveis, scroll reverso, âncoras, detalhes expansíveis e menu por teclado.
- Sem overflow horizontal, sobreposição entre título e CTA, erros de console, erros de hydration ou falhas de rede na página de prévia nos cenários acima.
- Movimento reduzido: sem stage sticky e sem download do vídeo; seleção manual dos looks. Resize e mudança da preferência reconstroem o stage apenas quando o movimento volta a ser permitido.
- Recarregar a página no quarto look mantém posição e informações correspondentes. A sincronização no refresh é explícita em `useHeroTimeline`.

## Controle de mídia

Um vídeo sintético MP4 de aproximadamente três segundos foi criado somente para diagnóstico local. Quinze verificações passaram: lazy loading, seleção de uma fonte, aplicação do alvo anterior aos metadados, avanço e retorno, agrupamento de 201 pedidos rápidos, pausa sem buscas contínuas, troca desktop/mobile, preferência de movimento, falha e recuperação de fonte, desmontagem e remontagem, ausência de erros de execução. O hero agora usa `public/videos/background.mp4`, um filme H.264 de 10 segundos fornecido para a integração.

O vídeo sintético e a rota temporária de teste **não fazem parte da campanha ou do build final**. Os resultados do diagnóstico local ficam em `.qa`, pasta ignorada pelo Git.

## Limites

O projeto ainda não contém o filme SEA SKY definitivo: o hero usa uma prévia de movimento baseada nas duas fotos fornecidas. A fluidez, os pontos precisos das transformações, a fidelidade das peças e a sincronização artística precisam ser conferidos com o arquivo final. As simulações de viewport não substituem testes em Safari/iOS físico, rede móvel e aparelhos de menor desempenho.

O protótipo continua com fotografias, nomes e textos provisórios, sem preços comerciais e sem logotipo oficial. Nenhum site foi publicado.
