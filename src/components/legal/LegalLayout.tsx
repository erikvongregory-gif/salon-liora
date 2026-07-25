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
    <div style={{ background: "#F9F4EE", minHeight: "100vh" }}>
      <header
        style={{
          borderBottom: "1px solid #E5DDD4",
          padding: "24px 48px",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            fontSize: "22px",
            fontWeight: 400,
            color: "#1A1410",
            textDecoration: "none",
            letterSpacing: "0.02em",
          }}
        >
          ← {BRAND.name}
        </Link>
      </header>
      <main
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "64px 24px 96px",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#C4674A",
            marginBottom: "16px",
          }}
        >
          Rechtliches
        </p>
        <h1
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            fontSize: "48px",
            fontWeight: 300,
            color: "#1A1410",
            marginBottom: "40px",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h1>
        <div
          style={{
            fontSize: "15px",
            fontWeight: 300,
            color: "#7A6A60",
            lineHeight: 1.85,
          }}
        >
          {children}
        </div>
        <LegalPageFooter />
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "36px" }}>
      <h2
        style={{
          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
          fontSize: "26px",
          fontWeight: 400,
          color: "#1A1410",
          marginBottom: "14px",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export { Section };
