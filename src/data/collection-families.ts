import type { LifestyleGalleryData, LookVariantLink } from "./lifestyle-galleries";

export type CollectionVariant = { color: string; name: string; swatch: string; cover: string; photos: Array<{ id: string; alt: string }> };
export type CollectionFamily = { slug: string; name: string; variants: CollectionVariant[] };

// Provisional editorial names; photographs were grouped by garment construction.
export const collectionFamilies: CollectionFamily[] = [
  {
    "slug": "polo-essential",
    "name": "Polo Essential",
    "variants": [
      {
        "color": "marrom",
        "name": "Marrom",
        "swatch": "#654738",
        "cover": "8813",
        "photos": [
          {
            "id": "8813",
            "alt": "Fotografia principal: polo marrom e calça bege"
          },
          {
            "id": "8802",
            "alt": "Vista frontal: polo marrom e calça bege"
          },
          {
            "id": "8811",
            "alt": "Vista frontal: polo marrom e calça bege"
          },
          {
            "id": "8808",
            "alt": "Vista lateral: polo marrom e calça bege"
          }
        ]
      },
      {
        "color": "branco",
        "name": "Branco",
        "swatch": "#eeece6",
        "cover": "8730",
        "photos": [
          {
            "id": "8730",
            "alt": "Fotografia principal: polo branca e calça clara"
          },
          {
            "id": "8736",
            "alt": "Vista frontal: polo branca e calça clara"
          },
          {
            "id": "8745",
            "alt": "Vista frontal: polo branca e calça clara"
          },
          {
            "id": "8738",
            "alt": "Detalhe das peças: polo branca e calça clara"
          },
          {
            "id": "8741",
            "alt": "Vista posterior: polo branca e calça clara"
          }
        ]
      },
      {
        "color": "vinho",
        "name": "Vinho",
        "swatch": "#682c39",
        "cover": "8767",
        "photos": [
          {
            "id": "8767",
            "alt": "Fotografia principal: polo vinho e calça marrom"
          },
          {
            "id": "8762",
            "alt": "Vista frontal: polo vinho e calça marrom"
          },
          {
            "id": "8757",
            "alt": "Composição editorial: polo vinho e calça marrom"
          }
        ]
      }
    ]
  },
  {
    "slug": "camiseta-contrast",
    "name": "Camiseta Contrast",
    "variants": [
      {
        "color": "preta",
        "name": "Preta",
        "swatch": "#252524",
        "cover": "8616",
        "photos": [
          {
            "id": "8616",
            "alt": "Fotografia principal: camiseta preta com acabamento contrastante claro e bermuda bege"
          },
          {
            "id": "8607",
            "alt": "Vista frontal: camiseta preta com acabamento contrastante claro e bermuda bege"
          },
          {
            "id": "8613",
            "alt": "Vista frontal: camiseta preta com acabamento contrastante claro e bermuda bege"
          }
        ]
      },
      {
        "color": "branca",
        "name": "Branca",
        "swatch": "#f1efeb",
        "cover": "8623",
        "photos": [
          {
            "id": "8623",
            "alt": "Fotografia principal: camiseta branca com acabamento contrastante escuro e bermuda preta"
          },
          {
            "id": "8631",
            "alt": "Vista frontal: camiseta branca com acabamento contrastante escuro e bermuda preta"
          },
          {
            "id": "8634",
            "alt": "Vista posterior: camiseta branca com acabamento contrastante escuro e bermuda preta"
          }
        ]
      },
      {
        "color": "areia",
        "name": "Areia",
        "swatch": "#cfbda1",
        "cover": "8641",
        "photos": [
          {
            "id": "8641",
            "alt": "Fotografia principal: camiseta areia com acabamento contrastante e bermuda clara"
          },
          {
            "id": "8646",
            "alt": "Vista frontal: camiseta areia com acabamento contrastante e bermuda clara"
          },
          {
            "id": "8649",
            "alt": "Detalhe das peças: camiseta areia com acabamento contrastante e bermuda clara"
          }
        ]
      }
    ]
  },
  {
    "slug": "polo-short",
    "name": "Polo e short",
    "variants": [
      {
        "color": "verde",
        "name": "Verde-escuro",
        "swatch": "#20372d",
        "cover": "8658",
        "photos": [
          {
            "id": "8658",
            "alt": "Fotografia principal: polo verde-escura e short marrom"
          },
          {
            "id": "8654",
            "alt": "Vista frontal: polo verde-escura e short marrom"
          },
          {
            "id": "8656",
            "alt": "Vista frontal: polo verde-escura e short marrom"
          },
          {
            "id": "8668",
            "alt": "Vista frontal: polo verde-escura e short marrom"
          },
          {
            "id": "8664",
            "alt": "Detalhe das peças: polo verde-escura e short marrom"
          },
          {
            "id": "8682",
            "alt": "Composição editorial: polo verde-escura e short marrom"
          }
        ]
      },
      {
        "color": "cinza",
        "name": "Cinza",
        "swatch": "#737578",
        "cover": "8716",
        "photos": [
          {
            "id": "8716",
            "alt": "Fotografia principal: polo cinza e bermuda preta"
          },
          {
            "id": "8718",
            "alt": "Vista frontal: polo cinza e bermuda preta"
          },
          {
            "id": "8726",
            "alt": "Vista frontal: polo cinza e bermuda preta"
          },
          {
            "id": "8722",
            "alt": "Detalhe das peças: polo cinza e bermuda preta"
          }
        ]
      },
      {
        "color": "amarelo-claro",
        "name": "Amarelo-claro",
        "swatch": "#d8ca88",
        "cover": "8699",
        "photos": [
          {
            "id": "8699",
            "alt": "Fotografia principal: polo amarelo-claro e bermuda bege"
          },
          {
            "id": "8693",
            "alt": "Composição editorial: polo amarelo-claro e bermuda bege"
          },
          {
            "id": "8706",
            "alt": "Detalhe das peças: polo amarelo-claro e bermuda bege"
          },
          {
            "id": "8714",
            "alt": "Vista posterior: polo amarelo-claro e bermuda bege"
          },
          {
            "id": "8709",
            "alt": "Detalhe das peças: polo amarelo-claro e bermuda bege"
          },
          {
            "id": "8712",
            "alt": "Vista posterior: polo amarelo-claro e bermuda bege"
          }
        ]
      },
      {
        "color": "azul-claro",
        "name": "Azul-claro",
        "swatch": "#aec6d7",
        "cover": "8786",
        "photos": [
          {
            "id": "8786",
            "alt": "Fotografia principal: polo azul-claro e bermuda branca"
          },
          {
            "id": "8789",
            "alt": "Vista frontal: polo azul-claro e bermuda branca"
          },
          {
            "id": "8780",
            "alt": "Vista frontal: polo azul-claro e bermuda branca"
          },
          {
            "id": "8775",
            "alt": "Composição editorial: polo azul-claro e bermuda branca"
          },
          {
            "id": "8778",
            "alt": "Composição editorial: polo azul-claro e bermuda branca"
          },
          {
            "id": "8798",
            "alt": "Detalhe das peças: polo azul-claro e bermuda branca"
          },
          {
            "id": "8800",
            "alt": "Vista posterior: polo azul-claro e bermuda branca"
          }
        ]
      }
    ]
  }
];

export const variantHref = (family: string, color: string) => `/colecao/${family}/${color}`;
export const variantPhoto = (id: string) => `/images/travel-edition/lifestyle/RAY_${id}.webp`;

// Keep the previous mixed-polo URLs pointing to the same complete looks.
export function resolveColorFamily(familySlug: string, color: string) {
  const shorts = collectionFamilies.find(family => family.slug === "polo-short");
  return familySlug === "polo-essential" && shorts?.variants.some(variant => variant.color === color) ? "polo-short" : familySlug;
}

export function getColorGallery(familySlug: string, color: string): LifestyleGalleryData | undefined {
  const family = collectionFamilies.find(item => item.slug === familySlug);
  const variant = family?.variants.find(item => item.color === color);
  if (!family || !variant) return undefined;
  const variants: LookVariantLink[] = family.variants.map(item => ({ color: item.color, name: item.name, swatch: item.swatch, href: variantHref(family.slug, item.color) }));
  return { id: `${family.slug}-${variant.color}`, slug: family.slug, name: family.name, cover: variantPhoto(variant.cover), color: variant.name, variants,
    photos: variant.photos.map(photo => ({ ...photo, src: variantPhoto(photo.id), original: `/images/travel-edition/lifestyle/originals/RAY_${photo.id}.jpg` })) };
}
