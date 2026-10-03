import Image from "next/image";

export function SeaSkyOpening() {
  return (
    <section className="sea-sky-opening" data-sea-sky-opening aria-labelledby="sea-sky-opening-title">
      <div className="sea-sky-opening__content">
        <div className="sea-sky-opening__brand">
          <Image src="/images/happy-boy-logo-black.png" alt="Happy Boy" width={140} height={30} priority />
        </div>
        <h2 className="sea-sky-opening__title" id="sea-sky-opening-title">
          <span className="sea-sky-opening__signature" role="img" aria-label="Sea Sky" />
        </h2>
        <div className="sea-sky-opening__foot">
          <p className="sea-sky-opening__caption">Entre o mar e o céu,<br />um novo horizonte ganha forma.</p>
          <p className="sea-sky-opening__index" aria-label="Peça um de cinco">01 / 05</p>
        </div>
      </div>
    </section>
  );
}
