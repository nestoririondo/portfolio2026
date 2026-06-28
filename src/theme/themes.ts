/**
 * Theme definitions for the site: color palettes, font pairings and hero layout.
 * Pure data + types — no React. Consumed by `useTheme`.
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
 * Four calm, modern palettes. Each is fully self-contained: it carries its own
 * cool/neutral background, paper, ink and line tones so the site never reads as
 * warm-on-warm (the old "too red / monochromatic" problem) or techy-dark.
 */
const theme = (vars: CssVars): Theme => ({
  palette: [vars["--accent"], vars["--ink"], vars["--bg"]],
  vars,
});

export const THEMES: Theme[] = [
  // 1 · Terracotta «Clay» — the recommended fix. True burnt-clay accent (more
  //     orange + chroma than the old rose #b9826f, so tints read warm-earth not
  //     pink) sitting on a near-neutral greige ground, sage second for contrast.
  theme({
    "--bg": "#f3f2ef",
    "--paper": "#fdfcfa",
    "--ink": "#2c2a26",
    "--muted": "#756f64",
    "--line": "#e6e2da",
    "--ph-bg": "#ebe5db",
    "--accent": "#bf7050",
    "--accent2": "#5e8a72",
  }),
  // 2 · Terracotta «Sienna» — deeper, punchier burnt-sienna for more tonal
  //     contrast against the page (kills the flat/monotone feel via depth).
  theme({
    "--bg": "#f3f2ef",
    "--paper": "#fdfcf9",
    "--ink": "#2b2925",
    "--muted": "#746e63",
    "--line": "#e6e1d9",
    "--ph-bg": "#ebe4da",
    "--accent": "#b65f3e",
    "--accent2": "#5e8a72",
  }),
  // 3 · Terracotta «Soft» — closest to the original mood but corrected: a hair
  //     more saturated/orange so it stays clay rather than drifting to dusty pink.
  theme({
    "--bg": "#f4f3ef",
    "--paper": "#fdfcfa",
    "--ink": "#2d2b27",
    "--muted": "#767065",
    "--line": "#e8e3da",
    "--ph-bg": "#ede6dc",
    "--accent": "#c17a5e",
    "--accent2": "#5e8a72",
  }),
  // 4 · Teal & Amber — fresh deep teal on a barely-warm neutral, amber pop.
  theme({
    "--bg": "#f2f4f3",
    "--paper": "#fcfdfc",
    "--ink": "#262b2a",
    "--muted": "#6e736f",
    "--line": "#e1e6e3",
    "--ph-bg": "#e6ece8",
    "--accent": "#0f7d74",
    "--accent2": "#d99a3e",
  }),
  // 5 · Mustard & Slate — warm ochre-mustard on greige, cool slate-blue second.
  theme({
    "--bg": "#f5f4ee",
    "--paper": "#fdfcf8",
    "--ink": "#2c2b26",
    "--muted": "#757066",
    "--line": "#e7e4d8",
    "--ph-bg": "#ece7d9",
    "--accent": "#bd8a2c",
    "--accent2": "#3b6ea0",
  }),
  // 6 · Golden Mustard & Pine — brighter golden mustard, deep-green second.
  theme({
    "--bg": "#f5f4ed",
    "--paper": "#fdfcf7",
    "--ink": "#2c2a25",
    "--muted": "#746f64",
    "--line": "#e8e4d6",
    "--ph-bg": "#ede8d7",
    "--accent": "#cc9a32",
    "--accent2": "#2e6f5b",
  }),
];

/**
 * Curated secondary-accent (`--accent2`) options. This axis is independent of
 * the primary palette so the switcher can mix any main color with any accent.
 * Each palette's own `--accent2` is included here so its default reads as active.
 */
export const ACCENT2_OPTIONS: string[] = [
  "#c98a3c", // Honig — amber
  "#c2735a", // Terrakotta — clay
  "#d99a3e", // Bernstein — gold-amber
  "#5e8a72", // Salbei — sage-green
  "#3b6ea0", // Schieferblau — slate-blue
  "#b9826f", // Terrakotta — clay
];

export interface ThemeState {
  palette: Palette;
  accent2: string;
  fontPair: FontPairName;
  heroLayout: HeroLayout;
}

export const DEFAULT_THEME: ThemeState = {
  palette: THEMES[0].palette,
  accent2: THEMES[0].vars["--accent2"],
  fontPair: "modern",
  heroLayout: "split",
};
