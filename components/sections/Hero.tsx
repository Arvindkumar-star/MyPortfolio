"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Mail, Cpu, Bot, Zap, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import profile from "@/content/profile.json";
import { useUI } from "@/lib/ui-bus";

export function Hero() {
  const { setChatOpen } = useUI();

  return (
    <section id="hero" className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-radial-glow pointer-events-none -z-10" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          {/* Availability Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-mono text-emerald-700 dark:text-emerald-300 mb-6 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{profile.availability}</span>
          </motion.div>

          {/* Main Title & Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl leading-[1.1]"
          >
            Hi, I&apos;m <span className="gradient-text">{profile.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-slate-700 dark:text-slate-300 max-w-2xl font-medium leading-relaxed"
          >
            {profile.headline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-xl font-normal leading-relaxed"
          >
            {profile.summary}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
          >
            {/* Primary Ask AI CTA */}
            <button
              onClick={() => setChatOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Sparkles size={16} className="text-white" />
              <span className="text-white">Ask My AI Assistant</span>
            </button>

            {/* Explore Projects Button */}
            <a
              href="#projects"
              className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-slate-100 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
            >
              <span>Explore Projects</span>
              <ArrowRight size={15} className="text-slate-400 dark:text-slate-500" />
            </a>

            {/* Resume Button */}
            <Link
              href="/resume"
              className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-800 dark:text-slate-100 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
            >
              <FileText size={15} className="text-indigo-600 dark:text-indigo-400" />
              <span>Resume</span>
            </Link>

            {/* Social Links */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-indigo-500 transition-all shadow-sm"
              >
                <GithubIcon size={17} />
              </a>
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-indigo-500 transition-all shadow-sm"
              >
                <LinkedinIcon size={17} />
              </a>
              <a
                href={`mailto:${profile.contact.email}`}
                aria-label="Email Arvind"
                className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-indigo-500 transition-all shadow-sm"
              >
                <Mail size={17} />
              </a>
            </div>
          </motion.div>

          {/* Quick Highlight Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl text-left"
          >
            <div className="glass-card rounded-2xl p-4 flex items-center gap-3.5 border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/80">
              <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Autonomous Agents</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Tool-calling & multi-step RAG</p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-4 flex items-center gap-3.5 border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/80">
              <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <Zap size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Workflow Automation</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">End-to-end event pipelines</p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-4 flex items-center gap-3.5 border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/80">
              <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Cpu size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Full-Stack Architecture</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Node.js, React & MongoDB</p>
              </div>
            </div>
          </motion.div>

          {/* Engineering Philosophy Quote Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 w-full max-w-3xl rounded-2xl p-5 sm:p-6 border border-indigo-200/80 dark:border-indigo-900/50 bg-gradient-to-r from-indigo-50/60 via-white to-cyan-50/60 dark:from-indigo-950/30 dark:via-slate-900/80 dark:to-cyan-950/30 shadow-sm text-center"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100/70 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 text-[11px] font-mono font-bold uppercase tracking-wider mb-2.5">
              <Sparkles size={12} className="text-indigo-600 dark:text-indigo-400" />
              <span>Engineering Philosophy</span>
            </div>
            <blockquote className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 italic tracking-tight leading-relaxed max-w-2xl mx-auto">
              &ldquo;Software used to follow rules. Today, we architect software that learns, reasons, and acts.&rdquo;
            </blockquote>
            <p className="mt-2 text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
              — Arvind Kumar
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
