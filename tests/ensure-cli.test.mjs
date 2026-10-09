// ensure-cli.sh checks npm every run but installs only with --install,
// which the agent passes after the user says yes.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, readFileSync, chmodSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const script = path.resolve('skills/firstsales/scripts/ensure-cli.sh');

// A fake `npm` that answers `view` and `ls` from env and logs `install` calls.
function run({ latest, installed, offline = false, install = false }) {
  const dir = mkdtempSync(path.join(tmpdir(), 'fs-ensure-'));
  const log = path.join(dir, 'install.log');
  writeFileSync(path.join(dir, 'npm'), `#!/usr/bin/env bash
case "$1" in
  view) ${offline ? 'exit 1' : `echo "${latest}"`} ;;
  ls) ${installed ? `echo '{"dependencies":{"@firstsales.io/cli":{"version":"${installed}"}}}'` : `echo '{}'`} ;;
  install) echo "$@" >> "${log}" ;;
esac
`);
  chmodSync(path.join(dir, 'npm'), 0o755);
  const out = execFileSync('bash', [script, ...(install ? ['--install'] : [])], {
    env: { ...process.env, PATH: `${dir}:${process.env.PATH}` },
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  return { out, installs: existsSync(log) ? readFileSync(log, 'utf8') : '' };
}

test('reports a newer version without installing', () => {
  const { installs, out } = run({ latest: '0.1.13', installed: '0.1.12' });
  assert.equal(installs, '');
  assert.match(out, /^update-available 0\.1\.12 0\.1\.13$/m);
});

test('reports a missing CLI without installing', () => {
  const { installs, out } = run({ latest: '0.1.13', installed: null });
  assert.equal(installs, '');
  assert.match(out, /^not-installed 0\.1\.13$/m);
});

test('--install installs latest when npm has a newer version', () => {
  const { installs } = run({ latest: '0.1.13', installed: '0.1.12', install: true });
  assert.match(installs, /install -g @firstsales\.io\/cli@0\.1\.13/);
});

test('--install installs a missing CLI', () => {
  const { installs } = run({ latest: '0.1.13', installed: null, install: true });
  assert.match(installs, /install -g @firstsales\.io\/cli@0\.1\.13/);
});

test('does nothing when already on latest', () => {
  const { installs, out } = run({ latest: '0.1.13', installed: '0.1.13', install: true });
  assert.equal(installs, '');
  assert.match(out, /^up-to-date 0\.1\.13$/m);
});

test('does not downgrade a newer local build', () => {
  const { installs, out } = run({ latest: '0.1.12', installed: '0.1.20', install: true });
  assert.equal(installs, '');
  assert.match(out, /^up-to-date 0\.1\.20$/m);
});

test('npm offline warns and exits 0 without installing', () => {
  const { installs, out } = run({ latest: '', installed: '0.1.12', offline: true, install: true });
  assert.equal(installs, '');
  assert.match(out, /^offline 0\.1\.12$/m);
});
