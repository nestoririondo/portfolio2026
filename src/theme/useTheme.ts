import { useEffect, useState } from "react";
import {
  DEFAULT_THEME,
  FONT_PAIRS,
  THEMES,
  type FontPairName,
  type HeroLayout,
  type Palette,
  type ThemeState,
} from "./themes";

/**
 * Owns the active theme state and applies it to the document as CSS custom
 * properties on <html>. Returns the current state plus typed setters so UI
 * (the ThemeSwitcher) stays free of styling logic.
 */
export function useTheme() {
  const [state, setState] = useState<ThemeState>(DEFAULT_THEME);

  const theme =
    THEMES.find(
      (t) => t.palette[0].toLowerCase() === state.palette[0].toLowerCase(),
    ) ?? THEMES[0];
  const pair = FONT_PAIRS[state.fontPair] ?? FONT_PAIRS.editorial;

  useEffect(() => {
    const root = document.documentElement.style;
    const vars = {
      ...theme.vars,
      // The secondary accent is its own axis — it wins over the theme's default.
      "--accent2": state.accent2,
      "--font-head": pair.head,
      "--font-body": pair.body,
    };
    Object.entries(vars).forEach(([k, v]) => root.setProperty(k, v));
  }, [theme, pair, state.accent2]);

  const setPalette = (palette: Palette) =>
    setState((s) => ({ ...s, palette }));
  const setAccent2 = (accent2: string) =>
    setState((s) => ({ ...s, accent2 }));
  const setFontPair = (fontPair: FontPairName) =>
    setState((s) => ({ ...s, fontPair }));
  const setHeroLayout = (heroLayout: HeroLayout) =>
    setState((s) => ({ ...s, heroLayout }));

  return { state, setPalette, setAccent2, setFontPair, setHeroLayout };
}
