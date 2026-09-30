import React from "react";
import Link from "next/link";
import { Download, ArrowLeft, Mail, Globe, ExternalLink } from "lucide-react";
import profile from "@/content/profile.json";
import skills from "@/content/skills.json";
import experience from "@/content/experience.json";

export const metadata = {
  title: "Resume — Arvind Kumar | Full-Stack & AI Engineer",
  description: "Official resume of Arvind Kumar, B.Tech student at IIIT Pune, Full-Stack and AI Engineer.",
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 py-8 sm:py-10 px-3.5 sm:px-6 transition-colors">
      <div className="max-w-4xl mx-auto">
        {/* Navigation & Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-[#0B0F19] px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:border-indigo-500 transition-all shadow-sm"
          >
            <ArrowLeft size={14} />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href="/Arvind_Kumar_Resume.pdf"
              download="Arvind_Kumar_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 px-4 sm:px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Download size={14} className="text-white" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Printable Resume Sheet Container */}
        <div className="rounded-2xl border border-slate-800 p-5 sm:p-10 md:p-12 shadow-xl bg-[#0B0F19] space-y-6 sm:space-y-8 font-sans">
          {/* Header */}
          <header className="border-b border-slate-800/80 pb-5 sm:pb-6 text-center sm:text-left sm:flex sm:justify-between sm:items-end">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                {profile.name}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-indigo-400 mt-1">
                {profile.education.degree}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {profile.education.institution} • {profile.location}
              </p>
            </div>

            <div className="mt-4 sm:mt-0 flex flex-wrap justify-center sm:justify-end gap-3 text-xs text-slate-600 dark:text-slate-400 font-mono">
              <a
                href={`mailto:${profile.contact.email}`}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
              >
                <Mail size={12} /> {profile.contact.email}
              </a>
              <span>•</span>
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
              >
                <ExternalLink size={12} /> LinkedIn
              </a>
              <span>•</span>
              <a
                href={profile.contact.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
              >
                <Globe size={12} /> GitHub
              </a>
            </div>
          </header>

          {/* Professional Summary */}
          <section className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {profile.summary}
            </p>
          </section>

          {/* Technical Skills */}
          <section className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
              Technical Skills
            </h2>
            <div className="space-y-2.5 text-xs sm:text-sm">
              {skills.domains.map((domain) => (
                <div key={domain.name} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                  <span className="font-bold text-slate-900 dark:text-slate-100 min-w-[200px]">
                    {domain.name}:
                  </span>
                  <span className="text-slate-700 dark:text-slate-300">
                    {domain.skills.map((s) => s.name).join(", ")}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
              Experience
            </h2>
            {experience.experiences.map((exp) => (
              <div key={exp.id} className="space-y-2 pb-4 border-b border-slate-100 dark:border-slate-800/60 last:border-0 last:pb-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {exp.role} <span className="text-indigo-600 dark:text-indigo-400 font-medium">— {exp.company}</span>
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{exp.period}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{exp.summary}</p>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 dark:text-slate-300 pl-1">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
                <p className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-medium">
                  Technologies: {exp.technologies.join(", ")}
                </p>
              </div>
            ))}
          </section>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <section className="space-y-2">
              <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
                Education
              </h2>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{profile.education.institution}</p>
                <p className="text-xs text-slate-700 dark:text-slate-300">{profile.education.degree}</p>
                <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400 mt-1 font-medium">
                  {profile.education.period} • GPA: {profile.education.gpa}
                </p>
              </div>
            </section>

            <section className="space-y-2">
              <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
                Certifications & Achievements
              </h2>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {profile.certifications.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
