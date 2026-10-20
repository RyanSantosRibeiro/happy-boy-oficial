"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { commercialContact, thirdCommercialAction } from "@/data/commercial";
import { catalogRequestMessage, whatsappHref } from "@/lib/wholesale";
import { CommercialActionIcon } from "./CommercialActionIcon";
import "./whatsapp-contact.css";

const ContactContext = createContext<{ open: boolean; show: (trigger: HTMLButtonElement) => void } | null>(null);

/** One accessible contact panel shared by the hero and the persistent site button. */
export function WhatsAppProvider({ children, collectionName }: { children: ReactNode; collectionName: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLButtonElement | null>(null);
  const firstAction = useRef<HTMLAnchorElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => { dialog.current?.close(); }, [pathname]);

  const show = (trigger: HTMLButtonElement) => {
    returnFocus.current = trigger;
    dialog.current?.showModal();
    setOpen(true);
    firstAction.current?.focus({ preventScroll: true });
  };
  const close = () => dialog.current?.close();
  const catalog = whatsappHref(catalogRequestMessage(collectionName));
  const seller = whatsappHref(commercialContact.sellerMessage);
  const visit = thirdCommercialAction.enabled ? whatsappHref(thirdCommercialAction.message, thirdCommercialAction.destination) : null;

  return <ContactContext.Provider value={{ open, show }}>
    {children}
    <button type="button" className="whatsapp-contact-trigger" onClick={event => show(event.currentTarget)} aria-haspopup="dialog" aria-expanded={open} aria-controls="whatsapp-contact-panel">
      <CommercialActionIcon kind="whatsapp" />
      <span><strong>Fale pelo WhatsApp</strong><small>Clique para ver as opções</small></span>
    </button>
    <dialog id="whatsapp-contact-panel" className="whatsapp-contact-panel" ref={dialog} aria-labelledby="whatsapp-contact-title" aria-describedby="whatsapp-contact-help" onClose={() => {
      setOpen(false);
      if (returnFocus.current?.isConnected) returnFocus.current.focus({ preventScroll: true });
    }} onClick={event => {
      if (event.target !== event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
    }}>
      <header className="whatsapp-contact-panel__header">
        <p>Happy Boy / Atendimento a lojistas</p>
        <button type="button" className="whatsapp-contact-panel__close" onClick={close} aria-label="Fechar atendimento"><span>Fechar</span><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" /></svg></button>
        <h2 id="whatsapp-contact-title">Como podemos ajudar?</h2>
        <p id="whatsapp-contact-help">Escolha uma opção abaixo. Você será levado ao WhatsApp com uma mensagem pronta.</p>
      </header>
      <nav className="whatsapp-contact-panel__options" aria-label="Opções de atendimento pelo WhatsApp">
        {catalog && <a href={catalog} target="_blank" rel="noopener noreferrer" ref={firstAction} aria-label="Ver catálogo — abre no WhatsApp">
          <CommercialActionIcon kind="line" /><span><strong>Ver catálogo</strong><small>Receba o catálogo da nova coleção.</small></span><span className="whatsapp-contact-panel__arrow" aria-hidden="true">↗</span>
        </a>}
        {seller && <a href={seller} target="_blank" rel="noopener noreferrer" aria-label="Falar com o vendedor — abre no WhatsApp">
          <CommercialActionIcon kind="seller" /><span><strong>Falar com o vendedor</strong><small>Tire dúvidas sobre compras no atacado.</small></span><span className="whatsapp-contact-panel__arrow" aria-hidden="true">↗</span>
        </a>}
        {visit && <a href={visit} target="_blank" rel="noopener noreferrer" aria-label={`${thirdCommercialAction.title} — abre no WhatsApp`}>
          <CommercialActionIcon kind="visit" /><span><strong>{thirdCommercialAction.title}</strong><small>Converse com a equipe para agendar.</small></span><span className="whatsapp-contact-panel__arrow" aria-hidden="true">↗</span>
        </a>}
      </nav>
      <p className="whatsapp-contact-panel__note"><CommercialActionIcon kind="whatsapp" /> O WhatsApp abre em outra aba ou no aplicativo.</p>
    </dialog>
  </ContactContext.Provider>;
}

export function WhatsAppHeroContact() {
  const contact = useContext(ContactContext);
  if (!contact) return null;
  return <aside className="campaign-hero__contact campaign-hero__reveal" aria-label="Atendimento para lojistas">
    <button type="button" onClick={event => contact.show(event.currentTarget)} aria-haspopup="dialog" aria-expanded={contact.open} aria-controls="whatsapp-contact-panel">
      <CommercialActionIcon kind="whatsapp" /><span>Fale pelo WhatsApp<small>Clique para ver as opções</small></span>
    </button>
  </aside>;
}
