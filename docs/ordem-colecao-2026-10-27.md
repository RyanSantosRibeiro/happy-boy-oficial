# Happy Boy — ordem da coleção e retirada das legendas

Correção visual de 27/10/2026, aplicada somente no clone. Prévia: http://localhost:3014/. Nenhuma publicação realizada.

- Ordem: **Coleção Travel Edition → quatro carrosséis fotográficos → Conjunto Dry Fit → quatro vídeos**.
- Retirados os nomes e as cores visíveis abaixo das fotografias, sem reservar o espaço das antigas legendas.
- Mantidos os quatro carrosséis independentes e o botão Ver fotos e detalhes. O destino continua acompanhando a cor selecionada; os nomes permanecem nos rótulos de acessibilidade.
- Galerias individuais, arquivos de mídia, demais seções e rodapé preservados.

Verificação no navegador em 1440 × 1080 e 390 × 844: sequência correta, quatro carrosséis, nenhuma legenda visível e ausência de overflow mobile. A seta do primeiro grupo selecionou Branco e o botão passou a apontar para `/colecao/conjunto-polo-dry-fit-canelado/branco`.

Build de produção e lint dos componentes alterados aprovados. Não foram adicionados testes para esta alteração de apresentação; o funcionamento foi conferido no navegador.

Capturas: [desktop](<C:/Astra 6/reports/happy-boy-ordem-colecao-2026-10-27/colecao-desktop.jpg>) · [mobile](<C:/Astra 6/reports/happy-boy-ordem-colecao-2026-10-27/colecao-mobile.jpg>).

Arquivos: `src/app/page.tsx`, `src/components/happy-boy/CollectionLookGallery.tsx` e `collection-look-gallery.css`.
