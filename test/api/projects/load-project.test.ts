import { REPO } from '@test/fixtures/repo';
import { cacheLife, cacheTag } from 'next/cache';
import { describe, expect, test, vi } from 'vitest';
import { loadProject } from '@/api/projects/load-project';
import { getRepo } from '@/clients/github/get-repo';

vi.mock('next/cache', () => ({ cacheLife: vi.fn(), cacheTag: vi.fn() }));
vi.mock('@/clients/github/get-repo', () => ({ getRepo: vi.fn() }));

describe('loadProject', () => {
  test('reads card data from GitHub', async () => {
    vi.mocked(getRepo).mockResolvedValue(REPO);
    const project = await loadProject({ repo: 'thing', kind: 'site' });
    expect(project.blurb).toBe('A thing');
  });

  test('caches hours under a per-project tag', async () => {
    vi.mocked(getRepo).mockResolvedValue(REPO);
    await loadProject({ repo: 'thing', kind: 'site' });
    expect(cacheLife).toHaveBeenCalledWith('hours');
    expect(cacheTag).toHaveBeenCalledWith('project:thing');
  });
});
