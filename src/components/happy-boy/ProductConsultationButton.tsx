import type { CommercialFamilyId } from "@/data/commercial";
import { getPublishedCollection } from "@/data/catalog";
import { CommercialActions } from "./CommercialActions";

/** Existing gallery integration, now backed by one commercial interface. */
export function ProductConsultationButton({ familyId, collectionId }: { familyId: CommercialFamilyId; collectionId?: string | null }) {
  const collection = collectionId ? getPublishedCollection(collectionId) : undefined;
  return <CommercialActions familyId={familyId} collectionName={collection?.name} />;
}
