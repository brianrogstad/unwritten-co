# Unwritten Co.

Company website for Unwritten Co. at unwrittenco.com. Currently pre-launch — the domain is dead while the site is built. Will eventually be the public face of the company and the hub for Unwritten's brands and projects.

## Quick Reference

| Task | Command |
|------|---------|
| Dev server | `npm start` (port 7100) |
| Production build | `npm run build` |
| Watch build | `npm run watch` |
| Unit tests | `npm test` |

## Tech Stack

- **Frontend:** Angular 18, TypeScript, SCSS
- **SSR:** None (static site)
- **Hosting:** TBD — likely Netlify, Vercel, or GitHub Pages for the static build
- **Status:** Pre-launch, in active build

## L2.5 Review Context

When reviewing PRs for this project, query QMD for reference material:

| Reviewer | Query |
|----------|-------|
| Leo (design) | `qmd query "Unwritten design standards"` |
| Sam (backend) | `qmd query "Unwritten backend conventions"` |
| Elizabeth (content) | `qmd query "Unwritten voice and content standards"` |
| Raven (security) | See Security Context below |

## Security Context

Baseline for Raven's L2.5 security review. Update this section whenever the posture changes.

### Current state (pre-launch static site)
- **Auth:** None. No login, no accounts, no sessions.
- **User data:** None collected. No forms, no contact capture, no analytics events tied to individuals.
- **Backend:** None. No API, no database, no server-side logic.
- **Secrets:** None in the repo. No API keys, no tokens, no credentials.
- **Third-party scripts:** None currently. Any future addition (analytics, embeds, fonts from CDN) requires a deliberate CSP update.
- **Deployment platform:** TBD. Final choice determines available security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy). Document here once decided.
- **Security headers:** TBD — depends on platform. Target baseline when deployed: HSTS, strict CSP, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin, Permissions-Policy (minimal).

### What to flag on review
- Any addition of a form, input, or contact-capture mechanism without a clear data-handling plan
- Any third-party script, iframe, embed, or external font load — these need CSP review
- Any API call, fetch, or backend integration (changes the threat model)
- Any addition of analytics or tracking pixels — check for PII leakage
- Any secret, token, or credential appearing in the repo, env files, or build artifacts
- Any change to deployment config that affects security headers

### Future-state checklist (update when these land)
- [ ] **Auth model** — which provider, session handling, token storage, CSRF posture
- [ ] **User data handling** — what's collected, where it's stored, retention policy, PII classification
- [ ] **API exposure** — which endpoints are public, which require auth, rate limiting, input validation
- [ ] **Secrets management** — where secrets live (env vars, secret manager), how they're injected at build/runtime
- [ ] **Third-party integrations** — CSP entries, SRI for CDN assets, vendor security review notes
- [ ] **Cookie policy** — which cookies are set, SameSite/Secure/HttpOnly flags, consent handling if applicable

## Deep Docs

Full project context lives in `unwritten-ops/projects/unwritten-co/`:
- `index.md` — project overview
- `design-standards.md` — design tokens, type, colors, visual guides
- `voice.md` — voice and content standards
- `marketing-standards.md` — marketing content rules
- `tools.md`, `tooling-configs.md` — tool inventory and configs

Or search the knowledge base:
```
qmd query "Unwritten <your question>"
```
