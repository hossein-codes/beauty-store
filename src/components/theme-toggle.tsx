"use client";

import { useTheme } from "next-themes";

import { useLanguage } from "@/providers/language-provider";
import { useMounted } from "@/hooks/use-mounted";

/**
 * Theme + language switcher.
 *
 * `mounted` guard: `resolvedTheme` is undefined during SSR, so rendering the
 * label directly would produce a hydration mismatch. We render a stable
 * placeholder until after mount.
 */
export default function ThemeToggle() {
  const mounted = useMounted();
  const { resolvedTheme, setTheme } = useTheme();
  const { language, toggleLanguage, isRTL } = useLanguage();

  const isDark = resolvedTheme === "dark";

  const t = {
    theme: isRTL ? "تم" : "Theme",
    light: isRTL ? "روشن" : "Light",
    dark: isRTL ? "تیره" : "Dark",
    lang: isRTL ? "زبان" : "Language",
  };

  return (
    <div className="flex items-center gap-8">
      <button
        type="button"
        className="px-16 py-8 rounded-button border font-medium"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label={t.theme}
      >
        {/* Fixed-width placeholder avoids layout shift before mount. */}
        {mounted ? (isDark ? `☀ ${t.light}` : `☾ ${t.dark}`) : t.theme}
      </button>

      <button
        type="button"
        className="px-16 py-8 rounded-button border font-medium"
        onClick={toggleLanguage}
        aria-label={t.lang}
      >
        {language === "fa" ? "EN" : "فا"}
      </button>
    </div>
  );
}
