export function CommercialActionIcon({ kind }: { kind: "line" | "seller" | "visit" | "pending" | "whatsapp" }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === "line" ? <path d="m3 7 9-4 9 4-9 4-9-4Zm0 5 9 4 9-4M3 17l9 4 9-4" /> :
      kind === "seller" ? <path d="M4 13v-2a8 8 0 0 1 16 0v2M4 11H2v7h4v-7H4Zm16 0h2v7h-4v-7h2Zm0 7c0 3-3 4-7 4" /> :
      kind === "visit" ? <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></> :
      kind === "whatsapp" ? <><path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20l1.2-4.6a8.5 8.5 0 1 1 16.3-3.9Z" /><path d="m8.2 7.2 1.4 2.6-.9 1c.9 1.7 1.8 2.6 3.7 3.4l.9-1 2.7 1.4c.2 1.8-1.3 2.2-2.3 2-4.3-.9-6.9-3.4-7.5-7-.2-1.2.7-2.5 2-2.4Z" /></> :
      <><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></>}
  </svg>;
}
