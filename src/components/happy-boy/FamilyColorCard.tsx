"use client";

import Link from "next/link";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { variantHref, variantPhoto, type CollectionFamily } from "@/data/collection-families";
import { SiteImage } from "./SiteImage";
import "./family-color-card.css";

export function FamilyColorCard({ family }: { family: CollectionFamily }) {
  const looks = family.variants;
  const slides = [looks[looks.length - 1], ...looks, looks[0]];
  const [position, setPosition] = useState(1);
  const [animated, setAnimated] = useState(true);
  const [busy, setBusy] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  const moving = useRef(false);
  const suppressClick = useRef(false);
  const gesture = useRef<{ x: number; y: number; dx: number; horizontal: boolean } | null>(null);
  const active = (position - 1 + looks.length) % looks.length;

  const move = async (direction: -1 | 1) => {
    const element = viewport.current;
    if (!element || moving.current) return;
    moving.current = true;
    setBusy(true);
    const next = position + direction;
    const image = element.querySelector<HTMLImageElement>(`[data-color-slide="${next}"] img`);
    if (image && (!image.complete || !image.naturalWidth)) {
      image.loading = "eager";
      try { await image.decode(); } catch { /* Keep the native image fallback. */ }
    }
    if (!element.isConnected) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAnimated(!reduced);
    setPosition(reduced ? ((next - 1 + looks.length) % looks.length) + 1 : next);
    if (reduced) {
      moving.current = false;
      setBusy(false);
    }
  };

  const resetGesture = (element: HTMLDivElement) => {
    element.style.setProperty("--color-drag", "0px");
    element.dataset.dragging = "false";
    gesture.current = null;
  };
  const pointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || moving.current) return;
    suppressClick.current = false;
    gesture.current = { x: event.clientX, y: event.clientY, dx: 0, horizontal: false };
  };

  return <div className="collection-look collection-look--editorial family-color-card" role="region" aria-roledescription="carrossel" aria-label={`Cores de ${family.name}`} aria-busy={busy} tabIndex={0}
    onKeyDown={(event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      event.currentTarget.focus({ preventScroll: true });
      void move(event.key === "ArrowLeft" ? -1 : 1);
    }}>
    <figure className="collection-look__photo family-color-card__photo">
      <div ref={viewport} className="family-color-card__viewport" onPointerDown={pointerDown}
        onPointerMove={(event) => {
          const current = gesture.current;
          if (!current) return;
          current.dx = event.clientX - current.x;
          if (!current.horizontal && Math.abs(current.dx) > 12 && Math.abs(current.dx) > Math.abs(event.clientY - current.y)) {
            current.horizontal = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            event.currentTarget.dataset.dragging = "true";
          }
          if (current.horizontal) event.currentTarget.style.setProperty("--color-drag", `${Math.max(-90, Math.min(90, current.dx))}px`);
        }}
        onPointerUp={(event) => {
          const current = gesture.current;
          if (!current) return;
          suppressClick.current = current.horizontal;
          resetGesture(event.currentTarget);
          if (current.horizontal) event.currentTarget.closest<HTMLElement>(".family-color-card")?.focus({ preventScroll: true });
          if (current.horizontal && Math.abs(current.dx) > 40) void move(current.dx > 0 ? -1 : 1);
        }}
        onPointerCancel={(event) => resetGesture(event.currentTarget)}
        onClickCapture={(event) => {
          if (!suppressClick.current && !moving.current) return;
          event.preventDefault();
          event.stopPropagation();
          suppressClick.current = false;
        }}>
        <div className="family-color-card__track" data-animated={animated} style={{ "--color-position": position } as CSSProperties}
          onTransitionEnd={(event) => {
            if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
            if (position === 0 || position === looks.length + 1) {
              setAnimated(false);
              setPosition(position === 0 ? looks.length : 1);
            }
            moving.current = false;
            setBusy(false);
          }}>
          {slides.map((variant, index) => {
            const selected = index === active + 1;
            return <Link key={`${variant.color}-${index}`} href={variantHref(family.slug, variant.color)} prefetch={false}
              className="family-color-card__slide" data-color-slide={index} aria-hidden={!selected} tabIndex={selected ? 0 : -1}
              aria-label={`Ver ${family.name} — ${variant.name}`} draggable={false}>
              <SiteImage src={variantPhoto(variant.cover)} alt={variant.photos[0].alt} fill sizes="(max-width: 700px) 92vw, (max-width: 1100px) 44vw, 23vw" loading="lazy" draggable={false} />
            </Link>;
          })}
        </div>
      </div>
    </figure>
    <div className="family-color-card__caption">
      <p className="collection-look__label family-color-card__label">{family.name}<span aria-live="polite">{looks[active].name}</span></p>
      <div className="family-color-card__controls" aria-label={`Navegação de cores — ${family.name}`}>
      <button type="button" disabled={busy} className="family-color-card__arrow family-color-card__arrow--previous" aria-label={`Cor anterior — ${family.name}`} onClick={() => void move(-1)}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6" /></svg>
      </button>
      <button type="button" disabled={busy} className="family-color-card__arrow family-color-card__arrow--next" aria-label={`Próxima cor — ${family.name}`} onClick={() => void move(1)}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
      </button>
      </div>
    </div>
  </div>;
}
