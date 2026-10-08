import { getWhatsAppHref } from "@/data/storefront";
import { productConsultationMessage } from "@/lib/product-consultation";
import "./product-consultation.css";

export function ProductConsultationButton({ name, color, message }: { name: string; color?: string; message?: string }) {
  const href = getWhatsAppHref(message ?? productConsultationMessage(name, color));
  if (!href) return null;

  return <a className="product-consultation" href={href} target="_blank" rel="noopener noreferrer"
    aria-label="Consultar pelo WhatsApp — abre em nova aba">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20l1.2-4.6a8.5 8.5 0 1 1 16.3-3.9Z" />
      <path d="m8.2 7.2 1.4 2.6-.9 1c.9 1.7 1.8 2.6 3.7 3.4l.9-1 2.7 1.4c.2 1.8-1.3 2.2-2.3 2-4.3-.9-6.9-3.4-7.5-7-.2-1.2.7-2.5 2-2.4Z" strokeLinejoin="round" />
    </svg>
    <span>Consultar pelo WhatsApp</span>
  </a>;
}
