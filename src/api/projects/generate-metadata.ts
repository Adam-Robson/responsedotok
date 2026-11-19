import type { Metadata } from 'next';
import { loadProject } from '@/api/projects/load-project';
import { PROJECTS } from '@/lib/constants/projects';
import { SITE_NAME } from '@/lib/constants/site-name';
import type { ProjectRouteParams } from '@/lib/types/project-route-params';
import { findProjectEntry } from '@/services/projects/find-project-entry';

/** Title and description for a project page */
export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<ProjectRouteParams> }>): Promise<Metadata> {
  const { repo } = await params;
  const entry = findProjectEntry(repo, PROJECTS);
  if (!entry) {
    return {};
  }
  const project = await loadProject(entry);
  return {
    title: `${project.title} · ${SITE_NAME}`,
    ...(project.blurb ? { description: project.blurb } : {}),
  };
}
