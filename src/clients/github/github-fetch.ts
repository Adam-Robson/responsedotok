import { githubToken } from '@/config/github-token';
import { GITHUB_API_URL } from '@/lib/constants/github-api-url';
import { GITHUB_API_VERSION } from '@/lib/constants/github-api-version';

/**
 * GET against the GitHub REST API. Sends GITHUB_TOKEN when set (anonymous
 * requests are limited to 60 an hour). Resolves to null on any failure
 * (network error, 404, rate limit) so callers degrade instead of throwing.
 */
export async function githubFetch(
  path: string,
  accept: string,
): Promise<Response | null> {
  const headers: Record<string, string> = {
    Accept: accept,
    'X-GitHub-Api-Version': GITHUB_API_VERSION,
  };
  const token = githubToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${GITHUB_API_URL}${path}`, { headers });
    return response.ok ? response : null;
  } catch {
    return null;
  }
}
