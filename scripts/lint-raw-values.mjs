// Fails if a component stylesheet uses a raw color, pixel size, or font name instead of a token.
// Structural values like 0, 100%, 1px and 2px borders are allowed.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../src/components/', import.meta.url));
const files = readdirSync(root, { recursive: true }).filter((f) => String(f).endsWith('.module.css'));
const rules = [
  [/#[0-9a-f]{3,8}\b/i, 'raw hex color: use a --pk- color token'],
  [/\brgba?\(|\bhsla?\(/i, 'raw color function: use a --pk- color token'],
  [/(?<![\w-])(?!(?:0|1|2)px)\d+px/, 'raw pixel size: use a --pk-space- or --pk-radius- token'],
  [/font-family:(?!\s*var\()/, 'raw font family: use a --pk-font- token'],
];
let problems = 0;
for (const f of files) {
  readFileSync(join(root, f), 'utf8').split('\n').forEach((line, i) => {
    for (const [re, msg] of rules) if (re.test(line)) { problems++; console.error(`${f}:${i + 1}  ${msg}\n    ${line.trim()}`); }
  });
}
if (problems) process.exit(1);
console.log(`No raw values in ${files.length} component stylesheets.`);
