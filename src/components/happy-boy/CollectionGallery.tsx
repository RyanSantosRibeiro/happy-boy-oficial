"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { collectionItems, type Collection } from "@/data/collection";
import { SiteImage } from "./SiteImage";
import { BrandMark } from "./BrandMark";
import { ProductConsultationButton } from "./ProductConsultationButton";

export function CollectionGallery({ collection }: { collection: Collection }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const selectionRequest = useRef(0);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setCurrentIndex(Math.max(0, Math.min(collection.images.length - 1, Math.round(element.scrollLeft / element.clientWidth))));
      });
    };
    element.addEventListener("scroll", update, { passive: true });
    return () => { element.removeEventListener("scroll", update); cancelAnimationFrame(frame); };
  }, [collection.images.length]);

  const select = async (index: number) => {
    const element = track.current;
    if (!element) return;
    const request = ++selectionRequest.current;
    const image = element.children[index]?.querySelector("img");
    // Load only the requested angle before moving it into view.
    if (image && (!image.complete || !image.naturalWidth)) {
      image.loading = "eager";
      try { await image.decode(); } catch { /* Keep native image error handling. */ }
    }
    if (request !== selectionRequest.current || !element.isConnected) return;
    element.scrollTo({ left: index * element.clientWidth, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  return <main className="look-gallery">
    <header className="look-gallery__header">
      <Link href="/" className="look-gallery__brand" aria-label="Happy Boy — início"><BrandMark /></Link>
      <Link href="/#collection" className="look-gallery__back">← Voltar à coleção</Link>
    </header>
    <div className="look-gallery__layout">
      <section className="look-gallery__media" aria-label={`Fotografias do conjunto ${collection.name.toLowerCase()}`}>
        <div className="look-gallery__track" ref={track} tabIndex={0} aria-label="Galeria de fotos; deslize ou use as setas do teclado" onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            select(Math.max(0, Math.min(collection.images.length - 1, currentIndex + (event.key === "ArrowRight" ? 1 : -1))));
          }
        }}>
          {collection.images.map((image, index) => <figure className="look-gallery__slide" key={image}>
            <SiteImage src={image} alt={collection.altTexts[index]} fill sizes="(max-width: 700px) 100vw, 60vw" preload={index === 0} />
          </figure>)}
        </div>
        <div className="look-gallery__thumbnails" aria-label="Selecionar fotografia">
          {collection.images.map((image, index) => <button type="button" key={image} className="look-gallery__thumbnail" aria-label={`Ver imagem ${index + 1} do conjunto ${collection.name.toLowerCase()}`} aria-pressed={index === currentIndex} onClick={() => select(index)}>
            <SiteImage src={image} alt="" width={120} height={180} sizes="(max-width: 700px) 18vw, 64px" />
          </button>)}
        </div>
      </section>
      <section className="look-gallery__information" aria-labelledby="look-title">
        <p className="collection-eyebrow">Happy Boy / Travel Edition</p>
        <h1 id="look-title">Conjunto {collection.name.toLowerCase()}</h1>
        <p className="look-gallery__caption">Entre caminhos, movimento e presença.</p>
        <nav className="look-gallery__colors" aria-label="Explorar outras cores">
          {collectionItems.map(({ slug, name, swatch }) => <Link href={`/colecao/${slug}`} key={slug} className="look-gallery__color" aria-current={slug === collection.slug ? "page" : undefined}>
            <span className="look-gallery__swatch" style={{ "--swatch": swatch } as CSSProperties} aria-hidden="true" />
            <span>{name}</span>
          </Link>)}
        </nav>
        <ProductConsultationButton name="Conjunto Dry Fit" color={collection.name} />
        <p className="look-gallery__count" aria-live="polite">{String(currentIndex + 1).padStart(2, "0")} <span>/ {String(collection.images.length).padStart(2, "0")}</span></p>
      </section>
    </div>
  </main>;
}
