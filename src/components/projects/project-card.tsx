import Image from 'next/image';
import Link from 'next/link';
import { ProjectLinks } from '@/components/projects/project-links';
import { ProjectTags } from '@/components/projects/project-tags';
import type { Project } from '@/lib/types/project';
import { classNames } from '@/utils/class-names';

/** One project in the list: screenshot, name, blurb, details and links. */
export function ProjectCard({ project }: Readonly<{ project: Project }>) {
  return (
    <article
      className={classNames(
        'flex h-full flex-col gap-3 rounded-(--radius) p-5',
        'border border-line bg-bg-alt',
      )}
    >
      {project.image ? (
        <div
          className={classNames(
            'relative aspect-[16/10] overflow-hidden',
            'rounded-(--radius)',
          )}
        >
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            sizes="(max-width: 52rem) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <h2 className="m-0 text-(length:--step-2)">
        <Link href={`/p/${project.repo}`} className="text-fg">
          {project.title}
        </Link>
      </h2>
      {project.blurb ? (
        <p className="m-0 text-fg-alt">{project.blurb}</p>
      ) : null}
      <ProjectTags project={project} />
      <div className="mt-auto">
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}
