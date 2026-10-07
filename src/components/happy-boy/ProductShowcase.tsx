import { products } from "@/data/products";
import { ProductSlider } from "./ProductSlider";
import { SiteImage } from "./SiteImage";

type ProductShowcaseProps = {
  id: string;
  title: string;
  description: string;
  banner: string;
  bannerAlt: string;
  bannerPosition: "left" | "right";
  productIds: readonly string[];
};

export function ProductShowcase({ id, title, description, banner, bannerAlt, bannerPosition, productIds }: ProductShowcaseProps) {
  const selection = productIds.flatMap((id) => { const product = products.find((entry) => entry.id === id); return product ? [product] : []; });
  return <section className={`product-showcase product-showcase--${bannerPosition}`} id={id} aria-labelledby={`${id}-title`}>
    <div className="product-showcase__banner">
      <SiteImage src={banner} alt={bannerAlt} fill sizes="(max-width: 760px) 100vw, 50vw" />
      <span className="product-showcase__signature">SEA SKY / Happy Boy</span>
    </div>
    <div className="product-showcase__selection">
      <div className="product-showcase__heading"><h2 id={`${id}-title`}>{title}</h2><p>{description}</p></div>
      <ProductSlider products={selection} label={title} />
      <p className="product-showcase__note">Seleção ilustrativa. Informações das peças em atualização.</p>
    </div>
  </section>;
}
