import { collectionItems } from "./collection.ts";
import { collectionFamilies, collectionVariantHref, getColorGallery } from "./collection-families.ts";
import { collectionEditorialLooks, shirtShortEditorialLook } from "./editorial-looks.ts";
import { getLifestyleGallery } from "./lifestyle-galleries.ts";
import { commercialFamilies, travelCollectionId, type CommercialFamilyId } from "./commercial.ts";

export type CampaignHeroData = {
  videoSrc: string | null; mobileVideoSrc: string; poster: string; mobilePoster: string;
  closingStartsAt: number; revealDelaySeconds: number; title: string; subtitle: string;
};
export type EditorialLook = { id: string; name: string; src: string; alt: string; href: string; label: string };
export type EditorialSelection =
  | { kind: "family"; family: (typeof collectionFamilies)[number] }
  | { kind: "look"; look: { id: string; label: string; src: string; alt: string; href: string } };
export type CollectionLine = { familyId: CommercialFamilyId; items: { name: string; href: string; cover: string; alt: string }[] };
export type CatalogCollection = {
  id: string; slug: string; name: string; description: string;
  cover: { src: string; alt: string }; status: "draft" | "published"; order: number; featured: boolean;
  lines: CollectionLine[];
  presentation: {
    hero: CampaignHeroData;
    benefits: string[];
    films: { src: string; poster: string; color: string; href: string }[];
    filmHeading: { kicker: string; title: string };
    editorialLooks: EditorialLook[]; editorialLabel: string; selection: EditorialSelection[];
    aboutPhoto: { src: string; alt: string; href: string; linkLabel: string };
  };
};

const dryFitLine: CollectionLine = { familyId: "dry-fit", items: collectionItems.map(item => ({
  name: item.name, href: `/colecao/${item.slug}`, cover: item.cover, alt: item.altTexts[0],
})) };
const poloLine: CollectionLine = { familyId: "polo-canelado", items: collectionEditorialLooks.map(look => ({
  name: look.name, href: look.href, cover: look.src, alt: look.alt,
})) };
const variantLines: CollectionLine[] = collectionFamilies.map(family => ({
  familyId: family.commercialFamilyId,
  // The plain T-shirt and bermuda keep their own commercial family despite sharing a visual carousel.
  items: family.variants.filter(variant => !variant.gallerySlug).map(variant => {
    const gallery = getColorGallery(family.slug, variant.color)!;
    return { name: variant.name, href: collectionVariantHref(family.slug, variant), cover: gallery.cover, alt: gallery.photos[0].alt };
  }),
}));
const separateLines: CollectionLine[] = ["camisa-short", "camisa-clara", "camiseta-bermuda"].map(slug => {
  const gallery = getLifestyleGallery(slug)!;
  return { familyId: gallery.commercialFamilyId, items: [{ name: gallery.name, href: `/colecao/${slug}`, cover: gallery.cover, alt: gallery.photos[0].alt }] };
});

/** Only approved collections belong here. Publishing and featuring are manual decisions. */
export const catalogCollections: CatalogCollection[] = [{
  id: travelCollectionId, slug: travelCollectionId, name: "Travel Edition",
  description: "Do cotidiano ao destino, com estilo em cada caminho. Explore as linhas, cores e detalhes da coleção e converse com a equipe comercial sobre compras no atacado.",
  cover: { src: "/images/travel-edition/lifestyle/RAY_8832.webp", alt: "Campanha Travel Edition: camisa e calça claras sob o céu azul" },
  status: "published", order: 1, featured: true,
  lines: [dryFitLine, poloLine, ...variantLines, ...separateLines],
  presentation: {
    hero: {
      videoSrc: "/videos/travel-edition/happyboy-beyond-limits-v7-desktop.mp4",
      mobileVideoSrc: "/videos/travel-edition/happyboy-beyond-limits-v7-mobile.mp4",
      poster: "/videos/travel-edition/happyboy-beyond-limits-v7-desktop-poster.jpg",
      mobilePoster: "/videos/travel-edition/happyboy-beyond-limits-v7-mobile-poster.jpg",
      closingStartsAt: 35.24, revealDelaySeconds: 2.5,
      title: "TRAVEL EDITION", subtitle: "Do cotidiano ao destino, com estilo em cada caminho",
    },
    benefits: ["Happy Boy", "Travel Edition", "Nova coleção"],
    films: ["branco", "verde", "azul", "preto"].map((color, index) => {
      const file = `${String(index + 1).padStart(2, "0")}-happyboy-travel-${color}`;
      return { color, href: `/colecao/${color}`, src: `/videos/travel-edition/${file}.mp4`, poster: `/videos/travel-edition/${file}-capa.jpg` };
    }),
    filmHeading: { kicker: "Happy Boy / Modern Movement", title: "Quatro cores. Novos caminhos." },
    editorialLooks: collectionEditorialLooks, editorialLabel: "Conjunto Polo Dry Fit Canelado",
    selection: [
      { kind: "look", look: { ...shirtShortEditorialLook, href: `/colecao/${shirtShortEditorialLook.slug}` } },
      ...["polo-essential", "polo-short", "camiseta-contrast"].map(slug => ({ kind: "family" as const, family: collectionFamilies.find(family => family.slug === slug)! })),
    ],
    aboutPhoto: {
      src: "/images/travel-edition/lifestyle/RAY_8832.webp", href: "/colecao/camisa-clara",
      alt: "Editorial Happy Boy: modelo com camisa clara de botões e calça clara sob o céu azul",
      linkLabel: "Ver galeria de camisa clara e calça clara",
    },
  },
}];

export function getPublishedCollections(entries = catalogCollections) {
  return entries.filter(collection => collection.status === "published").sort((a, b) => a.order - b.order);
}
export function getPublishedCollection(idOrSlug: string) {
  return getPublishedCollections().find(collection => collection.id === idOrSlug || collection.slug === idOrSlug);
}
export function getFeaturedCollection(entries = catalogCollections) {
  const featured = getPublishedCollections(entries).filter(collection => collection.featured);
  if (featured.length !== 1) throw new Error("Configure exactly one approved, published featured collection.");
  return featured[0];
}
export function getCollectionLineName(line: CollectionLine) { return commercialFamilies[line.familyId].name; }

/** Protect direct product URLs too, not only the collection index. Null denotes existing legacy previews. */
export function isPublishedCatalogEntry(entry: { collectionId: string | null }, entries = catalogCollections) {
  return entry.collectionId === null || getPublishedCollections(entries).some(collection => collection.id === entry.collectionId);
}

/** Old product links keep a useful return destination after the homepage changes collection. */
export function collectionReturnHref(collectionId: string, currentHref: string, entries = catalogCollections) {
  const collection = getPublishedCollections(entries).find(entry => entry.id === collectionId);
  return collection && !collection.featured ? `/colecoes/${collection.slug}` : currentHref;
}
