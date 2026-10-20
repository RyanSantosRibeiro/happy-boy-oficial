import assert from "node:assert/strict";
import test from "node:test";
import { productConsultationMessage } from "../src/lib/product-consultation.ts";
import { commercialContact, commercialFamilies, thirdCommercialAction, type CommercialFamilyId } from "../src/data/commercial.ts";
import { catalogRequestMessage, whatsappHref } from "../src/lib/wholesale.ts";

test("wholesale consultations describe a full family, with no selected color", () => {
  for (const id of Object.keys(commercialFamilies) as CommercialFamilyId[]) {
    const message = productConsultationMessage(id, "Travel Edition");
    assert.match(message, /compras no atacado/);
    assert.match(message, /receber o catálogo/);
    assert.match(message, /modelos, cores disponíveis, valores e condições comerciais/);
    assert.doesNotMatch(message, /cor Azul|cor Preto|cor Bege|undefined|null/);
  }
  assert.match(productConsultationMessage("polo-calca", "Travel Edition"), /Polo e Calça/);
  assert.match(productConsultationMessage("polo-short", "Travel Edition"), /Polo e Short/);
  assert.notEqual(productConsultationMessage("dry-fit"), productConsultationMessage("polo-canelado"));
});

test("seller and general contacts use the configured number and safe encoding", () => {
  for (const message of [commercialContact.generalMessage, commercialContact.sellerMessage]) {
    const href = whatsappHref(message)!;
    const url = new URL(href);
    assert.equal(url.pathname, `/${commercialContact.phone}`);
    assert.equal(url.searchParams.get("text"), message);
    assert.match(message, /coleções/);
    assert.match(message, /atacado/);
  }
  assert.equal(whatsappHref("", "123"), null);
  assert.equal(thirdCommercialAction.enabled, true);
  assert.equal(thirdCommercialAction.destination, commercialContact.phone);
  assert.ok(thirdCommercialAction.message);
  const visitUrl = new URL(whatsappHref(thirdCommercialAction.message, thirdCommercialAction.destination)!);
  assert.equal(visitUrl.pathname, `/${commercialContact.phone}`);
  assert.equal(visitUrl.searchParams.get("text"), thirdCommercialAction.message);
  assert.match(thirdCommercialAction.message, /visita de um representante.*na minha loja/);
  const catalog = catalogRequestMessage("Travel Edition");
  assert.match(catalog, /catálogo da coleção Travel Edition/);
  assert.equal(new URL(whatsappHref(catalog)!).searchParams.get("text"), catalog);
  assert.match(catalogRequestMessage("Outra coleção"), /catálogo da coleção Outra coleção/);
});
