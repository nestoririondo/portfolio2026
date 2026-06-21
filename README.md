# Néstor Iriondo — Portfolio 2026

Marketing landing page for a Berlin web developer, built with **React + TypeScript + Vite**.

## Scripts

```bash
npm install      # install dependencies
npm run dev      # Vite (5173) + API server (3000) together — full local site
npm run dev:web  # just the Vite frontend (no contact form)
npm run build    # type-check (tsc) + production build to dist/
npm run start    # run the production server (serves dist/ + /api/contact)
npm run preview  # serve the static build with Vite's preview server
```

`npm run dev` runs the frontend and the Node API side by side; Vite proxies
`/api/*` to the server (see `vite.config.ts`), so the contact form works the
same locally as in production.

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

### Contact form

The Kontakt form POSTs JSON to `POST /api/contact`, handled by a small Express
server (`server/index.js`) that sends the message via [Resend](https://resend.com).
The same server also serves the built site from `dist/`, so the whole thing runs
as **one Node process** — no serverless platform required. The UI handles the
full round trip: loading (`Wird gesendet …`), success confirmation, and an error
state with a direct e-mail fallback.

Setup:

1. `cp .env.example .env.local` and add your `RESEND_API_KEY`.
2. Verify the `nestoririondo.com` domain in Resend so `hello@nestoririondo.com`
   can send (Resend authorizes the whole domain — the address doesn't need its
   own mailbox).
3. `npm run dev` — Vite proxies `/api` to the Express server, so the form works
   locally exactly as in production.

| Env var          | Required | Default                                   |
| ---------------- | -------- | ----------------------------------------- |
| `RESEND_API_KEY` | yes      | —                                         |
| `CONTACT_TO`     | no       | `hello@nestoririondo.com`                 |
| `CONTACT_FROM`   | no       | `Kontaktformular <hello@nestoririondo.com>` |
| `PORT`           | no       | `3000`                                    |

## Deployment (Hetzner + Dokploy)

The repo ships a `Dockerfile` (multi-stage: build → slim runtime). In Dokploy:

1. Create an **Application** from this Git repo, build type **Dockerfile**.
2. Under **Environment**, add `RESEND_API_KEY` (and any overrides above).
3. Set the container port to **3000** and point your domain at it; Dokploy's
   Traefik handles HTTPS.
4. Deploy. The container builds `dist/` and runs `node server/index.js`, serving
   both the site and the contact API on port 3000.

To run the production image locally:

```bash
docker build -t portfolio2026 .
docker run --rm -p 3000:3000 -e RESEND_API_KEY=re_xxx portfolio2026
```

### Notes

- Styling stays inline (React style objects) + CSS variables, matching the original design.
- Components in `mockups/` such as `BeforeAfterSlider`, `FlipCard`, `KompassApp`, and
  `DispatchApp` are preserved showcase pieces that aren't mounted on the page yet — import
  them where needed.
