import { describe, expect, test } from 'vitest';
import { classNames } from '@/utils/class-names';

describe('classNames', () => {
  test('joins parts with spaces, so long lists can span lines', () => {
    expect(classNames('a b', 'c')).toBe('a b c');
  });

  test('skips falsy parts, so classes can be toggled inline', () => {
    const active = false;
    expect(classNames('a', active && 'b', null, undefined, '')).toBe('a');
  });
});
