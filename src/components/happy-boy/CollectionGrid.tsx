import Link from "next/link";
import type { CatalogCollection } from "@/data/catalog";
import { SiteImage } from "./SiteImage";
import { CollectionReveal } from "./CollectionReveal";
import { DryFitEditorialSection } from "./DryFitEditorialSection";
import { FamilyColorCard } from "./FamilyColorCard";
import { PhotoPageHint } from "./PhotoPageHint";
import { WholesaleLink } from "./WholesaleLink";

export function CollectionGrid({ collection, wholesale = false }: { collection: CatalogCollection; wholesale?: boolean }) {
  return <CollectionReveal>
    <DryFitEditorialSection collection={collection} />
    <section className="collection-selection" id="collection" aria-labelledby="collection-title">
      <div className="collection-selection__heading" id="shop" data-collection-reveal>
        <div><p className="collection-selection__chapter">02 / Seleção editorial</p><h2 id="collection-title">Outros looks da coleção.</h2></div>
        <span>Happy Boy / {String(collection.presentation.selection.length).padStart(2, "0")} looks</span>
      </div>
      <p className="navigation-help">Clique em uma foto para abrir a página da peça e ver outros ângulos. Use as setas para conhecer outras cores.</p>
      <div className="collection-selection__looks">
        {collection.presentation.selection.map((entry, index) => {
          return <div className="collection-selection__reveal" data-collection-reveal data-look={String(index + 1).padStart(2, "0")} key={entry.kind === "family" ? entry.family.slug : entry.look.id}>
          {entry.kind === "family" ? <FamilyColorCard family={entry.family} /> :
          <Link href={entry.look.href} prefetch={false} className="collection-look collection-look--editorial">
            <figure className="collection-look__photo">
              <SiteImage src={entry.look.src} alt={entry.look.alt} width={1800} height={2700} sizes="(max-width: 700px) 92vw, (max-width: 1100px) 44vw, 23vw" />
              <PhotoPageHint />
            </figure>
            <p className="collection-look__label">{entry.look.label}</p>
          </Link>}
        </div>;
        })}
      </div>
      {wholesale && <div className="wholesale-collection-closing"><p>Novas possibilidades para a seleção da sua loja.</p><WholesaleLink>Conhecer as condições de atacado</WholesaleLink></div>}
    </section>
  </CollectionReveal>;
}
