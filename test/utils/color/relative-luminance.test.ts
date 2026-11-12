import { describe, expect, test } from 'vitest';
import { relativeLuminance } from '@/utils/color/relative-luminance';

describe('relativeLuminance', () => {
  test('spans 0 for black to 1 for white, per WCAG', () => {
    expect(relativeLuminance([0, 0, 0])).toBe(0);
    expect(relativeLuminance([1, 1, 1])).toBeCloseTo(1, 10);
  });

  test('weights green most, as human vision does', () => {
    const red = relativeLuminance([1, 0, 0]);
    const green = relativeLuminance([0, 1, 0]);
    const blue = relativeLuminance([0, 0, 1]);
    expect(green).toBeGreaterThan(red);
    expect(red).toBeGreaterThan(blue);
  });
});
