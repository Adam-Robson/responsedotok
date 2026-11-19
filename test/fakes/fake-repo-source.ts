import { vi } from 'vitest';
import type { RepoSource } from '@/lib/protocols/repo-source';
import type { Repo } from '@/lib/types/repo';

/**
 * A RepoSource that returns fixed values, so services can be tested
 * without a network or a mocked fetch.
 */
export function fakeRepoSource(
  repo: Repo | null,
  readmeHtml: string | null,
): RepoSource {
  return {
    getRepo: vi.fn(async () => repo),
    getReadmeHtml: vi.fn(async () => readmeHtml),
  };
}
