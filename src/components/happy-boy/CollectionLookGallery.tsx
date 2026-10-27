"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CatalogCollection } from "@/data/catalog";
import { collectionPresentationGroups, type PresentationGroup } from "@/data/collection-presentation";
import { DryFitEditorialCarousel } from "./DryFitEditorialCarousel";
import { EditorialArrow, WholesaleLink } from "./WholesaleLink";
import "./collection-look-gallery.css";

function CollectionGroupCard({ group }: { group: PresentationGroup }) {
  const [activeId, setActiveId] = useState(group.looks[0].gallery.id);
  const selected = group.looks.find(look => look.gallery.id === activeId) ?? group.looks[0];
  const slides = useMemo(() => group.looks.map(({ gallery, href }) => ({
    id: gallery.id,
    name: gallery.name,
    src: gallery.cover,
    alt: gallery.photos.find(photo => photo.src === gallery.cover)?.alt ?? gallery.photos[0].alt,
    href,
    label: `${gallery.name}${gallery.color ? ` / ${gallery.color}` : ""}`,
  })), [group.looks]);

  return <article className="campaign-look-gallery__card" data-group={group.id}>
    <DryFitEditorialCarousel looks={slides} label={group.label} onLookChange={setActiveId} prioritizeFirst={false} showPageHint={false} imageSizes="(max-width: 760px) 90vw, (max-width: 1100px) 44vw, 23vw" />
    <Link className="campaign-look-gallery__details" href={selected.href} prefetch={false} aria-label={`Ver fotos e detalhes de ${selected.gallery.name}${selected.gallery.color ? ` / ${selected.gallery.color}` : ""}`}>Ver fotos e detalhes<EditorialArrow /></Link>
  </article>;
}

export function CollectionLookGallery({ collection }: { collection: CatalogCollection }) {
  const groups = collectionPresentationGroups(collection);
  return <section className="campaign-look-gallery" id="collection-looks" aria-label={`Looks da coleção ${collection.name}`}>
    <span className="campaign-look-gallery__alias" id="dry-fit" aria-hidden="true" />
    <p className="campaign-look-gallery__help">Navegue pelas cores de cada linha nas setas. Clique na foto para ver outros ângulos e detalhes.</p>
    <div className="campaign-look-gallery__groups">{groups.map(group => <CollectionGroupCard group={group} key={group.id} />)}</div>
    <div className="campaign-look-gallery__closing"><WholesaleLink>Conhecer as condições de atacado</WholesaleLink></div>
  </section>;
}
