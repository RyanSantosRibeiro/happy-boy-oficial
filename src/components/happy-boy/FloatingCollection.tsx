import Image from "next/image";

const pieces = [
  {
    id: "camiseta-marrom",
    number: "01",
    name: "Camiseta marrom",
    note: "Leveza, litoral, formas limpas",
    piece: "/images/pieces/camiseta-marrom.png",
    reference: "/images/sea-sky-reference-02.jpg",
    referenceAlt: "Arquitetura clara e luz solar, inspiração da camiseta marrom.",
    position: "50% 28%",
  },
  {
    id: "polo-terracota",
    number: "02",
    name: "Polo terracota",
    note: "Calor, horizonte, presença sutil",
    piece: "/images/pieces/polo-terracota.png",
    reference: "/images/sea-sky-reference-02.jpg",
    referenceAlt: "Polo terracota em cenário mediterrâneo claro.",
    position: "50% 54%",
  },
  {
    id: "polo-trico-creme",
    number: "03",
    name: "Polo de tricô creme",
    note: "Textura, sofisticação, verão",
    piece: "/images/pieces/polo-trico-creme.png",
    reference: "/images/sea-sky-reference-01.jpg",
    referenceAlt: "Tons de areia, sombras de palmeira e arquitetura branca.",
    position: "50% 29%",
  },
  {
    id: "calca-creme",
    number: "04",
    name: "Calça creme",
    note: "Movimento, luz, naturalidade",
    piece: "/images/pieces/calca-creme.png",
    reference: "/images/sea-sky-reference-01.jpg",
    referenceAlt: "Calça clara em composição solar junto a uma escadaria.",
    position: "50% 77%",
  },
];

export function FloatingCollection() {
  return (
    <section className="floating-collection" id="collection" aria-labelledby="collection-title">
      <span id="shop" className="floating-collection__anchor" aria-hidden="true" />
      <span id="about" className="floating-collection__anchor" aria-hidden="true" />
      <header className="floating-collection__intro">
        <p className="eyebrow"><span aria-hidden="true" /> SEA SKY / 2026</p>
        <h2 id="collection-title">Peças para<br />dias sem pressa.</h2>
        <p>Uma seleção guiada pela luz, pelo toque e pela simplicidade das formas.</p>
      </header>

      <div className="floating-collection__pieces" id="looks">
        {pieces.map((piece, index) => (
          <article className="floating-piece" id={`piece-${piece.id}`} key={piece.id}>
            <div className="floating-piece__product">
              <span className="floating-piece__index" aria-hidden="true">{piece.number}</span>
              <Image
                src={piece.piece}
                alt={`${piece.name} isolada em composição flutuante.`}
                fill
                sizes="(max-width: 760px) 92vw, 48vw"
                className="floating-piece__product-image"
              />
            </div>

            <div className="floating-piece__story">
              <figure className="floating-piece__reference">
                <Image
                  src={piece.reference}
                  alt={piece.referenceAlt}
                  fill
                  sizes="(max-width: 760px) 74vw, 34vw"
                  style={{ objectPosition: piece.position }}
                />
                <figcaption className="eyebrow">Referência / 0{index + 1}</figcaption>
              </figure>
              <div className="floating-piece__copy">
                <p className="eyebrow">Happy Boy / Essencial {piece.number}</p>
                <h3>{piece.name}</h3>
                <p>Inspiração: {piece.note}</p>
                <a href="#top">Ver peça <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
