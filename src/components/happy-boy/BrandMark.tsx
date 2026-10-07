import { storefront } from "@/data/storefront";
import { SiteImage } from "./SiteImage";

export function BrandMark() {
  return <SiteImage src={storefront.logo} alt="Logo Happy Boy" width={148} height={40} className="brand-asset" unoptimized />;
}
