import { describe, expect, test } from 'vitest';
import { parseHslaPalette } from '@/utils/color/parse-hsla-palette';

describe('parseHslaPalette', () => {
  test('reads each hsla custom property by name', () => {
    const palette = parseHslaPalette(
      ':root { --ink: hsla(210, 8%, 13%, 1); --pale: hsla(0, 0%, 97.5%, 1); }',
    );
    expect(palette.get('ink')).toEqual([210, 8, 13]);
    expect(palette.get('pale')).toEqual([0, 0, 97.5]);
  });

  test('skips non-hsla values such as var() aliases', () => {
    const palette = parseHslaPalette(':root { --fg: var(--ink); --r: 6px; }');
    expect(palette.size).toBe(0);
  });

  test('tolerates values the formatter wrapped across lines', () => {
    const palette = parseHslaPalette(
      '--ink: hsla(\n  210,\n  8%,\n  13%,\n  1\n);',
    );
    expect(palette.get('ink')).toEqual([210, 8, 13]);
  });
});
