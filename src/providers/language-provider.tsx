"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  getDirection,
  isLanguage,
  type Language,
} from "@/lib/language";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  direction: "rtl" | "ltr";
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/* ------------------------------------------------------------------ *
 * External store
 *
 * The language preference lives in localStorage — an external system, not
 * React state. Modelling it with useState + useEffect meant "read storage,
 * then setState", which triggers a second render pass on every mount and is
 * exactly what the react-hooks/set-state-in-effect rule warns about.
 *
 * useSyncExternalStore reads the value during render instead, so there is one
 * render, no cascade, and cross-tab updates come for free through the same
 * subscription.
 * ------------------------------------------------------------------ */

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);

  /* Another tab changed the preference. */
  const onStorage = (event: StorageEvent) => {
    if (event.key === LANGUAGE_STORAGE_KEY) onChange();
  };

  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): Language {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isLanguage(stored)) return stored;
  } catch {
    /* Private mode / storage disabled. */
  }

  return DEFAULT_LANGUAGE;
}

/**
 * Server snapshot. Must be a stable value — the server has no storage, so it
 * always renders the default, and the inline script in the root layout has
 * already corrected <html> before hydration.
 */
function getServerSnapshot(): Language {
  return DEFAULT_LANGUAGE;
}

function writeLanguage(lang: Language) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch {
    /* Ignore quota / disabled storage. */
  }

  emit();
}

/* ------------------------------------------------------------------ */

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  /*
   * Mirror the language onto <html>. This is a genuine "sync React state to an
   * external system" effect, which is what effects are for.
   */
  useEffect(() => {
    const root = document.documentElement;

    root.lang = language;
    root.dir = getDirection(language);
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    writeLanguage(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    writeLanguage(getSnapshot() === "fa" ? "en" : "fa");
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    const direction = getDirection(language);

    return {
      language,
      setLanguage,
      toggleLanguage,
      direction,
      isRTL: direction === "rtl",
    };
  }, [language, setLanguage, toggleLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  }

  return context;
}
