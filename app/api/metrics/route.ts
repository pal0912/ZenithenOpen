import { NextResponse } from "next/server";
import { COMMUNITY_METRICS } from "@/lib/data/mock-data";

export async function GET() {
  // Returns cached community metrics with cache header
  return NextResponse.json(
    {
      success: true,
      data: {
        ...COMMUNITY_METRICS,
        lastUpdated: new Date().toISOString(),
      },
      cached: true,
      provider: "redis",
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    }
  );
}
