import React from "react";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Timeline } from "@/components/sections/Timeline";
import { Contact } from "@/components/sections/Contact";

export const revalidate = 3600; // ISR cache revalidation every hour

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full">
        <Hero />
      </div>
      <div className="w-full bg-slate-100/50 dark:bg-slate-900/40 py-4">
        <Projects />
      </div>
      <div className="w-full">
        <Skills />
      </div>
      <div className="w-full bg-slate-100/50 dark:bg-slate-900/40 py-4">
        <Timeline />
      </div>
      <div className="w-full">
        <Contact />
      </div>
    </div>
  );
}
