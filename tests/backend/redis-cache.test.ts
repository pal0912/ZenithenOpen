/**
 * Upstash Redis & Resilient In-Memory Fallback Test Suite
 * Location: tests/backend/redis-cache.test.ts
 */

import { TestSuite, SuiteResult } from "./test-utils";
import {
  isRedisConfigured,
  pingRedis,
  setCached,
  getCached,
  deleteCached,
  clearMemoryCache,
} from "../../lib/redis/client";

export async function runRedisCacheTests(): Promise<SuiteResult> {
  const suite = new TestSuite("Redis Cache Service & Resilient In-Memory Fallback");
  suite.start();

  // --- 1. Configuration Check ---
  const configured = isRedisConfigured();
  suite.assert(
    typeof configured === "boolean",
    "isRedisConfigured returns a boolean status"
  );

  // --- 2. In-Memory Fallback Strings ---
  clearMemoryCache();
  await setCached("test:key:string", "hello-zenithen", 60);
  const stringVal = await getCached<string>("test:key:string");
  suite.assertEqual(
    stringVal,
    "hello-zenithen",
    "In-memory fallback stores and retrieves primitive string data"
  );

  // --- 3. In-Memory Fallback JSON Objects ---
  clearMemoryCache();
  const payload = {
    leaderboard: "week",
    rank: 1,
    student: { name: "Aditya", usn: "1ST22CS001" },
    points: 340,
  };
  await setCached("test:key:json", payload, 60);
  const jsonVal = await getCached<typeof payload>("test:key:json");
  suite.assert(
    jsonVal !== null && jsonVal?.rank === 1 && jsonVal?.student?.usn === "1ST22CS001",
    "In-memory fallback stores and retrieves complex structured JSON objects"
  );

  // --- 4. Cache Deletion ---
  await setCached("test:key:todelete", "temporary-val");
  const beforeDel = await getCached<string>("test:key:todelete");
  suite.assertEqual(beforeDel, "temporary-val", "Key is set before deletion");

  await deleteCached("test:key:todelete");
  const afterDel = await getCached<string>("test:key:todelete");
  suite.assertEqual(afterDel, null, "deleteCached successfully invalidates cache key");

  // --- 5. Non-existent Key Lookup ---
  const nonExistent = await getCached<string>("non_existent_zenithen_key_99999");
  suite.assertEqual(
    nonExistent,
    null,
    "getCached returns null for non-existent keys"
  );

  // --- 6. TTL Expiration ---
  clearMemoryCache();
  await setCached("test:expired", "expired-val", -1);
  const expiredVal = await getCached<string>("test:expired");
  suite.assertEqual(
    expiredVal,
    null,
    "Expired keys with past TTL return null"
  );

  // --- 7. Live Upstash Redis Ping ---
  const pingResult = await pingRedis();
  suite.assert(
    typeof pingResult === "boolean",
    `pingRedis executes safely (Live Upstash PONG: ${pingResult})`
  );

  return suite.summary();
}

if (process.argv[1]?.endsWith("redis-cache.test.ts")) {
  runRedisCacheTests().then((res) => {
    if (res.failed > 0) process.exit(1);
  });
}
