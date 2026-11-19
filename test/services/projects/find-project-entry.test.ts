import { describe, expect, test } from 'vitest';
import type { ProjectEntry } from '@/lib/types/project-entry';
import { findProjectEntry } from '@/services/projects/find-project-entry';

const entries: readonly ProjectEntry[] = [
  { repo: 'a', kind: 'site' },
  { repo: 'b', kind: 'tool' },
];

describe('findProjectEntry', () => {
  test('finds a listed repo by exact name', () => {
    expect(findProjectEntry('b', entries)).toBe(entries[1]);
  });

  test('is null for an unlisted repo, so its page can 404', () => {
    expect(findProjectEntry('c', entries)).toBeNull();
  });

  test('is case-sensitive, matching GitHub repo URLs in the config', () => {
    expect(findProjectEntry('A', entries)).toBeNull();
  });
});
