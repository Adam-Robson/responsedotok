import { type NextRequest, NextResponse } from 'next/server';
import { NOT_FOUND_PATH } from '@/lib/constants/not-found-path';
import { PROJECTS } from '@/lib/constants/projects';
import { findProjectEntry } from '@/services/projects/find-project-entry';
import { projectRepoFromPath } from '@/utils/project-repo-from-path';

/**
 * Answer URLs that aren't projects in the
 * config with a real 404.
 *
 * Runs before rendering because once a Cache
 * Components page starts streaming the
 * shell, the status is already 200;
 * later calls to notFound() can't change it.
 */
export function proxy(request: NextRequest): NextResponse {
  const repo = projectRepoFromPath(request.nextUrl.pathname);
  if (repo !== null && findProjectEntry(repo, PROJECTS)) {
    return NextResponse.next();
  }
  return NextResponse.rewrite(new URL(NOT_FOUND_PATH, request.url));
}
