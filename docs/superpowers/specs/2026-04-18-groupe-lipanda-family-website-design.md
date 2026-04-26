# Groupe Lipanda FAMILY — Corporate Website Design Spec

**Date:** 2026-04-18
**Status:** Draft — pending user approval
**Next step:** `frontend-design` execution per user directive

---

## 1. Project context

**Client:** Groupe Lipanda FAMILY SASU
**Tagline:** « Du génie intarissable »
**Founder:** Ingénieur Jean Toussaint MINDELA
**Seat:** Nº 36 B, Avenue Africain, Quartier 12, Ndjili, Kinshasa — RDC
**RCCM:** 24-B-01247 · **ID NAT:** 01-J6100-N56232T · **N° Impôt:** A2527588Q
**Phone:** +243 819 385 924 · **WhatsApp:** +243 850 060 507
**Email:** infoslipanda@gmail.com
**Domain:** www.groupelipandafamilly.com

A Congolese multidisciplinary engineering conglomerate (BTP, hydraulics, specialized studies, agro-business, renewable energy, vocational training). The website is the institutional face for government, NGOs, donors, B2B clients, and individuals seeking water/construction/training services across RDC and Africa.

## 2. Goals

1. Project institutional credibility matching an engineering firm that delivers public infrastructure.
2. Convert visitors into leads through 4 specialized intake forms + WhatsApp/call CTAs.
3. Host a secure **Client Space** for quote/invoice/project-tracking + online payments (including water-consumption bills).
4. Serve 5 languages with full RTL for Arabic.
5. Be discoverable (SEO), fast, secure (SSL), and maintainable by internal staff.

## 3. Architecture

**Stack:**
- **Framework:** Next.js 15 (App Router, React 19, TypeScript) — SSR/SSG for SEO + fast TTFB on DRC bandwidth.
- **Styling:** Tailwind CSS v4 + shadcn/ui primitives + custom institutional component layer.
- **Animations:** Framer Motion (subtle, institutional — no flashy effects).
- **i18n:** `next-intl` with FR (default), EN, ES, DE, AR (RTL).
- **Auth + DB:** Supabase (Postgres + Auth + RLS) for client portal, quotes, invoices, comments.
- **Payments:**
  - Mobile Money (Airtel Money, M-Pesa Vodacom, Orange Money) via **Flutterwave** (best DRC coverage).
  - Cards Visa/MC via Stripe.
  - PayPal (optional).
- **Media:** Cloudinary for responsive images/video with lazy loading.
- **Email:** Resend (transactional) + Zoho/Google Workspace (10 pro mailboxes, DNS-level).
- **Maps:** Google Maps Embed for contact page.
- **Hosting:** Vercel (edge CDN); DNS + mail on Cloudflare.
- **Analytics/SEO:** Plausible (GDPR-safe) + next-sitemap + schema.org Organization/LocalBusiness.
- **Backups:** Supabase point-in-time recovery + weekly GitHub Actions DB dump to S3.

**Rationale:** Next.js + Supabase is the lowest-ops stack that covers SSR/SSG, auth, RLS, i18n, and payments without a dedicated backend team. Flutterwave is the only aggregator with reliable Airtel + M-Pesa + Orange coverage in DRC today.

## 4. Brand system

| Token | Value | Purpose |
|---|---|---|
| `--navy-900` | `#0A2540` | Primary — professionalism, institutional |
| `--navy-700` | `#143A5E` | Primary hover, dark surfaces |
| `--green-600` | `#1F7A3E` | Secondary — sustainable development, water, agriculture |
| `--green-100` | `#E8F3EC` | Secondary tint |
| `--bordeaux-700` | `#7A1E2F` | Accent — heritage, DRC identity, hero emphasis |
| `--white` | `#FFFFFF` | Surface, clarity |
| `--stone-50→900` | neutral scale | Body text, borders, muted surfaces |

**Typography:**
- Display: **Fraunces** (serif, institutional, warm) — headings only.
- Body: **Inter** (sans, high legibility at all sizes) — UI + body copy.
- Arabic: **IBM Plex Sans Arabic** (pairs with Inter metrics).
- Scale: 12 / 14 / 16 / 18 / 20 / 24 / 32 / 40 / 56 / 72.

**Voice:** sober, precise, engineering-led. Avoid marketing fluff. Quantified claims ("6 forages d'eau solaires à Luiza", not "many projects").

**Imagery:** high-contrast documentary photography of sites (boreholes, foundations, training), not stock. Bordeaux red reserved for strategic accents (CTAs, statistics, section markers) — never large fills.

## 5. Information architecture

```
/                                  Home
/a-propos                          About (history, vision/mission, org chart, leadership)
/services                          Services overview (10 pillars)
  /etudes-architecturales
  /btp
  /hydraulique
  /etudes-specialisees             (geophysique, hydrogeologie, geotechnique, EIES)
  /energies-renouvelables
  /routes-ouvrages-art
  /agro-business                   (cultures, elevage, pisciculture)
  /expertise-immobiliere
  /informatique-videosurveillance
  /formation-professionnelle       (+ catalogue des filières)
/realisations                      Gallery + filters by service/region
  /realisations/[slug]             Case study (Luiza, Kasai Central, etc.)
/actualites                        News index
  /actualites/[slug]               Article + comments
/espace-client                     Auth gate
  /espace-client/tableau-de-bord   Dashboard (quotes, invoices, projects, water bills)
  /espace-client/devis
  /espace-client/factures
  /espace-client/projets
  /espace-client/paiement-eau      Water-consumption payment
/demandes                          Forms hub
  /demandes/devis                  General quote
  /demandes/etude-geophysique      GPS + depth + soil
  /demandes/raccordement-aep       AEP connection w/ doc upload
  /demandes/formation              Training enrollment (filière + cycle + dates)
/contact                           Form + map + CTAs
/telechargements                   Downloads (plaquettes, catalogues, rapports)
/mentions-legales · /politique-confidentialite · /cgu
```

Every page ships in 5 locales: `/fr/...`, `/en/...`, `/es/...`, `/de/...`, `/ar/...` (RTL).

## 6. Component inventory (for frontend-design)

**Global:**
- `<SiteHeader>` — institutional nav, language switcher, phone ribbon, client-area CTA. Shrinks on scroll.
- `<SiteFooter>` — 4-column: company/seal, services, client space, contact + socials + legal IDs.
- `<FloatingActions>` — WhatsApp (+243 850 060 507) + Call (+243 819 385 924) stacked bottom-right.
- `<LanguageSwitcher>` — FR/EN/ES/DE/AR with flags.
- `<Breadcrumbs>`, `<Toast>`, `<Dialog>`, `<Drawer>`.

**Home:**
- `<Hero>` — full-bleed video loop (borehole drilling, site work) + tagline « Du génie intarissable » + dual CTA (Devis / WhatsApp).
- `<TrustBar>` — RCCM, ID NAT, certifications strip.
- `<ServicePillars>` — 10-card grid with icon, title, one-line description, link.
- `<FeaturedRealizations>` — 3 flagship case studies (Luiza, Kasai Central, Formation Center).
- `<Metrics>` — animated counters: `6 forages solaires`, `N projets livrés`, `N stagiaires formés`, `N communes desservies`.
- `<LeadershipQuote>` — founder quote block with photo.
- `<ContactBanner>` — dual-CTA (Devis + WhatsApp) with address + phone.

**About:**
- `<Timeline>` — founding → milestones.
- `<OrgChart>` — PRESIDENT → 6 directions (Admin/Finance, Technique, Commerciale, Formation, Agro-business, Logistique). Interactive, clickable nodes.
- `<LeadershipCard>` — photo, name, title, bio.
- `<ValuesGrid>` — Vision, Mission, Values, Leadership style.

**Services (overview + deep page template):**
- `<ServiceHero>` — service-specific hero w/ Bordeaux accent.
- `<ServiceDescription>` — prose + bullet deliverables.
- `<ProcessSteps>` — 3–5 step methodology.
- `<RelatedRealizations>` — filtered case studies.
- `<ServiceCTA>` — form CTA routed to the correct intake form.

**Realizations:**
- `<RealizationFilters>` — service / region (Kinshasa, Kasai Central, …).
- `<RealizationGrid>` — masonry cards w/ hover reveal.
- `<CaseStudy>` — hero, context, challenge, solution, gallery, specs table, map.

**News:**
- `<ArticleCard>`, `<ArticleBody>`, `<CommentThread>` (nested, moderation-gated), `<CommentForm>`.

**Client portal:**
- `<AuthForm>` — login / register / reset.
- `<PortalSidebar>` + `<PortalTopbar>`.
- `<QuoteList>` + `<QuoteDetail>` — status chips (Envoyé, Accepté, Refusé), download PDF, accept/reject.
- `<InvoiceList>` + `<InvoiceDetail>` — pay button (Mobile Money / card / PayPal).
- `<ProjectTracker>` — timeline with milestone states.
- `<WaterBillPayment>` — meter ID lookup → amount → payment modal.
- `<PaymentModal>` — tabbed: Mobile Money (Airtel/M-Pesa/Orange) / Card / PayPal.

**Forms (shared):**
- `<FormShell>` — multi-step wizard w/ progress, save-draft, validation (Zod + React Hook Form).
- `<FileDropzone>` — ID/land-title upload (PDF/JPG, max 10 MB, scanned).
- `<GpsInput>` — lat/lng w/ "use my location" + map preview.
- `<TrainingCatalogPicker>` — filière → cycle → date cohort.
- `<SuccessScreen>` — confirmation + tracking number + next steps.

**Utility:**
- `<LocaleSwitcher>` (RTL-aware), `<SeoHead>`, `<CookieBanner>`, `<NewsletterSignup>`.

## 7. Data model (Supabase)

Tables: `users`, `profiles`, `quotes`, `quote_items`, `invoices`, `payments`, `projects`, `milestones`, `water_meters`, `water_bills`, `articles`, `comments`, `form_submissions` (polymorphic), `training_cohorts`, `enrollments`, `downloads`, `audit_log`.

All client-scoped tables protected by RLS policies keyed on `auth.uid() = user_id`. Admin role bypasses via claim.

## 8. Multilingual strategy

- Source of truth: FR messages file; EN/ES/DE/AR generated + manually reviewed.
- Content (articles, realizations, services) stored per-locale in DB (`content_translations` table).
- AR triggers `dir="rtl"` on `<html>`; Tailwind logical properties (`ps-*`, `pe-*`, `ms-*`, `me-*`) used throughout.
- URL strategy: `/[locale]/...` with `fr` as default; locale detection via `Accept-Language` with cookie override.

## 9. SEO & performance budget

- Core Web Vitals targets: LCP < 2.5s, INP < 200ms, CLS < 0.05 on 3G DRC profile.
- Schema.org: `Organization`, `LocalBusiness`, `Service`, `Article`, `FAQPage`.
- Static generation for marketing pages; ISR (revalidate: 300s) for news/realizations.
- Image pipeline: AVIF + WebP via Cloudinary, responsive `sizes`, explicit dimensions.
- Dynamic sitemap + hreflang alternates for 5 locales.

## 10. Security

- SSL (Vercel + Cloudflare).
- Supabase RLS on every client-scoped table.
- CSRF on all mutating routes; rate-limit forms (Upstash Redis).
- File uploads: mime-type + magic-number check + virus scan (ClamAV via serverless).
- Payment webhooks signature-verified.
- Admin area behind TOTP 2FA.
- Audit log for all portal actions.

## 11. Deliverables

1. Complete working site deployed to Vercel on staging, then production.
2. Admin CMS (Payload CMS embedded, or Supabase Studio for v1).
3. Internal user manual (FR) for content updates.
4. Admin credentials handoff.
5. Initial full backup (DB + assets).
6. 10 professional mailboxes provisioned (`contact@`, `info@`, `direction@`, `devis@`, `rh@`, `formation@`, `commercial@`, `technique@`, `support@`, `comptabilite@groupelipandafamilly.com`).
7. SEO submission (Google Search Console, Bing Webmaster), sitemap, robots.txt.

## 12. Scope for the first frontend-design pass

The immediate next step (user directive: invoke `frontend-design`) will produce:

- Full **design system** (tokens, typography scale, component primitives in code).
- **Home** — production-grade.
- **Services overview** + one deep service page (Travaux hydrauliques as exemplar).
- **Realizations grid** + one case study (Luiza 6 forages solaires).
- **Client portal dashboard** shell.
- **One form wizard** end-to-end (Demande de devis général) as the pattern for the other 3.
- **Contact page** with map + CTAs.
- All in **FR default + working language switcher**; AR/RTL scaffold wired but copy filled in a second pass.

The remaining pages (About, News, 9 other service deep-pages, 3 remaining forms, portal sub-pages, downloads, legal) follow the same patterns and ship in subsequent passes.

## 13. Out of scope for v1

- Native mobile apps.
- Live water-meter IoT integration (portal displays manually billed periods for now).
- Video conferencing for training.
- E-commerce for goods.
- Full CMS with workflow (using Supabase Studio initially).

## 14. Open questions (non-blocking, defer-able)

- Does the client have high-resolution photography of the Luiza / Kasai Central projects? (If not, stylized placeholders for v1.)
- Final choice of payment aggregator: Flutterwave vs. MaxiCash vs. CinetPay for DRC mobile money? (Recommend Flutterwave, confirm before wiring.)
- Is the domain `groupelipandafamilly.com` already registered or should we register? (Spelling varies — PDF says `familly` with two L's; brief says `family`. Confirm canonical.)
- Legal content (mentions légales, CGU, politique de confidentialité) — client provides text or draft templates?
