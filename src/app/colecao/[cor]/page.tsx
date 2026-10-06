import { notFound } from "next/navigation";
import { CollectionGallery } from "@/components/happy-boy/CollectionGallery";
import "@/components/happy-boy/collection.css";
import { collectionItems, collections, isCollectionSlug } from "@/data/collection";

export function generateStaticParams() {
  return collectionItems.map(({ slug }) => ({ cor: slug }));
}

export default async function CollectionPage({ params }: { params: Promise<{ cor: string }> }) {
  const { cor } = await params;
  if (!isCollectionSlug(cor)) notFound();

  return <CollectionGallery collection={collections[cor]} />;
}
