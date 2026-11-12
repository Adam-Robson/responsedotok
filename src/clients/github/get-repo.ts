import { githubFetch } from '@/clients/github/github-fetch';
import { GITHUB_JSON_MEDIA_TYPE } from '@/lib/constants/github-json-media-type';
import { repoSchema } from '@/lib/models/repo-schema';
import type { Repo } from '@/lib/types/repo';

/** GET /repos/{owner}/{repo} as a Repo. Null on any failure. */
export async function getRepo(
  owner: string,
  repo: string,
): Promise<Repo | null> {
  const response = await githubFetch(
    `/repos/${owner}/${repo}`,
    GITHUB_JSON_MEDIA_TYPE,
  );
  if (!response) {
    return null;
  }
  try {
    const parsed = repoSchema.safeParse(await response.json());
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}
