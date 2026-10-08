import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { CollectionGallery } from "@/components/happy-boy/CollectionGallery";
import { LifestyleGallery } from "@/components/happy-boy/LifestyleGallery";
import "@/components/happy-boy/collection.css";
import "@/components/happy-boy/lifestyle-gallery.css";
import "@/components/happy-boy/gallery-art-direction.css";
import { collectionItems, collections, isCollectionSlug } from "@/data/collection";
import { getLifestyleGallery, lifestyleGalleries } from "@/data/lifestyle-galleries";

export function generateStaticParams() {
  return [...collectionItems, ...lifestyleGalleries].map(({ slug }) => ({ cor: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ cor: string }> }): Promise<Metadata> {
  const { cor } = await params;
  const look = getLifestyleGallery(cor);
  if (look) return {
    title: `${look.name} | Happy Boy`,
    description: `Explore as fotografias oficiais de ${look.name.toLowerCase()} da Happy Boy.`,
    openGraph: { title: `${look.name} | Happy Boy`, images: [{ url: look.cover, alt: look.photos[0].alt }] },
  };
  if (!isCollectionSlug(cor)) notFound();
  const collection = collections[cor];
  return {
    title: `Conjunto ${collection.name.toLowerCase()} — Travel Edition | Happy Boy`,
    description: `Explore as fotografias do conjunto ${collection.name.toLowerCase()} da coleção Travel Edition Happy Boy.`,
    openGraph: { title: `Conjunto ${collection.name.toLowerCase()} | Happy Boy`, images: [{ url: collection.cover, alt: collection.altTexts[0] }] },
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ cor: string }> }) {
  const { cor } = await params;
  if (cor === "polo-marrom") permanentRedirect("/colecao/polo-essential/marrom");
  if (cor === "polo-verde") permanentRedirect("/colecao/polo-short/verde");
  const look = getLifestyleGallery(cor);
  if (look) return <LifestyleGallery key={cor} look={look} />;
  if (!isCollectionSlug(cor)) notFound();

  return <CollectionGallery key={cor} collection={collections[cor]} />;
}
