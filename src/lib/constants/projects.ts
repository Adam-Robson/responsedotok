import type { ProjectEntry } from '@/lib/types/project-entry';

/** The hand-picked project list. Array order is display order. */
export const PROJECTS: readonly ProjectEntry[] = [
  { repo: 'id', title: 'le fog', kind: 'site' },
  { repo: 'container', kind: 'template', embed: true },
  { repo: 'shufffle', kind: 'library' },
  { repo: 'weather', kind: 'server' },
  { repo: 'express-typescript-server', kind: 'server' },
  { repo: 'cloud-starter-template', kind: 'template' },
  {
    repo: 'teleprompter',
    kind: 'tool',
    // TODO(Adam): GitHub has no description for this repo; replace this.
    blurb: 'A teleprompter app written in C#.',
  },
  { repo: 'webpackts', kind: 'template' },
];
