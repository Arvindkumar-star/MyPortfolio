"use client";

import React, { useState } from "react";
import { Mail, Send, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import profile from "@/content/profile.json";
import { useUI } from "@/lib/ui-bus";

export function Contact() {
  const { setChatOpen } = useUI();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [delivered, setDelivered] = useState(false);
  const [mailtoUrl, setMailtoUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "", // anti-spam
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // bot trap

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus("success");
        setDelivered(Boolean(data.delivered));
        setMailtoUrl(data.directMailto || `mailto:${profile.contact.email}`);
        setFormData({ name: "", email: "", message: "", honeypot: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 md:py-20">
      <div className="pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
          <Mail size={14} />
          <span>Get in Touch</span>
        </div>
        <h2 className="mt-1.5 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          Let&apos;s Build Something Great
        </h2>
      </div>

      <div className="mt-8 sm:mt-10 grid gap-6 sm:gap-10 lg:grid-cols-12">
        {/* Left Column: Direct Info */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            I&apos;m currently open to full-time roles (Full-Stack & AI Engineer), consulting projects, and technical collaborations. Feel free to reach out directly or send a message.
          </p>

          <div className="space-y-2.5 sm:space-y-3">
            <a
              href={`mailto:${profile.contact.email}`}
              className="rounded-xl p-3.5 sm:p-4 flex items-center gap-3.5 border border-slate-800/90 bg-[#0B0F19] hover:border-indigo-500/60 shadow-sm transition-all group"
            >
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:scale-105 transition-transform shrink-0">
                <Mail size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-slate-400">Email directly</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-100 font-mono truncate">{profile.contact.email}</p>
              </div>
            </a>

            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl p-3.5 sm:p-4 flex items-center gap-3.5 border border-slate-800/90 bg-[#0B0F19] hover:border-cyan-500/60 shadow-sm transition-all group"
            >
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-105 transition-transform shrink-0">
                <LinkedinIcon size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-slate-400">LinkedIn Profile</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-100 truncate">Arvind Kumar</p>
              </div>
            </a>

            <a
              href={profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl p-3.5 sm:p-4 flex items-center gap-3.5 border border-slate-800/90 bg-[#0B0F19] hover:border-purple-500/60 shadow-sm transition-all group"
            >
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-105 transition-transform shrink-0">
                <GithubIcon size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-slate-400">GitHub Repositories</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-100 truncate">@Arvindkumar-star</p>
              </div>
            </a>
          </div>

          <div className="p-4 rounded-xl border border-indigo-800/60 bg-indigo-950/30">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
              <Sparkles size={14} />
              <span>Instant Answers</span>
            </div>
            <p className="mt-1 text-xs text-slate-300 leading-relaxed">
              Have quick questions about Arvind&apos;s stack, availability, or past repos?
            </p>
            <button
              onClick={() => setChatOpen(true)}
              className="mt-2.5 text-xs font-semibold text-indigo-400 underline underline-offset-4 hover:opacity-80 cursor-pointer"
            >
              Ask the portfolio AI assistant →
            </button>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl p-5 sm:p-8 space-y-4 border border-slate-800/90 bg-[#0B0F19] shadow-sm"
          >
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div>
              <label htmlFor="name" className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                Your Name *
              </label>
              <input
                id="name"
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-base sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                Your Email *
              </label>
              <input
                id="email"
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-base sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                Message *
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your project, team, or opportunity..."
                className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-base sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 py-3 text-xs sm:text-sm font-semibold text-white shadow-md shadow-indigo-500/25 transition-all cursor-pointer disabled:opacity-50"
            >
              <Send size={15} className="text-white" />
              <span className="text-white">{status === "loading" ? "Sending..." : "Send Message"}</span>
            </button>

            {status === "success" && (
              <div className="space-y-3 p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs">
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>
                    {delivered
                      ? "Thank you! Your message has been sent directly to Arvind's Gmail."
                      : "Message submitted successfully!"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Want to ensure instant delivery from your own email account as well?
                </p>
                <a
                  href={mailtoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 font-semibold transition-colors cursor-pointer text-xs"
                >
                  <Mail size={13} className="text-white" />
                  <span className="text-white">Open in Gmail / Email Client</span>
                </a>
              </div>
            )}

            {status === "error" && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs">
                <AlertCircle size={15} />
                <span>Message received! You can also email directly at {profile.contact.email}.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
