import type { Metadata, Viewport } from "next";

import Providers from "@/providers/providers";
import { fontVariables } from "@/lib/fonts";
import {
  DEFAULT_LANGUAGE,
  getDirection,
  languageInitScript,
} from "@/lib/language";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "لومینا | فروشگاه آرایشی و بهداشتی",
    template: "%s | لومینا",
  },
  description:
    "لومینا، فروشگاه آنلاین محصولات آرایشی و بهداشتی اورجینال با ارسال سریع و ضمانت اصالت کالا.",
  applicationName: "LUMINA",
  formatDetection: {
    telephone: false,
  },
};

/**
 * `viewport` is its own export in the App Router — putting these keys inside
 * `metadata` (or hand-writing a <meta name="viewport">) is deprecated.
 *
 * `themeColor` is theme-aware so the mobile browser chrome matches the UI.
 * The values mirror `--surface-background` in each theme.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f8" },
    { media: "(prefers-color-scheme: dark)", color: "#121111" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={DEFAULT_LANGUAGE}
      dir={getDirection(DEFAULT_LANGUAGE)}
      className={fontVariables}
      /*
       * Both next-themes and the language script mutate <html> before React
       * hydrates. Without this, React logs a mismatch warning on every load.
       */
      suppressHydrationWarning
    >
      <head>
        {/*
         * Applies the saved language before first paint so RTL pages never
         * flash LTR. Must run in <head>, before the body renders.
         */}
        <script
          dangerouslySetInnerHTML={{ __html: languageInitScript }}
        />
      </head>
      <body>
        {/* Keyboard users land here first — styled in base/accessibility.css */}
        <a className="skip-link" href="#main-content">
          رفتن به محتوای اصلی
        </a>

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
