import type { Project } from '@/lib/types/project';

/** A project plus its rendered README, for the project page. */
export type ProjectDetail = Project & { readmeHtml: string | null };
