"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import type { CatalogCollection } from "@/data/catalog";
import { MobileEditorialArrow } from "./MobileEditorialArrow";
import { CollectionMarquee } from "./CollectionMarquee";

export function EditorialVideoCarousel({ collection, beforeVideos, showMarquee = true, editorialHeading, headingLevel = 2 }: { collection: CatalogCollection; beforeVideos?: ReactNode; showMarquee?: boolean; editorialHeading?: { kicker: string; title: string }; headingLevel?: 2 | 3 }) {
  const videos = collection.presentation.films;
  const Heading = headingLevel === 3 ? "h3" : "h2";
  const kicker = editorialHeading?.kicker ?? collection.presentation.filmHeading.kicker;
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0 });
  const suppressClick = useRef(false);
  const [activeVideo, setActiveVideo] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const cards = Array.from(track.children) as HTMLElement[];
      const origin = cards[0]?.offsetLeft ?? 0;
      let closest = 0;
      cards.forEach((card, index) => {
        if (Math.abs(card.offsetLeft - origin - track.scrollLeft) < Math.abs(cards[closest].offsetLeft - origin - track.scrollLeft)) closest = index;
      });
      setActiveVideo(closest);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    track.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      track.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  const showVideo = (index: number) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - (track.children[0] as HTMLElement).offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            if (!video.getAttribute("src") && video.dataset.src) video.src = video.dataset.src;
            void video.play().catch(() => undefined);
          } else video.pause();
        });
      },
      { threshold: 0.35 },
    );

    const media = Array.from(track.querySelectorAll("video"));
    media.forEach((video) => observer.observe(video));

    return () => {
      observer.disconnect();
      media.forEach((video) => video.pause());
    };
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    suppressClick.current = false;
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    dragRef.current = { active: true, startX: event.clientX, startScroll: track.scrollLeft };
    track.classList.add("is-dragging");
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const track = trackRef.current;
    if (!track) return;
    if (Math.abs(event.clientX - dragRef.current.startX) > 6) suppressClick.current = true;
    if (!suppressClick.current) return;
    event.preventDefault();
    track.scrollLeft = dragRef.current.startScroll - (event.clientX - dragRef.current.startX);
  };

  const endDrag = () => {
    dragRef.current.active = false;
    trackRef.current?.classList.remove("is-dragging");
  };

  return (
    <section className={`editorial-reel${editorialHeading ? " editorial-reel--collection-heading" : ""}`} aria-label="Vídeos da coleção">
      {showMarquee && <CollectionMarquee collection={collection} />}

      {beforeVideos}
      <div className="editorial-reel__heading">
        <div>{kicker && <p>{kicker}</p>}<Heading>{editorialHeading?.title ?? collection.presentation.filmHeading.title}</Heading></div>
        <span>{collection.name} / {String(videos.length).padStart(2, "0")} filmes</span>
      </div>
      <p className="navigation-help">Clique em um vídeo para abrir a página do conjunto e ver suas fotos e detalhes.</p>
      <div className="editorial-reel__carousel">
        <div className="editorial-reel__track" ref={trackRef} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={endDrag} onPointerCancel={endDrag} onPointerLeave={endDrag}
          onClickCapture={(event) => {
            if (!suppressClick.current || event.detail === 0) return;
            event.preventDefault();
            event.stopPropagation();
            suppressClick.current = false;
          }}>
          {videos.map(({ src, poster, color, href }, index) => (
            <Link className="editorial-reel__card" key={src} href={href} prefetch={false} draggable={false} aria-label={`Ver galeria do conjunto ${color} — ${collection.name}`}>
              <video data-src={src} poster={poster} autoPlay muted loop playsInline preload="none" disablePictureInPicture disableRemotePlayback draggable={false} aria-label={`${collection.name} — conjunto ${color}`} />
              <span className="editorial-reel__caption"><span>{String(index + 1).padStart(2, "0")} / {color}</span><span className="editorial-reel__open-page">Ver fotos e detalhes <span aria-hidden="true">→</span><MobileEditorialArrow direction="right" /></span></span>
            </Link>
          ))}
        </div>
        <button className="editorial-reel__arrow editorial-reel__arrow--previous" type="button" aria-label="Vídeo anterior da coleção" onClick={() => showVideo((activeVideo - 1 + videos.length) % videos.length)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6" /></svg>
        </button>
        <button className="editorial-reel__arrow editorial-reel__arrow--next" type="button" aria-label="Próximo vídeo da coleção" onClick={() => showVideo((activeVideo + 1) % videos.length)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
        </button>
        <div className="editorial-reel__navigation" aria-label="Selecionar vídeo da coleção">
          <span aria-live="polite">{String(activeVideo + 1).padStart(2, "0")} <span>/ {String(videos.length).padStart(2, "0")}</span></span>
          <div>{videos.map(({ color }, index) => <button key={color} type="button" aria-label={`Ver vídeo ${color}`} aria-pressed={index === activeVideo} onClick={() => showVideo(index)}><span /></button>)}</div>
        </div>
      </div>
    </section>
  );
}
