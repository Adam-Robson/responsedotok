import { describe, expect, test } from 'vitest';
import { hslToRgb } from '@/utils/color/hsl-to-rgb';

describe('hslToRgb', () => {
  test.each([
    ['black', [0, 0, 0], [0, 0, 0]],
    ['white', [0, 0, 100], [1, 1, 1]],
    ['red', [0, 100, 50], [1, 0, 0]],
    ['green', [120, 100, 50], [0, 1, 0]],
    ['blue', [240, 100, 50], [0, 0, 1]],
  ] as const)('matches the CSS spec for %s', (_label, hsl, rgb) => {
    const [r, g, b] = hslToRgb(hsl);
    expect([r, g, b].map((c) => Number(c.toFixed(6)))).toEqual(rgb);
  });

  test('reproduces #c55549, which contrast relies on', () => {
    const hex = hslToRgb([6, 52, 53])
      .map((c) =>
        Math.round(c * 255)
          .toString(16)
          .padStart(2, '0'),
      )
      .join('');
    expect(hex).toBe('c55549');
  });
});
