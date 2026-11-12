import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';

/**
 * Reads the real palette from src/css/colors.css so this test can't drift
 * from what ships. Checks WCAG 2.2 AA for every role pair the UI uses.
 */
const css = readFileSync(
  resolve(import.meta.dirname, '../css/colors.css'),
  'utf8',
);

const palette: Record<string, [number, number, number]> = {};
for (const m of css.matchAll(
  /--([\w-]+):\s*hsla\(\s*([\d.]+),\s*([\d.]+)%,\s*([\d.]+)%/g,
)) {
  palette[m[1]] = [Number(m[2]), Number(m[3]), Number(m[4])];
}

function hslToRgb([h, s, l]: [number, number, number]): [
  number,
  number,
  number,
] {
  const sat = s / 100;
  const lig = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sat * Math.min(lig, 1 - lig);
  const f = (n: number) =>
    lig - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return [f(0), f(8), f(4)];
}

function luminance(name: string): number {
  const hsl = palette[name];
  if (!hsl) throw new Error(`--${name} not found in colors.css`);
  const [r, g, b] = hslToRgb(hsl).map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const TEXT = 4.5;
const LARGE_OR_UI = 3;

// [foreground, background, minimum ratio]
const dark: [string, string, number][] = [
  ['text', 'background', TEXT],
  ['text', 'background-alt', TEXT],
  ['text-alt', 'background', TEXT],
  ['text-alt', 'background-alt', TEXT],
  ['cool-steel', 'background', TEXT],
  ['cool-steel', 'background-alt', TEXT],
  ['cool-steel-2', 'background', TEXT],
  ['cool-steel-2', 'background-alt', TEXT],
  ['rosy-copper-text', 'background', TEXT],
  ['rosy-copper-text', 'background-alt', TEXT],
  ['vanilla-custard', 'background', TEXT],
  ['vanilla-custard', 'background-alt', TEXT],
  ['rosy-copper', 'background', LARGE_OR_UI], // decorative / large text only
  ['text', 'charcoal-blue', TEXT], // text on --surface fills
];

const light: [string, string, number][] = [
  ['background', 'text', TEXT],
  ['background', 'text-alt', TEXT],
  ['background-alt', 'text', TEXT],
  ['background-alt', 'text-alt', TEXT],
  ['cool-steel-dark', 'text', TEXT],
  ['cool-steel-dark', 'text-alt', TEXT],
  ['rosy-copper-dark', 'text', TEXT],
  ['rosy-copper-dark', 'text-alt', TEXT],
  ['charcoal-blue', 'text', TEXT],
  ['charcoal-blue', 'text-alt', TEXT],
];

describe.each([
  ['dark', dark],
  ['light', light],
])('%s theme contrast', (_theme, pairs) => {
  test.each(pairs)('%s on %s ≥ %d:1', (fg, bg, min) => {
    expect(contrast(fg, bg)).toBeGreaterThanOrEqual(min);
  });
});
