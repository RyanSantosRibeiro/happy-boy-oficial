"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { collectionEditorialLooks as looks } from "@/data/editorial-looks";
import { SiteImage } from "./SiteImage";

const slides = [looks[looks.length - 1], ...looks, looks[0]];

export function DryFitEditorialCarousel({ onLookChange }: { onLookChange?: (id: string) => void }) {
  const [position, setPosition] = useState(1);
  const [animated, setAnimated] = useState(true);
  const [busy, setBusy] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  const moving = useRef(false);
  const suppressClick = useRef(false);
  const gesture = useRef<{ x: number; y: number; dx: number; horizontal: boolean } | null>(null);
  const active = (position - 1 + looks.length) % looks.length;
  useEffect(() => { onLookChange?.(looks[active].id); }, [active, onLookChange]);

  const move = async (direction: -1 | 1) => {
    const element = viewport.current;
    if (!element || moving.current) return;
    moving.current = true;
    setBusy(true);
    const next = position + direction;
    const image = element.querySelector<HTMLImageElement>(`[data-slide="${next}"] img`);
    if (image && (!image.complete || !image.naturalWidth)) {
      image.loading = "eager";
      try { await image.decode(); } catch { /* Preserve the browser's image fallback. */ }
    }
    if (!viewport.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAnimated(!reduced);
    setPosition(reduced ? ((next - 1 + looks.length) % looks.length) + 1 : next);
    if (reduced) { moving.current = false; setBusy(false); }
  };

  const resetGesture = (element: HTMLDivElement) => {
    element.style.setProperty("--drag-offset", "0px");
    element.dataset.dragging = "false";
    gesture.current = null;
  };

  const pointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || moving.current) return;
    suppressClick.current = false;
    gesture.current = { x: event.clientX, y: event.clientY, dx: 0, horizontal: false };
  };

  return <div className="editorial-photo-carousel" role="region" aria-roledescription="carrossel" aria-label="Conjunto Polo Dry Fit Canelado Happy Boy" aria-busy={busy} tabIndex={0}
    onKeyDown={(event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        event.currentTarget.focus({ preventScroll: true });
        void move(event.key === "ArrowLeft" ? -1 : 1);
      }
    }}>
    <div className="editorial-photo-carousel__viewport" ref={viewport}
      onPointerDown={pointerDown}
      onPointerMove={(event) => {
        const current = gesture.current;
        if (!current) return;
        current.dx = event.clientX - current.x;
        if (!current.horizontal && Math.abs(current.dx) > 12 && Math.abs(current.dx) > Math.abs(event.clientY - current.y)) {
          current.horizontal = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          event.currentTarget.dataset.dragging = "true";
        }
        if (current.horizontal) event.currentTarget.style.setProperty("--drag-offset", `${Math.max(-100, Math.min(100, current.dx))}px`);
      }}
      onPointerUp={(event) => {
        const current = gesture.current;
        if (!current) return;
        suppressClick.current = current.horizontal;
        resetGesture(event.currentTarget);
        if (current.horizontal) event.currentTarget.parentElement?.focus({ preventScroll: true });
        if (current.horizontal && Math.abs(current.dx) > 40) void move(current.dx > 0 ? -1 : 1);
      }}
      onPointerCancel={(event) => resetGesture(event.currentTarget)}
      onClickCapture={(event) => {
        if (!suppressClick.current && !moving.current) return;
        event.preventDefault();
        event.stopPropagation();
        suppressClick.current = false;
      }}>
      <div className="editorial-photo-carousel__track" data-animated={animated} style={{ "--slide-position": position } as CSSProperties}
        onTransitionEnd={(event) => {
          if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
          if (position === 0 || position === looks.length + 1) {
            setAnimated(false);
            setPosition(position === 0 ? looks.length : 1);
          }
          moving.current = false;
          setBusy(false);
        }}>
        {slides.map((look, index) => {
          const clone = index === 0 || index === slides.length - 1;
          const selected = !clone && index === active + 1;
          return <Link key={`${look.id}-${index}`} className="editorial-photo-carousel__slide" href={look.href} prefetch={false} draggable={false}
            data-slide={index} aria-hidden={!selected} tabIndex={selected ? 0 : -1} aria-label={`Ver ${look.label}`}>
            <SiteImage src={look.src} alt={look.alt} fill sizes="(max-width: 760px) 90vw, (max-width: 1100px) 44vw, 600px" preload={index === 1} loading={index === 1 ? undefined : Math.abs(index - position) <= 1 ? "eager" : "lazy"} draggable={false} />
          </Link>;
        })}
      </div>
    </div>
    <button className="editorial-photo-carousel__arrow editorial-photo-carousel__arrow--previous" type="button" disabled={busy} aria-label="Anterior — conjunto Polo Dry Fit Canelado" onClick={() => void move(-1)}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6" /></svg>
    </button>
    <button className="editorial-photo-carousel__arrow editorial-photo-carousel__arrow--next" type="button" disabled={busy} aria-label="Próximo — conjunto Polo Dry Fit Canelado" onClick={() => void move(1)}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
    </button>
    <span className="sr-only" aria-live="polite">{looks[active].label}, {active + 1} de {looks.length}</span>
  </div>;
}
