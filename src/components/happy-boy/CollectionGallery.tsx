"use client";

import Link from "next/link";
import { useState } from "react";
import type { Collection } from "@/data/collection";
import { SiteImage } from "./SiteImage";
import { BrandMark } from "./BrandMark";

type CollectionGalleryProps = { collection: Collection };

export function CollectionGallery({ collection }: CollectionGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const image = collection.images[currentIndex];

  return <main className="collection-gallery">
    <header className="collection-gallery__header">
      <Link href="/" className="collection-gallery__brand" aria-label="Happy Boy — início">
        <BrandMark />
      </Link>
      <Link href="/#collection" className="collection-gallery__back">← Voltar</Link>
    </header>

    <section className="collection-gallery__content" aria-label={`Coleção ${collection.name}`}>
      <div className="collection-gallery__main-image">
        <SiteImage key={image} src={image} alt={`Imagem provisória Happy Boy ${collection.name.toLowerCase()} — ${currentIndex + 1}`} fill sizes="(max-width: 820px) 100vw, 64vw" preload className="collection-gallery__selected-image" />
      </div>

      <aside className="collection-gallery__details">
        <div className="collection-gallery__title-row">
          <h1>{collection.name}</h1>
          <span>{String(currentIndex + 1).padStart(2, "0")} / {String(collection.images.length).padStart(2, "0")}</span>
        </div>
        <div className="collection-gallery__thumbnails" aria-label="Imagens da coleção">
          {collection.images.map((thumbnail, index) => <button type="button" key={`${thumbnail}-${index}`} onClick={() => setCurrentIndex(index)} className="collection-gallery__thumbnail" aria-label={`Ver imagem ${index + 1}`} aria-pressed={index === currentIndex}>
            <SiteImage src={thumbnail} alt="" fill sizes="(max-width: 820px) 25vw, 16vw" />
          </button>)}
        </div>
      </aside>
    </section>
  </main>;
}
