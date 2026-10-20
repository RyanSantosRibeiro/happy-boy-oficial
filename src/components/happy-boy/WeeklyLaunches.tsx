import Link from "next/link";
import { getWeeklyLaunches } from "@/data/weekly-launches";
import { SiteImage } from "./SiteImage";
import "./catalog.css";
import { CollectionPreview } from "./CollectionPreview";

export function WeeklyLaunches({ collectionId }: { collectionId: string }) {
  const entries = getWeeklyLaunches(collectionId);
  if (!entries.length) return null;
  return <section className="weekly-launches" aria-label="Novidades da Happy Boy">
    {entries.map(entry => entry.mode === "preview" && entry.releaseAt && entry.media?.type === "image" ? <CollectionPreview key={entry.id} title={entry.title} description={entry.description} image={entry.media} releaseAt={entry.releaseAt} /> : <article className="weekly-launch" key={entry.id}>
      {entry.media && <div className="weekly-launch__media">{entry.media.type === "video" ?
        <video src={entry.media.src} poster={entry.media.poster} controls playsInline preload="none" aria-label={entry.media.alt} /> :
        <SiteImage src={entry.media.src} alt={entry.media.alt} fill sizes="(max-width: 700px) 90vw, 220px" />}</div>}
      <div><p className="catalog-kicker">{entry.mode === "preview" ? "Prévia do próximo lançamento" : "Lançamentos da semana"}</p><h2>{entry.title}</h2><p>{entry.description}</p>{entry.href && entry.linkLabel && <Link href={entry.href}>{entry.linkLabel} <span aria-hidden="true">↗</span></Link>}</div>
    </article>)}
  </section>;
}
