# Portfolio — Hrishikesh K K

Personal portfolio of **Karikkad Kayarthaya Hrishikesh**: Full Stack Engineer (React.js / NestJS), Team Leader and bilingual Bridge SE based in Japan.

The site highlights full-stack development work, is bilingual (English / 日本語), responsive, and has light and dark themes.
It is a **static site**: there is no backend, database or server to run or pay for.

## Repository layout

| Folder | What it is | Stack |
| --- | --- | --- |
| [`portfolio-frontend/`](portfolio-frontend) | The website | React 19, TypeScript, Vite, CSS Modules |
| [`docs/`](docs) | Hosting guide | — |

The repo is laid out as a monorepo so more packages can be added later without restructuring.

```
portfolio/
├── portfolio-frontend/
│   └── src/
│       ├── app/                 App composition and providers
│       ├── assets/              Profile photo
│       ├── content/             All site text, typed and bilingual (single source of truth)
│       ├── types/               Content model types
│       ├── i18n/  theme/        Language and theme context + hooks
│       ├── components/ui/       Shared building blocks (Section, Reveal, Tag, Monogram, Button)
│       ├── components/layout/   Navbar, Footer
│       ├── features/            One folder per page section
│       ├── hooks/               useInView, useActiveSection
│       ├── services/            Safe localStorage helpers
│       └── styles/              Design tokens + global styles
├── docs/DEPLOYMENT.md           Free hosting guide
└── package.json                 Convenience scripts (run from the repo root)
```

## Prerequisites

- Node.js **20.19+** or **22.12+** (see `.nvmrc`). Only needed to develop and build; the hosted site is plain HTML, CSS and JS.
- npm 10+

## Getting started

```bash
npm run install:all     # install dependencies
npm run dev             # http://localhost:5173
```

## Scripts (run from the repo root)

| Command | What it does |
| --- | --- |
| `npm run install:all` | Install dependencies |
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build the static site into `portfolio-frontend/dist` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Lint with oxlint |
| `npm run typecheck` | Type-check only |

## Editing the content

All text lives in typed, bilingual files under `portfolio-frontend/src/content/`. No component changes are needed to update it.

| File | Contents |
| --- | --- |
| `profile.ts` | Name, headline, summary, core stack, development strengths, contact links, headline numbers |
| `career.ts` | Career "train line" stations |
| `projects.ts` | Project stories (problem → what I did → result) |
| `skills.ts` | Skill groups and years of experience (including AI-assisted development) |
| `credentials.ts` | Certifications, education, languages |

To change the photo, replace `portfolio-frontend/src/assets/profile.jpg` (portrait, about 640×820). Shared UI labels are in `portfolio-frontend/src/i18n/ui.ts`. Labels used by a single section are in that section's `copy.ts`.

## Deployment

You can host it for free on Vercel (or Netlify, Cloudflare Pages or GitHub Pages).
Step-by-step instructions are in **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**.
