# saran.m: portfolio

Personal site of **Saran M**, a backend-focused full stack engineer. It's built like an API:

- **Every section is an endpoint.** The left rail shows `GET /experience`, `GET /stack`, `POST /contact`…
  Flip the `ui | json` switch in the top bar and every section is replaced by its raw JSON response.
- **It really is an API.** The build emits static JSON under `/api`, from the same data the page renders:
  `/api/index.json`, `/api/resume.json` (everything), and `/api/{profile,experience,projects,stack,education,contact}.json`.
- **Your request, traced.** The hero shows the visitor's real page-load waterfall (DNS → TLS → TTFB → DOM)
  from the browser's Navigation Timing API.
- **Access log.** The pill in the bottom-right logs this visit as requests (scrolling into a section is a `GET`,
  toggles are `PATCH /prefs`, copying is `POST /clipboard`…). Click it to open the full log.
- **Runnable VendPilot ideas.** Two in-browser simulations: the BullMQ parent-child onboarding flow
  (with an injectable 429 + exponential-backoff retry) and a Redis lock vs. lost-update race on the last unit of stock.
- **⌘K / Ctrl K** command palette, light/dark theme, a curl-shaped contact form that hands off to the mail client.

## Stack

Vite · React 18 · TypeScript · Tailwind CSS · [motion](https://motion.dev) · cmdk · Radix Dialog ·
Geist / Geist Mono / Instrument Serif (self-hosted via Fontsource).

## Editing content

All copy lives in **`src/content/resume.ts`**. That one typed module feeds the page *and* the `/api/*.json`
files, so the UI and JSON views can't drift apart. Replace `src/assets/Saran_Resume.pdf` to update the
downloadable resume.

## Scripts

```sh
npm install
npm run dev      # http://localhost:8080 (the /api/*.json routes are served in dev too)
npm run build    # outputs dist/, including dist/api/*.json
npm run preview
npm run lint
```

## Layout

```
src/
  content/       resume.ts (single source of truth), nav.ts
  components/
    site/        page sections, Section shell, JSON view, top bar, palette, log dock
    site/lab/    VendPilot simulations (flow + lock)
    ui/          shadcn/ui primitives
  state/         theme / view / access-log / active-section context
  hooks/         useNow, useNavigationTiming, useSectionTracking
  pages/         Index, vendpilot (product page), NotFound
```

## Deploy

`Dockerfile` builds with Bun and serves `dist/` from nginx (`nginx.conf` handles SPA fallback; `/api/*.json`
are plain static files). `public/_redirects` covers Netlify-style hosts.
