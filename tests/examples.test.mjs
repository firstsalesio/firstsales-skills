// Every `firstsales ...` example in a code block must be a real command with real flags.
// Each one runs with --dry-run: the CLI checks the command, flags and required ids,
// prints the request it would send, and never touches the network.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const cli = process.env.FIRSTSALES_CLI ?? 'npx -y @firstsales.io/cli@latest';
const home = mkdtempSync(path.join(tmpdir(), 'fs-examples-'));
// Dummy keys: the user sets the real ones in their own shell.
const env = { ...process.env, HOME: home, FIRSTSALES_API_KEY: 'sk_test_dummy', FIRSTSALES_CAL_COM_API_KEY: 'cal_test_dummy' };
// These talk to the user's own login or terminal, so --dry-run does not apply.
const skip = /^firstsales (auth|copilot ask|completion|api|commands)\b/;

const mdFiles = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? mdFiles(path.join(dir, d.name)) : d.name.endsWith('.md') ? [path.join(dir, d.name)] : [],
  );

const examples = [];
for (const file of mdFiles('skills')) {
  const blocks = readFileSync(file, 'utf8').match(/```(?:bash|sh)\n[\s\S]*?```/g) ?? [];
  for (const block of blocks) {
    for (const line of block.split('\n')) {
      const cmd = line.trim();
      if (cmd.startsWith('firstsales ') && !skip.test(cmd) && !cmd.includes('<')) examples.push({ file, cmd });
    }
  }
}

test('skills have runnable examples', () => assert.ok(examples.length > 50, `${examples.length} examples`));

for (const { file, cmd } of examples) {
  test(`${file}: ${cmd}`, () => {
    const args = cmd.replace(/^firstsales /, '');
    // --data-file examples point at the user's own file; give the CLI a stand-in.
    for (const [, file] of args.matchAll(/--data-file\s+(\S+)/g)) writeFileSync(path.join(home, file), '{}');
    try {
      const out = execSync(`${cli} ${args} --dry-run`, { cwd: home, env, encoding: 'utf8', stdio: 'pipe' });
      assert.ok(JSON.parse(out).dryRun, 'prints a dry-run request');
    } catch (err) {
      assert.fail(`exit ${err.status}: ${(err.stdout || err.stderr || err.message).trim()}`);
    }
  });
}
