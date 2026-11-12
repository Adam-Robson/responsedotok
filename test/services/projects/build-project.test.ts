import { fakeRepoSource } from '@test/fakes/fake-repo-source';
import { REPO } from '@test/fixtures/repo';
import { describe, expect, test } from 'vitest';
import { buildProject } from '@/services/projects/build-project';

describe('buildProject', () => {
  test('asks the source for the configured owner and repo', async () => {
    const source = fakeRepoSource(REPO, null);
    await buildProject({ repo: 'thing', kind: 'site' }, source);
    expect(source.getRepo).toHaveBeenCalledWith('Adam-Robson', 'thing');
  });

  test('does not fetch the README, since cards never show it', async () => {
    const source = fakeRepoSource(REPO, '<p>x</p>');
    await buildProject({ repo: 'thing', kind: 'site' }, source);
    expect(source.getReadmeHtml).not.toHaveBeenCalled();
  });

  test('merges what the source returns with the config entry', async () => {
    const project = await buildProject(
      { repo: 'thing', kind: 'site' },
      fakeRepoSource(REPO, null),
    );
    expect(project.blurb).toBe('A thing');
  });
});
