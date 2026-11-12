import { GITHUB_OWNER } from '@/lib/constants/github-owner';
import type { RepoSource } from '@/lib/protocols/repo-source';
import type { ProjectDetail } from '@/lib/types/project-detail';
import type { ProjectEntry } from '@/lib/types/project-entry';
import { mergeProject } from '@/services/projects/merge-project';
import { rewriteReadmeLinks } from '@/services/readme/rewrite-readme-links';

/**
 * Project page data: the merged project plus its README with relative
 * links made absolute. The repo and README are fetched in parallel.
 */
export async function buildProjectDetail(
  entry: ProjectEntry,
  source: RepoSource,
): Promise<ProjectDetail> {
  const [repo, html] = await Promise.all([
    source.getRepo(GITHUB_OWNER, entry.repo),
    source.getReadmeHtml(GITHUB_OWNER, entry.repo),
  ]);

  const readmeHtml = html
    ? rewriteReadmeLinks(html, {
        owner: GITHUB_OWNER,
        repo: entry.repo,
        branch: repo?.defaultBranch ?? 'HEAD',
      })
    : null;

  return { ...mergeProject(entry, repo), readmeHtml };
}
