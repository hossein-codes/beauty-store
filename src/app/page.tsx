import AppShell from "@/components/shell/app-shell";
import ProductRail from "@/components/commerce/product-rail";
import { PRODUCTS } from "@/config/demo-products";

/**
 * Home page — demonstrates the app/web split.
 *
 * On mobile this reads as a native app screen: fixed header, horizontally
 * snapping product rails, bottom tab bar.
 * On desktop the same data becomes a centered multi-column grid.
 */
export default function Home() {
  return (
    <AppShell cartCount={3}>
      <div className="shell-container stack-24 section-sm">
        {/* Hero — full-bleed on mobile, contained on desktop */}
        <section className="stack-8">
          <h1>لومینا</h1>
          <p>زیبایی اصیل، انتخابی هوشمند</p>
        </section>

        {/*
         * Product rail: a horizontally snapping carousel on mobile (native
         * feel), a wrapping grid on desktop. Same component, same data.
         */}
        <ProductRail title="پیشنهاد ویژه" products={PRODUCTS} />

        <ProductRail title="پرفروش‌ترین‌ها" products={[...PRODUCTS].reverse()} />

        {/* Platform indicator — makes the active shell obvious while testing */}
        <section className="stack-8">
          <h2>حالت نمایش</h2>
          <p className="app-only">
            اکنون در <strong>حالت اپلیکیشن</strong> هستید: هدر ثابت، نوار پایین،
            و اسکرول افقی محصولات.
          </p>
          <p className="web-only">
            اکنون در <strong>حالت وب دسکتاپ</strong> هستید: هدر بالا، گرید
            چندستونه، و حالت‌های hover.
          </p>
        </section>
      </div>
    </AppShell>
  );
}
