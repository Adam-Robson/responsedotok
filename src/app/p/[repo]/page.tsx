import Link from 'next/link';
import { Suspense } from 'react';
import { ProjectLoading } from '@/components/projects/project-loading';
import { ProjectView } from '@/components/projects/project-view';
import type { ProjectRouteParams } from '@/lib/types/project-route-params';

export { generateMetadata } from '@/api/projects/generate-metadata';
export { generateStaticParams } from '@/api/projects/generate-static-params';

export default function ProjectPage({
  params,
}: Readonly<{ params: Promise<ProjectRouteParams> }>) {
  return (
    <main
      id="main"
      className="mx-auto w-full max-w-(--page) px-(--gutter) py-16"
    >
      <p className="mt-0 mb-8">
        <Link href="/" className="text-fg-muted">
          ← All projects
        </Link>
      </p>
      <Suspense fallback={<ProjectLoading />}>
        <ProjectView params={params} />
      </Suspense>
    </main>
  );
}
