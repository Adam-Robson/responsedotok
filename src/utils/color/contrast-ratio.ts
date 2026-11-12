import type { Rgb } from '@/lib/types/rgb';
import { relativeLuminance } from '@/utils/color/relative-luminance';

/** WCAG contrast ratio between two colors, from 1 to 21. Order-independent. */
export function contrastRatio(a: Rgb, b: Rgb): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}
