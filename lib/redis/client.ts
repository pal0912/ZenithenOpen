import { Redis } from "@upstash/redis";

/**
 * Upstash Redis Client Singleton for ZenithenOpen Platform
 * 
 * Provides high-speed in-memory caching for:
 * - Student Leaderboard rankings (Week / Month / Overall)
 * - Community metrics aggregate snapshots
 * - GitHub webhook / PR sync cache
 * - Rate limiting on USN authentication & login APIs
 * 
 * Includes graceful memory-fallback when Redis credentials are not configured
 * or when offline/testing.
 */

// In-memory fallback map for test/offline environments
const memoryFallback = new Map<string, { value: any; expiresAt?: number }>();

function getFromMemory<T>(key: string): T | null {
  const item = memoryFallback.get(key);
  if (!item) return null;
  if (item.expiresAt !== undefined && Date.now() >= item.expiresAt) {
    memoryFallback.delete(key);
    return null;
  }
  return item.value as T;
}

function setToMemory(key: string, value: any, ttlSeconds?: number): void {
  if (ttlSeconds !== undefined && ttlSeconds <= 0) {
    memoryFallback.delete(key);
    return;
  }
  const expiresAt = ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined;
  memoryFallback.set(key, { value, expiresAt });
}

function deleteFromMemory(key: string): void {
  memoryFallback.delete(key);
}

// Global singleton to prevent recreating clients across Next.js hot reloads
const globalForRedis = globalThis as unknown as {
  upstashRedis: Redis | null | undefined;
};

/**
 * Lazily initialize and return the Upstash Redis client
 */
export function getRedisClient(): Redis | null {
  if (globalForRedis.upstashRedis !== undefined) {
    return globalForRedis.upstashRedis;
  }

  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (url && token && url.startsWith("http")) {
    const client = new Redis({ url, token });
    if (process.env.NODE_ENV !== "production") {
      globalForRedis.upstashRedis = client;
    }
    return client;
  }

  return null;
}

/**
 * Check if Upstash Redis credentials are live and configured
 */
export function isRedisConfigured(): boolean {
  return getRedisClient() !== null;
}

/**
 * Safe ping to verify active connection
 */
export async function pingRedis(): Promise<boolean> {
  const client = getRedisClient();
  if (!client) return false;
  try {
    const res = await client.ping();
    return res === "PONG";
  } catch (error) {
    console.warn("[Redis] Ping failed, falling back to memory:", error);
    return false;
  }
}

/**
 * Cache abstraction helper: Get typed data
 */
export async function getCached<T>(key: string): Promise<T | null> {
  const client = getRedisClient();
  if (!client) {
    return getFromMemory<T>(key);
  }

  try {
    const data = await client.get<T>(key);
    return data ?? null;
  } catch (error) {
    console.warn(`[Redis] Error getting key "${key}", falling back to memory:`, error);
    return getFromMemory<T>(key);
  }
}

/**
 * Cache abstraction helper: Set typed data with optional TTL (in seconds)
 */
export async function setCached<T>(
  key: string,
  value: T,
  ttlSeconds?: number
): Promise<boolean> {
  setToMemory(key, value, ttlSeconds);

  const client = getRedisClient();
  if (!client) return true;

  try {
    if (ttlSeconds !== undefined) {
      if (ttlSeconds <= 0) {
        await client.del(key);
      } else {
        await client.set(key, value, { ex: ttlSeconds });
      }
    } else {
      await client.set(key, value);
    }
    return true;
  } catch (error) {
    console.warn(`[Redis] Error setting key "${key}":`, error);
    return false;
  }
}

/**
 * Cache abstraction helper: Invalidate cache key
 */
export async function deleteCached(key: string): Promise<boolean> {
  deleteFromMemory(key);

  const client = getRedisClient();
  if (!client) return true;

  try {
    await client.del(key);
    return true;
  } catch (error) {
    console.warn(`[Redis] Error deleting key "${key}":`, error);
    return false;
  }
}

/**
 * Clear in-memory cache (primarily for unit tests)
 */
export function clearMemoryCache(): void {
  memoryFallback.clear();
}
