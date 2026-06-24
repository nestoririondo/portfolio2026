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

type SubmitStatus = "idle" | "sending" | "sent" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Kontakt() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const isValid = name.trim() !== "" && EMAIL_RE.test(email.trim());

  const submitRequest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      company: String(data.get("company") ?? ""), // honeypot
    };

    setStatus("sending");
    try {
      const res = await fetch(CONTACT.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      form.reset();
      setName("");
      setEmail("");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
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
                Lieber direkt schreiben oder anrufen?
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
              {status === "sent" ? (
                <div className="confirm" style={{ marginBottom: 2 }}>
                  <span
                    className="confirm-badge"
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
                  <h3 className="confirm-item" style={{ fontSize: 27, marginBottom: 8, animationDelay: ".12s" }}>
                    Anfrage angekommen.
                  </h3>
                  <p className="confirm-item" style={{ color: "var(--muted)", marginBottom: 18, animationDelay: ".18s" }}>
                    Vielen Dank! Deine Nachricht ist bei mir gelandet. Ich melde
                    mich in ein bis zwei Tagen persönlich bei dir.
                  </p>
                  <button
                    type="button"
                    className="btn btn-ghost confirm-item"
                    style={{ justifyContent: "center", width: "100%", animationDelay: ".24s" }}
                    onClick={() => {
                      setStatus("idle");
                    }}
                  >
                    Neue Anfrage schreiben
                  </button>
                </div>
              ) : null}

              {status !== "sent" ? (
                <form onSubmit={submitRequest} style={{ display: "grid", gap: 14 }}>
                  <h3 style={{ fontSize: 23, marginBottom: 2 }}>
                    Schreib mir kurz.
                  </h3>
                  {/* Honeypot — hidden from users, catches bots. */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ display: "none" }}
                  />
                  <div>
                    <label htmlFor="contact-name" style={labelStyle}>
                      Name
                    </label>
                    <input
                      id="contact-name"
                      required
                      name="name"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                  {status === "error" ? (
                    <p
                      role="alert"
                      style={{
                        fontSize: 14,
                        lineHeight: 1.5,
                        color: "#b4452f",
                        background: "color-mix(in oklab,#b4452f 8%,transparent)",
                        border: "1px solid color-mix(in oklab,#b4452f 26%,transparent)",
                        borderRadius: 12,
                        padding: "11px 14px",
                      }}
                    >
                      Das hat gerade nicht geklappt. Versuch es bitte nochmal –
                      oder schreib mir direkt an{" "}
                      <a href={CONTACT.emailHref} style={{ color: "inherit", fontWeight: 600 }}>
                        {CONTACT.email}
                      </a>
                      .
                    </p>
                  ) : null}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={status === "sending" || !isValid}
                    aria-busy={status === "sending"}
                    style={{
                      justifyContent: "center",
                      padding: "15px",
                      marginTop: 4,
                      opacity: status === "sending" ? 0.65 : !isValid ? 0.5 : 1,
                      cursor:
                        status === "sending"
                          ? "wait"
                          : !isValid
                            ? "not-allowed"
                            : "pointer",
                    }}
                  >
                    {status === "sending" ? (
                      <>
                        <span className="spinner" aria-hidden="true" /> Wird gesendet …
                      </>
                    ) : (
                      <>
                        Erstgespräch anfragen <Icon name="arrow" size={18} />
                      </>
                    )}
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
