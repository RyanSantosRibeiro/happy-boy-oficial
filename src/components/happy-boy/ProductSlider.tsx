"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { formatPrice, type Product } from "@/data/products";
import { SiteImage } from "./SiteImage";

export function ProductSlider({ products, label }: { products: Product[]; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const [navigation, setNavigation] = useState({ start: 0, back: false, next: products.length > 2 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const cards = Array.from(track.children) as HTMLElement[];
      const step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth;
      const start = Math.max(0, Math.round(track.scrollLeft / Math.max(1, step)));
      const back = track.scrollLeft > 2;
      const next = track.scrollWidth - track.clientWidth - track.scrollLeft > 2;
      setNavigation((previous) => previous.start === start && previous.back === back && previous.next === next ? previous : { start, back, next });
    };
    track.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => { observer.disconnect(); track.removeEventListener("scroll", update); };
  }, [products.length]);

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const target = Math.max(0, Math.min(cards.length - 2, navigation.start + direction * 2));
    track.scrollTo({ left: cards[target]?.offsetLeft ?? 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  return <div className="product-slider" role="region" aria-roledescription="carrossel" aria-label={label}>
    <div className="product-slider__track" id={id} ref={trackRef} tabIndex={0} aria-label="Produtos; use as setas para navegar" onKeyDown={(event) => {
      if (event.target !== event.currentTarget) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1); }
    }}>
      {products.map((product) => <article className="product-card" key={product.id}>
        <Link href={`/produto/${product.slug}`} className="product-card__link">
          <div className="product-card__image"><SiteImage src={product.images[0].src} alt={product.images[0].alt} fill sizes="(max-width: 760px) 45vw, 23vw" /></div>
          <p className="product-card__category">{product.category}</p>
          <h3>{product.name}</h3>
          <p className="product-card__price">{product.compareAtPrice !== null && product.price !== null && product.compareAtPrice > product.price && <del>{formatPrice(product.compareAtPrice)}</del>} {formatPrice(product.price)}</p>
          <span className="product-card__view">Conhecer peça <span aria-hidden="true">↗</span></span>
        </Link>
      </article>)}
    </div>
    <div className="product-slider__controls">
      <span className="product-slider__count" aria-live="polite" aria-atomic="true">{navigation.start + 1}–{Math.min(navigation.start + 2, products.length)} de {products.length} peças</span>
      <div><button type="button" aria-label="Ver produtos anteriores" aria-controls={id} disabled={!navigation.back} onClick={() => move(-1)}>←</button><button type="button" aria-label="Ver próximos produtos" aria-controls={id} disabled={!navigation.next} onClick={() => move(1)}>→</button></div>
    </div>
  </div>;
}
