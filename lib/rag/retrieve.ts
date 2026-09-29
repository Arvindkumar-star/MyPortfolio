import { getDatabase, isMongoConfigured } from "../db/mongodb";
import { embedOne, isOpenAIConfigured } from "./embed";
import profile from "@/content/profile.json";
import skills from "@/content/skills.json";
import experience from "@/content/experience.json";

export type RetrievedChunk = {
  id?: string;
  title: string;
  content: string;
  source_type: string;
  similarity?: number;
  metadata?: Record<string, unknown>;
};

function cosineSimilarity(a: number[], b: number[]): number {
  if (!a || !b || a.length !== b.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Grounded in-memory keyword-based matching for offline/unconfigured database environments
function localKeywordSearch(query: string, limit = 6): RetrievedChunk[] {
  const q = query.toLowerCase();
  const chunks: RetrievedChunk[] = [];

  // 1. Profile chunks
  chunks.push({
    title: "Profile > Summary & Bio",
    content: `${profile.name} - ${profile.headline}. Based in ${profile.location}. ${profile.summary}`,
    source_type: "profile",
    similarity: 0.9,
  });
  chunks.push({
    title: "Profile > Availability & Contact",
    content: `Availability: ${profile.availability}. Email: ${profile.contact.email}, LinkedIn: ${profile.contact.linkedin}, GitHub: ${profile.contact.github}`,
    source_type: "profile",
    similarity: 0.85,
  });

  // 2. Real Project Chunks with Live Deployed URLs
  chunks.push({
    title: "Project > AgentFlow_AI_platform",
    content: `AgentFlow_AI_platform: Multi-tenant AI agent orchestration platform built for Razorpay AI Buildathon using Next.js 14, React Flow, MongoDB, and AgentGuard ZK firewall. Features payment limits (maxLimit), PII masking, and fast payouts with invoice parsing. Live App: https://agent-flow-ai-platform.vercel.app | GitHub: https://github.com/Arvindkumar-star/AgentFlow_AI_platform`,
    source_type: "repo",
    similarity: 0.88,
  });

  chunks.push({
    title: "Project > MYCollegeRagChatBot",
    content: `MYCollegeRagChatBot: Source-grounded RAG chatbot for IIIT Pune answering admissions, fee structures, hostel rules, placements, and courses with zero hallucinations and verified citations. Live App: https://my-college-rag-chat-bot.vercel.app | GitHub: https://github.com/Arvindkumar-star/MYCollegeRagChatBot`,
    source_type: "repo",
    similarity: 0.88,
  });

  chunks.push({
    title: "Project > AI-POWERED-RESUME-BUILDER-PLATFORM",
    content: `AI-POWERED-RESUME-BUILDER-PLATFORM (AI Resume Builder & ATS Analyzer): Multi-agent full-stack platform where 4 specialized AI agents collaborate to write, optimize against ATS metrics, and score resumes in real-time. Live App: https://ai-powered-resume-builder-platform-z2ie.onrender.com/ | GitHub: https://github.com/Arvindkumar-star/AI-POWERED-RESUME-BUILDER-PLATFORM`,
    source_type: "repo",
    similarity: 0.88,
  });

  chunks.push({
    title: "Project > macrosnap",
    content: `macrosnap: AI vision nutrition assistant that accurately estimates calories and macronutrients from meal photos or text descriptions, and automatically sends weekly health reports to WhatsApp. Live App: https://macrosnap-dgemd9ckuqphaqmjuzqeay.streamlit.app/ | GitHub: https://github.com/Arvindkumar-star/macrosnap`,
    source_type: "repo",
    similarity: 0.85,
  });

  chunks.push({
    title: "Project > AI_MOCK_INTERVIEW_PLATFORM",
    content: `AI_MOCK_INTERVIEW_PLATFORM: Interactive AI mock interview simulator providing real-time question generation, speech response capture, and comprehensive performance metrics. Live App: https://ai-mock-interview-platform-gilt.vercel.app | GitHub: https://github.com/Arvindkumar-star/AI_MOCK_INTERVIEW_PLATFORM`,
    source_type: "repo",
    similarity: 0.85,
  });

  chunks.push({
    title: "Project > pixel-pounce-game",
    content: `pixel-pounce-game: 2D browser arcade pixel game built with HTML5 Canvas and JavaScript with physics collision engine, obstacle generation, and live score tracking. Live Game: https://arvindkumar-star.github.io/pixel-pounce-game | GitHub: https://github.com/Arvindkumar-star/pixel-pounce-game`,
    source_type: "repo",
    similarity: 0.82,
  });

  // 3. Skills chunks
  for (const domain of skills.domains) {
    const skillList = domain.skills.map((s) => `${s.name} (${s.level})`).join(", ");
    chunks.push({
      title: `Skills > ${domain.name}`,
      content: `Domain: ${domain.name}\nExpertise: ${skillList}`,
      source_type: "skills",
      similarity: 0.8,
    });
  }

  // 4. Experience chunks
  for (const exp of experience.experiences) {
    chunks.push({
      title: `Experience > ${exp.company} (${exp.period})`,
      content: `${exp.role} at ${exp.company} (${exp.period})\nSummary: ${exp.summary}\nHighlights:\n${exp.highlights.map((h) => `- ${h}`).join("\n")}\nTech: ${exp.technologies.join(", ")}`,
      source_type: "experience",
      similarity: 0.82,
    });
  }

  // Score relevance based on user query
  const scored = chunks.map((c) => {
    let score = 0.3;
    const words = q.split(/\s+/).filter((w) => w.length > 2);
    for (const w of words) {
      if (c.title.toLowerCase().includes(w)) score += 0.35;
      if (c.content.toLowerCase().includes(w)) score += 0.25;
    }
    return { ...c, similarity: Math.min(score, 0.99) };
  });

  return scored
    .sort((a, b) => (b.similarity || 0) - (a.similarity || 0))
    .slice(0, limit);
}

export async function retrieveRelevantChunks(
  query: string,
  matchCount = 6,
  minSimilarity = 0.25
): Promise<RetrievedChunk[]> {
  if (!isMongoConfigured || !isOpenAIConfigured) {
    return localKeywordSearch(query, matchCount);
  }

  try {
    const db = await getDatabase();
    if (!db) return localKeywordSearch(query, matchCount);

    const vec = await embedOne(query);
    const collection = db.collection("chunks");

    // Fetch candidate chunks from MongoDB
    const allChunks = await collection.find({}).limit(100).toArray();
    if (!allChunks.length) {
      return localKeywordSearch(query, matchCount);
    }

    const scored: RetrievedChunk[] = allChunks
      .map((doc) => {
        const similarity = doc.embedding
          ? cosineSimilarity(vec, doc.embedding)
          : 0;
        return {
          id: doc._id.toString(),
          title: doc.title,
          content: doc.content,
          source_type: doc.source_type,
          similarity,
          metadata: doc.metadata,
        };
      })
      .filter((c) => (c.similarity ?? 0) >= minSimilarity)
      .sort((a, b) => (b.similarity ?? 0) - (a.similarity ?? 0))
      .slice(0, matchCount);

    return scored.length > 0 ? scored : localKeywordSearch(query, matchCount);
  } catch (e) {
    console.warn("Error in MongoDB retrieval, falling back to static search:", e);
    return localKeywordSearch(query, matchCount);
  }
}
