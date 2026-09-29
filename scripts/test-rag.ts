import { cleanMarkdown } from "../lib/rag/clean";
import { chunkRepo } from "../lib/rag/chunk";
import { retrieveRelevantChunks } from "../lib/rag/retrieve";
import type { Repo } from "../lib/github/client";

function runTests() {
  console.log("=== Running RAG Pipeline Unit Tests ===\n");
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`✓ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`✗ FAIL: ${testName}`);
      failed++;
    }
  }

  // 1. Test cleanMarkdown
  const dirtyMarkdown = `
# Title <!-- comment -->
[![Badge](https://img.shields.io/badge/test-pass-green)](https://example.com)
<img src="test.jpg" alt="test" />
![Screenshot](https://example.com/pic.png)

* [Anchor link](#anchor)

\`\`\`ts
${Array.from({ length: 50 }, (_, i) => `const line${i} = ${i};`).join("\n")}
\`\`\`

Normal content paragraph here.
`;
  const cleaned = cleanMarkdown(dirtyMarkdown);
  assert(!cleaned.includes("<!--"), "cleanMarkdown strips HTML comments");
  assert(!cleaned.includes("<img"), "cleanMarkdown strips inline HTML tags");
  assert(!cleaned.includes("[![Badge]"), "cleanMarkdown strips linked badges");
  assert(!cleaned.includes("![Screenshot]"), "cleanMarkdown strips raw images");
  assert(!cleaned.includes("[Anchor link](#anchor)"), "cleanMarkdown strips TOC links");
  assert(cleaned.includes("[truncated for indexing]"), "cleanMarkdown truncates long code blocks");

  // 2. Test chunkRepo
  const mockRepo: Repo = {
    id: "mock-1",
    name: "autonomous-rag-pipeline",
    fullName: "Arvindkumar-star/autonomous-rag-pipeline",
    description: "Production RAG pipeline with pgvector semantic search and dynamic agents.",
    url: "https://github.com/Arvindkumar-star/autonomous-rag-pipeline",
    homepageUrl: "https://demo.example.com",
    language: "TypeScript",
    languages: [{ name: "TypeScript", color: "#3178c6", size: 50000 }],
    topics: ["nextjs", "rag", "agents", "supabase"],
    stars: 128,
    forks: 14,
    isPinned: true,
    isArchived: false,
    pushedAt: "2026-09-20T10:00:00Z",
    latestCommit: { message: "feat: add hybrid search", date: "2026-09-20T09:00:00Z", sha: "abc1234" },
    readme: `# Autonomous RAG Pipeline

## Architecture Overview
The pipeline ingests PDF documents, computes OpenAI embeddings, and indexes them in Supabase PostgreSQL using pgvector with HNSW similarity indexes.

## Multi-Step Reasoning
Agents evaluate the query, invoke retrieval tools, and verify citation groundedness before formulating the final answer.
`,
  };

  const chunks = chunkRepo(mockRepo);
  assert(chunks.length >= 3, `chunkRepo produces overview chunk + heading section chunks (got ${chunks.length})`);
  assert(chunks[0].title.includes("Overview"), "First chunk is synthetic overview chunk");
  assert(chunks[0].content.includes("★128"), "Overview chunk contains star count");
  assert(chunks.some((c) => c.title.includes("Architecture Overview")), "Chunks include Architecture Overview section");
  assert(chunks.some((c) => c.title.includes("Multi-Step Reasoning")), "Chunks include Multi-Step Reasoning section");

  console.log(`\nResults: ${passed} passed, ${failed} failed.\n`);
  if (failed > 0) process.exit(1);
}

runTests();
