import { describe, expect, test } from 'vitest';
import { generateMetadata } from '@/api/projects/generate-metadata';
import { generateStaticParams } from '@/api/projects/generate-static-params';
import * as projectPage from '@/app/p/[repo]/page';

describe('/p/[repo] route module', () => {
  test('wires the route exports Next.js looks for to the api helpers', () => {
    expect(projectPage.generateStaticParams).toBe(generateStaticParams);
    expect(projectPage.generateMetadata).toBe(generateMetadata);
    expect(projectPage.default).toBeTypeOf('function');
  });
});
