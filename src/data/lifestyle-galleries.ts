import { lifestyleEditorialLooks, shirtShortEditorialLook } from "./editorial-looks";
import { collectionFamilies, collectionVariantHref } from "./collection-families";

export type LifestyleSlug = typeof lifestyleEditorialLooks[number]["slug"];
export type LookPhoto = { id: string; src: string; original: string; alt: string };
export type LifestyleGalleryData = {
  id: string;
  slug: string;
  name: string;
  cover: string;
  photos: LookPhoto[];
  color?: string;
  consultationMessage?: string;
  returnHref?: string;
  variants?: LookVariantLink[];
};

export type LookVariantLink = { color: string; name: string; href: string; swatch: string };

const additionalPhotos: Record<LifestyleSlug, Array<{ id: string; alt: string }>> = {
  "camiseta-bermuda": [
    { id: "8906", alt: "Camiseta branca e bermuda bege em três quartos, próximo ao veículo" },
    { id: "8895", alt: "Modelo de frente ajustando a bermuda bege, com camiseta branca" },
    { id: "8898", alt: "Vista posterior da camiseta branca e da bermuda bege" },
    { id: "8900", alt: "Detalhe do tecido, da cintura e do ajuste lateral da bermuda bege" },
  ],
  "polo-marrom": [
    { id: "8802", alt: "Modelo de frente, de corpo inteiro, com polo marrom e calça bege" },
    { id: "8811", alt: "Composição editorial frontal da polo marrom com calça bege" },
    { id: "8808", alt: "Vista lateral do caimento da polo marrom e da calça bege" },
  ],
  "camisa-clara": [
    { id: "8829", alt: "Modelo de corpo inteiro com camisa clara de botões e calça clara, sob céu azul" },
  ],
  "polo-verde": [
    { id: "8654", alt: "Modelo de corpo inteiro com polo verde-escura e short marrom, apoiado no veículo" },
    { id: "8656", alt: "Composição frontal da polo verde-escura e do short marrom próximo ao veículo" },
    { id: "8668", alt: "Vista frontal destacando o caimento da polo verde-escura" },
    { id: "8664", alt: "Close editorial do rosto, do colarinho e da polo verde-escura" },
  ],
};

const photo = ({ id, alt }: { id: string; alt: string }): LookPhoto => ({
  id,
  alt,
  src: `/images/travel-edition/lifestyle/RAY_${id}.webp`,
  original: `/images/travel-edition/lifestyle/originals/RAY_${id}.jpg`,
});

export const lifestyleGalleries: LifestyleGalleryData[] = [...lifestyleEditorialLooks.map((look) => ({
  id: look.id,
  slug: look.slug,
  name: look.label,
  cover: look.src,
  photos: [photo(look), ...additionalPhotos[look.slug].map(photo)],
})), {
  id: shirtShortEditorialLook.id, slug: shirtShortEditorialLook.slug,
  name: shirtShortEditorialLook.label, cover: shirtShortEditorialLook.src,
  photos: [photo(shirtShortEditorialLook),
    photo({ id: "8873", alt: "Vista frontal da camisa clara aberta e do short preto próximo ao veículo" }),
    photo({ id: "8876", alt: "Detalhe do tecido, dos botões e do acabamento da camisa clara Happy Boy" })],
}];

export function getLifestyleGallery(slug: string) {
  const look = lifestyleGalleries.find((look) => look.slug === slug);
  if (slug === "camisa-clara" && look) return { ...look, returnHref: "/#about" };
  if (slug !== "camiseta-bermuda" || !look) return look;
  const family = collectionFamilies.find(item => item.slug === "camiseta-contrast")!;
  return { ...look, color: "Branca / bermuda bege", variants: family.variants.map(item => ({
    color: item.color, name: item.name, swatch: item.swatch, href: collectionVariantHref(family.slug, item),
  })) };
}
