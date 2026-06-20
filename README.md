# Nestor Iriondo — Portfolio 2026

Marketing landing page for a Berlin web developer, built with **React + TypeScript + Vite**.

## Scripts

```bash
npm install     # install dependencies
npm run dev     # start the dev server (http://localhost:5173)
npm run build   # type-check (tsc) + production build to dist/
npm run preview # serve the production build locally
```

## Architecture

UI is separated from logic and content throughout:

```
src/
  main.tsx                # entry — mounts <App>
  App.tsx                 # composition root: wires theme + sections
  index.css               # global styles + CSS custom-property theme + responsive rules

  theme/
    themes.ts             # palettes, font pairings, hero layouts (pure data + types)
    useTheme.ts           # holds theme state, applies it as CSS vars on <html>

  hooks/
    useReveal.ts          # IntersectionObserver fade-up on scroll
    useScrolled.ts        # sticky-header scroll state
    useParallax.ts        # data-px parallax for the Software section

  data/
    content.ts            # site copy & structured content (nav, outcomes, offer, …)

  components/
    ui/                   # primitives: Icon, Placeholder, Decorations, ThemeSwitcher
    layout/               # Header, Footer
    sections/             # Hero, Angebot, Ueber, Kontakt
      arbeiten/           # case-study section (StickyCase + shared CaseParts)
      software/           # outcomes section (Gfx, OutcomeCard, Software)
    mockups/              # rendered (not image) website/app mockups used in case studies
```

### Theming

Colors and fonts are driven by CSS custom properties on `:root` (see `index.css`).
`useTheme` swaps them at runtime; the floating **ThemeSwitcher** (bottom-right) lets a
visitor preview palette, font pairing, and hero layout.

### Notes

- Styling stays inline (React style objects) + CSS variables, matching the original design.
- Components in `mockups/` such as `BeforeAfterSlider`, `FlipCard`, `KompassApp`, and
  `DispatchApp` are preserved showcase pieces that aren't mounted on the page yet — import
  them where needed.
