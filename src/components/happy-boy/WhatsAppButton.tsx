"use client";

import { useEffect, useRef } from "react";
import { getWhatsAppHref } from "@/data/storefront";

export function WhatsAppButton() {
  const button = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const collection = document.querySelector<HTMLElement>(".collection-story");
    const benefits = document.querySelector<HTMLElement>(".editorial-reel__benefits");
    if (!collection || !benefits) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const active = String(benefits.getBoundingClientRect().top <= 0);
      if (button.current && button.current.dataset.collectionView !== active) button.current.dataset.collectionView = active;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  const href = getWhatsAppHref("Olá! Gostaria de conhecer melhor a coleção Travel Edition da Happy Boy.");
  if (!href) return null;
  return <a className="whatsapp-button" ref={button} href={href} target="_blank" rel="noopener noreferrer" aria-label="Conversar com a Happy Boy no WhatsApp — abre em nova aba">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20l1.2-4.6a8.5 8.5 0 1 1 16.3-3.9Z" /><path d="m8.2 7.2 1.4 2.6-.9 1c.9 1.7 1.8 2.6 3.7 3.4l.9-1 2.7 1.4c.2 1.8-1.3 2.2-2.3 2-4.3-.9-6.9-3.4-7.5-7-.2-1.2.7-2.5 2-2.4Z" strokeLinejoin="round" /></svg>
    <span>WhatsApp</span><span className="whatsapp-button__arrow" aria-hidden="true">↗</span>
  </a>;
}
