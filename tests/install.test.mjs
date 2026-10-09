// install.sh must place both skills where each agent looks for them.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, existsSync, lstatSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const targets = ['.claude/skills', '.codex/skills', '.agents/skills', '.config/opencode/skills'];

for (const mode of ['symlink', 'copy']) {
  test(`install.sh ${mode}`, () => {
    const home = mkdtempSync(path.join(tmpdir(), 'fs-home-'));
    const args = mode === 'copy' ? ['--copy'] : [];
    execFileSync('bash', ['install.sh', ...args], { env: { ...process.env, HOME: home }, stdio: 'pipe' });
    for (const t of targets) {
      for (const s of ['firstsales', 'firstsales-setup']) {
        const p = path.join(home, t, s);
        assert.ok(existsSync(path.join(p, 'SKILL.md')), p);
        assert.equal(lstatSync(p).isSymbolicLink(), mode === 'symlink', p);
      }
    }
  });
}
