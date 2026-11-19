import { describe, expect, test } from 'vitest';
import { generateStaticParams } from '@/api/projects/generate-static-params';
import { PROJECTS } from '@/lib/constants/projects';

describe('generateStaticParams', () => {
  test('prerenders a page for every listed project', () => {
    expect(generateStaticParams()).toEqual(
      PROJECTS.map(({ repo }) => ({ repo })),
    );
  });
});
