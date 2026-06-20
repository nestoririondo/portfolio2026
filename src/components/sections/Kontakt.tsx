import { useState, type CSSProperties, type FocusEvent, type FormEvent } from "react";
import { Icon } from "../ui/Icon";

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

export function Kontakt() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="kontakt"
      style={{ padding: "clamp(50px,7vw,100px) 0 clamp(40px,5vw,70px)" }}
    >
      <div className="wrap">
        <div
          className="reveal kontakt-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.05fr",
            gap: "clamp(30px,5vw,70px)",
            alignItems: "center",
            background: "var(--paper)",
            border: "1px solid var(--line)",
            borderRadius: 26,
            padding: "clamp(28px,4vw,56px)",
            boxShadow: "0 30px 70px -44px rgba(60,40,25,.4)",
          }}
        >
          <div>
            <span className="eyebrow">Kontakt</span>
            <h2 style={{ fontSize: "clamp(32px,4.5vw,52px)", margin: "14px 0 18px" }}>
              Lassen Sie uns reden.
            </h2>
            <p style={{ fontSize: 18, color: "var(--muted)", marginBottom: 26, maxWidth: 420 }}>
              Schreiben Sie mir kurz, was Sie sich vorstellen. Ich melde mich
              innerhalb von zwei Tagen.
            </p>
            <div style={{ display: "grid", gap: 12 }}>
              <a href="mailto:hallo@nestoririondo.de" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: "var(--accent-soft)",
                    color: "var(--accent)",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Icon name="mail" size={19} />
                </span>
                <span style={{ fontWeight: 600 }}>hallo@nestoririondo.de</span>
              </a>
              <a
                href="https://wa.me/491701234567"
                target="_blank"
                rel="noopener"
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <span
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: "rgba(37,211,102,.15)",
                    color: "#1aa84e",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Icon name="whatsapp" size={20} />
                </span>
                <span style={{ fontWeight: 600 }}>
                  WhatsApp{" "}
                  <span style={{ fontWeight: 500, color: "var(--muted)" }}>
                    · meist in Minuten
                  </span>
                </span>
              </a>
              <a href="tel:+491701234567" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: "var(--accent-soft)",
                    color: "var(--accent)",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Icon name="phone" size={19} />
                </span>
                <span style={{ fontWeight: 600 }}>+49 170 123 45 67</span>
              </a>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: "var(--accent-soft)",
                    color: "var(--accent)",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Icon name="pin" size={19} />
                </span>
                <span style={{ fontWeight: 600, color: "var(--muted)" }}>
                  Alt-Treptow, Berlin
                </span>
              </div>
            </div>
          </div>

          {sent ? (
            <div
              style={{
                display: "grid",
                placeItems: "center",
                textAlign: "center",
                minHeight: 280,
                gap: 14,
              }}
            >
              <span
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 99,
                  background: "var(--accent)",
                  color: "#fff",
                  display: "grid",
                  placeItems: "center",
                  boxShadow: "0 14px 34px -14px var(--accent)",
                }}
              >
                <Icon name="check" size={30} stroke={2.4} />
              </span>
              <h3 style={{ fontSize: 28 }}>Vielen Dank!</h3>
              <p style={{ color: "var(--muted)", maxWidth: 320 }}>
                Ihre Anfrage ist angekommen. Ich melde mich in ein bis zwei Tagen
                bei Ihnen.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: "grid", gap: 16 }}>
              <div
                className="form-row"
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
              >
                <div>
                  <label style={labelStyle}>Name</label>
                  <input
                    required
                    style={fieldStyle}
                    onFocus={onFieldFocus}
                    onBlur={onFieldBlur}
                    placeholder="Ihr Name"
                  />
                </div>
                <div>
                  <label style={labelStyle}>E-Mail</label>
                  <input
                    required
                    type="email"
                    style={fieldStyle}
                    onFocus={onFieldFocus}
                    onBlur={onFieldBlur}
                    placeholder="name@beispiel.de"
                  />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Worum geht es?</label>
                <textarea
                  required
                  rows={5}
                  style={{ ...fieldStyle, resize: "vertical" }}
                  onFocus={onFieldFocus}
                  onBlur={onFieldBlur}
                  placeholder="Ein paar Sätze zu Ihrem Unternehmen und was Sie sich wünschen…"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ justifyContent: "center", padding: "15px" }}
              >
                Anfrage senden <Icon name="arrow" size={18} />
              </button>
              <p style={{ fontSize: 13, color: "var(--muted)", textAlign: "center" }}>
                Kein Newsletter, kein Funnel. Nur eine ehrliche Antwort.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
