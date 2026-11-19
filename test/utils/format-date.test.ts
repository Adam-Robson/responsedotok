import { describe, expect, test } from 'vitest';
import { formatDate } from '@/utils/format-date';

describe('formatDate', () => {
  test('renders a short, readable date', () => {
    expect(formatDate('2026-10-01T12:00:00Z')).toBe('Oct 1, 2026');
  });

  test('uses UTC, so builds match in any server time zone', () => {
    expect(formatDate('2026-10-01T23:30:00Z')).toBe('Oct 1, 2026');
    expect(formatDate('2026-10-01T00:30:00Z')).toBe('Oct 1, 2026');
  });
});
