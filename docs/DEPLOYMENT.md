# Free hosting guide

This guide hosts the portfolio for **$0**:

| Part | Service | Free tier notes |
| --- | --- | --- |
| Website (`portfolio-frontend`) | **Vercel** (Hobby plan) | Static site on a global CDN, always fast, free `*.vercel.app` URL and HTTPS |
| API (`portfolio-backend`) | **Render** (Free web service) | Sleeps after about 15 minutes idle and takes up to about a minute to wake |
| Email delivery | **Brevo** (free SMTP) | About 300 emails/day, works on port 2525 |

Only the contact form uses the backend, so the website stays fast even when the API is asleep.
The website also pings the API when it loads, so the API is usually awake by the time someone sends a message.

> Free-tier limits change from time to time. Check each provider's pricing page if something below no longer matches.

---

## 0. Before you start

1. Merge `feature/create-portfolio` into `main` and push it to GitHub (`Hrishikk/portfolio`).
2. Create free accounts on [vercel.com](https://vercel.com), [render.com](https://render.com) and [brevo.com](https://www.brevo.com). For Vercel and Render, sign in **with GitHub** so they can see your repository.

## 1. Set up email sending (Brevo)

Free hosts often block the standard mail ports (25/465/587). Brevo's SMTP also accepts **port 2525**, which usually isn't blocked.

1. In Brevo, open **Senders, Domains & Dedicated IPs → Senders** and add `hrishikk8547@gmail.com` as a sender. Confirm it with the email Brevo sends you.
2. Open **SMTP & API → SMTP** and click **Generate a new SMTP key**. Write down:
   - SMTP server: `smtp-relay.brevo.com`
   - Port: `2525`
   - Login: the value shown on that page (it looks like `xxxx@smtp-brevo.com`)
   - Password: the SMTP key you just generated

## 2. Deploy the API (Render)

1. In Render, click **New → Web Service** and pick the `portfolio` repository.
2. Fill in:

   | Setting | Value |
   | --- | --- |
   | Name | `portfolio-backend` (this becomes part of the URL) |
   | Branch | `main` |
   | Root Directory | `portfolio-backend` |
   | Runtime | Node |
   | Build Command | `npm ci --include=dev && npm run build` |
   | Start Command | `npm start` |
   | Instance Type | **Free** |

3. Under **Environment Variables**, add:

   | Key | Value |
   | --- | --- |
   | `NODE_ENV` | `production` |
   | `SERVE_CLIENT` | `false` |
   | `TRUST_PROXY` | `true` |
   | `CORS_ORIGIN` | `http://localhost:5173` (temporary, updated in step 4) |
   | `SMTP_HOST` | `smtp-relay.brevo.com` |
   | `SMTP_PORT` | `2525` |
   | `SMTP_USER` | your Brevo SMTP login |
   | `SMTP_PASS` | your Brevo SMTP key |
   | `CONTACT_TO` | `hrishikk8547@gmail.com` |
   | `CONTACT_FROM` | `Portfolio <hrishikk8547@gmail.com>` (must be the sender you verified in Brevo) |

   Don't set `PORT`. Render sets it for you.

4. Click **Create Web Service** and wait for the deploy to finish.
5. Copy the URL (for example `https://portfolio-backend.onrender.com`) and open `<URL>/api/health`. You should see `{"status":"ok"}`.

## 3. Deploy the website (Vercel)

1. In Vercel, click **Add New… → Project** and import the `portfolio` repository.
2. Fill in:

   | Setting | Value |
   | --- | --- |
   | Root Directory | `portfolio-frontend` (click **Edit** to choose it) |
   | Framework Preset | Vite (detected automatically) |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |

3. Under **Environment Variables**, add `VITE_API_BASE_URL` = your Render URL from step 2, **without** a trailing slash.
4. Click **Deploy**. You'll get a URL like `https://portfolio-hrishikk.vercel.app`.

## 4. Connect the two

1. Back in Render, open **portfolio-backend → Environment** and change `CORS_ORIGIN` to your Vercel URL, e.g. `https://portfolio-hrishikk.vercel.app`.
   To allow more than one URL (for example a custom domain later), separate them with commas, no spaces needed.
2. Save. Render redeploys automatically.

## 5. Test it

1. Open the Vercel URL on your phone and on a laptop.
2. Switch EN / 日本語 and light / dark mode.
3. Send yourself a message from the contact form and check your Gmail inbox, including the spam folder for the first one.
4. If the form shows an error, open Render's **Logs** tab. A validation error is a 400, too many messages is a 429, and SMTP problems are logged as errors.

## From now on

Every push to `main` redeploys both automatically: Vercel rebuilds the website and Render rebuilds the API.
Pull requests also get their own Vercel preview URL.

If you change `VITE_API_BASE_URL` in Vercel, trigger a redeploy (Deployments → ⋯ → Redeploy). Vite bakes it into the build.

---

## Optional extras

### Custom domain

Buy a domain (e.g. `hrishikesh.dev`, about $10–15 a year; this is the only thing that costs money).
Add it in **Vercel → Project → Settings → Domains** and follow the DNS instructions.
Then add the new domain to `CORS_ORIGIN` on Render.

### Alternative: everything on one Render service

Simpler, with a single URL, but the **whole site** (not just the form) sleeps when idle.

| Setting | Value |
| --- | --- |
| Root Directory | *(leave empty)* |
| Build Command | `npm --prefix portfolio-frontend ci && npm --prefix portfolio-frontend run build && npm --prefix portfolio-backend ci --include=dev && npm --prefix portfolio-backend run build` |
| Start Command | `npm start` |
| Environment | Same as step 2, but **don't set** `SERVE_CLIENT` (it defaults to `true` in production) and leave `VITE_API_BASE_URL` unset |

### Using Gmail instead of Brevo

Create a Gmail [App Password](https://myaccount.google.com/apppasswords) (2-Step Verification must be on) and use
`SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, `SMTP_USER=hrishikk8547@gmail.com`, `SMTP_PASS=<app password>`.
This works locally and on hosts that allow port 465. If Render's free tier blocks it, the logs will show a connection timeout. Switch back to Brevo on port 2525 in that case.
