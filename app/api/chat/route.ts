import {
  streamText,
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessage,
} from "ai";
import { buildSystemPrompt } from "@/lib/ai/system-prompt";
import { uiTools } from "@/lib/ai/tools";
import { getChatModel } from "@/lib/ai/model";
import { retrieveRelevantChunks } from "@/lib/rag/retrieve";
import { ratelimit } from "@/lib/ratelimit";
import { generateLocalRAGAnswer } from "@/lib/ai/local-rag-answer";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_MESSAGES = 12;
const MAX_CHARS = 1000;

export async function POST(req: Request) {
  try {
    // 1. Rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return new Response(
        JSON.stringify({
          error: "Too many messages. Please try again in a few minutes, or use the contact form.",
        }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Validate request payload
    const body = await req.json();
    const messages: UIMessage[] = body.messages || [];
    if (!messages.length) {
      return new Response(
        JSON.stringify({ error: "Message history cannot be empty." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const recent = messages.slice(-MAX_MESSAGES);
    const lastUserMessage = [...recent].reverse().find((m) => m.role === "user");
    
    let queryText = "";
    if (lastUserMessage) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const parts = (lastUserMessage as any).parts;
      if (Array.isArray(parts)) {
        queryText = parts
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter((p: any) => p.type === "text")
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((p: any) => p.text)
          .join(" ");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!queryText && typeof (lastUserMessage as any).content === "string") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        queryText = (lastUserMessage as any).content;
      }
    }

    queryText = queryText.trim();

    if (!queryText || queryText.length > MAX_CHARS) {
      return new Response(
        JSON.stringify({ error: "Message is empty or exceeds 1,000 characters." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 3. Model resolution
    const { model, provider } = getChatModel();

    if (provider === "none") {
      // Smart grounded local RAG stream when external LLM keys are unconfigured
      const localAnswer = generateLocalRAGAnswer(queryText);
      const stream = createUIMessageStream({
        execute({ writer }) {
          const textId = `txt_${Date.now()}`;
          writer.write({ type: "text-start", id: textId });

          const words = localAnswer.text.split(" ");
          for (let i = 0; i < words.length; i++) {
            const chunk = (i === 0 ? "" : " ") + words[i];
            writer.write({ type: "text-delta", id: textId, delta: chunk });
          }
          writer.write({ type: "text-end", id: textId });

          if (localAnswer.toolCall) {
            const toolCallId = `call_${Date.now()}`;
            writer.write({
              type: "tool-input-available",
              toolCallId,
              toolName: localAnswer.toolCall.name,
              input: localAnswer.toolCall.input,
            });
            writer.write({
              type: "tool-output-available",
              toolCallId,
              output: localAnswer.toolCall.output,
            });
          }
        },
      });

      return createUIMessageStreamResponse({ stream });
    }

    // 4. Retrieve relevant chunks (pgvector or local static knowledge base)
    const hits = await retrieveRelevantChunks(queryText, 6, 0.25);
    const context = hits
      .map(
        (h, i) =>
          `[${i + 1}] (${h.source_type}) ${h.title}\n${h.content}`
      )
      .join("\n\n---\n\n");

    const systemPrompt = buildSystemPrompt(context);

    // 5. Stream response with Vercel AI SDK
    const modelMessages = await convertToModelMessages(recent);
    const result = streamText({
      model,
      system: systemPrompt,
      messages: modelMessages,
      tools: uiTools,
      maxOutputTokens: 700,
      temperature: 0.3,
      onError: ({ error }) => {
        console.error("AI stream error:", error);
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (err: unknown) {
    console.error("Chat API endpoint error:", err);
    return new Response(
      JSON.stringify({
        error: "An unexpected error occurred while processing your request.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
