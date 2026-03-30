import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/hooks/use-lang";

interface ProductSize {
  size_name: string;
  price: number;
}

interface ProductImage {
  image_url: string;
  display_order: number;
}

interface Product {
  id: string;
  name_en: string;
  name_ar: string | null;
  description_en: string | null;
  description_ar: string | null;
  price: number;
  image_url: string | null;
  category_en: string | null;
  category_ar: string | null;
  is_featured?: boolean | null;
  product_images?: ProductImage[];
  product_sizes?: ProductSize[];
}

/* ── helpers ── */

function getImage(p: Product): string | null {
  if (p.product_images && p.product_images.length > 0) {
    const sorted = [...p.product_images].sort((a, b) => a.display_order - b.display_order);
    return sorted[0].image_url;
  }
  return p.image_url || null;
}

function getPrice(p: Product, t: (en: string, ar: string) => string): string {
  if (p.product_sizes && p.product_sizes.length > 0) {
    const lowest = Math.min(...p.product_sizes.map((s) => s.price));
    return t(`From $${lowest}`, `من $${lowest}`);
  }
  return `$${p.price}`;
}

/* ── animation variants ── */

const fadeSlideUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
};

/* ── sub-components ── */

const ImagePlaceholder = ({ className }: { className?: string }) => (
  <div className={`w-full h-full bg-light-fill flex items-center justify-center ${className || ""}`}>
    <span className="font-body text-xs italic text-mid-tone">Product Photo</span>
  </div>
);

const ProductImage = ({
  src,
  alt,
  className,
}: {
  src: string | null;
  alt: string;
  className?: string;
}) =>
  src ? (
    <img src={src} alt={alt} className={`w-full h-full object-cover ${className || ""}`} loading="lazy" />
  ) : (
    <ImagePlaceholder className={className} />
  );

const SkeletonPulse = ({ className }: { className?: string }) => (
  <div className={`animate-pulse ${className || ""}`} />
);

const LoadingSkeleton = () => (
  <div className="border-t" style={{ borderColor: "rgba(44,26,14,0.1)" }}>
    {/* Featured skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-5">
      <div className="md:col-span-3">
        <SkeletonPulse className="w-full h-[320px] md:h-[420px] bg-light-fill" />
      </div>
      <div className="md:col-span-2 p-10 md:p-12 space-y-5" style={{ borderLeft: "0.5px solid rgba(44,26,14,0.1)" }}>
        <SkeletonPulse className="w-16 h-2 bg-muted" />
        <SkeletonPulse className="w-48 h-7 bg-muted" />
        <SkeletonPulse className="w-full h-2 bg-muted" />
        <SkeletonPulse className="w-3/4 h-2 bg-muted" />
        <SkeletonPulse className="w-1/2 h-2 bg-muted" />
        <div className="pt-8 flex justify-between">
          <SkeletonPulse className="w-16 h-5 bg-muted" />
          <SkeletonPulse className="w-20 h-4 bg-muted" />
        </div>
      </div>
    </div>
    {/* Grid skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-3" style={{ borderTop: "0.5px solid rgba(44,26,14,0.1)" }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={i > 0 ? { borderLeft: "0.5px solid rgba(44,26,14,0.1)" } : {}}>
          <SkeletonPulse className="w-full h-[280px] bg-light-fill" />
          <div className="p-6 space-y-3">
            <SkeletonPulse className="w-14 h-2 bg-muted" />
            <SkeletonPulse className="w-32 h-5 bg-muted" />
            <SkeletonPulse className="w-full h-2 bg-muted" />
            <SkeletonPulse className="w-2/3 h-2 bg-muted" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ── CategoryTabs ── */

const CategoryTabs = ({
  categories,
  active,
  onSelect,
  t,
}: {
  categories: { en: string; ar: string }[];
  active: string;
  onSelect: (cat: string) => void;
  t: (en: string, ar: string) => string;
}) => (
  <div className="flex items-center gap-8 mb-14">
    {categories.map((cat) => {
      const isActive = active === cat.en;
      return (
        <button
          key={cat.en}
          onClick={() => onSelect(cat.en)}
          className="relative pb-2 font-body text-[10px] font-medium tracking-[0.2em] uppercase transition-colors duration-300"
          style={{ color: isActive ? "hsl(var(--foreground))" : "hsl(var(--mid-tone))" }}
        >
          {t(cat.en, cat.ar)}
          {isActive && (
            <motion.div
              layoutId="category-underline"
              className="absolute bottom-0 left-0 right-0 h-[1px] bg-accent"
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
        </button>
      );
    })}
  </div>
);

/* ── FeaturedCard ── */

const FeaturedCard = ({ product, t }: { product: Product; t: (en: string, ar: string) => string }) => (
  <motion.div variants={fadeSlideUp} initial="initial" animate="animate" exit="exit" key={product.id + "-featured"}>
    <Link
      to={`/products/${product.id}`}
      className="group grid grid-cols-1 md:grid-cols-5"
      style={{ borderTop: "0.5px solid rgba(44,26,14,0.1)" }}
    >
      <div className="md:col-span-3 h-[320px] md:h-[420px] overflow-hidden relative">
        <ProductImage
          src={getImage(product)}
          alt={t(product.name_en, product.name_ar || product.name_en)}
          className="group-hover:scale-[1.03] transition-transform duration-700 ease-out"
        />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
      <div
        className="md:col-span-2 p-10 md:py-12 md:px-10 flex flex-col justify-center"
        style={{ borderLeft: "0.5px solid rgba(44,26,14,0.1)" }}
      >
        <p className="font-body text-[10px] tracking-[0.25em] uppercase text-mid-tone mb-4">
          {t(product.category_en || "", product.category_ar || product.category_en || "")}
        </p>
        <h3 className="font-display text-[32px] font-light text-foreground leading-tight mb-4 group-hover:-translate-y-1 transition-transform duration-500">
          {t(product.name_en, product.name_ar || product.name_en)}
        </h3>
        <p className="font-body font-light text-[13px] text-muted-foreground leading-[1.8] max-w-[280px] mb-8">
          {t(product.description_en || "", product.description_ar || product.description_en || "")}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-display text-lg text-foreground">{getPrice(product, t)}</span>
          <span className="font-body text-[10px] tracking-[0.15em] uppercase text-mid-tone group-hover:text-foreground transition-colors duration-300 flex items-center gap-1.5">
            {t("Explore", "استكشف")} <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
);

/* ── ProductCard ── */

const ProductCard = ({
  product,
  t,
  isFirst,
}: {
  product: Product;
  t: (en: string, ar: string) => string;
  isFirst: boolean;
}) => (
  <motion.div
    variants={fadeSlideUp}
    layout
    key={product.id}
    style={!isFirst ? { borderLeft: "0.5px solid rgba(44,26,14,0.1)" } : {}}
    className="border-t md:border-t-0"
  >
    <Link to={`/products/${product.id}`} className="group block">
      <div className="h-[280px] overflow-hidden relative">
        <ProductImage
          src={getImage(product)}
          alt={t(product.name_en, product.name_ar || product.name_en)}
          className="group-hover:scale-[1.03] transition-transform duration-700 ease-out"
        />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
      <div className="p-6">
        <p className="font-body text-[10px] tracking-[0.25em] uppercase text-mid-tone mb-2">
          {t(product.category_en || "", product.category_ar || product.category_en || "")}
        </p>
        <h3 className="font-display text-lg text-foreground mb-2 group-hover:-translate-y-1 transition-transform duration-500">
          {t(product.name_en, product.name_ar || product.name_en)}
        </h3>
        <p className="font-body font-light text-xs text-muted-foreground leading-[1.7] line-clamp-2 mb-4">
          {t(product.description_en || "", product.description_ar || product.description_en || "")}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-display text-sm text-foreground">{getPrice(product, t)}</span>
          <span className="font-body text-[10px] tracking-[0.15em] uppercase text-mid-tone group-hover:text-foreground transition-colors duration-300 flex items-center gap-1">
            {t("Explore", "استكشف")} <ArrowRight size={11} />
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
);

/* ── Main Component ── */

const Collections = () => {
  const { t } = useLang();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select(
          "id, name_en, name_ar, description_en, description_ar, price, image_url, category_en, category_ar, is_featured, product_images(image_url, display_order), product_sizes(size_name, price)"
        )
        .order("created_at", { ascending: false });

      setAllProducts((data as Product[]) || []);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  /* derive categories */
  const categories = useMemo(() => {
    const cats: { en: string; ar: string }[] = [{ en: "All", ar: "الكل" }];
    const seen = new Set<string>();
    allProducts.forEach((p) => {
      if (p.category_en && !seen.has(p.category_en)) {
        seen.add(p.category_en);
        cats.push({ en: p.category_en, ar: p.category_ar || p.category_en });
      }
    });
    return cats;
  }, [allProducts]);

  /* filtered products */
  const filtered = useMemo(() => {
    if (activeCategory === "All") return allProducts;
    return allProducts.filter((p) => p.category_en === activeCategory);
  }, [allProducts, activeCategory]);

  const featured = filtered.find((p) => p.is_featured);
  const gridProducts = filtered.filter((p) => p !== featured);

  const isEmpty = !loading && filtered.length === 0;

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="font-body text-[10px] tracking-[0.28em] uppercase text-mid-tone mb-3">
              {t("Our Collections", "مجموعاتنا")}
            </p>
            <h2 className="font-display text-[42px] font-light italic text-foreground leading-tight">
              {t("Discover Our World", "اكتشف عالمنا")}
            </h2>
          </div>
          <Link
            to="/products"
            className="hidden md:inline-flex items-center gap-2 font-body text-xs tracking-[0.18em] uppercase text-accent hover:text-foreground transition-colors duration-300"
          >
            {t("View All", "عرض الكل")} <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Category Tabs */}
        {!loading && categories.length > 1 && (
          <CategoryTabs categories={categories} active={activeCategory} onSelect={setActiveCategory} t={t} />
        )}

        {loading && <LoadingSkeleton />}

        {isEmpty && (
          <p className="text-center font-body font-light italic text-sm text-mid-tone py-20">
            {t("A new creation is coming soon...", "إبداع جديد قادم قريباً...")}
          </p>
        )}

        <AnimatePresence mode="wait">
          {!loading && !isEmpty && (
            <motion.div
              key={activeCategory}
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* Featured Product */}
              {featured && <FeaturedCard product={featured} t={t} />}

              {/* Products Grid */}
              {gridProducts.length > 0 && (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-3"
                  style={{ borderTop: "0.5px solid rgba(44,26,14,0.1)" }}
                  variants={staggerContainer}
                >
                  {gridProducts.map((p, i) => (
                    <ProductCard key={p.id} product={p} t={t} isFirst={i === 0} />
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-16"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-3 px-8 py-4 font-body text-[11px] font-medium tracking-[0.22em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
            style={{ border: "0.5px solid hsl(var(--foreground))" }}
          >
            {t("View All Collections", "عرض جميع المجموعات")} <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Collections;
