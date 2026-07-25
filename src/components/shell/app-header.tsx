"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useLanguage } from "@/providers/language-provider";

/**
 * Mobile app header.
 *
 * Deliberately minimal, like a native navigation bar: an optional back button,
 * a centered title, and up to one trailing action.
 *
 * The back chevron must point toward the *start* edge, which flips in RTL —
 * in Persian, "back" points right. Using a fixed ChevronLeft here would be a
 * classic RTL bug, so the icon is chosen from the direction.
 */
export default function AppHeader({
  title,
  showBack = false,
  action,
}: {
  title?: string;
  showBack?: boolean;
  action?: React.ReactNode;
}) {
  const router = useRouter();
  const { isRTL } = useLanguage();

  const BackIcon = isRTL ? ChevronRight : ChevronLeft;

  return (
    <header className="app-header nav-app">
      {showBack ? (
        <button
          type="button"
          onClick={() => router.back()}
          className="hit-area tappable"
          aria-label={isRTL ? "بازگشت" : "Go back"}
        >
          <BackIcon width={24} height={24} aria-hidden="true" />
        </button>
      ) : (
        /* Spacer keeps the title optically centered when there's no back
           button, matching native navigation bar behaviour. */
        <span style={{ width: 24 }} aria-hidden="true" />
      )}

      <h1 className="app-header-title">{title ?? "لومینا"}</h1>

      {action ?? <span style={{ width: 24 }} aria-hidden="true" />}
    </header>
  );
}
