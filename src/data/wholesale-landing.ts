/** Owner-supplied facts. Pending media stays empty until approved originals arrive. */
export type ApprovedMedia = { kind: "image" | "video"; src: string; alt: string; caption: string; poster?: string };
export type RetailerStory = { name: string; business: string; quote: string; media?: ApprovedMedia };

export const wholesaleStory: {
  founderVideo: { src: string; poster?: string } | null;
  testimonials: RetailerStory[];
  operationMedia: ApprovedMedia[];
} = { founderVideo: null, testimonials: [], operationMedia: [] };

export const physicalStores = [
  { id: "patio-central", name: "Pátio Central", address: "Av. Pessoa Anta, 14 — Praia de Iracema, Fortaleza — CE.", query: "Shopping Pátio Central, Avenida Pessoa Anta, 14, Fortaleza CE" },
  { id: "maraponga", name: "Maraponga Mart Moda", address: "R. Francisco Glicério, 290 — Acesso 2, Maraponga, Fortaleza — CE.", query: "Maraponga Mart Moda, Rua Francisco Glicério, 290, Fortaleza CE" },
  { id: "fortaleza-sul", name: "Shopping Fortaleza Sul", address: "Av. Luciano Carneiro, 1333 — Fátima, Fortaleza — CE.", query: "Shopping Fortaleza Sul, Avenida Luciano Carneiro, 1333, Fortaleza CE" },
] as const;

export const brazilianStates = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"] as const;

export function storeMapHref(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
