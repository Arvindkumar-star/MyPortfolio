import { graphql } from "@octokit/graphql";
import { REPOS_QUERY } from "./queries";

export type Repo = {
  id: string;
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  language: string | null;
  languages: { name: string; color: string | null; size: number }[];
  topics: string[];
  stars: number;
  forks: number;
  isPinned: boolean;
  isArchived: boolean;
  pushedAt: string;
  latestCommit: { message: string; date: string; sha: string } | null;
  readme: string | null;
};

export const isGitHubConfigured = Boolean(
  process.env.GITHUB_TOKEN && process.env.GITHUB_USERNAME
);

export async function fetchRepos(
  login = process.env.GITHUB_USERNAME || "Arvindkumar-star"
): Promise<Repo[]> {
  if (!process.env.GITHUB_TOKEN) {
    console.warn("GITHUB_TOKEN not configured. Returning empty live repos list.");
    return [];
  }

  const gh = graphql.defaults({
    headers: { authorization: `token ${process.env.GITHUB_TOKEN}` },
  });

  const out: Repo[] = [];
  let after: string | null = null;
  let pinned = new Set<string>();

  do {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await gh(REPOS_QUERY, { login, after });
    const u = res?.user;
    if (!u) break;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pinned = new Set(u.pinnedItems?.nodes?.map((n: any) => n.id) || []);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const r of u.repositories?.nodes || []) {
      const c = r.defaultBranchRef?.target?.history?.nodes?.[0];
      out.push({
        id: r.id,
        name: r.name,
        fullName: r.nameWithOwner,
        description: r.description,
        url: r.url,
        homepageUrl: r.homepageUrl,
        language: r.primaryLanguage?.name ?? null,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        languages: (r.languages?.edges || []).map((e: any) => ({
          name: e.node.name,
          color: e.node.color,
          size: e.size,
        })),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        topics: (r.repositoryTopics?.nodes || []).map((t: any) => t.topic.name),
        stars: r.stargazerCount ?? 0,
        forks: r.forkCount ?? 0,
        isPinned: false,
        isArchived: Boolean(r.isArchived),
        pushedAt: r.pushedAt || new Date().toISOString(),
        latestCommit: c
          ? { message: c.messageHeadline, date: c.committedDate, sha: c.oid }
          : null,
        readme: r.readme?.text ?? null,
      });
    }
    after = u.repositories?.pageInfo?.hasNextPage
      ? u.repositories.pageInfo.endCursor
      : null;
  } while (after);

  return out.map((r) => ({ ...r, isPinned: pinned.has(r.id) }));
}
