"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useUI } from "@/lib/ui-bus";
import {
  Sparkles,
  X,
  Send,
  Square,
  Trash2,
  Bot,
  User,
} from "lucide-react";
import profile from "@/content/profile.json";

const QUICK_CHIPS = [
  "What projects have you built with Next.js and AI?",
  "Tell me about your RAG and autonomous agent experience",
  "What is your primary tech stack & expertise?",
  "Are you open to full-time roles?",
  "How can I contact or hire you?",
];

export function ChatDrawer() {
  const { chatOpen, setChatOpen, highlight, navigate } = useUI();
  const [inputVal, setInputVal] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const handledToolCalls = useRef<Set<string>>(new Set());

  const {
    messages,
    sendMessage,
    status,
    stop,
    setMessages,
    error,
  } = useChat({
    // Standard AI SDK v5 chat options
  });

  const isBusy = status === "submitted" || status === "streaming";

  const handleSend = useCallback((text: string) => {
    if (!text.trim() || isBusy) return;
    sendMessage({ text });
    setInputVal("");
  }, [isBusy, sendMessage]);

  // Handle external custom prompt triggers (e.g. from Hero or Project cards)
  useEffect(() => {
    const handlePromptEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        handleSend(customEvent.detail);
      }
    };
    window.addEventListener("ask-ai-prompt", handlePromptEvent);
    return () => window.removeEventListener("ask-ai-prompt", handlePromptEvent);
  }, [handleSend]);

  // Execute UI tools streamed from assistant exactly once
  useEffect(() => {
    for (const m of messages) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const part of (m as any).parts || []) {
        if (
          part.type?.startsWith("tool-") &&
          part.state === "output-available" &&
          part.toolCallId &&
          !handledToolCalls.current.has(part.toolCallId)
        ) {
          handledToolCalls.current.add(part.toolCallId);
          const out = part.output;
          if (out?.action === "navigate" && out.section) {
            navigate(out.section);
          } else if (out?.action === "highlightProject" && out.name) {
            highlight("project", out.name);
          } else if (out?.action === "highlightTech" && out.tech) {
            highlight("tech", out.tech);
          }
        }
      }
    }
  }, [messages, highlight, navigate]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (chatOpen) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, status, chatOpen]);

  if (!chatOpen) return null;

  return (
    <aside
      role="dialog"
      aria-label="AI Portfolio Assistant"
      className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 shadow-2xl backdrop-blur-2xl transition-all duration-300"
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 p-4 bg-slate-50/80 dark:bg-slate-900/80">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white shadow-sm">
            <Bot size={18} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <span>{profile.name}&apos;s AI Assistant</span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Grounded in live GitHub data & verified resume
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              title="Clear chat history"
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Trash2 size={15} />
            </button>
          )}
          <button
            onClick={() => setChatOpen(false)}
            aria-label="Close chat"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" aria-live="polite">
        {/* Welcome message / Empty state */}
        {messages.length === 0 && (
          <div className="space-y-4 pt-2">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4 text-xs text-slate-600 dark:text-slate-400 space-y-2">
              <p className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Sparkles size={14} className="text-indigo-600 dark:text-indigo-400" />
                Ask anything about {profile.name}
              </p>
              <p>
                I can explain architectures, highlight specific GitHub repos on the page, check stack compatibility, or guide you through Arvind&apos;s experience.
              </p>
            </div>

            <div>
              <p className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 mb-2">Suggested prompts:</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleSend(chip)}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 transition-all text-left cursor-pointer shadow-sm"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Message Bubble List */}
        {messages.map((m) => {
          const isUser = m.role === "user";
          return (
            <div
              key={m.id}
              className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <Bot size={15} />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? "bg-indigo-600 text-white font-medium"
                    : "bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 prose prose-sm dark:prose-invert max-w-none shadow-sm"
                }`}
              >
                {/* Text Parts */}
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(m as any).parts && (m as any).parts.length > 0 ? (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (m as any).parts.map((part: any, idx: number) => {
                    if (part.type === "text") {
                      return isUser ? (
                        <p key={idx} className="whitespace-pre-wrap text-white">
                          {part.text}
                        </p>
                      ) : (
                        <div key={idx} className="space-y-2 text-slate-900 dark:text-slate-100">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {part.text}
                          </ReactMarkdown>
                        </div>
                      );
                    }

                    // Tool Call Actions
                    if (
                      part.type?.startsWith("tool-") &&
                      part.state === "output-available" &&
                      part.output?.action !== "none"
                    ) {
                      return (
                        <div
                          key={idx}
                          className="mt-2 flex items-center gap-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 px-2.5 py-1 text-[11px] font-mono font-medium text-indigo-700 dark:text-indigo-300"
                        >
                          <span>↳</span>
                          <span>
                            {part.output.action === "navigate"
                              ? `Scrolled to #${part.output.section}`
                              : `Spotlighted ${part.output.name || part.output.tech}`}
                          </span>
                        </div>
                      );
                    }

                    return null;
                  })
                ) : (
                  // Fallback for direct string content
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (m as any).content && (
                    isUser ? (
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      <p className="whitespace-pre-wrap text-white">{(m as any).content}</p>
                    ) : (
                      <div className="space-y-2 text-slate-900 dark:text-slate-100">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{(m as any).content}</ReactMarkdown>
                      </div>
                    )
                  )
                )}
              </div>

              {isUser && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <User size={15} />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading status */}
        {isBusy && (
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pl-9">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-ping" />
            <span className="font-mono">Analyzing knowledge base...</span>
          </div>
        )}

        {/* Error notice */}
        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-500">
            {error.message || "Failed to connect to assistant. Please try again or use the contact form."}
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-200 dark:border-slate-800 p-3.5 bg-slate-50/80 dark:bg-slate-900/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputVal);
          }}
          className="flex items-end gap-2"
        >
          <textarea
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value.slice(0, 1000))}
            rows={2}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend(inputVal);
              }
            }}
            placeholder="Ask about projects, stack, or availability..."
            className="flex-1 resize-none rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none transition-colors"
          />

          {isBusy ? (
            <button
              type="button"
              onClick={stop}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500 text-white hover:opacity-90 transition-all cursor-pointer"
              title="Stop generating"
            >
              <Square size={14} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white transition-all cursor-pointer disabled:opacity-40 shadow-sm shadow-indigo-500/25"
              title="Send message"
            >
              <Send size={15} className="text-white" />
            </button>
          )}
        </form>
        <div className="mt-1.5 flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono px-1">
          <span>Press Enter to send, Shift+Enter for newline</span>
          {inputVal.length > 500 && <span>{inputVal.length}/1000</span>}
        </div>
      </div>
    </aside>
  );
}
