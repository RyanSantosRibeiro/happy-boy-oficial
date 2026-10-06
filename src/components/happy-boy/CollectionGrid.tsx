import Image from "next/image";
import Link from "next/link";
import { collectionItems } from "@/data/collection";

export function CollectionGrid() {
  return <section className="collection-grid" id="collection" aria-labelledby="collection-title">
    <div className="collection-grid__heading">
      <p className="eyebrow">Happy Boy</p>
      <h1 id="collection-title">Movimento em cor.</h1>
    </div>
    <div className="collection-grid__cards">
      {collectionItems.map((collection, index) => <Link className="collection-grid__card" href={`/colecao/${collection.slug}`} key={collection.slug}>
        <figure className="collection-grid__image">
          <Image src={collection.cover} alt={`Conjunto Happy Boy ${collection.name.toLowerCase()}`} fill sizes="(max-width: 720px) 100vw, 50vw" priority={index < 2} />
        </figure>
        <span className="collection-grid__meta"><span>{collection.name}</span><span aria-hidden="true">↗</span></span>
      </Link>)}
    </div>
  </section>;
}
