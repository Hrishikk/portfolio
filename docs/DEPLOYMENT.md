# Free hosting guide

The portfolio is a static site, so it can be hosted for **$0** with no server, no sleeping and no environment variables.

**Recommended: Vercel (Hobby plan).** It gives you a free `*.vercel.app` URL with HTTPS, a global CDN, automatic deploys on every push to `main`, and a preview URL for every pull request.

> Free-tier terms change from time to time. Check the provider's pricing page if something below no longer matches.

---

## Deploy on Vercel

1. Merge `feature/create-portfolio` into `main` and push it to GitHub (`Hrishikk/portfolio`).
2. Go to [vercel.com](https://vercel.com) and **sign up with GitHub**.
3. Click **Add New… → Project** and **Import** the `portfolio` repository.
   If it isn't listed, click **Adjust GitHub App Permissions** and give Vercel access to the repo.
4. Configure the project:

   | Setting | Value |
   | --- | --- |
   | Project Name | e.g. `hrishikesh-portfolio`. This becomes `hrishikesh-portfolio.vercel.app` |
   | Root Directory | `portfolio-frontend` (click **Edit** to choose it) |
   | Framework Preset | Vite (detected automatically) |
   | Build Command | `npm run build` (default) |
   | Output Directory | `dist` (default) |

   No environment variables are needed.
5. Click **Deploy**. After about a minute you'll get your live URL.
6. Open it on your phone and laptop, and try EN / 日本語 and light / dark mode.

**From now on:** every push to `main` redeploys automatically. Pushes to other branches get their own preview URLs.

---

## Optional: custom domain

A domain such as `hrishikesh.dev` costs roughly $10–15 a year; it's the only part that costs money.

1. Buy it from any registrar (Cloudflare Registrar, Namecheap, Google/Squarespace Domains, Porkbun, …).
2. In Vercel, open **Project → Settings → Domains → Add** and enter the domain.
3. Add the DNS records Vercel shows you at your registrar. HTTPS is set up automatically.

---

## Alternatives (also free)

| Host | Setup |
| --- | --- |
| **Netlify** | Add new site → Import from GitHub → Base directory `portfolio-frontend`, Build command `npm run build`, Publish directory `portfolio-frontend/dist` |
| **Cloudflare Pages** | Workers & Pages → Create → Pages → Connect to Git → Framework preset *Vite*, Root directory `portfolio-frontend`, Build output `dist` |
| **GitHub Pages** | Possible, but needs a GitHub Actions workflow and a Vite `base` setting of `/portfolio/`. Vercel or Netlify are simpler |
