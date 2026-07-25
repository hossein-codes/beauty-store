/**
 * LUMINA — Font loading
 *
 * All font files are loaded through `next/font`, which:
 *  - self-hosts the files (no external requests, no privacy leak),
 *  - injects a `size-adjust` fallback so there is no layout shift (CLS),
 *  - preloads only the subsets we actually use.
 *
 * Each loader exposes a CSS custom property that `src/styles/tokens/typography.css`
 * composes into the family stacks. The variables are attached to <html> in
 * `src/app/layout.tsx`.
 *
 * Do NOT add `@font-face` rules in CSS — they would bypass all of the above.
 */

import localFont from "next/font/local";

/**
 * IRANYekan — the Persian (RTL) typeface.
 *
 * The `.woff` files live in `src/fonts/`. They are referenced relative to this
 * file, so the folder is never served publicly and gets a hashed URL at build
 * time.
 *
 * `adjustFontFallback: false` because Next.js can only auto-generate a metric
 * fallback for Latin fonts; forcing one on a Persian face makes the fallback
 * worse, not better.
 */
export const iranYekan = localFont({
  src: [
    {
      path: "../fonts/IRANYekan-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/IRANYekan-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/IRANYekan-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-iran",
  display: "swap",
  preload: true,
  fallback: ["Tahoma", "Arial", "sans-serif"],
  adjustFontFallback: false,
});

/**
 * Latin typeface.
 *
 * We intentionally rely on the *system UI* stack rather than
 * `next/font/google`, because:
 *  1. `next/font/google` downloads the font at build time — a build in an
 *     offline/air-gapped CI environment fails hard.
 *  2. The system stack renders instantly with zero bytes over the wire.
 *
 * If you want Inter instead, add the woff2 files to `src/fonts/` and swap this
 * for another `localFont({ ..., variable: "--font-inter" })` call, then add
 * `inter.variable` to the <html> className in `src/app/layout.tsx`.
 * `--font-inter` is already wired up in `tokens/typography.css`.
 */

/** Every font variable that must be present on the <html> element. */
export const fontVariables = [iranYekan.variable].join(" ");
