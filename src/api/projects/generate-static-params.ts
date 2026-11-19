import { PROJECTS } from '@/lib/constants/projects';
import type { ProjectRouteParams } from '@/lib/types/project-route-params';

/** Every listed project gets a page prerendered at build time. */
export function generateStaticParams(): ProjectRouteParams[] {
  return PROJECTS.map(({ repo }) => ({ repo }));
}
