"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { campaign, collectionTimeline, experienceLooks } from "@/data/sea-sky";
import { getLookScrollProgress, getTimelineState } from "@/lib/collection-timeline";

/** One playhead drives the film, look information, and chapter navigation. */
export function useHeroTimeline(
  root: RefObject<HTMLElement | null>,
  stage: RefObject<HTMLDivElement | null>,
  seek: (progress: number) => void,
) {
  useEffect(() => {
    const element = root.current;
    const frame = stage.current;
    if (!element || !frame) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const photos = Array.from(element.querySelectorAll<HTMLElement>("[data-hero-photo]"));
    const panels = Array.from(element.querySelectorAll<HTMLElement>("[data-hero-panel]"));
    const details = panels.map((panel) => Array.from(panel.querySelectorAll<HTMLElement>("[data-hero-detail]")));
    const buttons = Array.from(element.querySelectorAll<HTMLButtonElement>("[data-hero-dot]"));
    const track = element.querySelector<HTMLElement>(".hero-banner-track-fill");
    const counter = element.querySelector<HTMLElement>(".hero-banner-counter-num");
    const title = element.querySelector<HTMLElement>(".hero-banner-title");
    const cue = element.querySelector<HTMLElement>(".hero-banner-scroll-cue");
    const meta = element.querySelector<HTMLElement>(".hero-banner-meta");

    media.add({ motion: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)" }, (context) => {
      const reduced = !!context.conditions?.reduced;
      const driver = { progress: 0 };
      let previousLook = "";
      let previousVisible: string | null = null;
      element.dataset.enhanced = "true";

      const render = (progress: number) => {
        const state = getTimelineState(progress, collectionTimeline);
        const activeIndex = experienceLooks.findIndex((look) => look.id === state.lookId);
        const transitioning = state.chapter.type === "transition";
        const blend = transitioning ? state.localProgress : 0;
        const first = collectionTimeline[0];
        const introEnd = first.start + (first.end - first.start) * campaign.introFadeEndWithinFirstLook;
        const intro = reduced ? 0 : Math.max(0, 1 - progress / introEnd);
        const closing = reduced ? 0 : Math.max(0, (progress - campaign.finaleStart) / (1 - campaign.finaleStart));

        seek(state.videoProgress);
        if (track) track.style.transform = `scaleX(${progress})`;
        if (title) title.style.opacity = String(Math.max(intro, closing));
        if (cue) cue.style.opacity = String(intro);
        if (meta) meta.style.opacity = String(1 - intro);

        photos.forEach((photo, index) => {
          const opacity = index === activeIndex ? 1 - blend : transitioning && index === activeIndex + 1 ? blend : 0;
          photo.style.opacity = String(opacity);
          photo.style.transform = reduced ? "none" : `translate3d(0, ${transitioning && index === activeIndex + 1 ? (1 - blend) * 16 : 0}px, 0)`;
        });

        const visibleId = state.infoOpacity > 0.01 ? state.lookId : "";
        panels.forEach((panel, index) => {
          const active = index === activeIndex && !transitioning;
          const opacity = active ? state.infoOpacity : 0;
          panel.style.opacity = String(opacity);
          panel.style.visibility = opacity > 0 ? "visible" : "hidden";
          panel.style.transform = `translate3d(0, ${reduced ? 0 : (1 - opacity) * 16}px, 0)`;
          const start = state.chapter.infoFull ?? 0;
          const end = state.chapter.holdStart ?? start;
          const detailOpacity = active ? Math.min(1, Math.max(0, (state.localProgress - start) / Math.max(0.001, end - start))) : 0;
          details[index].forEach((detail) => {
            detail.style.opacity = String(detailOpacity);
            detail.style.visibility = detailOpacity > 0 && opacity > 0 ? "visible" : "hidden";
          });
          if (previousVisible !== visibleId) {
            const accessible = panel.dataset.heroPanel === visibleId;
            panel.inert = !accessible;
            panel.setAttribute("aria-hidden", String(!accessible));
          }
        });
        previousVisible = visibleId;
        if (previousLook !== state.lookId) {
          if (counter) counter.textContent = experienceLooks[activeIndex].number;
          buttons.forEach((button) => {
            if (button.dataset.heroDot === state.lookId) button.setAttribute("aria-current", "step");
            else button.removeAttribute("aria-current");
          });
          previousLook = state.lookId;
        }
        element.dataset.phase = state.chapter.type;
        element.dataset.activeLook = state.lookId;
      };

      let trigger: ScrollTrigger | undefined;
      if (reduced) {
        render(getLookScrollProgress(experienceLooks[0].id, collectionTimeline));
      } else {
        const animation = gsap.fromTo(driver, { progress: 0 }, {
          progress: 1,
          ease: "none",
          onUpdate: () => render(driver.progress),
          scrollTrigger: {
            trigger: element,
            start: "top top",
            // CSS owns the fixed viewport. Measure the actual svh stage so the
            // film ends exactly when it leaves, including mobile browser bars.
            end: () => `+=${Math.max(1, element.offsetHeight - frame.offsetHeight)}`,
            scrub: campaign.scrollSmoothing,
            invalidateOnRefresh: true,
            // A refresh can temporarily rewind the linked animation.
            // Restore the UI when the browser restores a scrolled page.
            onRefresh: (self) => render(self.progress),
          },
        });
        trigger = animation.scrollTrigger;
        animation.progress(trigger?.progress ?? 0);
        render(driver.progress);
      }

      const navigate = (event: Event) => {
        const id = (event.currentTarget as HTMLButtonElement).dataset.heroDot;
        if (!id) return;
        const progress = getLookScrollProgress(id, collectionTimeline);
        if (reduced) render(progress);
        else if (trigger) window.scrollTo({ top: trigger.start + progress * (trigger.end - trigger.start), behavior: "instant" });
      };
      buttons.forEach((button) => button.addEventListener("click", navigate));

      return () => {
        buttons.forEach((button) => { button.removeEventListener("click", navigate); button.removeAttribute("aria-current"); });
        [...photos, ...panels, ...details.flat(), track, title, cue, meta].forEach((node) => node?.removeAttribute("style"));
        panels.forEach((panel) => { panel.inert = true; panel.setAttribute("aria-hidden", "true"); });
        delete element.dataset.enhanced;
        delete element.dataset.phase;
        delete element.dataset.activeLook;
      };
    }, element);
    return () => media.revert();
  }, [root, stage, seek]);
}
