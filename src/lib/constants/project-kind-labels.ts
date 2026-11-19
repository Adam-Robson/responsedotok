import type { ProjectKind } from '@/lib/types/project-kind';

/** Display labels; typed as a Record so a new kind can't go unlabeled. */
export const PROJECT_KIND_LABELS: Readonly<Record<ProjectKind, string>> = {
  site: 'Site',
  library: 'Library',
  server: 'Server',
  tool: 'Tool',
  template: 'Template',
};
