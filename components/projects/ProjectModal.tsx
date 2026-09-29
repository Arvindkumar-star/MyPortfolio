"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Globe,
  ExternalLink,
  Sparkles,
  Layers,
  Cpu,
  CheckCircle2,
  Calendar,
  Star,
  GitFork,
  ArrowUpRight,
  Code2,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { Badge } from "@/components/ui/Badge";
import type { ProjectCard } from "@/lib/github/getProjects";
import { useUI } from "@/lib/ui-bus";

export interface ProjectDetails {
  title: string;
  tagline: string;
  category: string;
  fullOverview: string;
  problemSolved: string;
  keyFeatures: string[];
  architecture: string;
  techBreakdown: {
    frontend?: string[];
    backend?: string[];
    aiAndLlm?: string[];
    database?: string[];
    tools?: string[];
  };
}

export const PROJECT_DETAILS_MAP: Record<string, ProjectDetails> = {
  AgentFlow_AI_platform: {
    title: "AgentFlow AI Platform",
    tagline: "Autonomous Multi-Tenant Agent Orchestration & Payment Guardrails",
    category: "Autonomous Agents & Workflow Automation",
    fullOverview:
      "AgentFlow AI is a high-performance, multi-tenant autonomous AI agent workflow builder designed for complex business operations. Built for the Razorpay AI Buildathon, it empowers teams to visually connect, orchestrate, and deploy multi-step AI agents with strict security guardrails, invoice processing, and automated financial disbursements.",
    problemSolved:
      "Enterprise AI agents often execute unverified financial transactions or leak sensitive user data. AgentFlow introduces AgentGuard ZK firewall — an enforceable security perimeter that enforces strict transaction limits (`maxLimit`), masks PII in real-time, and protects against adversarial prompt injections.",
    keyFeatures: [
      "Visual Drag-and-Drop Node Canvas built on React Flow for designing complex multi-step agent graphs.",
      "AgentGuard ZK Firewall with enforceable max transaction limits, PII masking, and prompt defense.",
      "Automated Invoice Parsing & dynamic payout routing via Razorpay integration.",
      "Multi-tenant data isolation with MongoDB Atlas persistence and secure session management.",
      "Real-time agent telemetry, step execution logging, and instant failure recovery.",
    ],
    architecture:
      "Next.js 14 App Router frontend with React Flow interactive canvas, Node.js / Express microservice handling agent orchestration, AgentGuard security filter proxy, and MongoDB Atlas for multi-tenant graph persistence.",
    techBreakdown: {
      frontend: ["Next.js 14", "React Flow", "Tailwind CSS", "Framer Motion"],
      backend: ["Node.js", "TypeScript", "REST APIs", "AgentGuard ZK"],
      aiAndLlm: ["OpenAI API", "LangChain", "Invoice OCR Extraction"],
      database: ["MongoDB Atlas", "Mongoose"],
      tools: ["Vercel", "Razorpay API", "Lucide Icons"],
    },
  },
  MYCollegeRagChatBot: {
    title: "MYCollege RAG ChatBot",
    tagline: "High-Precision Source-Grounded College Q&A & Admissions Assistant",
    category: "Retrieval-Augmented Generation (RAG)",
    fullOverview:
      "MYCollege RAG ChatBot is a specialized, source-grounded conversational AI system built for Indian Institute of Information Technology (IIIT) Pune. It resolves administrative bottlenecks by delivering accurate, hallucination-free answers regarding admissions, cutoffs, fee structures, hostel rules, placement records, and syllabus requirements.",
    problemSolved:
      "College portals are notoriously fragmented and difficult to navigate, and generic LLMs frequently hallucinate institutional policies. This system leverages dense vector embeddings and exact citation references to provide 100% verifiable answers grounded exclusively in verified college documents.",
    keyFeatures: [
      "100% Source-Grounded Q&A with clickable citation references to official college documents.",
      "Zero-Hallucination vector retrieval engine ensuring strict factual adherence.",
      "Sub-second semantic search combining dense vector embeddings with metadata filtering.",
      "Interactive conversational UI with markdown support, query history, and quick starter prompts.",
      "Dynamic knowledge base ingestion pipeline supporting PDF handbooks and policy bulletins.",
    ],
    architecture:
      "Next.js full-stack web application, LangChain document chunking & retrieval pipeline, Pinecone vector database index, and Google Gemini / OpenAI embeddings for high-dimensional semantic search.",
    techBreakdown: {
      frontend: ["Next.js", "TypeScript", "Tailwind CSS"],
      backend: ["FastAPI / Node.js", "LangChain Python"],
      aiAndLlm: ["Pinecone Vector DB", "OpenAI / Gemini Embeddings", "Dense Retrieval"],
      database: ["Pinecone Vector Index", "In-Memory Caching"],
      tools: ["Vercel", "PyPDF", "Markdown Parser"],
    },
  },
  "AI-POWERED-RESUME-BUILDER-PLATFORM": {
    title: "AI-Powered Resume Builder & ATS Analyzer",
    tagline: "Multi-Agent Collaborative Resume Generation & Scoring Platform",
    category: "Multi-Agent Systems & NLP",
    fullOverview:
      "An intelligent, end-to-end career platform where a team of 4 specialized AI agents collaborate to draft, format, optimize against Applicant Tracking Systems (ATS), and score professional resumes in real time.",
    problemSolved:
      "Over 75% of job applications are filtered out by ATS parsers before reaching human recruiters due to poor formatting or missing keywords. This platform analyzes job descriptions, pinpoints exact keyword deficiencies, and rewires resume content to maximize match percentage.",
    keyFeatures: [
      "4 Collaborating AI Agent Roles: Content Writer, Keyword Optimizer, ATS Scorer, and Executive Formatter.",
      "Real-time ATS match scoring (0-100%) against custom job descriptions.",
      "Actionable keyword gap analysis highlighting high-impact missing industry skills.",
      "1-Click ATS-friendly PDF export with clean formatting.",
      "Interactive live preview editor with instant AI rewrite suggestions.",
    ],
    architecture:
      "React.js frontend with live preview engine, Node.js / Express backend with FastAPI AI microservice, Groq / Gemini ultra-fast inference APIs, and MongoDB for user resume revisions.",
    techBreakdown: {
      frontend: ["React.js", "Tailwind CSS", "Framer Motion"],
      backend: ["Node.js", "Express.js", "FastAPI"],
      aiAndLlm: ["Groq LLM Inference", "Google Gemini API", "Multi-Agent Crew"],
      database: ["MongoDB Atlas"],
      tools: ["Render.com", "PDFKit", "JWT Auth"],
    },
  },
  macrosnap: {
    title: "MacroSnap AI Vision Nutrition",
    tagline: "Computer Vision Meal Nutrient Tracker & Automated WhatsApp Reports",
    category: "AI Vision & Workflow Automation",
    fullOverview:
      "MacroSnap is an AI-powered visual dietary assistant that instantly calculates caloric breakdown and macronutrient distributions (protein, carbohydrates, fats, fiber) from photos of food plates or text logs, sending scheduled weekly health progress summaries to WhatsApp.",
    problemSolved:
      "Manual dietary logging is tedious and leads to high user abandonment. MacroSnap removes friction by utilizing multimodal computer vision to analyze meal photos in seconds, eliminating manual portion entry.",
    keyFeatures: [
      "Multimodal Computer Vision Analysis recognizing meal components and estimating portions.",
      "Instant Nutritional Breakdown calculating calories, protein, carbs, and fat ratios.",
      "Automated Scheduled WhatsApp Reports delivering weekly health metrics via WhatsApp Cloud API.",
      "Interactive Streamlit Analytics Dashboard with historical trend charts and macro targets.",
      "Natural language food logging support for quick text-based meal adjustments.",
    ],
    architecture:
      "Streamlit Python web application, Gemini 1.5 Vision multimodal API for food recognition, WhatsApp Cloud API webhook pipeline, and Pandas for historical dietary analytics.",
    techBreakdown: {
      frontend: ["Streamlit UI", "Custom CSS"],
      backend: ["Python 3.11", "WhatsApp Cloud API Webhooks"],
      aiAndLlm: ["Google Gemini 1.5 Vision API", "Multimodal Prompt Engineering"],
      database: ["SQLite / JSON Structured Store"],
      tools: ["Streamlit Cloud", "Meta WhatsApp API", "Pandas", "Matplotlib"],
    },
  },
  AI_MOCK_INTERVIEW_PLATFORM: {
    title: "AI Mock Interview Simulator",
    tagline: "Real-Time Voice-Enabled Technical Interview & Assessment Engine",
    category: "Speech AI & Evaluation",
    fullOverview:
      "An interactive AI mock interview platform that simulates realistic technical and behavioral hiring rounds, offering real-time question adaptation, speech-to-text response capture, and comprehensive post-interview scorecards with granular actionable feedback.",
    problemSolved:
      "Candidates struggle to practice realistic technical interview conversations with qualitative feedback. This simulator creates an adaptive interview environment with immediate speech analysis and constructive performance coaching.",
    keyFeatures: [
      "Dynamic Role-Based Question Engine adapting difficulty based on candidate responses.",
      "Voice-to-Text Response Capture using browser Web Speech API for natural conversation flow.",
      "Granular Performance Scorecard measuring technical correctness, communication clarity, and confidence.",
      "Constructive feedback suggestions with sample improved answers.",
      "Custom interview setup for Full-Stack, AI Engineer, Backend, and Frontend roles.",
    ],
    architecture:
      "Next.js App Router frontend, Web Speech API integration for speech recognition, Gemini API evaluation engine, and Tailwind CSS responsive interface.",
    techBreakdown: {
      frontend: ["Next.js", "TypeScript", "Web Speech API", "Tailwind CSS"],
      backend: ["Next.js Server Actions", "Node.js"],
      aiAndLlm: ["Google Gemini API", "Prompt Engineering Evaluation Suite"],
      database: ["Local Storage / Session State"],
      tools: ["Vercel", "Framer Motion", "Lucide Icons"],
    },
  },
  "pixel-pounce-game": {
    title: "Pixel Pounce Game",
    tagline: "2D Retro Canvas Physics Arcade Platformer",
    category: "Game Dev & Physics Engine",
    fullOverview:
      "A fast-paced browser arcade pixel platformer built with vanilla HTML5 Canvas and JavaScript, demonstrating custom 2D collision physics, smooth momentum handling, procedural obstacle generation, and live high-score persistence.",
    problemSolved:
      "Demonstrates core algorithmic problem solving, frame-rate independent game loop architecture, custom mathematical physics collision models, and lightweight DOM-free canvas rendering.",
    keyFeatures: [
      "Custom 60 FPS Game Loop with delta-time calculation and physics momentum.",
      "AABB Box Collision Detection and dynamic gravity/velocity models.",
      "Procedural Obstacle & Platform Generation creating endless varied gameplay.",
      "Retro Pixel Art Aesthetic with responsive canvas scaling across all screen sizes.",
      "High Score Persistence using browser LocalStorage.",
    ],
    architecture:
      "HTML5 Canvas 2D rendering pipeline, vanilla JavaScript physics engine, CSS3 responsive viewport wrapper, deployed on GitHub Pages.",
    techBreakdown: {
      frontend: ["HTML5 Canvas", "Vanilla JavaScript (ES6+)", "CSS3"],
      backend: ["Client-Side Game Engine"],
      aiAndLlm: ["N/A (Pure Math & Physics Engine)"],
      database: ["Browser LocalStorage"],
      tools: ["GitHub Pages", "Pixel Art Assets"],
    },
  },
};

interface ProjectModalProps {
  project: ProjectCard | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { setChatOpen } = useUI();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [project, onClose]);

  if (!project) return null;

  const details = PROJECT_DETAILS_MAP[project.name] || {
    title: project.name,
    tagline: "Production Project by Arvind Kumar",
    category: "Full-Stack & AI",
    fullOverview: project.description || "Production project built by Arvind Kumar.",
    problemSolved: "Engineered to solve real-world problems with scalable modern architecture.",
    keyFeatures: [
      "Production-ready architecture with clean separation of concerns.",
      "Responsive and intuitive user interface with modern styling.",
      "Integrated error handling and performance optimizations.",
    ],
    architecture: "Full-stack application built with modern web technologies.",
    techBreakdown: {
      frontend: project.language ? [project.language] : ["TypeScript", "React"],
      tools: project.topics || [],
    },
  };

  const isDeployed = Boolean(
    project.homepage &&
      project.homepage.trim().length > 0 &&
      project.homepage.startsWith("http") &&
      project.homepage.trim().replace(/\/+$/, "") !== project.url.trim().replace(/\/+$/, "") &&
      !project.homepage.includes(`github.com/${project.fullName}`)
  );

  const askAiAboutThis = () => {
    onClose();
    setChatOpen(true);
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("ask-ai-prompt", {
          detail: `Can you explain the architecture, tech stack, and key features of ${project.name}?`,
        })
      );
    }, 150);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-3xl rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]"
        >
          {/* Header Banner */}
          <div className="relative p-6 sm:p-8 pb-6 border-b border-slate-100 dark:border-slate-800/80 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/90 dark:to-slate-900">
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 text-xs font-mono font-semibold">
                <Layers size={13} />
                <span>{details.category}</span>
              </span>

              {isDeployed ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Live Deployed</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 text-xs font-mono font-semibold">
                  <GithubIcon size={13} />
                  <span>Open Source</span>
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {details.title}
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
              {details.tagline}
            </p>

            {/* Quick CTAs */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {isDeployed && (
                <a
                  href={project.homepage!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white text-xs font-bold transition-all shadow-md shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Globe size={14} className="text-white" />
                  <span>Launch Live App</span>
                  <ArrowUpRight size={13} className="text-white" />
                </a>
              )}

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:text-slate-950 dark:hover:text-white hover:border-indigo-500 transition-all text-xs font-semibold shadow-xs"
              >
                <GithubIcon size={14} />
                <span>View Source Code</span>
                <ExternalLink size={12} className="text-slate-400" />
              </a>

              <button
                onClick={askAiAboutThis}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white transition-all text-xs font-semibold cursor-pointer"
              >
                <Sparkles size={13} />
                <span>Ask AI Assistant</span>
              </button>
            </div>
          </div>

          {/* Modal Body - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 select-text text-sm">
            {/* Overview */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1.5">
                <Layers size={14} />
                <span>Project Overview</span>
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                {details.fullOverview}
              </p>
            </div>

            {/* Problem & Solution */}
            {details.problemSolved && (
              <div className="p-4 rounded-2xl border border-indigo-100 dark:border-indigo-950/60 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-700 dark:text-indigo-300 font-bold flex items-center gap-1.5">
                  <Sparkles size={14} />
                  <span>Problem Solved & Innovation</span>
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {details.problemSolved}
                </p>
              </div>
            )}

            {/* Key Features */}
            {details.keyFeatures && details.keyFeatures.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={14} />
                  <span>Key Features & Capabilities</span>
                </h3>
                <ul className="grid gap-2.5 sm:grid-cols-1">
                  {details.keyFeatures.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300 text-xs sm:text-sm"
                    >
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold">
                        ✓
                      </span>
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Architecture Highlights */}
            {details.architecture && (
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1.5">
                  <Cpu size={14} />
                  <span>Architecture & Engineering</span>
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                  {details.architecture}
                </p>
              </div>
            )}

            {/* Tech Stack Breakdown */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1.5">
                <Code2 size={14} />
                <span>Technologies & Frameworks</span>
              </h3>
              <div className="space-y-2.5">
                {details.techBreakdown.frontend && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 min-w-[90px]">
                      Frontend:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {details.techBreakdown.frontend.map((t) => (
                        <Badge key={t} variant="tech" techName={t}>
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {details.techBreakdown.backend && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 min-w-[90px]">
                      Backend:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {details.techBreakdown.backend.map((t) => (
                        <Badge key={t} variant="tech" techName={t}>
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {details.techBreakdown.aiAndLlm && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 min-w-[90px]">
                      AI / LLM:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {details.techBreakdown.aiAndLlm.map((t) => (
                        <Badge key={t} variant="accent">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {details.techBreakdown.database && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 min-w-[90px]">
                      Database:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {details.techBreakdown.database.map((t) => (
                        <Badge key={t} variant="default">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {details.techBreakdown.tools && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 min-w-[90px]">
                      Tools / Other:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {details.techBreakdown.tools.map((t) => (
                        <Badge key={t} variant="default">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Star size={13} className="text-amber-500 fill-amber-500" />
                {project.stars} Stars
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <GitFork size={13} />
                {project.forks} Forks
              </span>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white text-xs font-semibold cursor-pointer shadow-xs"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
