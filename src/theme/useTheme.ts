import { useEffect } from "react";
import {
  DEFAULT_THEME,
  FONT_PAIRS,
  THEMES,
  type ThemeState,
} from "./themes";

/**
 * Owns the active theme state and applies it to the document as CSS custom
 * properties on <html>.
 */
export function useTheme() {
  const state: ThemeState = DEFAULT_THEME;

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

  return { state };
}
