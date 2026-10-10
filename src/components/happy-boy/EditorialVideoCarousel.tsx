"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent } from "react";

const benefitItems = ["Happy Boy", "Travel Edition", "Nova coleção"];

const videos = [
  { file: "01-happyboy-travel-branco", color: "branco" },
  { file: "02-happyboy-travel-verde", color: "verde" },
  { file: "03-happyboy-travel-azul", color: "azul" },
  { file: "04-happyboy-travel-preto", color: "preto" },
];

const marqueeItems = Array.from({ length: 6 }, () => benefitItems).flat();

export function EditorialVideoCarousel() {
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
    <section className="editorial-reel" aria-label="Vídeos da coleção">
      <div className="editorial-reel__benefits" aria-label="Informações da coleção">
        <span className="sr-only">Happy Boy. Travel Edition. Nova coleção.</span>
        <div className="editorial-reel__marquee" aria-hidden="true">
          <div className="editorial-reel__marquee-track">
            {[0, 1].map((sequence) => (
              <div className="editorial-reel__marquee-sequence" key={sequence}>
                {marqueeItems.map((item, index) => (
                  <span className="editorial-reel__marquee-item" key={`${sequence}-${item}-${index}`}>
                    {item}<i aria-hidden="true" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="editorial-reel__heading">
        <div><p>Happy Boy / Modern Movement</p><h2>Quatro cores. Novos caminhos.</h2></div>
        <span>Travel Edition / 04 filmes</span>
      </div>
      <div className="editorial-reel__carousel">
        <div className="editorial-reel__track" ref={trackRef} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={endDrag} onPointerCancel={endDrag} onPointerLeave={endDrag}
          onClickCapture={(event) => {
            if (!suppressClick.current || event.detail === 0) return;
            event.preventDefault();
            event.stopPropagation();
            suppressClick.current = false;
          }}>
          {videos.map(({ file, color }, index) => (
            <Link className="editorial-reel__card" key={file} href={`/colecao/${color}`} prefetch={false} draggable={false} aria-label={`Ver galeria do conjunto ${color} — Travel Edition`}>
              <video data-src={`/videos/travel-edition/${file}.mp4`} poster={`/videos/travel-edition/${file}-capa.jpg`} autoPlay muted loop playsInline preload="none" disablePictureInPicture disableRemotePlayback draggable={false} aria-label={`Travel Edition — conjunto ${color}`} />
              <span className="editorial-reel__caption"><span>{String(index + 1).padStart(2, "0")} / {color}</span></span>
            </Link>
          ))}
        </div>
        <div className="editorial-reel__navigation" aria-label="Selecionar vídeo da coleção">
          <span aria-live="polite">{String(activeVideo + 1).padStart(2, "0")} <span>/ 04</span></span>
          <div>{videos.map(({ color }, index) => <button key={color} type="button" aria-label={`Ver vídeo ${color}`} aria-pressed={index === activeVideo} onClick={() => showVideo(index)}><span /></button>)}</div>
        </div>
      </div>
    </section>
  );
}
