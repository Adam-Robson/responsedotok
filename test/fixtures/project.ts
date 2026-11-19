import type { Project } from '@/lib/types/project';

/** A fully populated project, for overriding one field per test. */
export const PROJECT: Project = {
  repo: 'thing',
  title: 'Thing',
  kind: 'site',
  blurb: 'A thing',
  liveUrl: 'https://thing.example',
  sourceUrl: 'https://github.com/Adam-Robson/thing',
  embed: false,
  image: '/projects/thing.png',
  language: 'TypeScript',
  topics: ['typescript'],
  pushedAt: '2026-10-01T12:00:00Z',
  archived: false,
};
