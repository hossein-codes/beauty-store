"use client";

import { useSyncExternalStore } from "react";

/** No-op subscribe: "mounted" never changes after the first client render. */
const subscribe = () => () => {};

/**
 * Returns `false` during SSR and the hydration render, `true` afterwards.
 *
 * Use it to gate anything that can only be known in the browser (resolved
 * theme, media queries, locale formatting) so the server and client markup
 * match and React doesn't throw a hydration mismatch.
 *
 * Implemented with `useSyncExternalStore` rather than the usual
 * `useState(false)` + `useEffect(() => setMounted(true))` because that pattern
 * schedules an extra render pass on every mount — the exact cascade the
 * `react-hooks/set-state-in-effect` rule flags.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
