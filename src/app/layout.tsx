import type { Metadata, Viewport } from "next";
import "@fontsource-variable/roboto";
import "./globals.css";
import { campaign } from "@/data/sea-sky";

export const metadata: Metadata = {
  metadataBase: new URL("https://happy-boy-oficial.vercel.app"),
  title: "Happy Boy — Moda masculina | Travel Edition",
  description: "Conheça a Happy Boy e a coleção Travel Edition. Explore os looks de moda masculina e fale com a nossa equipe.",
  openGraph: {
    title: "Happy Boy — Travel Edition",
    description: "Conheça a coleção Travel Edition e explore a seleção de moda masculina da Happy Boy.",
    locale: "pt_BR",
    type: "website",
  },
  // This is a prototype with unapproved campaign/product copy.
  robots: { index: !campaign.isPreview, follow: !campaign.isPreview },
};

export const viewport: Viewport = { themeColor: "#000000" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
