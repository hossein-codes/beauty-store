"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { TAB_BAR_ITEMS, isActiveRoute } from "@/config/navigation";
import { useLanguage } from "@/providers/language-provider";

/**
 * Mobile bottom tab bar — the primary navigation on phones and tablets.
 *
 * Hidden at ≥1024px via the `.nav-app` utility (CSS, not JS) so the server can
 * render both shells without a hydration mismatch.
 *
 * A11y notes:
 *  - `<nav aria-label>` distinguishes it from the desktop nav for screen
 *    reader landmark navigation.
 *  - `aria-current="page"` (not just a color change) is what actually conveys
 *    the active tab to assistive tech.
 *  - The badge count is announced via a visually-hidden suffix, because a bare
 *    "3" next to a cart icon is meaningless out of context.
 */
export default function TabBar({
  cartCount = 0,
}: {
  cartCount?: number;
}) {
  const pathname = usePathname();
  const { isRTL } = useLanguage();

  return (
    <nav
      className="app-tabbar nav-app"
      aria-label={isRTL ? "ناوبری اصلی" : "Main navigation"}
    >
      {TAB_BAR_ITEMS.map((item) => {
        const active = isActiveRoute(pathname, item.href);
        const Icon = item.icon;
        const label = isRTL ? item.label : item.labelEn;
        const count = item.badgeKey === "cart" ? cartCount : 0;

        return (
          <Link
            key={item.id}
            href={item.href}
            className="app-tab tappable"
            aria-current={active ? "page" : undefined}
          >
            <span className="app-tab-icon">
              <Icon
                width={22}
                height={22}
                strokeWidth={active ? 2.2 : 1.8}
                aria-hidden="true"
              />

              {count > 0 ? (
                <span className="app-tab-badge" aria-hidden="true">
                  {count > 99 ? "۹۹+" : count}
                </span>
              ) : null}
            </span>

            <span>{label}</span>

            {count > 0 ? (
              <span className="sr-only">
                {isRTL ? `${count} کالا در سبد` : `${count} items in cart`}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
