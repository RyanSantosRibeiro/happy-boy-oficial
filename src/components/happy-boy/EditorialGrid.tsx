import Image from "next/image";
import { collectionLooks } from "@/data/sea-sky";

export function EditorialGrid() {
  return (
    <section className="editorial-grid" id="looks" aria-labelledby="looks-title">
      <div className="editorial-grid__heading">
        <h2 id="looks-title">O olhar se demora.</h2>
        <p className="eyebrow">SEA SKY / Índice de looks</p>
      </div>
      <div className="editorial-grid__items">
        {collectionLooks.map((look, index) => (
          <article className={`editorial-look editorial-look--${index + 1}`} id={`piece-${look.id}`} key={look.id} aria-labelledby={`title-${look.id}`}>
            <div className="editorial-look__image">
              {look.image ? <Image
                src={look.image}
                alt={look.imageAlt}
                fill
                sizes={index === 4 ? "(max-width: 700px) 88vw, 48vw" : "(max-width: 700px) 88vw, (max-width: 1100px) 46vw, 50vw"}
                style={{ objectPosition: look.objectPositionDesktop }}
              /> : <span className="image-placeholder">Imagem do look {look.number}</span>}
              <span className="editorial-look__number" aria-hidden="true">{look.number}</span>
            </div>
            <div className="editorial-look__caption">
              <div className="editorial-look__heading">
                <p className="eyebrow">Look {look.number}</p>
                <h3 id={`title-${look.id}`}>{look.name}</h3>
                {look.price ? <p className="editorial-look__price">{look.price}</p> : null}
                {look.placeholder && <p className="editorial-look__status">Estudo de look · conteúdo provisório</p>}
              </div>
              <details className="editorial-look__details">
                <summary>Detalhes do look <span aria-hidden="true">+</span></summary>
                <div className="editorial-look__details-content">
                  <p>{look.description}</p>
                  <ul>{look.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                  {look.href && <a className="editorial-link" href={look.href}>Ver peça <span aria-hidden="true">↗</span></a>}
                </div>
              </details>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
