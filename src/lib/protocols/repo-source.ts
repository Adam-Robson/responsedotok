import type { Repo } from '@/lib/types/repo';

/**
 * Where project data comes from. Services depend on this contract, not on
 * GitHub, so the source can be swapped (or faked in tests). Implementations
 * resolve to null on any failure instead of throwing.
 */
export interface RepoSource {
  getRepo(owner: string, repo: string): Promise<Repo | null>;
  getReadmeHtml(owner: string, repo: string): Promise<string | null>;
}
