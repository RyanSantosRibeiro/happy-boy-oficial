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

    const smoothstep = (value: number) => {
      const clamped = Math.max(0, Math.min(1, value));
      return clamped * clamped * (3 - 2 * clamped);
    };

    const render = (progress: number) => {
      const normalized = Math.max(0, Math.min(1, progress));
      const activeIndex = Math.min(2, Math.floor(Math.min(normalized, 0.999999) * 3));

      seek(normalized);
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
        };
      },
    );

    return () => media.revert();
  }, [root, stage, seek]);
}
