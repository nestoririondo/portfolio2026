import { CONTACT } from "../../data/content";
import { useI18n, type Messages } from "../../i18n";

type LegalPageName = "impressum" | "datenschutz";

function LegalCard({
  id,
  title,
  page,
}: {
  id: string;
  title: string;
  page: Messages["legal"]["impressum"] | Messages["legal"]["datenschutz"];
}) {
  const { t } = useI18n();
  return (
    <section id={id} className="legal-card">
      <span className="eyebrow">{t.legal.eyebrow}</span>
      <h2>{title}</h2>
      <div className="legal-copy">
        {page.paragraphs.map((paragraph, i) => (
          <p key={i} className={i === page.paragraphs.length - 1 ? "legal-note" : undefined}>
            {paragraph.split("\n").map((line, lineIndex) => (
              <span key={lineIndex}>
                {line}
                {lineIndex < paragraph.split("\n").length - 1 ? <br /> : null}
              </span>
            ))}
            {id === "impressum" && i === 0 ? (
              <>
                <br />
                {CONTACT.location}
              </>
            ) : null}
            {id === "impressum" && i === 0 ? (
              <>
                <br />
                <br />
                {t.legal.emailLabel}: <a href={CONTACT.emailHref}>{CONTACT.email}</a>
                <br />
                {t.legal.phoneLabel}: <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
              </>
            ) : null}
          </p>
        ))}
      </div>
    </section>
  );
}

export function Legal({ page }: { page: LegalPageName }) {
  const { t } = useI18n();
  const legalPage = t.legal[page];

  return (
    <div className="legal-wrap legal-wrap--page">
      <div className="wrap legal-grid legal-grid--single">
        <LegalCard id={page} title={legalPage.title} page={legalPage} />
      </div>
    </div>
  );
}
