import type { ProjectKind } from '@/lib/types/project-kind';

/** A config entry merged with GitHub data, ready to render as a card. */
export type Project = {
  repo: string;
  title: string;
  kind: ProjectKind;
  blurb: string | null;
  liveUrl: string | null;
  sourceUrl: string;
  /** True only when the config allows framing and there is a live URL. */
  embed: boolean;
  image: string | null;
  language: string | null;
  topics: string[];
  pushedAt: string | null;
  archived: boolean;
};
