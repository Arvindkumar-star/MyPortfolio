import { createHash } from "node:crypto";
import type { Repo } from "../github/client";
import { cleanMarkdown } from "./clean";

export type RawChunk = {
  title: string;
  content: string;
  hash: string;
  metadata: Record<string, unknown>;
};

const sha = (s: string) => createHash("sha256").update(s).digest("hex");
const approxTokens = (s: string) => Math.ceil(s.length / 4);
const MAX_TOKENS = 600;

function splitByParagraph(text: string, maxTokens: number): string[] {
  const out: string[] = [];
  let cur = "";
  for (const para of text.split(/\n\n+/)) {
    if (approxTokens(cur + para) > maxTokens && cur) {
      out.push(cur.trim());
      cur = "";
    }
    cur += (cur ? "\n\n" : "") + para;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

export function chunkRepo(repo: Repo): RawChunk[] {
  const header = `Repository: ${repo.name} | Language: ${repo.language ?? "n/a"} | Topics: ${
    repo.topics.join(", ") || "none"
  }`;
  const meta = {
    repo: repo.name,
    url: repo.url,
    topics: repo.topics,
    language: repo.language,
  };
  const chunks: RawChunk[] = [];

  // 1) Synthetic overview chunk from metadata
  const overview = `${header}\nSection: Overview\n\n${
    repo.description ?? "No description."
  } Languages: ${repo.languages.map((l) => l.name).join(", ") || "n/a"}. ★${
    repo.stars
  }, ${repo.forks} forks. Last pushed ${repo.pushedAt.slice(0, 10)}. ${
    repo.homepageUrl ? `Live demo: ${repo.homepageUrl}. ` : ""
  }URL: ${repo.url}`;

  chunks.push({
    title: `${repo.name} > Overview`,
    content: overview,
    hash: sha(overview),
    metadata: meta,
  });

  if (!repo.readme) return chunks;

  // 2) README split by Markdown headings (H1-H3)
  const md = cleanMarkdown(repo.readme);
  const sections = md
    .split(/^(?=#{1,3}\s)/m)
    .filter((s) => s.trim().length > 40);

  for (const sec of sections) {
    const heading =
      sec.match(/^#{1,3}\s+(.+)$/m)?.[1]?.trim() ?? "Documentation";
    const pieces =
      approxTokens(sec) > MAX_TOKENS
        ? splitByParagraph(sec, MAX_TOKENS)
        : [sec];

    pieces.forEach((p, i) => {
      const content = `${header}\nSection: ${heading}${
        pieces.length > 1 ? ` (part ${i + 1})` : ""
      }\n\n${p.trim()}`;
      chunks.push({
        title: `${repo.name} > ${heading}`,
        content,
        hash: sha(content),
        metadata: { ...meta, section: heading },
      });
    });
  }

  return chunks;
}
