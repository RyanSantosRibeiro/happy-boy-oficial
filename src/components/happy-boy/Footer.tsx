import Link from "next/link";
import { brand, campaign } from "@/data/sea-sky";
import { getWhatsAppHref } from "@/data/storefront";
import { BrandMark } from "./BrandMark";
import { SiteImage } from "./SiteImage";
import { institutionalCopy } from "@/data/commercial";
import { getFeaturedCollection } from "@/data/catalog";
import { MobileEditorialArrow } from "./MobileEditorialArrow";
import { EditorialArrow } from "./WholesaleLink";
import "./catalog.css";
import "./footer-editorial.css";

export function Footer({ campaignClosing = false }: { campaignClosing?: boolean }) {
  const whatsapp = getWhatsAppHref();
  return (
    <footer className={`store-footer store-footer--editorial${campaignClosing ? " store-footer--travel-closing" : ""}`} id="contact">
      <div className="store-footer__columns">
        <div className="store-footer__brand"><Link href="/#top" aria-label="Happy Boy — início"><BrandMark tone="light" /></Link><section className="store-footer__about" id="institucional-resumo" aria-labelledby="institutional-title"><h3 id="institutional-title">{institutionalCopy.title}</h3><p>{institutionalCopy.text}</p></section></div>
        <nav aria-label="Links rápidos"><h3>Explore</h3><Link href="/#top">Início</Link><Link href="/#collection">Coleção atual</Link><Link href="/colecoes">Coleções</Link><Link href="/#fabrica">Fábrica</Link><Link href="/#lojas">Lojas</Link><Link href="/#visitas">Atendimento comercial</Link></nav>
        <div className="store-footer__contact">
            <h3>Atendimento comercial</h3>
            <h2>Vamos conversar?</h2>
            <p>Converse com a nossa equipe sobre coleções, linhas e condições de atacado.</p>
            <a className="store-footer__contact-action" href={whatsapp ?? brand.instagram} target="_blank" rel="noopener noreferrer">Fale pelo WhatsApp <EditorialArrow /></a>
          <a href={brand.instagram} target="_blank" rel="noopener noreferrer">@happyboyoficial<span className="desktop-link-symbol"> ↗</span><MobileEditorialArrow /></a>{brand.contactHref && <a href={brand.contactHref}>Contato</a>}
          <small className="store-footer__external-note">WhatsApp e Instagram abrem em outra aba ou no aplicativo.</small>
        </div>
      </div>
      <div className="store-footer__bottom"><span className="store-footer__signature"><SiteImage src="/images/brand/hb-white.svg" width={26} height={32} alt="Monograma oficial HB" unoptimized /><span>{getFeaturedCollection().name}</span></span><Link href="/#top">Voltar ao topo<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M12 20V4m-6 6 6-6 6 6" /></svg></Link><p>© {campaign.year} Happy Boy. Todos os direitos reservados.</p></div>
    </footer>
  );
}
