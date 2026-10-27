"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { brazilianStates } from "@/data/wholesale-landing";
import { businessProfiles, commercialLeadHref, commercialLeadMessage, contactIntents, contactSelection, validateCommercialLead, type CommercialLead, type ContactIntent, type LeadErrors } from "@/lib/commercial-lead";
import { EditorialArrow } from "./WholesaleLink";
import { commercialContact } from "@/data/commercial";
import { whatsappHref } from "@/lib/wholesale";

const emptyLead: CommercialLead = { intent: "atacado", name: "", business: "", phone: "", city: "", state: "", profile: "", address: "", preference: "", notes: "", operationVisit: false };

export function CommercialLeadForm() {
  const [lead, setLead] = useState<CommercialLead>(emptyLead);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [prepared, setPrepared] = useState<{ href: string; message: string } | null>(null);
  const review = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const sync = () => {
      const selection = contactSelection(window.location.hash);
      if (selection) { setLead(current => ({ ...current, ...selection })); setErrors({}); setPrepared(null); }
    };
    const frame = requestAnimationFrame(sync);
    window.addEventListener("hashchange", sync);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("hashchange", sync); };
  }, []);
  const update = (field: keyof CommercialLead, value: string) => {
    setLead(current => ({ ...current, [field]: value, ...(field === "intent" ? { operationVisit: false } : {}) }));
    setErrors(current => field === "intent" ? {} : ({ ...current, [field]: undefined }));
    setPrepared(null);
    if (field === "intent") window.history.replaceState(null, "", `#atendimento-${value}`);
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const href = commercialLeadHref(lead);
    if (!href) {
      // Pure validation does not transmit or persist personal information.
      setErrors(validateCommercialLead(lead));
      requestAnimationFrame(() => form.current?.querySelector<HTMLElement>("[aria-invalid=true]")?.focus());
      return;
    }
    setErrors({});
    setPrepared({ href, message: commercialLeadMessage(lead) });
    requestAnimationFrame(() => { review.current?.focus(); review.current?.scrollIntoView({ block: "nearest", behavior: "smooth" }); });
  };
  const fieldError = (field: keyof CommercialLead) => errors[field] ? <small className="lead-form__error" id={`lead-${field}-error`}>{errors[field]}</small> : null;
  const invalidProps = (field: keyof CommercialLead) => ({ "aria-invalid": errors[field] ? true as const : undefined, "aria-describedby": errors[field] ? `lead-${field}-error` : undefined });
  const storeVisit = lead.intent === "lojas";
  return <section className="wholesale-conversion wholesale-section" id="atendimento" aria-labelledby="lead-heading">
    {(["atacado", "representante", "showroom", "lojas", "operacao"] as const).map(id => <span className="lead-form__anchor" id={`atendimento-${id}`} key={id} aria-hidden="true" />)}
    <header><p className="wholesale-kicker">07 / Vamos conversar</p><h2 id="lead-heading">Sua próxima parceria comercial pode começar aqui.</h2><p>Conte para nós um pouco sobre sua loja. Nossa equipe vai direcionar você para o atendimento mais adequado ao seu negócio.</p><span className="wholesale-conversion__signature">Happy Boy <i /> Fabricante de moda masculina</span></header>
    <noscript><style>{".lead-form { display: none; }"}</style><p>Ative o JavaScript para usar o formulário ou <a href={whatsappHref(commercialContact.generalMessage) ?? "#lojas"}>converse diretamente pelo WhatsApp</a>.</p></noscript>
    <form className="lead-form" ref={form} onSubmit={submit} noValidate aria-label="Formulário de atendimento comercial">
      <fieldset className="lead-form__intents"><legend>Qual atendimento você procura?</legend><div>{(Object.entries(contactIntents) as [ContactIntent, typeof contactIntents[ContactIntent]][]).map(([id,intent]) => <label key={id} data-selected={lead.intent === id}><input type="radio" name="intent" value={id} checked={lead.intent===id} onChange={() => update("intent",id)} /><span>{intent.title}</span></label>)}</div></fieldset>
      <p className="lead-form__mode" aria-live="polite">{lead.operationVisit ? "Visita para conhecer a operação. O dia e o horário serão confirmados pela equipe." : contactIntents[lead.intent].help}</p>
      {storeVisit && <a href="#lojas" className="wholesale-link lead-form__stores">Ver endereços e mapas<EditorialArrow down /></a>}
      <div className="lead-form__fields">
        <label>Seu nome <span aria-hidden="true">*</span><input id="lead-name" name="name" autoComplete="name" maxLength={100} required value={lead.name} onChange={e=>update("name",e.target.value)} {...invalidProps("name")} />{fieldError("name")}</label>
        <label>WhatsApp com DDD <span aria-hidden="true">*</span><input id="lead-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={25} placeholder="(85) 99999-9999" required value={lead.phone} onChange={e=>update("phone",e.target.value)} {...invalidProps("phone")} />{fieldError("phone")}</label>
        {!storeVisit && <>
          <label className="lead-form__wide">Qual é a situação da sua loja? <span aria-hidden="true">*</span><select id="lead-profile" name="profile" required value={lead.profile} onChange={e=>update("profile",e.target.value)} {...invalidProps("profile")}><option value="">Selecione uma opção</option>{businessProfiles.map(p=><option key={p}>{p}</option>)}</select>{fieldError("profile")}</label>
          <label className="lead-form__wide">Nome da loja {lead.profile === "Já tenho loja" ? <span aria-hidden="true">*</span> : <small>Opcional se você ainda está começando</small>}<input id="lead-business" name="business" autoComplete="organization" maxLength={120} required={lead.profile === "Já tenho loja"} value={lead.business} onChange={e=>update("business",e.target.value)} {...invalidProps("business")} />{fieldError("business")}</label>
          <label>Cidade <span aria-hidden="true">*</span><input id="lead-city" name="city" autoComplete="address-level2" maxLength={100} required value={lead.city} onChange={e=>update("city",e.target.value)} {...invalidProps("city")} />{fieldError("city")}</label>
          <label>Estado <span aria-hidden="true">*</span><select id="lead-state" name="state" autoComplete="address-level1" required value={lead.state} onChange={e=>update("state",e.target.value)} {...invalidProps("state")}><option value="">Selecione</option>{brazilianStates.map(uf=><option key={uf}>{uf}</option>)}</select>{fieldError("state")}</label>
        </>}
        {lead.intent === "representante" && <label className="lead-form__wide">Bairro ou endereço da loja <span aria-hidden="true">*</span><input id="lead-address" name="address" autoComplete="street-address" maxLength={200} required value={lead.address} onChange={e=>update("address",e.target.value)} {...invalidProps("address")} />{fieldError("address")}</label>}
        {lead.intent === "showroom" && <label className="lead-form__wide">Dia ou período de preferência <span aria-hidden="true">*</span><input id="lead-preference" name="preference" maxLength={120} placeholder="Ex.: próxima semana, pela manhã" required value={lead.preference} onChange={e=>update("preference",e.target.value)} {...invalidProps("preference")} /><small>É uma preferência. O agendamento depende de confirmação.</small>{fieldError("preference")}</label>}
        <label className="lead-form__wide">Observações <small>Opcional</small><textarea name="notes" rows={3} maxLength={600} value={lead.notes} onChange={e=>update("notes",e.target.value)} {...invalidProps("notes")} />{fieldError("notes")}</label>
      </div>
      {Object.values(errors).some(Boolean) && <p className="lead-form__error" role="alert">Confira os campos indicados para continuar.</p>}
      <button className="lead-form__submit" type="submit">Continuar pelo WhatsApp<EditorialArrow /></button>
      <p className="lead-form__privacy">Seus dados ficam apenas nesta página. Ao abrir o WhatsApp, você escolhe enviá-los à equipe Happy Boy para este atendimento. Nada é enviado automaticamente.</p>
      {prepared && <div className="lead-form__review" ref={review} tabIndex={-1} aria-labelledby="review-heading"><h3 id="review-heading">Revise antes de abrir o WhatsApp</h3><p>Sua solicitação ainda não foi enviada. Confira as informações e confirme o envio no aplicativo.</p><pre>{prepared.message}</pre><a href={prepared.href} target="_blank" rel="noopener noreferrer">Abrir WhatsApp com estas informações<EditorialArrow /></a></div>}
    </form>
  </section>;
}
