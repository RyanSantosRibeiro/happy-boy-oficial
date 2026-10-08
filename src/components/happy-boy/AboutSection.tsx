import { SiteImage } from "./SiteImage";

export function AboutSection() {
  return <section className="about-section" id="about" aria-labelledby="about-title">
    <div className="about-section__copy">
      <p className="about-section__label">Sobre nós</p>
      <h2 id="about-title">Happy Boy.<br />Moda masculina,<br />novos olhares.</h2>
      <p>A Happy Boy é uma marca de moda masculina que reúne estilo, qualidade e uma visão contemporânea do vestir. Nossa identidade parte de formas simples, presença e atenção à composição de cada look.</p>
      <p>Na coleção SEA SKY, esse olhar se traduz em uma seleção de polos, camisetas, camisas, calças e bermudas. Explore as peças e descubra possibilidades para combinar cores e construir seu próprio estilo.</p>
      <a className="storefront-link" href="#collection">Conheça a coleção <span aria-hidden="true">↗</span></a>
    </div>
    <div className="about-section__image" style={{ background: "#000" }}><SiteImage src="/images/hb-monogram-official.png" alt="Monograma oficial HB branco sobre fundo preto" fill sizes="(max-width: 760px) 100vw, 45vw" style={{ objectFit: "contain" }} unoptimized /></div>
  </section>;
}
