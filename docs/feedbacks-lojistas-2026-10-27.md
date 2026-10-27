# Seção 05 — Feedbacks de lojistas

Implementada no clone para revisão, sem publicar em produção.

- Inserida entre a Fábrica e o atendimento ao lojista, com título e descrição solicitados.
- Três espaços reservados 16:9, exibindo somente “EM BREVE”, sem players, nomes ou depoimentos inventados.
- Três colunas no desktop; no celular, um quadro e uma pequena prévia do seguinte. Rolagem horizontal nativa, teclado e setas com limites reais, sem clones ou navegação circular.
- Quando os três quadros cabem no desktop, ambas as setas ficam desabilitadas. No celular, os controles desabilitam no início e no fim.
- Botão “Quero falar com o comercial” usa o destino existente `/#atendimento-atacado`.
- Atendimento ao lojista renumerado para 06 e formulário “Vamos conversar” para 07. Nenhuma lógica dos formulários foi alterada.

## Inserção dos vídeos reais

O cadastro está em `src/data/retailer-feedbacks.ts`. Substituir os espaços reservados por conteúdo autorizado, preservando IDs estáveis. Cada item aceita `video.src`, `video.poster`, `video.durationSeconds`, `merchantName`, `location` e `quote`.

Somente itens com vídeo recebem um player nativo, sem autoplay e com `preload="none"`. A identificação, localização, citação e duração são opcionais e só aparecem se fornecidas junto ao vídeo. A duração deve corresponder ao arquivo real. Não é necessário mudar o layout ou o componente para adicionar depoimentos.

## Validação

- Lint, typecheck, 31 testes existentes e build aprovados; 41 páginas geradas.
- Navegador: larguras 360, 390, 430, 760, 1366, 1440 e 1920 px, sem overflow horizontal da página.
- Os três quadros mantiveram proporção 16:9 e texto centralizado (diferença medida de até 0,01 px entre os centros).
- Setas avançaram e retornaram; último item desabilitou o avanço e primeiro item desabilitou o retorno. Rolagem horizontal nativa e teclado também verificados. Teste feito em navegador, sem aparelho físico.
- CTA selecionou o atendimento de atacado. Links de representante e showroom continuaram selecionando suas opções corretas no formulário. Nenhuma mensagem enviada.
- Console sem erros ou avisos capturados.
- Hero, dados das coleções, páginas individuais, Fábrica, WhatsApp, mapas e rodapé preservados nesta intervenção. As setas mobile do carrossel Dry Fit da rodada anterior continuam na prévia.

Capturas: `C:/Astra 6/reports/happy-boy-feedbacks-2026-10-27/desktop.jpg` e `mobile.jpg`.
