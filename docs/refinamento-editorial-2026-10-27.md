# Happy Boy — galeria editorial e novo rodapé

> Registro histórico: a fileira única foi substituída pelos [três ajustes finais](ajustes-finais-travel-2026-10-27.md), conforme nova orientação do proprietário.

Rodada iniciada em 26/10 e concluída em 27/10/2026, sobre o clone existente. Substitui as orientações de múltiplas fileiras e de rodapé petróleo da rodada anterior.

Prévia local: http://localhost:3013/. Nenhum deploy ou push realizado.

## Resultado

- A abertura dos vídeos agora apresenta **01 / TRAVEL EDITION — Conjunto Dry Fit**, com a tipografia editorial existente. Removidos os blocos de abertura e a frase redundante indicados na solicitação. Os quatro filmes, seus arquivos, ordem e links foram preservados.
- Após os vídeos, **Coleção Travel Edition** apresenta uma única fileira horizontal. Há **15 itens**, uma capa por variação: quatro Polo Dry Fit Canelado (Preto, Branco, Bege, Verde), três Polo Essential (Marrom, Branco, Vinho), quatro Polo e Short (Verde-escuro, Cinza, Amarelo-claro, Azul-claro), três Camiseta Contrast (Preta, Branca, Areia) e um Camisa e Short.
- As capas, nomes, cores e rotas vêm do catálogo existente. Camisa e Short permanece uma família comercial própria. As fotografias secundárias não foram excluídas nem misturadas: continuam nas páginas individuais.
- A fileira possui um único par de setas, indicador de posição, arraste com mouse, rolagem horizontal com snap e teclado (setas, Home e End). Não há controles individuais sobre as fotos, clones para preencher espaço, rotação automática ou retorno circular ao começo. No desktop aparecem quatro cartões; no celular, um cartão por vez, alinhado após o gesto. Os controles mobile ficam à esquerda para não coincidir com o WhatsApp flutuante.
- As imagens têm proporção estável 2:3, preenchimento sem distorção/corte do arquivo, tamanhos responsivos, otimização Next e carregamento lazy. Não são carregadas como originais de resolução máxima.
- Removida a seção “Uma marca. Uma parceria de longo prazo.”, seu CTA e sua reserva institucional. **Fábrica** e seu **EM BREVE** foram preservados.
- Rodapé compartilhado em **preto #000000**, com três áreas: logo oficial e texto institucional abaixo; Explore; atendimento comercial. Removidas a coluna de cores Dry Fit e a faixa institucional duplicada. Preservados o WhatsApp, Instagram e acesso ao arquivo de coleções. “Sobre nós” do rodapé aponta para o texto abaixo do próprio logotipo.
- Barra inferior: monograma oficial HB e nome dinâmico da coleção à esquerda; Voltar ao topo centralizado; direitos à direita. No mobile, disposição vertical. Espaço inferior protege a barra do atendimento flutuante.
- Menu desktop e mobile: **Coleções | Fábrica | Atendimento | Lojas**. No desktop, o grupo está centralizado na área útil da tela, independentemente da largura do logo.

## Navegação conferida

| Ação | Destino |
| --- | --- |
| Coleções | `/#collection` — Coleção Travel Edition |
| Fábrica | `/#fabrica` — Muito além de uma peça de roupa |
| Atendimento | `/#visitas` — A Happy Boy mais perto do seu negócio |
| Lojas | `/#lojas` — mapas das duas unidades ativas |
| Sobre nós, no rodapé | `#institucional-resumo`, abaixo do logo |
| Voltar ao topo / logo | `/#top` |
| Foto / Ver fotos e detalhes | Página original daquele modelo e cor |
| Arquivo de coleções | `/colecoes`, preservado |

Os quatro links foram acionados no desktop e no menu mobile. O arquivo foi aberto e seu menu retornou à galeria da homepage. As âncoras antigas `#colecao-atual` e `#dry-fit` continuam como aliases da galeria, preservando retornos existentes.

## Validação executada

- `npm run lint`: passou, sem avisos ou erros.
- `npm run typecheck`: passou.
- `npm test`: **31 testes passaram**. O teste de apresentação verifica os 15 destinos/capas únicos, as cores corretas, a classificação independente de Camisa e Short e a integridade das galerias e arquivos. Regras e mensagens comerciais continuam cobertas pelos testes existentes.
- `npm run build`: passou; **41 páginas geradas**. Um bloqueio de permissão do Windows na pasta temporária do Next foi resolvido executando o build local com a permissão adequada.
- `git diff --check`: sem erros de whitespace.
- **39 rotas** verificadas com HTTP 200 na prévia compilada, incluindo todos os produtos. Evidência em `rotas.json`.
- Desktop: **1366 × 768, 1440 × 900, 1920 × 1080**. Sem overflow; 15 fotos/15 itens; zero botões nos cartões; quatro links no menu; três colunas no rodapé; preto confirmado. O centro do menu coincidiu com o centro da área útil; Voltar ao topo teve diferença inferior a 0,01 px.
- Mobile: **360, 375, 390 e 430 px**, altura 844 px. Sem overflow da página. Cartão e trilho com a mesma largura: 305/320/335/375 px. Rodapé em uma coluna principal, Explore em duas subcolunas e barra inferior vertical.
- Setas gerais: avanço de `01–04 / 15` para `02–05 / 15`. Teclado End chegou a `12–15 / 15` e desabilitou a seta seguinte. Arraste por mouse voltou a `10–13 / 15` sem abrir uma página acidentalmente. Gesto mobile avançou de Preto para Branco, com alinhamento final do trilho em 355 px.
- Páginas abertas pela galeria e segundo ângulo acionado: Polo Canelado Preto (2/3), Polo Essential Marrom (2/4), Polo e Short Verde-escuro (2/6), Contrast Areia (2/3), Camisa e Short (2/3).
- Os dois mapas Google apareceram automaticamente e mantêm Pátio Central e Shopping Fortaleza Sul. Vídeo temporário segue sem autoplay; os quatro filmes seguem com autoplay, muted e loop, nas fontes originais.
- Arquivos do hero, vídeos originais, fotografias, catálogo/famílias, páginas de produto, formulário e regras comerciais não foram alterados nesta rodada. O rodapé compartilhado foi atualizado nas páginas que já o utilizavam.

Os testes mobile usam viewports de navegador Chromium. Não houve ensaio em aparelho físico ou Safari. Nenhuma mensagem foi enviada ao WhatsApp. O filme real da fábrica continua pendente; o espaço EM BREVE foi mantido conforme solicitado.

## Capturas reais e demonstração

Pasta: `C:/Astra 6/reports/happy-boy-editorial-2026-10-26/`.

- [Galeria desktop 1366](<C:/Astra 6/reports/happy-boy-editorial-2026-10-26/galeria-desktop-1366.jpg>) · [1440](<C:/Astra 6/reports/happy-boy-editorial-2026-10-26/galeria-desktop-1440.jpg>) · [1920](<C:/Astra 6/reports/happy-boy-editorial-2026-10-26/galeria-desktop-1920.jpg>).
- Demonstração da mesma fileira: [primeiros quatro looks](<C:/Astra 6/reports/happy-boy-editorial-2026-10-26/galeria-desktop-1440.jpg>) → [últimos quatro looks](<C:/Astra 6/reports/happy-boy-editorial-2026-10-26/galeria-final-desktop.jpg>).
- [Mobile 360](<C:/Astra 6/reports/happy-boy-editorial-2026-10-26/galeria-mobile-360.jpg>) · [375](<C:/Astra 6/reports/happy-boy-editorial-2026-10-26/galeria-mobile-375.jpg>) · [390](<C:/Astra 6/reports/happy-boy-editorial-2026-10-26/galeria-mobile-390.jpg>) · [430](<C:/Astra 6/reports/happy-boy-editorial-2026-10-26/galeria-mobile-430.jpg>) · [após deslizar](<C:/Astra 6/reports/happy-boy-editorial-2026-10-26/galeria-mobile-deslize.jpg>).
- [Dry Fit desktop](<C:/Astra 6/reports/happy-boy-editorial-2026-10-26/dry-fit-desktop.jpg>) · [Dry Fit mobile](<C:/Astra 6/reports/happy-boy-editorial-2026-10-26/dry-fit-mobile.jpg>) · [Menu mobile](<C:/Astra 6/reports/happy-boy-editorial-2026-10-26/menu-mobile.jpg>).
- [Rodapé completo desktop](<C:/Astra 6/reports/happy-boy-editorial-2026-10-26/rodape-completo.jpg>) · [rodapé mobile: início](<C:/Astra 6/reports/happy-boy-editorial-2026-10-26/rodape-mobile-inicio.jpg>) · [rodapé mobile: atendimento e barra inferior](<C:/Astra 6/reports/happy-boy-editorial-2026-10-26/rodape-mobile-final.jpg>).

## Arquivos desta rodada

- `src/app/page.tsx`: troca das fileiras pela galeria única, título Dry Fit e remoção institucional.
- `src/components/happy-boy/CollectionLookGallery.tsx` e `collection-look-gallery.css`: nova apresentação horizontal, interação e acessibilidade, substituindo `CollectionLookRows.tsx` da rodada anterior.
- `src/data/collection-presentation.ts`: lista única derivada dos dados reais, sem reclassificação de produtos.
- `src/components/happy-boy/EditorialVideoCarousel.tsx`: título editorial opcional, preservando a reprodução e os usos anteriores.
- `src/components/happy-boy/Header.tsx` e `navigation-editorial.css`: quatro destinos e centralização.
- `src/components/happy-boy/Footer.tsx` e `footer-editorial.css`: três áreas, institucional sob logo, preto e barra inferior.
- `src/components/happy-boy/WholesaleSections.tsx`: retirada do componente institucional removido; Fábrica e atendimento preservados.
- `src/components/happy-boy/premium-refinement.css`: retirada dos estilos obsoletos das fileiras e do rodapé anterior; demais ajustes aprovados mantidos.
- `tests/collection-presentation.test.ts`: validação dos 15 itens únicos e preservação comercial.
- Este relatório e nota de supersessão no relatório anterior.

**Pronta para aprovação. Não publicada.**
