// import { HeroBanner } from "@/components/happy-boy/HeroBanner";
import { CampaignHero } from "@/components/happy-boy/CampaignHero";
import { EditorialVideoCarousel } from "@/components/happy-boy/EditorialVideoCarousel";
import { CollectionGrid } from "@/components/happy-boy/CollectionGrid";
import { ProductShowcase } from "@/components/happy-boy/ProductShowcase";
import { InstagramSection } from "@/components/happy-boy/InstagramSection";
import { AboutSection } from "@/components/happy-boy/AboutSection";
import { WhatsAppButton } from "@/components/happy-boy/WhatsAppButton";
import { Footer } from "@/components/happy-boy/Footer";
import { storefront } from "@/data/storefront";
import "@/components/happy-boy/campaign.css";
import "@/components/happy-boy/editorial.css";
import "@/components/happy-boy/collection.css";
import "@/components/happy-boy/editorial-video-carousel.css";
import "@/components/happy-boy/storefront.css";

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Pular para o conteúdo</a>
    <main id="main">
      {/* <HeroBanner /> */}
      <CampaignHero />
      <EditorialVideoCarousel />
      <ProductShowcase {...storefront.showcases[0]} />
      <CollectionGrid />
      <ProductShowcase {...storefront.showcases[1]} />
      <InstagramSection />
      <AboutSection />
    </main>
    <Footer />
    <WhatsAppButton />
  </>;
}
