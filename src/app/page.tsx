import { Header } from "@/components/happy-boy/Header";
import { HeroBanner } from "@/components/happy-boy/HeroBanner";
import { EditorialVideoCarousel } from "@/components/happy-boy/EditorialVideoCarousel";
import { SeaSkyOpening } from "@/components/happy-boy/SeaSkyOpening";
import { CollectionGrid } from "@/components/happy-boy/CollectionGrid";
import "@/components/happy-boy/campaign.css";
import "@/components/happy-boy/editorial.css";
import "@/components/happy-boy/collection.css";
import "@/components/happy-boy/hero-banner.css";
import "@/components/happy-boy/editorial-video-carousel.css";
import "@/components/happy-boy/sea-sky-opening.css";

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Pular para o conteúdo</a>
    <Header />
    <main id="main">
      <HeroBanner />
      {/* <SeaSkyOpening /> */}
      <EditorialVideoCarousel />
      <CollectionGrid />
    </main>
  </>;
}
