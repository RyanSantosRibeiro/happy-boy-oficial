"use client";

import { useState } from "react";
import { physicalStores, storeMapHref } from "@/data/wholesale-landing";
import { EditorialArrow, WholesaleLink } from "./WholesaleLink";

export function PhysicalStores() {
  const [activeMaps, setActiveMaps] = useState<string[]>([]);
  return <section className="wholesale-stores wholesale-section" id="lojas" aria-labelledby="stores-heading">
    <header><p className="wholesale-kicker">Happy Boy / Fortaleza — CE</p><h2 id="stores-heading">Encontre a Happy Boy.</h2><p>Nossas unidades físicas. Escolha o endereço e planeje sua visita.</p></header>
    <div className="wholesale-stores__grid">{physicalStores.map((store,index) => <article key={store.id}>
      <div className="wholesale-stores__map">{activeMaps.includes(store.id) ? <iframe title={`Mapa de ${store.name}`} src={`https://www.google.com/maps?q=${encodeURIComponent(store.query)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /> : <button type="button" onClick={() => setActiveMaps(current => [...current,store.id])} aria-label={`Carregar mapa de ${store.name}`}><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><path d="M37 19c0 10-13 23-13 23S11 29 11 19a13 13 0 0 1 26 0Z"/><circle cx="24" cy="19" r="5"/></svg><span>Carregar mapa</span><small>Google Maps</small></button>}</div>
      <div className="wholesale-stores__info"><span className="wholesale-kicker">Unidade / 0{index+1}</span><h3>{store.name}</h3><address>{store.address}</address><a href={storeMapHref(store.query)} target="_blank" rel="noopener noreferrer">Ver no Google Maps<EditorialArrow /></a></div>
    </article>)}</div>
    <WholesaleLink intent="lojas">Quero informações sobre as lojas</WholesaleLink>
  </section>;
}
