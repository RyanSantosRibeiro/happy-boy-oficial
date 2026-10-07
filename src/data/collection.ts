export const collectionOrder = ["preto", "verde", "branco", "azul"] as const;

export type CollectionSlug = (typeof collectionOrder)[number];

export type Collection = {
  slug: CollectionSlug;
  name: string;
  cover: string;
  images: readonly string[];
};

export type CollectionAsset = {
  src: string;
  width: number;
  height: number;
};

// Temporary campaign mapping: the same supplied image may be reused until the full set arrives.
export const collectionAssets: Record<CollectionSlug, CollectionAsset> = {
  preto: { src: "/images/collection/black/RAY_9090.jpg", width: 3883, height: 5824 },
  verde: { src: "/images/collection/green/RAY_8966.jpg", width: 3883, height: 5824 },
  branco: { src: "/images/collection/white/RAY_8954.jpg", width: 3883, height: 5824 },
  azul: { src: "/images/collection/blue/RAY_9029.jpg", width: 3889, height: 5833 },
};

export const collections: Record<CollectionSlug, Collection> = {
  preto: {
    slug: "preto",
    name: "Preto",
    cover: collectionAssets.preto.src,
    images: Array.from({ length: 4 }, () => collectionAssets.preto.src),
  },
  verde: {
    slug: "verde",
    name: "Verde",
    cover: collectionAssets.verde.src,
    images: Array.from({ length: 4 }, () => collectionAssets.verde.src),
  },
  branco: {
    slug: "branco",
    name: "Branco",
    cover: collectionAssets.branco.src,
    images: Array.from({ length: 4 }, () => collectionAssets.branco.src),
  },
  azul: {
    slug: "azul",
    name: "Azul",
    cover: collectionAssets.azul.src,
    images: Array.from({ length: 4 }, () => collectionAssets.azul.src),
  },
};

export const collectionItems = collectionOrder.map((slug) => collections[slug]);

export function isCollectionSlug(value: string): value is CollectionSlug {
  return Object.hasOwn(collections, value);
}
