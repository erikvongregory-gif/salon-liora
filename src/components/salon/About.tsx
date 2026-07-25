"use client";

import { useEffect, useRef, useState } from "react";
import { BRAND, IMAGES } from "@/lib/salon-data";
import type { SalonSiteState } from "@/hooks/useSalonSite";

type Props = {
  site: SalonSiteState;
};

type Chapter = {
  eyebrow: string;
  title: React.ReactNode;
  body: React.ReactNode;
};

const CHAPTERS: Chapter[] = [
  {
    eyebrow: "Erste Generation",
    title: (
      <>
        Helene,
        <br />
        <em>die Gründerin.</em>
      </>
    ),
    body: (
      <>
        Alles begann mit unserer Großmutter{" "}
        <strong style={{ color: "rgba(249,244,238,0.9)", fontWeight: "400" }}>Helene</strong> im Jahr{" "}
        {BRAND.since}. Sie war eine Exotin ihrer Zeit – emanzipiert, selbstständig und weltoffen. Ihr
        kleiner Friseursalon wurde zu einem Ort der Zusammenkunft, für Jung und Alt.
      </>
    ),
  },
  {
    eyebrow: "Zweite Generation",
    title: (
      <>
        Clara,
        <br />
        <em>das Erbe.</em>
      </>
    ),
    body: (
      <>
        Unsere Mutter{" "}
        <strong style={{ color: "rgba(249,244,238,0.9)", fontWeight: "400" }}>Clara</strong> führte das
        Handwerk weiter und machte daraus ein wahrhaftiges Unternehmen – mit Herz, Anspruch und einem
        Blick für jeden Gast.
      </>
    ),
  },
  {
    eyebrow: "Dritte Generation",
    title: (
      <>
        Elena &amp; Sophie,
        <br />
        <em>heute.</em>
      </>
    ),
    body: (
      <>
        Heute tragen wir,{" "}
        <strong style={{ color: "rgba(249,244,238,0.9)", fontWeight: "400" }}>Elena &amp; Sophie</strong>,
        diese Familientradition in die dritte Generation – persönlich, modern und mit derselben
        Leidenschaft für gutes Handwerk.
      </>
    ),
  },
];

function clamp(n: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, n));
}

export default function About({ site }: Props) {
  const trackRef = useRef<HTMLElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState(0);
  const [textKey, setTextKey] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const back = backRef.current;
    const side = sideRef.current;
    const mid = midRef.current;
    if (!track || !back || !side || !mid) return;

    let raf = 0;
    let lastChapter = -1;
    const mobileMq = window.matchMedia("(max-width: 1024px)");

    const apply = (progress: number) => {
      // Lange Plateaus: Helene → lange Clara → erst spät Elena & Sophie
      // Helene full: 0–0.26 | cross: 0.26–0.38
      // Clara  full: 0.38–0.74 | cross: 0.74–0.86
      // Sisters full: 0.86–1
      let f0 = 0;
      let f1 = 0;
      let f2 = 0;

      if (progress < 0.26) {
        f0 = 1;
      } else if (progress < 0.38) {
        const t = (progress - 0.26) / 0.12;
        f0 = 1 - t;
        f1 = t;
      } else if (progress < 0.74) {
        f1 = 1;
      } else if (progress < 0.86) {
        const t = (progress - 0.74) / 0.12;
        f1 = 1 - t;
        f2 = t;
      } else {
        f2 = 1;
      }

      const idx = progress < 0.34 ? 0 : progress < 0.8 ? 1 : 2;
      const m = mobileMq.matches;
      // ponytail: smaller deltas on mobile so collage stays in the stage
      const tx = m ? 0.55 : 1;
      const midBoost = m ? 0.55 : 0.95;

      // Helene (hinten rechts)
      back.style.opacity = String(0.2 + f0 * 0.8);
      back.style.transform = `translate(${(1 - f0) * 14 * tx}%, ${(1 - f0) * -8 * tx}%) scale(${0.7 + f0 * 0.55})`;
      back.style.zIndex = f0 > 0.45 ? "5" : "1";
      back.style.filter = `brightness(${0.5 + f0 * 0.5})`;

      // Clara (vorne links)
      side.style.opacity = String(0.18 + f1 * 0.82);
      side.style.transform = `translate(${(1 - f1) * -16 * tx}%, ${(1 - f1) * 10 * tx}%) scale(${0.66 + f1 * 0.58})`;
      side.style.zIndex = f1 > 0.45 ? "5" : "2";
      side.style.filter = `brightness(${0.5 + f1 * 0.5})`;

      // Elena & Sophie (Mitte) – am Ende am größten
      const midScale = 0.72 + f2 * midBoost;
      mid.style.opacity = String(0.22 + f2 * 0.78);
      mid.style.transform = `translate(${(1 - f2) * -6 * tx}%, ${(1 - f2) * 12 * tx - f2 * 10 * tx}%) scale(${midScale})`;
      mid.style.zIndex = f2 > 0.4 ? "6" : "3";
      mid.style.filter = `brightness(${0.55 + f2 * 0.45})`;

      if (idx !== lastChapter) {
        lastChapter = idx;
        setChapter(idx);
        setTextKey((k) => k + 1);
      }
    };

    const update = () => {
      raf = 0;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        apply(1);
        return;
      }
      const rect = track.getBoundingClientRect();
      const scrollable = track.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = scrollable > 0 ? clamp(scrolled / scrollable) : 0;
      apply(progress);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    mobileMq.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mobileMq.removeEventListener("change", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const active = CHAPTERS[chapter];

  return (
    <section
      ref={trackRef}
      id="about"
      className="salon-about-track"
      data-screen-label="Geschichte"
      style={{
        background: "#1A1410",
        height: "440vh",
        position: "relative",
      }}
    >
      <div
        className="salon-about-sticky"
        style={{
          position: "sticky",
          top: 0,
          height: "100dvh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          className="salon-section-pad salon-about-grid"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 80px",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
          }}
        >
          <div key={textKey} className="salon-about-copy" style={{ animation: "fadeUp 0.55s ease both" }}>
            <p
              className="salon-about-eyebrow"
              style={{
                fontSize: "11px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#C4674A",
                marginBottom: "20px",
                fontWeight: "400",
              }}
            >
              {active.eyebrow}
            </p>
            <h2
              className="salon-about-title"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "58px",
                fontWeight: "300",
                color: "#F9F4EE",
                lineHeight: "1.06",
                marginBottom: "28px",
                textWrap: "pretty",
              }}
            >
              {active.title}
            </h2>
            <div className="salon-about-rule" style={{ width: "40px", height: "1px", background: "#C4674A", marginBottom: "28px" }} />
            <p
              className="salon-about-body"
              style={{
                fontSize: "15px",
                fontWeight: "300",
                color: "rgba(249,244,238,0.66)",
                lineHeight: "1.8",
                marginBottom: "28px",
                maxWidth: "460px",
              }}
            >
              {active.body}
            </p>

            <div className="salon-about-dots" style={{ display: "flex", gap: "10px", marginBottom: "32px" }}>
              {CHAPTERS.map((_, i) => (
                <span
                  key={i}
                  aria-hidden
                  style={{
                    width: i === chapter ? "28px" : "8px",
                    height: "8px",
                    background: i === chapter ? "#C4674A" : "rgba(249,244,238,0.22)",
                    transition: "all 0.35s ease",
                  }}
                />
              ))}
            </div>

            {chapter === 2 && (
              <button
                type="button"
                onClick={site.openBooking}
                className="salon-btn-outline-accent salon-about-cta"
                style={{
                  background: "transparent",
                  color: "#C4674A",
                  border: "1px solid #C4674A",
                  padding: "14px 32px",
                  fontSize: "12px",
                  fontWeight: "400",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  animation: "fadeUp 0.45s ease 0.1s both",
                }}
              >
                Termin buchen
              </button>
            )}
          </div>

          <div
            className="salon-about-stage"
            style={{ position: "relative", height: "min(72vh, 580px)" }}
          >
            <div
              ref={backRef}
              className="salon-about-photo salon-about-photo-back"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "70%",
                height: "66%",
                backgroundImage: `url('${IMAGES.about[0]}')`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
                transformOrigin: "80% 20%",
                willChange: "transform, opacity, filter",
                zIndex: 1,
              }}
            />
            <div
              ref={sideRef}
              className="salon-about-photo salon-about-photo-side"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "50%",
                height: "54%",
                backgroundImage: `url('${IMAGES.about[1]}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "5px solid #1A1410",
                transformOrigin: "10% 90%",
                willChange: "transform, opacity, filter",
                zIndex: 2,
              }}
            />
            <div
              ref={midRef}
              className="salon-about-photo salon-about-photo-mid"
              style={{
                position: "absolute",
                top: "34%",
                left: "26%",
                width: "46%",
                height: "40%",
                backgroundImage: `url('${IMAGES.about[2]}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "5px solid #1A1410",
                transformOrigin: "50% 50%",
                willChange: "transform, opacity, filter",
                zIndex: 3,
                boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
