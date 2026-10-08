import { getPoloCaneladoGallery, poloCaneladoColors } from "./polo-canelado";

export const collectionEditorialLooks = [
  ...poloCaneladoColors.map(color => {
    const gallery = getPoloCaneladoGallery(color.slug)!;
    return { id: gallery.id, name: color.name, src: gallery.cover, alt: gallery.photos[0].alt,
      href: `/colecao/${gallery.slug}/${color.slug}`, label: `${gallery.name} / ${color.name}` };
  }),
];

export const lifestyleEditorialLooks = [
  { id: "8882", slug: "camiseta-bermuda", label: "Camiseta e bermuda", src: "/images/travel-edition/lifestyle/RAY_8882.webp", alt: "Modelo usando camiseta branca e bermuda bege Happy Boy próximo ao veículo" },
  { id: "8813", slug: "polo-marrom", label: "Polo marrom", src: "/images/travel-edition/lifestyle/RAY_8813.webp", alt: "Modelo usando polo marrom e calça bege Happy Boy com céu azul ao fundo" },
  { id: "8832", slug: "camisa-clara", label: "Camisa clara", src: "/images/travel-edition/lifestyle/RAY_8832.webp", alt: "Modelo usando camisa clara de botões e calça clara Happy Boy" },
  { id: "8658", slug: "polo-verde", label: "Polo verde", src: "/images/travel-edition/lifestyle/RAY_8658.webp", alt: "Modelo usando polo verde-escura e short marrom Happy Boy próximo ao veículo" },
] as const;

export const shirtShortEditorialLook = {
  id: "8851", slug: "camisa-short", label: "Camisa e short",
  src: "/images/travel-edition/lifestyle/RAY_8851.webp",
  alt: "Modelo com camisa clara de botões e short preto, apoiado no veículo nas dunas",
} as const;
