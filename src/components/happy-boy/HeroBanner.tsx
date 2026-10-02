"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { campaign, experienceLooks } from "@/data/sea-sky";
import { useVideoScrub } from "@/hooks/useVideoScrub";
import { useHeroTimeline } from "@/hooks/useHeroTimeline";

export function HeroBanner() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const { seek, status, source } = useVideoScrub(video, root, {
    desktop: campaign.videoDesktop,
    mobile: campaign.videoMobile,
  });
  useHeroTimeline(root, stage, seek);

  return (
    <section
      id="top"
      className="hero-banner"
      ref={root}
      aria-labelledby="hero-banner-heading"
      style={{ "--hero-screens": experienceLooks.length * campaign.heroViewportHeightsPerLook, "--fallback-fit": campaign.fallbackFitDesktop, "--fallback-fit-mobile": campaign.fallbackFitMobile } as CSSProperties}
    >
      <span id="experience" className="hero-banner-anchor" aria-hidden="true" />
      <div className="hero-banner-stage" ref={stage} data-hero-stage="sticky-film">
        <h1 id="hero-banner-heading" className="sr-only">Happy Boy — SEA SKY Coleção {campaign.year}</h1>
        <div className="hero-banner-background" data-hero-background="fixed-video" aria-hidden="true">
          <div className="hero-banner-visual">
            {experienceLooks.map((look, index) => (
              <div key={look.id} className="hero-banner-photo" data-hero-photo={look.id}>
                {look.image ? <Image
                  src={look.image}
                  alt=""
                  fill
                  sizes="100vw"
                  preload={index === 0}
                  style={{ "--img-pos": look.objectPositionDesktop, "--img-pos-mobile": look.objectPositionMobile } as CSSProperties}
                /> : <div className="hero-banner-img-placeholder">Look {look.number}</div>}
              </div>
            ))}
          </div>
          <video
            ref={video}
            src={source ?? undefined}
            className="hero-banner-video"
            data-hero-video="scroll-controlled"
            data-ready={status === "ready"}
            poster={campaign.poster}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden="true"
            tabIndex={-1}
            style={{ "--video-position": campaign.objectPositionDesktop, "--video-position-mobile": campaign.objectPositionMobile } as CSSProperties}
          />
          <div className="hero-banner-shade" />
        </div>

        <div className="hero-banner-title" aria-hidden="true"><span>SEA</span><span>SKY</span></div>
        <div className="hero-banner-meta" aria-hidden="true"><span className="eyebrow">Happy Boy / SEA SKY</span><span className="eyebrow">Coleção {campaign.year}</span></div>

        <div className="hero-banner-overlays">
          {experienceLooks.map((look) => (
            <article
              key={look.id}
              className={`hero-banner-info hero-banner-info--${look.textPosition}`}
              data-hero-panel={look.id}
              aria-label={`Look ${look.number}: ${look.name}`}
              aria-hidden="true"
              inert
            >
              <span className="eyebrow hero-banner-kicker">Look {look.number}<span className="hero-banner-kicker-sep" aria-hidden="true" />{look.category}</span>
              <h2 className="hero-banner-look-name">{look.name}</h2>
              <p className="hero-banner-look-description" data-hero-detail>{look.description}</p>
              <p className="hero-banner-look-price" data-hero-detail>{look.price ?? "Preço a definir"}</p>
              <a className="hero-banner-look-cta" data-hero-detail href={look.href ?? `#piece-${look.id}`}>Explorar look <span className="hero-banner-cta-arrow" aria-hidden="true">↗</span></a>
              {look.placeholder && <span className="hero-banner-placeholder-note">Conteúdo provisório</span>}
            </article>
          ))}
        </div>

        <div className="hero-banner-counter" aria-hidden="true"><span className="hero-banner-counter-num">01</span><span className="hero-banner-counter-total">/{String(experienceLooks.length).padStart(2, "0")}</span></div>
        <nav className="hero-banner-dots" aria-label="Selecionar look">
          {experienceLooks.map((look, index) => <button key={look.id} className="hero-banner-dot" data-hero-dot={look.id} aria-current={index === 0 ? "step" : undefined} aria-label={`Ir para look ${look.number}: ${look.name}`}><span aria-hidden="true">{look.number}</span></button>)}
        </nav>
        <div className="hero-banner-scroll-cue" aria-hidden="true"><span className="hero-banner-scroll-line" /><span className="eyebrow">Explore com o scroll</span></div>
        <p className="hero-banner-status" role="status">{status === "loading" ? "Preparando a prévia…" : status === "error" ? "Filme indisponível · prévia fotográfica" : status === "ready" ? "Prévia de movimento · seu scroll" : "Prévia fotográfica"}</p>
        <div className="hero-banner-track" aria-hidden="true"><span className="hero-banner-track-fill" /></div>
        <a href="#collection" className="hero-banner-skip"><span className="eyebrow">Pular experiência</span><span aria-hidden="true">↓</span></a>
      </div>
      <noscript><style>{".hero-banner{height:100svh}"}</style><p className="no-script-note">Explore todos os looks no <a href="#looks">editorial da coleção</a>.</p></noscript>
    </section>
  );
}
