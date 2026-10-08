"use client";

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
  const [navigation, setNavigation] = useState({ back: false, forward: true });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateNavigation = () => {
      const remaining = track.scrollWidth - track.clientWidth - track.scrollLeft;
      setNavigation({ back: track.scrollLeft > 2, forward: remaining > 2 });
    };

    updateNavigation();
    track.addEventListener("scroll", updateNavigation, { passive: true });
    window.addEventListener("resize", updateNavigation);

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
      track.removeEventListener("scroll", updateNavigation);
      window.removeEventListener("resize", updateNavigation);
    };
  }, []);

  const move = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.82, behavior: "smooth" });
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track) return;
    dragRef.current = { active: true, startX: event.clientX, startScroll: track.scrollLeft };
    track.classList.add("is-dragging");
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const track = trackRef.current;
    if (!track) return;
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

      <div className="editorial-reel__carousel">
        <button className="editorial-reel__arrow editorial-reel__arrow--back" type="button" aria-label="Ver vídeos anteriores" disabled={!navigation.back} onClick={() => move(-1)}>
          <span aria-hidden="true">←</span>
        </button>
        <div className="editorial-reel__track" ref={trackRef} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={endDrag} onPointerCancel={endDrag} onPointerLeave={endDrag}>
          {videos.map(({ file, color }) => (
            <article className="editorial-reel__card" key={file}>
              <video data-src={`/videos/travel-edition/${file}.mp4`} poster={`/videos/travel-edition/${file}-capa.jpg`} autoPlay muted loop playsInline preload="none" disablePictureInPicture disableRemotePlayback aria-label={`Travel Edition — conjunto ${color}`} />
            </article>
          ))}
        </div>
        <button className="editorial-reel__arrow editorial-reel__arrow--forward" type="button" aria-label="Ver próximos vídeos" disabled={!navigation.forward} onClick={() => move(1)}>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
