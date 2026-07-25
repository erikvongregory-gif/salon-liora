export const BRAND = {
  name: "Salon Liora",
  tagline: "Schönheit ist Handwerk.",
  since: 1962,
  email: "hello@salon-liora.demo",
  phone: "+49 (0) 1234 567890",
  phoneHref: "tel:+491234567890",
  instagram: "@salon_liora",
  teamNames: "Elena & Sophie",
  logo: "/logo.webp",
} as const;

export const LOCATIONS = {
  lindenau: {
    id: "lindenau" as const,
    name: "Lindenau",
    street: "Musterstraße 12",
    zipCity: "12345 Lindenau",
    shortAddress: "Musterstraße 12 · 12345 Lindenau",
  },
  seetal: {
    id: "seetal" as const,
    name: "Seetal",
    street: "Am See 3",
    zipCity: "12346 Seetal",
    shortAddress: "Am See 3 · 12346 Seetal",
  },
} as const;

export const TEAM = [
  {
    id: "elena",
    name: "Elena",
    specialty: "Balayage & Farbtechniken",
    bio: "Leidenschaft für Farbe und Kreativität – Spezialistin für Balayage, Highlights und moderne Colorationen.",
    bookingBio: "Spezialistin für Balayage, Highlights und moderne Colorationen.",
    image: "/salon/team-elena.webp",
  },
  {
    id: "sophie",
    name: "Sophie",
    specialty: "Schnitt & Styling",
    bio: "Meisterin der Präzision – Sophie bringt jeden Schnitt in perfekte Form und begeistert mit ihrem Stilgefühl.",
    bookingBio: "Meisterin für präzise Schnitte und modernes Styling.",
    image: "/salon/team-sophie.webp",
  },
] as const;

export const IMAGES = {
  hero: "/salon/hero.webp",
  about: ["/salon/about-helene.webp", "/salon/about-clara.webp", "/salon/about-sisters.webp"] as const,
  services: ["/salon/service-cut.webp", "/salon/service-color.webp", "/salon/service-care.webp"] as const,
} as const;

export const galleryImgUrls = [
  "/salon/gallery-01.webp",
  "/salon/gallery-02.webp",
  "/salon/gallery-03.webp",
  "/salon/gallery-04.webp",
  "/salon/gallery-05.webp",
  "/salon/gallery-06.webp",
  "/salon/gallery-07.webp",
  "/salon/gallery-08.webp",
  "/salon/gallery-09.webp",
  "/salon/gallery-10.webp",
  "/salon/gallery-11.webp",
  "/salon/gallery-12.webp",
];

export const serviceData = [
  { id: "wsf", name: "Waschen, Schneiden & Föhnen", duration: "60 Min", price: "58 €" },
  { id: "wf", name: "Waschen & Föhnen", duration: "45 Min", price: "38 €" },
  { id: "her", name: "Herrenhaarschnitt", duration: "30 Min", price: "32 €" },
  { id: "mae", name: "Mädchenschnitt", duration: "30 Min", price: "35 €" },
  { id: "bub", name: "Bubenschnitt", duration: "20 Min", price: "25 €" },
  { id: "ans", name: "Ansatzfarbe + WSF", duration: "120 Min", price: "113 €" },
  { id: "ahl", name: "Ansatzfarbe + Highlights + WSF", duration: "150 Min", price: "130 €" },
  { id: "sok", name: "Strähnen OK + Glossing + WSF", duration: "180 Min", price: "160 €" },
  { id: "sgk", name: "Strähnen GK + Glossing + WSF", duration: "180 Min", price: "208 €" },
  { id: "bal", name: "Balayage + Glossing + WSF", duration: "180 Min", price: "229 €" },
];

export const CONTACT_EMAIL = BRAND.email;
