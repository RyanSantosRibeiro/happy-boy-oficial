import type { CollectionLook } from "@/data/sea-sky";

export function CollectionProgress({ looks }: { looks: CollectionLook[] }) {
  return <nav className="collection-progress" aria-label="Selecionar look">
    <span className="progress-caption">Os looks</span>
    <div className="progress-steps">{looks.map((look, index) => <button key={look.id} data-look-target={look.id} aria-label={`Ir para look ${look.number}: ${look.name}`} aria-current={index === 0 ? "step" : undefined}><span>{look.number}</span><i aria-hidden="true" /></button>)}</div>
    <span className="progress-count">/{String(looks.length).padStart(2, "0")}</span>
  </nav>;
}
