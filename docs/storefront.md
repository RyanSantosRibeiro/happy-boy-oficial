# Vitrine Happy Boy — página atual

Atualizado em 6 de outubro de 2026.

## Estrutura

`src/app/page.tsx` mantém a composição como Server Component: CampaignHero → EditorialVideoCarousel existente → ProductShowcase com banner à esquerda → CollectionGrid existente → ProductShowcase com banner à direita → InstagramSection → AboutSection → Footer. WhatsAppButton fica fixo na janela.

`CampaignHero`, `Header` e `ProductSlider` concentram as interações novas. O slider usa rolagem horizontal nativa com scroll snap, setas, teclado e dois produtos visíveis; não adiciona dependências. No mobile, os dois banners aparecem acima de suas vitrines. As cinco imagens do Instagram permanecem em uma linha, rolável no celular.

O antigo `HeroBanner`, seus hooks, GSAP e testes permanecem disponíveis no repositório, mas esse componente não é montado na página atual.

## Vídeo e entrada do header

Em `src/data/storefront.ts`, `storefront.hero.videoSrc` aponta hoje para o arquivo local existente `/videos/backgroud.mp4`. Substitua esse valor por uma URL direta MP4/WebM ou pelo nome correto do arquivo final, por exemplo `/videos/background.mp4`. Links de páginas de YouTube/Drive não são fontes de vídeo HTML. Enquanto estiver `null`, só o poster aparece e nenhum MP4 inexistente é solicitado.

O vídeo fica em loop, sem som e inline. Pausa quando o hero sai da tela ou a aba é ocultada. Há controle manual de reprodução; movimento reduzido desativa a reprodução automática. Os observadores e listeners são removidos no cleanup.

`hero.revealDelaySeconds` controla a entrada conjunta do header e dos textos (2,5 segundos desde a montagem). O hero ocupa `100svh`, com fallback `100vh`. `hero.poster`, `title` e `subtitle` são editáveis no mesmo arquivo. O vídeo definitivo ainda precisa ser validado em celulares reais, incluindo Safari/iOS.

## Produtos completos

`src/data/products.ts` exporta o tipo `Product`, oito registros ilustrativos, `getProduct` e `formatPrice`. Cada item de `entries` aceita nome, descrição, SKU, preço, preço anterior, moeda, imagens, cores, tamanhos, composição, cuidados, disponibilidade e SEO. Os valores padrão são preenchidos pelo mapeamento abaixo dos itens; campos específicos informados em cada item prevalecem.

Edite `price` como número em reais quando houver valor aprovado. `null` exibe “Preço a definir”; não representa produto gratuito. Atualize também `availability` quando a ficha deixar de ser uma prévia.

Cada produto possui uma página em `/produto/[slug]`, com dados renderizados no servidor, metadata própria e consulta via WhatsApp. Não existe carrinho ou checkout nesta entrega.

`storefront.showcases[].productIds` escolhe as peças de cada slider. `bannerPosition` alterna o banner entre esquerda e direita no desktop. Mantenha os IDs iguais aos do catálogo.

`src/data/collection.ts` continua responsável pelas quatro coleções por cor e galerias existentes, separadamente do catálogo de produtos.

## Imagens, Instagram e contato

- Banners e produtos usam as quatro fotos locais em `public/images/collection`, mapeadas por cor em `src/data/collection.ts`; a mesma foto é repetida no segundo enquadramento do produto até chegarem novas imagens. O logo e a imagem institucional usam a foto de perfil fornecida do Instagram; as cinco imagens do Instagram usam as URLs fornecidas. `src/lib/placeholder.ts` centraliza os placeholders restantes com largura e altura.
- `storefront.logo` e `storefront.aboutImage` apontam para a foto de perfil fornecida. Troque ambos pelo asset oficial quando disponível; nenhum lettering alternativo foi desenhado.
- Substitua banners, poster, imagem institucional e `instagramPhotos` em `storefront.ts`; fotos de produtos em `products.ts`; fotos de coleções em `collection.ts`.
- `SiteImage` usa Next Image e deixa placeholders sem otimização intermediária. Para futuros hosts de fotos, adicione apenas os domínios necessários em `next.config.ts`; caminhos locais de `public` não precisam dessa configuração.
- Instagram é uma seção editorial estática de cinco fotos. Cada `href` pode receber o link do post correspondente. Não há sincronização automática/API.
- WhatsApp configurado exatamente como informado: `+55 85 8963-4064`, armazenado como `558589634064`. Número e mensagem ficam em `storefront.whatsapp`. Nenhuma mensagem é enviada automaticamente.

## SEO e publicação

A página usa um único H1, headings de seção, imagens com alt, texto institucional em HTML e metadata de moda masculina. As fichas de produto possuem título e descrição próprios.

O estado de prévia existente foi preservado: `campaign.isPreview: true` em `src/data/sea-sky.ts` mantém `noindex`. Depois de substituir e revisar o conteúdo provisório, altere para `false` para permitir indexação. Nenhuma publicação foi realizada.

## Estilos e acessibilidade

`storefront.css` reúne os novos layouts. O header reutiliza `campaign.css`. Botões possuem estados desabilitados, foco visível e nomes acessíveis. O slider não avança automaticamente. A preferência por movimento reduzido remove a entrada animada e a rolagem suave dos novos componentes.
