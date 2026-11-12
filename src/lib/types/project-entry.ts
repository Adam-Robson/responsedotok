import type { ProjectKind } from '@/lib/types/project-kind';

/**
 * One hand-picked project in the config list. Every optional field
 * overrides what GitHub reports for the repo.
 */
export type ProjectEntry = {
  /** Repo name under GITHUB_OWNER. */
  repo: string;
  kind: ProjectKind;
  /** Display name; defaults to the repo name. */
  title?: string;
  /** Overrides the GitHub description. */
  blurb?: string;
  /** Overrides the GitHub homepage field. */
  liveUrl?: string;
  /** True only where the live site allows framing. */
  embed?: boolean;
  /** Screenshot path under /public, e.g. '/projects/container.png'. */
  image?: string;
};
