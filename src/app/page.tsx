import { Header } from "@/components/happy-boy/Header";
import { HeroBanner } from "@/components/happy-boy/HeroBanner";
import { CollectionIntro } from "@/components/happy-boy/CollectionIntro";
import { EditorialGrid } from "@/components/happy-boy/EditorialGrid";
import { CollectionManifesto } from "@/components/happy-boy/CollectionManifesto";
import { ShopCTA } from "@/components/happy-boy/ShopCTA";
import { Footer } from "@/components/happy-boy/Footer";
import "@/components/happy-boy/campaign.css";
import "@/components/happy-boy/editorial.css";
import "@/components/happy-boy/hero-banner.css";

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Pular para o conteúdo</a>
    <Header />
    <main id="main">
      <HeroBanner />
      <CollectionIntro />
      <CollectionManifesto />
      <EditorialGrid />
      <ShopCTA />
    </main>
    <Footer />
  </>;
}
