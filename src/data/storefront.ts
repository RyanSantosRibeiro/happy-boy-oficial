import { collectionAssets } from "./collection";

const brandProfileImage = "https://scontent-gig4-2.cdninstagram.com/v/t51.82787-19/830612433_18369901312214025_7224926867452500189_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=103&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=zvEQ8tUAD_0Q7kNvwHuaAu9&_nc_oc=AdplJn71hkyI8pB6uGJo9dY-SkXBXyo6IO5MaFl7G9Whf7REQB0b5AsfahIiD5X8uK0W8oExfL69-helhNPyAPSY&_nc_zt=24&_nc_ht=scontent-gig4-2.cdninstagram.com&_nc_gid=duvZry8L4b4_wlwfSfkt2w&_nc_ss=7b6a8&oh=00_AQOS-hy73ZFUgKD61fuM7G6PfLMlYt9Cnw43zPpkDoGVPw&oe=6ACB74B4";

export const storefront = {
  hero: {
    // Paste a direct MP4/WebM URL or a /videos/file.mp4 path here.
    videoSrc: "/videos/travel-edition/happyboy-beyond-limits-v2-desktop.mp4" as string | null,
    mobileVideoSrc: "/videos/travel-edition/happyboy-beyond-limits-v2-mobile.mp4",
    poster: "/videos/travel-edition/happyboy-beyond-limits-v2-desktop-poster.jpg",
    mobilePoster: "/videos/travel-edition/happyboy-beyond-limits-v2-mobile-poster.jpg",
    closingStartsAt: 24.7,
    revealDelaySeconds: 2.5,
    title: "TRAVEL EDITION",
    subtitle: "Do cotidiano ao destino, com estilo em cada caminho",
  },
  logo: "/images/happy-boy-logo-black.png",
  whatsapp: {
    // International digits only, including country and area code. No fake number.
    phone: "558589634064",
    message: "Olá! Gostaria de conhecer as peças da Happy Boy.",
  },
  showcases: [
    {
      id: "shop",
      title: "Peças para o seu ritmo.",
      description: "Explore a seleção de polos, camisas e camisetas da SEA SKY.",
      banner: collectionAssets.branco.src,
      bannerAlt: "Editorial SEA SKY com look claro",
      bannerPosition: "left" as const,
      productIds: ["polo-essencial", "camisa-leve", "camiseta-regular", "polo-textura"],
    },
    {
      id: "selection",
      title: "Novas combinações.",
      description: "Uma seleção para completar o look e explorar outras possibilidades.",
      banner: collectionAssets.azul.src,
      bannerAlt: "Editorial SEA SKY com look azul",
      bannerPosition: "right" as const,
      productIds: ["calca-reta", "bermuda-casual", "camisa-manga-curta", "camiseta-ampla"],
    },
  ],
  instagramPhotos: [
    {
      id: "instagram-1",
      src: "https://scontent-gig4-1.cdninstagram.com/v/t51.82787-15/833603434_18369908836214025_8965883736796800367_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=100&ig_cache_key=NDAwMDY0NjQzOTE4NjgzNjQzMTE4MzY5OTA4ODMwMjE0MDI1.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNMSVBTLnhwaWRzLjEyMTkuc2RyLnZpZGVvX3VzZXJfdXBsb2FkZWRfdGh1bWJuYWlsLkMzIn0%3D&_nc_ohc=C5mTPziZGQsQ7kNvwFCFKO0&_nc_oc=AdrzCH5PDnI-iboyDvt58m2NrWo_6FKpoXA7AQy8ka0mHBdJBgX7RZaYs0Guq-Yl4GD9YOGTOKtWD6g_weeOMoMg&_nc_zt=23&_nc_ht=scontent-gig4-1.cdninstagram.com&_nc_gid=FG3GxTnlUEmrBfKCx__kaQ&_nc_ss=7b6a8&oh=00_AQNXLP-K3x2f_7iKm5rmFC4EqMA0dYr3N7M2VyxL4eQj7g&oe=6ACB5119",
      alt: "Imagem da coleção publicada no Instagram — foto 1",
      href: "https://www.instagram.com/happyboyoficial/",
    },
    {
      id: "instagram-2",
      src: "https://scontent-gig4-1.cdninstagram.com/v/t51.82787-15/834012949_18369620887214025_4290032809441845600_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=110&ig_cache_key=Mzk5OTE5MzYyMjUwOTE3ODYxMTE4MzY5NjIwODg0MjE0MDI1.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNMSVBTLnhwaWRzLjEyMTUuc2RyLnZpZGVvX3VzZXJfdXBsb2FkZWRfdGh1bWJuYWlsLkMzIn0%3D&_nc_ohc=vWXtU7--OssQ7kNvwHAivju&_nc_oc=Ador_iusZwifVgOl-O8pttbl_Rzh-NTtb7yxSRhfA1Q9EAVBR96Sh7FiURx3LGtw5AW0MlzqfZXp91_iczTfg5jI&_nc_zt=23&_nc_ht=scontent-gig4-1.cdninstagram.com&_nc_gid=FG3GxTnlUEmrBfKCx__kaQ&_nc_ss=7b6a8&oh=00_AQPvCY4iOy0briNxBnQ0O1Z0ARxK-i5g4Ay9efo-AsJp-g&oe=6ACB66A9",
      alt: "Imagem da coleção publicada no Instagram — foto 2",
      href: "https://www.instagram.com/happyboyoficial/",
    },
    {
      id: "instagram-3",
      src: "https://scontent-gig4-1.cdninstagram.com/v/t51.82787-15/838090422_18370191202214025_2229520909654250290_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=105&ig_cache_key=NDAwMjIxMzU2MTAxNjgwMTg0Ng%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTA4MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=EZDDURSzguAQ7kNvwHC7k3G&_nc_oc=AdqyNxAUlWa_g9MjGi7uvlWxUCVxbMCHykHp-DciJL9rFu2hIazZrJ9a_w42dLJgpKsShkbLclBO-qwkAmhU1NRD&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-gig4-1.cdninstagram.com&_nc_gid=Cg9NjkJmJkw_2E8ZDi-uZw&_nc_ss=7a22e&oh=00_AQM6XtU-rE6ob8FqVTxSiAVsL01eA5ww1qZQY73VJZslMQ&oe=6ACB477F",
      alt: "Imagem da coleção publicada no Instagram — foto 3",
      href: "https://www.instagram.com/happyboyoficial/",
    },
    {
      id: "instagram-4",
      src: "https://scontent-gig4-1.cdninstagram.com/v/t51.82787-15/830572643_18369106798214025_8448398965569318702_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=108&ig_cache_key=Mzk5NjM5OTIzNTYzNTA1NDQwMzE4MzY5MTA2Nzk1MjE0MDI1.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNMSVBTLnhwaWRzLjEyMTYuc2RyLnZpZGVvX3VzZXJfdXBsb2FkZWRfdGh1bWJuYWlsLkMzIn0%3D&_nc_ohc=aiOAYUyFrgEQ7kNvwHxRZAL&_nc_oc=AdrY33ran_m_H4DZO92KQHBXF-u81PsQ7d1oHosjwji-5RYztLrstK019tCqTNp1U93156QnUBHYHTA4L7gPeHNK&_nc_zt=23&_nc_ht=scontent-gig4-1.cdninstagram.com&_nc_gid=FG3GxTnlUEmrBfKCx__kaQ&_nc_ss=7b6a8&oh=00_AQMuRfU_4qY8LSMqaDkSrHwTBhgrp58y7phWgSldDBn3rw&oe=6ACB5BBB",
      alt: "Imagem da coleção publicada no Instagram — foto 4",
      href: "https://www.instagram.com/happyboyoficial/",
    },
    {
      id: "instagram-5",
      src: "https://scontent-gig4-1.cdninstagram.com/v/t51.82787-15/820409224_18368488309214025_1635379807064679715_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=105&ig_cache_key=Mzk5MzMxOTAxMTA3MDM2ODE5NjE4MzY4NDg4MzA2MjE0MDI1.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNMSVBTLnhwaWRzLjEyMTUuc2RyLnZpZGVvX3VzZXJfdXBsb2FkZWRfdGh1bWJuYWlsLkMzIn0%3D&_nc_ohc=FHFaTKx3R6YQ7kNvwGI6TJl&_nc_oc=AdrmoC166XOJj9tMpYZ9RDqVw-0Ex6DwmpCQf7O_XLGvVyOk9eGCjjUkOd46Xz3SZaptA82hUDCPKRgnWVAoXUyJ&_nc_zt=23&_nc_ht=scontent-gig4-1.cdninstagram.com&_nc_gid=FG3GxTnlUEmrBfKCx__kaQ&_nc_ss=7b6a8&oh=00_AQMAYXSVGJTsZ4jzsJMWWLAg-zdjJ_n-3buqtGLqba01Wg&oe=6ACB7900",
      alt: "Imagem da coleção publicada no Instagram — foto 5",
      href: "https://www.instagram.com/happyboyoficial/",
    },
  ],
  aboutImage: brandProfileImage,
};

export function getWhatsAppHref(message = storefront.whatsapp.message): string | null {
  const phone = storefront.whatsapp.phone.replace(/\D/g, "");
  if (phone.length < 10 || phone.length > 15) return null;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
