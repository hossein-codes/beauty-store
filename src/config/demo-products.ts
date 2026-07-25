/**
 * Placeholder catalogue used by the design-system demo pages.
 * Replace with real data once the product API exists.
 */

export interface DemoProduct {
  id: number;
  name: string;
  price: string;
  oldPrice: string | null;
  badge: string | null;
  badgeClass: string;
  stock: string;
  stockClass: string;
  rating: string;
}

export const PRODUCTS: DemoProduct[] = [
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
    name: "کرم مرطوب‌کننده هیالورونیک اسید",
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
  {
    id: 5,
    name: "رژ لب مات مخملی",
    price: "۶۲۰٬۰۰۰",
    oldPrice: null,
    badge: null,
    badgeClass: "",
    stock: "موجود",
    stockClass: "stock-available",
    rating: "۴٫۵",
  },
];
