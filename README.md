# AMH Group — Website (Netlify Build)

This is the Phase 4/5 scaffold from the AMH Group foundation document:
project architecture, homepage flow, the H → camera → lens scroll-transform
proof of concept, route stubs for every page in the sitemap, and a working
(validated) project-inquiry form — all deployable to **Netlify**.

## What's included

- Next.js 14 (App Router) + TypeScript + Tailwind, tokens matched to the
  AMH brand guideline (black/charcoal/gold/gray, Montserrat + Inter interim body font)
- 3-layer hero: accessible HTML layer, WebGL scroll-transform layer (React
  Three Fiber + GSAP ScrollTrigger), and a reduced-motion/low-power fallback
- Every route from the approved sitemap, wired and buildable (content marked
  `[Placeholder]` where real copy/assets are pending — see the foundation doc,
  Section 3, for the full missing-assets list)
- Sanity CMS query layer with automatic fallback to local placeholder data
  if the CMS isn't configured or is unreachable
- Validated, accessible inquiry form + API route (`/api/inquiry`)
- `netlify.toml` configured with the official Next.js runtime

## Company details

- AMH Group is a **Qatar-based** company (Doha) — footer/contact reflect this.
- Confirmed founders: **Abdulrahmane M H Al Dosari** and **Selma Rebika**
  (see `/about`). Bios, portraits, and publish approval are still pending.

## What's NOT included yet (by design, per the brief's "no fabricated content" rule)

- Founder bios/portraits, remaining team roster, other project/case-study content, testimonials, client logos, showreel
- Licensed Gotham Light font files (Inter used as interim substitute)
- A licensed/approved cinema-camera 3D model (current scene uses a simple
  placeholder extruded "H" mesh standing in for the full logo→chassis→camera
  asset sequence described in the foundation doc, Section 9)
- Analytics/tracking IDs, email provider wiring, CRM integration

## Deploying to Netlify

### Option A — Connect a Git repository (recommended)

1. Push this project to a GitHub/GitLab/Bitbucket repo.
2. In Netlify: **Add new site → Import an existing project**, and select the repo.
3. Netlify will auto-detect `netlify.toml`. Build command and publish
   directory are already set (`npm run build` / `.next`), and the
   `@netlify/plugin-nextjs` plugin is declared — it handles SSR/ISR routes
   and API routes as Netlify Functions automatically.
4. Add environment variables (copy from `.env.example`) under
   **Site configuration → Environment variables**.
5. Deploy. Every push to the connected branch triggers a new build; PRs get
   Netlify deploy previews automatically.

### Option B — Netlify CLI (manual/local deploy)

```bash
npm install
npm install -g netlify-cli
netlify login
netlify init          # links this folder to a Netlify site
netlify deploy --build --prod
```

### Option C — Drag-and-drop (not recommended for this project)

Netlify's drag-and-drop deploy only accepts a pre-built static folder and
does **not** support this project's API routes or SSR/ISR pages. Use Option
A or B instead so `@netlify/plugin-nextjs` can provision the required
Functions.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in values as they become available
npm run dev
```

## Next steps (per the foundation document's phased plan)

1. Review the H → camera → lens scroll sequence in isolation (`/` homepage,
   scroll past the hero) and confirm the creative direction before investing
   in the full detailed camera model.
2. Confirm camera-model licensing/rights (Section 14 of the foundation doc)
   so the placeholder mesh can be replaced with the real GLB asset sequence.
3. Supply the missing assets listed in the foundation doc, Section 3.
4. Populate the Sanity CMS once a project ID/dataset are provisioned, and
   set `NEXT_PUBLIC_SANITY_PROJECT_ID` — the fallback data will stop being
   used automatically once real published content exists.
