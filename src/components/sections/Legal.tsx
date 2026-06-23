import type { ReactNode } from "react";
import { CONTACT } from "../../data/content";

type LegalPageName = "impressum" | "datenschutz";

function LegalCard({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="legal-card">
      <span className="eyebrow">Rechtliches</span>
      <h2>{title}</h2>
      <div className="legal-copy">{children}</div>
    </section>
  );
}

const LEGAL_CONTENT: Record<LegalPageName, ReactNode> = {
  impressum: (
    <>
      <p>
        Angaben gemäß § 5 TMG
        <br />
        Néstor Iriondo
        <br />
        Webentwicklung & digitale Beratung
        <br />
        {CONTACT.location}
      </p>
      <p>
        E-Mail: <a href={CONTACT.emailHref}>{CONTACT.email}</a>
        <br />
        Telefon: <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
      </p>
      <p className="legal-note">
        Die vollständige ladungsfähige Anschrift und alle finalen Pflichtangaben
        bitte vor Veröffentlichung ergänzen.
      </p>
    </>
  ),
  datenschutz: (
    <>
      <p>
        Diese Website verarbeitet personenbezogene Daten, wenn du mich über das
        Kontaktformular, per E-Mail, Telefon oder WhatsApp kontaktierst.
      </p>
      <p>
        Die Angaben werden ausschließlich genutzt, um deine Anfrage zu beantworten
        und eine mögliche Zusammenarbeit vorzubereiten. Eine Weitergabe erfolgt
        nur, wenn sie technisch erforderlich ist oder gesetzlich verlangt wird.
      </p>
      <p className="legal-note">
        Die finale Datenschutzerklärung sollte mit den tatsächlich eingesetzten
        Diensten abgeglichen werden, zum Beispiel Hosting, Formularversand,
        Analyse oder eingebettete Inhalte.
      </p>
    </>
  ),
};

export function Legal({ page }: { page: LegalPageName }) {
  const title = page === "impressum" ? "Impressum" : "Datenschutz";

  return (
    <div className="legal-wrap legal-wrap--page">
      <div className="wrap legal-grid legal-grid--single">
        <LegalCard id={page} title={title}>
          {LEGAL_CONTENT[page]}
        </LegalCard>
      </div>
    </div>
  );
}
