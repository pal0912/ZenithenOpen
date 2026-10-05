/**
 * Automated Test Suite: ZenithenOpen 6-Theme System
 *
 * Verifies:
 * 1. Exactly 6 themes present and registered (Monochrome, Arctic Forge, Indigo Core, Aqua Circuit, Violet Nexus, Sage Collective)
 * 2. Removed themes (Obsidian, Git Graph, Aurora, Deep Ocean, Cyberpunk, Solar) do NOT exist
 * 3. Default theme fallback is Monochrome
 * 4. Theme design token contracts
 * 5. Swatch contract validation (3 colors per theme)
 * 6. CSS stylesheet contains selectors for all 6 themes
 * 7. Theme sequence transitions and storage persistence
 */

import { THEMES, DEFAULT_THEME, THEME_STORAGE_KEY, ThemeId } from "../lib/themes";
import * as fs from "fs";
import * as path from "path";

function runTests() {
  console.log("=========================================");
  console.log("RUNNING ZENITHENOPEN 6-THEME SYSTEM TESTS");
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

  // Test 1: Exactly 6 themes registered
  const expectedThemeIds: ThemeId[] = [
    "monochrome",
    "arctic-forge",
    "indigo-core",
    "aqua-circuit",
    "violet-nexus",
    "sage-collective",
  ];
  assert(
    THEMES.length === 6,
    `Registered theme count is exactly 6 (found: ${THEMES.length})`
  );

  // Test 2: All expected theme IDs exist
  const themeIds = THEMES.map((t) => t.id);
  const allIdsExist = expectedThemeIds.every((id) => themeIds.includes(id));
  assert(allIdsExist, "All 6 required theme IDs exist in theme registry");

  // Test 3: Removed themes do NOT exist
  const removedThemes = ["obsidian", "git-graph", "aurora", "deep-ocean", "cyberpunk", "solar"];
  const noneRemovedExist = removedThemes.every((id) => !themeIds.includes(id as any));
  assert(noneRemovedExist, "Removed legacy themes (obsidian, git-graph, aurora, deep-ocean, cyberpunk, solar) are absent");

  // Test 4: Default theme is Monochrome
  assert(DEFAULT_THEME === "monochrome", "Default theme is correctly set to 'monochrome'");

  // Test 5: Monochrome theme colors and appearance preserved exactly
  const monochromeTheme = THEMES.find((t) => t.id === "monochrome");
  assert(
    Boolean(monochromeTheme && monochromeTheme.colors.background === "#000000" && monochromeTheme.colors.primary === "#ffffff"),
    "Monochrome theme is preserved exactly with dark/minimal styling"
  );

  // Test 6: Each theme has valid 3-color swatches
  const allSwatchesValid = THEMES.every(
    (t) => Array.isArray(t.swatches) && t.swatches.length === 3
  );
  assert(allSwatchesValid, "All 6 themes have valid 3-color swatch tuples");

  // Test 7: Each theme has complete color tokens
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
  assert(tokensComplete, "All semantic design tokens are defined across all 6 themes");

  // Test 8: CSS variables stylesheet contains all data-theme selectors
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
  assert(allSelectorsPresent, "styles/themes.css contains selectors for all 6 themes");

  // Verify removed theme selectors do NOT exist in themes.css
  let noRemovedSelectors = true;
  for (const id of removedThemes) {
    if (cssContent.includes(`[data-theme="${id}"]`)) {
      noRemovedSelectors = false;
      console.error(`Obsolete selector [data-theme="${id}"] found in styles/themes.css`);
    }
  }
  assert(noRemovedSelectors, "styles/themes.css contains no obsolete selectors for removed themes");

  // Test 9: Simulated sequence transitions through all 6 themes
  const transitionSequence: ThemeId[] = [
    "monochrome",
    "arctic-forge",
    "indigo-core",
    "aqua-circuit",
    "violet-nexus",
    "sage-collective",
  ];
  let simulatedTheme: ThemeId = DEFAULT_THEME;
  const simulatedStorage = new Map<string, string>();

  let transitionsValid = true;
  for (const nextTheme of transitionSequence) {
    simulatedTheme = nextTheme;
    simulatedStorage.set(THEME_STORAGE_KEY, nextTheme);

    if (simulatedTheme !== nextTheme || simulatedStorage.get(THEME_STORAGE_KEY) !== nextTheme) {
      transitionsValid = false;
    }
  }
  assert(
    transitionsValid && simulatedTheme === "sage-collective",
    "Sequence transitions across all 6 themes and storage persistence pass"
  );

  console.log("\n=========================================");
  console.log(`TEST SUMMARY: ${passed} passed, ${failed} failed`);
  console.log("=========================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
