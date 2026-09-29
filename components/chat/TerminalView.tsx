"use client";

import React, { useState, useRef, useEffect } from "react";
import { useUI } from "@/lib/ui-bus";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from "lucide-react";
import profile from "@/content/profile.json";
import skills from "@/content/skills.json";
import experience from "@/content/experience.json";

type TerminalLine = {
  type: "input" | "output" | "system" | "error";
  text: string;
};

export function TerminalView() {
  const { activeTerminal, setTerminalOpen, setChatOpen } = useUI();
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "system", text: `======================================================` },
    { type: "system", text: `  ARVIND KUMAR // AI-NATIVE INTERACTIVE SHELL v1.0` },
    { type: "system", text: `  Type "help" to see available commands or ask anything.` },
    { type: "system", text: `======================================================` },
  ]);
  const [cmd, setCmd] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTerminal) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [lines, activeTerminal]);

  if (!activeTerminal) return null;

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    const input = cmd.trim();
    if (!input) return;

    setLines((prev) => [...prev, { type: "input", text: `$ ${input}` }]);
    setCmd("");

    const lower = input.toLowerCase();

    if (lower === "help") {
      setLines((prev) => [
        ...prev,
        {
          type: "output",
          text: `Available commands:\n  help        - List all commands\n  bio         - Display summary and background\n  skills      - List core skills and domains\n  experience  - Show career history\n  contact     - Display contact info & links\n  ask <query> - Ask the AI assistant\n  clear       - Clear screen\n  exit        - Close terminal shell`,
        },
      ]);
    } else if (lower === "clear") {
      setLines([]);
    } else if (lower === "exit" || lower === "quit") {
      setTerminalOpen(false);
    } else if (lower === "bio" || lower === "whoami") {
      setLines((prev) => [
        ...prev,
        {
          type: "output",
          text: `${profile.name} // ${profile.headline}\nLocation: ${profile.location}\nAvailability: ${profile.availability}\n\n${profile.summary}`,
        },
      ]);
    } else if (lower === "skills") {
      const skillsOutput = skills.domains
        .map(
          (d) =>
            `[${d.name}]\n  ${d.skills.map((s) => `${s.name} (${s.level})`).join(", ")}`
        )
        .join("\n\n");
      setLines((prev) => [...prev, { type: "output", text: skillsOutput }]);
    } else if (lower === "experience") {
      const expOutput = experience.experiences
        .map(
          (e) =>
            `• ${e.role} @ ${e.company} (${e.period})\n  ${e.summary}\n  Tech: ${e.technologies.join(", ")}`
        )
        .join("\n\n");
      setLines((prev) => [...prev, { type: "output", text: expOutput }]);
    } else if (lower === "contact") {
      setLines((prev) => [
        ...prev,
        {
          type: "output",
          text: `Email:    ${profile.contact.email}\nLinkedIn: ${profile.contact.linkedin}\nGitHub:   ${profile.contact.github}`,
        },
      ]);
    } else if (lower.startsWith("ask ") || lower.startsWith("ai ")) {
      const query = input.replace(/^(ask|ai)\s+/i, "");
      setLines((prev) => [
        ...prev,
        {
          type: "system",
          text: `[AI Shell] Routing "${query}" to full AI assistant...`,
        },
      ]);
      setChatOpen(true);
      window.dispatchEvent(new CustomEvent("ask-ai-prompt", { detail: query }));
    } else {
      // Default: forward directly to assistant prompt
      setLines((prev) => [
        ...prev,
        {
          type: "system",
          text: `[AI Shell] Routing "${input}" to full AI assistant...`,
        },
      ]);
      setChatOpen(true);
      window.dispatchEvent(new CustomEvent("ask-ai-prompt", { detail: input }));
    }
  };

  return (
    <div
      className={`fixed z-50 transition-all duration-300 font-mono text-xs ${
        isFullscreen
          ? "inset-0 p-0"
          : "bottom-4 right-4 sm:bottom-6 sm:right-6 w-[95vw] sm:w-[600px] h-[450px]"
      }`}
    >
      <div className="flex h-full flex-col rounded-2xl border border-emerald-500/30 bg-[#0B0D12]/95 text-emerald-400 shadow-2xl backdrop-blur-2xl overflow-hidden">
        {/* Top Titlebar */}
        <div className="flex items-center justify-between border-b border-emerald-500/20 bg-black/40 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <TerminalIcon size={14} className="text-emerald-400" />
            <span className="font-semibold text-emerald-300">
              arvind@portfolio: ~ (bash)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="text-emerald-500 hover:text-emerald-300 p-1 cursor-pointer"
              title="Toggle fullscreen"
            >
              {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            </button>
            <button
              onClick={() => setTerminalOpen(false)}
              className="text-emerald-500 hover:text-emerald-300 p-1 cursor-pointer"
              title="Close terminal"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 select-text">
          {lines.map((l, i) => (
            <div
              key={i}
              className={`whitespace-pre-wrap leading-relaxed ${
                l.type === "input"
                  ? "text-cyan-300 font-bold"
                  : l.type === "system"
                  ? "text-emerald-500/80"
                  : l.type === "error"
                  ? "text-red-400"
                  : "text-emerald-300"
              }`}
            >
              {l.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Prompt Input Form */}
        <form
          onSubmit={handleCommand}
          className="flex items-center gap-2 border-t border-emerald-500/20 bg-black/50 px-4 py-2.5"
        >
          <span className="text-emerald-400 font-bold">$</span>
          <input
            type="text"
            value={cmd}
            onChange={(e) => setCmd(e.target.value)}
            placeholder="Type 'help' or ask a question..."
            autoFocus
            className="flex-1 bg-transparent text-emerald-300 placeholder:text-emerald-700/60 focus:outline-none"
          />
        </form>
      </div>
    </div>
  );
}
