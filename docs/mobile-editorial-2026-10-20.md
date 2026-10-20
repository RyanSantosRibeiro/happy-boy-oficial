# Happy Boy — revisão editorial mobile

Prévia local para aprovação: [abrir o site](http://localhost:3010/).

**Status: implementado, validado e aprovado pelo usuário para publicação em 20/10/2026.**

## Direção visual

- A prévia da próxima coleção ocupa uma composição compacta, com fundo desfocado, cadeado e contagem regressiva preservados.
- “Quatro cores. Novos caminhos.” abre uma moldura azul-petróleo contínua com os vídeos, suas legendas e a navegação.
- A seção 01 reúne identificação, título, fotografia completa e CTA em uma composição areia. O título passa a conduzir à fotografia no celular.
- “Outros looks” tem uma abertura editorial mais próxima das fotografias e mantém as variantes e setas existentes.
- O editorial 03 conecta a fotografia à área de texto azul-petróleo e ao encerramento.
- Os CTAs da homepage mobile usam setas vetoriais finas, sem emojis.

## Capturas para revisão

### Vídeos

[Antes](<C:/Astra 6/reports/happy-boy-mobile-editorial-2026-10-20/mobile-videos-before.jpg>) · [Depois](<C:/Astra 6/reports/happy-boy-mobile-editorial-2026-10-20/videos-completo-390.jpg>)

![Vídeos integrados ao título](<C:/Astra 6/reports/happy-boy-mobile-editorial-2026-10-20/videos-completo-390.jpg>)

### Nova coleção

[Antes](<C:/Astra 6/reports/happy-boy-mobile-editorial-2026-10-20/mobile-01-before.jpg>) · [Depois](<C:/Astra 6/reports/happy-boy-mobile-editorial-2026-10-20/editorial-01-completo.jpg>)

![Composição editorial da seção 01](<C:/Astra 6/reports/happy-boy-mobile-editorial-2026-10-20/editorial-01-completo.jpg>)

### Continuidade

[Outros looks](<C:/Astra 6/reports/happy-boy-mobile-editorial-2026-10-20/outros-looks-390.jpg>) · [Editorial 03](<C:/Astra 6/reports/happy-boy-mobile-editorial-2026-10-20/editorial-03-390.jpg>) · [Rodapé](<C:/Astra 6/reports/happy-boy-mobile-editorial-2026-10-20/rodape-final-390.jpg>)

## Verificações

- Navegador responsivo em 320, 360, 375, 390 e 414 px: títulos sem cortes e sem overflow horizontal da página.
- Transição conferida em 760, 768 e 820 px. A nova composição se aplica somente até 760 px.
- Desktop em 1440 px: os 12 blocos comparados mantêm posição, dimensões, tipografia e cores, sem diferenças acima de 0,05 px nas medidas.
- Navegação dos vídeos por controle e arraste horizontal verificada; autoplay sem som, loop e ausência de controles preservados.
- Troca de cor do conjunto Polo, navegação à página interna e retorno pelo logotipo verificados.
- Setas de variantes dos outros looks e painel com as três opções do WhatsApp verificados. Nenhuma mensagem enviada.
- Console do navegador sem erros ou avisos durante a conferência final.
- Build de produção concluído; 20 testes existentes aprovados; ESLint dos arquivos alterados aprovado.

## Escopo técnico

Estilos isolados em `mobile-editorial.css`, dentro de `@media (max-width: 760px)`, vinculados à classe exclusiva da homepage. Setas vetoriais ficam ocultas por padrão e aparecem apenas nessa composição mobile. Os símbolos existentes continuam visíveis no desktop.

Não foram alterados arquivos de mídia, dados de catálogo, hero, menu, mensagens comerciais, lógica dos carrosséis, páginas individuais ou galerias. Publicação autorizada após a revisão visual.

Evidências numéricas: [larguras mobile](<C:/Astra 6/reports/happy-boy-mobile-editorial-2026-10-20/mobile-widths.json>), [transição e desktop](<C:/Astra 6/reports/happy-boy-mobile-editorial-2026-10-20/transicao-e-desktop.json>), [comparação final do desktop](<C:/Astra 6/reports/happy-boy-mobile-editorial-2026-10-20/desktop-final.json>).
