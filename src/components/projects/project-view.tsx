import { notFound } from 'next/navigation';
import { loadProjectDetail } from '@/api/projects/load-project-detail';
import { ProjectHeader } from '@/components/projects/project-header';
import { ProjectPreview } from '@/components/projects/project-preview';
import { ProjectReadme } from '@/components/projects/project-readme';
import { PROJECTS } from '@/lib/constants/projects';
import type { ProjectRouteParams } from '@/lib/types/project-route-params';
import { findProjectEntry } from '@/services/projects/find-project-entry';

/**
 * A full project page. Awaits the route params itself (inside the page's
 * Suspense boundary) and answers repos that aren't in the config with a 404.
 */
export async function ProjectView({
  params,
}: Readonly<{ params: Promise<ProjectRouteParams> }>) {
  const { repo } = await params;
  const entry = findProjectEntry(repo, PROJECTS);
  if (!entry) {
    notFound();
  }
  const project = await loadProjectDetail(entry);

  return (
    <article className="flex flex-col gap-10">
      <ProjectHeader project={project} />
      <ProjectPreview project={project} />
      <ProjectReadme html={project.readmeHtml} />
    </article>
  );
}
