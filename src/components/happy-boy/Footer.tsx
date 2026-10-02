import Image from "next/image";
import { brand, campaign } from "@/data/sea-sky";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <a className="site-footer__brand" href="#top" aria-label="Happy Boy, voltar ao início">
          {brand.logoSrc ? <Image src={brand.logoSrc} alt="Happy Boy" width={144} height={36} /> : <span>{brand.name}</span>}
        </a>
        <nav className="site-footer__nav" aria-label="Navegação do rodapé">
          <a href="#collection">Collection</a>
          <a href="#about">About</a>
          <a href={brand.instagram} target="_blank" rel="noopener noreferrer">Instagram <span aria-hidden="true">↗</span></a>
          {brand.contactHref && <a href={brand.contactHref}>Contato</a>}
        </nav>
        <a className="site-footer__back" href="#top">Voltar ao topo <span aria-hidden="true">↑</span></a>
      </div>
      <p className="site-footer__collection" aria-hidden="true">SEA SKY</p>
      <div className="site-footer__bottom">
        <p>© {campaign.year} {brand.name}</p>
        <p>{campaign.isPreview ? "Prévia da coleção" : "SEA SKY Collection"}</p>
      </div>
    </footer>
  );
}
