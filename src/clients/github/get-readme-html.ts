import { githubFetch } from '@/clients/github/github-fetch';
import { GITHUB_HTML_MEDIA_TYPE } from '@/lib/constants/github-html-media-type';

/**
 * GET /repos/{owner}/{repo}/readme as HTML. GitHub renders and sanitizes
 * the markdown, so no markdown library is needed. Null on any failure.
 */
export async function getReadmeHtml(
  owner: string,
  repo: string,
): Promise<string | null> {
  const response = await githubFetch(
    `/repos/${owner}/${repo}/readme`,
    GITHUB_HTML_MEDIA_TYPE,
  );
  if (!response) {
    return null;
  }
  try {
    const html = await response.text();
    return html.trim() ? html : null;
  } catch {
    return null;
  }
}
