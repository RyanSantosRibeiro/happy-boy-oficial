import { Header } from "@/components/happy-boy/Header";
import { HeroBanner } from "@/components/happy-boy/HeroBanner";
import { SeaSkyOpening } from "@/components/happy-boy/SeaSkyOpening";
import { FloatingCollection } from "@/components/happy-boy/FloatingCollection";
import { Footer } from "@/components/happy-boy/Footer";
import "@/components/happy-boy/campaign.css";
import "@/components/happy-boy/editorial.css";
import "@/components/happy-boy/floating-collection.css";
import "@/components/happy-boy/hero-banner.css";
import "@/components/happy-boy/sea-sky-opening.css";

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Pular para o conteúdo</a>
    <Header />
    <main id="main">
      <HeroBanner />
      {/* <SeaSkyOpening /> */}
      <FloatingCollection />
    </main>
    <Footer />
  </>;
}
