import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { paletteContrast } from '@test/helpers/palette-contrast';
import { describe, expect, test } from 'vitest';
import { parseHslaPalette } from '@/utils/color/parse-hsla-palette';

/**
 * Guards WCAG 2.2 AA for every foreground/background pair the themes use.
 * It reads the shipped colors.css, so a palette edit that breaks contrast
 * fails CI. Text needs 4.5:1; large text, borders and focus rings need 3:1.
 */
const palette = parseHslaPalette(
  readFileSync(resolve(process.cwd(), 'src/css/colors.css'), 'utf8'),
);

const TEXT = 4.5;
const LARGE_OR_UI = 3;

type Pair = readonly [foreground: string, background: string, minimum: number];
type Theme = readonly [name: string, pairs: readonly Pair[]];

const THEMES: readonly Theme[] = [
  [
    'dark',
    [
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
      ['text', 'charcoal-blue', TEXT],
      ['rosy-copper', 'background', LARGE_OR_UI],
    ],
  ],
  [
    'light',
    [
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
    ],
  ],
];

describe.each(THEMES)('%s theme', (_theme, pairs) => {
  test.each(pairs)('--%s on --%s is at least %d:1', (fg, bg, minimum) => {
    expect(paletteContrast(palette, fg, bg)).toBeGreaterThanOrEqual(minimum);
  });
});
