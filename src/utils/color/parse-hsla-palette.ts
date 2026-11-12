import { HSLA_PATTERN } from '@/lib/constants/hsla-pattern';
import type { Hsl } from '@/lib/types/hsl';

/**
 * Reads every `--name: hsla(h, s%, l%, a)` custom property from a stylesheet.
 * Alpha is ignored; the palette is fully opaque.
 */
export function parseHslaPalette(css: string): ReadonlyMap<string, Hsl> {
  const palette = new Map<string, Hsl>();
  for (const [, name, h, s, l] of css.matchAll(HSLA_PATTERN)) {
    if (name && h && s && l) {
      palette.set(name, [Number(h), Number(s), Number(l)]);
    }
  }
  return palette;
}
