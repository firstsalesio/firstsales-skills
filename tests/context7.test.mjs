// Context7 indexes this repo: keep its config valid and the skills self-contained.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const cfg = JSON.parse(readFileSync('context7.json', 'utf8'));
const md = execSync('git ls-files -co --exclude-standard', { encoding: 'utf8' })
  .split('\n')
  .filter((f) => f.endsWith('.md'));

test('context7.json fields', () => {
  assert.equal(cfg.$schema, 'https://context7.com/schema/context7.json');
  assert.ok(cfg.projectTitle && cfg.projectTitle.length <= 100);
  assert.ok(cfg.description && cfg.description.length <= 500);
  for (const f of [...cfg.folders, ...cfg.excludeFolders]) assert.ok(existsSync(f), f);
  assert.ok(Array.isArray(cfg.rules) && cfg.rules.length > 0);
});

for (const name of ['firstsales', 'firstsales-setup']) {
  test(`${name} front matter parses for skill installers`, () => {
    const text = readFileSync(`skills/${name}/SKILL.md`, 'utf8');
    assert.ok(text.startsWith('---\n'));
    const fm = text.slice(4, text.indexOf('\n---\n', 4));
    const get = (k) => fm.match(new RegExp(`^${k}: (.+)$`, 'm'))?.[1];
    assert.match(get('name'), /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/);
    assert.ok(get('description')?.trim());
  });
}

for (const f of md.filter((f) => f.startsWith('skills/'))) {
  test(`self-contained links: ${f}`, () => {
    const root = f.split('/').slice(0, 2).join('/');
    for (const [, link] of readFileSync(f, 'utf8').matchAll(/\]\(([^)#]+)\)/g)) {
      if (/^https?:/.test(link)) continue;
      const target = path.normalize(path.join(path.dirname(f), link));
      assert.ok(target.startsWith(root + '/'), `${link} leaves ${root}`);
      assert.ok(existsSync(target), `${link} missing`);
    }
  });
}

test('code fences have a language; no block repeats inside one skill', () => {
  const seen = new Map();
  for (const f of md) {
    const text = readFileSync(f, 'utf8');
    const opens = [...text.matchAll(/^\s*```(\S*)\n([\s\S]*?)^\s*```\s*$/gm)];
    for (const [, lang, body] of opens) {
      assert.ok(lang, `${f}: fence without a language`);
      if (!f.startsWith('skills/')) continue;
      const key = f.split('/')[1] + '\0' + body.trim();
      assert.ok(!seen.has(key), `${f}: same block as ${seen.get(key)}`);
      seen.set(key, f);
    }
  }
});

test('both copies of ensure-cli.sh are identical', () => {
  assert.equal(
    readFileSync('skills/firstsales/scripts/ensure-cli.sh', 'utf8'),
    readFileSync('skills/firstsales-setup/scripts/ensure-cli.sh', 'utf8'),
  );
});
