import type { LifestyleGalleryData } from "./lifestyle-galleries";

export const poloCaneladoSlug = "conjunto-polo-dry-fit-canelado";
export const poloCaneladoName = "Conjunto Polo Dry Fit Canelado";
export const poloCaneladoColors = [
  { slug: "preto", name: "Preto", swatch: "#252525", ids: ["8578", "8580", "8584"] },
  { slug: "branco", name: "Branco", swatch: "#eeeeda", ids: ["8559", "8566", "8570", "8574"] },
  { slug: "bege", name: "Bege", swatch: "#d5c1a0", ids: ["8556", "8549", "8553", "8557"] },
  { slug: "verde", name: "Verde", swatch: "#73734d", ids: ["8519", "8522", "8524", "8527", "8529", "8532", "8540"] },
] as const;

const descriptions: Record<string, string> = {
  "8578": "Modelo de corpo inteiro com polo e short pretos Happy Boy nas dunas",
  "8580": "Vista frontal da polo e do short pretos Happy Boy",
  "8584": "Detalhe da textura e do ajuste da polo e do short pretos Happy Boy",
  "8559": "Modelo de corpo inteiro e de frente com polo e short brancos Happy Boy",
  "8566": "Detalhe frontal da polo branca e da cintura do short branco Happy Boy",
  "8570": "Retrato frontal do modelo com a polo branca Happy Boy",
  "8574": "Vista do colarinho e da manga da polo branca Happy Boy",
  "8556": "Modelo de corpo inteiro com polo e short bege Happy Boy próximo ao veículo",
  "8549": "Composição de corpo inteiro com polo e short bege Happy Boy",
  "8553": "Vista frontal da polo e do short bege Happy Boy",
  "8557": "Detalhe da polo e do short bege Happy Boy próximo ao veículo",
  "8519": "Modelo de corpo inteiro com polo e short verdes Happy Boy próximo ao veículo",
  "8522": "Composição frontal de corpo inteiro com polo e short verdes Happy Boy",
  "8524": "Detalhe da manga e da textura da polo verde Happy Boy",
  "8527": "Vista lateral da polo e do short verdes Happy Boy",
  "8529": "Detalhe da barra da polo e do short verdes Happy Boy",
  "8532": "Composição editorial frontal com polo e short verdes Happy Boy",
  "8540": "Vista em três quartos posterior da polo e do short verdes Happy Boy",
};

export function getPoloCaneladoGallery(color: string): LifestyleGalleryData | undefined {
  const selected = poloCaneladoColors.find(item => item.slug === color);
  if (!selected) return undefined;
  const root = `/images/polo-dry-fit-canelado/${selected.slug}`;
  return {
    id: `${poloCaneladoSlug}-${selected.slug}`, slug: poloCaneladoSlug,
    name: poloCaneladoName, color: selected.name, returnHref: "/#dry-fit",
    cover: `${root}/RAY_${selected.ids[0]}.webp`,
    consultationMessage: `Olá! Gostei do ${poloCaneladoName} / ${selected.name} e queria saber mais informações, disponibilidade e valor.`,
    photos: selected.ids.map(id => ({ id, src: `${root}/RAY_${id}.webp`, original: `${root}/originals/RAY_${id}.jpg`, alt: descriptions[id] })),
    variants: poloCaneladoColors.map(item => ({ color: item.slug, name: item.name, swatch: item.swatch, href: `/colecao/${poloCaneladoSlug}/${item.slug}` })),
  };
}
