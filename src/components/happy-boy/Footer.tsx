import Link from "next/link";
import { brand, campaign } from "@/data/sea-sky";
import { collectionItems } from "@/data/collection";
import { getWhatsAppHref } from "@/data/storefront";
import { BrandMark } from "./BrandMark";

export function Footer() {
  const whatsapp = getWhatsAppHref();
  return (
    <footer className="store-footer" id="contact">
      <div className="store-footer__invitation"><h2>Vamos conversar?</h2><a href={whatsapp ?? brand.instagram} target="_blank" rel="noopener noreferrer">Fale com a Happy Boy <span aria-hidden="true">↗</span></a></div>
      <div className="store-footer__columns">
        <div className="store-footer__brand"><Link href="/#top" aria-label="Happy Boy — início"><BrandMark /></Link><p>Moda masculina. Uma nova perspectiva sobre o vestir.</p><a href={brand.instagram} target="_blank" rel="noopener noreferrer">@happyboyoficial ↗</a></div>
        <nav aria-label="Links rápidos"><h3>Explore</h3><Link href="/#top">Início</Link><Link href="/#shop">Peças em destaque</Link><Link href="/#collection">Coleção SEA SKY</Link><Link href="/#about">Sobre nós</Link><a href={brand.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></nav>
        <nav aria-label="Seleções por cor"><h3>A coleção</h3>{collectionItems.map((collection) => <Link href={`/colecao/${collection.slug}`} key={collection.slug}>{collection.name}</Link>)}<Link href="/#collection">Novas combinações</Link>
        </nav>
        <div className="store-footer__contact"><h3>Atendimento</h3><p>Dúvidas sobre peças, tamanhos ou a coleção? Converse com a nossa equipe.</p>{whatsapp && <a href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>}<a href={brand.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a>{brand.contactHref && <a href={brand.contactHref}>Contato</a>}</div>
      </div>
      <div className="store-footer__bottom"><p>© {campaign.year} Happy Boy. Todos os direitos reservados.</p><span>{campaign.isPreview ? "Prévia editorial" : "SEA SKY"}</span><Link href="/#top">Voltar ao topo ↑</Link></div>
    </footer>
  );
}
