import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCollectionLineName, getPublishedCollection, getPublishedCollections } from "@/data/catalog";
import { Header } from "@/components/happy-boy/Header";
import { Footer } from "@/components/happy-boy/Footer";
import { EditorialVideoCarousel } from "@/components/happy-boy/EditorialVideoCarousel";
import { SiteImage } from "@/components/happy-boy/SiteImage";
import { PhotoPageHint } from "@/components/happy-boy/PhotoPageHint";
import "@/components/happy-boy/campaign.css";
import "@/components/happy-boy/storefront.css";
import "@/components/happy-boy/post-collection.css";
import "@/components/happy-boy/editorial-video-carousel.css";
import "@/components/happy-boy/catalog.css";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return getPublishedCollections().map(collection => ({ slug: collection.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const collection = getPublishedCollection((await params).slug);
  if (!collection) notFound();
  return { title: `${collection.name} — Coleções no atacado | Happy Boy`, description: collection.description, openGraph: { images: [{ url: collection.cover.src, alt: collection.cover.alt }] } };
}
export default async function CollectionCatalogPage({ params }: Props) {
  const collection = getPublishedCollection((await params).slug);
  if (!collection) notFound();
  return <>
    <a className="skip-link" href="#main">Pular para o conteúdo</a>
    <div className="catalog-shell"><Header tone="dark" />
      <main id="main" className="catalog-detail">
        <header className="catalog-intro"><Link className="catalog-back" href="/colecoes">← Todas as coleções</Link><p className="catalog-kicker">Happy Boy / Coleção {collection.featured ? "em destaque" : "publicada"}</p><h1>{collection.name}</h1><p>{collection.description}</p></header>
        <nav className="catalog-line-nav" aria-label={`Linhas de ${collection.name}`}>{collection.lines.map(line => <a key={line.familyId} href={`#linha-${line.familyId}`}>{getCollectionLineName(line)}</a>)}</nav>
        <EditorialVideoCarousel collection={collection} />
        <div className="catalog-lines">{collection.lines.map((line, index) => <section className="catalog-line" id={`linha-${line.familyId}`} key={line.familyId} aria-labelledby={`title-${line.familyId}`}>
          <Link className="catalog-line__photo" href={line.items[0].href} aria-label={`Ver ${getCollectionLineName(line)}`}><SiteImage src={line.items[0].cover} alt={line.items[0].alt} fill sizes="(max-width: 760px) 90vw, 45vw" /><PhotoPageHint /></Link>
          <div className="catalog-line__copy"><p className="catalog-kicker">{String(index + 1).padStart(2, "0")} / {collection.name}</p><h2 id={`title-${line.familyId}`}>{getCollectionLineName(line)}</h2><p>Clique na foto ou escolha um modelo abaixo para abrir a página com fotos e detalhes da peça.</p><nav className="catalog-line__variants" aria-label={`Modelos e cores — ${getCollectionLineName(line)}`}>{line.items.map(item => <Link key={item.href} href={item.href}>{item.name}<span aria-hidden="true">↗</span></Link>)}</nav></div>
        </section>)}</div>
      </main>
    </div><Footer campaignClosing />
  </>;
}
