"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/motion";

/**
 * Weicher Cursor-Begleiter für Maus-Geräte. Elemente mit `data-cursor="Text"`
 * lassen ihn zu einem Label-Kreis anwachsen.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
      const xTo = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" });
      let active = "";

      const onMove = (e: PointerEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
        const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
        const next = target?.dataset.cursor ?? "";
        if (next !== active) {
          active = next;
          setLabel(next);
          gsap.to(el, {
            scale: next ? 1 : 0.14,
            autoAlpha: next ? 1 : 0.9,
            duration: 0.6,
            ease: "expo.out",
          });
        }
      };
      const onLeave = () => gsap.to(el, { autoAlpha: 0, duration: 0.3 });
      const onEnter = () => gsap.to(el, { autoAlpha: active ? 1 : 0.9, duration: 0.3 });

      gsap.set(el, { scale: 0.14 });
      window.addEventListener("pointermove", onMove);
      document.documentElement.addEventListener("pointerleave", onLeave);
      document.documentElement.addEventListener("pointerenter", onEnter);
      return () => {
        window.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("pointerleave", onLeave);
        document.documentElement.removeEventListener("pointerenter", onEnter);
      };
    });
  });

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[900] grid size-24 place-items-center rounded-full bg-rose text-center text-[11px] font-medium uppercase tracking-[0.16em] text-paper opacity-0 mix-blend-normal"
    >
      <span className={label ? "opacity-100" : "opacity-0"}>{label}</span>
    </div>
  );
}
