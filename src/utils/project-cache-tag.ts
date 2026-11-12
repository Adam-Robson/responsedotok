/** The cache tag for one project, so it can be revalidated on its own. */
export function projectCacheTag(repo: string): string {
  return `project:${repo}`;
}
