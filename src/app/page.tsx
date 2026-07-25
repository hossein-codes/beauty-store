import ThemeToggle from "@/components/theme-toggle";

/**
 * Design-system smoke page.
 *
 * Exercises the tokens, base elements, utilities and commerce patterns so that
 * a regression in the CSS layer is visible immediately rather than surfacing
 * later inside a real feature.
 */

const products = [
  {
    id: 1,
    name: "سرم ویتامین C روشن‌کننده",
    price: "۱٬۲۸۰٬۰۰۰",
    oldPrice: "۱٬۶۰۰٬۰۰۰",
    badge: "٪۲۰ تخفیف",
    badgeClass: "badge-discount",
    stock: "موجود",
    stockClass: "stock-available",
    rating: "۴٫۸",
  },
  {
    id: 2,
    name: "کرم مرطوب‌کننده هیالورونیک",
    price: "۸۹۰٬۰۰۰",
    oldPrice: null,
    badge: "جدید",
    badgeClass: "badge-new",
    stock: "تنها ۳ عدد",
    stockClass: "stock-low",
    rating: "۴٫۶",
  },
  {
    id: 3,
    name: "پالت سایه چشم نود",
    price: "۲٬۱۵۰٬۰۰۰",
    oldPrice: null,
    badge: "پرفروش",
    badgeClass: "badge-best",
    stock: "ناموجود",
    stockClass: "stock-out",
    rating: "۴٫۹",
  },
  {
    id: 4,
    name: "ماسک صورت زغال فعال",
    price: "۴۵۰٬۰۰۰",
    oldPrice: "۵۹۰٬۰۰۰",
    badge: "٪۲۴ تخفیف",
    badgeClass: "badge-discount",
    stock: "موجود",
    stockClass: "stock-available",
    rating: "۴٫۳",
  },
];

export default function Home() {
  return (
    <main id="main-content" className="page">
      <div className="container stack-24">
        <header className="flex items-center justify-between flex-wrap gap-16">
          <div>
            <h1>لومینا</h1>
            <p>سیستم طراحی فروشگاه آرایشی و بهداشتی</p>
          </div>

          <ThemeToggle />
        </header>

        {/* ---------- Typography ---------- */}
        <section
          className="section-sm stack-16"
          aria-labelledby="typography-heading"
        >
          <h2 id="typography-heading">تایپوگرافی</h2>

          <h3>عنوان سطح سه</h3>
          <h4>عنوان سطح چهار</h4>

          <p>
            متن بدنه با فونت ایران‌یکان. این پاراگراف برای بررسی ارتفاع خط،
            فاصله حروف و خوانایی متن فارسی در حالت راست‌به‌چپ نوشته شده است.
          </p>

          <p className="text-muted font-body-sm">
            متن ثانویه و کم‌رنگ‌تر برای توضیحات تکمیلی.
          </p>

          <p className="font-caption text-muted" dir="ltr">
            Latin fallback text — 1234567890 — checks the LTR stack.
          </p>
        </section>

        {/* ---------- Buttons & forms ---------- */}
        <section
          className="section-sm stack-16"
          aria-labelledby="controls-heading"
        >
          <h2 id="controls-heading">دکمه‌ها و فرم‌ها</h2>

          <div className="flex items-center gap-12 flex-wrap">
            <button type="button" className="px-24 py-12 rounded-button border">
              دکمه پیش‌فرض
            </button>

            <button type="button" className="px-24 py-12 rounded-button border" disabled>
              غیرفعال
            </button>
          </div>

          <div className="stack-8" style={{ maxWidth: "24rem" }}>
            <label htmlFor="email">ایمیل</label>
            <input id="email" type="email" placeholder="you@example.com" />
          </div>

          <div className="stack-8" style={{ maxWidth: "24rem" }}>
            <label htmlFor="note">یادداشت</label>
            <textarea id="note" placeholder="متن خود را بنویسید…" />
          </div>

          <div className="flex items-center gap-8">
            <input id="agree" type="checkbox" />
            <label htmlFor="agree">قوانین را می‌پذیرم</label>
          </div>
        </section>

        {/* ---------- Product grid ---------- */}
        <section
          className="section-sm stack-16"
          aria-labelledby="products-heading"
        >
          <h2 id="products-heading">محصولات</h2>

          <ul className="product-grid">
            {products.map((product) => (
              <li key={product.id} className="product-card stack-8">
                <div className="commerce-product-image" />

                <span className={`product-badge ${product.badgeClass}`}>
                  {product.badge}
                </span>

                <h3 className="font-body truncate">{product.name}</h3>

                <div className="flex items-center gap-8">
                  <span className="commerce-price" data-numeric>
                    {product.price}
                  </span>
                  {product.oldPrice ? (
                    <span className="commerce-price-old" data-numeric>
                      {product.oldPrice}
                    </span>
                  ) : null}
                </div>

                <div className="flex items-center justify-between">
                  <span className="product-rating">
                    <span className="product-rating-star" aria-hidden="true">
                      ★
                    </span>
                    <span data-numeric>{product.rating}</span>
                  </span>

                  <span className={`font-caption ${product.stockClass}`}>
                    {product.stock}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- Surfaces & elevation ---------- */}
        <section
          className="section-sm stack-16"
          aria-labelledby="surfaces-heading"
        >
          <h2 id="surfaces-heading">سطوح و سایه‌ها</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
            {(["shadow-xs", "shadow-sm", "shadow-md", "shadow-lg"] as const).map(
              (shadow) => (
                <div
                  key={shadow}
                  className={`p-24 rounded-card ${shadow}`}
                  style={{ background: "var(--surface-card)" }}
                >
                  <span className="font-caption text-muted" dir="ltr">
                    {shadow}
                  </span>
                </div>
              ),
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
