"use client";

import React from "react";
import experienceData from "@/content/experience.json";
import { Badge } from "../ui/Badge";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { useUI } from "@/lib/ui-bus";

export function Timeline() {
  const { highlight } = useUI();

  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 md:py-20">
      <div className="pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
          <Briefcase size={14} />
          <span>Track Record</span>
        </div>
        <h2 className="mt-1.5 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          Experience & Impact
        </h2>
      </div>

      <div className="mt-8 sm:mt-12 relative border-l-2 border-slate-800 ml-2 sm:ml-4 space-y-6 sm:space-y-10">
        {experienceData.experiences.map((exp) => (
          <div key={exp.id} className="relative pl-5 sm:pl-8 group">
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-2 h-4 w-4 rounded-full border-2 border-indigo-500 bg-[#090D16] group-hover:bg-indigo-500 group-hover:scale-125 transition-all shadow-sm" />

            <div className="rounded-2xl p-5 sm:p-6 border border-slate-800/90 bg-[#0B0F19] shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2.5 mt-1 text-xs text-slate-400 font-medium">
                    <span className="font-semibold text-slate-200">{exp.company}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-slate-500" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-800/60 bg-indigo-950/40 text-xs font-mono font-medium text-indigo-300 self-start sm:self-auto">
                  <Calendar size={12} />
                  <span>{exp.period}</span>
                </div>
              </div>

              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {exp.summary}
              </p>

              {/* Highlights */}
              <ul className="mt-3.5 space-y-2 text-xs sm:text-sm text-slate-300">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold mt-0.5">▸</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex flex-wrap gap-1.5 items-center">
                <span className="text-xs font-mono text-slate-400 mr-1.5">Technologies:</span>
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
