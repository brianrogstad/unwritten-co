# jsdom 31 test-environment migration

The deliberate migration from jsdom 30.1.3 to 31.0.0 keeps Angular's
`@angular/build:unit-test` builder and Vitest 5.1.0. No test, coverage exclusion,
application code or deployment configuration is removed or weakened.

## Compatibility assessment

- Vitest's published jsdom peer range is `*`; the installed Angular builder
  supports Vitest 5. The complete dependency tree resolves without peer overrides.
- Both jsdom versions declare Node `^22.22.2 || ^24.15.0 || >=26.0.0`.
  The migration does not raise the existing Node floor. Deployment already
  selects the latest Node 22 release.
- jsdom 31 replaces its optional `canvas` backend with `@napi-rs/canvas`.
  This repository installs neither backend and has no canvas/image-decoding
  test dependency or native canvas imports. Do not add a native backend merely
  to silence optional peers. Add and test it deliberately if that capability
  becomes a requirement.
- The application and tests do not directly construct a JSDOM, enable
  `runScripts`, or depend on asynchronous document parsing. Angular/Vitest own
  environment setup. Existing TestBed rendering, route navigation and navbar
  interaction tests remain the consumer compatibility checks.
- The lockfile changes jsdom and its transitive graph only; Angular and Vitest
  versions are unchanged. jsdom remains a development-only dependency.

## Verification

On the source based on `a347e50e06a2ba9f0d7d3c411ad5187019f5cb8a`, baseline
and migrated `npm ci`, `npm run build`, and `npm test -- --watch=false` pass.
The original four spec files / 13 tests remain enabled and pass. Migrated
`npm run test:coverage -- --watch=false` and `npm ls jsdom vitest @angular/build
--all` also pass. Commands use `CI=true` for build/test and ordinary npm peer
resolution, without `--force` or `--legacy-peer-deps`.

Private wave evidence and command logs are retained outside the repository at
`/Users/brian/.hermes/cache/scratch/fleet-20261111-wave2/pr-triage-followup-evidence/`.
These local checks do not assert that a future scheduled PR triage or deployment
has already run.
