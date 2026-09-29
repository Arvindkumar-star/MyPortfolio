import { tool } from "ai";
import { z } from "zod";
import { getDatabase, isMongoConfigured } from "../db/mongodb";

const SECTIONS = ["hero", "projects", "skills", "experience", "contact"] as const;

export const uiTools = {
  navigateToSection: tool({
    description: "Scroll the portfolio page smoothly to a specific section.",
    inputSchema: z.object({
      section: z.enum(SECTIONS).describe("The target section to navigate to"),
    }),
    execute: async ({ section }) => ({
      action: "navigate" as const,
      section,
    }),
  }),

  highlightProject: tool({
    description: "Scroll to and spotlight a project card by its repository or project name.",
    inputSchema: z.object({
      name: z.string().max(100).describe("The exact name of the project to spotlight"),
    }),
    execute: async ({ name }) => {
      if (isMongoConfigured) {
        try {
          const db = await getDatabase();
          if (db) {
            const found = await db
              .collection("repos")
              .findOne({ name: { $regex: new RegExp(`^${name}$`, "i") } });

            if (found) {
              return { action: "highlightProject" as const, name: found.name };
            }
          }
        } catch (e) {
          console.warn("Project lookup failed in MongoDB:", e);
        }
      }
      return { action: "highlightProject" as const, name };
    },
  }),

  highlightTech: tool({
    description: "Highlight a technology badge across projects and skills (e.g. Next.js, TypeScript, MongoDB).",
    inputSchema: z.object({
      tech: z.string().max(50).describe("The name of the technology or stack badge to highlight"),
    }),
    execute: async ({ tech }) => ({
      action: "highlightTech" as const,
      tech,
    }),
  }),
};
