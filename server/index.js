import express from "express";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { Resend } from "resend";

/**
 * Single Node process for self-hosting (Hetzner + Dokploy):
 *   - POST /api/contact   → sends the contact form via Resend
 *   - everything else      → serves the built Vite app from ../dist (SPA)
 *
 * Env vars (set in Dokploy → Environment, or .env.local for local dev):
 *   RESEND_API_KEY  (required)
 *   CONTACT_TO      default: hello@nestoririondo.com
 *   CONTACT_FROM    default: Kontaktformular <hello@nestoririondo.com>
 *   PORT            default: 3000
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "../dist");

const PORT = process.env.PORT || 3000;
const TO = process.env.CONTACT_TO ?? "hello@nestoririondo.com";
const FROM = process.env.CONTACT_FROM ?? "Kontaktformular <hello@nestoririondo.com>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "16kb" }));

app.post("/api/contact", async (req, res) => {
  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: "E-Mail-Versand ist nicht konfiguriert." });
  }

  const body = req.body ?? {};

  // Honeypot: real users never fill this hidden field.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return res.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !EMAIL_RE.test(email)) {
    return res.status(422).json({ error: "Bitte Name und eine gültige E-Mail angeben." });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: `Anfrage Erstgespräch — ${name}`,
    text: [
      `Name: ${name}`,
      `E-Mail: ${email}`,
      "",
      "Worum geht es?",
      message || "(keine Angabe)",
    ].join("\n"),
    html: `
      <h2 style="margin:0 0 16px">Neue Anfrage über das Kontaktformular</h2>
      <p><strong>Name:</strong> ${esc(name)}</p>
      <p><strong>E-Mail:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
      <p><strong>Worum geht es?</strong><br>${
        message ? esc(message).replace(/\n/g, "<br>") : "(keine Angabe)"
      }</p>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return res.status(502).json({ error: "E-Mail konnte nicht gesendet werden." });
  }

  return res.json({ ok: true });
});

// Serve the built frontend + SPA fallback (so deep links work).
app.use(express.static(DIST));
app.get(/.*/, (_req, res) => res.sendFile(path.join(DIST, "index.html")));

app.listen(PORT, () => {
  console.log(`▶ Server listening on http://localhost:${PORT}`);
});
