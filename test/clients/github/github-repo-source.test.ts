import { describe, expect, test } from 'vitest';
import { getReadmeHtml } from '@/clients/github/get-readme-html';
import { getRepo } from '@/clients/github/get-repo';
import { githubRepoSource } from '@/clients/github/github-repo-source';

describe('githubRepoSource', () => {
  test('is the GitHub client exposed through the RepoSource contract', () => {
    expect(githubRepoSource.getRepo).toBe(getRepo);
    expect(githubRepoSource.getReadmeHtml).toBe(getReadmeHtml);
  });
});
