"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

/**
 * Theme provider.
 *
 * `attribute="class"` matches the `html.dark` selector used by
 * `src/styles/themes/dark.css`.
 *
 * `disableTransitionOnChange` prevents every themed element from cross-fading
 * when the user flips the switch — without it, the `--theme-transition` in
 * theme.css makes the whole page smear for 250ms.
 *
 * Props are spread FIRST so callers can override any default; previously they
 * were spread last, which made the defaults unoverridable.
 */
export default function ThemeProvider({
  children,
  ...props
}: Omit<ThemeProviderProps, "children"> & { children: React.ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme
      disableTransitionOnChange
      storageKey="lumina-theme"
      {...props}
    >
      {children}
    </NextThemeProvider>
  );
}
