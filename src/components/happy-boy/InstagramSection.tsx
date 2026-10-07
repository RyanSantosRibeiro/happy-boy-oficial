import { brand } from "@/data/sea-sky";
import { storefront } from "@/data/storefront";
import { SiteImage } from "./SiteImage";

export function InstagramSection() {
  return <section className="instagram-section" id="instagram" aria-labelledby="instagram-title">
    <div className="instagram-section__heading"><h2 id="instagram-title">Happy Boy, por perto.</h2><a href={brand.instagram} target="_blank" rel="noopener noreferrer">@happyboyoficial <span aria-hidden="true">↗</span><span className="sr-only"> — abre em nova aba</span></a></div>
    <div className="instagram-section__photos">
      {storefront.instagramPhotos.map((photo, index) => <a key={photo.id} href={photo.href} target="_blank" rel="noopener noreferrer" aria-label={`Ver Happy Boy no Instagram — foto ${index + 1}, abre em nova aba`}>
        <SiteImage src={photo.src} alt={photo.alt} width={600} height={750} sizes="(max-width: 760px) 65vw, 20vw" unoptimized />
        <span aria-hidden="true">↗</span>
      </a>)}
    </div>
    <p className="instagram-section__note">Imagens de referência. Acompanhe a coleção e os bastidores no nosso perfil.</p>
  </section>;
}
