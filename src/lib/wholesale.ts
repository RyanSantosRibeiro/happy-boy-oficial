import { commercialContact, commercialFamilies, type CommercialFamilyId } from "../data/commercial.ts";

export function whatsappHref(message: string, destination = commercialContact.phone): string | null {
  const phone = destination.replace(/\D/g, "");
  if (phone.length < 10 || phone.length > 15 || !message.trim()) return null;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function lineConsultationMessage(familyId: CommercialFamilyId, collectionName?: string): string {
  const family = commercialFamilies[familyId];
  const collection = collectionName ? ` da coleção ${collectionName}` : "";
  return `Olá! Gostaria de receber o catálogo e conhecer ${family.subject}${collection} da Happy Boy para compras no atacado. Gostaria de receber informações sobre os modelos, cores disponíveis, valores e condições comerciais.`;
}

export function catalogRequestMessage(collectionName: string): string {
  return `Olá! Gostaria de receber o catálogo da coleção ${collectionName} da Happy Boy e saber mais sobre as condições de compra no atacado.`;
}
