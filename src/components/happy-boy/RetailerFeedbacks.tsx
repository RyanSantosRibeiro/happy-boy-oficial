"use client";

import { useEffect, useRef, useState } from "react";
import { retailerFeedbacks, type RetailerFeedback } from "@/data/retailer-feedbacks";
import { WholesaleLink } from "./WholesaleLink";
import "./retailer-feedbacks.css";

export function RetailerFeedbacks({ items = retailerFeedbacks }: { items?: RetailerFeedback[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const next = { start: track.scrollLeft <= 2, end: track.scrollLeft >= track.scrollWidth - track.clientWidth - 2 };
      setEdges(current => current.start === next.start && current.end === next.end ? current : next);
    };
    const frame = requestAnimationFrame(update);
    const observer = new ResizeObserver(update);
    observer.observe(track);
    track.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      track.removeEventListener("scroll", update);
    };
  }, [items.length]);

  const move = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth;
    const max = Math.max(0, track.scrollWidth - track.clientWidth);
    track.scrollTo({ left: Math.max(0, Math.min(max, track.scrollLeft + step * direction)), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  if (!items.length) return null;

  return <section className="retailer-feedbacks wholesale-section" id="feedbacks" aria-labelledby="feedbacks-title">
    <header className="retailer-feedbacks__heading">
      <div><p className="wholesale-kicker">05 / Feedbacks de lojistas</p><h2 id="feedbacks-title">Quem vende Happy Boy, recomenda.</h2></div>
      <p>Conheça as experiências de lojistas parceiros da Happy Boy. Em breve, histórias reais sobre nossas coleções, atendimento e parceria comercial.</p>
    </header>
    <div className="retailer-feedbacks__carousel">
      <div className="retailer-feedbacks__track" ref={trackRef} tabIndex={0} role="group" aria-label="Depoimentos de lojistas; deslize ou use as setas para navegar" onKeyDown={event => {
        if (event.target !== event.currentTarget || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
        event.preventDefault();
        move(event.key === "ArrowLeft" ? -1 : 1);
      }}>
        {items.map((item, index) => <figure className="retailer-feedbacks__card" key={item.id} aria-label={item.video ? item.merchantName || "Depoimento de lojista parceiro" : `Depoimento ${index + 1} — em breve`}>
          {item.video ? <>
            <video className="retailer-feedbacks__media" src={item.video.src} poster={item.video.poster} controls playsInline preload="none" aria-label={item.merchantName ? `Depoimento de ${item.merchantName}` : "Depoimento de lojista parceiro"} />
            {(item.merchantName || item.location || item.quote || item.video.durationSeconds != null) && <figcaption>
              {item.merchantName && <p className="retailer-feedbacks__name">{item.merchantName}</p>}
              {item.location && <p>{item.location}</p>}
              {item.quote && <blockquote>{item.quote}</blockquote>}
              {item.video.durationSeconds != null && <small>Duração: {Math.floor(item.video.durationSeconds / 60)}:{String(Math.floor(item.video.durationSeconds % 60)).padStart(2, "0")}</small>}
            </figcaption>}
          </> : <div className="retailer-feedbacks__placeholder"><span>EM BREVE</span></div>}
        </figure>)}
      </div>
      <button className="retailer-feedbacks__arrow retailer-feedbacks__arrow--previous" type="button" disabled={edges.start} aria-label="Depoimentos anteriores" onClick={() => move(-1)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6" /></svg></button>
      <button className="retailer-feedbacks__arrow retailer-feedbacks__arrow--next" type="button" disabled={edges.end} aria-label="Próximos depoimentos" onClick={() => move(1)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></button>
    </div>
    <WholesaleLink className="retailer-feedbacks__contact">Quero falar com o comercial</WholesaleLink>
  </section>;
}
