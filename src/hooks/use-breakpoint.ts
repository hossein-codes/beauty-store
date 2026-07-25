"use client";

import { useSyncExternalStore } from "react";

/**
 * LUMINA — Breakpoint hook
 *
 * ⚠️  PREFER CSS.
 * For layout and visibility, use the `.app-only` / `.web-only` utilities.
 * They work during SSR, cause no hydration mismatch and no flash.
 *
 * Use this hook ONLY when the difference is behavioural rather than visual:
 *   - mounting a heavy desktop-only widget (a mega-menu, a data table)
 *   - choosing how many slides a carousel should preload
 *   - deciding whether to open a bottom sheet or a centered dialog
 *
 * These values MUST match tokens/platform.css.
 */

export const BREAKPOINTS = {
  tablet: 768,
  desktop: 1024,
} as const;

/**
 * Subscribes to a media query.
 *
 * Uses `addEventListener("change")` — the older `addListener` API is deprecated
 * and removed in newer Safari.
 */
function createQueryStore(query: string) {
  let mql: MediaQueryList | null = null;

  const getMql = () => {
    mql ??= window.matchMedia(query);
    return mql;
  };

  return {
    subscribe(onChange: () => void) {
      const list = getMql();
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    getSnapshot() {
      return getMql().matches;
    },
  };
}

const stores = new Map<string, ReturnType<typeof createQueryStore>>();

function getStore(query: string) {
  let store = stores.get(query);

  if (!store) {
    store = createQueryStore(query);
    stores.set(query, store);
  }

  return store;
}

/**
 * Returns whether a media query currently matches.
 *
 * Always returns `false` during SSR and the hydration render — the server has
 * no viewport. Gate on this only for optional enhancements, never for content
 * that must be in the initial HTML (it would be invisible to crawlers).
 */
export function useMediaQuery(query: string): boolean {
  const store = getStore(query);

  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    () => false,
  );
}

/** True at ≥1024px — the web shell. */
export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.desktop}px)`);
}

/** True at ≥768px — tablet and above. */
export function useIsTabletUp(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.tablet}px)`);
}

/**
 * True when the primary pointer can hover (mouse/trackpad).
 * Use for hover-reveal affordances — on touch, `:hover` sticks after a tap.
 */
export function useCanHover(): boolean {
  return useMediaQuery("(hover: hover)");
}
