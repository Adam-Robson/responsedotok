import { PROJECT_KIND_LABELS } from '@/lib/constants/project-kind-labels';
import type { Project } from '@/lib/types/project';
import { classNames } from '@/utils/class-names';

/** Kind, language and archived status as a row of small labels. */
export function ProjectTags({
  project,
}: Readonly<{ project: Pick<Project, 'kind' | 'language' | 'archived'> }>) {
  return (
    <ul
      aria-label="Project details"
      className={classNames(
        'm-0 flex list-none flex-wrap gap-2 p-0',
        'text-(length:--step--1) text-fg-muted',
      )}
    >
      <li>{PROJECT_KIND_LABELS[project.kind]}</li>
      {project.language ? <li>{project.language}</li> : null}
      {project.archived ? <li>Archived</li> : null}
    </ul>
  );
}
