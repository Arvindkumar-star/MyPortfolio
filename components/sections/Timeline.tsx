"use client";

import React from "react";
import experienceData from "@/content/experience.json";
import { Badge } from "../ui/Badge";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { useUI } from "@/lib/ui-bus";

export function Timeline() {
  const { highlight } = useUI();

  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
      <div className="pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
          <Briefcase size={14} />
          <span>Track Record</span>
        </div>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Experience & Impact
        </h2>
      </div>

      <div className="mt-12 relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 sm:ml-6 space-y-10">
        {experienceData.experiences.map((exp) => (
          <div key={exp.id} className="relative pl-6 sm:pl-8 group">
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-indigo-600 bg-white dark:bg-slate-950 group-hover:bg-indigo-600 group-hover:scale-125 transition-all shadow-sm" />

            <div className="rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-600 dark:text-slate-400 font-medium">
                    <span className="font-semibold text-slate-900 dark:text-slate-200">{exp.company}</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-slate-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800/60 bg-indigo-50 dark:bg-indigo-950/40 text-xs font-mono font-medium text-indigo-700 dark:text-indigo-300 self-start sm:self-auto">
                  <Calendar size={12} />
                  <span>{exp.period}</span>
                </div>
              </div>

              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {exp.summary}
              </p>

              {/* Highlights */}
              <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold mt-0.5">▸</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-1.5 items-center">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 mr-2">Technologies:</span>
                {exp.technologies.map((t) => (
                  <Badge
                    key={t}
                    variant="tech"
                    techName={t}
                    onClick={() => highlight("tech", t)}
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
