import { PROJECT } from '@test/fixtures/project';
import { describe, expect, test, vi } from 'vitest';
import { generateMetadata } from '@/api/projects/generate-metadata';
import { loadProject } from '@/api/projects/load-project';

vi.mock('@/api/projects/load-project', () => ({ loadProject: vi.fn() }));

const params = (repo: string) => Promise.resolve({ repo });

describe('generateMetadata', () => {
  test('titles the page after the project, with the site name', async () => {
    vi.mocked(loadProject).mockResolvedValue({ ...PROJECT, title: 'le fog' });
    expect(await generateMetadata({ params: params('id') })).toEqual({
      title: 'le fog · responsedotok',
      description: 'A thing',
    });
  });

  test('omits the description when there is no blurb', async () => {
    vi.mocked(loadProject).mockResolvedValue({ ...PROJECT, blurb: null });
    const metadata = await generateMetadata({ params: params('id') });
    expect(metadata).not.toHaveProperty('description');
  });

  test('returns nothing for an unlisted repo and skips GitHub', async () => {
    vi.mocked(loadProject).mockClear();
    expect(await generateMetadata({ params: params('nope') })).toEqual({});
    expect(loadProject).not.toHaveBeenCalled();
  });
});
