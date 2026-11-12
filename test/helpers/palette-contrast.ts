import type { Hsl } from '@/lib/types/hsl';
import { contrastRatio } from '@/utils/color/contrast-ratio';
import { hslToRgb } from '@/utils/color/hsl-to-rgb';

/**
 * Contrast between two named palette colors. Throws on an unknown name so
 * a renamed token fails loudly instead of being skipped.
 */
export function paletteContrast(
  palette: ReadonlyMap<string, Hsl>,
  foreground: string,
  background: string,
): number {
  const fg = palette.get(foreground);
  const bg = palette.get(background);
  if (!fg || !bg) {
    throw new Error(`Missing --${foreground} or --${background}`);
  }
  return contrastRatio(hslToRgb(fg), hslToRgb(bg));
}
