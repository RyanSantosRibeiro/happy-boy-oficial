import { brazilianStates } from "../data/wholesale-landing.ts";
import { whatsappHref } from "./wholesale.ts";

export const contactIntents = {
  atacado: { title: "Quero comprar no atacado", subject: "Compra no atacado", help: "Conheça as linhas e converse sobre as condições comerciais para a sua loja." },
  representante: { title: "Quero receber um representante na minha loja", subject: "Visita de representante à loja", help: "Informe a localização do seu negócio. A equipe vai conversar com você sobre a visita." },
  showroom: { title: "Quero agendar uma visita ao showroom da fábrica", subject: "Visita ao showroom da fábrica", help: "Indique sua preferência. O dia e o horário serão confirmados pela equipe comercial." },
  lojas: { title: "Quero conhecer as lojas físicas", subject: "Informações sobre lojas físicas", help: "Veja os endereços e mapas ou converse com a equipe para organizar sua visita." },
} as const;
export type ContactIntent = keyof typeof contactIntents;
export const businessProfiles = ["Já tenho loja", "Estou começando meu negócio", "Quero começar a revender"] as const;

/** Structured for a future approved CRM adapter; currently kept only in browser memory. */
export type CommercialLead = {
  intent: ContactIntent; name: string; business: string; phone: string; city: string; state: string;
  profile: string; address: string; preference: string; notes: string; operationVisit: boolean;
};
export type LeadErrors = Partial<Record<keyof CommercialLead, string>>;
export function contactSelection(hash: string): { intent: ContactIntent; operationVisit: boolean } | null {
  const value = hash.replace(/^#atendimento-/, "");
  if (hash === "#atendimento-operacao") return { intent: "showroom", operationVisit: true };
  return hash.startsWith("#atendimento-") && Object.hasOwn(contactIntents, value)
    ? { intent: value as ContactIntent, operationVisit: false } : null;
}
export function contactHref(intent: ContactIntent, operationVisit = false) {
  return `/#atendimento-${operationVisit ? "operacao" : intent}`;
}
function clean(value: string) { return value.trim().replace(/\s+/g, " "); }
export function validateCommercialLead(lead: CommercialLead): LeadErrors {
  const errors: LeadErrors = {};
  if (!Object.hasOwn(contactIntents, lead.intent)) errors.intent = "Escolha o atendimento desejado.";
  if (clean(lead.name).length < 2 || lead.name.length > 100) errors.name = "Informe seu nome (de 2 a 100 caracteres).";
  const digits = lead.phone.replace(/\D/g, "").replace(/^55(?=\d{10,11}$)/, "");
  if (!/^[1-9]\d{9,10}$/.test(digits)) errors.phone = "Informe um WhatsApp válido com DDD.";
  if (lead.intent !== "lojas") {
    if (clean(lead.city).length < 2 || lead.city.length > 100) errors.city = "Informe sua cidade.";
    if (!(brazilianStates as readonly string[]).includes(lead.state)) errors.state = "Selecione seu estado.";
    if (!(businessProfiles as readonly string[]).includes(lead.profile)) errors.profile = "Selecione a situação do seu negócio.";
    if (lead.profile === "Já tenho loja" && !clean(lead.business)) errors.business = "Informe o nome da sua loja.";
  }
  if (lead.business.length > 120) errors.business = "Use até 120 caracteres para o nome da loja.";
  if (lead.intent === "representante" && (clean(lead.address).length < 3 || lead.address.length > 200)) errors.address = "Informe o bairro ou endereço da loja.";
  if (lead.intent === "showroom" && (clean(lead.preference).length < 3 || lead.preference.length > 120)) errors.preference = "Indique um dia ou período de preferência.";
  if (lead.notes.length > 600) errors.notes = "Use até 600 caracteres nas observações.";
  return errors;
}
export function commercialLeadMessage(lead: CommercialLead): string {
  const lines = ["Olá, Happy Boy! Gostaria de conversar com a equipe comercial.", "", `Interesse: ${contactIntents[lead.intent].subject}`, `Nome: ${clean(lead.name)}`, `WhatsApp: ${clean(lead.phone)}`];
  if (lead.intent !== "lojas") {
    lines.push(`Loja: ${clean(lead.business) || "Ainda não tenho uma loja definida"}`, `Cidade/UF: ${clean(lead.city)} / ${lead.state}`, `Perfil: ${lead.profile}`);
  }
  if (lead.intent === "representante") lines.push(`Bairro ou endereço da loja: ${clean(lead.address)}`);
  if (lead.intent === "showroom") {
    if (lead.operationVisit) lines.push("Motivo: Conhecer a operação de perto");
    lines.push(`Preferência de visita: ${clean(lead.preference)}`, "Entendo que o dia e o horário dependem da confirmação da equipe.");
  }
  if (lead.notes.trim()) lines.push(`Observações: ${clean(lead.notes)}`);
  return lines.join("\n");
}
export function commercialLeadHref(lead: CommercialLead): string | null {
  return Object.keys(validateCommercialLead(lead)).length ? null : whatsappHref(commercialLeadMessage(lead));
}
