"use client";

import React from "react";
import skillsData from "@/content/skills.json";
import { Badge } from "../ui/Badge";
import { useUI } from "@/lib/ui-bus";
import { Wrench, Sparkles } from "lucide-react";

export function Skills() {
  const { highlight } = useUI();

  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
      <div className="pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
          <Wrench size={14} />
          <span>Technical Capabilities</span>
        </div>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Skills & Expertise
        </h2>
      </div>

      <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
        Curated across production agent pipelines, full-stack architectures, and high-performance web systems. Click any skill to spotlight it across projects.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {skillsData.domains.map((domain) => (
          <div
            key={domain.name}
            className="rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800/80">
              <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Sparkles size={16} className="text-indigo-600 dark:text-indigo-400" />
                {domain.name}
              </h3>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {domain.skills.length} skills
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {domain.skills.map((skill) => (
                <div key={skill.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <Badge
                      variant="tech"
                      techName={skill.name}
                      onClick={() => highlight("tech", skill.name)}
                      className="cursor-pointer"
                    >
                      {skill.name}
                    </Badge>
                    <span className="font-mono text-slate-600 dark:text-slate-400 text-[11px] font-medium">
                      {skill.level} ({skill.proficiency}%)
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 transition-all duration-500"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
