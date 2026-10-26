import { commercialContact, commercialFamilies, thirdCommercialAction, type CommercialFamilyId } from "@/data/commercial";
import { lineConsultationMessage, whatsappHref } from "@/lib/wholesale";
import { CommercialActionIcon as ActionIcon } from "./CommercialActionIcon";
import { contactHref } from "@/lib/commercial-lead";
import "./commercial-actions.css";

export function CommercialActions({ familyId, collectionName }: { familyId: CommercialFamilyId; collectionName?: string }) {
  const line = whatsappHref(lineConsultationMessage(familyId, collectionName));
  const seller = whatsappHref(commercialContact.sellerMessage);
  const third = thirdCommercialAction;
  const thirdHref = third.enabled ? whatsappHref(third.message, third.destination) : null;
  return <section className="commercial-actions" aria-label="Atendimento comercial de atacado">
    <p className="commercial-actions__context">Atendimento a lojistas <span aria-hidden="true">/</span> {commercialFamilies[familyId].name}</p>
    <p className="commercial-actions__help">Catálogo e vendedor abrem no WhatsApp com a mensagem pronta. Para uma visita, preencha o formulário comercial.</p>
    <div className="commercial-actions__grid">
      {line && <a href={line} target="_blank" rel="noopener noreferrer" aria-label="Ver catálogo — abre no WhatsApp"><ActionIcon kind="line" /><span>Ver catálogo</span><span className="commercial-actions__accent" aria-hidden="true">↗</span></a>}
      {seller && <a href={seller} target="_blank" rel="noopener noreferrer" aria-label="Falar com o vendedor — abre no WhatsApp"><ActionIcon kind="seller" /><span>Falar com o vendedor</span><span className="commercial-actions__accent" aria-hidden="true">↗</span></a>}
      {third.enabled && thirdHref ? <a href={contactHref("representante")} aria-label={`${third.title} — abrir formulário de visita`}><ActionIcon kind="visit" /><span>{third.title}</span><span className="commercial-actions__accent" aria-hidden="true">↗</span></a> :
        <button type="button" disabled aria-label="Terceira ação comercial: a definir, indisponível"><ActionIcon kind="pending" /><span>A definir<small>Indisponível</small></span></button>}
    </div>
  </section>;
}
