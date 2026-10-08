export const collectionOrder = ["preto", "verde", "branco", "azul"] as const;
export type CollectionSlug = (typeof collectionOrder)[number];

export type Collection = {
  slug: CollectionSlug;
  name: string;
  swatch: string;
  cover: string;
  images: readonly string[];
  altTexts: readonly string[];
};

export type CollectionAsset = { src: string; width: number; height: number };

// Retained for existing consumers outside the new collection experience.
export const collectionAssets: Record<CollectionSlug, CollectionAsset> = {
  preto: { src: "/images/collection/black/RAY_9090.jpg", width: 3883, height: 5824 },
  verde: { src: "/images/collection/green/RAY_8966.jpg", width: 3883, height: 5824 },
  branco: { src: "/images/collection/white/RAY_8954.jpg", width: 3883, height: 5824 },
  azul: { src: "/images/collection/blue/RAY_9029.jpg", width: 3889, height: 5833 },
};

function images(color: CollectionSlug, ids: readonly string[]) {
  return ids.map((id) => `/images/travel-edition/${color}/RAY_${id}.webp`);
}
const blackImages = images("preto", ["9093", "9101", "9094", "9090"]);
const greenImages = images("verde", ["8966", "9016", "8976", "8982"]);
const whiteImages = images("branco", ["8954", "8934", "8943", "8945"]);
const blueImages = images("azul", ["9029", "9046", "9041", "9077"]);

export const collections: Record<CollectionSlug, Collection> = {
  preto: {
    slug: "preto", name: "Preto", swatch: "#252525", cover: blackImages[0], images: blackImages,
    altTexts: [
      "Modelo usando conjunto preto Happy Boy nas dunas ao pôr do sol",
      "Modelo com camiseta e boné pretos Happy Boy sob luz dourada",
      "Conjunto preto Happy Boy em enquadramento frontal com mãos no relógio",
      "Detalhe frontal da camiseta preta Happy Boy e do boné",
    ],
  },
  verde: {
    slug: "verde", name: "Verde", swatch: "#96916b", cover: greenImages[0], images: greenImages,
    altTexts: [
      "Modelo usando camiseta e short verdes Happy Boy em um caminho de areia",
      "Modelo em movimento com conjunto verde Happy Boy entre as dunas",
      "Conjunto verde Happy Boy em enquadramento frontal próximo",
      "Detalhe da textura e da logo na camiseta verde Happy Boy",
    ],
  },
  branco: {
    slug: "branco", name: "Branco", swatch: "#eeeeda", cover: whiteImages[0], images: whiteImages,
    altTexts: [
      "Modelo usando conjunto branco Happy Boy com céu e nuvens ao fundo",
      "Modelo com camiseta e boné brancos Happy Boy em retrato frontal",
      "Detalhe da camiseta branca e do ajuste do short Happy Boy",
      "Detalhe do bolso do short branco Happy Boy",
    ],
  },
  azul: {
    slug: "azul", name: "Azul", swatch: "#536477", cover: blueImages[0], images: blueImages,
    altTexts: [
      "Modelo usando conjunto azul Happy Boy com a mão no boné nas dunas",
      "Vista lateral do conjunto azul Happy Boy em um caminho de areia",
      "Detalhe frontal da camiseta azul Happy Boy com céu ao fundo",
      "Modelo em movimento com conjunto azul Happy Boy ao pôr do sol",
    ],
  },
};
export const collectionItems = collectionOrder.map((slug) => collections[slug]);
export function isCollectionSlug(value: string): value is CollectionSlug {
  return Object.hasOwn(collections, value);
}
