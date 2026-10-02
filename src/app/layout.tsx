import type { Metadata, Viewport } from "next";
import "@fontsource-variable/roboto";
import "./globals.css";
import { campaign } from "@/data/sea-sky";

export const metadata: Metadata = {
  title: "Happy Boy — SEA SKY",
  description: "Explore SEA SKY, a coleção Happy Boy, em uma experiência editorial interativa.",
  openGraph: {
    title: "Happy Boy — SEA SKY",
    description: "Uma coleção. Cinco perspectivas. Explore a prévia editorial SEA SKY.",
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
