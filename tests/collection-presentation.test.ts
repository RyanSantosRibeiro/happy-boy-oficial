import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { getFeaturedCollection } from "../src/data/catalog.ts";
import { collectionPresentationGroups, collectionPresentationLooks } from "../src/data/collection-presentation.ts";
import { temporaryPresentation } from "../src/data/wholesale-landing.ts";

test("four independent groups retain all fifteen unique variant covers and complete galleries",()=>{
  const looks=collectionPresentationLooks(getFeaturedCollection());
  const groups=collectionPresentationGroups(getFeaturedCollection());
  assert.deepEqual(groups.map(group=>group.looks.length),[4,3,4,4]);
  assert.deepEqual(groups.flatMap(group=>group.looks.map(look=>look.href)),looks.map(look=>look.href));
  assert.equal(looks.length,15);
  assert.equal(new Set(looks.map(look=>look.href)).size,15);
  assert.equal(new Set(looks.map(look=>look.gallery.cover)).size,15);
  assert.deepEqual(looks.slice(0,4).map(look=>look.gallery.color),["Preto","Branco","Bege","Verde"]);
  assert.equal(looks.filter(look=>look.gallery.commercialFamilyId==="polo-calca").length,3);
  assert.deepEqual(looks.filter(look=>look.gallery.commercialFamilyId==="polo-short").map(look=>look.gallery.color),["Verde-escuro","Cinza","Amarelo-claro","Azul-claro"]);
  for(const look of looks){
    assert.ok(look.gallery.photos.length>=2);
    assert.equal(look.gallery.cover,look.gallery.photos[0].src);
    assert.ok(look.href.startsWith("/colecao/"));
    for(const photo of look.gallery.photos)assert.ok(existsSync(`public${photo.src}`));
  }
});
test("a shared editorial row does not reclassify the shirt/short outfit as Contrast",()=>{
  const collection=getFeaturedCollection();
  const before=JSON.stringify(collection);
  const looks=collectionPresentationLooks(collection);
  assert.equal(looks.filter(look=>look.gallery.commercialFamilyId==="camiseta-contrast").length,3);
  const shirt=looks.find(look=>look.href==="/colecao/camisa-short")!;
  assert.equal(shirt.gallery.commercialFamilyId,"camisa-short");
  assert.deepEqual(shirt.gallery.photos.map(photo=>photo.id),["8851","8873","8876"]);
  assert.equal(JSON.stringify(collection),before);
});
test("temporary browser film and its cover are local assets",()=>{
  assert.ok(existsSync(`public${temporaryPresentation.src}`));
  assert.ok(existsSync(`public${temporaryPresentation.poster}`));
});
