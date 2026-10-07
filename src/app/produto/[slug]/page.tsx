import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, getProduct, products } from "@/data/products";
import { brand } from "@/data/sea-sky";
import { getWhatsAppHref } from "@/data/storefront";
import { BrandMark } from "@/components/happy-boy/BrandMark";
import { Footer } from "@/components/happy-boy/Footer";
import { SiteImage } from "@/components/happy-boy/SiteImage";
import { WhatsAppButton } from "@/components/happy-boy/WhatsAppButton";
import "@/components/happy-boy/campaign.css";
import "@/components/happy-boy/storefront.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return { title: "Peça não encontrada | Happy Boy" };
  return { title: product.seo.title, description: product.seo.description };
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const contact = getWhatsAppHref(`Olá! Gostaria de saber mais sobre ${product.name}, referência ${product.sku}.`) ?? brand.instagram;
  return <>
    <main className="product-page" id="top">
      <header className="product-page__header"><Link href="/" aria-label="Happy Boy — início"><BrandMark /></Link><Link href="/#shop">Voltar à seleção ↗</Link></header>
      <nav className="product-page__breadcrumb" aria-label="Caminho de navegação"><Link href="/">Início</Link><span aria-hidden="true">/</span><Link href={`/colecao/${product.collectionSlug}`}>{product.collection}</Link><span aria-hidden="true">/</span><span aria-current="page">{product.name}</span></nav>
      <div className="product-page__layout">
        <div className="product-page__images">{product.images.map((image, index) => <SiteImage key={image.src} {...image} preload={index === 0} sizes="(max-width: 760px) 90vw, 48vw" />)}</div>
        <section className="product-page__info" aria-labelledby="product-title">
          <p className="product-page__category">{product.category} / {product.collection}</p>
          <h1 id="product-title">{product.name}</h1>
          <p className="product-page__price">{formatPrice(product.price, product.currency)}</p>
          <p className="product-page__description">{product.description}</p>
          <dl><dt>Referência</dt><dd>{product.sku}</dd><dt>Cores</dt><dd>{product.colors.map((color) => color.name).join(", ")}</dd><dt>Tamanhos</dt><dd>{product.sizes.length ? product.sizes.join(" / ") : "Grade em atualização"}</dd><dt>Composição</dt><dd>{product.composition ?? "Informação em atualização"}</dd>{product.care.length > 0 && <><dt>Cuidados</dt><dd>{product.care.join(". ")}</dd></>}</dl>
          <a className="product-page__contact" href={contact} target="_blank" rel="noopener noreferrer">Consultar a peça <span aria-hidden="true">↗</span></a>
          {product.availability === "preview" && <p className="product-page__note">Produto ilustrativo. Imagens e informações provisórias.</p>}
        </section>
      </div>
    </main>
    <Footer /><WhatsAppButton />
  </>;
}
