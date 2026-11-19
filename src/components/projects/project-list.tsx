import { ProjectCard } from '@/components/projects/project-card';
import type { Project } from '@/lib/types/project';

/** The project cards as a responsive grid, in the order given. */
export function ProjectList({
  projects,
}: Readonly<{ projects: readonly Project[] }>) {
  return (
    <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <li key={project.repo}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
