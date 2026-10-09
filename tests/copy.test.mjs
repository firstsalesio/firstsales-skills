// Public repo: no internal vendor or competitor names, no real ids, no keys in argv.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const files = execSync('git ls-files -co --exclude-standard', { encoding: 'utf8' })
  .split('\n')
  .filter((f) => /\.(md|json|sh)$/.test(f));
const banned = /\b(apify|openrouter|gojiberry|instantly|lemlist|apollo|smartlead|clay|deepseek|60db)\b/i;

for (const f of files) {
  test(`clean copy: ${f}`, () => {
    const text = readFileSync(f, 'utf8');
    assert.doesNotMatch(text, banned);
    assert.doesNotMatch(text, /\b[0-9a-f]{24}\b/, 'real-looking 24-hex id');
    assert.doesNotMatch(text, /--api-key\s+sk_/, 'key on the command line');
    assert.doesNotMatch(text, /@(firstsales\.io|tinycheque\.com)\b(?!\/cli)/, 'real email');
  });
}
