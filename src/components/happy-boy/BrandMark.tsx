import { SiteImage } from "./SiteImage";

export function BrandMark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const src = `/images/brand/happy-boy-${tone === "light" ? "white" : "black"}.svg`;
  return <SiteImage src={src} alt="Happy Boy" width={148} height={20} className="brand-asset" unoptimized />;
}
