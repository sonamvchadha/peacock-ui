// Fails the build if a text, control, or focus pair drops below WCAG 2.1 AA in any theme.
// Run with: npm run check:contrast
import { readFileSync } from 'node:fs';

const resolved = JSON.parse(readFileSync(new URL('../src/tokens/resolved.json', import.meta.url)));

const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = c.map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

// [foreground, background, minimum, why]
const pairs = [
  ['--pk-text-primary', '--pk-surface-page', 4.5, 'body text'],
  ['--pk-text-muted', '--pk-surface-page', 4.5, 'secondary text'],
  ['--pk-text-muted', '--pk-surface-raised', 4.5, 'secondary text on cards'],
  ['--pk-button-primary-text', '--pk-button-primary-bg', 4.5, 'button label'],
  ['--pk-button-primary-text', '--pk-button-primary-bg-hover', 4.5, 'button label on hover'],
  ['--pk-tag-text', '--pk-tag-bg', 4.5, 'tag label'],
  ['--pk-input-border', '--pk-surface-page', 3, 'control border'],
  ['--pk-input-border-focus', '--pk-surface-page', 3, 'focus ring'],
  ['--pk-feedback-danger', '--pk-surface-page', 4.5, 'error text'],
];

let failed = 0;
for (const [theme, tokens] of Object.entries(resolved)) {
  for (const [fg, bg, min, why] of pairs) {
    const r = ratio(tokens[fg], tokens[bg]);
    const ok = r >= min;
    if (!ok) failed++;
    console.log(`${ok ? 'pass' : 'FAIL'}  ${theme.padEnd(8)} ${r.toFixed(2).padStart(5)}:1 (min ${min})  ${why}`);
  }
}
if (failed) {
  console.error(`\n${failed} pair(s) below WCAG 2.1 AA.`);
  process.exit(1);
}
console.log('\nAll pairs meet WCAG 2.1 AA in every theme.');
