import Image from "next/image";
import { brand } from "@/data/sea-sky";

export function BrandMark() {
  return brand.logoSrc ? <Image src={brand.logoSrc} alt="Happy Boy" width={148} height={40} className="brand-asset" /> :
    <span className="brand-placeholder" aria-label="Happy Boy — espaço reservado ao logotipo oficial">
      <span className="brand-placeholder__corners" aria-hidden="true" />
      <span>LOGO OFICIAL<span className="brand-placeholder__name">HAPPY BOY</span></span>
    </span>;
}
