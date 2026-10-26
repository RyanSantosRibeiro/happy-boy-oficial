/* eslint-disable @next/next/no-html-link-for-pages -- The commercial hash link must also fire when the visitor is already on the homepage. */
import Link from "next/link";
import { brand, campaign } from "@/data/sea-sky";
import { collectionItems } from "@/data/collection";
import { getWhatsAppHref } from "@/data/storefront";
import { BrandMark } from "./BrandMark";
import { SiteImage } from "./SiteImage";
import { institutionalCopy } from "@/data/commercial";
import { getFeaturedCollection } from "@/data/catalog";
import { MobileEditorialArrow } from "./MobileEditorialArrow";
import "./catalog.css";

export function Footer({ campaignClosing = false }: { campaignClosing?: boolean }) {
  const whatsapp = getWhatsAppHref();
  return (
    <footer className={`store-footer${campaignClosing ? " store-footer--travel-closing" : ""}`} id="contact">
      {!campaignClosing && <div className="store-footer__invitation"><div><p className="store-footer__eyebrow">04 / Atendimento comercial</p><h2>Vamos conversar?</h2><p className="store-footer__invitation-copy">Conheça as coleções e as condições de compra no atacado.</p></div><a href={whatsapp ?? brand.instagram} target="_blank" rel="noopener noreferrer">Fale pelo WhatsApp <span aria-hidden="true">↗</span></a></div>}
      <div className="store-footer__columns">
        <div className="store-footer__brand"><Link href="/#top" aria-label="Happy Boy — início"><BrandMark tone="light" /></Link><p>Moda masculina / Coleções / Atacado</p></div>
        <nav aria-label="Links rápidos"><h3>Explore</h3><Link href="/#top">Início</Link><Link href="/colecoes">Coleções</Link><Link href="/#collection">Outros looks</Link><Link href="/#sobre-nos">Sobre nós</Link><Link href="/#lojas">Nossas lojas</Link><a href="/#atendimento-atacado">Atendimento comercial</a></nav>
        <nav aria-label="Conjuntos Dry Fit por cor"><h3>Conjuntos Dry Fit</h3>{collectionItems.map((collection) => <Link href={`/colecao/${collection.slug}`} key={collection.slug}>{collection.name}</Link>)}
        </nav>
        <div className="store-footer__contact">
          {campaignClosing ? <>
            <h3>Atendimento comercial</h3>
            <h2>Vamos conversar?</h2>
            <p>Converse com a nossa equipe sobre coleções, linhas e condições de atacado.</p>
            <a className="store-footer__contact-action" href={whatsapp ?? brand.instagram} target="_blank" rel="noopener noreferrer">Fale pelo WhatsApp <span aria-hidden="true">↗</span><MobileEditorialArrow /></a>
          </> : <><h3>Atendimento</h3><p>Fale com a equipe comercial sobre coleções e compras no atacado.</p>{whatsapp && <a href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>}</>}
          <a href={brand.instagram} target="_blank" rel="noopener noreferrer">@happyboyoficial<span className="desktop-link-symbol"> ↗</span><MobileEditorialArrow /></a>{brand.contactHref && <a href={brand.contactHref}>Contato</a>}
          <small className="store-footer__external-note">WhatsApp e Instagram abrem em outra aba ou no aplicativo.</small>
        </div>
      </div>
      <section className="store-footer__institutional" id="institucional-resumo" aria-labelledby="institutional-title">
        <div><h2 id="institutional-title">{institutionalCopy.title}</h2>{institutionalCopy.provisional && <span className="store-footer__provisional">Texto institucional provisório</span>}</div>
        <p>{institutionalCopy.text}</p>
      </section>
      <div className="store-footer__bottom"><p>© {campaign.year} Happy Boy. Todos os direitos reservados.</p><span className="store-footer__signature"><SiteImage src="/images/brand/hb-white.svg" width={26} height={32} alt="Monograma oficial HB" unoptimized /><span>{getFeaturedCollection().name}</span></span><Link href="/#top">Voltar ao topo<span className="desktop-link-symbol"> ↑</span><MobileEditorialArrow direction="up" /></Link></div>
    </footer>
  );
}
