/** A visible invitation to open a linked photograph, independent of hover. */
export function PhotoPageHint({ label = "Ver fotos e detalhes" }: { label?: string }) {
  return <span className="photo-page-hint" aria-hidden="true">{label}<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 10h13m-5-5 5 5-5 5" /></svg></span>;
}
