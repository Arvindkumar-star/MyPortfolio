import React from "react";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Timeline } from "@/components/sections/Timeline";
import { Contact } from "@/components/sections/Contact";

export const revalidate = 3600; // ISR cache revalidation every hour

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[#090D16]">
      <Hero />
      <Projects />
      <Skills />
      <Timeline />
      <Contact />
    </div>
  );
}
