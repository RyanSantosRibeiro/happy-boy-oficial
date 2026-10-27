import type { CatalogCollection } from "@/data/catalog";

/** The same continuous campaign strip, reusable without duplicating it on the homepage. */
export function CollectionMarquee({ collection }: { collection: CatalogCollection }) {
  const items = Array.from({ length: 6 }, () => collection.presentation.benefits).flat();
  return <div className="editorial-reel__benefits" aria-label="Informações da coleção"><span className="sr-only">{collection.presentation.benefits.join(". ")}.</span><div className="editorial-reel__marquee" aria-hidden="true"><div className="editorial-reel__marquee-track">{[0,1].map(sequence=><div className="editorial-reel__marquee-sequence" key={sequence}>{items.map((item,index)=><span className="editorial-reel__marquee-item" key={`${sequence}-${index}`}>{item}<i aria-hidden="true" /></span>)}</div>)}</div></div></div>;
}
