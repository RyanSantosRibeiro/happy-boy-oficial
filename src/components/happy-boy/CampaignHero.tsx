"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { storefront } from "@/data/storefront";
import { Header } from "./Header";
import { SiteImage } from "./SiteImage";

/** A single viewport, looping film and one delayed entrance for header + copy. */
export function CampaignHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const pausedByUser = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const { hero } = storefront;

  useEffect(() => {
    const video = videoRef.current;
    const root = rootRef.current;
    if (!video || !root || !hero.videoSrc) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let disposed = false;
    const reconcile = () => {
      if (disposed) return;
      if (visible && !document.hidden && !motion.matches && !pausedByUser.current) {
        void video.play().then(() => {
          if (!disposed && video.readyState >= 2) { setReady(true); setFailed(false); }
        }).catch(() => { /* The play control remains available. */ });
      } else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; reconcile(); }, { threshold: 0.05 });
    observer.observe(root);
    document.addEventListener("visibilitychange", reconcile);
    motion.addEventListener("change", reconcile);
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", reconcile);
      motion.removeEventListener("change", reconcile);
      video.pause();
    };
  }, [hero.videoSrc]);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    pausedByUser.current = !video.paused;
    if (video.paused) void video.play().catch(() => undefined);
    else video.pause();
  };

  return (
    <section id="top" className="campaign-hero" ref={rootRef} aria-labelledby="campaign-heading" style={{ "--hero-reveal-delay": `${hero.revealDelaySeconds}s` } as CSSProperties}>
      <div className="campaign-hero__media" aria-hidden="true">
        <SiteImage src={hero.poster} alt="" fill sizes="100vw" preload />
        {hero.videoSrc && <video
          ref={videoRef}
          src={hero.videoSrc}
          poster={hero.poster}
          className="campaign-hero__video"
          data-ready={ready && !failed}
          muted loop playsInline preload="metadata" tabIndex={-1}
          onLoadStart={() => { setFailed(false); setReady(false); }}
          onLoadedData={() => setReady(true)}
          onPlaying={() => { setReady(true); setFailed(false); }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => { setFailed(true); setPlaying(false); }}
        />}
      </div>
      <div className="campaign-hero__header campaign-hero__reveal"><Header /></div>
      <div className="campaign-hero__copy campaign-hero__reveal">
        <p className="campaign-hero__edition">Happy Boy / Nova coleção</p>
        <h1 id="campaign-heading">{hero.title}</h1>
        <div className="campaign-hero__bottom">
          <p>{hero.subtitle}</p>
          <a href="#shop">Explore a coleção <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      {hero.videoSrc && !failed && <button className="campaign-hero__play" type="button" onClick={toggleVideo} aria-label={playing ? "Pausar vídeo da campanha" : "Reproduzir vídeo da campanha"}>
        <span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span> {playing ? "Pausar" : "Reproduzir"}
      </button>}
    </section>
  );
}
