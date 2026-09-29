"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Terminal, MessageSquare } from "lucide-react";
import { useUI } from "@/lib/ui-bus";
import profile from "@/content/profile.json";

export function Navbar() {
  const { toggleChat, toggleTerminal, activeTerminal } = useUI();

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 transition-all">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link
          href="#hero"
          className="flex items-center gap-2.5 font-semibold text-slate-100 tracking-tight group"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500 text-white font-mono font-bold shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            AK
          </span>
          <span className="flex flex-col">
            <span className="text-sm font-bold leading-tight text-slate-100">
              {profile.name}
            </span>
            <span className="text-[10px] font-mono text-slate-400 leading-tight flex items-center gap-1">
              AI-Native <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="#projects" className="hover:text-indigo-400 transition-colors">
            Projects
          </Link>
          <Link href="#skills" className="hover:text-indigo-400 transition-colors">
            Skills
          </Link>
          <Link href="#experience" className="hover:text-indigo-400 transition-colors">
            Experience
          </Link>
          <Link href="/resume" className="text-indigo-400 font-semibold hover:underline transition-colors flex items-center gap-1">
            <span>Resume</span>
          </Link>
          <Link href="#contact" className="hover:text-indigo-400 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Terminal Mode Toggle */}
          <button
            onClick={toggleTerminal}
            title={activeTerminal ? "Exit Terminal View" : "Open Monospace Terminal"}
            aria-label="Toggle terminal mode"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
              activeTerminal
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20"
                : "border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-indigo-500"
            }`}
          >
            <Terminal size={14} />
            <span className="hidden sm:inline">Terminal</span>
          </button>

          {/* Ask AI Trigger */}
          <button
            onClick={toggleChat}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-semibold transition-all cursor-pointer shadow-md shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles size={13} className="animate-pulse text-white" />
            <span className="hidden sm:inline text-white">Ask AI</span>
            <MessageSquare size={13} className="sm:hidden text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
