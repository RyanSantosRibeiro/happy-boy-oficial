import { wholesaleStory } from "@/data/wholesale-landing";
import { SiteImage } from "./SiteImage";
import { WholesaleLink } from "./WholesaleLink";
import { ComingSoonFilm } from "./ComingSoonFilm";

export function OperationSection() {
  const video = wholesaleStory.operationVideo;
  return <section className="wholesale-operation wholesale-section" id="fabrica" aria-labelledby="operation-heading">
    <span id="estrutura" className="premium-anchor-alias" aria-hidden="true" />
    <div><header><p className="wholesale-kicker">04 / Confiança e parceria</p><h2 id="operation-heading">Muito além de<br />uma peça de roupa.</h2></header><div className="wholesale-operation__copy"><p>Fabricação própria. Estrutura operacional. Uma equipe comercial para conversar com quem está do outro lado: o lojista.</p><p>Conheça a Happy Boy de perto e descubra as possibilidades de uma parceria para o seu negócio.</p><WholesaleLink intent="showroom" operationVisit className="mobile-follow-film__desktop">Quero conhecer a operação de perto</WholesaleLink></div></div>
    {video ? <figure className="wholesale-operation__film"><video src={video.src} poster={video.poster} controls playsInline preload="none" aria-label="Apresentação da fábrica Happy Boy" /><figcaption>Happy Boy / Fábrica</figcaption></figure> : <ComingSoonFilm label="Filme da operação Happy Boy" />}
    <WholesaleLink intent="showroom" operationVisit className="mobile-follow-film__mobile">Quero conhecer a operação de perto</WholesaleLink>
    {wholesaleStory.operationMedia.length > 0 && <div className="wholesale-operation__gallery">{wholesaleStory.operationMedia.map(media => <figure key={media.src}>{media.kind === "video" ? <video src={media.src} poster={media.poster} controls playsInline preload="none" aria-label={media.alt} /> : <SiteImage src={media.src} alt={media.alt} width={1200} height={800} />}<figcaption>{media.caption}</figcaption></figure>)}</div>}
    {wholesaleStory.testimonials.length > 0 && <div className="wholesale-operation__stories" aria-label="Depoimentos de lojistas">{wholesaleStory.testimonials.map(story => <figure key={`${story.name}-${story.business}`}>
      {story.media && (story.media.kind === "video" ? <video src={story.media.src} poster={story.media.poster} controls playsInline preload="none" aria-label={story.media.alt} /> : <SiteImage src={story.media.src} alt={story.media.alt} width={800} height={600} />)}
      <blockquote>{story.quote}</blockquote><figcaption>{story.name} / {story.business}</figcaption>
    </figure>)}</div>}
  </section>;
}

export function WholesaleServiceSection() {
  return <section className="wholesale-service wholesale-section" id="visitas" aria-labelledby="service-heading">
    <header><p className="wholesale-kicker">05 / Atendimento ao lojista</p><h2 id="service-heading">A Happy Boy mais perto<br />do seu negócio.</h2></header>
    <div className="wholesale-service__panels"><article><span className="wholesale-service__index"><span className="wholesale-service__number">01 / </span>Na sua loja</span><h3>Receba um representante na sua loja</h3><p>Conheça a coleção, converse com nossa equipe e avalie as opções para abastecer seu negócio.</p><WholesaleLink intent="representante">Solicitar visita comercial</WholesaleLink></article><article><span className="wholesale-service__index"><span className="wholesale-service__number">02 / </span>Na fábrica</span><h3>Agende um atendimento no showroom da fábrica</h3><p>Conheça as peças presencialmente, veja a estrutura e converse com nosso time comercial.</p><WholesaleLink intent="showroom">Agendar visita ao showroom</WholesaleLink><small>O dia e o horário serão confirmados pela equipe.</small></article></div>
  </section>;
}
