// A wrong key must fail cleanly with exit code 3, so the skill knows to run setup.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const cli = process.env.FIRSTSALES_CLI ?? 'npx -y @firstsales.io/cli@latest';

test('whoami with a fake key exits 3 without a stack trace', () => {
  const home = mkdtempSync(path.join(tmpdir(), 'fs-smoke-'));
  const r = spawnSync(`${cli} whoami --json`, {
    shell: true,
    encoding: 'utf8',
    env: { ...process.env, HOME: home, FIRSTSALES_API_KEY: 'sk_test_dummy' },
  });
  assert.equal(r.status, 3, r.stderr);
  assert.doesNotMatch(r.stderr + r.stdout, /\n\s+at .+:\d+:\d+/);
  assert.doesNotMatch(r.stderr + r.stdout, /sk_test_dummy/);
});
