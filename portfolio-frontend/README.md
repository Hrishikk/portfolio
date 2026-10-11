# portfolio-frontend

The portfolio website. Built with React 19, TypeScript and Vite.

## Features

- English / 日本語 switch (remembered per browser, defaults to the browser language)
- Light / dark theme (follows the system setting, can be toggled)
- Responsive from 360px phones to wide desktops
- Accessible: semantic HTML, keyboard navigation, visible focus, screen-reader labels, honours "reduce motion"
- Contact section with one-tap email, copy-to-clipboard and LinkedIn actions
- Static output: no backend or environment variables needed

## Setup

```bash
npm install
npm run dev          # http://localhost:5173
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Lint with oxlint |
| `npm run typecheck` | Type-check only |

## Structure

```
src/
  app/                App.tsx (page composition) and AppProviders.tsx
  assets/             profile.jpg (hero photo)
  content/            Typed bilingual content: edit these files to change the text
  types/content.ts    Content model
  i18n/               LanguageProvider, useLanguage, ui.ts (shared labels)
  theme/              ThemeProvider, useTheme
  components/ui/      Section, Reveal, Tag, Monogram, Button
  components/layout/  Navbar, Footer
  features/           hero, about, experience, projects, skills, certifications, contact
  hooks/              useInView, useActiveSection
  services/           storage.ts (safe localStorage helpers)
  styles/             tokens.css (design tokens), global.css
```

### Conventions

- Components are presentational. They read text from `src/content` through `useLanguage().t()` / `tl()`.
- Styling uses CSS Modules next to each component, with colours, spacing and fonts only from the variables in `styles/tokens.css`.
- Code uses strict TypeScript and named exports. Icons are inline SVG, so there is no icon library.
