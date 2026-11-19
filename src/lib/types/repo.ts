/** The subset of a GitHub repository that the site uses. */
export type Repo = {
  description: string | null;
  homepage: string | null;
  topics: string[];
  language: string | null;
  pushedAt: string;
  htmlUrl: string;
  archived: boolean;
  defaultBranch: string;
};
