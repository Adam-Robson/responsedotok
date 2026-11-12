import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { getReadmeHtml } from '@/clients/github/get-readme-html';

const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('getReadmeHtml', () => {
  test('requests rendered HTML; no markdown lib needed', async () => {
    fetchMock.mockResolvedValue(new Response('<h1>Hi</h1>'));
    expect(await getReadmeHtml('Adam-Robson', 'thing')).toBe('<h1>Hi</h1>');
    const [url, init] = fetchMock.mock.calls[0] ?? [];
    expect(url).toBe('https://api.github.com/repos/Adam-Robson/thing/readme');
    expect(init.headers.Accept).toBe('application/vnd.github.html+json');
  });

  test('resolves null for a repo without a README', async () => {
    fetchMock.mockResolvedValue(new Response('', { status: 404 }));
    expect(await getReadmeHtml('Adam-Robson', 'thing')).toBeNull();
  });

  test('treats a blank README as absent (no empty section)', async () => {
    fetchMock.mockResolvedValue(new Response('  \n'));
    expect(await getReadmeHtml('Adam-Robson', 'thing')).toBeNull();
  });
});
