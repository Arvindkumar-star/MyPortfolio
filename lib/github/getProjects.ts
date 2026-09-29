import { unstable_cache } from "next/cache";
import { fetchRepos, type Repo } from "./client";
import { getPublicSupabase, isSupabasePublicConfigured } from "../db/supabase-public";

export type ProjectCard = {
  id: string;
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  pinned: boolean;
  pushedAt: string;
};

// Explicit verified live deployment URLs mapping
export const KNOWN_LIVE_URLS: Record<string, string> = {
  "AgentFlow_AI_platform": "https://agent-flow-ai-platform.vercel.app",
  "MYCollegeRagChatBot": "https://my-college-rag-chat-bot.vercel.app",
  "AI-POWERED-RESUME-BUILDER-PLATFORM": "https://ai-powered-resume-builder-platform-z2ie.onrender.com/",
  "macrosnap": "https://macrosnap-dgemd9ckuqphaqmjuzqeay.streamlit.app/",
  "AI_MOCK_INTERVIEW_PLATFORM": "https://ai-mock-interview-platform-gilt.vercel.app",
  "pixel-pounce-game": "https://arvindkumar-star.github.io/pixel-pounce-game",
};

// Arvind's verified real GitHub projects from github.com/Arvindkumar-star
const DEPLOYED_REAL_PROJECTS: ProjectCard[] = [
  {
    id: "proj-agentflow",
    name: "AgentFlow_AI_platform",
    fullName: "Arvindkumar-star/AgentFlow_AI_platform",
    description:
      "Multi-tenant AI agent orchestration platform built for the Razorpay AI Buildathon using Next.js 14, React Flow, and MongoDB. Features AgentGuard ZK firewall for payment limits (maxLimit), PII masking, and prompt defense with automated invoice parsing.",
    url: "https://github.com/Arvindkumar-star/AgentFlow_AI_platform",
    homepage: "https://agent-flow-ai-platform.vercel.app",
    language: "Next.js / TypeScript",
    topics: ["nextjs", "react-flow", "ai-agents", "mongodb", "zk-guard", "invoice-parsing"],
    stars: 0,
    forks: 0,
    pinned: true,
    pushedAt: "2026-09-05T17:58:34Z",
  },
  {
    id: "proj-mycollege-rag",
    name: "MYCollegeRagChatBot",
    fullName: "Arvindkumar-star/MYCollegeRagChatBot",
    description:
      "Source-grounded RAG chatbot for IIIT Pune — ask about admissions, fee structures, hostel policies, placements, and syllabus with zero hallucinations and exact citation references.",
    url: "https://github.com/Arvindkumar-star/MYCollegeRagChatBot",
    homepage: "https://my-college-rag-chat-bot.vercel.app",
    language: "Next.js / TypeScript",
    topics: ["nextjs", "rag", "iiit-pune", "vector-search", "citations", "chatbot"],
    stars: 0,
    forks: 0,
    pinned: true,
    pushedAt: "2026-08-30T17:54:50Z",
  },
  {
    id: "proj-resume-builder",
    name: "AI-POWERED-RESUME-BUILDER-PLATFORM",
    fullName: "Arvindkumar-star/AI-POWERED-RESUME-BUILDER-PLATFORM",
    description:
      "AI-Powered Resume Builder & ATS Analyzer — multi-agent full-stack platform where 4 specialized AI agents collaborate to write, optimize against ATS metrics, and score resumes in real-time.",
    url: "https://github.com/Arvindkumar-star/AI-POWERED-RESUME-BUILDER-PLATFORM",
    homepage: "https://ai-powered-resume-builder-platform-z2ie.onrender.com/",
    language: "React / Node.js",
    topics: ["react", "nodejs", "multi-agent", "ats-analyzer", "gemini-ai", "mongodb"],
    stars: 0,
    forks: 0,
    pinned: true,
    pushedAt: "2026-08-22T09:46:44Z",
  },
  {
    id: "proj-macrosnap",
    name: "macrosnap",
    fullName: "Arvindkumar-star/macrosnap",
    description:
      "AI vision nutrition assistant that accurately estimates calories and macronutrients from meal photos or text descriptions, and automatically sends weekly health reports to WhatsApp.",
    url: "https://github.com/Arvindkumar-star/macrosnap",
    homepage: "https://macrosnap-dgemd9ckuqphaqmjuzqeay.streamlit.app/",
    language: "Python",
    topics: ["python", "ai-vision", "streamlit", "whatsapp-api", "health-tech"],
    stars: 0,
    forks: 0,
    pinned: true,
    pushedAt: "2026-09-29T11:32:05Z",
  },
  {
    id: "proj-mock-interview",
    name: "AI_MOCK_INTERVIEW_PLATFORM",
    fullName: "Arvindkumar-star/AI_MOCK_INTERVIEW_PLATFORM",
    description:
      "Interactive AI mock interview simulator providing real-time question generation, voice-to-text response capture, and comprehensive performance metrics with actionable feedback.",
    url: "https://github.com/Arvindkumar-star/AI_MOCK_INTERVIEW_PLATFORM",
    homepage: "https://ai-mock-interview-platform-gilt.vercel.app",
    language: "JavaScript",
    topics: ["nextjs", "ai", "speech-analysis", "interview-prep", "tailwind"],
    stars: 0,
    forks: 0,
    pinned: true,
    pushedAt: "2026-04-25T19:32:05Z",
  },
  {
    id: "proj-pixel-pounce",
    name: "pixel-pounce-game",
    fullName: "Arvindkumar-star/pixel-pounce-game",
    description:
      "Interactive 2D browser-based arcade pixel game built with HTML5 Canvas and JavaScript featuring smooth physics collisions, procedural obstacle generation, and real-time score tracking.",
    url: "https://github.com/Arvindkumar-star/pixel-pounce-game",
    homepage: "https://arvindkumar-star.github.io/pixel-pounce-game",
    language: "HTML5 / JavaScript",
    topics: ["javascript", "html5-canvas", "game-dev", "arcade", "physics"],
    stars: 0,
    forks: 0,
    pinned: false,
    pushedAt: "2026-08-08T17:41:11Z",
  },
];

const EXCLUDED_NAMES = [
  "Arvind-rag-portfolio",
  "dashboard_project_referral",
  "FavBProject",
  "appinventor-repo",
  "firstcontributions.github.io",
  "my-repo",
  "my-repo2",
  "Arvindkumar-star",
];

async function fromCache(): Promise<ProjectCard[]> {
  if (!isSupabasePublicConfigured) return [];
  try {
    const { data } = await getPublicSupabase()
      .from("repos")
      .select("*")
      .order("is_pinned", { ascending: false })
      .order("pushed_at", { ascending: false });

    if (!data || data.length === 0) return [];

    // Filter only valid non-excluded repos
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data
      .filter((r: any) => !EXCLUDED_NAMES.includes(r.name))
      .map((r: any) => ({
        id: r.id,
        name: r.name,
        fullName: r.full_name,
        description: r.description,
        url: r.url,
        homepage: KNOWN_LIVE_URLS[r.name] || r.homepage_url || null,
        language: r.primary_language,
        topics: r.topics || [],
        stars: r.stars || 0,
        forks: r.forks || 0,
        pinned: Boolean(r.is_pinned),
        pushedAt: r.pushed_at,
      }));
  } catch (e) {
    console.warn("Error reading repos from Supabase cache:", e);
    return [];
  }
}

async function fromLive(): Promise<ProjectCard[]> {
  const repos = await fetchRepos();
  return repos
    .filter(
      (r: Repo) =>
        !r.isArchived &&
        !EXCLUDED_NAMES.includes(r.name)
    )
    .map((r: Repo) => ({
      id: r.id,
      name: r.name,
      fullName: r.fullName,
      description: r.description,
      url: r.url,
      homepage: KNOWN_LIVE_URLS[r.name] || r.homepageUrl || null,
      language: r.language,
      topics: r.topics,
      stars: r.stars,
      forks: r.forks,
      pinned: r.isPinned,
      pushedAt: r.pushedAt,
    }))
    .sort(
      (a, b) =>
        Number(b.pinned) - Number(a.pinned) ||
        +new Date(b.pushedAt) - +new Date(a.pushedAt)
    );
}

export const getProjects = unstable_cache(
  async (): Promise<{ projects: ProjectCard[]; source: "live" | "cache" | "verified-github" }> => {
    try {
      const live = await fromLive();
      if (live.length > 0) return { projects: live, source: "live" };
    } catch (e) {
      console.warn("GitHub live fetch failed, attempting Supabase cache fallback", e);
    }

    const cached = await fromCache();
    if (cached.length > 0) return { projects: cached, source: "cache" };

    return { projects: DEPLOYED_REAL_PROJECTS, source: "verified-github" };
  },
  ["projects-cache-v5"],
  { revalidate: 60, tags: ["projects"] }
);
