import {
  useState,
  type CSSProperties,
  type FocusEvent,
  type FormEvent,
} from "react";
import { CONTACT } from "../../data/content";
import { Icon, type IconName } from "../ui/Icon";

const fieldStyle: CSSProperties = {
  width: "100%",
  padding: "13px 15px",
  borderRadius: 12,
  border: "1px solid var(--line)",
  background: "var(--paper)",
  color: "var(--ink)",
  outline: "none",
  transition: "border .2s, box-shadow .2s",
};

const labelStyle: CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  marginBottom: 7,
  display: "block",
  color: "var(--ink)",
};

type Field = HTMLInputElement | HTMLTextAreaElement;

function onFieldFocus(e: FocusEvent<Field>) {
  e.target.style.borderColor = "var(--accent)";
  e.target.style.boxShadow = "0 0 0 4px var(--accent-soft)";
}
function onFieldBlur(e: FocusEvent<Field>) {
  e.target.style.borderColor = "var(--line)";
  e.target.style.boxShadow = "none";
}

function ContactMethod({
  href,
  icon,
  label,
  external,
}: {
  href: string;
  icon: IconName;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className="contact-method"
    >
      <span className="contact-method-icon">
        <Icon name={icon} size={16} />
      </span>
      {label}
    </a>
  );
}

function TrustPoint({ icon, children }: { icon: IconName; children: string }) {
  return (
    <div className="contact-trust-point">
      <Icon name={icon} size={17} color="var(--accent)" />
      <span>{children}</span>
    </div>
  );
}

export function Kontakt() {
  const [requestSent, setRequestSent] = useState(false);

  const submitRequest = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = "Anfrage kostenloses Erstgespräch";
    const body = [
      `Name: ${name}`,
      `E-Mail: ${email}`,
      "",
      "Worum geht es?",
      message || "Bitte kurz im Erstgespräch klären.",
    ].join("\n");

    window.location.href = `${CONTACT.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setRequestSent(true);
  };

  return (
    <section
      id="kontakt"
      className="kontakt-band"
      style={{ padding: "clamp(72px,10vw,128px) 0 clamp(56px,7vw,96px)" }}
    >
      <div className="wrap">
        <div
          className="kontakt-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.05fr",
            gap: "clamp(30px,5vw,70px)",
            alignItems: "center",
          }}
        >
          <div
            className="kontakt-intro reveal"
            style={{ display: "flex", flexDirection: "column", gap: 26 }}
          >
            <span className="eyebrow">Kontakt</span>
            <div>
              <h2
                style={{
                  fontSize: "clamp(34px,5vw,56px)",
                  letterSpacing: "-.02em",
                  marginBottom: 18,
                }}
              >
                Lass uns reden.
              </h2>
              <p style={{ fontSize: 18.5, color: "var(--muted)", maxWidth: 430, lineHeight: 1.6 }}>
                Du brauchst kein fertiges Konzept – eine grobe Idee reicht. Im
                kostenlosen Erstgespräch sage ich dir ehrlich, ob und wie ich
                helfen kann.
              </p>
            </div>

            <div className="contact-trust">
              <TrustPoint icon="check">Antwort innerhalb von 24 Stunden</TrustPoint>
              <TrustPoint icon="phone">30 Minuten, unverbindlich</TrustPoint>
              <TrustPoint icon="pin">Berlin & remote</TrustPoint>
            </div>

            <div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--muted)",
                  marginBottom: 12,
                }}
              >
                Lieber direkt schreiben?
              </div>
              <div className="contact-methods">
                <ContactMethod
                  href={CONTACT.whatsappHref}
                  external
                  icon="whatsapp"
                  label="WhatsApp"
                />
                <ContactMethod
                  href={CONTACT.emailHref}
                  icon="mail"
                  label="E-Mail"
                />
                <ContactMethod
                  href={CONTACT.phoneHref}
                  icon="phone"
                  label="Anrufen"
                />
              </div>
            </div>
          </div>

          <div className="appointment-card reveal kontakt-pop">
            <div style={{ display: "grid", gap: 18 }}>
              {requestSent ? (
                <div style={{ marginBottom: 2 }}>
                  <span
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: 18,
                      background: "var(--accent)",
                      color: "#fff",
                      display: "grid",
                      placeItems: "center",
                      marginBottom: 16,
                    }}
                  >
                    <Icon name="check" size={26} stroke={2.4} />
                  </span>
                  <h3 style={{ fontSize: 27, marginBottom: 8 }}>Anfrage vorbereitet.</h3>
                  <p style={{ color: "var(--muted)", marginBottom: 18 }}>
                    Dein Mailprogramm sollte sich geöffnet haben. Schick die
                    Nachricht ab, dann melde ich mich persönlich bei dir.
                  </p>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    style={{ justifyContent: "center", width: "100%" }}
                    onClick={() => {
                      setRequestSent(false);
                    }}
                  >
                    Anfrage bearbeiten
                  </button>
                </div>
              ) : null}

              {!requestSent ? (
                <form onSubmit={submitRequest} style={{ display: "grid", gap: 14 }}>
                  <h3 style={{ fontSize: 23, marginBottom: 2 }}>
                    Schreib mir kurz.
                  </h3>
                  <div>
                    <label htmlFor="contact-name" style={labelStyle}>
                      Name
                    </label>
                    <input
                      id="contact-name"
                      required
                      name="name"
                      autoComplete="name"
                      style={fieldStyle}
                      onFocus={onFieldFocus}
                      onBlur={onFieldBlur}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" style={labelStyle}>
                      E-Mail
                    </label>
                    <input
                      id="contact-email"
                      required
                      name="email"
                      type="email"
                      autoComplete="email"
                      style={fieldStyle}
                      onFocus={onFieldFocus}
                      onBlur={onFieldBlur}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" style={labelStyle}>
                      Worum geht es? <span style={{ color: "var(--muted)" }}>(optional)</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      style={{ ...fieldStyle, resize: "vertical", minHeight: 126 }}
                      onFocus={onFieldFocus}
                      onBlur={onFieldBlur}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ justifyContent: "center", padding: "15px", marginTop: 4 }}
                  >
                    Erstgespräch anfragen <Icon name="arrow" size={18} />
                  </button>
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--muted)",
                      textAlign: "center",
                    }}
                  >
                    Deine Nachricht kommt direkt bei mir an – ganz persönlich, kein Automat.
                  </p>
                </form>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
