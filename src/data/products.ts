import { collectionAssets, type CollectionSlug } from "./collection.ts";
import type { CommercialFamilyId } from "./commercial.ts";

export type Product = {
  commercialFamilyId: CommercialFamilyId;
  collectionId: string | null;
  id: string;
  slug: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  collection: "SEA SKY";
  collectionSlug: CollectionSlug;
  /** Amount in BRL. null keeps unpublished commercial values out of the UI. */
  price: number | null;
  compareAtPrice: number | null;
  currency: "BRL";
  images: { src: string; alt: string; width: number; height: number }[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  composition: string | null;
  care: string[];
  availability: "preview" | "available" | "unavailable";
  featured: boolean;
  seo: { title: string; description: string };
};

// Sample catalog: replace copy, dimensions, specifications and prices before launch.
type ProductEntry = Pick<Product, "id" | "name" | "category" | "commercialFamilyId"> &
  Partial<Omit<Product, "id" | "name" | "category">> & {
    color: CollectionSlug;
    hex: string;
  };

// Each entry can override any full product field (price, images, sizes, SEO, etc.).
const entries: ProductEntry[] = [
  { id: "polo-essencial", name: "Polo essencial", category: "Polos", commercialFamilyId: "polos", color: "branco", hex: "#e9e6de" },
  { id: "camisa-leve", name: "Camisa leve", category: "Camisas", commercialFamilyId: "camisas", color: "azul", hex: "#91a6b7" },
  { id: "camiseta-regular", name: "Camiseta regular", category: "Camisetas", commercialFamilyId: "camisetas", color: "preto", hex: "#171717" },
  { id: "polo-textura", name: "Polo com textura", category: "Polos", commercialFamilyId: "polos", color: "verde", hex: "#7b8470" },
  { id: "calca-reta", name: "Calça reta", category: "Calças", commercialFamilyId: "calcas", color: "branco", hex: "#e9e6de" },
  { id: "bermuda-casual", name: "Bermuda casual", category: "Bermudas", commercialFamilyId: "bermudas", color: "preto", hex: "#171717" },
  { id: "camisa-manga-curta", name: "Camisa de manga curta", category: "Camisas", commercialFamilyId: "camisas", color: "verde", hex: "#7b8470" },
  { id: "camiseta-ampla", name: "Camiseta ampla", category: "Camisetas", commercialFamilyId: "camisetas", color: "azul", hex: "#91a6b7" },
];

export const products: Product[] = entries.map(({ color, hex, ...entry }, index) => {
  const asset = collectionAssets[color];
  return {
    slug: entry.id,
    sku: `HB-PREVIA-${String(index + 1).padStart(3, "0")}`,
    description: `${entry.name} da seleção SEA SKY. Nome, imagens e descrição de referência; a ficha definitiva será apresentada com o lançamento.`,
    collection: "SEA SKY",
    collectionId: null, // Unconfirmed legacy previews are not a published collection.
    collectionSlug: color,
    price: null,
    compareAtPrice: null,
    currency: "BRL",
    images: [
      { src: asset.src, alt: `Imagem do look ${entry.name}`, width: asset.width, height: asset.height },
      { src: asset.src, alt: `Detalhe do look ${entry.name}`, width: asset.width, height: asset.height },
    ],
    colors: [{ name: color, hex }],
    sizes: [],
    composition: null,
    care: [],
    availability: "preview",
    featured: true,
    seo: { title: `${entry.name} | Happy Boy`, description: `Conheça ${entry.name.toLowerCase()} na seleção de moda masculina SEA SKY da Happy Boy. Ficha de produto em preparação.` },
    ...entry,
  };
});

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(price: number | null, currency = "BRL"): string {
  return price === null ? "Preço a definir" : new Intl.NumberFormat("pt-BR", { style: "currency", currency }).format(price);
}
