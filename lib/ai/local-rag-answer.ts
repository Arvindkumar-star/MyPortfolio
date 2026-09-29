import profile from "@/content/profile.json";
import skills from "@/content/skills.json";
import experience from "@/content/experience.json";

export interface LocalAnswerResult {
  text: string;
  toolCall?: {
    name: "navigateToSection" | "highlightProject" | "highlightTech";
    input: Record<string, unknown>;
    output: { action: string; section?: string; name?: string; tech?: string };
  };
}

export const VERIFIED_PROJECTS = [
  {
    name: "AgentFlow_AI_platform",
    title: "AgentFlow AI Platform",
    tagline: "Autonomous Agent Orchestration & Payment Guardrails",
    description:
      "A multi-tenant autonomous AI agent workflow builder engineered with Next.js 14, React Flow, and AgentGuard ZK firewall. Features payment limit controls (`maxLimit`), PII masking, and fast payouts with intelligent invoice parsing.",
    liveUrl: "https://agent-flow-ai-platform.vercel.app",
    repoUrl: "https://github.com/Arvindkumar-star/AgentFlow_AI_platform",
    techStack: ["Next.js 14", "React Flow", "MongoDB", "AgentGuard ZK", "Tailwind CSS", "TypeScript"],
    category: ["agent", "workflow", "rag", "nextjs", "payments", "ai"],
  },
  {
    name: "MYCollegeRagChatBot",
    title: "MYCollege RAG ChatBot",
    tagline: "High-Precision Source-Grounded College Q&A System",
    description:
      "A source-grounded RAG chatbot built for IIIT Pune students and applicants. Answers complex admissions, fee structures, hostel rules, placements, and courses with zero hallucinations, verified citations, and sub-second retrieval.",
    liveUrl: "https://my-college-rag-chat-bot.vercel.app",
    repoUrl: "https://github.com/Arvindkumar-star/MYCollegeRagChatBot",
    techStack: ["Next.js", "LangChain", "Pinecone", "FastAPI", "Python", "Tailwind CSS"],
    category: ["rag", "chatbot", "education", "college", "nextjs", "vector", "ai"],
  },
  {
    name: "AI-POWERED-RESUME-BUILDER-PLATFORM",
    title: "AI-Powered Resume Builder & ATS Analyzer",
    tagline: "Multi-Agent Intelligent Career Platform",
    description:
      "A full-stack platform where 4 specialized AI agents collaborate to write, optimize against ATS metrics, format, and score resumes in real-time. Features real-time ATS scoring, keyword gap analysis, and PDF generation.",
    liveUrl: "https://ai-powered-resume-builder-platform-z2ie.onrender.com/",
    repoUrl: "https://github.com/Arvindkumar-star/AI-POWERED-RESUME-BUILDER-PLATFORM",
    techStack: ["Next.js", "React", "Node.js / Express", "FastAPI", "Groq / LLMs", "Tailwind CSS"],
    category: ["resume", "ats", "career", "multi-agent", "render", "ai"],
  },
  {
    name: "macrosnap",
    title: "MacroSnap AI Nutrition Assistant",
    tagline: "Vision-Driven Macro & Calorie Tracking with WhatsApp Alerts",
    description:
      "An AI vision nutrition assistant that accurately calculates calories and macronutrients directly from meal photos or text descriptions, and automatically sends scheduled weekly health reports to WhatsApp.",
    liveUrl: "https://macrosnap-dgemd9ckuqphaqmjuzqeay.streamlit.app/",
    repoUrl: "https://github.com/Arvindkumar-star/macrosnap",
    techStack: ["Streamlit", "Python", "Gemini Vision API", "WhatsApp API", "Pandas"],
    category: ["vision", "nutrition", "health", "streamlit", "gemini", "automation", "ai"],
  },
  {
    name: "AI_MOCK_INTERVIEW_PLATFORM",
    title: "AI Mock Interview Platform",
    tagline: "Real-time AI Interview Simulator & Evaluation Engine",
    description:
      "An interactive AI mock interview platform providing real-time dynamic question generation, speech response capture, and comprehensive performance metrics with granular actionable feedback.",
    liveUrl: "https://ai-mock-interview-platform-gilt.vercel.app",
    repoUrl: "https://github.com/Arvindkumar-star/AI_MOCK_INTERVIEW_PLATFORM",
    techStack: ["Next.js", "TypeScript", "Gemini API", "Speech Recognition", "Tailwind CSS"],
    category: ["interview", "speech", "evaluation", "nextjs", "vercel", "ai"],
  },
  {
    name: "pixel-pounce-game",
    title: "Pixel Pounce Game",
    tagline: "Retro 2D Browser Arcade Platformer",
    description:
      "A fast-paced 2D browser arcade pixel game built with HTML5 Canvas and vanilla JavaScript featuring custom physics, collision detection, procedural obstacle generation, and live high-score tracking.",
    liveUrl: "https://arvindkumar-star.github.io/pixel-pounce-game",
    repoUrl: "https://github.com/Arvindkumar-star/pixel-pounce-game",
    techStack: ["HTML5 Canvas", "JavaScript", "CSS3", "GitHub Pages"],
    category: ["game", "arcade", "canvas", "javascript", "pixel"],
  },
];

export function generateLocalRAGAnswer(rawQuery: string): LocalAnswerResult {
  const query = (rawQuery || "").toLowerCase().trim();

  // 1. Check for specific project queries
  for (const project of VERIFIED_PROJECTS) {
    const isDirectMatch =
      query.includes(project.name.toLowerCase()) ||
      query.includes(project.title.toLowerCase()) ||
      project.category.some((cat) => query.includes(cat) && query.length < 35);

    if (isDirectMatch) {
      const text = `### 🚀 **${project.title}**
*${project.tagline}*

${project.description}

- **Tech Stack:** ${project.techStack.join(", ")}
- **🌐 Live App:** [${project.liveUrl}](${project.liveUrl})
- **💻 GitHub Repo:** [${project.repoUrl}](${project.repoUrl})

I've highlighted this project on the page for you! Feel free to ask more details about its architecture or implementation.`;

      return {
        text,
        toolCall: {
          name: "highlightProject",
          input: { name: project.name },
          output: { action: "highlightProject", name: project.name },
        },
      };
    }
  }

  // 2. RAG & Autonomous Agent Experience
  if (
    query.includes("rag") ||
    query.includes("agent") ||
    query.includes("autonomous") ||
    query.includes("langchain") ||
    query.includes("vector")
  ) {
    const text = `### 🤖 **Arvind's RAG & Autonomous Agent Expertise**

Arvind specializes in building enterprise-grade, high-precision AI systems and autonomous agent pipelines:

1. **[AgentFlow AI Platform](https://agent-flow-ai-platform.vercel.app)** — Multi-tenant autonomous agent orchestration with React Flow DAG pipelines and AgentGuard ZK firewall for payment security.
2. **[MYCollege RAG ChatBot](https://my-college-rag-chat-bot.vercel.app)** — Source-grounded RAG system with Pinecone vector search, hybrid retrieval, and zero hallucination guardrails for college Q&A.
3. **[AI-Powered Resume Builder](https://ai-powered-resume-builder-platform-z2ie.onrender.com/)** — 4 specialized AI agents working cooperatively to analyze, optimize, and score resumes against ATS standards.
4. **[MacroSnap Nutrition AI](https://macrosnap-dgemd9ckuqphaqmjuzqeay.streamlit.app/)** — Multimodal vision agent utilizing Gemini Vision to parse meals and automate WhatsApp health reports.

**Core AI Stack:** Next.js, Vercel AI SDK, LangChain, Pinecone, pgvector / Supabase, Tool-calling & Function Execution, and Prompt Engineering.`;

    return {
      text,
      toolCall: {
        name: "navigateToSection",
        input: { section: "projects" },
        output: { action: "navigate", section: "projects" },
      },
    };
  }

  // 3. Project Overview / "What projects have you built?"
  if (
    query.includes("project") ||
    query.includes("built") ||
    query.includes("portfolio") ||
    query.includes("work") ||
    query.includes("apps")
  ) {
    const text = `### 🛠️ **Arvind's Featured Live Projects**

Here are Arvind's deployed, production-grade applications directly from his GitHub:

1. **[AgentFlow AI Platform](https://agent-flow-ai-platform.vercel.app)** — Autonomous agent workflow orchestration with AgentGuard ZK firewall. ([GitHub](https://github.com/Arvindkumar-star/AgentFlow_AI_platform))
2. **[MYCollege RAG ChatBot](https://my-college-rag-chat-bot.vercel.app)** — Source-grounded RAG chatbot for college queries with verified citations. ([GitHub](https://github.com/Arvindkumar-star/MYCollegeRagChatBot))
3. **[AI Resume Builder & ATS Platform](https://ai-powered-resume-builder-platform-z2ie.onrender.com/)** — Multi-agent resume optimization and live ATS scoring. ([GitHub](https://github.com/Arvindkumar-star/AI-POWERED-RESUME-BUILDER-PLATFORM))
4. **[MacroSnap Nutrition Assistant](https://macrosnap-dgemd9ckuqphaqmjuzqeay.streamlit.app/)** — AI vision macro/calorie estimation with WhatsApp automation. ([GitHub](https://github.com/Arvindkumar-star/macrosnap))
5. **[AI Mock Interview Platform](https://ai-mock-interview-platform-gilt.vercel.app)** — Interactive speech-enabled AI interview evaluator. ([GitHub](https://github.com/Arvindkumar-star/AI_MOCK_INTERVIEW_PLATFORM))
6. **[Pixel Pounce Game](https://arvindkumar-star.github.io/pixel-pounce-game)** — Retro 2D browser canvas platformer game. ([GitHub](https://github.com/Arvindkumar-star/pixel-pounce-game))

I've navigated you to the **Projects** section on the page. Click on any project card to open its live app!`;

    return {
      text,
      toolCall: {
        name: "navigateToSection",
        input: { section: "projects" },
        output: { action: "navigate", section: "projects" },
      },
    };
  }

  // 4. Skills & Tech Stack
  if (
    query.includes("stack") ||
    query.includes("tech") ||
    query.includes("skill") ||
    query.includes("react") ||
    query.includes("next") ||
    query.includes("typescript") ||
    query.includes("python") ||
    query.includes("database")
  ) {
    const text = `### 💻 **Arvind's Technical Stack & Skills**

- **🤖 AI & Autonomous Agents:** RAG Architectures, Vector DBs (pgvector, Pinecone), Vercel AI SDK, LangChain, Multi-Agent Systems, Function Calling.
- **⚡ Frontend Engineering:** Next.js (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, Zustand.
- **⚙️ Backend & APIs:** Node.js, Express, FastAPI, Python, REST & GraphQL APIs, Supabase / PostgreSQL, Redis.
- **🚀 DevOps & Cloud:** CI/CD (GitHub Actions), Docker, Vercel, Cloudflare, Streamlit Cloud, Render.

Navigating to the **Skills** section so you can explore his proficiencies in detail!`;

    return {
      text,
      toolCall: {
        name: "navigateToSection",
        input: { section: "skills" },
        output: { action: "navigate", section: "skills" },
      },
    };
  }

  // 5. Experience / Background / Career
  if (
    query.includes("experience") ||
    query.includes("background") ||
    query.includes("career") ||
    query.includes("journey") ||
    query.includes("work history")
  ) {
    const expText = experience.experiences
      .map(
        (e) =>
          `**${e.role}** at *${e.company}* (${e.period})\n- ${e.summary}\n- *Key Tech:* ${e.technologies.join(", ")}`
      )
      .join("\n\n");

    const text = `### 💼 **Arvind's Experience & Background**

${expText}

Arvind is based in **${profile.location}** and focuses on delivering high-impact, reliable software systems.`;

    return {
      text,
      toolCall: {
        name: "navigateToSection",
        input: { section: "experience" },
        output: { action: "navigate", section: "experience" },
      },
    };
  }

  // 6. Resume, Education & Certifications
  if (
    query.includes("resume") ||
    query.includes("cv") ||
    query.includes("education") ||
    query.includes("college") ||
    query.includes("iiit") ||
    query.includes("degree") ||
    query.includes("certification")
  ) {
    const certs = profile.certifications.map((c) => `- ${c}`).join("\n");
    const text = `### 📄 **Arvind Kumar's Resume & Academic Background**

- **Education:** ${profile.education.degree} from **${profile.education.institution}** (${profile.education.period}, GPA: ${profile.education.gpa})
- **Core Focus:** Full-Stack Web Development, AI-Powered Applications, RAG Pipelines, Autonomous Agents & System Design.

#### 🏆 **Certifications & Achievements:**
${certs}

#### 📥 **Download Resume:**
You can view the full interactive resume page or download the PDF directly:
- **📄 [View Interactive Resume](/resume)**
- **📥 [Download Official Resume PDF](/Arvind_Kumar_Resume.pdf)**`;

    return {
      text,
    };
  }

  // 6.5 Philosophy, Quote & Motto
  if (
    query.includes("quote") ||
    query.includes("philosophy") ||
    query.includes("motto") ||
    query.includes("principles") ||
    query.includes("mindset")
  ) {
    const text = `### 💡 **Arvind's Engineering Philosophy & Quote**

> *"Software used to follow rules. Today, we architect software that learns, reasons, and acts."*
> — **Arvind Kumar**

**Core Principles:**
${profile.philosophy.map((p) => `- ⚡ **${p}**`).join("\n")}

Arvind believes in bridging deterministic, type-safe full-stack software with intelligent autonomous agent pipelines.`;

    return {
      text,
    };
  }

  // 7. Contact, Hiring & Availability
  if (
    query.includes("contact") ||
    query.includes("hire") ||
    query.includes("email") ||
    query.includes("availability") ||
    query.includes("reach") ||
    query.includes("linkedin") ||
    query.includes("github") ||
    query.includes("role")
  ) {
    const text = `### 📬 **Get in Touch with Arvind Kumar**

- **Status:** **${profile.availability}**
- **Location:** ${profile.location} (Open to Remote or Hybrid)
- **📧 Email:** [${profile.contact.email}](mailto:${profile.contact.email})
- **💼 LinkedIn:** [${profile.contact.linkedin}](${profile.contact.linkedin})
- **🐙 GitHub:** [${profile.contact.github}](${profile.contact.github})

You can also send a direct message using the **Contact Form** at the bottom of the page!`;

    return {
      text,
      toolCall: {
        name: "navigateToSection",
        input: { section: "contact" },
        output: { action: "navigate", section: "contact" },
      },
    };
  }

  // 7. General Bio / Introduction
  return {
    text: `### 👋 **Hi! I'm Arvind Kumar's AI Assistant**

${profile.summary}

**Quick Highlights:**
- **Location:** ${profile.location}
- **Availability:** ${profile.availability}
- **Specialties:** Autonomous AI Agents, RAG Pipelines, Next.js / TypeScript, and Workflow Automation.
- **Verified GitHub Repos:** [github.com/Arvindkumar-star](${profile.contact.github})

**Try asking me:**
- *"Tell me about your RAG and autonomous agent experience"*
- *"What projects have you built with Next.js?"*
- *"Show me your AI Resume Builder or MacroSnap project"*
- *"What is your tech stack and availability?"*`,
  };
}
