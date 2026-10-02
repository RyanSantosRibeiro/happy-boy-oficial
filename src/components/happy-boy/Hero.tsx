import Image from "next/image";
import { campaign } from "@/data/sea-sky";

export function Hero() {
  return <section className="hero" id="top" aria-labelledby="hero-title">
    <div className="hero-media">{campaign.poster && <Image src={campaign.poster} alt="Referência visual SEA SKY: polo em tom areia, calça branca e arquitetura iluminada pelo sol." fill preload sizes="(max-width: 760px) 100vw, 66vw" />}</div>
    <div className="hero-topline"><span className="eyebrow">Happy Boy<br />Coleção 2026</span><span className="eyebrow">Um novo<br />ponto de vista.</span></div>
    <h1 id="hero-title" className="hero-title" aria-label="SEA SKY"><span>SEA</span><span>SKY</span></h1>
    <div className="hero-caption"><span className="eyebrow">Luz. Forma. Movimento.</span><span>Uma prévia do próximo capítulo.</span></div>
    <div className="hero-bottom"><a href="#experience" className="explore-link"><span className="explore-icon" aria-hidden="true">↓</span><span>Explore com o scroll</span></a><span className="hero-preview">Prévia editorial <span aria-hidden="true">/</span> imagens de referência</span><a href="#looks" className="hero-index">05 looks <span aria-hidden="true">↗</span></a></div>
  </section>;
}
