import { loadProjects } from '@/api/projects/load-projects';
import { ProjectList } from '@/components/projects/project-list';
import { SITE_NAME } from '@/lib/constants/site-name';

export default async function Home() {
  const projects = await loadProjects();

  return (
    <main
      id="main"
      className="mx-auto w-full max-w-(--page) px-(--gutter) py-16"
    >
      <h1>{SITE_NAME}</h1>
      <p className="max-w-(--measure) text-fg-alt">
        Things I have built: sites, libraries, servers and templates. Each links
        to its live version where there is one, and to its source.
      </p>
      <ProjectList projects={projects} />
    </main>
  );
}
