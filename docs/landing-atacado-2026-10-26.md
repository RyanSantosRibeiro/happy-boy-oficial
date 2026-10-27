# Happy Boy — showroom digital de atacado

**Reestruturação revisada e aprovada pelo usuário para publicação em 26/10/2026.**

[Site Happy Boy](https://happy-boy-oficial.vercel.app/) · [Prévia local](http://localhost:3011/) · Branch de revisão: `feat/wholesale-landing-2026-10-26` · Base preservada: `734fc16`.

## O que mudou

1. Hero com o texto definido pelo proprietário, uma ação principal para atacado, dois caminhos de visita e acesso secundário às lojas. O vídeo, as fontes desktop/mobile, a reprodução e a entrada animada foram reaproveitados. No celular, o texto comercial ocupa uma área conectada ao filme, sem ficar sobre o modelo.
2. Seção institucional com os fatos fornecidos: desde 1998, fabricação própria, estrutura operacional e equipe comercial. O componente recebe um vídeo 16:9 quando entregue. Sem esse arquivo, a apresentação pública exibe apenas conteúdo institucional; em desenvolvimento há uma área provisória identificada.
3. Travel Edition, carrosséis, cores, fotografias, vídeos, galerias e histórico mantidos. Foram acrescentados caminhos discretos para condições de atacado. As consultas nas páginas internas continuam sendo por família comercial, sem cor isolada.
4. “Muito além de uma peça de roupa.” reúne a apresentação da operação e os futuros depoimentos. Os módulos de mídia ficam inativos até a chegada dos materiais reais.
5. Dois painéis comerciais: representante na loja e showroom da fábrica.
6. Formulário final adaptado às quatro modalidades, seguido pelas unidades de Fortaleza e pelo rodapé azul-petróleo. O cadastro atual contém Pátio Central e Shopping Fortaleza Sul.

## Navegação comercial

| Origem | Destino | Contexto preservado |
| --- | --- | --- |
| Hero / compra / condições de atacado / institucional | `/#atendimento-atacado` | Compra no atacado selecionada |
| Hero / solicitar visita / opção de representante nas páginas e no botão persistente | `/#atendimento-representante` | Formulário com bairro ou endereço da loja |
| Hero / visita ao showroom | `/#atendimento-showroom` | Preferência de dia ou período, sem confirmação automática |
| Conhecer a operação de perto | `/#atendimento-operacao` | Showroom selecionado e motivo identificado na mensagem |
| Conhecer nossas lojas | `/#lojas` | Endereços e mapas |
| Informações sobre as lojas | `/#atendimento-lojas` | Somente contato e observações; sem endereço comercial ou perfil obrigatório |
| Sobre nós | `/#sobre-nos` | Institucional real e futuro vídeo do fundador |

Os links de formulário usam navegação nativa por âncora para funcionar também ao mudar de modalidade na própria homepage. Catálogo e vendedor continuam abrindo suas mensagens já configuradas no WhatsApp. O número oficial existente foi mantido.

## Formulários

- Nome e WhatsApp com DDD são validados.
- Nome da loja é obrigatório apenas para quem seleciona “Já tenho loja”.
- Cidade, UF e perfil são solicitados nas modalidades comerciais.
- Representante acrescenta a localização da loja; showroom acrescenta uma preferência, sujeita à confirmação humana.
- “Continuar pelo WhatsApp” gera uma revisão local. Somente o link seguinte abre o aplicativo com o texto codificado. Nenhuma mensagem é enviada automaticamente e nenhuma solicitação é apresentada como recebida.
- Ao trocar de modalidade ou editar os campos, a mensagem preparada é invalidada para evitar encaminhamento com dados antigos.
- Dados ficam na memória da página. Não há armazenamento local, logs de contatos, backend de leads, transmissão silenciosa ou integração de CRM ativa. O tipo estruturado `CommercialLead` prepara uma futura integração a ser definida.
- Há aviso claro sobre o uso dos dados e alternativa de contato para navegação sem JavaScript, sem criar uma política jurídica fictícia.

## Capturas

### Desktop

[Hero](<C:/Astra 6/reports/happy-boy-wholesale-2026-10-26/hero-desktop.jpg>) · [Institucional](<C:/Astra 6/reports/happy-boy-wholesale-2026-10-26/institucional-desktop.jpg>) · [Atendimento](<C:/Astra 6/reports/happy-boy-wholesale-2026-10-26/atendimento-desktop.jpg>) · [Formulário](<C:/Astra 6/reports/happy-boy-wholesale-2026-10-26/formulario-desktop.jpg>) · [Lojas e mapas](<C:/Astra 6/reports/happy-boy-wholesale-2026-10-26/lojas-desktop.jpg>)

![Primeira dobra desktop](<C:/Astra 6/reports/happy-boy-wholesale-2026-10-26/hero-desktop.jpg>)

### Mobile

[320 px](<C:/Astra 6/reports/happy-boy-wholesale-2026-10-26/hero-320.jpg>) · [375 px](<C:/Astra 6/reports/happy-boy-wholesale-2026-10-26/hero-375.jpg>) · [390 px](<C:/Astra 6/reports/happy-boy-wholesale-2026-10-26/hero-390.jpg>) · [430 px](<C:/Astra 6/reports/happy-boy-wholesale-2026-10-26/hero-430.jpg>) · [Institucional](<C:/Astra 6/reports/happy-boy-wholesale-2026-10-26/institucional-mobile.jpg>) · [Atendimento](<C:/Astra 6/reports/happy-boy-wholesale-2026-10-26/atendimento-mobile.jpg>) · [Formulário showroom](<C:/Astra 6/reports/happy-boy-wholesale-2026-10-26/formulario-showroom-mobile.jpg>) · [Revisão de representante](<C:/Astra 6/reports/happy-boy-wholesale-2026-10-26/formulario-representante.jpg>)

## Validação realizada

- Build de produção concluído e TypeScript validado.
- ESLint de `src` e `tests` aprovado.
- 28 testes aprovados, incluindo oito novos testes de modalidades, requisitos condicionais, isolamento dos dados entre solicitações e codificação da URL.
- 38 rotas públicas do projeto responderam HTTP 200 na checagem por HEAD da prévia. [Resultado](<C:/Astra 6/reports/happy-boy-wholesale-2026-10-26/rotas.json>).
- Navegador em 320, 375, 390, 430, 768, 1024 e 1440 px: sem overflow horizontal ou títulos cortados. A ação principal fica na primeira tela nas quatro larguras mobile verificadas. [Medições](<C:/Astra 6/reports/happy-boy-wholesale-2026-10-26/responsividade.json>).
- Formulário vazio: mensagens de erro e foco no primeiro campo inválido. Formulários válidos: revisão das quatro modalidades, revendedor sem nome de loja, intenção de conhecer a operação e uso do número configurado.
- Navegação do hero, painéis de visita, menu mobile, “Sobre nós”, retorno pelo logotipo e acesso ao formulário de representante a partir da página interna verificados.
- Swipe dos vídeos, seleção de vídeo, troca de cor do Polo, abertura de página interna e mudança de ângulo da galeria verificados.
- Os mapas reais carregaram e apontaram para os centros comerciais correspondentes na revisão original.
- Console sem erros ou avisos introduzidos na conferência final. O HTML do build confirmou a ausência do espaço provisório do vídeo e de módulos vazios de depoimentos.
- Após uma tentativa inválida, trocar a modalidade remove os erros dos campos anteriores e invalida a mensagem preparada.
- Arquivos de mídia, dados de produtos, hooks de reprodução e lógica das galerias/carrosséis não foram alterados.

### Não realizado / limites da revisão

- Nenhuma mensagem real foi enviada. O link final e seu conteúdo foram inspecionados sem contatar a equipe.
- Não há teste em aparelho físico; a revisão usa o navegador em larguras responsivas.
- A alternativa sem JavaScript foi revisada no código/HTML, sem ensaio em navegador com JavaScript desativado.
- Não foi feita integração ou envio a CRM, nem confirmação de disponibilidade de visitas.
- Vídeo institucional, depoimentos e fotos da operação não podem ser validados sem os arquivos finais. Os ramos de ativação futura estão preparados, mas não foram exercitados com conteúdo fictício.
- Esta é uma prévia local do build de produção. O ambiente de desenvolvimento tem a sinalização provisória; ela não é mostrada nesta prévia pública equivalente.

## Endereços e referências

Os endereços foram mantidos conforme a orientação do proprietário. Não havia cadastro de unidades no código anterior.

- Fortaleza Sul: avenida, número e bairro conferidos no [site oficial do shopping](https://www.shoppingfortalezasul.com.br/). Uma página institucional antiga do mesmo domínio usa outro nome de bairro; a prévia conserva “Fátima”, conforme o briefing e a página inicial atual.
- Pátio Central: rua e número também aparecem no [contato de uma lojista do shopping](https://www.larifloroficial.com.br/contato/). O mapa real carregou o Pátio Central na região indicada. Não foi localizada uma referência local anterior da unidade Happy Boy.

Os mapas apontam para os centros comerciais; não foram inventados números de loja, fachadas ou coordenadas internas. Os complementos de localização podem ser atualizados quando a marca fornecer a identificação exata das unidades.

## Materiais e definições pendentes

- Vídeo institucional oficial de 45–75 segundos.
- Depoimentos reais, com textos, nomes e mídias aprovados.
- Fotografias/vídeos oficiais de produção, qualidade, estoque, separação, expedição e atendimento.
- Contatos separados por setor, caso existam. Até lá, todos os formulários usam o contato comercial configurado.
- Definição de CRM, encaminhamentos e infraestrutura futura, caso a marca decida integrar.
- Conferência final dos complementos de localização das unidades.

## Componentes reaproveitados e arquivos

Reaproveitados: `CampaignHero`, `Header`, `EditorialVideoCarousel`, `WeeklyLaunches`, `CollectionGrid`, `AboutSection`, `Footer`, `WhatsAppProvider`, `CommercialActions`, seletores de cor, galerias e gerador seguro `whatsappHref`.

Arquivos existentes alterados:

- `src/app/page.tsx`
- `src/components/happy-boy/CampaignHero.tsx`
- `src/components/happy-boy/Header.tsx`
- `src/components/happy-boy/Footer.tsx`
- `src/components/happy-boy/CollectionGrid.tsx`
- `src/components/happy-boy/AboutSection.tsx`
- `src/components/happy-boy/CommercialActions.tsx`
- `src/components/happy-boy/WhatsAppButton.tsx`
- `src/data/commercial.ts`

Novos: `WholesaleSections.tsx`, `WholesaleLink.tsx`, `CommercialLeadForm.tsx`, `PhysicalStores.tsx`, `wholesale-landing.css`, `src/data/wholesale-landing.ts`, `src/lib/commercial-lead.ts` e `tests/commercial-lead.test.ts`.

Não foram instaladas dependências. A publicação foi autorizada após a revisão. Não houve troca de coleção ou mudança da data do próximo lançamento.
