import { loadProject } from '@/api/projects/load-project';
import { PROJECTS } from '@/lib/constants/projects';
import type { Project } from '@/lib/types/project';

/** Card data for every listed project, in display order. */
export async function loadProjects(): Promise<Project[]> {
  return Promise.all(PROJECTS.map((entry) => loadProject(entry)));
}
