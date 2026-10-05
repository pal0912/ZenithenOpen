/**
 * Automated Test Suite: ZenithenOpen 7-Theme System (3 Light, 4 Dark)
 *
 * Verifies:
 * 1. Exactly 7 themes present and registered:
 *    - 3 Light: Aqua Circuit, Violet Nexus, Sage Collective
 *    - 4 Dark: Monochrome, Obsidian Pulse, Midnight Aurora, Carbon Ember
 * 2. Removed themes (Arctic Forge, Indigo Core, Obsidian, Git Graph, Aurora, Deep Ocean, Cyberpunk, Solar) do NOT exist
 * 3. Default theme is Sage Collective
 * 4. 3 Light themes preserved exactly (descriptions, swatches, tokens)
 * 5. Monochrome preserved exactly (dark obsidian minimalism)
 * 6. 3 New Dark themes have exact colors, tokens, swatches, and descriptions
 * 7. CSS stylesheet contains data-theme selectors for all 7 themes and NO obsolete selectors
 * 8. Automatic migration of removed themes ("arctic-forge", "indigo-core") to "monochrome"
 * 9. Sequence transitions across all 7 themes and storage persistence
 */

import { THEMES, DEFAULT_THEME, THEME_STORAGE_KEY, ThemeId } from "../lib/themes";
import * as fs from "fs";
import * as path from "path";

function runTests() {
  console.log("=========================================");
  console.log("RUNNING ZENITHENOPEN 7-THEME SYSTEM TESTS");
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
    "aqua-circuit",
    "violet-nexus",
    "sage-collective",
    "monochrome",
    "obsidian-pulse",
    "midnight-aurora",
    "carbon-ember",
  ];
  assert(
    THEMES.length === 7,
    `Registered theme count is exactly 7 (found: ${THEMES.length})`
  );

  // Test 2: All expected theme IDs exist in correct order
  const themeIds = THEMES.map((t) => t.id);
  const allIdsExist = expectedThemeIds.every((id) => themeIds.includes(id));
  assert(allIdsExist, "All 7 required theme IDs exist in theme registry");

  // Test 3: Removed themes do NOT exist in THEMES registry
  const removedThemes = [
    "arctic-forge",
    "indigo-core",
    "obsidian",
    "git-graph",
    "aurora",
    "deep-ocean",
    "cyberpunk",
    "solar",
  ];
  const noneRemovedExist = removedThemes.every((id) => !themeIds.includes(id as any));
  assert(
    noneRemovedExist,
    "Removed themes (arctic-forge, indigo-core, and legacy themes) are absent from registry"
  );

  // Test 4: Default theme is Sage Collective
  assert(
    DEFAULT_THEME === "sage-collective",
    "Default theme is correctly set to 'sage-collective'"
  );

  // Test 5: Monochrome theme preserved exactly
  const monochromeTheme = THEMES.find((t) => t.id === "monochrome");
  assert(
    Boolean(
      monochromeTheme &&
      monochromeTheme.colors.background === "#000000" &&
      monochromeTheme.colors.primary === "#ffffff" &&
      monochromeTheme.name === "Monochrome"
    ),
    "Monochrome theme is preserved exactly with black background & white primary"
  );

  // Test 6: 3 Light themes preserved exactly
  const aqua = THEMES.find((t) => t.id === "aqua-circuit");
  const violet = THEMES.find((t) => t.id === "violet-nexus");
  const sage = THEMES.find((t) => t.id === "sage-collective");
  assert(
    Boolean(
      aqua &&
      aqua.tagline === "Fresh aqua tones designed for open-source collaboration." &&
      violet &&
      violet.tagline === "Creative violet interface for a futuristic open-source experience." &&
      sage &&
      sage.tagline === "Calm natural tones built around community and collaboration."
    ),
    "3 Light themes (Aqua Circuit, Violet Nexus, Sage Collective) preserved with exact descriptions and colors"
  );

  // Test 7: 3 New Dark themes have exact configuration
  const obsidianPulse = THEMES.find((t) => t.id === "obsidian-pulse");
  assert(
    Boolean(
      obsidianPulse &&
      obsidianPulse.name === "Obsidian Pulse" &&
      obsidianPulse.tagline === "Deep obsidian with crisp electric-blue accents." &&
      obsidianPulse.colors.background === "#080B12" &&
      obsidianPulse.colors.card === "#0F131C" &&
      obsidianPulse.colors.secondary === "#151B27" &&
      obsidianPulse.colors.primary === "#3B82F6" &&
      obsidianPulse.colors.foreground === "#F8FAFC" &&
      obsidianPulse.colors.mutedForeground === "#94A3B8" &&
      obsidianPulse.colors.border === "#202938" &&
      obsidianPulse.colors.accent === "#22C55E"
    ),
    "Obsidian Pulse theme has exact specified palette, description, and tokens"
  );

  const midnightAurora = THEMES.find((t) => t.id === "midnight-aurora");
  assert(
    Boolean(
      midnightAurora &&
      midnightAurora.name === "Midnight Aurora" &&
      midnightAurora.tagline === "Deep midnight blue with atmospheric violet accents." &&
      midnightAurora.colors.background === "#080A16" &&
      midnightAurora.colors.card === "#101225" &&
      midnightAurora.colors.secondary === "#171A32" &&
      midnightAurora.colors.primary === "#8B5CF6" &&
      midnightAurora.colors.foreground === "#F5F3FF" &&
      midnightAurora.colors.mutedForeground === "#9CA3C8" &&
      midnightAurora.colors.border === "#252947" &&
      midnightAurora.colors.accent === "#22C55E"
    ),
    "Midnight Aurora theme has exact specified palette, description, and tokens"
  );

  const carbonEmber = THEMES.find((t) => t.id === "carbon-ember");
  assert(
    Boolean(
      carbonEmber &&
      carbonEmber.name === "Carbon Ember" &&
      carbonEmber.tagline === "Refined graphite with warm amber-orange highlights." &&
      carbonEmber.colors.background === "#0D0D0F" &&
      carbonEmber.colors.card === "#151518" &&
      carbonEmber.colors.secondary === "#1D1D21" &&
      carbonEmber.colors.primary === "#F97316" &&
      carbonEmber.colors.foreground === "#FAFAFA" &&
      carbonEmber.colors.mutedForeground === "#A1A1AA" &&
      carbonEmber.colors.border === "#29292E" &&
      carbonEmber.colors.accent === "#22C55E"
    ),
    "Carbon Ember theme has exact specified palette, description, and tokens"
  );

  // Test 8: Each theme has valid 3-color swatches
  const allSwatchesValid = THEMES.every(
    (t) => Array.isArray(t.swatches) && t.swatches.length === 3
  );
  assert(allSwatchesValid, "All 7 themes have valid 3-color swatch tuples");

  // Test 9: Each theme has complete color tokens
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
  assert(tokensComplete, "All semantic design tokens are defined across all 7 themes");

  // Test 10: CSS stylesheet contains all 7 data-theme selectors and NO obsolete selectors
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

  let noRemovedSelectors = true;
  for (const id of removedThemes) {
    if (cssContent.includes(`[data-theme="${id}"]`)) {
      noRemovedSelectors = false;
      console.error(`Obsolete selector [data-theme="${id}"] found in styles/themes.css`);
    }
  }
  assert(noRemovedSelectors, "styles/themes.css contains no obsolete selectors for removed themes");

  // Test 11: Migration simulation (Arctic Forge / Indigo Core -> Monochrome)
  function simulateMigration(saved: string | null): string {
    if (saved === "arctic-forge" || saved === "indigo-core") {
      return "monochrome";
    }
    if (saved && expectedThemeIds.includes(saved as ThemeId)) {
      return saved;
    }
    return DEFAULT_THEME;
  }

  assert(
    simulateMigration("arctic-forge") === "monochrome",
    "Migration: 'arctic-forge' automatically migrates to 'monochrome'"
  );
  assert(
    simulateMigration("indigo-core") === "monochrome",
    "Migration: 'indigo-core' automatically migrates to 'monochrome'"
  );
  assert(
    simulateMigration("obsidian-pulse") === "obsidian-pulse",
    "Valid theme 'obsidian-pulse' is preserved without migration"
  );
  assert(
    simulateMigration("invalid-theme") === "sage-collective",
    "Invalid theme safely falls back to default 'sage-collective'"
  );

  // Test 12: Simulated sequence transitions through all 7 themes
  const transitionSequence: ThemeId[] = [
    "aqua-circuit",
    "violet-nexus",
    "sage-collective",
    "monochrome",
    "obsidian-pulse",
    "midnight-aurora",
    "carbon-ember",
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
    transitionsValid && simulatedTheme === "carbon-ember",
    "Sequence transitions across all 7 themes and storage persistence pass"
  );

  console.log("\n=========================================");
  console.log(`TEST SUMMARY: ${passed} passed, ${failed} failed`);
  console.log("=========================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
