/**
 * Resolves a README-relative path to a path from the repo root:
 * "./a/../b.png" → "b.png". A leading "/" means repo root on GitHub.
 */
export function resolveRepoPath(path: string): string {
  const fromRoot = path.replace(/^\/+/, '');
  const resolved = new URL(fromRoot, 'https://repo.invalid/').pathname;
  return resolved.replace(/^\/+/, '');
}
