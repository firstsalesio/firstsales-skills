// Every CLI command must be documented, so the skill never lags the CLI.
// FIRSTSALES_CLI overrides the binary (CI uses the latest from npm).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';

const cli = process.env.FIRSTSALES_CLI ?? 'npx -y @firstsales.io/cli@latest';
const { commands } = JSON.parse(execSync(`${cli} commands --json`, { encoding: 'utf8' }));
const dir = 'skills/firstsales/references';
const docs = readdirSync(dir).map((f) => readFileSync(`${dir}/${f}`, 'utf8')).join('\n');

test('CLI lists commands', () => assert.ok(commands.length > 100));

test('every CLI command is documented as `firstsales <command>`', () => {
  const missing = [...new Set(commands.map((c) => c.command))].filter((c) => !docs.includes(`firstsales ${c}`));
  assert.deepEqual(missing, []);
});
