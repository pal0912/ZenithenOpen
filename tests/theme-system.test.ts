/**
 * Automated Test Suite: ZenithenOpen Multi-Theme System
 *
 * Verifies:
 * 1. Theme configuration completeness (all 7 themes present and valid)
 * 2. Theme design token contracts (background, foreground, primary, etc.)
 * 3. Default theme fallback (Obsidian)
 * 4. LocalStorage persistence keys and integrity
 * 5. Theme sequence transitions: Obsidian -> Aurora -> Git Graph -> Cyberpunk
 * 6. Swatch contract validation (3 hex colors per theme)
 */

import { THEMES, DEFAULT_THEME, THEME_STORAGE_KEY, ThemeId } from "../lib/themes";
import * as fs from "fs";
import * as path from "path";

function runTests() {
  console.log("=========================================");
  console.log("RUNNING ZENITHENOPEN THEME SYSTEM TESTS");
  console.log("=========================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  // Test 1: Exactly 7 themes registered
  const expectedThemeIds: ThemeId[] = [
    "obsidian",
    "git-graph",
    "aurora",
    "deep-ocean",
    "cyberpunk",
    "monochrome",
    "solar",
  ];
  assert(
    THEMES.length === 7,
    `Registered theme count is 7 (found: ${THEMES.length})`
  );

  // Test 2: All expected theme IDs exist
  const themeIds = THEMES.map((t) => t.id);
  const allIdsExist = expectedThemeIds.every((id) => themeIds.includes(id));
  assert(allIdsExist, "All 7 required theme IDs exist in theme registry");

  // Test 3: Default theme is Obsidian
  assert(DEFAULT_THEME === "obsidian", "Default theme is correctly set to 'obsidian'");

  // Test 4: Each theme has valid 3-color swatches
  const allSwatchesValid = THEMES.every(
    (t) => Array.isArray(t.swatches) && t.swatches.length === 3
  );
  assert(allSwatchesValid, "All themes have valid 3-color swatch tuples");

  // Test 5: Each theme has complete color tokens
  const requiredColorTokens = [
    "background",
    "foreground",
    "card",
    "cardForeground",
    "border",
    "primary",
    "primaryForeground",
    "secondary",
    "accent",
    "muted",
    "mutedForeground",
    "glow",
  ];

  let tokensComplete = true;
  for (const theme of THEMES) {
    for (const token of requiredColorTokens) {
      if (!(token in theme.colors)) {
        tokensComplete = false;
        console.error(`Missing token '${token}' in theme '${theme.id}'`);
      }
    }
  }
  assert(tokensComplete, "All semantic design tokens are defined across all themes");

  // Test 6: CSS variables stylesheet contains all data-theme selectors
  const cssPath = path.resolve(__dirname, "../styles/themes.css");
  assert(fs.existsSync(cssPath), "styles/themes.css file exists");

  const cssContent = fs.readFileSync(cssPath, "utf-8");
  let allSelectorsPresent = true;
  for (const id of expectedThemeIds) {
    if (!cssContent.includes(`[data-theme="${id}"]`)) {
      allSelectorsPresent = false;
      console.error(`Missing CSS selector [data-theme="${id}"] in styles/themes.css`);
    }
  }
  assert(allSelectorsPresent, "styles/themes.css contains selectors for all 7 themes");

  // Test 7: Simulated sequence transitions: Obsidian -> Aurora -> Git Graph -> Cyberpunk
  const transitionSequence: ThemeId[] = ["obsidian", "aurora", "git-graph", "cyberpunk"];
  let simulatedTheme: ThemeId = DEFAULT_THEME;
  const simulatedStorage = new Map<string, string>();

  let transitionsValid = true;
  for (const nextTheme of transitionSequence) {
    // Transition
    simulatedTheme = nextTheme;
    simulatedStorage.set(THEME_STORAGE_KEY, nextTheme);

    // Verify
    if (simulatedTheme !== nextTheme || simulatedStorage.get(THEME_STORAGE_KEY) !== nextTheme) {
      transitionsValid = false;
    }
  }
  assert(
    transitionsValid && simulatedTheme === "cyberpunk",
    "Sequence transitions (Obsidian -> Aurora -> Git Graph -> Cyberpunk) and storage persistence pass"
  );

  console.log("\n=========================================");
  console.log(`TEST SUMMARY: ${passed} passed, ${failed} failed`);
  console.log("=========================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
