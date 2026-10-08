"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function CollectionReveal({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = root.current;
    if (!container) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = Array.from(container.querySelectorAll<HTMLElement>("[data-collection-reveal]"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        const stagger = element.parentElement?.classList.contains("collection-selection__looks")
          ? Array.from(element.parentElement.children).indexOf(element) * 55 : 0;
        if (!motion.matches) element.animate(
          [{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 480, delay: stagger, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
        );
        observer.unobserve(element);
      });
    }, { threshold: 0.08 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return <div className="collection-story" ref={root}>{children}</div>;
}
