import { REPO } from '@test/fixtures/repo';
import { REPO_RESPONSE } from '@test/fixtures/repo-response';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { getRepo } from '@/clients/github/get-repo';

const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('getRepo', () => {
  test('requests the repo endpoint and returns the parsed Repo', async () => {
    fetchMock.mockResolvedValue(Response.json(REPO_RESPONSE));
    expect(await getRepo('Adam-Robson', 'thing')).toEqual(REPO);
    const [url] = fetchMock.mock.calls[0] ?? [];
    expect(url).toBe('https://api.github.com/repos/Adam-Robson/thing');
  });

  test('is null on failure so callers can fall back', async () => {
    fetchMock.mockResolvedValue(new Response('', { status: 404 }));
    expect(await getRepo('Adam-Robson', 'thing')).toBeNull();
  });

  test('resolves null when GitHub returns an unexpected shape', async () => {
    fetchMock.mockResolvedValue(Response.json({ nope: true }));
    expect(await getRepo('Adam-Robson', 'thing')).toBeNull();
  });

  test('resolves null when the body is not JSON', async () => {
    fetchMock.mockResolvedValue(new Response('<html>'));
    expect(await getRepo('Adam-Robson', 'thing')).toBeNull();
  });
});
