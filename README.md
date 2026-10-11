# Portfolio — Hrishikesh K K

Personal portfolio of **Karikkad Kayarthaya Hrishikesh**: Full Stack Engineer (React.js / NestJS), Team Leader and bilingual Bridge SE based in Japan.

The site is fully bilingual (English / 日本語), responsive, has light and dark themes, and includes a working contact form.

## Repository layout

This is a monorepo with two independent npm projects:

| Folder | What it is | Stack |
| --- | --- | --- |
| [`portfolio-frontend/`](portfolio-frontend) | The website | React 19, TypeScript, Vite, CSS Modules |
| [`portfolio-backend/`](portfolio-backend) | Contact-form API (can also serve the built site) | Node.js, Express 5, TypeScript, zod, nodemailer |

```
portfolio/
├── portfolio-frontend/
│   └── src/
│       ├── app/                 App composition and providers
│       ├── content/             All site text, typed and bilingual (single source of truth)
│       ├── types/               Content model types
│       ├── i18n/  theme/        Language and theme context + hooks
│       ├── components/ui/       Shared building blocks (Section, Reveal, Tag, Seal, Button)
│       ├── components/layout/   Navbar, Footer
│       ├── features/            One folder per page section
│       ├── services/            Contact API client, safe localStorage helpers
│       └── styles/              Design tokens + global styles
├── portfolio-backend/
│   ├── src/
│   │   ├── config/              Environment validation (zod)
│   │   ├── routes/ controllers/ HTTP layer
│   │   ├── services/            Business logic + mailer (SMTP / console)
│   │   ├── validation/          Request schemas
│   │   ├── middleware/          Validation, rate limiting, errors, 404
│   │   └── utils/               Logger, HttpError
│   └── tests/                   API tests (vitest + supertest)
├── docs/DEPLOYMENT.md           Free hosting guide
└── package.json                 Convenience scripts for both projects
```

## Prerequisites

- Node.js **20.19+** or **22.12+** (see `.nvmrc`)
- npm 10+

## Getting started

```bash
npm run install:all                                    # install both projects
cp portfolio-backend/.env.example portfolio-backend/.env

npm run dev:backend      # API      → http://localhost:4000
npm run dev:frontend     # Website  → http://localhost:5173  (proxies /api to the backend)
```

Without SMTP settings, the backend prints contact messages to its terminal instead of emailing them.
To receive real emails, fill in `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` and `SMTP_PASS` in `portfolio-backend/.env`.

## Scripts (run from the repo root)

| Command | What it does |
| --- | --- |
| `npm run install:all` | Install dependencies for both projects |
| `npm run dev:frontend` | Start the Vite dev server |
| `npm run dev:backend` | Start the API in watch mode |
| `npm run build` | Build the frontend and the backend |
| `npm start` | Run the built backend in production mode (also serves the built frontend) |
| `npm test` | Run the backend API tests |
| `npm run lint` | Lint the frontend (oxlint) |
| `npm run typecheck` | Type-check both projects |

## Editing the content

All text lives in typed, bilingual files under `portfolio-frontend/src/content/`. No component changes are needed to update it.

| File | Contents |
| --- | --- |
| `profile.ts` | Name, headline, summary, contact links, headline numbers |
| `career.ts` | Career "train line" stations |
| `projects.ts` | Project stories (problem → what I did → result) |
| `skills.ts` | Skill groups and years of experience |
| `ai.ts` | AI-assisted development (GitHub Copilot, Claude Code) |
| `credentials.ts` | Certifications, education, languages |

Shared UI labels are in `portfolio-frontend/src/i18n/ui.ts`. Labels used by a single section are in that section's `copy.ts`.

## Environment variables

- **Backend:** see [`portfolio-backend/.env.example`](portfolio-backend/.env.example) and the [backend README](portfolio-backend/README.md).
- **Frontend:** `VITE_API_BASE_URL`, the backend URL when the API is hosted separately. See [`portfolio-frontend/.env.example`](portfolio-frontend/.env.example).

Never commit real `.env` files. They are ignored by git.

## Deployment

You can host it for free. Step-by-step instructions are in **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**.
