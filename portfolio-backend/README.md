# portfolio-backend

Express + TypeScript API for the portfolio: a health check and the contact form (email via SMTP).
Can optionally host the built frontend (`portfolio-frontend/dist`) so one Node process serves the whole site.

## Setup

```bash
cd portfolio-backend
npm install
cp .env.example .env   # fill in SMTP_* to really send mail
npm run dev            # http://localhost:4000 (frontend dev server proxies /api here)
```

Without `SMTP_HOST`/`SMTP_USER`/`SMTP_PASS`, messages are printed to the console (ConsoleMailer).

## Environment

| Variable | Default | Notes |
| --- | --- | --- |
| `NODE_ENV` | `development` | `development` \| `production` \| `test` |
| `PORT` | `4000` | |
| `CORS_ORIGIN` | `http://localhost:5173` | Comma-separated list (or `*`) |
| `TRUST_PROXY` | `false` | Set `true` behind a reverse proxy so rate limiting sees client IPs |
| `SERVE_CLIENT` | `true` in production | Serve `../portfolio-frontend/dist` with SPA fallback if it exists |
| `CLIENT_DIST_PATH` | `../portfolio-frontend/dist` | Relative to `portfolio-backend/` |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | — / `587` | Port `465` uses implicit TLS |
| `CONTACT_TO` | `hrishikk8547@gmail.com` | Recipient |
| `CONTACT_FROM` | `SMTP_USER` | Sender, e.g. `"Portfolio <no-reply@domain>"` |

## Scripts

- `npm run dev` – watch mode with tsx
- `npm run build` – compile to `dist/`
- `npm start` – run the compiled server
- `npm test` – vitest + supertest
- `npm run typecheck` – `tsc --noEmit` (src + tests)

## API

`GET /api/health` → `200 {"status":"ok"}`

`POST /api/contact` with JSON `{ name, email, message, company?, website? }`

| Status | Body |
| --- | --- |
| 201 | `{"ok":true}` |
| 400 | `{"ok":false,"error":{"code":"VALIDATION_ERROR","message":"…","fields":{"email":"…"}}}` |
| 429 | `{"ok":false,"error":{"code":"RATE_LIMITED","message":"…"}}` (5 requests / 15 min / IP) |
| 500 | `{"ok":false,"error":{"code":"INTERNAL_ERROR","message":"…"}}` |

Rules: `name` 2–80, `email` valid and ≤120, `message` 10–2000, `company` ≤100.
`website` is a honeypot: if filled, the API answers 201 but sends nothing.

## Structure

```
src/
  index.ts          bootstrap, graceful shutdown
  app.ts            createApp(deps) – middleware, routes, errors (used by tests)
  config/env.ts     zod-validated config
  routes/ controllers/ services/ (ContactService + Mailer: SmtpMailer | ConsoleMailer)
  validation/ middleware/ utils/
  static.ts         optional SPA hosting (CSP hashes the client's inline scripts)
tests/contact.test.ts
```

## Production (single process)

```bash
(cd portfolio-frontend && npm run build) && (cd portfolio-backend && npm run build && NODE_ENV=production npm start)
```
