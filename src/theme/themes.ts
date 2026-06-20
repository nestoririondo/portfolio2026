/**
 * Theme definitions for the site: color palettes, font pairings and hero layout.
 * Pure data + types — no React. Consumed by `useTheme` and the ThemeSwitcher UI.
 */

export type CssVars = Record<string, string>;

export interface FontPair {
  head: string;
  body: string;
}

export type FontPairName = "editorial" | "modern" | "warm";

export const FONT_PAIRS: Record<FontPairName, FontPair> = {
  editorial: {
    head: '"Newsreader", Georgia, serif',
    body: '"Hanken Grotesk", system-ui, sans-serif',
  },
  modern: {
    head: '"Spectral", Georgia, serif',
    body: '"DM Sans", system-ui, sans-serif',
  },
  warm: {
    head: '"Fraunces", Georgia, serif',
    body: '"Figtree", system-ui, sans-serif',
  },
};

export const FONT_PAIR_NAMES = Object.keys(FONT_PAIRS) as FontPairName[];

export type HeroLayout = "split" | "centered";

/** A theme's `palette` is [accent, ink, bg] — it drives the swatch in the switcher. */
export type Palette = [string, string, string];

export interface Theme {
  palette: Palette;
  vars: CssVars;
}

/**
 * Calm beige base with muted pastel accents. Soft cream neutrals; accents are
 * dusty pastels — desaturated enough to stay calm, deep enough to carry white
 * button text.
 */
const NEUTRAL: CssVars = {
  "--ink": "#2c2a26",
  "--paper": "#fffdfa",
  "--muted": "#766f64",
  "--line": "#e9e3d6",
  "--ph-bg": "#efeade",
  "--bg": "#f7f4ec",
  "--accent2": "#8a93a8",
};

const pastel = (accent: string, over: CssVars = {}): Theme => ({
  palette: [accent, "#2c2a26", "#f7f4ec"],
  vars: { ...NEUTRAL, "--accent": accent, ...over },
});

export const THEMES: Theme[] = [
  pastel("#7d9a83", { "--accent2": "#8a93a8" }), // Salbei — sage
  pastel("#7791a9", { "--accent2": "#8f9c87" }), // Nebelblau — dusty blue
  pastel("#9087a6", { "--accent2": "#8a9fa0" }), // Lavendel — soft lavender
  pastel("#b08894", { "--accent2": "#8a9fa0" }), // Altrosa — dusty rose
  pastel("#6f9a93", {
    "--bg": "#f4f3ee",
    "--ph-bg": "#e9ece6",
    "--accent2": "#9b8fa6",
  }), // Eukalyptus
  pastel("#a8927a", {
    "--bg": "#f8f4ec",
    "--ph-bg": "#efe9dc",
    "--accent2": "#8a9fa0",
  }), // Sand — soft taupe
];

export interface ThemeState {
  palette: Palette;
  fontPair: FontPairName;
  heroLayout: HeroLayout;
}

export const DEFAULT_THEME: ThemeState = {
  palette: ["#7d9a83", "#2c2a26", "#f7f4ec"],
  fontPair: "modern",
  heroLayout: "split",
};
