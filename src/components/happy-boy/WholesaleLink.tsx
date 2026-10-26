import type { ReactNode } from "react";
import { contactHref, type ContactIntent } from "@/lib/commercial-lead";

export function EditorialArrow({ down = false }: { down?: boolean }) {
  return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={down ? "M12 4v16m-6-6 6 6 6-6" : "M5 19 19 5M5 5h14v14"} /></svg>;
}
/** Native hash navigation also works from gallery pages and without JavaScript. */
export function WholesaleLink({ children, intent = "atacado", operationVisit = false, className = "" }: { children: ReactNode; intent?: ContactIntent; operationVisit?: boolean; className?: string }) {
  return <a className={`wholesale-link ${className}`} href={contactHref(intent, operationVisit)}>{children}<EditorialArrow /></a>;
}
