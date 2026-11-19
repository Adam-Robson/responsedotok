/**
 * The repo segment of a `/p/<repo>` path, decoded, or null for any other
 * path shape. Malformed percent-encoding also yields null.
 */
export function projectRepoFromPath(pathname: string): string | null {
  const match = /^\/p\/([^/]+)\/?$/.exec(pathname);
  if (!match?.[1]) {
    return null;
  }
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return null;
  }
}
