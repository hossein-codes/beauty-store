import { prisma } from '../src/lib/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with Persian beauty store sample data...');

  // Clear existing data
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Categories
  const categories = await prisma.category.createMany({
    data: [
      {
        name: 'مراقبت پوست',
        slug: 'skincare',
        description: 'محصولات مراقبت از پوست صورت و بدن',
        imageUrl: '/images/categories/skincare.jpg',
      },
      {
        name: 'آرایش صورت',
        slug: 'makeup-face',
        description: 'محصولات آرایشی صورت و پایه',
        imageUrl: '/images/categories/makeup-face.jpg',
      },
      {
        name: 'آرایش چشم',
        slug: 'makeup-eyes',
        description: 'سایه چشم، ریمل، خط چشم و محصولات آرایش چشم',
        imageUrl: '/images/categories/makeup-eyes.jpg',
      },
      {
        name: 'لب و ناخن',
        slug: 'lips-nails',
        description: 'رژ لب، لاک ناخن و محصولات مرتبط',
        imageUrl: '/images/categories/lips-nails.jpg',
      },
      {
        name: 'مو و مراقبت',
        slug: 'haircare',
        description: 'شامپو، ماسک مو و محصولات مراقبت مو',
        imageUrl: '/images/categories/haircare.jpg',
      },
    ],
  });

  console.log(`✅ Created ${categories.count} categories`);

  // Products - Persian sample data for beauty store
  const products = await prisma.product.createMany({
    data: [
      // Skincare
      {
        name: 'سرم ویتامین C روشن‌کننده',
        description: 'سرم ویتامین C خالص ۲۰٪ برای روشن کردن و کاهش لک‌های پوستی. مناسب انواع پوست.',
        price: 1280000,
        oldPrice: 1600000,
        imageUrl: '/images/products/vitamin-c-serum.jpg',
        category: 'skincare',
        brand: 'لومینا',
        stock: 45,
        rating: 4.8,
        badge: '٪۲۰ تخفیف',
      },
      {
        name: 'کرم مرطوب‌کننده هیالورونیک اسید',
        description: 'کرم آبرسان عمیق با اسید هیالورونیک. مناسب پوست خشک و کم‌آب.',
        price: 890000,
        oldPrice: null,
        imageUrl: '/images/products/hyaluronic-cream.jpg',
        category: 'skincare',
        brand: 'درماتولوژی',
        stock: 3,
        rating: 4.6,
        badge: 'جدید',
      },
      {
        name: 'ماسک صورت زغال فعال',
        description: 'ماسک پاک‌کننده عمیق با زغال فعال و خاک رس. مناسب پوست چرب و مختلط.',
        price: 450000,
        oldPrice: 590000,
        imageUrl: '/images/products/charcoal-mask.jpg',
        category: 'skincare',
        brand: 'لومینا',
        stock: 28,
        rating: 4.3,
        badge: '٪۲۴ تخفیف',
      },
      {
        name: 'کرم ضدچروک رتینول',
        description: 'کرم شب ضدچروک حاوی رتینول ۰.۵٪. مناسب پوست بالغ.',
        price: 1450000,
        oldPrice: null,
        imageUrl: '/images/products/retinol-cream.jpg',
        category: 'skincare',
        brand: 'درماتولوژی',
        stock: 12,
        rating: 4.7,
        badge: null,
      },
      // Makeup Face
      {
        name: 'پالت سایه چشم نود',
        description: 'پالت ۱۲ رنگ سایه چشم با تن‌های نود و گرم. بافت مخملی و ماندگار.',
        price: 2150000,
        oldPrice: null,
        imageUrl: '/images/products/nude-palette.jpg',
        category: 'makeup-eyes',
        brand: 'لومینا',
        stock: 0,
        rating: 4.9,
        badge: 'پرفروش',
      },
      {
        name: 'رژ لب مات مخملی',
        description: 'رژ لب مات با بافت مخملی و پوشش کامل. ۱۲ رنگ متنوع.',
        price: 620000,
        oldPrice: null,
        imageUrl: '/images/products/matte-lipstick.jpg',
        category: 'lips-nails',
        brand: 'لومینا',
        stock: 67,
        rating: 4.5,
        badge: null,
      },
      {
        name: 'فونداسیون مایع ۲۴ ساعته',
        description: 'فونداسیون مایع با پوشش کامل و ماندگاری ۲۴ ساعته. SPF 30.',
        price: 980000,
        oldPrice: 1150000,
        imageUrl: '/images/products/foundation.jpg',
        category: 'makeup-face',
        brand: 'درماتولوژی',
        stock: 34,
        rating: 4.4,
        badge: '٪۱۵ تخفیف',
      },
      {
        name: 'کانسیلر مایع پوشش بالا',
        description: 'کانسیلر مایع با پوشش بالا و بافت سبک. مناسب زیر چشم و لک.',
        price: 540000,
        oldPrice: null,
        imageUrl: '/images/products/concealer.jpg',
        category: 'makeup-face',
        brand: 'لومینا',
        stock: 19,
        rating: 4.2,
        badge: null,
      },
      // Eyes
      {
        name: 'ریمل حجم‌دهنده بلندکننده',
        description: 'ریمل حجم‌دهنده و بلندکننده مژه با فرمول ضدآب.',
        price: 780000,
        oldPrice: null,
        imageUrl: '/images/products/mascara.jpg',
        category: 'makeup-eyes',
        brand: 'لومینا',
        stock: 52,
        rating: 4.6,
        badge: 'جدید',
      },
      {
        name: 'خط چشم مایع ضدآب',
        description: 'خط چشم مایع ضدآب با نوک دقیق و رنگ مشکی عمیق.',
        price: 390000,
        oldPrice: 450000,
        imageUrl: '/images/products/eyeliner.jpg',
        category: 'makeup-eyes',
        brand: 'درماتولوژی',
        stock: 81,
        rating: 4.1,
        badge: '٪۱۳ تخفیف',
      },
      // Lips & Nails
      {
        name: 'لاک ناخن براق',
        description: 'لاک ناخن براق با ۲۰ رنگ متنوع و خشک شدن سریع.',
        price: 185000,
        oldPrice: null,
        imageUrl: '/images/products/nail-polish.jpg',
        category: 'lips-nails',
        brand: 'لومینا',
        stock: 120,
        rating: 4.0,
        badge: null,
      },
      {
        name: 'بالم لب رنگی',
        description: 'بالم لب رنگی با SPF 15 و رنگ‌های طبیعی.',
        price: 320000,
        oldPrice: null,
        imageUrl: '/images/products/lip-balm.jpg',
        category: 'lips-nails',
        brand: 'درماتولوژی',
        stock: 75,
        rating: 4.3,
        badge: null,
      },
      // Haircare
      {
        name: 'شامپو آبرسان موهای خشک',
        description: 'شامپو آبرسان و نرم‌کننده موهای خشک و آسیب‌دیده.',
        price: 420000,
        oldPrice: 520000,
        imageUrl: '/images/products/shampoo.jpg',
        category: 'haircare',
        brand: 'لومینا',
        stock: 38,
        rating: 4.4,
        badge: '٪۱۹ تخفیف',
      },
      {
        name: 'ماسک مو کراتینه',
        description: 'ماسک مو کراتینه بازسازی‌کننده و صاف‌کننده مو.',
        price: 680000,
        oldPrice: null,
        imageUrl: '/images/products/hair-mask.jpg',
        category: 'haircare',
        brand: 'درماتولوژی',
        stock: 24,
        rating: 4.8,
        badge: 'پرفروش',
      },
    ],
  });

  console.log(`✅ Created ${products.count} products`);

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
