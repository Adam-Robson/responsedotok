import { describe, expect, test } from 'vitest';
import { resolveRepoPath } from '@/utils/resolve-repo-path';

describe('resolveRepoPath', () => {
  test.each([
    ['plain path', 'docs/a.png', 'docs/a.png'],
    ['dot segment', './a.png', 'a.png'],
    ['parent segment', 'docs/../a.png', 'a.png'],
    [
      'repo-root path, as GitHub reads a leading slash',
      '/docs/a.png',
      'docs/a.png',
    ],
    ['parent above root, clamped to root', '../a.png', 'a.png'],
  ])('resolves a %s', (_label, input, expected) => {
    expect(resolveRepoPath(input)).toBe(expected);
  });
});
