"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Search, ShoppingBag } from "lucide-react";

import { NAV_ITEMS, isActiveRoute } from "@/config/navigation";
import { useLanguage } from "@/providers/language-provider";
import ThemeToggle from "@/components/theme-toggle";

/**
 * Desktop web header.
 *
 * Renders from the same NAV_ITEMS array as the mobile tab bar, so the two
 * shells can never present different destinations.
 *
 * Shown only at ≥1024px via `.nav-web`. The cart/wishlist icons are duplicated
 * from the tab bar intentionally — on desktop they belong in the header, and
 * only one shell is ever visible at a time.
 */
export default function WebHeader({
  cartCount = 0,
}: {
  cartCount?: number;
}) {
  const pathname = usePathname();
  const { isRTL } = useLanguage();

  /* The cart lives in the icon cluster on desktop, not the link list. */
  const links = NAV_ITEMS.filter(
    (item) => item.id !== "cart" && item.id !== "search",
  );

  return (
    <header className="web-header nav-web">
      <Link href="/" className="font-heading-sm font-bold">
        لومینا
      </Link>

      <nav
        className="flex items-center gap-24 flex-1"
        aria-label={isRTL ? "ناوبری اصلی" : "Main navigation"}
      >
        {links.map((item) => {
          const active = isActiveRoute(pathname, item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              className="nav-link"
              aria-current={active ? "page" : undefined}
            >
              {isRTL ? item.label : item.labelEn}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-8">
        <Link
          href="/search"
          className="hit-area"
          aria-label={isRTL ? "جستجو" : "Search"}
        >
          <Search width={20} height={20} aria-hidden="true" />
        </Link>

        <Link
          href="/wishlist"
          className="hit-area"
          aria-label={isRTL ? "علاقه‌مندی‌ها" : "Wishlist"}
        >
          <Heart width={20} height={20} aria-hidden="true" />
        </Link>

        <Link
          href="/cart"
          className="hit-area app-tab-icon"
          aria-label={
            isRTL
              ? `سبد خرید، ${cartCount} کالا`
              : `Cart, ${cartCount} items`
          }
        >
          <ShoppingBag width={20} height={20} aria-hidden="true" />
          {cartCount > 0 ? (
            <span className="app-tab-badge" aria-hidden="true">
              {cartCount}
            </span>
          ) : null}
        </Link>

        <ThemeToggle />
      </div>
    </header>
  );
}
