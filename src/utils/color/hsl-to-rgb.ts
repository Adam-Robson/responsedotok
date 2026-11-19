import type { Hsl } from '@/lib/types/hsl';
import type { Rgb } from '@/lib/types/rgb';

/** Converts HSL (CSS Color 4 algorithm) to sRGB channels in 0–1. */
export function hslToRgb([hue, saturation, lightness]: Hsl): Rgb {
  const s = saturation / 100;
  const l = lightness / 100;
  const chroma = s * Math.min(l, 1 - l);
  const channel = (n: number): number => {
    const k = (n + hue / 30) % 12;
    return l - chroma * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return [channel(0), channel(8), channel(4)];
}
