"use client";

import { useEffect, useRef, useState } from "react";
import { physicalStores, storeMapHref } from "@/data/wholesale-landing";
import { EditorialArrow, WholesaleLink } from "./WholesaleLink";

function StoreMap({ store }: { store: typeof physicalStores[number] }) {
  const root = useRef<HTMLDivElement>(null);
  const [visible,setVisible] = useState(false);
  const [loaded,setLoaded] = useState(false);
  const [failed,setFailed] = useState(false);
  useEffect(()=>{ const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setVisible(true);observer.disconnect();}},{rootMargin:"250px"}); if(root.current)observer.observe(root.current); return()=>observer.disconnect(); },[]);
  useEffect(()=>{if(!visible||loaded||failed)return;const timer=setTimeout(()=>setFailed(true),15000);return()=>clearTimeout(timer);},[visible,loaded,failed]);
  return <div className="wholesale-stores__map" ref={root}>
    {!loaded && <div className="store-map-fallback"><span>{store.name}</span><small>{failed ? "O mapa não pôde ser exibido. Abra a localização no Google Maps abaixo." : "Google Maps / Localização da unidade"}</small><a href={storeMapHref(store.query)} target="_blank" rel="noopener noreferrer">Abrir localização<EditorialArrow /></a></div>}
    {visible && !failed && <iframe title={`Mapa de ${store.name}`} src={`https://www.google.com/maps?q=${encodeURIComponent(store.query)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen onLoad={()=>setLoaded(true)} onError={()=>setFailed(true)} style={{opacity:loaded?1:0,pointerEvents:loaded?"auto":"none"}} />}
  </div>;
}
export function PhysicalStores() {
  return <section className="wholesale-stores wholesale-section" id="lojas" aria-labelledby="stores-heading">
    <header><p className="wholesale-kicker">Happy Boy / Fortaleza — CE</p><h2 id="stores-heading">Encontre a Happy Boy.</h2><p>Nossas unidades físicas. Escolha o endereço e planeje sua visita.</p></header>
    <div className="wholesale-stores__grid">{physicalStores.map((store,index) => <article key={store.id}>
      <StoreMap store={store} />
      <div className="wholesale-stores__info"><span className="wholesale-kicker">Unidade / 0{index+1}</span><h3>{store.name}</h3><address>{store.address}</address><a href={storeMapHref(store.query)} target="_blank" rel="noopener noreferrer">Ver no Google Maps<EditorialArrow /></a></div>
    </article>)}</div>
    <WholesaleLink intent="lojas">Quero informações sobre as lojas</WholesaleLink>
  </section>;
}
