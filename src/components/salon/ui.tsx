"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/motion";

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M12 0c.5 6.4 5.6 11.5 12 12-6.4.5-11.5 5.6-12 12-.5-6.4-5.6-11.5-12-12C6.4 11.5 11.5 6.4 12 0Z" />
    </svg>
  );
}

export function Pill({
  children,
  className = "",
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] ${
        dark ? "border border-white/25 text-white/85" : "border border-line bg-white/50 text-ink/75"
      } ${className}`}
    >
      {children}
    </span>
  );
}

type BtnProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "dark" | "light" | "outline" | "outline-light" | "rose";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
};

const VARIANTS: Record<NonNullable<BtnProps["variant"]>, string> = {
  dark: "bg-ink text-paper",
  light: "bg-paper text-ink",
  rose: "bg-rose text-paper",
  outline: "border border-ink/20 text-ink",
  "outline-light": "border border-white/35 text-white",
};

const ICON_VARIANTS: Record<NonNullable<BtnProps["variant"]>, string> = {
  dark: "bg-paper text-ink",
  light: "bg-ink text-paper",
  rose: "bg-paper text-rose",
  outline: "bg-ink text-paper",
  "outline-light": "bg-white text-ink",
};

/**
 * Pill-Button mit magnetischem Hover und rollendem Label (GSAP quickTo).
 */
export function MagneticButton({
  children,
  onClick,
  variant = "dark",
  className = "",
  type = "button",
  disabled,
  ariaLabel,
}: BtnProps) {
  // Handler arbeiten mit currentTarget; GSAP-Tweens überschreiben sich per overwrite
  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    if (e.pointerType !== "mouse" || disabled) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    gsap.to(el, { x: x * 0.18, y: y * 0.3, duration: 0.5, ease: "power3.out", overwrite: "auto" });
    gsap.to(el.querySelector("[data-icon]"), { x: x * 0.08, y: y * 0.12, duration: 0.5, ease: "power3.out", overwrite: "auto" });
  };

  const onEnter = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const el = e.currentTarget;
    gsap.to(el.querySelectorAll("[data-roll]"), { yPercent: -100, duration: 0.55, ease: "expo.out", overwrite: true });
    gsap.to(el.querySelector("[data-icon] svg"), { rotate: 45, duration: 0.55, ease: "expo.out", overwrite: true });
  };

  const onLeave = (e: React.PointerEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1,0.4)", overwrite: "auto" });
    gsap.to(el.querySelector("[data-icon]"), { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1,0.4)", overwrite: "auto" });
    gsap.to(el.querySelectorAll("[data-roll]"), { yPercent: 0, duration: 0.55, ease: "expo.out", overwrite: true });
    gsap.to(el.querySelector("[data-icon] svg"), { rotate: 0, duration: 0.55, ease: "expo.out", overwrite: true });
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className={`group relative inline-flex h-12 items-center gap-3 rounded-full pl-6 pr-1.5 text-[13px] font-medium tracking-[0.02em] will-change-transform disabled:cursor-not-allowed disabled:opacity-40 ${VARIANTS[variant]} ${className}`}
    >
      <span className="relative block overflow-hidden leading-[1.3]">
        <span data-roll className="block">
          {children}
        </span>
        <span data-roll aria-hidden className="absolute left-0 top-full block">
          {children}
        </span>
      </span>
      <span
        data-icon
        className={`grid size-9 place-items-center rounded-full ${ICON_VARIANTS[variant]}`}
      >
        <ArrowIcon className="size-3.5" />
      </span>
    </button>
  );
}

/** Überschrift, deren Zeilen beim Scrollen aus einer Maske gleiten. */
export function RevealText({
  as: Tag = "h2",
  children,
  className = "",
  delay = 0,
  start = "top 85%",
}: {
  as?: "h1" | "h2" | "h3" | "p" | "div";
  children: React.ReactNode;
  className?: string;
  delay?: number;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = ref.current;
        if (!el) return;
        // SplitText teilt nach dem Laden der Webfonts neu auf (autoSplit)
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 110,
              rotate: 2,
              duration: 1.3,
              stagger: 0.09,
              delay,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start, once: true },
            });
          },
        });
        return () => split.revert();
      });
    },
    { scope: ref },
  );

  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}

