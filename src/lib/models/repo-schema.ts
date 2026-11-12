import { z } from 'zod';
import type { Repo } from '@/lib/types/repo';
import { emptyToNull } from '@/utils/empty-to-null';

/**
 * Validates a GitHub `GET /repos/{owner}/{repo}` response and reduces it
 * to a Repo. Unknown fields are dropped, so GitHub adding fields is harmless.
 */
export const repoSchema = z
  .object({
    description: z.string().nullish(),
    homepage: z.string().nullish(),
    topics: z.array(z.string()).default([]),
    language: z.string().nullish(),
    pushed_at: z.string(),
    html_url: z.url(),
    archived: z.boolean().default(false),
    default_branch: z.string().default('main'),
  })
  .transform(
    (r): Repo => ({
      description: emptyToNull(r.description),
      homepage: emptyToNull(r.homepage),
      topics: r.topics,
      language: r.language ?? null,
      pushedAt: r.pushed_at,
      htmlUrl: r.html_url,
      archived: r.archived,
      defaultBranch: r.default_branch,
    }),
  );
