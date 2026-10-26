import { wholesaleStory } from "@/data/wholesale-landing";
import { SiteImage } from "./SiteImage";
import { WholesaleLink } from "./WholesaleLink";

export function FounderSection() {
  const video = wholesaleStory.founderVideo;
  return <section className={`wholesale-story wholesale-section${video ? " wholesale-story--with-video" : ""}`} id="sobre-nos" aria-labelledby="founder-heading">
    <div className="wholesale-story__intro"><p className="wholesale-kicker">Sobre a Happy Boy</p><h2 id="founder-heading">Uma marca.<br />Uma parceria de<br /><em>longo prazo.</em></h2></div>
    <div className="wholesale-story__body"><span className="wholesale-story__year">Desde 1998</span><p>A Happy Boy nasceu em 1998. Somos uma fabricante de moda masculina, com fabricação própria, estrutura operacional e equipe comercial para atender lojistas.</p><p>Coleções que abrem possibilidades para o seu negócio. Uma relação que se constrói a cada novo caminho.</p><WholesaleLink>Fale com nosso time comercial</WholesaleLink></div>
    {video ? <div className="wholesale-story__video"><video src={video.src} poster={video.poster} controls playsInline preload="none" aria-label="Vídeo institucional da Happy Boy" /></div> : process.env.NODE_ENV === "development" && <div className="wholesale-media-pending"><p>Prévia de desenvolvimento / conteúdo provisório</p><span>Vídeo institucional — aguardando o material oficial</span><small>Área 16:9 preparada para o filme de 45 a 75 segundos. Nenhum vídeo fictício.</small></div>}
  </section>;
}

export function OperationSection() {
  return <section className="wholesale-operation wholesale-section" id="estrutura" aria-labelledby="operation-heading">
    <header><p className="wholesale-kicker">04 / Confiança e parceria</p><h2 id="operation-heading">Muito além de<br />uma peça de roupa.</h2></header>
    <div className="wholesale-operation__copy"><p>Fabricação própria. Estrutura operacional. Uma equipe comercial para conversar com quem está do outro lado: o lojista.</p><p>Conheça a Happy Boy de perto e descubra as possibilidades de uma parceria para o seu negócio.</p><WholesaleLink intent="showroom" operationVisit>Quero conhecer a operação de perto</WholesaleLink></div>
    {wholesaleStory.operationMedia.length > 0 && <div className="wholesale-operation__gallery">{wholesaleStory.operationMedia.map(media => <figure key={media.src}>{media.kind === "video" ? <video src={media.src} poster={media.poster} controls playsInline preload="none" aria-label={media.alt} /> : <SiteImage src={media.src} alt={media.alt} width={1200} height={800} />}<figcaption>{media.caption}</figcaption></figure>)}</div>}
    {wholesaleStory.testimonials.length > 0 && <div className="wholesale-operation__stories" aria-label="Depoimentos de lojistas">{wholesaleStory.testimonials.map(story => <figure key={`${story.name}-${story.business}`}>
      {story.media && (story.media.kind === "video" ? <video src={story.media.src} poster={story.media.poster} controls playsInline preload="none" aria-label={story.media.alt} /> : <SiteImage src={story.media.src} alt={story.media.alt} width={800} height={600} />)}
      <blockquote>{story.quote}</blockquote><figcaption>{story.name} / {story.business}</figcaption>
    </figure>)}</div>}
    {process.env.NODE_ENV === "development" && <aside className="wholesale-pending-note">Prévia de desenvolvimento: os módulos de depoimentos e bastidores aguardam materiais reais aprovados. Nenhuma galeria vazia será exibida na versão pública.</aside>}
  </section>;
}

export function WholesaleServiceSection() {
  return <section className="wholesale-service wholesale-section" id="visitas" aria-labelledby="service-heading">
    <header><p className="wholesale-kicker">05 / Atendimento ao lojista</p><h2 id="service-heading">A Happy Boy mais perto<br />do seu negócio.</h2></header>
    <div className="wholesale-service__panels"><article><span className="wholesale-service__index">01 / Na sua loja</span><h3>Receba um representante na sua loja</h3><p>Conheça a coleção, converse com nossa equipe e avalie as opções para abastecer seu negócio.</p><WholesaleLink intent="representante">Solicitar visita comercial</WholesaleLink></article><article><span className="wholesale-service__index">02 / Na fábrica</span><h3>Agende um atendimento no showroom da fábrica</h3><p>Conheça as peças presencialmente, veja a estrutura e converse com nosso time comercial.</p><WholesaleLink intent="showroom">Agendar visita ao showroom</WholesaleLink><small>O dia e o horário serão confirmados pela equipe.</small></article></div>
  </section>;
}
