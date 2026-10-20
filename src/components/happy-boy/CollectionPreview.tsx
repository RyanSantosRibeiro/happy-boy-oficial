"use client";

import { useSyncExternalStore } from "react";
import { previewCountdown } from "@/lib/preview-countdown";
import { SiteImage } from "./SiteImage";
import "./collection-preview.css";

const subscribe = (update: () => void) => { const timer = window.setInterval(update, 1000); return () => window.clearInterval(timer); };
const readClock = () => Math.floor(Date.now() / 1000);
const serverClock = () => 0;

export function CollectionPreview({ title, description, image, releaseAt }: { title: string; description: string; image: { src: string; alt: string }; releaseAt: string }) {
  const clock = useSyncExternalStore(subscribe, readClock, serverClock);
  const remaining = clock ? previewCountdown(releaseAt, clock * 1000) : null;
  const date = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "America/Sao_Paulo" }).format(new Date(releaseAt));
  return <article className="collection-preview">
    <div className="collection-preview__image">
      <SiteImage src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 90vw, 280px" />
      <span className="collection-preview__lock"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" /></svg><span>Prévia</span></span>
      <span className="collection-preview__placeholder">Imagem ilustrativa</span>
    </div>
    <div className="collection-preview__copy">
      <p className="collection-preview__kicker">Happy Boy / Em breve</p>
      <h2>{title}</h2><p className="collection-preview__description">{description}</p>
      <p className="collection-preview__date"><time dateTime={releaseAt}>{date}</time><span>Horário de Brasília</span></p>
      <div className="collection-preview__timer" role="timer" aria-label={`Contagem regressiva para ${date}`} aria-live="off">
        {([['days', 'Dias'], ['hours', 'Horas'], ['minutes', 'Minutos'], ['seconds', 'Segundos']] as const).map(([key, label]) => <span key={key}><strong>{remaining ? String(remaining[key]).padStart(2, "0") : "--"}</strong><small>{label}</small></span>)}
      </div>
      {remaining?.finished && <p className="collection-preview__status">Aguarde a divulgação da prévia por aqui.</p>}
    </div>
  </article>;
}
