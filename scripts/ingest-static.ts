import { createHash } from "node:crypto";
import { getDatabase, isMongoConfigured } from "../lib/db/mongodb";
import { embedBatch, isOpenAIConfigured } from "../lib/rag/embed";
import profile from "../content/profile.json";
import skills from "../content/skills.json";
import experience from "../content/experience.json";

const sha = (s: string) => createHash("sha256").update(s).digest("hex");

type StaticChunk = {
  source_type: "profile" | "skills" | "experience" | "faq";
  source_id: string;
  title: string;
  content: string;
  hash: string;
  metadata: Record<string, unknown>;
};

async function main() {
  console.log("Starting static knowledge ingestion...");

  if (!isMongoConfigured || !isOpenAIConfigured) {
    console.log("MongoDB or OpenAI API key not configured. Skipping static vector ingest.");
    return;
  }

  const db = await getDatabase();
  if (!db) {
    console.warn("Could not connect to MongoDB. Skipping.");
    return;
  }

  const chunksCol = db.collection("chunks");
  const chunks: StaticChunk[] = [];

  // 1. Profile chunks
  const profileSummary = `Profile Summary: ${profile.name} - ${profile.headline}\nLocation: ${profile.location}\nSummary: ${profile.summary}\nAvailability: ${profile.availability}`;
  chunks.push({
    source_type: "profile",
    source_id: "profile-main",
    title: `${profile.name} > Bio & Summary`,
    content: profileSummary,
    hash: sha(profileSummary),
    metadata: { name: profile.name, location: profile.location },
  });

  const profilePhilosophy = `Engineering Philosophy of ${profile.name}:\n${profile.philosophy.map((p) => `- ${p}`).join("\n")}\nSoft Skills: ${profile.softSkills.join(", ")}`;
  chunks.push({
    source_type: "profile",
    source_id: "profile-philosophy",
    title: `${profile.name} > Philosophy & Work Approach`,
    content: profilePhilosophy,
    hash: sha(profilePhilosophy),
    metadata: { topic: "philosophy" },
  });

  // 2. Skills chunks
  for (const domain of skills.domains) {
    const content = `Domain: ${domain.name}\nSkills:\n${domain.skills.map((s) => `- ${s.name}: ${s.level} (${s.proficiency}%)`).join("\n")}`;
    chunks.push({
      source_type: "skills",
      source_id: `skills-${domain.name.toLowerCase().replace(/\s+/g, "-")}`,
      title: `Skills > ${domain.name}`,
      content,
      hash: sha(content),
      metadata: { domain: domain.name },
    });
  }

  // 3. Experience chunks
  for (const exp of experience.experiences) {
    const content = `${exp.role} at ${exp.company} (${exp.period})\nLocation: ${exp.location}\nOverview: ${exp.summary}\nKey Achievements:\n${exp.highlights.map((h) => `• ${h}`).join("\n")}\nTechnologies Used: ${exp.technologies.join(", ")}`;
    chunks.push({
      source_type: "experience",
      source_id: exp.id,
      title: `Experience > ${exp.company} (${exp.period})`,
      content,
      hash: sha(content),
      metadata: { company: exp.company, role: exp.role },
    });
  }

  console.log(`Generated ${chunks.length} static chunks. Ingesting to MongoDB...`);

  let added = 0;
  for (const c of chunks) {
    const existing = await chunksCol.findOne({
      source_type: c.source_type,
      source_id: c.source_id,
      content_hash: c.hash,
    });

    if (!existing) {
      const [vec] = await embedBatch([c.content]);
      await chunksCol.updateOne(
        { source_type: c.source_type, source_id: c.source_id },
        {
          $set: {
            source_type: c.source_type,
            source_id: c.source_id,
            title: c.title,
            content: c.content,
            content_hash: c.hash,
            metadata: c.metadata,
            embedding: vec,
            updated_at: new Date().toISOString(),
          },
        },
        { upsert: true }
      );
      added++;
    }
  }

  console.log(`Static knowledge ingest complete. ${added} new/updated chunks in MongoDB.`);
}

main().catch(console.error);
