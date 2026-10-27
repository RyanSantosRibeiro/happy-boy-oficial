import type { CatalogCollection } from "./catalog.ts";
import { collectionFamilies, collectionVariantHref, getColorGallery } from "./collection-families.ts";
import { getPoloCaneladoGallery } from "./polo-canelado.ts";
import { getLifestyleGallery, type LifestyleGalleryData } from "./lifestyle-galleries.ts";

export type PresentationLook = { gallery: LifestyleGalleryData; href: string };
export type PresentationGroup = { id: string; label: string; looks: PresentationLook[] };
/** One discovery cover per variant; complete galleries and commercial families stay untouched. */
export function collectionPresentationLooks(collection: CatalogCollection): PresentationLook[] {
  const familyLooks = (slug: string) => {
    const family = collectionFamilies.find(item => item.slug === slug && item.collectionId === collection.id);
    return family?.variants.filter(variant => !variant.gallerySlug).map(variant => ({ gallery: getColorGallery(slug,variant.color)!, href: collectionVariantHref(slug,variant) })) ?? [];
  };
  const polo = collection.presentation.editorialLooks.map(look => {
    const color = look.href.split("/").at(-1)!;
    const gallery = getPoloCaneladoGallery(color);
    return gallery?.collectionId === collection.id ? {gallery,href:look.href} : null;
  }).filter((look): look is PresentationLook => look !== null);
  const shirt = getLifestyleGallery("camisa-short");
  return [
    ...polo,
    ...familyLooks("polo-essential"),
    ...familyLooks("polo-short"),
    ...familyLooks("camiseta-contrast"),
    ...(shirt?.collectionId === collection.id ? [{gallery:shirt,href:"/colecao/camisa-short"}] : []),
  ];
}

/** Four independent discovery carousels; each entry is a variant's primary photograph. */
export function collectionPresentationGroups(collection: CatalogCollection): PresentationGroup[] {
  const looks = collectionPresentationLooks(collection);
  const families = (ids: string[]) => looks.filter(look => ids.includes(look.gallery.commercialFamilyId));
  return [
    { id: "polo-canelado", label: "Polo Dry Fit Canelado", looks: families(["polo-canelado"]) },
    { id: "polo-essential", label: "Polo Essential", looks: families(["polo-calca"]) },
    { id: "polo-short", label: "Polo e Short", looks: families(["polo-short"]) },
    { id: "composicoes", label: "Contrast e Camisa e Short", looks: families(["camiseta-contrast", "camisa-short"]) },
  ].filter(group => group.looks.length > 0);
}
