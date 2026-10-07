import type { Metadata, Viewport } from "next";
import "@fontsource-variable/roboto";
import "./globals.css";
import { campaign } from "@/data/sea-sky";

export const metadata: Metadata = {
  title: "Happy Boy — Moda masculina | Coleção SEA SKY",
  description: "Conheça a Happy Boy e a coleção SEA SKY. Explore polos, camisetas, camisas, calças e bermudas de moda masculina e fale com a nossa equipe.",
  openGraph: {
    title: "Happy Boy — SEA SKY",
    description: "Conheça a coleção SEA SKY e explore a seleção de moda masculina da Happy Boy.",
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
