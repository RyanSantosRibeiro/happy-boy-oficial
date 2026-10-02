import type { CollectionLook } from "@/data/sea-sky";

export function LookInformation({ look }: { look: CollectionLook }) {
  return <article className={`look-information look-information--${look.textPosition}`} data-look-panel={look.id} aria-label={`Look ${look.number}: ${look.name}`}>
    <span className="eyebrow look-kicker">Look {look.number} <span /> {look.category}</span>
    <h3>{look.name}</h3>
    <p className="look-description" data-look-detail>{look.description}</p>
    <p className="look-price" data-look-detail>{look.price ?? "Preço a definir"}</p>
    <a className="look-discover" data-look-detail href={look.href ?? `#piece-${look.id}`}>Explorar look <span aria-hidden="true">↗</span></a>
    {look.placeholder && <span className="look-placeholder">Conteúdo provisório</span>}
  </article>;
}
