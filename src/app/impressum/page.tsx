import type { Metadata } from "next";
import LegalLayout, { Section } from "@/components/legal/LegalLayout";
import { BRAND, LOCATIONS } from "@/lib/salon-data";

export const metadata: Metadata = {
  title: `Impressum | ${BRAND.name}`,
  description: `Impressum von ${BRAND.name} (Demo-Referenzprojekt).`,
};

export default function ImpressumPage() {
  return (
    <LegalLayout title="Impressum">
      <Section title="Angaben gemäß § 5 TMG">
        <p>
          {BRAND.name}
          <br />
          Elena &amp; Sophie Muster
          <br />
          {LOCATIONS.lindenau.street}
          <br />
          {LOCATIONS.lindenau.zipCity}
        </p>
        <p style={{ marginTop: "12px", fontSize: "14px", opacity: 0.75 }}>
          Dies ist ein fiktives Demo-Referenzprojekt. Alle Angaben sind beispielhaft.
        </p>
      </Section>

      <Section title="Kontakt">
        <p>
          Telefon: {BRAND.phone}
          <br />
          E-Mail: {BRAND.email}
        </p>
      </Section>

      <Section title="Zweiter Standort">
        <p>
          {LOCATIONS.seetal.street}
          <br />
          {LOCATIONS.seetal.zipCity}
        </p>
      </Section>

      <Section title="Umsatzsteuer-ID">
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
          <br />
          DE000000000 (Demo)
        </p>
      </Section>

      <Section title="Verantwortlich für den Inhalt">
        <p>
          Verantwortlich gemäß § 55 Abs. 2 RStV:
          <br />
          Elena &amp; Sophie Muster, {LOCATIONS.lindenau.street}, {LOCATIONS.lindenau.zipCity}
        </p>
      </Section>

      <Section title="Streitschlichtung">
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit. Wir
          sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </Section>
    </LegalLayout>
  );
}
