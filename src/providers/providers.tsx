"use client";

import ThemeProvider from "./theme-provider";
import { LanguageProvider } from "./language-provider";

/**
 * Single client boundary for every app-wide context.
 *
 * Keeping this as one "use client" component means the root layout stays a
 * Server Component — only this subtree ships to the browser.
 */
export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
