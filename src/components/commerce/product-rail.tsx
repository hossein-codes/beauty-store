import type { DemoProduct } from "@/config/demo-products";
import ProductCard from "./product-card";

/**
 * Product rail — the clearest example of the app/web split.
 *
 * MOBILE: a horizontally snapping carousel (`.snap-x`). This is how native
 * shopping apps present a collection; vertical space is precious and swiping
 * is the natural gesture.
 *
 * DESKTOP: the same list becomes a wrapping multi-column grid, because
 * horizontal scrolling with a mouse is hostile.
 *
 * Both are the same markup — only the container's display switches at the
 * breakpoint (see the media query in this file's companion CSS class,
 * `.rail`, defined in commerce.css).
 */
export default function ProductRail({
  title,
  products,
}: {
  title: string;
  products: DemoProduct[];
}) {
  return (
    <section className="stack-16" aria-labelledby={`rail-${title}`}>
      <h2 id={`rail-${title}`} className="font-heading-sm">
        {title}
      </h2>

      <ul className="rail">
        {products.map((product) => (
          <li key={product.id} className="rail-item">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
