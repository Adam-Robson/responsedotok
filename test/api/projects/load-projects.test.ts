import { PROJECT } from '@test/fixtures/project';
import { describe, expect, test, vi } from 'vitest';
import { loadProject } from '@/api/projects/load-project';
import { loadProjects } from '@/api/projects/load-projects';
import { PROJECTS } from '@/lib/constants/projects';
import type { ProjectEntry } from '@/lib/types/project-entry';

vi.mock('@/api/projects/load-project', () => ({ loadProject: vi.fn() }));

describe('loadProjects', () => {
  test('loads every listed project, keeping the config order', async () => {
    vi.mocked(loadProject).mockImplementation(async (e: ProjectEntry) => ({
      ...PROJECT,
      repo: e.repo,
    }));
    const projects = await loadProjects();
    expect(projects.map(({ repo }) => repo)).toEqual(
      PROJECTS.map(({ repo }) => repo),
    );
  });
});
