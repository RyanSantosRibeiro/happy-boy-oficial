import test from "node:test";
import assert from "node:assert/strict";
import { commercialContact } from "../src/data/commercial.ts";
import { physicalStores, storeMapHref, wholesaleStory } from "../src/data/wholesale-landing.ts";
import { commercialLeadHref, commercialLeadMessage, contactHref, contactSelection, validateCommercialLead, type CommercialLead } from "../src/lib/commercial-lead.ts";

const lead: CommercialLead = { intent: "atacado", name: "Teste de revisão", business: "Loja de teste", phone: "(85) 99999-1234", city: "Fortaleza", state: "CE", profile: "Já tenho loja", address: "Bairro de teste", preference: "Próxima semana, manhã", notes: "Cores: bege & oliva? Ação / coleção.", operationVisit: false };

test("all commercial entry points preserve their intent, including an operation visit", () => {
  for (const intent of ["atacado", "representante", "showroom", "lojas"] as const) assert.deepEqual(contactSelection(new URL(contactHref(intent), "https://example.com").hash), {intent,operationVisit:false});
  assert.deepEqual(contactSelection("#atendimento-operacao"), {intent:"showroom",operationVisit:true});
  assert.equal(contactSelection("#collection"),null);
  assert.equal(contactSelection("#atendimento-toString"),null);
});
test("invalid contact data cannot generate a WhatsApp URL", () => {
  const broken = {...lead,name:" ",phone:"1234",city:"",state:"XX",profile:"",intent:"representante" as const,address:""};
  const errors=validateCommercialLead(broken);
  for (const key of ["name","phone","city","state","profile","address"] as const) assert.ok(errors[key]);
  assert.equal(commercialLeadHref(broken),null);
});
test("established shops need a business name; new resellers do not", () => {
  assert.ok(validateCommercialLead({...lead,business:""}).business);
  assert.deepEqual(validateCommercialLead({...lead,business:"",profile:"Quero começar a revender"}),{});
  assert.match(commercialLeadMessage({...lead,business:"",profile:"Quero começar a revender"}),/Ainda não tenho uma loja definida/);
});
test("mode-specific data never leaks into a different request", () => {
  const wholesale= commercialLeadMessage(lead);
  assert.doesNotMatch(wholesale,/Bairro de teste|Próxima semana/);
  assert.match(commercialLeadMessage({...lead,intent:"representante"}),/Bairro ou endereço da loja: Bairro de teste/);
  assert.doesNotMatch(commercialLeadMessage({...lead,intent:"representante"}),/Próxima semana/);
  const showroom=commercialLeadMessage({...lead,intent:"showroom",operationVisit:true});
  assert.match(showroom,/Conhecer a operação de perto/);
  assert.match(showroom,/dependem da confirmação/);
  assert.doesNotMatch(showroom,/Bairro de teste/);
});
test("store visitors need no business, profile or commercial address", () => {
  const visit={...lead,intent:"lojas" as const,business:"",city:"",state:"",profile:"",address:""};
  assert.deepEqual(validateCommercialLead(visit),{});
  assert.doesNotMatch(commercialLeadMessage(visit),/Loja:|Perfil:|Cidade\/UF:|Bairro de teste|Próxima semana/);
});
test("URLs use only the configured destination and correctly encode the entire message", () => {
  const href=commercialLeadHref(lead);
  assert.ok(href);
  const url=new URL(href);
  assert.equal(url.origin,"https://wa.me");
  assert.equal(url.pathname,`/${commercialContact.phone}`);
  assert.equal(url.searchParams.get("text"),commercialLeadMessage(lead));
  assert.equal([...url.searchParams.keys()].length,1);
  assert.deepEqual(validateCommercialLead({...lead,phone:"+55 85 99999-1234"}),{});
});
test("a showroom preference and representative location are required only for their own modality", () => {
  assert.ok(validateCommercialLead({...lead,intent:"showroom",preference:""}).preference);
  assert.ok(validateCommercialLead({...lead,intent:"representante",address:""}).address);
  assert.deepEqual(validateCommercialLead({...lead,preference:"",address:""}),{});
});
test("store maps use the real addresses and pending credibility media stays empty", () => {
  assert.equal(physicalStores.length,3);
  for(const store of physicalStores) { const url=new URL(storeMapHref(store.query)); assert.equal(url.hostname,"www.google.com"); assert.equal(url.searchParams.get("query"),store.query); }
  assert.equal(wholesaleStory.founderVideo,null);
  assert.equal(wholesaleStory.testimonials.length,0);
  assert.equal(wholesaleStory.operationMedia.length,0);
});
