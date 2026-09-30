"use client";

import React from "react";
import skillsData from "@/content/skills.json";
import { Badge } from "../ui/Badge";
import { useUI } from "@/lib/ui-bus";
import { Wrench, Sparkles } from "lucide-react";

export function Skills() {
  const { highlight } = useUI();

  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 md:py-20">
      <div className="pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
          <Wrench size={14} />
          <span>Technical Capabilities</span>
        </div>
        <h2 className="mt-1.5 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          Skills & Expertise
        </h2>
      </div>

      <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
        Curated across production agent pipelines, full-stack architectures, and high-performance web systems. Click any skill to spotlight it across projects.
      </p>

      <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        {skillsData.domains.map((domain) => (
          <div
            key={domain.name}
            className="rounded-2xl p-5 sm:p-6 border border-slate-800/90 bg-[#0B0F19] shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-slate-800/80">
              <h3 className="font-bold text-base sm:text-lg text-slate-100 flex items-center gap-2">
                <Sparkles size={15} className="text-indigo-400" />
                <span>{domain.name}</span>
              </h3>
              <span className="text-[11px] sm:text-xs font-mono text-slate-400">
                {domain.skills.length} skills
              </span>
            </div>

            <div className="mt-4 sm:mt-5 space-y-3.5 sm:space-y-4">
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
                    <span className="font-mono text-slate-400 text-[11px] font-medium">
                      {skill.level} ({skill.proficiency}%)
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500"
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
