import { KEPT_URL_PATTERN } from '@/lib/constants/kept-url-pattern';
import { URL_ATTRIBUTE_PATTERN } from '@/lib/constants/url-attribute-pattern';
import type { RepoRef } from '@/lib/types/repo-ref';
import { resolveRepoPath } from '@/utils/resolve-repo-path';

/**
 * Makes relative README URLs absolute so they work off GitHub:
 * images (`src`) → raw.githubusercontent.com,
 * links (`href`) → github.com/{owner}/{repo}/blob/{branch}/.
 */
export function rewriteReadmeLinks(html: string, ref: RepoRef): string {
  const { owner, repo, branch } = ref;
  const raw = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/`;
  const blob = `https://github.com/${owner}/${repo}/blob/${branch}/`;

  return html.replace(
    URL_ATTRIBUTE_PATTERN,
    (match, attribute: string, quote: string, url: string) => {
      if (!url || KEPT_URL_PATTERN.test(url)) {
        return match;
      }
      const base = attribute.toLowerCase() === 'src' ? raw : blob;
      return `${attribute}=${quote}${base}${resolveRepoPath(url)}${quote}`;
    },
  );
}
