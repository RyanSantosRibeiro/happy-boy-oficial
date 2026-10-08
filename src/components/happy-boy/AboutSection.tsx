import Link from "next/link";
import { SiteImage } from "./SiteImage";

export function AboutSection() {
  return <section className="about-section" id="about" aria-labelledby="about-title">
    <div className="about-section__copy">
      <p className="about-section__label">03 / Sobre nós — Happy Boy</p>
      <span className="about-section__signature" aria-hidden="true"><SiteImage src="/images/brand/happy-boy-white.svg" alt="" width={110} height={15} unoptimized /></span>
      <h2 id="about-title">Estilo que acompanha você.</h2>
      <p>Uma identidade feita para estar presente em diferentes momentos, caminhos e escolhas.</p>
      <a className="storefront-link" href="#collection">Explore os looks <span aria-hidden="true">↗</span></a>
    </div>
    <Link href="/colecao/camisa-clara" prefetch={false} className="about-section__image" aria-label="Ver galeria de camisa clara e calça clara">
      <SiteImage src="/images/travel-edition/lifestyle/RAY_8832.webp" alt="Editorial Happy Boy: modelo com camisa clara de botões e calça clara sob o céu azul" fill sizes="(max-width: 760px) 90vw, 42vw" style={{ objectPosition: "50% 65%" }} />
    </Link>
  </section>;
}
