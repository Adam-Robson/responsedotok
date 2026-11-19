/**
 * Matches a `--name: hsla(h, s%, l%` custom property, capturing the name,
 * hue, saturation and lightness. Global, for use with String.matchAll.
 */
export const HSLA_PATTERN =
  /--([\w-]+):\s*hsla\(\s*([\d.]+),\s*([\d.]+)%,\s*([\d.]+)%/g;
