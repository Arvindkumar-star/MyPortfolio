import { embedMany, embed } from "ai";
import { openai } from "@ai-sdk/openai";

export const isOpenAIConfigured = Boolean(process.env.OPENAI_API_KEY);

const model = openai.textEmbeddingModel("text-embedding-3-small"); // 1536 dimensions

export async function embedBatch(texts: string[]): Promise<number[][]> {
  if (!process.env.OPENAI_API_KEY) {
    console.warn("OPENAI_API_KEY missing. Returning dummy zero vectors for development.");
    return texts.map(() => new Array(1536).fill(0));
  }

  const out: number[][] = [];
  for (let i = 0; i < texts.length; i += 96) {
    const slice = texts.slice(i, i + 96);
    const { embeddings } = await embedMany({
      model,
      values: slice,
    });
    out.push(...embeddings);
  }
  return out;
}

export async function embedOne(text: string): Promise<number[]> {
  if (!process.env.OPENAI_API_KEY) {
    return new Array(1536).fill(0);
  }

  const { embedding } = await embed({
    model,
    value: text,
  });
  return embedding;
}
