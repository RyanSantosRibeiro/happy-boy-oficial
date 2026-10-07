import Link from "next/link";
import { collectionItems } from "@/data/collection";
import { SiteImage } from "./SiteImage";

export function CollectionGrid() {
  return <section className="collection-grid" id="collection" aria-labelledby="collection-title">
    <div className="collection-grid__heading">
      <p className="eyebrow">Happy Boy</p>
      <h2 id="collection-title">Movimento em cor.</h2>
    </div>
    <div className="collection-grid__cards">
      {collectionItems.map((collection) => <Link className="collection-grid__card" href={`/colecao/${collection.slug}`} key={collection.slug}>
        <figure className="collection-grid__image">
          <SiteImage src={collection.cover} alt={`Imagem provisória da seleção Happy Boy ${collection.name.toLowerCase()}`} fill sizes="(max-width: 720px) 100vw, 50vw" />
        </figure>
        <span className="collection-grid__meta"><span>{collection.name}</span><span aria-hidden="true">↗</span></span>
      </Link>)}
    </div>
  </section>;
}
