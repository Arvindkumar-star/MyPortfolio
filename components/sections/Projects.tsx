import React from "react";
import { getProjects } from "@/lib/github/getProjects";
import { ProjectsGrid } from "./ProjectsGrid";
import { FolderGit2 } from "lucide-react";

export async function Projects() {
  const { projects, source } = await getProjects();

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
            <FolderGit2 size={14} />
            <span>Featured Work & Open Source</span>
          </div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Projects
          </h2>
        </div>
        <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
          Source: <span className="text-indigo-600 dark:text-indigo-400 font-semibold capitalize">{source}</span> · Auto-synced from GitHub
        </p>
      </div>

      <ProjectsGrid projects={projects} />
    </section>
  );
}
