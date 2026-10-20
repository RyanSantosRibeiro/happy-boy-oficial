// import { HeroBanner } from "@/components/happy-boy/HeroBanner";
import { CampaignHero } from "@/components/happy-boy/CampaignHero";
import { EditorialVideoCarousel } from "@/components/happy-boy/EditorialVideoCarousel";
import { CollectionGrid } from "@/components/happy-boy/CollectionGrid";
import { AboutSection } from "@/components/happy-boy/AboutSection";
import { Footer } from "@/components/happy-boy/Footer";
import { WeeklyLaunches } from "@/components/happy-boy/WeeklyLaunches";
import { getFeaturedCollection } from "@/data/catalog";
import "@/components/happy-boy/campaign.css";
import "@/components/happy-boy/editorial.css";
import "@/components/happy-boy/collection.css";
import "@/components/happy-boy/editorial-video-carousel.css";
import "@/components/happy-boy/storefront.css";
import "@/components/happy-boy/post-collection.css";
import "@/components/happy-boy/mobile-editorial.css";

export default function Home() {
  const collection = getFeaturedCollection();
  return <>
    <a className="skip-link" href="#main">Pular para o conteúdo</a>
    <main id="main" className="happy-boy-home">
      {/* <HeroBanner /> */}
      <CampaignHero hero={collection.presentation.hero} />
      <EditorialVideoCarousel collection={collection} beforeVideos={<WeeklyLaunches collectionId={collection.id} />} />
      <CollectionGrid collection={collection} />
      <AboutSection photo={collection.presentation.aboutPhoto} />
    </main>
    <Footer campaignClosing />
  </>;
}
