import { ProjectLinks } from '@/components/projects/project-links';
import { ProjectTags } from '@/components/projects/project-tags';
import type { Project } from '@/lib/types/project';
import { classNames } from '@/utils/class-names';
import { formatDate } from '@/utils/format-date';

/** The top of a project page: name, blurb, details, last update, links. */
export function ProjectHeader({ project }: Readonly<{ project: Project }>) {
  return (
    <header className="flex flex-col gap-4">
      <h1 className="m-0">{project.title}</h1>
      {project.blurb ? (
        <p
          className={classNames(
            'm-0 max-w-(--measure)',
            'text-(length:--step-1) text-fg-alt',
          )}
        >
          {project.blurb}
        </p>
      ) : null}
      <ProjectTags project={project} />
      {project.pushedAt ? (
        <p className="m-0 text-fg-muted">
          Updated{' '}
          <time dateTime={project.pushedAt}>
            {formatDate(project.pushedAt)}
          </time>
        </p>
      ) : null}
      <ProjectLinks project={project} />
    </header>
  );
}
