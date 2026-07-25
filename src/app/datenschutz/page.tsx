import type { Metadata } from "next";
import LegalLayout, { Section } from "@/components/legal/LegalLayout";
import { BRAND, LOCATIONS } from "@/lib/salon-data";

export const metadata: Metadata = {
  title: `Datenschutz | ${BRAND.name}`,
  description: `Datenschutzerklärung und Cookie-Informationen von ${BRAND.name} (Demo).`,
};

export default function DatenschutzPage() {
  return (
    <LegalLayout title="Datenschutzerklärung">
      <Section title="1. Verantwortliche Stelle">
        <p>
          {BRAND.name}
          <br />
          {LOCATIONS.lindenau.street}, {LOCATIONS.lindenau.zipCity}
          <br />
          E-Mail: {BRAND.email}
          <br />
          Telefon: {BRAND.phone}
        </p>
        <p style={{ marginTop: "12px", fontSize: "14px", opacity: 0.75 }}>
          Dies ist ein fiktives Demo-Referenzprojekt. Alle Angaben sind beispielhaft.
        </p>
      </Section>

      <Section title="2. Allgemeine Hinweise">
        <p>
          Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Wir verarbeiten Ihre Daten nur
          auf Grundlage der gesetzlichen Bestimmungen (DSGVO, BDSG, TTDSG).
        </p>
      </Section>

      <Section title="3. Terminbuchung">
        <p>
          Wenn Sie über unsere Website einen Termin anfragen, verarbeiten wir die von Ihnen
          eingegebenen Daten (Name, E-Mail, Telefon, gewählte Leistung, Standort, Datum und Uhrzeit)
          zur Bearbeitung Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
          (Vertragsanbahnung). Die Daten werden in einer Datenbank gespeichert und nur so lange
          aufbewahrt, wie es für die Terminabwicklung erforderlich ist.
        </p>
      </Section>

      <Section title="4. Cookies und Einwilligung (TTDSG)">
        <p style={{ marginBottom: "12px" }}>
          Unsere Website verwendet Cookies und vergleichbare Technologien. Beim ersten Besuch werden
          Sie über ein Cookie-Banner informiert und können Ihre Einwilligung erteilen oder verweigern.
        </p>
        <p style={{ marginBottom: "12px" }}>
          <strong style={{ color: "#1A1410", fontWeight: 400 }}>Notwendige Cookies:</strong> Speichern
          Ihrer Cookie-Einstellungen. Diese sind für den Betrieb der Website erforderlich und werden
          ohne separate Einwilligung gesetzt (§ 25 Abs. 2 Nr. 2 TTDSG).
        </p>
        <p style={{ marginBottom: "12px" }}>
          <strong style={{ color: "#1A1410", fontWeight: 400 }}>Statistik-Cookies:</strong> Werden nur
          nach Ihrer ausdrücklichen Einwilligung gesetzt (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1
          TTDSG). Sie helfen uns, die Nutzung der Website anonymisiert auszuwerten.
        </p>
        <p>
          <strong style={{ color: "#1A1410", fontWeight: 400 }}>Marketing-Cookies:</strong> Ebenfalls
          nur mit Einwilligung. Sie ermöglichen personalisierte Werbung auf Drittplattformen.
        </p>
        <p style={{ marginTop: "12px" }}>
          Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft über den Link
          „Cookie-Einstellungen“ im Footer widerrufen.
        </p>
      </Section>

      <Section title="5. Bilder">
        <p>
          Die auf dieser Website verwendeten Bilder sind KI-generiert und lokal gehostet. Es werden
          keine Bilder von externen Drittanbietern nachgeladen.
        </p>
      </Section>

      <Section title="6. Ihre Rechte">
        <p>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
          Datenübertragbarkeit und Widerspruch. Beschwerden können Sie bei der zuständigen
          Datenschutz-Aufsichtsbehörde einreichen.
        </p>
      </Section>

      <Section title="7. Stand">
        <p>Stand: Juli 2026</p>
      </Section>
    </LegalLayout>
  );
}
