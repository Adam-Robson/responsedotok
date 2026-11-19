/**
 * Joins class names, skipping falsy entries. Lets long Tailwind class lists
 * be split across lines and parts be toggled with `condition && 'class'`.
 */
export function classNames(
  ...names: ReadonlyArray<string | false | null | undefined>
): string {
  return names.filter(Boolean).join(' ');
}
