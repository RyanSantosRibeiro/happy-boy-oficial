import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedCollections } from "@/data/catalog";
import { Header } from "@/components/happy-boy/Header";
import { Footer } from "@/components/happy-boy/Footer";
import { SiteImage } from "@/components/happy-boy/SiteImage";
import { PhotoPageHint } from "@/components/happy-boy/PhotoPageHint";
import "@/components/happy-boy/campaign.css";
import "@/components/happy-boy/storefront.css";
import "@/components/happy-boy/post-collection.css";
import "@/components/happy-boy/catalog.css";

export const metadata: Metadata = {
  title: "Coleções de moda masculina no atacado | Happy Boy",
  description: "Explore as coleções, linhas e cores da Happy Boy. Atendimento comercial para lojistas e parceiros.",
};

export default function CollectionsPage() {
  const collections = getPublishedCollections();
  return <>
    <a className="skip-link" href="#main">Pular para o conteúdo</a>
    <div className="catalog-shell"><Header tone="dark" />
      <main className="catalog-index" id="main">
        <header className="catalog-intro"><p className="catalog-kicker">Happy Boy / Showroom digital</p><h1>Coleções.</h1><p>Moda masculina em diferentes caminhos. Explore nossas linhas e converse com a equipe comercial sobre compras no atacado.</p></header>
        {collections.map((collection, index) => <article className="catalog-collection" key={collection.id}>
          <Link className="catalog-collection__photo" href={`/colecoes/${collection.slug}`} aria-label={`Explorar ${collection.name}`}><SiteImage src={collection.cover.src} alt={collection.cover.alt} fill sizes="(max-width: 760px) 90vw, 50vw" preload={index === 0} /><PhotoPageHint label="Abrir esta coleção" /></Link>
          <div className="catalog-collection__copy"><p className="catalog-kicker">{collection.featured ? "Coleção em destaque" : "Explore a coleção"}</p><h2>{collection.name}</h2><p>{collection.description}</p><Link className="catalog-text-link" href={`/colecoes/${collection.slug}`}>Explore as linhas e os modelos <span aria-hidden="true">↗</span></Link><p className="navigation-help">Clique na foto ou no link acima para abrir a página desta coleção.</p></div>
        </article>)}
      </main>
    </div><Footer campaignClosing />
  </>;
}
