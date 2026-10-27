// import { HeroBanner } from "@/components/happy-boy/HeroBanner";
import { CampaignHero } from "@/components/happy-boy/CampaignHero";
import { EditorialVideoCarousel } from "@/components/happy-boy/EditorialVideoCarousel";
import { CollectionLookGallery } from "@/components/happy-boy/CollectionLookGallery";
import { AboutSection } from "@/components/happy-boy/AboutSection";
import { Footer } from "@/components/happy-boy/Footer";
import { WeeklyLaunches } from "@/components/happy-boy/WeeklyLaunches";
import { OperationSection, WholesaleServiceSection } from "@/components/happy-boy/WholesaleSections";
import { CommercialLeadForm } from "@/components/happy-boy/CommercialLeadForm";
import { PhysicalStores } from "@/components/happy-boy/PhysicalStores";
import { getFeaturedCollection } from "@/data/catalog";
import { CollectionMarquee } from "@/components/happy-boy/CollectionMarquee";
import { TemporaryPresentation } from "@/components/happy-boy/TemporaryPresentation";
import "@/components/happy-boy/campaign.css";
import "@/components/happy-boy/editorial.css";
import "@/components/happy-boy/collection.css";
import "@/components/happy-boy/editorial-video-carousel.css";
import "@/components/happy-boy/storefront.css";
import "@/components/happy-boy/post-collection.css";
import "@/components/happy-boy/mobile-editorial.css";
import "@/components/happy-boy/wholesale-landing.css";
import "@/components/happy-boy/premium-refinement.css";

export default function Home() {
  const collection = getFeaturedCollection();
  return <>
    <a className="skip-link" href="#main">Pular para o conteúdo</a>
    <main id="main" className="happy-boy-home wholesale-home premium-home">
      {/* <HeroBanner /> */}
      <CampaignHero hero={collection.presentation.hero} commercial />
      <CollectionMarquee collection={collection} />
      <TemporaryPresentation />
      <WeeklyLaunches collectionId={collection.id} />
      <section className="current-collection" id="collection" aria-labelledby="current-collection-title">
        <span className="campaign-look-gallery__alias" id="colecao-atual" aria-hidden="true" />
        <header className="campaign-collection-heading"><p className="wholesale-kicker">01 / {collection.name}</p><h2 id="current-collection-title">Coleção {collection.name}</h2></header>
        <CollectionLookGallery collection={collection} />
        <EditorialVideoCarousel collection={collection} showMarquee={false} editorialHeading={{ kicker: "", title: "Conjunto Dry Fit" }} headingLevel={3} />
      </section>
      <AboutSection photo={collection.presentation.aboutPhoto} wholesale />
      <OperationSection />
      <WholesaleServiceSection />
      <CommercialLeadForm />
      <PhysicalStores />
    </main>
    <Footer campaignClosing />
  </>;
}
