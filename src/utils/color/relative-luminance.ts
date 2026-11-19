import type { Rgb } from '@/lib/types/rgb';

/** WCAG 2.x relative luminance of an sRGB color, from 0 (black) to 1. */
export function relativeLuminance([red, green, blue]: Rgb): number {
  const linear = (c: number): number =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  return 0.2126 * linear(red) + 0.7152 * linear(green) + 0.0722 * linear(blue);
}
