import { cacheLife, cacheTag } from 'next/cache';
import { githubRepoSource } from '@/clients/github/github-repo-source';
import type { ProjectDetail } from '@/lib/types/project-detail';
import type { ProjectEntry } from '@/lib/types/project-entry';
import { buildProjectDetail } from '@/services/projects/build-project-detail';
import { projectCacheTag } from '@/utils/project-cache-tag';

/** Project page data from GitHub, cached for about an hour. */
export async function loadProjectDetail(
  entry: ProjectEntry,
): Promise<ProjectDetail> {
  'use cache';
  cacheLife('hours');
  cacheTag(projectCacheTag(entry.repo));

  return buildProjectDetail(entry, githubRepoSource);
}
