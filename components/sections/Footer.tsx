import React from "react";
import Link from "next/link";
import profile from "@/content/profile.json";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-12 transition-colors">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white font-mono text-xs font-bold shadow-sm">
              AK
            </span>
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{profile.name}</span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            AI-Native Portfolio &copy; {new Date().getFullYear()} · All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
          <Link href="/resume" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline transition-colors">
            Resume
          </Link>
          <span>·</span>
          <span>Next.js 16</span>
          <span>·</span>
          <span>TypeScript</span>
          <span>·</span>
          <span>MongoDB & RAG</span>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-indigo-500 transition-all shadow-sm"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-indigo-500 transition-all shadow-sm"
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href={`mailto:${profile.contact.email}`}
            aria-label="Email Arvind"
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-indigo-500 transition-all shadow-sm"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
