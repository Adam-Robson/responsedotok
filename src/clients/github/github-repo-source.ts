import { getReadmeHtml } from '@/clients/github/get-readme-html';
import { getRepo } from '@/clients/github/get-repo';
import type { RepoSource } from '@/lib/protocols/repo-source';

/** The live GitHub implementation of RepoSource. */
export const githubRepoSource: RepoSource = { getRepo, getReadmeHtml };
