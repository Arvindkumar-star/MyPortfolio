"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, GitFork, ExternalLink, Sparkles, Pin, Globe, Info } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { useUI } from "@/lib/ui-bus";
import type { ProjectCard } from "@/lib/github/getProjects";
import { Badge } from "../ui/Badge";
import { ProjectModal } from "../projects/ProjectModal";

export function ProjectsGrid({ projects }: { projects: ProjectCard[] }) {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [activeModalProject, setActiveModalProject] = useState<ProjectCard | null>(null);
  const { highlightedProject, highlightedTech, setChatOpen } = useUI();

  // Extract unique technologies across all projects
  const allTechs = Array.from(
    new Set(
      projects.flatMap((p) => [p.language, ...p.topics]).filter(Boolean) as string[]
    )
  ).slice(0, 14);

  const filteredProjects = selectedTech
    ? projects.filter(
        (p) =>
          (p.language && p.language.toLowerCase() === selectedTech.toLowerCase()) ||
          p.topics.some((t) => t.toLowerCase() === selectedTech.toLowerCase())
      )
    : projects;

  const askAiAboutProject = (projectName: string) => {
    setChatOpen(true);
    window.dispatchEvent(
      new CustomEvent("ask-ai-prompt", {
        detail: `Can you explain the architecture and key features of ${projectName}?`,
      })
    );
  };

  return (
    <div>
      {/* Tech Filter Buttons */}
      <div
        className="mt-6 flex flex-wrap gap-2 items-center"
        role="group"
        aria-label="Filter projects by technology"
      >
        <button
          onClick={() => setSelectedTech(null)}
          className={`rounded-full border px-3.5 py-1 text-xs font-mono transition-all cursor-pointer ${
            selectedTech === null
              ? "bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-500/20"
              : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:border-indigo-500"
          }`}
        >
          All ({projects.length})
        </button>
        {allTechs.map((tech) => {
          const isHighlighted =
            highlightedTech &&
            highlightedTech.toLowerCase() === tech.toLowerCase();
          const isSelected = selectedTech === tech;

          return (
            <button
              key={tech}
              onClick={() => setSelectedTech(isSelected ? null : tech)}
              aria-pressed={isSelected}
              className={`rounded-full border px-3 py-1 text-xs font-mono transition-all cursor-pointer ${
                isSelected || isHighlighted
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20 scale-105"
                  : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:border-indigo-500"
              }`}
            >
              {tech}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <motion.div
        layout
        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence>
          {filteredProjects.map((p) => {
            const isHighlighted =
              highlightedProject &&
              (highlightedProject.toLowerCase() === p.name.toLowerCase() ||
                p.fullName.toLowerCase().includes(highlightedProject.toLowerCase()));

            // Deployed condition: homepage exists, is valid URL, and is distinct from the repo URL
            const isDeployed = Boolean(
              p.homepage &&
                p.homepage.trim().length > 0 &&
                p.homepage.startsWith("http") &&
                p.homepage.trim().replace(/\/+$/, "") !== p.url.trim().replace(/\/+$/, "") &&
                !p.homepage.includes(`github.com/${p.fullName}`)
            );

            return (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                key={p.id}
                id={`project-${p.name}`}
                onClick={() => setActiveModalProject(p)}
                className={`group relative flex flex-col justify-between rounded-2xl border p-5 backdrop-blur-xl bg-white dark:bg-slate-900/90 transition-all duration-300 cursor-pointer ${
                  isHighlighted
                    ? "border-indigo-500 ring-2 ring-indigo-500 shadow-xl shadow-indigo-500/20 scale-[1.02]"
                    : "border-slate-200/90 dark:border-slate-800 hover:border-indigo-500/60 shadow-sm hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-base text-slate-900 dark:text-slate-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-1.5 break-words">
                        <span className="truncate">{p.name}</span>
                        {p.pinned && (
                          <span
                            title="Pinned Repository"
                            className="inline-flex shrink-0 items-center text-indigo-600 dark:text-indigo-400"
                          >
                            <Pin size={13} className="rotate-45" />
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Header Status Badge */}
                    {isDeployed ? (
                      <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-mono font-semibold whitespace-nowrap shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Live</span>
                      </span>
                    ) : (
                      <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 text-[11px] font-mono whitespace-nowrap">
                        <GithubIcon size={12} />
                        <span>Source</span>
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed font-normal">
                    {p.description || "Production project built by Arvind Kumar."}
                  </p>

                  {/* Tech Badges */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.language && (
                      <Badge variant="tech" techName={p.language}>
                        {p.language}
                      </Badge>
                    )}
                    {p.topics.slice(0, 4).map((t) => (
                      <Badge key={t} variant="tech" techName={t}>
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                  {/* GitHub Stars & Forks */}
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="flex items-center gap-1 font-medium" title={`${p.stars} Stars`}>
                      <Star size={13} className="text-amber-500 fill-amber-500" />
                      {p.stars}
                    </span>
                    <span className="flex items-center gap-1 font-medium" title={`${p.forks} Forks`}>
                      <GitFork size={13} />
                      {p.forks}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => askAiAboutProject(p.name)}
                      title="Ask AI assistant about this project"
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white transition-all text-xs font-semibold cursor-pointer border border-indigo-200 dark:border-indigo-800/60"
                    >
                      <Sparkles size={12} />
                      <span>Ask AI</span>
                    </button>

                    {/* Primary Link Button */}
                    {isDeployed ? (
                      <a
                        href={p.homepage!}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Launch Live App: ${p.homepage}`}
                        aria-label={`Launch Live App: ${p.name}`}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white transition-all text-xs font-semibold shadow-xs"
                      >
                        <Globe size={12} className="text-white" />
                        <span>Live</span>
                        <ExternalLink size={11} className="text-white" />
                      </a>
                    ) : (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View GitHub Repository"
                        aria-label={`View GitHub Repo: ${p.name}`}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 text-white transition-all text-xs font-medium border border-slate-700"
                      >
                        <GithubIcon size={12} className="text-white" />
                        <span>Repo</span>
                        <ExternalLink size={11} className="text-white" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Project Details Modal Popup */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
}
