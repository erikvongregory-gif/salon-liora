"use client";

import { useSalonSite } from "@/hooks/useSalonSite";
import About from "./About";
import BookingOverlay from "./BookingOverlay";
import Contact from "./Contact";
import Footer from "./Footer";
import Gallery from "./Gallery";
import GalleryLightbox from "./GalleryLightbox";
import Hero from "./Hero";
import Nav from "./Nav";
import Services from "./Services";
import Team from "./Team";

export default function SalonSite() {
  const site = useSalonSite();

  return (
    <>
      <Nav site={site} />
      <Hero site={site} />
      <About site={site} />
      <Team />
      <Services site={site} />
      <Gallery site={site} />
      <Contact site={site} />
      <Footer />
      <BookingOverlay site={site} />
      <GalleryLightbox site={site} />
    </>
  );
}
