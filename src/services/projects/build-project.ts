import { GITHUB_OWNER } from '@/lib/constants/github-owner';
import type { RepoSource } from '@/lib/protocols/repo-source';
import type { Project } from '@/lib/types/project';
import type { ProjectEntry } from '@/lib/types/project-entry';
import { mergeProject } from '@/services/projects/merge-project';

/** Card data for one project, from whichever RepoSource is supplied. */
export async function buildProject(
  entry: ProjectEntry,
  source: RepoSource,
): Promise<Project> {
  const repo = await source.getRepo(GITHUB_OWNER, entry.repo);
  return mergeProject(entry, repo);
}
