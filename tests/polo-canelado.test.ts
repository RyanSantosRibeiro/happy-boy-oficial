import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { getPoloCaneladoGallery, poloCaneladoColors } from "../src/data/polo-canelado.ts";
import { lineConsultationMessage } from "../src/lib/wholesale.ts";

test("each polo set color has separate official photographs and original files", () => {
  const seen = new Set<string>();
  assert.deepEqual(poloCaneladoColors.map(color => color.slug), ["preto", "branco", "bege", "verde"]);
  for (const color of poloCaneladoColors) {
    const gallery = getPoloCaneladoGallery(color.slug)!;
    assert.equal(gallery.cover, gallery.photos[0].src);
    assert.equal(gallery.returnHref, "/#dry-fit");
    assert.equal(gallery.variants?.length, 4);
    for (const photo of gallery.photos) {
      assert.ok(!seen.has(photo.id), `Photo ${photo.id} belongs to more than one color`);
      seen.add(photo.id);
      assert.ok(photo.src.includes(`/${color.slug}/`));
      assert.ok(photo.alt.length > 0);
      assert.ok(existsSync(`public${photo.src}`), photo.src);
      assert.ok(existsSync(`public${photo.original}`), photo.original);
    }
    assert.equal(gallery.commercialFamilyId, "polo-canelado");
    assert.equal(lineConsultationMessage(gallery.commercialFamilyId, "Travel Edition"), lineConsultationMessage("polo-canelado", "Travel Edition"));
  }
  assert.equal(getPoloCaneladoGallery("azul"), undefined);
});
