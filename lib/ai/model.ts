import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import type { LanguageModel } from "ai";

export function getChatModel(): { model: LanguageModel; provider: "anthropic" | "openai" | "none" } {
  if (process.env.ANTHROPIC_API_KEY) {
    return {
      model: anthropic("claude-3-5-sonnet-20241022"),
      provider: "anthropic",
    };
  }

  if (process.env.OPENAI_API_KEY) {
    return {
      model: openai("gpt-4o-mini"),
      provider: "openai",
    };
  }

  // Default fallback to openai model instance (will fail gracefully if called without key)
  return {
    model: openai("gpt-4o-mini"),
    provider: "none",
  };
}
