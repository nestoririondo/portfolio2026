# Plan: reposition hero + pricing (nestoririondo.com)

## Goal
The site currently leads with "desde 2.500 €" in two places. That anchors visitors at the price floor before they see any value, which undercuts the premium/functional positioning. Fix: remove the number from the hero, and replace the single price card with a three-tier range layout where the number appears last, in context.

Do **not** change the price *strategy* — 2.500 € stays as the entry floor. We're only changing *where and how* it's surfaced.

---

## Before you start (explore, don't assume)
1. Identify the framework and i18n setup. This is a Next.js site, likely with locale routing (DE · EN · ES). **Find where UI copy lives** — locale/translation files (e.g. `messages/`, `locales/`, `i18n/`, or `dictionaries/`). Do not hardcode strings into components if the site uses a translation system.
2. Locate the **hero component** (contains "Una web que trabaja por ti" and the two chips "DE · EN · ES" and "Precio fijo desde 2.500 €").
3. Locate the **pricing section component** (contains "WEB COMPLETA", "desde 2.500 €", and the "INCLUIDO DE SERIE" checklist).
4. Note the existing design tokens (colors, fonts, radii) so new markup matches. The palette is warm cream bg, terracotta accent (~#B06A44), Playfair Display serif headings, sans body, pill-shaped chips, rounded cards. **Reuse existing tokens/components — do not introduce new colors or fonts.**

Report what you found before editing, then proceed.

---

## Change 1 — Hero price chip
- **Remove the number** from the "Precio fijo desde 2.500 €" chip.
- Replace its text with a no-number reassurance line. Use: **`Precio fijo, sin sorpresas`** (keep the existing ✓ icon and chip styling).
- **Keep the `DE · EN · ES` chip unchanged** — it signals multilingual capability and adds value.
- Everything else in the hero stays as-is.

---

## Change 2 — Pricing section → three tiers
Replace the single "WEB COMPLETA / desde 2.500 €" card with a **three-tier layout**. Reuse the existing card styling; the middle tier is visually emphasized.

**Section heading** (leads with the typical range, not the floor):
- Eyebrow: `Inversión`
- Title: `Precios según lo que tu web debe hacer.`
- Subtext: `No vendo páginas, vendo resultados. El precio sube porque la web hace más por ti. **La mayoría de proyectos están entre 4.000 y 7.000 €.**`

**Tier 1 — Esencial** · price label: `desde 2.500 €`
Pitch: `Una web que ya trabaja: rápida, encontrable y lista para traerte consultas.`
- Diseño a medida, sin plantillas
- Rápida y optimizada para móvil
- **SEO para que te encuentren**
- **Captación de consultas** (formulario → email)
- Google Business y textos legales

**Tier 2 — Profesional** · badge: `Lo más habitual` · **visually emphasized** · price label: `4.000 – 7.000 €`
Pitch: `Más contenido, varios idiomas y funciones que gestionas tú mismo.`
- Todo lo de Esencial, y además…
- Varios idiomas (DE · EN · ES)
- **Editas textos e imágenes tú mismo** (CMS)
- **Reserva de citas** o flujo de consultas avanzado
- Estructura de contenido pensada para SEO

**Tier 3 — A medida** · price label: `desde 7.500 €`
Pitch: `Cuando la web es casi un programa: portales, paneles, integraciones.`
- **Portales de listados** (p. ej. inmobiliaria)
- Login / área de clientes / panel
- Integraciones con tus sistemas (CRM, APIs)
- Automatizaciones y lógica avanzada

**Below the tiers:**
- Note: `**Precio fijo, acordado en la primera conversación.** Cada proyecto se ajusta a lo que necesitas — estos rangos te dan una idea, no una factura.`
- Keep the existing CTA button (`Pedir primera llamada gratis →`) and the `Sin compromiso · Sin costes ocultos` trust line.

A static visual reference of the intended layout exists (three cards, middle one lifted + tinted terracotta + "Lo más habitual" badge, function-first bullet lists). Match that structure.

---

## Localization
If the site renders in multiple languages, **produce DE and EN equivalents of all new copy**, not just ES. Match the existing translation-file structure and key naming. Keep the tone: plain, confident, outcome-focused (mirror the existing "Una web que trabaja por ti" voice). Do not leave ES strings hardcoded in components.

Suggested DE/EN intent for the hero chip: DE `Festpreis, keine Überraschungen` / EN `Fixed price, no surprises`.

---

## Design constraints
- Reuse existing colors, fonts, spacing, and card/chip components. No new design tokens.
- Mobile-first: tiers stack vertically on mobile, three columns on wider screens, middle card emphasized.
- Preserve accessibility: visible keyboard focus on the CTA, sufficient contrast, respect `prefers-reduced-motion`.

## Out of scope — do not touch
- The property-listing integration, listing pages, or any data fetching.
- The portfolio/works section, testimonials, services, contact, or footer.
- Routing, SEO metadata, or the i18n machinery itself (only add/edit copy keys).

## Acceptance criteria
1. Hero shows **no price number**; the chip reads "Precio fijo, sin sorpresas" (localized). `DE · EN · ES` chip unchanged.
2. Pricing section shows **three tiers**, middle one emphasized with a "Lo más habitual" badge; section heading leads with the 4.000–7.000 € range.
3. "2.500 €" appears **only** as the "desde" floor inside Tier 1 — nowhere above it on the page.
4. All new copy exists in every supported locale; nothing hardcoded.
5. Existing design tokens reused; layout responsive and accessible.
6. No changes outside the hero and pricing section.