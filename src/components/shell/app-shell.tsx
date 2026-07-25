"use client";

import AppHeader from "./app-header";
import TabBar from "./tab-bar";
import WebHeader from "./web-header";

/**
 * The single layout wrapper every page uses.
 *
 * Renders BOTH shells; CSS shows exactly one:
 *   < 1024px → AppHeader + TabBar   (.nav-app)
 *   ≥ 1024px → WebHeader            (.nav-web)
 *
 * Why render both instead of branching on a JS media query:
 * a JS branch can't run on the server, so the first paint would either be the
 * wrong shell or nothing at all, and hydration would mismatch. Both shells are
 * cheap markup; the browser hides one with `display: none`, which also removes
 * it from the tab order and the accessibility tree.
 *
 * `.app-content` reserves space for the fixed mobile chrome — see shells.css.
 */
export default function AppShell({
  children,
  title,
  showBack = false,
  headerAction,
  cartCount = 0,
}: {
  children: React.ReactNode;
  /** Mobile header title. Ignored on desktop. */
  title?: string;
  /** Show the mobile back chevron (product/detail pages). */
  showBack?: boolean;
  /** Optional trailing control in the mobile header. */
  headerAction?: React.ReactNode;
  cartCount?: number;
}) {
  return (
    <div className="shell">
      <AppHeader title={title} showBack={showBack} action={headerAction} />
      <WebHeader cartCount={cartCount} />

      <main id="main-content" className="app-content">
        {children}
      </main>

      <TabBar cartCount={cartCount} />
    </div>
  );
}
