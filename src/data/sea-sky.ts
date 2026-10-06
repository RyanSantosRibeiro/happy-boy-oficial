import { createCollectionTimeline } from "@/lib/collection-timeline";

export type CollectionLook = {
  id: string;
  number: string;
  name: string;
  category: string;
  price?: string;
  description: string;
  details: string[];
  href?: string;
  image: string;
  imageAlt: string;
  textPosition: "left" | "right";
  objectPositionDesktop: string;
  objectPositionMobile: string;
  placeholder: boolean;
};

const referenceOne = "/images/sea-sky-reference-01.jpg";
const referenceTwo = "/images/sea-sky-reference-02.jpg";

// These are study labels, not official product names or commercial descriptions.
// Repeated images deliberately stand in for the three missing campaign looks.
export const collectionLooks: CollectionLook[] = [
  { id: "look-01", number: "01", name: "Forma leve", category: "Estudo de look", description: "Uma composição em tons claros. Nome e detalhes provisórios para esta prévia editorial.", details: ["Referência visual 01", "Ficha da peça em breve"], image: referenceOne, imageAlt: "Referência enviada: modelo com polo bege e calça branca junto a uma escadaria clara.", textPosition: "left", objectPositionDesktop: "50% 46%", objectPositionMobile: "50% 50%", placeholder: true },
  { id: "look-02", number: "02", name: "Tom solar", category: "Estudo de look", description: "Contraste de tons, presença sutil. Nome e detalhes provisórios para esta prévia editorial.", details: ["Referência visual 02", "Ficha da peça em breve"], image: referenceTwo, imageAlt: "Referência enviada: modelo com polo terracota e calça escura diante de uma escadaria branca.", textPosition: "right", objectPositionDesktop: "50% 48%", objectPositionMobile: "50% 50%", placeholder: true },
  { id: "look-03", number: "03", name: "Novo horizonte", category: "Estudo de look", description: "Espaço reservado ao terceiro look da coleção. Fotografia e conteúdo serão substituídos.", details: ["Imagem de referência repetida", "Look definitivo em breve"], image: referenceOne, imageAlt: "Imagem provisória do look 03: repetição da referência com polo bege.", textPosition: "left", objectPositionDesktop: "50% 45%", objectPositionMobile: "50% 50%", placeholder: true },
  { id: "look-04", number: "04", name: "Ritmo natural", category: "Estudo de look", description: "Espaço reservado ao quarto look da coleção. Fotografia e conteúdo serão substituídos.", details: ["Imagem de referência repetida", "Look definitivo em breve"], image: referenceTwo, imageAlt: "Imagem provisória do look 04: repetição da referência com polo terracota.", textPosition: "right", objectPositionDesktop: "50% 50%", objectPositionMobile: "50% 50%", placeholder: true },
  { id: "look-05", number: "05", name: "Além da linha", category: "Estudo de look", description: "Espaço reservado ao quinto look da coleção. Fotografia e conteúdo serão substituídos.", details: ["Imagem de referência repetida", "Look definitivo em breve"], image: referenceOne, imageAlt: "Imagem provisória do look 05: repetição da referência com polo bege.", textPosition: "left", objectPositionDesktop: "50% 50%", objectPositionMobile: "50% 50%", placeholder: true },
];

export const brand = {
  name: "Happy Boy",
  logoSrc: "/images/happy-boy-logo-black.png",
  instagram: "https://www.instagram.com/happyboyoficial/",
  shopHref: null as string | null,
  contactHref: null as string | null,
};

export const campaign = {
  title: "SEA SKY",
  year: "2026",
  isPreview: true,
  poster: referenceOne,
  // Main campaign film supplied for the first integration.
  // Use separate desktop/mobile exports here later when they are available.
  videoDesktop: "/videos/backgroud.mp4",
  videoMobile: "/videos/backgroud.mp4",
  objectPositionDesktop: "50% 50%",
  objectPositionMobile: "50% 50%",
  // Portrait references retain the complete outfit on wide screens.
  fallbackFitDesktop: "contain" as "contain" | "cover",
  fallbackFitMobile: "cover" as "contain" | "cover",
  // Change to 2 for the initial look → transformation → look prototype.
  prototypeLookCount: 5,
  // Total hero height: 100svh × visible looks. Transitions share that distance.
  heroViewportHeightsPerLook: 1,
  introFadeEndWithinFirstLook: 0.16,
  viewportHeightsPerLook: 1.75,
  viewportHeightsPerTransition: 0.45,
  // 0 follows the scroll immediately; a positive number adds catch-up seconds.
  scrollSmoothing: 1.9,
  finaleStart: 0.96,
};

export const experienceLooks = collectionLooks.slice(0, campaign.prototypeLookCount);
// Override individual normalized fields here after the final edit is approved.
export const collectionTimeline = createCollectionTimeline(experienceLooks.map((look) => look.id));
// Reserve the opening of the first chapter for the campaign title.
Object.assign(collectionTimeline[0], { infoStart: 0.16, infoFull: 0.3, holdStart: 0.4 });
