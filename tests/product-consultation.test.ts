import assert from "node:assert/strict";
import test from "node:test";
import { productConsultationMessage } from "../src/lib/product-consultation.ts";

test("consultation follows the selected garment and color", () => {
  const brown = productConsultationMessage("Polo Essential", "Marrom");
  const white = productConsultationMessage("Polo Essential", "Branco");
  assert.match(brown, /Polo Essential — cor Marrom/);
  assert.match(white, /Polo Essential — cor Branco/);
  assert.doesNotMatch(white, /Marrom/);
  assert.match(productConsultationMessage("Conjunto Dry Fit", "Azul"), /Conjunto Dry Fit — cor Azul/);
});

test("editorial looks without a color do not invent a variant", () => {
  const message = productConsultationMessage("Camiseta e bermuda");
  assert.match(message, /Camiseta e bermuda da Happy Boy/);
  assert.doesNotMatch(message, /cor |undefined|null/);
  assert.match(message, /valor e os tamanhos disponíveis/);
});
