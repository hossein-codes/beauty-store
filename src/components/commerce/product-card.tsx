import type { DemoProduct } from "@/config/demo-products";

/**
 * Product card.
 *
 * A Server Component — it has no interactivity of its own, so none of it ships
 * to the browser. The wishlist button will become a small Client Component
 * when it's wired up, keeping the rest server-rendered.
 *
 * Platform differences are handled entirely in CSS (see `.product-card`):
 * hover-lift only on pointer devices, tap-scale only on touch.
 */
export default function ProductCard({ product }: { product: DemoProduct }) {
  return (
    <article className="product-card tappable stack-8">
      <div className="commerce-product-image">
        {product.badge ? (
          <span
            className={`product-badge ${product.badgeClass}`}
            style={{
              position: "absolute",
              top: "var(--spacing-8)",
              insetInlineStart: "var(--spacing-8)",
            }}
          >
            {product.badge}
          </span>
        ) : null}
      </div>

      <h3 className="font-body-sm line-clamp-2">{product.name}</h3>

      <div className="flex items-center gap-8 flex-wrap">
        <span className="commerce-price" data-numeric>
          {product.price}
          <span className="commerce-price-unit"> تومان</span>
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
    </article>
  );
}
