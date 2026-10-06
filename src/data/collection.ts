export const collectionOrder = ["preto", "verde", "branco", "azul"] as const;

export type CollectionSlug = (typeof collectionOrder)[number];

export type Collection = {
  slug: CollectionSlug;
  name: string;
  cover: string;
  images: readonly string[];
};

export const collections: Record<CollectionSlug, Collection> = {
  preto: {
    slug: "preto",
    name: "Preto",
    cover: "/images/collection/black/RAY_9101.jpg",
    images: [
      "/images/collection/black/RAY_9101.jpg",
      "/images/collection/black/RAY_9094.jpg",
      "/images/collection/black/RAY_9093.jpg",
      "/images/collection/black/RAY_9090.jpg",
    ],
  },
  verde: {
    slug: "verde",
    name: "Verde",
    cover: "/images/collection/green/RAY_8966.jpg",
    images: [
      "/images/collection/green/RAY_8966.jpg",
      "/images/collection/green/RAY_9016.jpg",
      "/images/collection/green/RAY_8976.jpg",
      "/images/collection/green/RAY_8982.jpg",
    ],
  },
  branco: {
    slug: "branco",
    name: "Branco",
    cover: "/images/collection/white/RAY_8954.jpg",
    images: [
      "/images/collection/white/RAY_8954.jpg",
      "/images/collection/white/RAY_8934.jpg",
      "/images/collection/white/RAY_8943.jpg",
      "/images/collection/white/RAY_8945.jpg",
    ],
  },
  azul: {
    slug: "azul",
    name: "Azul",
    cover: "/images/collection/blue/RAY_9029.jpg",
    images: [
      "/images/collection/blue/RAY_9029.jpg",
      "/images/collection/blue/RAY_9077.jpg",
      "/images/collection/blue/RAY_9046.jpg",
      "/images/collection/blue/RAY_9041.jpg",
    ],
  },
};

export const collectionItems = collectionOrder.map((slug) => collections[slug]);

export function isCollectionSlug(value: string): value is CollectionSlug {
  return value in collections;
}
