import { brand } from "@/data/sea-sky";

export function ShopCTA() {
  return (
    <section className="shop-cta" id="shop" aria-labelledby="shop-title">
      <p className="eyebrow">O próximo capítulo</p>
      <h2 id="shop-title">
        <a href={brand.shopHref ?? brand.instagram} target="_blank" rel="noopener noreferrer">
          {brand.shopHref ? <>Explore<br />a coleção.</> : <>Conheça<br />a Happy Boy.</>}
          <span className="shop-cta__arrow" aria-hidden="true">↗</span>
        </a>
      </h2>
      <div className="shop-cta__bottom">
        <p>{brand.shopHref ? "SEA SKY / Loja oficial" : "Siga a marca no Instagram"}</p>
        {!brand.shopHref && <p>Link da loja a definir</p>}
      </div>
    </section>
  );
}
