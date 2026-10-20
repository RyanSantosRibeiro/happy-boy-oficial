export type WeeklyLaunch = {
  id: string;
  collectionId: string;
  status: "draft" | "published";
  mode: "launch" | "preview";
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
  releaseAt?: string;
  media?: { type: "image" | "video"; src: string; alt: string; poster?: string };
};

/** Approved teaser only. Its blurred placeholder does not reveal a future product. */
export const weeklyLaunches: WeeklyLaunch[] = [{
  id: "previa-novembro-2026",
  collectionId: "travel-edition",
  status: "published",
  mode: "preview",
  title: "Prévia da próxima coleção",
  description: "Um novo capítulo está chegando. Acompanhe a prévia em 1º de novembro.",
  releaseAt: "2026-11-01T00:00:00-03:00",
  media: { type: "image", src: "/images/travel-edition/lifestyle/RAY_8832.webp", alt: "Imagem ilustrativa desfocada da prévia da próxima coleção" },
}];

export function getWeeklyLaunches(collectionId: string, entries = weeklyLaunches) {
  return entries.filter(entry => entry.status === "published" && entry.collectionId === collectionId);
}
