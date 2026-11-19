import { describe, expect, test } from 'vitest';
import { PROJECTS } from '@/lib/constants/projects';

describe('PROJECTS', () => {
  test('lists each repo once: it is the page URL and list key', () => {
    const repos = PROJECTS.map(({ repo }) => repo);
    expect(new Set(repos).size).toBe(repos.length);
  });

  test('uses URL-safe repo names, since they become /p/[repo] paths', () => {
    for (const { repo } of PROJECTS) {
      expect(repo).toMatch(/^[A-Za-z0-9._-]+$/);
    }
  });

  test('gives screenshots root-relative paths under /public', () => {
    for (const { image } of PROJECTS) {
      if (image) {
        expect(image).toMatch(/^\//);
      }
    }
  });
});
