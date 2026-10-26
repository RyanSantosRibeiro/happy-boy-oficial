/** Commercial families describe the complete line, independently of its colors. */
export const commercialFamilies = {
  "dry-fit": { name: "Linha Dry Fit", subject: "a linha Dry Fit" },
  "polo-canelado": { name: "Conjunto Polo Dry Fit Canelado", subject: "a linha de Conjunto Polo Dry Fit Canelado" },
  "polo-short": { name: "Conjuntos Polo e Short", subject: "os conjuntos de Polo e Short" },
  "camisa-short": { name: "Conjuntos Camisa e Short", subject: "a linha de Camisa e Short" },
  "polo-calca": { name: "Conjuntos Polo e Calça", subject: "os conjuntos de Polo e Calça" },
  "camisa-calca": { name: "Conjuntos Camisa e Calça", subject: "os conjuntos de Camisa e Calça" },
  "camiseta-contrast": { name: "Linha Camiseta Contrast", subject: "a linha Camiseta Contrast" },
  "camiseta-bermuda": { name: "Conjuntos Camiseta e Bermuda", subject: "os conjuntos de Camiseta e Bermuda" },
  // Existing illustrative /produto pages: no unsupported outfit classification.
  polos: { name: "Linha de Polos", subject: "a linha de Polos" },
  camisas: { name: "Linha de Camisas", subject: "a linha de Camisas" },
  camisetas: { name: "Linha de Camisetas", subject: "a linha de Camisetas" },
  calcas: { name: "Linha de Calças", subject: "a linha de Calças" },
  bermudas: { name: "Linha de Bermudas", subject: "a linha de Bermudas" },
} as const;

export type CommercialFamilyId = keyof typeof commercialFamilies;
export const travelCollectionId = "travel-edition";

export const commercialContact = {
  phone: "558589634064",
  generalMessage: "Olá! Gostaria de conhecer as coleções disponíveis da Happy Boy e saber mais sobre as condições de compra no atacado.",
  sellerMessage: "Olá! Gostaria de falar com um vendedor da Happy Boy sobre as coleções disponíveis e as condições de compra no atacado.",
};

type ThirdCommercialAction =
  | { enabled: false; title: null; message: null; destination: null }
  | { enabled: true; title: string; message: string; destination: string };

/** Activation needs a confirmed title, message and WhatsApp destination, in one place. */
export const thirdCommercialAction: ThirdCommercialAction = {
  enabled: true,
  title: "Quero solicitar uma visita de um representante na minha loja",
  message: "Olá! Quero solicitar uma visita de um representante da Happy Boy na minha loja. Como posso agendar?",
  destination: commercialContact.phone,
};

export const institutionalCopy = {
  title: "Sobre a Happy Boy",
  text: "Desde 1998, a Happy Boy atua como fabricante de moda masculina, com fabricação própria, estrutura operacional e equipe comercial. Atendemos compradores de atacado e buscamos construir parcerias de longo prazo com lojistas.",
  provisional: false,
};
