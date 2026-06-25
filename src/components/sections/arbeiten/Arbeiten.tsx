import { useEffect, useState } from "react";
import { PhoneFrame } from "../../mockups/Frames";
import { Blob } from "../../ui/Decorations";
import { StickyCase } from "./StickyCase";
import { useI18n, type Messages } from "../../../i18n";

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden fill="currentColor">
    <path d="M8 5.5v13a1 1 0 0 0 1.54.84l9.5-6.5a1 1 0 0 0 0-1.68l-9.5-6.5A1 1 0 0 0 8 5.5z" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden fill="currentColor">
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
  </svg>
);

const ReplayIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 12a9 9 0 1 0 3-6.7" />
    <path d="M3 4v5h5" />
  </svg>
);

function BookingPhone({
  step,
  copy,
}: {
  step: number;
  copy: Messages["arbeiten"]["booking"];
}) {
  const selected = step >= 1;
  const sent = step >= 2;
  const slots = ["09:15", "10:30", "12:00", "14:30"];

  return (
    <PhoneFrame width={218}>
      <div
        style={{
          minHeight: "100%",
          background: "linear-gradient(180deg,#f8fbfb,#eaf3f5)",
          color: "#16323a",
          padding: "30px 14px 16px",
          fontFamily: "var(--font-body)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-head)",
            fontSize: 21,
            lineHeight: 1.05,
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          {copy.phoneTitle}
        </div>
        <div style={{ fontSize: 11.5, color: "#52666c", marginBottom: 14 }}>
          {copy.phoneSub}
        </div>
        <div
          style={{
            background: "#fff",
            border: "1px solid #dfeaec",
            borderRadius: 14,
            padding: 12,
            boxShadow: "0 18px 42px -30px rgba(20,60,70,.55)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "#2f7186",
              marginBottom: 9,
            }}
          >
            {copy.weekFree}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 5 }}>
            {copy.weekdays.map((d, i) => (
              <div
                key={d}
                style={{
                  textAlign: "center",
                  borderRadius: 9,
                  padding: "7px 0",
                  background: i === 2 ? "#2f7186" : "#eaf3f5",
                  color: i === 2 ? "#fff" : "#16323a",
                  fontSize: 10,
                  fontWeight: 700,
                }}
              >
                <div style={{ opacity: 0.75 }}>{d}</div>
                <div>{11 + i}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginTop: 10 }}>
            {slots.map((slot, i) => {
              const active = selected && i === 1;
              return (
                <div
                  key={slot}
                  style={{
                    textAlign: "center",
                    borderRadius: 9,
                    padding: "8px 0",
                    fontSize: 11,
                    fontWeight: 700,
                    border: `1px solid ${active ? "#e9b04e" : "#dfeaec"}`,
                    background: active ? "#fff7ea" : "#fff",
                    color: active ? "#9b6614" : "#16323a",
                    transform: active ? "scale(1.04)" : "none",
                    transition: "all .35s ease",
                  }}
                >
                  {slot}
                </div>
              );
            })}
          </div>
        </div>
        <div
          style={{
            marginTop: 10,
            background: sent ? "#5e8a72" : "#e9b04e",
            color: "#fff",
            borderRadius: 999,
            padding: "10px 12px",
            textAlign: "center",
            fontSize: 12,
            fontWeight: 800,
            boxShadow: sent ? "0 14px 32px -18px rgba(60,110,76,.7)" : "none",
            transition: "all .35s ease",
          }}
        >
          {sent ? copy.ctaSent : selected ? copy.ctaSelected : copy.ctaIdle}
        </div>
        <div
          style={{
            marginTop: 10,
            display: "grid",
            gap: 6,
            opacity: selected ? 1 : 0.35,
            transform: selected ? "translateY(0)" : "translateY(8px)",
            transition: "all .35s ease",
          }}
        >
          {copy.fields.map((x) => (
            <div
              key={x}
              style={{
                height: x === "Kurze Nachricht" ? 42 : 28,
                borderRadius: 8,
                background: "#fff",
                border: "1px solid #dfeaec",
                color: "#8b9a9e",
                fontSize: 10.5,
                padding: "7px 9px",
              }}
            >
              {x}
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

function BookingAdmin({
  active,
  copy,
}: {
  active: boolean;
  copy: Messages["arbeiten"]["booking"];
}) {
  return (
    <div
      style={{
        width: "min(100%, 520px)",
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid var(--line)",
        background: "#fff",
        boxShadow:
          "0 40px 90px -40px rgba(60,40,25,.5), 0 6px 16px -10px rgba(60,40,25,.25)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          padding: "9px 13px",
          background: "#efe9df",
          borderBottom: "1px solid #e6dccb",
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          {["#e0685a", "#e8b94c", "#5db469"].map((c) => (
            <span key={c} style={{ width: 10, height: 10, borderRadius: 99, background: c }} />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            maxWidth: 300,
            margin: "0 auto",
            fontFamily: "var(--mono)",
            fontSize: 11,
            color: "#9a8f7e",
            background: "#fffdf9",
            borderRadius: 7,
            padding: "4px 12px",
            textAlign: "center",
            border: "1px solid #ece5d8",
          }}
        >
          admin.buchung-demo.local
        </div>
        <div style={{ width: 52 }} />
      </div>
      <div style={{ padding: 22, background: "#fbfaf7" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            alignItems: "flex-start",
            marginBottom: 18,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-head)",
                fontSize: 25,
                lineHeight: 1.08,
                fontWeight: 600,
              }}
            >
              {copy.adminTitle}
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
              {copy.adminSub}
            </div>
          </div>
          <span
            style={{
              borderRadius: 999,
              background: "#e7f2ea",
              color: "#4f815f",
              fontSize: 11,
              fontWeight: 800,
              padding: "7px 10px",
            }}
          >
            {copy.adminLive}
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: ".92fr 1.08fr", gap: 14 }}>
          <div style={{ display: "grid", gap: 10 }}>
            {["10:30", "12:00", "14:30"].map((time, i) => (
              <div
                key={time}
                style={{
                  borderRadius: 12,
                  border: `1px solid ${active && i === 0 ? "#d59b81" : "#ece5d8"}`,
                  background: active && i === 0 ? "#fff7f2" : "#fff",
                  padding: "11px 12px",
                  boxShadow:
                    active && i === 0
                      ? "0 18px 34px -26px rgba(191,112,80,.7)"
                      : "none",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 800 }}>{time}</div>
                <div style={{ fontSize: 11.5, color: "var(--muted)" }}>
                  {i === 0 ? copy.statusWaiting : copy.statusFree}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              borderRadius: 14,
              border: "1px solid #ece5d8",
              background: "#fff",
              padding: 14,
              opacity: active ? 1 : 0.45,
              transform: active ? "translateY(0)" : "translateY(10px)",
              transition: "all .4s ease",
            }}
          >
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: 10,
              }}
            >
              {copy.requestLabel}
            </div>
            <div style={{ fontFamily: "var(--font-head)", fontSize: 20, lineHeight: 1.1 }}>
              {copy.requestTitle}
            </div>
            <div style={{ marginTop: 10, color: "var(--muted)", fontSize: 12.5, lineHeight: 1.45 }}>
              {copy.requestBody}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <span
                style={{
                  borderRadius: 999,
                  background: "var(--accent)",
                  color: "#fff",
                  fontSize: 11.5,
                  fontWeight: 800,
                  padding: "8px 11px",
                }}
              >
                {copy.accept}
              </span>
              <span
                style={{
                  borderRadius: 999,
                  border: "1px solid #ece5d8",
                  fontSize: 11.5,
                  fontWeight: 700,
                  padding: "8px 11px",
                }}
              >
                {copy.question}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingVisual({
  active,
  copy,
}: {
  active: number;
  copy: Messages["arbeiten"]["booking"];
}) {
  return (
    <div
      className="booking-visual"
      style={{
        position: "relative",
        minHeight: "min(600px, 68vh)",
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        borderRadius: 24,
        background:
          "linear-gradient(180deg, color-mix(in oklab,var(--paper) 72%,var(--accent-tint)), var(--bg))",
        border: "1px solid var(--line)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "12% 8% auto auto",
          width: "36%",
          aspectRatio: "1",
          borderRadius: "48% 52% 46% 54%",
          background: "color-mix(in oklab,var(--accent2) 13%,transparent)",
        }}
      />
      <Blob
        color="color-mix(in oklab,#e9b04e 22%,transparent)"
        style={{
          position: "absolute",
          width: "44%",
          left: "-8%",
          bottom: "-18%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          display: "grid",
          placeItems: "center",
        }}
      >
        <div
          className="booking-phone-layer"
          style={{
            position: "absolute",
            opacity: active < 2 ? 1 : 0,
            transform: active < 2 ? "translateX(-96px) scale(1)" : "translateX(-140px) scale(.94)",
            transition: "opacity .5s ease, transform .55s cubic-bezier(.2,.7,.2,1)",
          }}
        >
          <BookingPhone step={active} copy={copy} />
        </div>
        <div
          className="booking-admin-layer"
          style={{
            opacity: active === 2 ? 1 : 0,
            transform: active === 2 ? "translateX(54px) scale(1)" : "translateX(112px) scale(.96)",
            transition: "opacity .55s ease .12s, transform .6s cubic-bezier(.2,.7,.2,1) .12s",
          }}
        >
          <BookingAdmin active={active === 2} copy={copy} />
        </div>
      </div>
    </div>
  );
}

function BookingCase() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const { t } = useI18n();
  const copy = t.arbeiten.booking;

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setActive((cur) => (cur + 1) % copy.steps.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [copy.steps.length, playing]);

  const current = copy.steps[active];

  return (
    <div className="reveal" style={{ marginTop: "clamp(80px,10vw,140px)" }}>
      <div
        className="case-sticky"
        style={{
          display: "grid",
          gridTemplateColumns: "1.08fr .92fr",
          gap: "clamp(24px,4vw,56px)",
          alignItems: "center",
        }}
      >
        <BookingVisual active={active} copy={copy} />
        <div className="case-left">
          <h3 style={{ fontSize: "clamp(30px,4vw,48px)", marginBottom: 10 }}>
            {copy.title}
          </h3>
          <div className="case-meta">{copy.meta}</div>
          <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.6, marginBottom: 22 }}>
            {copy.body}
          </p>
          <div className="case-step is-active case-step--solo">
            <div
              key={current.n}
              className="case-step__swap"
              style={{ display: "flex", gap: 16, width: "100%" }}
            >
              <span className="case-step__num">{current.n}</span>
              <span>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    marginBottom: 6,
                  }}
                >
                  {current.label}
                </span>
                <strong
                  style={{
                    display: "block",
                    fontFamily: "var(--font-head)",
                    fontSize: 22,
                    fontWeight: 500,
                    marginBottom: 6,
                  }}
                >
                  {current.title}
                </strong>
                <span style={{ color: "var(--muted)", lineHeight: 1.55 }}>
                  {current.body}
                </span>
              </span>
            </div>
          </div>
          <div style={{ marginTop: 22 }}>
            <div className="case-progress" aria-hidden>
              <div
                className="case-progress__fill"
                style={{ width: `${((active + 1) / copy.steps.length) * 100}%` }}
              />
              {copy.steps.slice(1).map((_, i) => (
                <span
                  key={i}
                  className="case-progress__tick"
                  style={{ left: `${((i + 1) / copy.steps.length) * 100}%` }}
                />
              ))}
            </div>
            <div className="case-controls">
              <button
                type="button"
                className="case-ctrl"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? t.common.pause : t.common.play}
              >
                {playing ? <PauseIcon /> : <PlayIcon />}
              </button>
              <div className="case-dots">
                {copy.steps.map((step, i) => (
                  <button
                    key={step.n}
                    type="button"
                    className={"case-dot" + (active === i ? " is-active" : "")}
                    onClick={() => {
                      setActive(i);
                      setPlaying(false);
                    }}
                    aria-label={`${step.n} · ${step.title}`}
                    aria-current={active === i ? "step" : undefined}
                  />
                ))}
              </div>
              <button
                type="button"
                className="case-ctrl"
                onClick={() => {
                  setActive(0);
                  setPlaying(true);
                }}
                aria-label={t.common.replay}
              >
                <ReplayIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Arbeiten() {
  const { t } = useI18n();
  return (
    <section id="arbeiten" style={{ padding: "clamp(64px,9vw,120px) 0" }}>
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: "clamp(24px,3.5vw,40px)" }}>
          <span className="eyebrow">{t.arbeiten.eyebrow}</span>
        </div>
        <StickyCase />
        <BookingCase />
      </div>
    </section>
  );
}
