// import { HeroBanner } from "@/components/happy-boy/HeroBanner";
import { CampaignHero } from "@/components/happy-boy/CampaignHero";
import { EditorialVideoCarousel } from "@/components/happy-boy/EditorialVideoCarousel";
import { CollectionGrid } from "@/components/happy-boy/CollectionGrid";
import { AboutSection } from "@/components/happy-boy/AboutSection";
import { Footer } from "@/components/happy-boy/Footer";
import { WhatsAppButton } from "@/components/happy-boy/WhatsAppButton";
import "@/components/happy-boy/campaign.css";
import "@/components/happy-boy/editorial.css";
import "@/components/happy-boy/collection.css";
import "@/components/happy-boy/editorial-video-carousel.css";
import "@/components/happy-boy/storefront.css";
import "@/components/happy-boy/post-collection.css";

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Pular para o conteúdo</a>
    <main id="main">
      {/* <HeroBanner /> */}
      <CampaignHero />
      <EditorialVideoCarousel />
      <CollectionGrid />
      <AboutSection />
    </main>
    <Footer campaignClosing />
    <WhatsAppButton />
  </>;
}
