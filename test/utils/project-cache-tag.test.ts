import { describe, expect, test } from 'vitest';
import { projectCacheTag } from '@/utils/project-cache-tag';

describe('projectCacheTag', () => {
  test('is per repo, so one revalidates alone', () => {
    expect(projectCacheTag('a')).toBe('project:a');
    expect(projectCacheTag('a')).not.toBe(projectCacheTag('b'));
  });
});
