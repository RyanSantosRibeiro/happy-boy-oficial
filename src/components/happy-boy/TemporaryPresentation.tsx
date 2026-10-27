import { WholesaleLink } from "./WholesaleLink";
import { ComingSoonFilm } from "./ComingSoonFilm";

export function TemporaryPresentation() {
  return <section className="temporary-presentation" aria-labelledby="presentation-title"><div><p className="wholesale-kicker">Happy Boy / Por perto</p><h2 id="presentation-title">Conheça de perto.<br />Converse sobre<br /><em>novos caminhos.</em></h2><p>Uma apresentação da marca para quem quer construir uma parceria com a Happy Boy.</p><WholesaleLink>Fale com nosso time comercial</WholesaleLink></div><ComingSoonFilm label="Filme institucional Happy Boy" /></section>;
}
