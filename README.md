# Abhay Creative — Design & Full-Stack Portfolio

> **Live Portfolio:** https://abhay-creative.pages.dev
> Click the link above to visit the live site. It showcases my design work, freelance services, and the full-stack backend that powers the contact & hire forms.

---

## 👋 About Me

Hi, I'm **Abhay Hegde** — an engineering student based in **Mysuru**, currently in my **final year** and actively looking to start my career.

I'm a **full-stack developer** and a **design enthusiast**. I love building things on the web and also spend a lot of time on the creative side — **designing** (posters, thumbnails, branding) and a bit of **video editing**.

**Skills & interests:**
- Full-stack web development — **MERN stack** (MongoDB, Express, React, Node) and **React** focused
- Currently learning and strengthening: **React, Next.js, TypeScript, and backend tooling**
- Highly involved in **UI/UX design**, graphic design (posters, YouTube thumbnails), and **video editing**
- Comfortable taking a project from idea → design → deployed product

**Open to work:** I'm available for **freelance** projects — not everything, but I'm open to the right work. If your company has a role or possession (internship/freelance/full-time) left and you think I'd fit, I'm all ears. I'm especially keen on **full-stack developer** roles where I can keep growing my MERN/React skills.

---

## 🎯 Why I Built This

I built this portfolio to:
1. **Showcase my design and development work** in one clean place.
2. **Make it easy for people to reach me** — the contact and "Hire Me" forms post directly to a real backend (no fake mailto links).
3. **Practice full-stack skills** — the site isn't just a static page; it has a working API, a database, and email notifications.

If you want to know more about me or discuss a project, the fastest way is the contact form on the site, or reach me through the links below.

---

## 🧰 Tech Stack

### Frontend (`/frontend`)
- **React 19** + **Vite** — fast SPA
- **Tailwind CSS** — custom dark design system
- **Framer Motion** — scroll reveals, tilt cards, gradient orbs
- **React Icons** (Feather)

### Backend (`/backend`)
- **Cloudflare Workers** — serverless API (`/api/contact`, `/api/hire`)
- **Supabase** (PostgreSQL) — stores every contact & hire submission
- **Resend** — sends email notifications on each submission
- **@supabase/supabase-js** — edge-safe DB client (no Node native modules)

> The backend was migrated from MongoDB to **Supabase** and runs entirely on Cloudflare's runtime (no native modules), so it deploys cleanly as a Worker.

---

## 🚀 Run It Locally

### Frontend
```bash
cd frontend
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
```

### Backend (Cloudflare Worker)
```bash
cd backend
npm install
npx wrangler dev # local worker on localhost
```

---

## ☁️ Deployment & Secrets (important)

- **Frontend** is deployed on **Cloudflare Pages** → https://abhay-creative.pages.dev
- **Backend** is deployed as a **Cloudflare Worker** → `abhay-creative-backend.abhayhegde643.workers.dev`

### Where the secrets live
The backend needs three secrets. They are stored in the **Cloudflare Dashboard** (Worker → Settings → Variables), **not** in this repo:

| Variable | Purpose |
|----------|---------|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_KEY` | Supabase anon/public key |
| `RESEND_API_KEY` | Resend API key for email |

> **Note:** `backend/wrangler.toml` in this repo contains only **non-secret** config (worker name, compatibility, frontend origin, email addresses). The actual credentials above are set in the Cloudflare Dashboard so they survive every deploy. Do **not** commit real secrets to Git.

To deploy the Worker:
```bash
cd backend
npx wrangler deploy
```

---

## 📬 Contact

- **Portfolio:** https://abhay-creative.pages.dev
- **Email:** abhayhegde643@gmail.com
- **GitHub:** [@AbhayHegde05](https://github.com/AbhayHegde05)

Use the **Contact** or **Hire Me** form on the site — submissions are saved to Supabase and I get an email notification.

---

## 📁 Project Structure
```
my-portfolio/
├── frontend/        # React + Vite + Tailwind SPA (Cloudflare Pages)
├── backend/         # Cloudflare Worker API (Supabase + Resend)
└── supabase/        # schema.sql — contact & hire tables + RLS policies
```

---

Built with ❤️ by **Abhay Hegde** — engineering student, full-stack dev, and design enthusiast.
