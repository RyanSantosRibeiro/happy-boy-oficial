"use client";

import Link from "next/link";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import type { LifestyleGalleryData } from "@/data/lifestyle-galleries";
import { BrandMark } from "./BrandMark";
import { SiteImage } from "./SiteImage";
import { ProductConsultationButton } from "./ProductConsultationButton";

export function LifestyleGallery({ look }: { look: LifestyleGalleryData }) {
  const [selected, setSelected] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const request = useRef(0);
  const suppressClick = useRef(false);
  const gesture = useRef<{ x: number; y: number } | null>(null);

  const select = async (index: number) => {
    const next = Math.max(0, Math.min(look.photos.length - 1, index));
    const token = ++request.current;
    const image = stage.current?.querySelector<HTMLImageElement>(`[data-photo="${next}"] img`);
    if (image && (!image.complete || !image.naturalWidth)) {
      image.loading = "eager";
      try { await image.decode(); } catch { /* Retain the browser image fallback. */ }
    }
    if (token === request.current && stage.current?.isConnected) setSelected(next);
  };

  const finishGesture = (event: PointerEvent<HTMLDivElement>) => {
    const start = gesture.current;
    gesture.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      suppressClick.current = true;
      event.currentTarget.focus({ preventScroll: true });
      void select(selected + (dx < 0 ? 1 : -1));
    }
  };

  return <main className="look-gallery lifestyle-gallery">
    <header className="look-gallery__header">
      <Link href="/" className="look-gallery__brand" aria-label="Happy Boy — início"><BrandMark /></Link>
      <Link href="/#collection" className="look-gallery__back">← Voltar à coleção</Link>
    </header>
    <div className="look-gallery__layout">
      <section className="look-gallery__media" aria-label={`Fotografias de ${look.name.toLowerCase()}`}>
        <div className="lifestyle-gallery__stage" ref={stage} tabIndex={0} aria-label="Galeria de fotos; deslize ou use as setas do teclado"
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              event.currentTarget.focus({ preventScroll: true });
              void select(selected + (event.key === "ArrowRight" ? 1 : -1));
            }
          }}
          onPointerDown={(event) => {
            if (event.button !== 0) return;
            suppressClick.current = false;
            gesture.current = { x: event.clientX, y: event.clientY };
          }}
          onPointerMove={(event) => {
            const start = gesture.current;
            if (start && Math.abs(event.clientX - start.x) > 12 && Math.abs(event.clientX - start.x) > Math.abs(event.clientY - start.y)) {
              event.currentTarget.setPointerCapture(event.pointerId);
            }
          }}
          onPointerUp={finishGesture}
          onPointerCancel={() => { gesture.current = null; }}
          onClickCapture={(event) => {
            if (!suppressClick.current) return;
            event.preventDefault();
            event.stopPropagation();
            suppressClick.current = false;
          }}>
          {look.photos.map((photo, index) => <a key={photo.id} href={photo.original} target="_blank" rel="noopener noreferrer"
            className="lifestyle-gallery__photo" data-photo={index} data-active={index === selected} aria-hidden={index !== selected}
            tabIndex={index === selected ? 0 : -1} aria-label={`Ampliar fotografia ${index + 1} de ${look.name.toLowerCase()} em resolução original`} draggable={false}>
            <SiteImage src={photo.src} alt={photo.alt} fill sizes="(max-width: 900px) 100vw, 60vw" preload={index === 0}
              loading={index === 0 ? undefined : "lazy"} draggable={false} />
          </a>)}
        </div>
        <div className="look-gallery__thumbnails" aria-label="Selecionar fotografia">
          {look.photos.map((photo, index) => <button key={photo.id} type="button" className="look-gallery__thumbnail"
            aria-label={`Ver imagem ${index + 1} de ${look.name.toLowerCase()}`} aria-pressed={selected === index} onClick={() => void select(index)}>
            <SiteImage src={photo.src} alt="" width={120} height={180} sizes="(max-width: 700px) 18vw, 64px" />
          </button>)}
        </div>
      </section>
      <section className="look-gallery__information" aria-labelledby="lifestyle-look-title">
        <p className="collection-eyebrow">Happy Boy</p>
        <h1 id="lifestyle-look-title">{look.name}</h1>
        {look.color && <p className="lifestyle-gallery__color-name">{look.color}</p>}
        {look.variants && <nav className="look-gallery__colors lifestyle-gallery__colors" aria-label={`Cores de ${look.name}`}>
          {look.variants.map(variant => <Link key={variant.color} href={variant.href} prefetch={false}
            className="look-gallery__color" aria-current={variant.name === look.color ? "page" : undefined}>
            <span className="look-gallery__swatch" style={{ "--swatch": variant.swatch } as CSSProperties} aria-hidden="true" />
            <span>{variant.name}</span>
          </Link>)}
        </nav>}
        <ProductConsultationButton name={look.name} color={look.color} />
        <div className="lifestyle-gallery__navigation" aria-label="Navegar entre fotografias">
          <button type="button" aria-label="Fotografia anterior" disabled={selected === 0} onClick={() => void select(selected - 1)}>←</button>
          <p className="look-gallery__count" aria-live="polite">{String(selected + 1).padStart(2, "0")} <span>/ {String(look.photos.length).padStart(2, "0")}</span></p>
          <button type="button" aria-label="Próxima fotografia" disabled={selected === look.photos.length - 1} onClick={() => void select(selected + 1)}>→</button>
        </div>
        <a className="lifestyle-gallery__original" href={look.photos[selected].original} target="_blank" rel="noopener noreferrer">Ver em resolução original ↗</a>
        <Link href="/#collection" className="look-gallery__back lifestyle-gallery__return">← Voltar à coleção</Link>
      </section>
    </div>
  </main>;
}
