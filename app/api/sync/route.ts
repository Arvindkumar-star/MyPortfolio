import { syncAll } from "@/lib/rag/sync";

export const maxDuration = 300;

function isAuthorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true; // allow in local dev if CRON_SECRET is not set
  const header = req.headers.get("authorization");
  return header === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  // Vercel Cron sends GET requests
  if (!isAuthorized(req)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const result = await syncAll("cron");
    return Response.json(result);
  } catch (e: unknown) {
    return Response.json({ error: String((e as Error)?.message || e) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  // Manual trigger endpoint
  if (!isAuthorized(req)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const result = await syncAll("manual");
    return Response.json(result);
  } catch (e: unknown) {
    return Response.json({ error: String((e as Error)?.message || e) }, { status: 500 });
  }
}
