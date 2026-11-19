import { describe, expect, test } from 'vitest';
import { projectRepoFromPath } from '@/utils/project-repo-from-path';

describe('projectRepoFromPath', () => {
  test.each([
    ['a project path', '/p/id', 'id'],
    ['a trailing slash', '/p/id/', 'id'],
    ['dots and dashes', '/p/cloud-starter.v2', 'cloud-starter.v2'],
    ['percent-encoding, decoded', '/p/le%20fog', 'le fog'],
  ])('reads the repo from %s', (_label, path, repo) => {
    expect(projectRepoFromPath(path)).toBe(repo);
  });

  test.each([
    ['the project index', '/p/'],
    ['a nested path', '/p/id/extra'],
    ['another route', '/about'],
    ['malformed encoding', '/p/%E0%A4%A'],
  ])('is null for %s, so the proxy treats it as unknown', (_label, path) => {
    expect(projectRepoFromPath(path)).toBeNull();
  });
});
