# Freelance Client Flow, Pricing & Payments

A reference for handling client projects — from first contact to final payment.
The whole system is two money gates that sandwich the work.

---

## The money checkpoints (the core rule)

```
Price quoted   →  in the written proposal, AFTER a discovery call (never during)
50% deposit    →  with the contract, BEFORE any work starts
50% balance    →  after approval, BEFORE launch / handover
```

**Two hard rules that prevent ~90% of freelance horror stories:**
- **Deposit before work.** No design sketch, no mockup, nothing until the deposit clears.
- **Balance before launch.** Final payment clears before you hand over the live site,
  repo, domains, or deploy to their account. This is your only leverage — once they
  have everything, you have none.

---

## The full flow, step by step

### 1. Discovery call (free, ~30 min)
Understand what they want: scope, deadline, budget range. **Don't quote yet.**
Goal: find out if it's a real project and whether you want it.

### 2. Send proposal + price  ← this is when the price goes out
After the call, in writing. Include: scope, deliverables, what's included, what's
**not** included, timeline, number of revision rounds, and the price.
Price the **project** (fixed fee), not hourly — clients fear an open meter, and you
get rewarded for being fast.

### 3. Client agrees → contract + 50% deposit  ← upfront charge
> No work starts until the deposit clears.

Send the contract (scope + payment terms + IP transfers on final payment) together
with the 50% invoice. The deposit filters out non-serious clients and means if they
vanish, you're not at zero.

### 4. Design phase (claude.ai/design)
Now the deposit-protected work begins. Sketch 1–2 directions, show via screenshot,
client picks one. Lock the direction before coding. Showing a visual within days of
the deposit reassures a nervous client fast.

### 5. Build phase (in code)
Real React app in your repo. Share a **deployed preview URL** (e.g. Vercel) for
revisions. Revision rounds are **capped** in the proposal (e.g. "2 rounds included,
extra rounds €X") — otherwise "just one more tweak" eats your margin forever.

### 6. Final approval → remaining 50% invoice → then ship
> Final payment clears before launch / before handing over code, domains, or deploys.

### 7. Handover + optional maintenance retainer
Transfer the repo/deploy, send docs. Offer a monthly retainer for updates —
recurring income beats chasing new projects.

---

## Flow at a glance

```
1. Discovery questionnaire   →  understand the job
2. Proposal                  →  quote the price
3. Contract        ┐
4. Deposit invoice ┘  50%     →  💰 GATE 1 — before any work
   ── design → build ──
6. Balance invoice            →  💰 GATE 2 — before launch/handover
7. Handover doc               →  deliver + offer retainer
```

---

## Documents you need, in order

| # | Document | When | Job |
|---|----------|------|-----|
| 1 | Discovery questionnaire | Before quoting | Goals, scope, deadline, budget, examples they like |
| 2 | Proposal | After discovery | Scope, deliverables, timeline, revisions, price, exclusions |
| 3 | Contract / agreement | With deposit invoice | Payment terms, revision cap, IP transfer, cancellation |
| 4 | Deposit invoice (50%) | Money gate 1 | Before any work — Stripe generates this |
| 6 | Balance invoice (50%) | Money gate 2 | After approval, before launch — Stripe generates this |
| 7 | Handover doc | At delivery | What was delivered, access, transfer, retainer offer |

**Optional, later:**
- **Change-order form** — prices work beyond agreed scope so "one more thing" gets billed.
- **Testimonial request** — short email after delivery to collect portfolio social proof.

---

## Pricing rules (hard-won)

- **Deposit before work, balance before launch.** The two gates above.
- **Fixed price, not hourly** — clients prefer a known number; you're rewarded for speed.
- **Cap revisions in writing.** Unlimited revisions turns fixed-price into minimum-wage.
- **IP/ownership transfers on final payment** — state it in the contract. The site is
  yours until paid in full.
- **Bigger projects (3+ months) → thirds:** 33% upfront / 33% at midpoint milestone /
  34% on completion, so you never carry too much unpaid work.
- **Everything in writing**, even just an email reply saying "agreed."

---

## Why clients pay upfront before seeing a clickable thing

They're not paying blind — by deposit time they've already seen:
- **Your portfolio** — real, shipped, clickable proof you can deliver.
- **A discovery conversation** where you understood their problem.
- **A written proposal** — they know exactly what they're buying.

The deposit gives **both sides skin in the game**: they're committed so you're safe to
start; their money is on the line so you're committed to deliver. A serious client
expects this — refusing *any* upfront payment is a red flag.

**De-risk it for a nervous first-time client:**
- 50% not 100% — they only risk half until they see progress.
- Show the design direction within days — fast proof.
- Milestones (33/33/34) on bigger jobs — they pay as they see progress.
- A clear contract with cancellation terms.
- Lean on your portfolio — a live site does more than any reassurance.

Mindset: you're not a vending machine. You're a professional being engaged for a
project. Deposits are the norm in professional services (architects, lawyers,
contractors). The awkwardness is first-timer nerves on your side, not a client objection.

---

## Zero-cost tool stack

| Need | Tool | Why |
|------|------|-----|
| Proposal | **Canva** (free template) | Good-looking, client-facing |
| Contract + e-sign | **Bonsai free template** + **Documenso** | Free, you own it, legally signed |
| Deposit + balance invoices | **Stripe Invoicing** | Free (pay per transaction), you see payment clear |
| Project tracking | **Notion** | One board, money-stage per client |
| Learn real costs | **Toggl** (free) | Track hours even on fixed price → price better next time |

EU note: once income is real, **Holded** or **Quaderno** handle EU VAT/IVA and
compliant invoices. **Wise** for low-fee international payments.

**Upgrade trigger:** only consolidate into a paid all-in-one (Bonsai / Holded) once
you're juggling 3+ clients and the admin actually hurts. Don't pay before the pain.

---

## Don't build your own proposal/invoice app (yet)

Your product is client websites, not admin software. Stripe/Bonsai have hardened
payment security, tax/VAT compliance, e-signature legal validity, and deliverability
over years — DIY gets the high-stakes parts subtly wrong.

It only makes sense to build when: (1) it becomes a real **product** you'd sell to
other freelancers (validate demand first), or (2) it's a **portfolio showcase** piece
— but keep real payments on Stripe. Build the thing you're paid for; buy the plumbing.
