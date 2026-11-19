import { NextRequest } from 'next/server';
import { describe, expect, test } from 'vitest';
import { proxy } from '@/api/routing/proxy';

const request = (path: string) =>
  new NextRequest(new URL(path, 'https://site.example'));

describe('proxy', () => {
  test('lets listed projects render normally', () => {
    const response = proxy(request('/p/id'));
    expect(response.headers.get('x-middleware-next')).toBe('1');
    expect(response.headers.get('x-middleware-rewrite')).toBeNull();
  });

  test.each([
    ['an unlisted repo', '/p/nope'],
    ['a wrongly cased repo', '/p/ID'],
    ['a nested path', '/p/id/extra'],
    ['malformed encoding', '/p/%E0%A4%A'],
  ])('rewrites %s to the not-found route for a real 404', (_label, path) => {
    const response = proxy(request(path));
    expect(response.headers.get('x-middleware-rewrite')).toBe(
      'https://site.example/_not-found',
    );
  });
});
