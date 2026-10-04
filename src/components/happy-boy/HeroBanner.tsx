"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { campaign } from "@/data/sea-sky";
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
      aria-label="Apresentação em vídeo"
      style={{ "--hero-screens": 6 } as CSSProperties}
    >
      <span id="experience" className="hero-banner-anchor" aria-hidden="true" />
      <div className="hero-banner-stage" ref={stage} data-hero-stage="sticky-film">
        <video
          ref={video}
          src={source ?? undefined}
          className="hero-banner-video"
          data-ready={status === "ready"}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="hero-banner-last" aria-hidden="true" />
        {/* <div className="hero-banner-wash" aria-hidden="true" /> */}
        {/* <div className="hero-banner-transition" aria-hidden="true">
          <span className="hero-banner-transition__signature hero-banner-transition__signature--ink" />
          <span className="hero-banner-transition__signature hero-banner-transition__signature--blue" />
        </div> */}

        <div className="hero-banner-ui">
          {/* <Image
            className="hero-banner-logo"
            src="/images/happy-boy-logo-black.png"
            alt="Happy Boy"
            width={140}
            height={30}
            priority
          /> */}

          <div className="hero-banner-editorial" aria-live="polite">
            <article className="hero-banner-editorial__panel hero-banner-editorial__panel--left" data-hero-overlay="0">
              <p className="hero-banner-editorial__kicker"><span aria-hidden="true" /> Look 01</p>
              <h2>Textura</h2>
              <p>Construção leve e presença natural.</p>
            </article>
            <article className="hero-banner-editorial__panel hero-banner-editorial__panel--right" data-hero-overlay="1" aria-hidden="true">
              <p className="hero-banner-editorial__kicker"><span aria-hidden="true" /> Look 02</p>
              <h2>Forma</h2>
              <p>Caimento pensado para acompanhar o movimento.</p>
            </article>
            <article className="hero-banner-editorial__panel hero-banner-editorial__panel--left" data-hero-overlay="2" aria-hidden="true">
              <p className="hero-banner-editorial__kicker"><span aria-hidden="true" /> Look 03</p>
              <h2>Detalhe</h2>
              <p>Matéria, toque e proporção em evidência.</p>
            </article>
          </div>

          <div className="hero-banner-levels" aria-label="Progresso da apresentação">
            {["01", "02", "03"].map((level, index) => (
              <span key={level} className="hero-banner-level" data-hero-level={index} aria-current={index === 0 ? "step" : undefined}>
                {level}<i aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>
      </div>
      <noscript><style>{".hero-banner{height:100vh}"}</style></noscript>
    </section>
  );
}
