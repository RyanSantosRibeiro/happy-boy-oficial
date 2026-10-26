import Link from "next/link";
import { SiteImage } from "./SiteImage";
import type { CatalogCollection } from "@/data/catalog";
import { PhotoPageHint } from "./PhotoPageHint";
import { MobileEditorialArrow } from "./MobileEditorialArrow";
import { WholesaleLink } from "./WholesaleLink";

export function AboutSection({ photo, wholesale = false }: { photo: CatalogCollection["presentation"]["aboutPhoto"]; wholesale?: boolean }) {
  return <section className="about-section" id="about" aria-labelledby="about-title">
    <div className="about-section__copy">
      <p className="about-section__label">03 / Editorial da coleção</p>
      <span className="about-section__signature" aria-hidden="true"><SiteImage src="/images/brand/happy-boy-white.svg" alt="" width={110} height={15} unoptimized /></span>
      <h2 id="about-title">Estilo que acompanha você.</h2>
      <p>Uma identidade feita para estar presente em diferentes momentos, caminhos e escolhas.</p>
      <a className="storefront-link" href="#collection">Explore os looks <span aria-hidden="true">↗</span><MobileEditorialArrow /></a>
      <p className="navigation-help">Clique na foto para abrir a página deste look e ver outros ângulos.</p>
      {wholesale && <WholesaleLink>Consultar a coleção no atacado</WholesaleLink>}
    </div>
    <Link href={photo.href} prefetch={false} className="about-section__image" aria-label={photo.linkLabel}>
      <SiteImage src={photo.src} alt={photo.alt} fill sizes="(max-width: 760px) 90vw, 42vw" style={{ objectPosition: "50% 65%" }} />
      <PhotoPageHint />
    </Link>
  </section>;
}
