"use client";

import { useSalonSite } from "@/hooks/useSalonSite";
import BookingOverlay from "./BookingOverlay";
import Cursor from "./Cursor";
import Footer from "./Footer";
import Gallery from "./Gallery";
import GalleryLightbox from "./GalleryLightbox";
import Hero from "./Hero";
import Marquee from "./Marquee";
import Nav from "./Nav";
import Services from "./Services";
import SmoothScroll from "./SmoothScroll";
import Story from "./Story";
import Team from "./Team";
import Visit from "./Visit";

export default function SalonSite() {
  const site = useSalonSite();

  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Nav site={site} />
      <main>
        <Hero site={site} />
        <Marquee />
        <Story site={site} />
        <Team />
        <Services site={site} />
        <Gallery site={site} />
        <Visit site={site} />
      </main>
      <Footer />
      <BookingOverlay site={site} />
      <GalleryLightbox site={site} />
    </>
  );
}
