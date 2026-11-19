import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { githubFetch } from '@/clients/github/github-fetch';

const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe('githubFetch', () => {
  test('sends GITHUB_TOKEN to lift the 60/hour limit', async () => {
    vi.stubEnv('GITHUB_TOKEN', 'abc');
    fetchMock.mockResolvedValue(new Response('{}'));
    await githubFetch('/x', 'application/json');
    const [, init] = fetchMock.mock.calls[0] ?? [];
    expect(init.headers.Authorization).toBe('Bearer abc');
  });

  test('stays anonymous without a token', async () => {
    vi.stubEnv('GITHUB_TOKEN', '');
    fetchMock.mockResolvedValue(new Response('{}'));
    await githubFetch('/x', 'application/json');
    const [, init] = fetchMock.mock.calls[0] ?? [];
    expect(init.headers.Authorization).toBeUndefined();
  });

  test('pins the API version so response shapes stay stable', async () => {
    fetchMock.mockResolvedValue(new Response('{}'));
    await githubFetch('/x', 'application/json');
    const [url, init] = fetchMock.mock.calls[0] ?? [];
    expect(url).toBe('https://api.github.com/x');
    expect(init.headers['X-GitHub-Api-Version']).toBe('2022-11-28');
  });

  test.each([
    ['not found', 404],
    ['rate limited', 403],
    ['server error', 500],
  ])('is null when %s so pages degrade, not crash', async (_label, status) => {
    fetchMock.mockResolvedValue(new Response('', { status }));
    expect(await githubFetch('/x', 'application/json')).toBeNull();
  });

  test('resolves null on a network error rather than throwing', async () => {
    fetchMock.mockRejectedValue(new TypeError('fetch failed'));
    expect(await githubFetch('/x', 'application/json')).toBeNull();
  });
});
