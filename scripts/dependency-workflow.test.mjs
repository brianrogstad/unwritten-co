import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('production audit gates the build using the security spec threshold', () => {
  const workflow = readFileSync(new URL('../.github/workflows/deploy.yml', import.meta.url), 'utf8');
  const audit = 'npm audit --omit=dev --audit-level=high';
  assert.ok(workflow.includes(audit), 'production audit gate must exist');
  assert.ok(workflow.indexOf('npm ci') < workflow.indexOf(audit));
  assert.ok(workflow.indexOf(audit) < workflow.indexOf('npx ng build'));
  assert.ok(workflow.includes('projects/unwritten-co/specs/security-spec.md'));
  assert.ok(!workflow.includes('continue-on-error: true'));
});
