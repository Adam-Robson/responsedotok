import { describe, expect, test } from 'vitest';
import { contrastRatio } from '@/utils/color/contrast-ratio';

describe('contrastRatio', () => {
  test('is 21:1 for black on white, the WCAG maximum', () => {
    expect(contrastRatio([0, 0, 0], [1, 1, 1])).toBeCloseTo(21, 5);
  });

  test('is 1:1 for identical colors', () => {
    expect(contrastRatio([0.5, 0.5, 0.5], [0.5, 0.5, 0.5])).toBe(1);
  });

  test('does not depend on which color is foreground', () => {
    const a = [0.2, 0.4, 0.6] as const;
    const b = [0.9, 0.8, 0.1] as const;
    expect(contrastRatio(a, b)).toBe(contrastRatio(b, a));
  });
});
