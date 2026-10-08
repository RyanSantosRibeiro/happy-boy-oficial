import Link from "next/link";
import { brand, campaign } from "@/data/sea-sky";
import { collectionItems } from "@/data/collection";
import { getWhatsAppHref } from "@/data/storefront";
import { BrandMark } from "./BrandMark";
import { SiteImage } from "./SiteImage";

export function Footer({ campaignClosing = false }: { campaignClosing?: boolean }) {
  const whatsapp = getWhatsAppHref();
  return (
    <footer className={`store-footer${campaignClosing ? " store-footer--travel-closing" : ""}`} id="contact">
      {!campaignClosing && <div className="store-footer__invitation"><div><p className="store-footer__eyebrow">04 / Atendimento personalizado</p><h2>Vamos conversar?</h2><p className="store-footer__invitation-copy">Converse sobre a peça, a cor e os tamanhos que você procura.</p></div><a href={whatsapp ?? brand.instagram} target="_blank" rel="noopener noreferrer">Fale pelo WhatsApp <span aria-hidden="true">↗</span></a></div>}
      <div className="store-footer__columns">
        <div className="store-footer__brand"><Link href="/#top" aria-label="Happy Boy — início"><BrandMark tone="light" /></Link><p>Moda masculina / Lifestyle / Performance</p></div>
        <nav aria-label="Links rápidos"><h3>Explore</h3><Link href="/#top">Início</Link><Link href="/#dry-fit">Travel Edition</Link><Link href="/#collection">Outros looks</Link><Link href="/#about">Sobre nós</Link></nav>
        <nav aria-label="Conjuntos Dry Fit por cor"><h3>Conjuntos Dry Fit</h3>{collectionItems.map((collection) => <Link href={`/colecao/${collection.slug}`} key={collection.slug}>{collection.name}</Link>)}
        </nav>
        <div className="store-footer__contact">
          {campaignClosing ? <>
            <h3>04 / Atendimento personalizado</h3>
            <h2>Vamos conversar?</h2>
            <p>Converse sobre a peça, a cor e os tamanhos que você procura.</p>
            <a className="store-footer__contact-action" href={whatsapp ?? brand.instagram} target="_blank" rel="noopener noreferrer">Fale pelo WhatsApp <span aria-hidden="true">↗</span></a>
          </> : <><h3>Atendimento</h3><p>Dúvidas sobre peças, tamanhos ou a coleção? Converse com a nossa equipe.</p>{whatsapp && <a href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>}</>}
          <a href={brand.instagram} target="_blank" rel="noopener noreferrer">@happyboyoficial ↗</a>{brand.contactHref && <a href={brand.contactHref}>Contato</a>}
        </div>
      </div>
      <div className="store-footer__bottom"><p>© {campaign.year} Happy Boy. Todos os direitos reservados.</p><span className="store-footer__signature"><SiteImage src="/images/brand/hb-white.svg" width={26} height={32} alt="Monograma oficial HB" unoptimized /><span>Travel Edition</span></span><Link href="/#top">Voltar ao topo ↑</Link></div>
    </footer>
  );
}
