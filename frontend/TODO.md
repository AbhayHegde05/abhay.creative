# TODO — Cloudflare frontend/backend partition

- [ ] Create `frontend/` directory and move existing Vite/React frontend there (index.html, vite config, tailwind config, src/, public/).
- [ ] Create `backend/` directory for Cloudflare Worker (index.js + wrangler.toml + README).
- [ ] Implement Worker `/api/contact` POST endpoint with:
  - [ ] Accept JSON: name, email, subject, message (and ignore extras)
  - [ ] Robust CORS allowlist for Cloudflare Pages URL
  - [ ] Save inquiry to MongoDB Atlas (via Workers + MongoDB connection using secret binding)
  - [ ] Send email notification via Cloudflare Email Binding
  - [ ] Return precise JSON success/error responses
- [ ] Implement Worker `/api/hire` POST endpoint similarly (name, email, phone, service, budget, timeline, details) to preserve current UI.
- [ ] Update frontend fetch calls to Worker URLs (support both same-origin `/api/...` via Pages routing or env var/placeholder URL).
- [ ] Update root README with Cloudflare deploy steps.
- [ ] Commit and push changes.

