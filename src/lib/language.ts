/**
 * LUMINA — Language configuration
 *
 * Shared between the server (root layout), the pre-hydration inline script and
 * the client provider, so all three agree on the same defaults and storage key.
 */

export const LANGUAGES = ["fa", "en"] as const;

export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = "fa";

/** localStorage key. Kept in one place so the inline script can't drift. */
export const LANGUAGE_STORAGE_KEY = "lumina-language";

export const LANGUAGE_DIRECTION: Record<Language, "rtl" | "ltr"> = {
  fa: "rtl",
  en: "ltr",
};

export function isLanguage(value: unknown): value is Language {
  return (
    typeof value === "string" && LANGUAGES.includes(value as Language)
  );
}

export function getDirection(language: Language): "rtl" | "ltr" {
  return LANGUAGE_DIRECTION[language];
}

/**
 * Runs before first paint, inlined into <head>.
 *
 * Why this is necessary: `lang` and `dir` were previously applied in a
 * `useEffect`, i.e. AFTER hydration. That produced two visible bugs:
 *   1. The whole page rendered LTR for a frame and then snapped to RTL.
 *   2. React warned about a server/client attribute mismatch on <html>.
 *
 * Setting the attributes synchronously here means the very first paint is
 * already correct. Mirrors exactly what next-themes does for the theme class.
 */
export const languageInitScript = `
(function() {
  try {
    var stored = localStorage.getItem(${JSON.stringify(LANGUAGE_STORAGE_KEY)});
    var langs = ${JSON.stringify(LANGUAGES)};
    var lang = langs.indexOf(stored) !== -1 ? stored : ${JSON.stringify(DEFAULT_LANGUAGE)};
    var el = document.documentElement;
    el.lang = lang;
    el.dir = lang === 'fa' ? 'rtl' : 'ltr';
  } catch (e) {}
})();
`;
