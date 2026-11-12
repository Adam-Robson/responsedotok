import { REPO } from '@test/fixtures/repo';
import { describe, expect, test } from 'vitest';
import type { ProjectEntry } from '@/lib/types/project-entry';
import { mergeProject } from '@/services/projects/merge-project';

const entry: ProjectEntry = { repo: 'thing', kind: 'site' };

describe('mergeProject', () => {
  test('fills bare entries from GitHub (low upkeep)', () => {
    expect(mergeProject(entry, REPO)).toMatchObject({
      title: 'thing',
      blurb: 'A thing',
      liveUrl: 'https://thing.example',
      sourceUrl: 'https://github.com/Adam-Robson/thing',
      language: 'TypeScript',
    });
  });

  test('lets config override title, blurb and live URL', () => {
    const overridden = mergeProject(
      { ...entry, title: 'Thing', blurb: 'Mine', liveUrl: 'https://m.example' },
      REPO,
    );
    expect(overridden).toMatchObject({
      title: 'Thing',
      blurb: 'Mine',
      liveUrl: 'https://m.example',
    });
  });

  test('uses config alone when GitHub failed', () => {
    expect(mergeProject({ ...entry, blurb: 'Mine' }, null)).toMatchObject({
      blurb: 'Mine',
      liveUrl: null,
      sourceUrl: 'https://github.com/Adam-Robson/thing',
      language: null,
      topics: [],
      pushedAt: null,
      archived: false,
    });
  });

  test('embeds only with a flag and a live URL target', () => {
    expect(mergeProject({ ...entry, embed: true }, REPO).embed).toBe(true);
    expect(mergeProject({ ...entry, embed: true }, null).embed).toBe(false);
    expect(mergeProject(entry, REPO).embed).toBe(false);
  });
});
