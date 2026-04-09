# Unwritten Co.

Company website for Unwritten Co. at unwrittenco.com. Currently pre-launch — the domain is dead while the site is built. Will eventually be the public face of the company and the hub for Unwritten's brands and projects.

## Quick Reference

| Task | Command |
|------|---------|
| Dev server | `npm start` (port 7100) |
| Production build | `npm run build` |
| Watch build | `npm run watch` |
| Unit tests | `npm test` |
| Tests + coverage | `npm run test:coverage` |

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

## Testing

Unit tests run on **Vitest + jsdom** via Angular 21's `@angular/build:unit-test` builder. This is a deliberate divergence from league-app / version-seven / portfolioSite, which still use Karma + Jasmine — those projects are on older Angular majors. The alignment principle is "use whatever the Angular CLI ships by default for your version" rather than "copy the exact framework from the older projects."

- **Framework:** Vitest 4, jsdom environment, Angular TestBed
- **Spec files:** colocated with sources, `*.spec.ts`
- **Run:** `npm test` (one shot) or `npm run test:coverage` (with coverage report)
- **Coverage provider:** `@vitest/coverage-v8`, reporters `text-summary` and `lcov`
- **Coverage excludes:** `main.ts`, `app.config.ts`, `app.routes.ts`, `*.d.ts` (bootstrap/config, no logic)
- **Baseline (2026-04-09):** 83% statements, 85% lines, 95% branches, 43% functions — above the 80% stmts/lines target. Functions % is low because component lifecycle methods are untested placeholders; expect this to climb as real features land.
- **What to test:** component creation, rendering without throwing, public methods, service logic, pure functions. Skip DOM fine-grained assertions for placeholder components until the design stabilizes.
- **Pattern:** follow `app.spec.ts` (standalone component + TestBed) and `hero.component.spec.ts` (smoke test for a component with injected dependencies).

### Pre-commit hook

A git hook in `.githooks/pre-commit` runs `npm test` before every commit and blocks on failure. It is installed automatically by the `prepare` script when `npm install` runs (`git config core.hooksPath .githooks`). Manual install:

```bash
git config core.hooksPath .githooks
```

If tests need to be skipped for an emergency commit, use `git commit --no-verify` — but file a follow-up to fix the broken test, don't leave it red.

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
