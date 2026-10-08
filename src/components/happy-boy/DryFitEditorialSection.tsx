"use client";

import Link from "next/link";
import { useState } from "react";
import type { CollectionSlug } from "@/data/collection";
import { dryFitEditorialLooks as looks } from "@/data/editorial-looks";
import { DryFitEditorialCarousel } from "./DryFitEditorialCarousel";

export function DryFitEditorialSection() {
  const [slug, setSlug] = useState<CollectionSlug>(looks[0].slug);
  const active = looks.findIndex((look) => look.slug === slug);
  const look = looks[active];

  return <section className="collection-editorial" id="dry-fit" aria-labelledby="collection-editorial-title">
    <figure className="collection-editorial__photo" data-collection-reveal>
      <DryFitEditorialCarousel onLookChange={setSlug} />
      <figcaption><span>Happy Boy — Travel Edition</span><span className="collection-editorial__position" aria-hidden="true">{String(active + 1).padStart(2, "0")} / 04</span></figcaption>
    </figure>
    <div className="collection-editorial__copy" data-collection-reveal>
      <p className="collection-eyebrow">01 / Nova coleção</p>
      <h2 id="collection-editorial-title">Feito para acompanhar o movimento.</h2>
      <p className="collection-editorial__look">Conjunto Dry Fit / {look.name}</p>
      <Link href={`/colecao/${slug}`} prefetch={false} className="collection-editorial__link" aria-label={`Conheça o conjunto ${look.name.toLowerCase()}`}>Conheça o conjunto <span aria-hidden="true">↗</span></Link>
    </div>
  </section>;
}
