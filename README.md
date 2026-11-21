# Credit Mitra - Frontend Website

Modern, responsive, high-converting frontend for **Credit Mitra** built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## Features

- **Home Page (`/`)**:
  - Outcome-focused hero with clear proof statistics
  - Interactive category pills
  - Mandatory scroll-based word-by-word **Tagline Reveal**
  - Featured & Top-Ranked cards
  - Problem to Solution comparison
  - Benefit highlights & 3-step application guide
  - Frequently Asked Questions
- **All Cards Catalog (`/cards`)**:
  - Live search across titles, banks, and perks
  - Bank and Category filters
  - Annual fee filters (Lifetime Free ₹0 Fee)
  - Sorting (Lowest fee, highest fee, most viewed, most applied, newest)
  - Full pagination
- **Card Detail Page (`/cards/[slug]`)**:
  - Dynamic SEO metadata & OpenGraph preview
  - Comprehensive fee breakdown and spend waiver rules
  - Key benefits, pros, and cons
  - Eligibility criteria
  - Direct **Apply Now** button connecting to `${NEXT_PUBLIC_API_URL}/go/:slug`
  - One-click **WhatsApp Share** button
- **Card Comparison Tool (`/compare`)**:
  - Compare 2 to 3 cards side-by-side
  - Quick card picker modal
  - Compares fees, waivers, perks, pros, cons, and direct apply links
- **Trust & Compliance Pages**:
  - `/about`: Mission, editorial integrity, and zero-middlemen policy
  - `/contact`: Inquiry form and support contacts
  - `/privacy`: Privacy terms and data protection
  - `/affiliate-disclosure`: FTC / ASCI compliant referral disclosure
  - Custom branded 404 page
- **Admin Management Panel (`/admin`)**:
  - `/admin/login`: Secure JWT authentication
  - `/admin`: Analytics dashboard (views, clicks, CTR, device breakdown, date trend) + card list with **active** and **featured** toggle switches
  - `/admin/cards/new`: Add new card form with live image upload preview
  - `/admin/cards/[id]`: Edit card form

---

## Configuration & Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## Development & Build

```bash
# Start local development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## Cloudflare Pages Deployment

This project is configured with `@opennextjs/cloudflare` and `images: { unoptimized: true }` in `next.config.mjs`.

To build and preview for Cloudflare Pages:

```bash
# Build Cloudflare Pages bundle
npm run build:cloudflare

# Local Cloudflare preview via Wrangler
npm run preview:cloudflare
```
