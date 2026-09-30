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
    <section id="hero" className="relative overflow-hidden pt-8 pb-14 sm:pt-16 sm:pb-24 md:pt-20 md:pb-28">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[350px] sm:h-[450px] bg-radial-glow pointer-events-none -z-10" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          {/* Availability Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-mono text-emerald-300 mb-5 sm:mb-6 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs">{profile.availability}</span>
          </motion.div>

          {/* Main Title & Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.15] sm:leading-[1.1]"
          >
            Hi, I&apos;m <span className="gradient-text">{profile.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 sm:mt-6 text-base sm:text-xl text-slate-300 max-w-2xl font-medium leading-relaxed px-1"
          >
            {profile.headline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-slate-400 max-w-xl font-normal leading-relaxed px-2"
          >
            {profile.summary}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 w-full max-w-md sm:max-w-none"
          >
            {/* Primary Ask AI CTA */}
            <button
              onClick={() => setChatOpen(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer w-full sm:w-auto"
            >
              <Sparkles size={15} className="text-white" />
              <span className="text-white">Ask My AI Assistant</span>
            </button>

            {/* Explore Projects Button */}
            <a
              href="#projects"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-[#0B0F19] px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-100 hover:border-indigo-400 hover:bg-slate-800 transition-all shadow-sm flex-1 sm:flex-initial"
            >
              <span>Explore Projects</span>
              <ArrowRight size={14} className="text-slate-400" />
            </a>

            {/* Resume Button */}
            <Link
              href="/resume"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-[#0B0F19] px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-100 hover:border-indigo-400 hover:bg-slate-800 transition-all shadow-sm flex-1 sm:flex-initial"
            >
              <FileText size={14} className="text-indigo-400" />
              <span>Resume</span>
            </Link>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-2 w-full sm:w-auto mt-1 sm:mt-0 sm:pl-2 sm:border-l sm:border-slate-800">
              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-slate-800 bg-[#0B0F19] text-slate-400 hover:text-white hover:border-indigo-500 transition-all shadow-sm"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-slate-800 bg-[#0B0F19] text-slate-400 hover:text-white hover:border-indigo-500 transition-all shadow-sm"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href={`mailto:${profile.contact.email}`}
                aria-label="Email Arvind"
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-slate-800 bg-[#0B0F19] text-slate-400 hover:text-white hover:border-indigo-500 transition-all shadow-sm"
              >
                <Mail size={16} />
              </a>
            </div>
          </motion.div>

          {/* Quick Highlight Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-3xl text-left"
          >
            <div className="rounded-2xl p-4 flex items-center gap-3.5 border border-slate-800/90 bg-[#0B0F19] shadow-sm">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
                <Bot size={18} />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-slate-100 truncate">Autonomous Agents</h3>
                <p className="text-xs text-slate-400">Tool-calling & multi-step RAG</p>
              </div>
            </div>

            <div className="rounded-2xl p-4 flex items-center gap-3.5 border border-slate-800/90 bg-[#0B0F19] shadow-sm">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                <Zap size={18} />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-slate-100 truncate">Workflow Automation</h3>
                <p className="text-xs text-slate-400">End-to-end event pipelines</p>
              </div>
            </div>

            <div className="rounded-2xl p-4 flex items-center gap-3.5 border border-slate-800/90 bg-[#0B0F19] shadow-sm">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
                <Cpu size={18} />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-slate-100 truncate">Full-Stack Architecture</h3>
                <p className="text-xs text-slate-400">Node.js, React & MongoDB</p>
              </div>
            </div>
          </motion.div>

          {/* Engineering Philosophy Quote Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 sm:mt-10 w-full max-w-3xl rounded-2xl p-4 sm:p-6 border border-indigo-900/50 bg-gradient-to-r from-indigo-950/40 via-[#0B0F19] to-cyan-950/40 shadow-sm text-center"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/70 text-indigo-300 border border-indigo-800/60 text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
              <Sparkles size={11} className="text-indigo-400" />
              <span>Engineering Philosophy</span>
            </div>
            <blockquote className="text-sm sm:text-base md:text-lg font-semibold text-slate-100 italic tracking-tight leading-relaxed max-w-2xl mx-auto">
              &ldquo;Software used to follow rules. Today, we architect software that learns, reasons, and acts.&rdquo;
            </blockquote>
            <p className="mt-2 text-[11px] sm:text-xs font-mono font-semibold text-slate-400">
              — Arvind Kumar
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
