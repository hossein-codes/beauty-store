import type { ComponentType, SVGProps } from "react";
import {
  /* lucide-react v1 renamed `Home` → `House`. */
  House,
  LayoutGrid,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";

/**
 * LUMINA — Navigation configuration
 *
 * SINGLE SOURCE OF TRUTH for both shells.
 *
 * The mobile tab bar and the desktop header render from this same array. That
 * is deliberate: if they were defined separately, the two platforms would
 * inevitably drift (a link added to the web nav but forgotten in the app is
 * the classic bug), and the native app would end up with different navigation
 * from the mobile web app — exactly what we're trying to avoid.
 *
 * `showInTabBar` controls what appears in the 5-slot mobile tab bar. Anything
 * beyond 5 tabs is unusable with a thumb, so extra destinations live in the
 * desktop header and the mobile "account" page instead.
 */

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface NavItem {
  /** Stable key — also used as the tab's test id. */
  id: string;
  href: string;
  /** Persian label (primary locale). */
  label: string;
  /** English label, used when the language toggle is set to `en`. */
  labelEn: string;
  icon: IconComponent;
  /** Appears in the mobile bottom tab bar. Max 5. */
  showInTabBar: boolean;
  /** Renders a count bubble, e.g. the cart. */
  badgeKey?: "cart" | "wishlist";
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    href: "/",
    label: "خانه",
    labelEn: "Home",
    icon: House,
    showInTabBar: true,
  },
  {
    id: "categories",
    href: "/categories",
    label: "دسته‌بندی",
    labelEn: "Categories",
    icon: LayoutGrid,
    showInTabBar: true,
  },
  {
    id: "search",
    href: "/search",
    label: "جستجو",
    labelEn: "Search",
    icon: Search,
    showInTabBar: true,
  },
  {
    id: "cart",
    href: "/cart",
    label: "سبد خرید",
    labelEn: "Cart",
    icon: ShoppingBag,
    showInTabBar: true,
    badgeKey: "cart",
  },
  {
    id: "account",
    href: "/account",
    label: "حساب من",
    labelEn: "Account",
    icon: User,
    showInTabBar: true,
  },
];

/** The ≤5 destinations shown in the mobile tab bar. */
export const TAB_BAR_ITEMS = NAV_ITEMS.filter((item) => item.showInTabBar);

/**
 * Active-route matching.
 *
 * "/" must match exactly, otherwise it would light up on every page, since
 * every path starts with "/". Everything else matches its own subtree so
 * `/categories/skincare` still highlights the Categories tab.
 */
export function isActiveRoute(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
