// Every skill folder needs a SKILL.md whose front matter agents can load.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';

const skills = readdirSync('skills', { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);

test('both skills exist', () => {
  assert.deepEqual(skills.sort(), ['firstsales', 'firstsales-setup']);
});

for (const name of skills) {
  test(`${name}/SKILL.md front matter`, () => {
    const text = readFileSync(`skills/${name}/SKILL.md`, 'utf8');
    const m = text.match(/^---\n([\s\S]*?)\n---\n/);
    assert.ok(m, 'front matter block');
    const fm = Object.fromEntries(m[1].split('\n').map((l) => l.split(/:\s(.*)/s).slice(0, 2)));
    assert.equal(fm.name, name);
    assert.ok(fm.description && fm.description.length <= 1024, 'description 1-1024 chars');
  });
  test(`${name} runs ensure-cli first`, () => {
    assert.match(readFileSync(`skills/${name}/SKILL.md`, 'utf8'), /ensure-cli\.sh/);
  });
}
