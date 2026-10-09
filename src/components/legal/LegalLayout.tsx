import Link from "next/link";
import LegalPageFooter from "@/components/cookie/LegalPageFooter";
import { BRAND } from "@/lib/salon-data";

export default function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper">
      <header className="px-3 pt-3 sm:px-5 sm:pt-4">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between rounded-full border border-white/70 bg-white/65 px-5 shadow-[0_20px_50px_-30px_rgba(60,30,30,0.35)] backdrop-blur-xl">
          <Link href="/" className="font-serif text-[22px] leading-none tracking-tight">
            Salon <em className="text-rose">Liora</em>
          </Link>
          <Link href="/" className="rounded-full px-4 py-2 text-[13px] text-ink/70 hover:bg-ink/5 hover:text-ink">
            ← Zur Startseite
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-[760px] px-6 pb-24 pt-20">
        <p className="eyebrow mb-4 text-rose">Rechtliches</p>
        <h1 className="mb-12 font-serif text-[clamp(3rem,8vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">{title}</h1>
        <div className="text-[15px] leading-[1.85] text-muted [&_a]:text-rose [&_a]:underline [&_a]:underline-offset-4">
          {children}
        </div>
        <LegalPageFooter />
      </main>
      <footer className="px-6 pb-8 text-center text-xs text-muted">© 2026 {BRAND.name}. Demo-Referenzprojekt.</footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 font-serif text-3xl text-ink">{title}</h2>
      {children}
    </section>
  );
}

export { Section };
