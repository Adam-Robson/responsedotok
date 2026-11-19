/**
 * The optional GitHub token. Read on each call (not at module load) so the
 * value reflects the current environment. An empty string counts as unset.
 */
export function githubToken(): string | null {
  return process.env.GITHUB_TOKEN || null;
}
