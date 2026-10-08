"use client";

import Link from "next/link";
import { useState } from "react";
import { collectionEditorialLooks as looks } from "@/data/editorial-looks";
import { DryFitEditorialCarousel } from "./DryFitEditorialCarousel";

export function DryFitEditorialSection() {
  const [id, setId] = useState(looks[0].id);
  const active = looks.findIndex((look) => look.id === id);
  const look = looks[active];

  return <section className="collection-editorial" id="dry-fit" aria-labelledby="collection-editorial-title">
    <figure className="collection-editorial__photo" data-collection-reveal>
      <DryFitEditorialCarousel onLookChange={setId} />
      <figcaption><span>Happy Boy — Travel Edition</span><span className="collection-editorial__position" aria-hidden="true">{String(active + 1).padStart(2, "0")} / {String(looks.length).padStart(2, "0")}</span></figcaption>
    </figure>
    <div className="collection-editorial__copy" data-collection-reveal>
      <p className="collection-eyebrow">01 / Nova coleção</p>
      <h2 id="collection-editorial-title">Feito para acompanhar o movimento.</h2>
      <p className="collection-editorial__look">{look.label}</p>
      <Link href={look.href} prefetch={false} className="collection-editorial__link" aria-label={`Conheça ${look.label}`}>Conheça o conjunto <span aria-hidden="true">↗</span></Link>
    </div>
  </section>;
}
