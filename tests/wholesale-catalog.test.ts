import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { catalogCollections, collectionReturnHref, getFeaturedCollection, getPublishedCollections, isPublishedCatalogEntry } from "../src/data/catalog.ts";
import { getColorGallery, collectionFamilies } from "../src/data/collection-families.ts";
import { getLifestyleGallery } from "../src/data/lifestyle-galleries.ts";
import { getWeeklyLaunches, weeklyLaunches, type WeeklyLaunch } from "../src/data/weekly-launches.ts";
import { lineConsultationMessage } from "../src/lib/wholesale.ts";

test("only Travel Edition is published; drafts never replace the approved homepage", () => {
  const current = getFeaturedCollection();
  assert.equal(current.id, "travel-edition");
  assert.equal(catalogCollections.length, 1);
  const draft = { ...current, id: "test-draft", slug: "test-draft", status: "draft" as const, featured: true };
  assert.equal(getPublishedCollections([current, draft]).length, 1);
  assert.equal(getFeaturedCollection([current, draft]).id, current.id);
  assert.equal(isPublishedCatalogEntry({ collectionId: draft.id }, [current, draft]), false);
  assert.equal(isPublishedCatalogEntry({ collectionId: current.id }, [current, draft]), true);
  assert.equal(isPublishedCatalogEntry({ collectionId: "missing" }, [current, draft]), false);
  assert.equal(isPublishedCatalogEntry({ collectionId: null }), true);
  const archived = { ...current, featured: false };
  const approved = { ...current, id: "test-approved", slug: "test-approved" };
  assert.equal(getPublishedCollections([archived, approved]).length, 2);
  assert.equal(getFeaturedCollection([archived, approved]).id, "test-approved");
  assert.equal(collectionReturnHref(current.id, "/#dry-fit", [archived, approved]), "/colecoes/travel-edition");
  assert.equal(collectionReturnHref(current.id, "/#dry-fit"), "/#dry-fit");
  assert.throws(() => getFeaturedCollection([current, approved]), /exactly one/);
});

test("approved media order, all 21 gallery destinations and eight true families are preserved", () => {
  const collection = getFeaturedCollection();
  assert.deepEqual(collection.presentation.films.map(film => film.color), ["branco", "verde", "azul", "preto"]);
  assert.equal(new Set(collection.lines.flatMap(line => line.items.map(item => item.href))).size, 21);
  assert.equal(new Set(collection.lines.map(line => line.familyId)).size, 8);
  for (const line of collection.lines) for (const item of line.items) {
    assert.ok(existsSync(`public${item.cover}`), item.cover);
    assert.ok(item.href.startsWith("/colecao/"));
  }
  for (const film of collection.presentation.films) {
    assert.ok(existsSync(`public${film.src}`));
    assert.ok(existsSync(`public${film.poster}`));
  }
  assert.equal(collection.presentation.hero.videoSrc, "/videos/travel-edition/happyboy-beyond-limits-v7-desktop.mp4");
});

test("colors share family messages; visually grouped but different garments stay separate", () => {
  for (const family of collectionFamilies) {
    const messages = family.variants.filter(variant => !variant.gallerySlug).map(variant => {
      const look = getColorGallery(family.slug, variant.color)!;
      return lineConsultationMessage(look.commercialFamilyId, "Travel Edition");
    });
    assert.equal(new Set(messages).size, 1);
  }
  assert.equal(getLifestyleGallery("camiseta-bermuda")!.commercialFamilyId, "camiseta-bermuda");
  assert.equal(getColorGallery("camiseta-contrast", "preta")!.commercialFamilyId, "camiseta-contrast");
  assert.equal(getLifestyleGallery("camisa-clara")!.commercialFamilyId, "camisa-calca");
  assert.equal(getLifestyleGallery("camisa-short")!.commercialFamilyId, "camisa-short");
});

test("only the approved locked preview appears; draft weekly launches stay hidden", () => {
  assert.equal(weeklyLaunches.length, 1);
  assert.equal(getWeeklyLaunches("travel-edition")[0].releaseAt, "2026-11-01T00:00:00-03:00");
  assert.equal(getWeeklyLaunches("travel-edition")[0].mode, "preview");
  assert.equal(getWeeklyLaunches("travel-edition")[0].href, undefined);
  assert.deepEqual(getWeeklyLaunches("travel-edition", []), []);
  const item: WeeklyLaunch = { id: "test", collectionId: "travel-edition", status: "draft", mode: "preview", title: "Test fixture", description: "Test fixture", href: "/colecoes/travel-edition", linkLabel: "Explorar" };
  assert.deepEqual(getWeeklyLaunches("travel-edition", [item]), []);
  assert.equal(getWeeklyLaunches("travel-edition", [{ ...item, status: "published" }]).length, 1);
  assert.deepEqual(getWeeklyLaunches("other", [{ ...item, status: "published" }]), []);
});
