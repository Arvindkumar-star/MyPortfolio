import { fetchRepos, Repo } from "../github/client";
import { chunkRepo } from "./chunk";
import { embedBatch } from "./embed";
import { getDatabase, isMongoConfigured } from "../db/mongodb";

const EXCLUDE = (process.env.EXCLUDE_REPOS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export async function syncAll(trigger: string) {
  if (!isMongoConfigured) {
    console.warn("MongoDB is not configured. Skipping database sync.");
    return { status: "skipped", reason: "MongoDB not configured", trigger };
  }

  const db = await getDatabase();
  if (!db) {
    return { status: "failed", reason: "Could not connect to MongoDB", trigger };
  }

  const syncRunsCol = db.collection("sync_runs");
  const reposCol = db.collection("repos");
  const chunksCol = db.collection("chunks");

  const runResult = await syncRunsCol.insertOne({
    trigger,
    started_at: new Date().toISOString(),
  });
  const runId = runResult.insertedId;

  let added = 0;
  let removed = 0;

  try {
    const rawRepos = await fetchRepos();
    const repos = rawRepos.filter(
      (r: Repo) =>
        !r.isArchived &&
        !EXCLUDE.includes(r.name) &&
        r.name !== process.env.GITHUB_USERNAME
    );

    for (const r of repos) {
      // 1. Upsert repo metadata
      await reposCol.updateOne(
        { id: r.id },
        {
          $set: {
            id: r.id,
            name: r.name,
            full_name: r.fullName,
            description: r.description,
            url: r.url,
            homepage_url: r.homepageUrl,
            primary_language: r.language,
            languages: r.languages,
            topics: r.topics,
            stars: r.stars,
            forks: r.forks,
            is_pinned: r.isPinned,
            pushed_at: r.pushedAt,
            latest_commit: r.latestCommit,
            synced_at: new Date().toISOString(),
          },
        },
        { upsert: true }
      );

      // 2. Chunk repo
      const chunks = chunkRepo(r);
      const existing = await chunksCol
        .find({ source_type: "repo", source_id: r.id })
        .toArray();

      const have = new Map(existing.map((c) => [c.content_hash, c._id]));
      const want = new Set(chunks.map((c) => c.hash));

      const fresh = chunks.filter((c) => !have.has(c.hash));
      if (fresh.length > 0) {
        const vecs = await embedBatch(fresh.map((c) => c.content));
        await chunksCol.insertMany(
          fresh.map((c, i) => ({
            source_type: "repo",
            source_id: r.id,
            title: c.title,
            content: c.content,
            content_hash: c.hash,
            metadata: c.metadata,
            embedding: vecs[i],
            created_at: new Date().toISOString(),
          }))
        );
        added += fresh.length;
      }

      const stale = [...have.entries()]
        .filter(([h]) => !want.has(h))
        .map(([, id]) => id);

      if (stale.length > 0) {
        await chunksCol.deleteMany({ _id: { $in: stale } });
        removed += stale.length;
      }
    }

    // 3. Drop repos (and chunks) no longer upstream
    const ids = repos.map((r) => r.id);
    if (ids.length > 0) {
      const gone = await reposCol.find({ id: { $nin: ids } }).toArray();
      for (const g of gone) {
        await chunksCol.deleteMany({ source_type: "repo", source_id: g.id });
        await reposCol.deleteOne({ id: g.id });
      }
    }

    await syncRunsCol.updateOne(
      { _id: runId },
      {
        $set: {
          finished_at: new Date().toISOString(),
          repos_seen: repos.length,
          chunks_added: added,
          chunks_removed: removed,
        },
      }
    );

    return { repos: repos.length, added, removed, success: true };
  } catch (e: unknown) {
    await syncRunsCol.updateOne(
      { _id: runId },
      {
        $set: {
          finished_at: new Date().toISOString(),
          error: String((e as Error)?.message ?? e),
        },
      }
    );
    throw e;
  }
}
