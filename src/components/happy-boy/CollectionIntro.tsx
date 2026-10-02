import { campaign, collectionLooks } from "@/data/sea-sky";

export function CollectionIntro() {
  return (
    <section className="collection-intro" id="collection" aria-labelledby="collection-title">
      <div className="collection-intro__meta eyebrow">
        <span>Uma coleção. {String(collectionLooks.length).padStart(2, "0")} olhares.</span>
        <span>{campaign.year}</span>
      </div>
      <h2 className="collection-intro__title" id="collection-title" aria-label={campaign.title}>
        <span>SEA</span>
        <span>SKY</span>
      </h2>
      <div className="collection-intro__note">
        <p>Um novo ponto de vista.</p>
        <p className="collection-intro__description">
          Explore as formas, os tons e os detalhes. Cinco composições para olhar com calma.
        </p>
        <a className="editorial-link" href="#looks">Percorra os looks <span aria-hidden="true">↘</span></a>
      </div>
      {campaign.isPreview && <p className="collection-intro__preview">Prévia editorial · imagens e textos de referência</p>}
    </section>
  );
}
