export function productConsultationMessage(name: string, color?: string) {
  const selectedColor = color?.trim();
  const piece = `${name.trim()}${selectedColor ? ` — cor ${selectedColor}` : ""}`;
  return `Olá! Tenho interesse em ${piece} da Happy Boy. Gostaria de saber o valor e os tamanhos disponíveis.`;
}
