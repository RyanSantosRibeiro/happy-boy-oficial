"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { campaign } from "@/data/sea-sky";

/** Maps the complete hero scroll distance to the complete video timeline. */
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
    const overlays = Array.from(element.querySelectorAll<HTMLElement>("[data-hero-overlay]"));
    const levels = Array.from(element.querySelectorAll<HTMLElement>("[data-hero-level]"));
    const opening = document.querySelector<HTMLElement>("[data-sea-sky-opening]");

    const smoothstep = (value: number) => {
      const clamped = Math.max(0, Math.min(1, value));
      return clamped * clamped * (3 - 2 * clamped);
    };

    const render = (progress: number) => {
      const scroll = Math.max(0, Math.min(1, progress));
      // The video ends at VIDEO_END; the remaining scroll is a pause + image fade-in.
      const VIDEO_END = 0.82;
      const normalized = Math.min(1, scroll / VIDEO_END);
      const lastImage = smoothstep((scroll - 0.85) / 0.1);
      const activeIndex = Math.min(2, Math.floor(Math.min(normalized, 0.999999) * 3));
      const exitProgress = smoothstep((scroll - .985) / .015);
      const handoffProgress = smoothstep((scroll - .997) / .003);
      const markProgress = smoothstep((scroll - .994) / .006);
      const inkProgress = smoothstep((scroll - .99) / .004);
      const inkFocus = smoothstep((scroll - .985) / .006) * (1 - smoothstep((scroll - .992) / .006));

      seek(normalized);
      frame.style.setProperty("--hero-last", String(lastImage));
      element.style.setProperty("--hero-exit", String(exitProgress));
      element.style.setProperty("--hero-mark", String(markProgress));
      element.style.setProperty("--hero-ink", String(inkProgress));
      element.style.setProperty("--hero-ink-focus", String(inkFocus));
      frame.style.setProperty("--hero-exit", String(exitProgress));
      frame.style.setProperty("--hero-handoff", String(handoffProgress));
      frame.style.setProperty("--hero-mark", String(markProgress));
      frame.style.setProperty("--hero-ink", String(inkProgress));
      frame.style.setProperty("--hero-ink-focus", String(inkFocus));
      opening?.style.setProperty("--hero-exit", String(exitProgress));
      opening?.style.setProperty("--hero-handoff", String(handoffProgress));
      opening?.style.setProperty("--hero-mark", String(markProgress));
      overlays.forEach((overlay, index) => {
        const start = index / 3;
        const end = (index + 1) / 3;
        const fadeIn = smoothstep((normalized - Math.max(0, start - 0.025)) / 0.05);
        const fadeOut = index === 2 ? 1 : 1 - smoothstep((normalized - (end - 0.025)) / 0.05);
        const opacity = fadeIn * fadeOut;
        const y = normalized < start ? (1 - opacity) * 12 : normalized > end ? (1 - opacity) * -8 : 0;

        overlay.style.opacity = String(opacity);
        overlay.style.transform = `translate3d(0, ${y}px, 0)`;
        overlay.style.visibility = opacity > 0.01 ? "visible" : "hidden";
        overlay.setAttribute("aria-hidden", String(index !== activeIndex));
      });

      levels.forEach((level, index) => {
        if (index === activeIndex) level.setAttribute("aria-current", "step");
        else level.removeAttribute("aria-current");
      });
    };

    media.add(
      { motion: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)" },
      (context) => {
        const reduced = Boolean(context.conditions?.reduced);
        const playhead = { progress: 0 };

        if (reduced) {
          render(0.05);
          opening?.style.setProperty("--hero-exit", "1");
          opening?.style.setProperty("--hero-handoff", "1");
          opening?.style.setProperty("--hero-mark", "1");
          return;
        }

        const animation = gsap.fromTo(playhead, { progress: 0 }, {
          progress: 1,
          ease: "none",
          onUpdate: () => render(playhead.progress),
          scrollTrigger: {
            trigger: element,
            start: "top top",
            end: () => `+=${Math.max(1, element.offsetHeight - frame.offsetHeight)}`,
            scrub: campaign.scrollSmoothing,
            invalidateOnRefresh: true,
            onRefresh: (self) => render(self.progress),
          },
        });

        const trigger = animation.scrollTrigger;
        animation.progress(trigger?.progress ?? 0);
        render(playhead.progress);

        return () => {
          animation.kill();
          overlays.forEach((overlay) => {
            overlay.removeAttribute("style");
            overlay.setAttribute("aria-hidden", "true");
          });
          levels.forEach((level) => level.removeAttribute("aria-current"));
          element.style.removeProperty("--hero-exit");
          element.style.removeProperty("--hero-mark");
          element.style.removeProperty("--hero-ink");
          element.style.removeProperty("--hero-ink-focus");
          frame.style.removeProperty("--hero-exit");
          frame.style.removeProperty("--hero-handoff");
          frame.style.removeProperty("--hero-mark");
          frame.style.removeProperty("--hero-ink");
          frame.style.removeProperty("--hero-ink-focus");
          opening?.style.removeProperty("--hero-exit");
          opening?.style.removeProperty("--hero-handoff");
          opening?.style.removeProperty("--hero-mark");
        };
      },
    );

    return () => media.revert();
  }, [root, stage, seek]);
}
