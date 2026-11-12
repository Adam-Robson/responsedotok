import { cacheLife, cacheTag } from 'next/cache';
import { githubRepoSource } from '@/clients/github/github-repo-source';
import type { Project } from '@/lib/types/project';
import type { ProjectEntry } from '@/lib/types/project-entry';
import { buildProject } from '@/services/projects/build-project';
import { projectCacheTag } from '@/utils/project-cache-tag';

/** Card data for one project from GitHub, cached for about an hour. */
export async function loadProject(entry: ProjectEntry): Promise<Project> {
  'use cache';
  cacheLife('hours');
  cacheTag(projectCacheTag(entry.repo));

  return buildProject(entry, githubRepoSource);
}
