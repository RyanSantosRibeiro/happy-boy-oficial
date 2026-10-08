import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { LifestyleGallery } from "@/components/happy-boy/LifestyleGallery";
import { collectionFamilies, getColorGallery, resolveColorFamily, variantHref } from "@/data/collection-families";
import "@/components/happy-boy/collection.css";
import "@/components/happy-boy/lifestyle-gallery.css";
import "@/components/happy-boy/gallery-art-direction.css";

type VariantParams = { params: Promise<{ cor: string; variacao: string }> };

export function generateStaticParams() {
  return collectionFamilies.flatMap(family => family.variants.flatMap(variant => [
    { cor: family.slug, variacao: variant.color },
    ...(family.slug === "polo-short" ? [{ cor: "polo-essential", variacao: variant.color }] : []),
  ]));
}

export async function generateMetadata({ params }: VariantParams): Promise<Metadata> {
  const { cor, variacao } = await params;
  const look = getColorGallery(resolveColorFamily(cor, variacao), variacao);
  if (!look) notFound();
  const title = `${look.name} — ${look.color} | Happy Boy`;
  return { title, description: `Fotografias oficiais de ${look.name}, na cor ${look.color?.toLowerCase()}, da Happy Boy.`,
    openGraph: { title, images: [{ url: look.cover, alt: look.photos[0].alt }] } };
}

export default async function ColorGalleryPage({ params }: VariantParams) {
  const { cor, variacao } = await params;
  const family = resolveColorFamily(cor, variacao);
  if (family !== cor) permanentRedirect(variantHref(family, variacao));
  const look = getColorGallery(cor, variacao);
  if (!look) notFound();
  return <LifestyleGallery key={`${cor}/${variacao}`} look={look} />;
}
