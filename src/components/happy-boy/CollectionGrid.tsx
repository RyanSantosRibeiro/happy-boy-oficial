import Link from "next/link";
import { lifestyleEditorialLooks, shirtShortEditorialLook } from "@/data/editorial-looks";
import { SiteImage } from "./SiteImage";
import { CollectionReveal } from "./CollectionReveal";
import { DryFitEditorialSection } from "./DryFitEditorialSection";
import { FamilyColorCard } from "./FamilyColorCard";
import { collectionFamilies } from "@/data/collection-families";

export function CollectionGrid() {
  return <CollectionReveal>
    <DryFitEditorialSection />
    <section className="collection-selection" id="collection" aria-labelledby="collection-title">
      <div className="collection-selection__heading" id="shop" data-collection-reveal>
        <div><p className="collection-selection__chapter">02 / Seleção editorial</p><h2 id="collection-title">Outros looks da coleção.</h2></div>
        <span>Happy Boy / 04 looks</span>
      </div>
      <div className="collection-selection__looks">
        {[0, 1, 2, 3].map((index) => {
          const look = index === 0 ? shirtShortEditorialLook : lifestyleEditorialLooks[index];
          const familySlug = index === 1 ? "polo-essential" : index === 2 ? "polo-short" : index === 3 ? "camiseta-contrast" : undefined;
          const family = collectionFamilies.find(item => item.slug === familySlug);
          return <div className="collection-selection__reveal" data-collection-reveal data-look={String(index + 1).padStart(2, "0")} key={look.id}>
          {family ? <FamilyColorCard family={family} /> :
          <Link href={`/colecao/${look.slug}`} prefetch={false} className="collection-look collection-look--editorial">
            <figure className="collection-look__photo">
              <SiteImage src={look.src} alt={look.alt} width={1800} height={2700} sizes="(max-width: 700px) 92vw, (max-width: 1100px) 44vw, 23vw" />
            </figure>
            <p className="collection-look__label">{look.label}</p>
          </Link>}
        </div>;
        })}
      </div>
    </section>
  </CollectionReveal>;
}
