import { REPO } from '@test/fixtures/repo';
import { REPO_RESPONSE } from '@test/fixtures/repo-response';
import { describe, expect, test } from 'vitest';
import { repoSchema } from '@/lib/models/repo-schema';

describe('repoSchema', () => {
  test('drops unused fields so new ones are harmless', () => {
    expect(repoSchema.parse(REPO_RESPONSE)).toEqual(REPO);
  });

  test('nulls blank description/homepage for the UI', () => {
    const parsed = repoSchema.parse({
      ...REPO_RESPONSE,
      description: null,
      homepage: '  ',
    });
    expect(parsed.description).toBeNull();
    expect(parsed.homepage).toBeNull();
  });

  test('defaults optional fields GitHub may omit', () => {
    const { topics, archived, default_branch, ...minimal } = REPO_RESPONSE;
    const parsed = repoSchema.parse(minimal);
    expect(parsed.topics).toEqual([]);
    expect(parsed.archived).toBe(false);
    expect(parsed.defaultBranch).toBe('main');
  });

  test('rejects a response without the fields the site depends on', () => {
    expect(repoSchema.safeParse({ description: 'x' }).success).toBe(false);
  });
});
