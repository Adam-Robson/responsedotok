import { GITHUB_OWNER } from '@/lib/constants/github-owner';
import type { Project } from '@/lib/types/project';
import type { ProjectEntry } from '@/lib/types/project-entry';
import type { Repo } from '@/lib/types/repo';

/**
 * Merges a config entry with GitHub data (null when GitHub failed).
 * Config wins for title, blurb and live URL; with no GitHub data the
 * result is built from config alone.
 */
export function mergeProject(entry: ProjectEntry, repo: Repo | null): Project {
  const liveUrl = entry.liveUrl ?? repo?.homepage ?? null;
  return {
    repo: entry.repo,
    title: entry.title ?? entry.repo,
    kind: entry.kind,
    blurb: entry.blurb ?? repo?.description ?? null,
    liveUrl,
    sourceUrl:
      repo?.htmlUrl ?? `https://github.com/${GITHUB_OWNER}/${entry.repo}`,
    embed: Boolean(entry.embed && liveUrl),
    image: entry.image ?? null,
    language: repo?.language ?? null,
    topics: repo?.topics ?? [],
    pushedAt: repo?.pushedAt ?? null,
    archived: repo?.archived ?? false,
  };
}
