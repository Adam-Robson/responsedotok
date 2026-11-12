import { describe, expect, test } from 'vitest';
import { emptyToNull } from '@/utils/empty-to-null';

describe('emptyToNull', () => {
  test.each([
    ['empty string', ''],
    ['whitespace', '  \n'],
    ['null', null],
    ['undefined', undefined],
  ])('maps %s to null: one form of "no value"', (_label, value) => {
    expect(emptyToNull(value)).toBeNull();
  });

  test('trims real values', () => {
    expect(emptyToNull('  hi ')).toBe('hi');
  });
});
