import type { Metadata, Viewport } from "next";
import "@fontsource-variable/roboto";
import "./globals.css";
import "@/components/happy-boy/navigation-help.css";
import { campaign } from "@/data/sea-sky";
import { getFeaturedCollection } from "@/data/catalog";
import { WhatsAppProvider } from "@/components/happy-boy/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://happy-boy-oficial.vercel.app"),
  title: `Happy Boy — Moda masculina | ${getFeaturedCollection().name}`,
  description: "Explore as coleções de moda masculina da Happy Boy. Linhas, modelos e cores com atendimento comercial para compras no atacado.",
  openGraph: {
    title: `Happy Boy — ${getFeaturedCollection().name}`,
    description: "Coleções de moda masculina e atendimento comercial para lojistas e parceiros.",
    locale: "pt_BR",
    type: "website",
  },
  // This is a prototype with unapproved campaign/product copy.
  robots: { index: !campaign.isPreview, follow: !campaign.isPreview },
};

export const viewport: Viewport = { themeColor: "#000000" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body><WhatsAppProvider collectionName={getFeaturedCollection().name}>{children}</WhatsAppProvider></body></html>;
}
