import { REPO } from '@test/fixtures/repo';
import { cacheLife, cacheTag } from 'next/cache';
import { describe, expect, test, vi } from 'vitest';
import { loadProjectDetail } from '@/api/projects/load-project-detail';
import { getReadmeHtml } from '@/clients/github/get-readme-html';
import { getRepo } from '@/clients/github/get-repo';

vi.mock('next/cache', () => ({ cacheLife: vi.fn(), cacheTag: vi.fn() }));
vi.mock('@/clients/github/get-repo', () => ({ getRepo: vi.fn() }));
vi.mock('@/clients/github/get-readme-html', () => ({
  getReadmeHtml: vi.fn(),
}));

describe('loadProjectDetail', () => {
  test('reads the project and its README from GitHub', async () => {
    vi.mocked(getRepo).mockResolvedValue(REPO);
    vi.mocked(getReadmeHtml).mockResolvedValue('<p>hi</p>');
    const detail = await loadProjectDetail({ repo: 'thing', kind: 'site' });
    expect(detail.readmeHtml).toBe('<p>hi</p>');
  });

  test('shares the card tag so both refresh together', async () => {
    vi.mocked(getRepo).mockResolvedValue(REPO);
    vi.mocked(getReadmeHtml).mockResolvedValue(null);
    await loadProjectDetail({ repo: 'thing', kind: 'site' });
    expect(cacheLife).toHaveBeenCalledWith('hours');
    expect(cacheTag).toHaveBeenCalledWith('project:thing');
  });
});
