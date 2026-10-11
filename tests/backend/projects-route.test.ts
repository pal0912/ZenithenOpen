/**
 * Projects Catalog API Route Test Suite
 * Location: tests/backend/projects-route.test.ts
 */

import { TestSuite, SuiteResult } from "./test-utils";
import { GET, POST } from "../../app/api/projects/route";
import { NextRequest } from "next/server";

export async function runProjectsRouteTests(): Promise<SuiteResult> {
  const suite = new TestSuite("Projects Catalog API Route");
  suite.start();

  // --- 1. Query All Projects ---
  const allReq = new NextRequest("http://localhost:3000/api/projects");
  const allRes = await GET(allReq);
  suite.assertEqual(allRes.status, 200, "GET /api/projects returns 200 OK");

  const allData = await allRes.json();
  suite.assertEqual(allData.success, true, "Response reports success: true");
  suite.assert(Array.isArray(allData.projects), "projects is an array");
  suite.assert(allData.projects.length >= 2, "projects contains default registered repositories");
  suite.assert(typeof allData.count === "number", "count is a number");

  const cacheHeader = allRes.headers.get("X-Cache");
  suite.assert(
    cacheHeader === "HIT" || cacheHeader === "MISS",
    "Response includes X-Cache header (HIT or MISS)"
  );

  // --- 2. Filter By Language ---
  const tsReq = new NextRequest("http://localhost:3000/api/projects?language=TypeScript");
  const tsRes = await GET(tsReq);
  suite.assertEqual(tsRes.status, 200, "GET ?language=TypeScript returns 200 OK");
  const tsData = await tsRes.json();
  suite.assertEqual(tsData.success, true, "Language filter query succeeds");
  suite.assert(
    tsData.projects.every((p: any) => p.primaryLanguage.toLowerCase() === "typescript"),
    "All filtered projects have TypeScript as primaryLanguage"
  );

  // --- 3. Filter By Search ---
  const searchReq = new NextRequest("http://localhost:3000/api/projects?search=ZenithenOpen");
  const searchRes = await GET(searchReq);
  suite.assertEqual(searchRes.status, 200, "GET ?search=ZenithenOpen returns 200 OK");
  const searchData = await searchRes.json();
  suite.assertEqual(searchData.success, true, "Search query succeeds");
  suite.assert(searchData.projects.length > 0, "Finds ZenithenOpen project");

  // --- 4. POST Validation (Missing Fields) ---
  const invalidPost = new NextRequest("http://localhost:3000/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Incomplete Project" }),
  });
  const invalidRes = await POST(invalidPost);
  suite.assertEqual(invalidRes.status, 400, "POST missing required fields returns 400 Bad Request");
  const invalidData = await invalidRes.json();
  suite.assertEqual(invalidData.success, false, "Response reports success: false on validation error");

  // --- 5. Successful POST (Register New Project) ---
  const validPost = new NextRequest("http://localhost:3000/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "ZenithenCore",
      tagline: "Core systems utilities for student projects",
      description: "Low-level algorithms and runtime utilities",
      repositoryUrl: "https://github.com/IST-ZenithenLab/ZenithenCore",
      primaryLanguage: "Rust",
      tags: ["Rust", "Systems", "Utilities"],
      isFeatured: true,
    }),
  });
  const validRes = await POST(validPost);
  suite.assertEqual(validRes.status, 201, "POST valid project returns 201 Created");
  const validData = await validRes.json();
  suite.assertEqual(validData.success, true, "Project registration succeeds");
  suite.assertEqual(validData.project.primaryLanguage, "Rust", "Primary language recorded accurately");

  return suite.summary();
}

if (process.argv[1]?.endsWith("projects-route.test.ts")) {
  runProjectsRouteTests().then((res) => {
    if (res.failed > 0) process.exit(1);
  });
}
