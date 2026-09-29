import crypto from "node:crypto";
import { revalidateTag } from "next/cache";
import { syncAll } from "@/lib/rag/sync";

export const maxDuration = 300;

export async function POST(req: Request) {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;

  const body = await req.text();
  if (secret) {
    const signature = req.headers.get("x-hub-signature-256") || "";
    const expected =
      "sha256=" +
      crypto.createHmac("sha256", secret).update(body).digest("hex");

    const isValid =
      signature.length === expected.length &&
      crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));

    if (!isValid) {
      return new Response(JSON.stringify({ error: "Invalid webhook signature" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // Asynchronously trigger ingestion and revalidation
  try {
    syncAll("webhook").catch((err) =>
      console.error("Async webhook sync error:", err)
    );
    // Invalidate project cache tag
    try {
      revalidateTag("projects", "default");
    } catch {
      // ignore in environments where revalidateTag signature differs
    }
  } catch (err) {
    console.error("Webhook processing error:", err);
  }

  return new Response(JSON.stringify({ status: "accepted" }), {
    status: 202,
    headers: { "Content-Type": "application/json" },
  });
}
