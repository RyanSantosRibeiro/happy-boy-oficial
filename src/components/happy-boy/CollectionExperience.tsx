"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { campaign, collectionTimeline, experienceLooks } from "@/data/sea-sky";
import { getLookScrollProgress, getTimelineState } from "@/lib/collection-timeline";
import { useVideoScrub } from "@/hooks/useVideoScrub";
import { CollectionVideo } from "./CollectionVideo";
import { CollectionProgress } from "./CollectionProgress";
import { LookInformation } from "./LookInformation";

export function CollectionExperience() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const { seek, status, source } = useVideoScrub(video, root, { desktop: campaign.videoDesktop, mobile: campaign.videoMobile });

  useEffect(() => {
    if (!root.current || !stage.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const element = root.current;
    const frame = stage.current;
    const media = gsap.matchMedia();
    const panels = Array.from(element.querySelectorAll<HTMLElement>("[data-look-panel]"));
    const details = panels.map((panel) => Array.from(panel.querySelectorAll<HTMLElement>("[data-look-detail]")));
    const photos = Array.from(element.querySelectorAll<HTMLElement>("[data-look-image]"));
    const buttons = Array.from(element.querySelectorAll<HTMLButtonElement>("[data-look-target]"));
    const bar = element.querySelector<HTMLElement>(".experience-track-fill");
    const count = element.querySelector<HTMLElement>(".experience-current");
    const finale = element.querySelector<HTMLElement>(".experience-finale");

    media.add({ motion: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)" }, (context) => {
      const reduced = !!context.conditions?.reduced;
      const driver = { progress: 0 };
      let lastLook = "";
      let previousVisible = "";
      element.dataset.enhanced = "true";

      const render = (progress: number) => {
        const state = getTimelineState(progress, collectionTimeline);
        const activeIndex = experienceLooks.findIndex((look) => look.id === state.lookId);
        const transitioning = state.chapter.type === "transition";
        const nextIndex = Math.min(activeIndex + 1, experienceLooks.length - 1);
        const blend = transitioning ? state.localProgress : 0;
        const closing = Math.max(0, (progress - campaign.finaleStart) / (1 - campaign.finaleStart));
        seek(state.videoProgress);
        if (bar) bar.style.transform = `scaleX(${progress})`;
        if (finale) { finale.style.opacity = String(closing); finale.style.visibility = closing > 0 ? "visible" : "hidden"; }
        photos.forEach((photo, index) => {
          const opacity = index === activeIndex ? 1 - blend : index === nextIndex && transitioning ? blend : 0;
          photo.style.opacity = String(opacity * (1 - closing * 0.8));
          // Photos provide an honest fallback. The final particle transitions live in the video.
          photo.style.transform = reduced ? "none" : `translate3d(0, ${index === nextIndex && transitioning ? (1 - blend) * 18 : 0}px, 0)`;
        });
        const visibleId = state.infoOpacity > 0.01 ? state.lookId : "";
        panels.forEach((panel, index) => {
          const visible = panel.dataset.lookPanel === state.lookId;
          panel.style.opacity = String(visible ? state.infoOpacity : 0);
          panel.style.visibility = visible && state.infoOpacity > 0 ? "visible" : "hidden";
          panel.style.transform = `translate3d(0, ${reduced ? 0 : (1 - state.infoOpacity) * 14}px, 0)`;
          const detailStart = state.chapter.infoFull ?? 0;
          const detailEnd = state.chapter.holdStart ?? detailStart;
          const detailOpacity = visible ? Math.min(1, Math.max(0, (state.localProgress - detailStart) / Math.max(0.001, detailEnd - detailStart))) : 0;
          details[index].forEach((detail) => {
            detail.style.opacity = String(detailOpacity);
            detail.style.visibility = detailOpacity > 0 && state.infoOpacity > 0 ? "visible" : "hidden";
          });
          if (visibleId !== previousVisible) {
            const accessible = panel.dataset.lookPanel === visibleId;
            panel.inert = !accessible;
            panel.setAttribute("aria-hidden", String(!accessible));
          }
        });
        previousVisible = visibleId;
        if (lastLook !== state.lookId) {
          buttons.forEach((button) => { if (button.dataset.lookTarget === state.lookId) button.setAttribute("aria-current", "step"); else button.removeAttribute("aria-current"); });
          if (count) count.textContent = experienceLooks[activeIndex].number;
          lastLook = state.lookId;
        }
        element.dataset.phase = state.chapter.type;
      };

      let scroll: ScrollTrigger | undefined;
      if (!reduced) {
        const length = experienceLooks.length * campaign.viewportHeightsPerLook + (experienceLooks.length - 1) * campaign.viewportHeightsPerTransition;
        const animation = gsap.to(driver, {
          progress: 1,
          ease: "none",
          onUpdate: () => render(driver.progress),
          scrollTrigger: {
            trigger: element,
            start: "top top",
            end: () => `+=${Math.round(frame.offsetHeight * length)}`,
            pin: frame,
            scrub: campaign.scrollSmoothing,
            invalidateOnRefresh: true,
          },
        });
        scroll = animation.scrollTrigger;
        render(driver.progress);
      } else {
        render(getLookScrollProgress(experienceLooks[0].id, collectionTimeline));
      }

      const navigate = (event: Event) => {
        const target = (event.currentTarget as HTMLButtonElement).dataset.lookTarget;
        if (!target) return;
        const progress = getLookScrollProgress(target, collectionTimeline);
        if (reduced) render(progress);
        else if (scroll) window.scrollTo({ top: scroll.start + progress * (scroll.end - scroll.start), behavior: "instant" });
      };
      buttons.forEach((button) => button.addEventListener("click", navigate));
      return () => {
        buttons.forEach((button) => button.removeEventListener("click", navigate));
        delete element.dataset.enhanced;
        delete element.dataset.phase;
        panels.forEach((panel) => { panel.removeAttribute("style"); panel.removeAttribute("aria-hidden"); panel.inert = false; });
        details.flat().forEach((detail) => detail.removeAttribute("style"));
        photos.forEach((photo) => photo.removeAttribute("style"));
        finale?.removeAttribute("style");
        bar?.removeAttribute("style");
      };
    }, element);
    return () => media.revert();
  }, [seek]);

  return <section id="experience" className="collection-experience" ref={root} aria-labelledby="experience-title">
    <div className="experience-stage" ref={stage}>
      <h2 className="sr-only" id="experience-title">Explore os looks SEA SKY pelo scroll</h2>
      <div className="experience-top"><span className="eyebrow">SEA SKY <span className="experience-top-separator">/</span> A coleção</span><a href="#collection">Pular experiência <span aria-hidden="true">↘</span></a></div>
      <div className="experience-visual" aria-hidden="true">
        {experienceLooks.map((look, index) => <div className="experience-photo" data-look-image={look.id} key={look.id}>
          {look.image ? <Image src={look.image} alt="" fill sizes="(max-width:760px) 100vw, 60vw" loading={index === 0 ? "eager" : "lazy"} style={{ "--image-position": look.objectPositionDesktop, "--image-position-mobile": look.objectPositionMobile } as CSSProperties} /> : <div className="image-placeholder">Imagem do look {look.number}</div>}
        </div>)}
      </div>
      <CollectionVideo videoRef={video} source={source} ready={status === "ready"} />
      <div className="experience-video-shade" data-visible={status === "ready"} aria-hidden="true" />
      <div className="look-overlays">{experienceLooks.map((look) => <LookInformation look={look} key={look.id} />)}</div>
      <div className="experience-counter" aria-hidden="true"><span className="experience-current">01</span><span>/{String(experienceLooks.length).padStart(2, "0")}</span></div>
      <div className="experience-finale" aria-hidden="true"><span className="eyebrow">Happy Boy / Collection 2026</span><span>SEA SKY</span><span className="eyebrow">Continue explorando ↓</span></div>
      <div className="experience-bottom"><CollectionProgress looks={experienceLooks} /><p className="experience-status" role="status">{status === "loading" ? "Preparando o filme…" : status === "error" ? "Filme indisponível · explore pelas imagens" : status === "ready" ? "Seu scroll. Seu ritmo." : "Prévia fotográfica"}</p></div>
      <div className="experience-track" aria-hidden="true"><span className="experience-track-fill" /></div>
    </div>
    <noscript><p className="no-script-note">Explore todos os looks no <a href="#looks">editorial da coleção</a>.</p></noscript>
  </section>;
}
