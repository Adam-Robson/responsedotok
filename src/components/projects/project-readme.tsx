/**
 * Renders a project's README. The HTML comes only from GitHub's renderer for
 * repos in the config, and GitHub sanitizes it, so it is injected as is.
 * That is why biome.json allows dangerouslySetInnerHTML in this file only.
 */
export function ProjectReadme({ html }: Readonly<{ html: string | null }>) {
  if (!html) {
    return null;
  }
  return (
    <section
      aria-label="README"
      className="prose max-w-(--measure)"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
