import type { ProjectEntry } from '@/lib/types/project-entry';

/**
 * The config entry for a repo name, or null. Only listed repos get a page,
 * so an unknown name in the URL can be answered with a 404.
 */
export function findProjectEntry(
  repo: string,
  entries: readonly ProjectEntry[],
): ProjectEntry | null {
  return entries.find((entry) => entry.repo === repo) ?? null;
}
