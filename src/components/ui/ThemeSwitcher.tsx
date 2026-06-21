import { useState } from "react";
import {
  ACCENT2_OPTIONS,
  FONT_PAIR_NAMES,
  THEMES,
  type FontPairName,
  type HeroLayout,
  type Palette,
  type ThemeState,
} from "../../theme/themes";

interface ThemeSwitcherProps {
  state: ThemeState;
  setPalette: (p: Palette) => void;
  setAccent2: (c: string) => void;
  setFontPair: (f: FontPairName) => void;
  setHeroLayout: (h: HeroLayout) => void;
}

/** A round color swatch used in the color-picker rows. */
function Swatch({
  color,
  bg,
  on,
  onClick,
  label,
}: {
  color: string;
  bg?: string;
  on: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      style={{
        flex: 1,
        height: 30,
        border: "none",
        cursor: "pointer",
        borderRadius: 8,
        background: bg
          ? `linear-gradient(135deg, ${color} 0 62%, ${bg} 62% 100%)`
          : color,
        boxShadow: on
          ? "0 0 0 2px var(--paper), 0 0 0 4px var(--ink)"
          : "inset 0 0 0 1px rgba(0,0,0,.08)",
        transition: "box-shadow .2s",
      }}
    />
  );
}

const FONT_LABELS: Record<FontPairName, string> = {
  editorial: "Editorial",
  modern: "Modern",
  warm: "Warm",
};

const HERO_LAYOUTS: { value: HeroLayout; label: string }[] = [
  { value: "split", label: "Split" },
  { value: "centered", label: "Zentriert" },
];

/** Segmented control used inside the panel. */
function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 2,
        padding: 3,
        background: "var(--bg)",
        border: "1px solid var(--line)",
        borderRadius: 999,
      }}
    >
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          style={{
            flex: 1,
            border: "none",
            cursor: "pointer",
            borderRadius: 999,
            padding: "6px 10px",
            fontSize: 12.5,
            fontWeight: 600,
            background: value === o.value ? "var(--accent)" : "transparent",
            color: value === o.value ? "#fff" : "var(--muted)",
            transition: "all .2s",
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Label({ children }: { children: string }) {
  return (
    <div
      style={{
        fontFamily: "var(--mono)",
        fontSize: 11,
        letterSpacing: ".1em",
        textTransform: "uppercase",
        color: "var(--muted)",
        marginBottom: 9,
      }}
    >
      {children}
    </div>
  );
}

export function ThemeSwitcher({
  state,
  setPalette,
  setAccent2,
  setFontPair,
  setHeroLayout,
}: ThemeSwitcherProps) {
  const [open, setOpen] = useState(false);
  const activeKey = state.palette[0].toLowerCase();

  return (
    <div
      style={{
        position: "fixed",
        right: 18,
        bottom: 18,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 12,
      }}
    >
      {open && (
        <div
          style={{
            width: 248,
            background: "var(--paper)",
            border: "1px solid var(--line)",
            borderRadius: 18,
            padding: 18,
            boxShadow: "0 24px 60px -28px rgba(60,40,25,.5)",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div>
            <Label>Hauptfarbe</Label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {THEMES.map((t) => (
                <div key={t.palette[0]} style={{ flex: "1 1 26px" }}>
                  <Swatch
                    color={t.palette[0]}
                    bg={t.palette[2]}
                    on={t.palette[0].toLowerCase() === activeKey}
                    onClick={() => setPalette(t.palette)}
                    label={`Hauptfarbe ${t.palette[0]}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <Label>Akzent</Label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {ACCENT2_OPTIONS.map((c) => (
                <div key={c} style={{ flex: "1 1 26px" }}>
                  <Swatch
                    color={c}
                    on={state.accent2.toLowerCase() === c.toLowerCase()}
                    onClick={() => setAccent2(c)}
                    label={`Akzentfarbe ${c}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <Label>Schrift</Label>
            <Segmented
              options={FONT_PAIR_NAMES.map((f) => ({ value: f, label: FONT_LABELS[f] }))}
              value={state.fontPair}
              onChange={setFontPair}
            />
          </div>
          <div>
            <Label>Hero</Label>
            <Segmented
              options={HERO_LAYOUTS}
              value={state.heroLayout}
              onChange={setHeroLayout}
            />
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Design anpassen"
        aria-expanded={open}
        style={{
          width: 48,
          height: 48,
          borderRadius: 999,
          border: "1px solid var(--line)",
          background: "var(--paper)",
          color: "var(--accent)",
          cursor: "pointer",
          display: "grid",
          placeItems: "center",
          boxShadow: "0 16px 40px -16px rgba(60,40,25,.5)",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {open ? (
            <g>
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </g>
          ) : (
            <g>
              <circle cx="13.5" cy="6.5" r="2.5" />
              <circle cx="6.5" cy="12" r="2.5" />
              <circle cx="16" cy="14" r="2.5" />
              <path d="M3 20c2-4 5-5 8-4M11 4C8 3 5 4 3 7" />
            </g>
          )}
        </svg>
      </button>
    </div>
  );
}
