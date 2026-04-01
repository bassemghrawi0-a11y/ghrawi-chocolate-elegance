import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/hooks/use-lang";
import AddToCartButton from "@/components/AddToCartButton";

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
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.12 } },
};

/* ── sub-components ── */

const ImagePlaceholder = ({ className }: { className?: string }) => (
  <div className={`w-full h-full bg-light-fill flex items-center justify-center ${className || ""}`}>
    <span className="font-body text-[11px] font-light tracking-[0.15em] text-text-hint">Product Photo</span>
  </div>
);

const ProductImg = ({
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
  <div className="border-t border-fine border-foreground/10">
    <div className="grid grid-cols-1 md:grid-cols-5">
      <div className="md:col-span-3">
        <SkeletonPulse className="w-full h-[320px] md:h-[420px] bg-light-fill" />
      </div>
      <div className="md:col-span-2 p-10 md:p-12 space-y-5 border-l border-fine border-foreground/10">
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
    <div className="grid grid-cols-1 md:grid-cols-3 border-t border-fine border-foreground/10">
      {[0, 1, 2].map((i) => (
        <div key={i} className={i > 0 ? "border-l border-fine border-foreground/10" : ""}>
          <SkeletonPulse className="w-full h-[280px] bg-light-fill" />
          <div className="p-internal space-y-3">
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
          style={{ color: isActive ? "hsl(var(--foreground))" : "hsl(var(--text-hint))" }}
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
      className="group grid grid-cols-1 md:grid-cols-5 border-t border-fine border-foreground/10"
    >
      <div className="md:col-span-3 h-[320px] md:h-[420px] overflow-hidden relative">
        <ProductImg
          src={getImage(product)}
          alt={t(product.name_en, product.name_ar || product.name_en)}
          className="group-hover:scale-[1.03] transition-transform duration-500 ease-out"
        />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
      </div>
      <div className="md:col-span-2 py-section-y px-10 flex flex-col justify-center border-l border-fine border-foreground/10">
        <p className="font-body text-[10px] font-normal tracking-[0.28em] uppercase text-text-hint mb-4">
          {t(product.category_en || "", product.category_ar || product.category_en || "")}
        </p>
        <h3 className="font-display text-[32px] font-light text-foreground leading-tight mb-4 group-hover:-translate-y-1 transition-transform duration-400">
          {t(product.name_en, product.name_ar || product.name_en)}
        </h3>
        <p className="font-body font-light text-[13px] text-text-muted-warm leading-[1.85] max-w-[280px] mb-8">
          {t(product.description_en || "", product.description_ar || product.description_en || "")}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-display text-lg text-foreground">{getPrice(product, t)}</span>
          <span className="font-body text-[10px] tracking-[0.15em] uppercase text-text-hint group-hover:text-foreground transition-colors duration-300 flex items-center gap-1.5">
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
    className={`border-t md:border-t-0 ${!isFirst ? "border-l border-fine border-foreground/10" : ""}`}
  >
    <Link to={`/products/${product.id}`} className="group block">
      <div className="h-[280px] overflow-hidden relative">
        <ProductImg
          src={getImage(product)}
          alt={t(product.name_en, product.name_ar || product.name_en)}
          className="group-hover:scale-[1.03] transition-transform duration-500 ease-out"
        />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
      </div>
      <div className="p-internal">
        <p className="font-body text-[10px] font-normal tracking-[0.28em] uppercase text-text-hint mb-2">
          {t(product.category_en || "", product.category_ar || product.category_en || "")}
        </p>
        <h3 className="font-display text-lg text-foreground mb-2 group-hover:-translate-y-1 transition-transform duration-400">
          {t(product.name_en, product.name_ar || product.name_en)}
        </h3>
        <p className="font-body font-light text-[13px] text-text-muted-warm leading-[1.85] line-clamp-2 mb-4">
          {t(product.description_en || "", product.description_ar || product.description_en || "")}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-display text-sm text-foreground">{getPrice(product, t)}</span>
          <span className="font-body text-[10px] tracking-[0.15em] uppercase text-text-hint group-hover:text-foreground transition-colors duration-300 flex items-center gap-1">
            {t("Explore", "استكشف")} <ArrowRight size={11} />
          </span>
        </div>
        <AddToCartButton
          productId={product.id}
          name_en={product.name_en}
          name_ar={product.name_ar || product.name_en}
          image_url={getImage(product)}
          price={product.product_sizes?.length ? Math.min(...product.product_sizes.map(s => s.price)) : product.price}
        />
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

  const filtered = useMemo(() => {
    if (activeCategory === "All") return allProducts;
    return allProducts.filter((p) => p.category_en === activeCategory);
  }, [allProducts, activeCategory]);

  const featured = filtered.find((p) => p.is_featured);
  const gridProducts = filtered.filter((p) => p !== featured);
  const isEmpty = !loading && filtered.length === 0;

  return (
    <section className="py-section-y bg-background">
      <div className="container mx-auto px-section-x-mobile md:px-section-x">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="font-body text-[10px] font-normal tracking-[0.28em] uppercase text-text-hint mb-3">
              {t("Our Collections", "مجموعاتنا")}
            </p>
            <h2 className="font-display text-[38px] md:text-[42px] font-light italic text-foreground leading-[1.12]">
              {t("Discover Our World", "اكتشف عالمنا")}
            </h2>
          </div>
          <Link
            to="/products"
            className="hidden md:inline-flex items-center gap-2 font-body text-[11px] font-normal tracking-[0.18em] uppercase text-accent hover:text-foreground transition-colors duration-300"
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
          <p className="text-center font-body font-light italic text-sm text-text-hint py-20">
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
              {featured && <FeaturedCard product={featured} t={t} />}
              {gridProducts.length > 0 && (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 border-t border-fine border-foreground/10"
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
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-16"
        >
          <Link
            to="/products"
            className="group relative inline-flex overflow-hidden font-body text-[11px] font-medium tracking-[0.22em] uppercase text-foreground border-fine border border-foreground transition-colors duration-400"
          >
            <span
              className="absolute inset-0 origin-left bg-foreground scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-x-100"
              aria-hidden
            />
            <span className="relative z-[1] px-8 py-3.5 transition-colors duration-400 group-hover:text-background flex items-center gap-3">
              {t("View All Collections", "عرض جميع المجموعات")} <ArrowRight size={14} />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Collections;
