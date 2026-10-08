import type { CollectionSlug } from "./collection";

export const dryFitEditorialLooks: ReadonlyArray<{ slug: CollectionSlug; name: string; src: string; alt: string }> = [
  { slug: "preto", name: "Preto", src: "/images/travel-edition/preto/RAY_9097.webp", alt: "Modelo de frente com camiseta e short pretos Happy Boy nas dunas ao pôr do sol" },
  { slug: "verde", name: "Verde", src: "/images/travel-edition/verde/RAY_8966.webp", alt: "Modelo de frente com camiseta e short verdes Happy Boy no caminho de areia" },
  { slug: "branco", name: "Branco", src: "/images/travel-edition/branco/RAY_8913.webp", alt: "Modelo correndo de frente com camiseta e short brancos Happy Boy e céu ao fundo" },
  { slug: "azul", name: "Azul", src: "/images/travel-edition/azul/RAY_9029.webp", alt: "Modelo de frente com camiseta e short azuis Happy Boy tocando a aba do boné" },
];

export const lifestyleEditorialLooks = [
  { id: "8882", slug: "camiseta-bermuda", label: "Camiseta e bermuda", src: "/images/travel-edition/lifestyle/RAY_8882.webp", alt: "Modelo usando camiseta branca e bermuda bege Happy Boy próximo ao veículo" },
  { id: "8813", slug: "polo-marrom", label: "Polo marrom", src: "/images/travel-edition/lifestyle/RAY_8813.webp", alt: "Modelo usando polo marrom e calça bege Happy Boy com céu azul ao fundo" },
  { id: "8832", slug: "camisa-clara", label: "Camisa clara", src: "/images/travel-edition/lifestyle/RAY_8832.webp", alt: "Modelo usando camisa clara de botões e calça clara Happy Boy" },
  { id: "8658", slug: "polo-verde", label: "Polo verde", src: "/images/travel-edition/lifestyle/RAY_8658.webp", alt: "Modelo usando polo verde-escura e short marrom Happy Boy próximo ao veículo" },
] as const;
