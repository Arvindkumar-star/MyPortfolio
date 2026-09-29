import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const isUpstashConfigured = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

// In-memory token bucket fallback for development / offline use
class MemoryRatelimit {
  private requests = new Map<string, number[]>();
  private limitCount = 20;
  private windowMs = 10 * 60 * 1000; // 10 minutes

  async limit(identifier: string): Promise<{ success: boolean; remaining: number }> {
    const now = Date.now();
    const timestamps = (this.requests.get(identifier) || []).filter(
      (ts) => now - ts < this.windowMs
    );

    if (timestamps.length >= this.limitCount) {
      return { success: false, remaining: 0 };
    }

    timestamps.push(now);
    this.requests.set(identifier, timestamps);
    return { success: true, remaining: this.limitCount - timestamps.length };
  }
}

export const ratelimit = isUpstashConfigured
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(20, "10 m"),
      prefix: "portfolio-chat",
    })
  : new MemoryRatelimit();
