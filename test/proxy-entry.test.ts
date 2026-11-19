import { describe, expect, test } from 'vitest';
import { proxy } from '@/api/routing/proxy';
import * as entry from '@/proxy';

describe('src/proxy.ts', () => {
  test('exposes the proxy function Next.js looks for', () => {
    expect(entry.proxy).toBe(proxy);
  });

  test('runs only on project paths, not on every request', () => {
    expect(entry.config).toEqual({ matcher: '/p/:repo' });
  });
});
