/** An expectation panel, never an empty or misleading play control. */
export function ComingSoonFilm({ label, video }: { label: string; video?: { src: string; poster?: string } | null }) {
  return <div className="coming-soon-film" aria-label={label}>{video ? <video src={video.src} poster={video.poster} controls playsInline preload="none" aria-label={label} /> : <><div className="coming-soon-film__texture" aria-hidden="true" /><span>EM BREVE</span><small>{label}</small></>}</div>;
}
