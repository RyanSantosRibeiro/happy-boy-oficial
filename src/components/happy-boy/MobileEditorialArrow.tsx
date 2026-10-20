import "./mobile-editorial-arrow.css";

/** Mobile-only vector; the approved desktop glyph stays in its original markup. */
export function MobileEditorialArrow({ direction = "diagonal" }: { direction?: "diagonal" | "right" | "up" }) {
  return <svg className="mobile-editorial-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={direction === "right" ? "M4 12h16m-6-6 6 6-6 6" : direction === "up" ? "M12 20V4m-6 6 6-6 6 6" : "M5 19 19 5M5 5h14v14"} />
  </svg>;
}
