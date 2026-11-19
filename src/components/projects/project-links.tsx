import type { Project } from '@/lib/types/project';
import { classNames } from '@/utils/class-names';

/** Live site (when there is one) and source links, opening in a new tab. */
export function ProjectLinks({
  project,
}: Readonly<{ project: Pick<Project, 'title' | 'liveUrl' | 'sourceUrl'> }>) {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
      {project.liveUrl ? (
        <li>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} live site`}
            className={classNames(
              'inline-block rounded-(--radius) px-4 py-2',
              'bg-accent font-semibold text-bg',
            )}
          >
            Open live
          </a>
        </li>
      ) : null}
      <li>
        <a
          href={project.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} source on GitHub`}
          className={classNames(
            'inline-block rounded-(--radius) px-4 py-2',
            'border border-line font-semibold text-fg',
          )}
        >
          Source
        </a>
      </li>
    </ul>
  );
}
