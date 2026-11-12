import { fakeRepoSource } from '@test/fakes/fake-repo-source';
import { REPO } from '@test/fixtures/repo';
import { describe, expect, test } from 'vitest';
import { buildProjectDetail } from '@/services/projects/build-project-detail';

const entry = { repo: 'thing', kind: 'site' } as const;

describe('buildProjectDetail', () => {
  test('rewrites links on the default branch', async () => {
    const detail = await buildProjectDetail(
      entry,
      fakeRepoSource({ ...REPO, defaultBranch: 'trunk' }, '<img src="a.png">'),
    );
    expect(detail.readmeHtml).toContain('raw.githubusercontent.com');
    expect(detail.readmeHtml).toContain('/Adam-Robson/thing/trunk/a.png');
  });

  test('falls back to HEAD without repo data', async () => {
    const detail = await buildProjectDetail(
      entry,
      fakeRepoSource(null, '<a href="b.md">b</a>'),
    );
    expect(detail.readmeHtml).toContain('/blob/HEAD/b.md');
  });

  test('has a null README when there is none', async () => {
    const detail = await buildProjectDetail(entry, fakeRepoSource(REPO, null));
    expect(detail.readmeHtml).toBeNull();
    expect(detail.blurb).toBe('A thing');
  });
});
