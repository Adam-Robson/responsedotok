import Image from 'next/image';
import type { Project } from '@/lib/types/project';
import { classNames } from '@/utils/class-names';

/**
 * Shows the product itself: the live site in a sandboxed iframe where it
 * allows framing, else the screenshot (linked to the live site when there
 * is one), else nothing.
 */
export function ProjectPreview({
  project,
}: Readonly<{
  project: Pick<Project, 'title' | 'liveUrl' | 'embed' | 'image'>;
}>) {
  const frame = classNames(
    'relative aspect-[16/10] w-full overflow-hidden',
    'rounded-(--radius) border border-line',
  );

  if (project.embed && project.liveUrl) {
    return (
      <iframe
        src={project.liveUrl}
        title={`${project.title} live preview`}
        sandbox="allow-scripts allow-same-origin allow-forms"
        loading="lazy"
        className={classNames(frame, 'bg-bg-alt')}
      />
    );
  }

  if (!project.image) {
    return null;
  }

  const screenshot = (
    <Image
      src={project.image}
      alt={`Screenshot of ${project.title}`}
      fill
      sizes="(max-width: 72rem) 100vw, 72rem"
      className="object-cover"
    />
  );

  return project.liveUrl ? (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={classNames(frame, 'block')}
    >
      {screenshot}
    </a>
  ) : (
    <div className={frame}>{screenshot}</div>
  );
}
