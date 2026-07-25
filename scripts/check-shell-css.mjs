/**
 * Shell cascade regression check.
 *
 * Guards the one rule the whole app/web split depends on:
 *   at ≥1024px the mobile chrome must be hidden, and below it the web header
 *   must be hidden. Exactly one shell is ever visible.
 *
 * This is worth automating because the failure is silent and specificity-based:
 * `.nav-app { display: none }` and `.app-tabbar { display: flex }` have equal
 * specificity, so simply reordering an @import in index.css can make BOTH
 * shells render at once. On a long desktop page a stray bottom tab bar is easy
 * to miss in review, and it ships.
 *
 * Usage:
 *   node scripts/check-shell-css.mjs           # against the dev server
 *   ORIGIN=https://staging.example.com node scripts/check-shell-css.mjs
 */

const ORIGIN = process.env.ORIGIN ?? "http://localhost:3000";
const DESKTOP_MIN = 1024;

/**
 * Tokenize the stylesheet into flat rules, tracking whether each one sits
 * inside a desktop media query.
 *
 * A hand-rolled brace walker rather than a regex: nested at-rules (@media,
 * @supports) make a single regex unreliable, which is what made the first
 * version of this script report false failures.
 */
function parseRules(css) {
  const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const rules = [];

  /** Stack of active at-rule preludes. */
  const context = [];
  let buffer = "";
  let i = 0;

  while (i < withoutComments.length) {
    const char = withoutComments[i];

    if (char === "{") {
      const prelude = buffer.trim();
      buffer = "";

      if (prelude.startsWith("@")) {
        context.push(prelude);
        i++;
        continue;
      }

      // Declaration block: capture until the matching close brace.
      let depth = 1;
      let body = "";
      i++;

      while (i < withoutComments.length && depth > 0) {
        if (withoutComments[i] === "{") depth++;
        else if (withoutComments[i] === "}") {
          depth--;
          if (depth === 0) break;
        }
        body += withoutComments[i];
        i++;
      }

      i++;

      rules.push({
        selectors: prelude.split(",").map((s) => s.trim()),
        body,
        context: [...context],
      });

      continue;
    }

    if (char === "}") {
      context.pop();
      buffer = "";
      i++;
      continue;
    }

    buffer += char;
    i++;
  }

  return rules;
}

/** True if this rule's at-rule context applies at ≥1024px. */
function isDesktopContext(context) {
  return context.some((prelude) => {
    const match = /min-width:\s*(\d+)px/.exec(prelude);
    return match && Number(match[1]) >= DESKTOP_MIN;
  });
}

/** Ignore @supports fallbacks — they don't decide layout. */
function isSupportsFallback(context) {
  return context.some((prelude) => prelude.startsWith("@supports"));
}

function lastDeclaration(body, property) {
  const re = new RegExp(`(?:^|;)\\s*${property}\\s*:\\s*([^;]+)`, "g");
  let value = null;
  let match;

  while ((match = re.exec(body))) {
    value = match[1].trim();
  }

  return value;
}

/**
 * Resolve the winning `display` for a selector at a given viewport class.
 *
 * All selectors here are single classes (specificity 0-1-0), so the cascade
 * reduces to source order: the last matching rule wins.
 */
function resolveDisplay(rules, selector, { desktop }) {
  let winner = null;

  for (const rule of rules) {
    if (!rule.selectors.includes(selector)) continue;
    if (isSupportsFallback(rule.context)) continue;

    const ruleIsDesktop = isDesktopContext(rule.context);

    // A base (non-media) rule applies at every width; a desktop rule only
    // applies when we're evaluating the desktop case.
    if (ruleIsDesktop && !desktop) continue;

    const value = lastDeclaration(rule.body, "display");
    if (value !== null) winner = value;
  }

  return winner;
}

/* ------------------------------------------------------------------ */

const html = await fetch(ORIGIN).then((r) => r.text());
const hrefs = [
  ...new Set([...html.matchAll(/\/_next\/static\/[^"']*?\.css/g)].map((m) => m[0])),
];

if (hrefs.length === 0) {
  console.error("✗ No stylesheet found — is the dev server running?");
  process.exit(1);
}

let css = "";
for (const href of hrefs) {
  css += `\n${await fetch(ORIGIN + href).then((r) => r.text())}`;
}

const rules = parseRules(css);

const checks = [
  {
    name: "mobile app header hidden on desktop",
    selector: ".app-header",
    desktop: true,
    expect: "none",
  },
  {
    name: "mobile app header visible on phones",
    selector: ".app-header",
    desktop: false,
    expect: "flex",
  },
  {
    name: "bottom tab bar hidden on desktop",
    selector: ".app-tabbar",
    desktop: true,
    expect: "none",
  },
  {
    name: "bottom tab bar visible on phones",
    selector: ".app-tabbar",
    desktop: false,
    expect: "flex",
  },
  {
    name: "web header hidden on phones",
    selector: ".web-header",
    desktop: false,
    expect: "none",
  },
  {
    name: "web header visible on desktop",
    selector: ".web-header",
    desktop: true,
    expect: "flex",
  },
];

let failed = 0;

for (const check of checks) {
  const actual = resolveDisplay(rules, check.selector, {
    desktop: check.desktop,
  });
  const ok = actual === check.expect;

  if (!ok) failed++;

  console.log(
    `${ok ? "✓" : "✗"} ${check.name}\n    ${check.selector} @ ${
      check.desktop ? "≥1024px" : "<1024px"
    } → expected "${check.expect}", got "${actual}"`,
  );
}

/* Safe areas must survive the build, or fixed chrome sits under the notch. */
if (css.includes("safe-area-inset")) {
  console.log("✓ safe-area insets present in compiled CSS");
} else {
  console.log("✗ safe-area-inset() missing — notch handling is broken");
  failed++;
}

/* The mobile content area must reserve room for both fixed bars. */
const contentRule = rules.find(
  (r) => r.selectors.includes(".app-content") && !isDesktopContext(r.context),
);

if (
  contentRule &&
  contentRule.body.includes("--app-header-total") &&
  contentRule.body.includes("--app-tabbar-total")
) {
  console.log("✓ .app-content reserves space for fixed chrome");
} else {
  console.log("✗ .app-content does not reserve space for the fixed bars");
  failed++;
}

if (failed > 0) {
  console.error(`\n${failed} shell check(s) failed.`);
  process.exit(1);
}

console.log("\nAll shell checks passed.");
