"use client";

import Link from "next/link";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { dryFitEditorialLooks as looks } from "@/data/editorial-looks";
import { SiteImage } from "./SiteImage";

const slides = [looks[looks.length - 1], ...looks, looks[0]];

export function DryFitEditorialCarousel() {
  const [position, setPosition] = useState(1);
  const [animated, setAnimated] = useState(true);
  const viewport = useRef<HTMLDivElement>(null);
  const moving = useRef(false);
  const suppressClick = useRef(false);
  const gesture = useRef<{ x: number; y: number; dx: number; horizontal: boolean } | null>(null);
  const active = (position - 1 + looks.length) % looks.length;

  const move = async (direction: -1 | 1) => {
    const element = viewport.current;
    if (!element || moving.current) return;
    moving.current = true;
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
    if (reduced) moving.current = false;
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

  return <div className="editorial-photo-carousel" role="region" aria-roledescription="carrossel" aria-label="Conjuntos Dry Fit Happy Boy" tabIndex={0}
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
        if (!suppressClick.current) return;
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
        }}>
        {slides.map((look, index) => {
          const clone = index === 0 || index === slides.length - 1;
          const selected = !clone && index === active + 1;
          return <Link key={`${look.slug}-${index}`} className="editorial-photo-carousel__slide" href={`/colecao/${look.slug}`} prefetch={false} draggable={false}
            data-slide={index} aria-hidden={!selected} tabIndex={selected ? 0 : -1} aria-label={`Ver conjunto ${look.name.toLowerCase()}`}>
            <SiteImage src={look.src} alt={look.alt} fill sizes="(max-width: 700px) 80vw, 54vw" preload={index === 1} loading={index === 1 ? undefined : Math.abs(index - position) <= 1 ? "eager" : "lazy"} draggable={false} />
          </Link>;
        })}
      </div>
    </div>
    <button className="editorial-photo-carousel__arrow editorial-photo-carousel__arrow--previous" type="button" aria-label="Anterior — conjunto Dry Fit" onClick={() => void move(-1)}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6" /></svg>
    </button>
    <button className="editorial-photo-carousel__arrow editorial-photo-carousel__arrow--next" type="button" aria-label="Próximo — conjunto Dry Fit" onClick={() => void move(1)}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
    </button>
    <span className="sr-only" aria-live="polite">Conjunto {looks[active].name.toLowerCase()}, {active + 1} de {looks.length}</span>
  </div>;
}
