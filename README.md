# Groupe Lipanda FAMILY — Site institutionnel

« Du génie intarissable »

Site Next.js 15 pour le Groupe Lipanda FAMILY SASU (Kinshasa, R.D. Congo).

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (zero-config via `@theme` in `globals.css`)
- **Framer Motion** for subtle editorial reveals
- **IBM Plex Sans** (body) + **Fraunces** (display) + **IBM Plex Mono** (labels)
- **lucide-react** for icons
- **react-hook-form** + **zod** (wired in form wizards)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available scripts

| Script          | Purpose                        |
| --------------- | ------------------------------ |
| `npm run dev`   | Dev server with hot reload     |
| `npm run build` | Production build               |
| `npm start`     | Run the production build       |
| `npm run type-check` | TypeScript check (`tsc --noEmit`) |

## Design system

The aesthetic is **"Engineered Institution"**:

- **Paper background** (`#F5F1E8`) — warm cream, never pure white.
- **Navy ink** (`#0A2540`) — primary text and dark surfaces.
- **Bordeaux** (`#7A1E2F`) — strategic accent (primary CTAs, emphasis, pins).
- **Green** (`#1F7A3E`) — sustainability, water, agriculture.
- **Engineering annotations** — `N° 01`, coordinates, project codes, technical data sheets.
- **Editorial serif** headlines (Fraunces), mono labels, sans body.
- **Duotone** documentary photography with navy/green overlays.
- **Visible 12-col grid lines** as a structural design element.

Tokens live in `src/app/globals.css` under `@theme`. Add new scales/colors there.

## Structure

```
src/
  app/
    page.tsx                          Home
    a-propos/page.tsx                 About (org chart, values, mission)
    services/page.tsx                 Services overview
    services/travaux-hydrauliques/    Deep service page — hydraulics
    realisations/page.tsx             Filterable grid
    realisations/luiza-6-forages.../  Flagship case study
    actualites/page.tsx               News
    espace-client/page.tsx            Client portal dashboard shell
    demandes/page.tsx                 Forms hub
    demandes/devis/page.tsx           Multi-step wizard — general quote
    contact/page.tsx                  Contact form + stylized map
    telechargements/page.tsx          Downloads library
    globals.css                       Tailwind v4 theme + custom utilities
    layout.tsx                        Fonts, metadata, header/footer/floating
  components/
    site-header.tsx                   Institutional nav with top ribbon
    site-footer.tsx                   Footer with archival watermark
    floating-actions.tsx              WhatsApp + Phone floating CTAs
    brand-mark.tsx                    Wordmark + bordeaux diamond
    language-switcher.tsx             FR/EN/ES/DE/AR (UI stub)
    page-header.tsx                   Reusable hero for internal pages
    section-kicker.tsx                "N° 01 — LABEL" rule
    reveal.tsx                        Framer Motion viewport reveal
    counter.tsx                       Animated metric counter
    marquee.tsx                       Serif italic ticker
    home/                             Home-page sections
  lib/
    content.ts                        Services, realizations, metrics, company
    cn.ts                             clsx + tailwind-merge helper
```

## What's in this first pass

Per spec §12:

- [x] Design system + tokens + fonts
- [x] Home (hero, trust bar, marquee, pillars, realizations, metrics, quote, CTA)
- [x] Services overview
- [x] Travaux hydrauliques deep page
- [x] Realizations grid + Luiza case study
- [x] Client portal dashboard shell (quotes, invoices, projects, water payment)
- [x] Demande de devis form wizard (5 steps)
- [x] Contact page with stylized map + form
- [x] About page with interactive org chart
- [x] Downloads, news, forms hub

## To wire next

1. **next-intl** — locale routing (`[locale]/...`), per-locale content in DB, RTL for Arabic.
2. **Supabase** — auth, RLS, quotes/invoices/projects tables.
3. **Flutterwave / Stripe / PayPal** — payment orchestration.
4. **Remaining forms** — Étude géophysique (with GPS input), Raccordement AEP (with doc upload), Inscription formation.
5. **Other 8 service deep pages** — follow the `/services/travaux-hydrauliques` template.
6. **CMS** — Payload or Supabase Studio for news + realizations.
7. **SEO** — `next-sitemap`, schema.org LocalBusiness, hreflang alternates.

## Brand & company

| | |
| --- | --- |
| Name | Groupe Lipanda FAMILY SASU |
| Tagline | « Du génie intarissable » |
| Founder | Ing. Jean Toussaint Mindela |
| RCCM | 24-B-01247 |
| ID NAT | 01-J6100-N56232T |
| N° Impôt | A2527588Q |
| Seat | Nº 36 B, Avenue Africain, Q.12, Ndjili, Kinshasa, R.D. Congo |
| Phone | +243 819 385 924 |
| WhatsApp | +243 850 060 507 |
| Email | infoslipanda@gmail.com |
