import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: delay / 1000, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

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

const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={`animate-pulse ${className}`} />
);

const LoadingSkeleton = () => (
  <div>
    {/* Featured skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-5 mb-0">
      <div className="md:col-span-3">
        <SkeletonBlock className="w-full h-[320px] md:h-[420px] bg-light-fill" />
      </div>
      <div className="md:col-span-2 p-10 md:p-12 border-l border-fine space-y-4">
        <SkeletonBlock className="w-20 h-3 bg-[rgba(44,26,14,0.06)]" />
        <SkeletonBlock className="w-48 h-7 bg-[rgba(44,26,14,0.06)]" />
        <SkeletonBlock className="w-full h-3 bg-[rgba(44,26,14,0.06)]" />
        <SkeletonBlock className="w-3/4 h-3 bg-[rgba(44,26,14,0.06)]" />
        <SkeletonBlock className="w-1/2 h-3 bg-[rgba(44,26,14,0.06)]" />
        <div className="pt-6 flex justify-between">
          <SkeletonBlock className="w-16 h-5 bg-[rgba(44,26,14,0.06)]" />
          <SkeletonBlock className="w-20 h-5 bg-[rgba(44,26,14,0.06)]" />
        </div>
      </div>
    </div>
    {/* Grid skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className={`${i > 0 ? "border-l border-fine" : ""}`}>
          <SkeletonBlock className="w-full h-[220px] bg-light-fill" />
          <div className="p-5 space-y-3">
            <SkeletonBlock className="w-16 h-2 bg-[rgba(44,26,14,0.06)]" />
            <SkeletonBlock className="w-32 h-5 bg-[rgba(44,26,14,0.06)]" />
            <SkeletonBlock className="w-full h-2 bg-[rgba(44,26,14,0.06)]" />
            <SkeletonBlock className="w-2/3 h-2 bg-[rgba(44,26,14,0.06)]" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ImageBlock = ({
  src,
  alt,
  className,
}: {
  src: string | null;
  alt: string;
  className?: string;
}) =>
  src ? (
    <img src={src} alt={alt} className={`w-full h-full object-cover ${className || ""}`} />
  ) : (
    <div className={`w-full h-full bg-light-fill flex items-center justify-center ${className || ""}`}>
      <span className="font-body text-xs italic text-mid">Product Photo</span>
    </div>
  );

const Collections = () => {
  const { t } = useLang();
  const [featured, setFeatured] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const [featuredRes, productsRes] = await Promise.all([
        supabase
          .from("products")
          .select(
            "id, name_en, name_ar, description_en, description_ar, price, image_url, category_en, category_ar, is_featured, product_images(image_url, display_order), product_sizes(size_name, price)"
          )
          .eq("is_featured", true)
          .limit(1)
          .maybeSingle(),
        supabase
          .from("products")
          .select(
            "id, name_en, name_ar, description_en, description_ar, price, image_url, category_en, category_ar, product_sizes(size_name, price)"
          )
          .eq("is_featured", false)
          .order("created_at", { ascending: false })
          .limit(3),
      ]);
      setFeatured(featuredRes.data as Product | null);
      setProducts((productsRes.data as Product[]) || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const isEmpty = !loading && !featured && products.length === 0;

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end justify-between mb-14"
        >
          <div>
            <p className="font-body text-[10px] tracking-[0.28em] uppercase text-mid mb-3">
              {t("Our Collections", "مجموعاتنا")}
            </p>
            <h2 className="font-display text-[38px] font-light italic text-foreground leading-tight">
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

        {loading && <LoadingSkeleton />}

        {isEmpty && (
          <p className="text-center font-body font-light text-sm text-mid py-16">
            {t("Our collections are coming soon.", "مجموعاتنا قادمة قريباً.")}
          </p>
        )}

        {!loading && !isEmpty && (
          <>
            {/* Featured Product */}
            {featured && (
              <motion.div
                custom={0}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Link
                  to={`/products/${featured.id}`}
                  className="group grid grid-cols-1 md:grid-cols-5 border border-fine"
                >
                  <div className="md:col-span-3 h-[320px] md:h-[420px] overflow-hidden relative">
                    <ImageBlock
                      src={getImage(featured)}
                      alt={t(featured.name_en, featured.name_ar || featured.name_en)}
                      className="group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                  <div className="md:col-span-2 p-10 md:py-12 md:px-10 border-t md:border-t-0 md:border-l border-fine flex flex-col justify-center">
                    <p className="font-body text-[10px] tracking-[0.25em] uppercase text-mid mb-4">
                      {t(featured.category_en || "", featured.category_ar || featured.category_en || "")}
                    </p>
                    <h3 className="font-display text-[32px] text-foreground leading-tight mb-4">
                      {t(featured.name_en, featured.name_ar || featured.name_en)}
                    </h3>
                    <p className="font-body font-light text-[13px] text-muted-foreground leading-[1.8] max-w-[280px] mb-8">
                      {t(
                        featured.description_en || "",
                        featured.description_ar || featured.description_en || ""
                      )}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-display text-lg text-foreground">
                        {getPrice(featured, t)}
                      </span>
                      <span className="font-body text-xs tracking-[0.15em] uppercase text-mid group-hover:text-foreground transition-colors duration-300 flex items-center gap-1.5">
                        {t("Order", "اطلب")} <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Products Grid */}
            {products.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 mt-0 border-x border-b border-fine">
                {products.map((p, i) => (
                  <motion.div
                    key={p.id}
                    custom={(i + 1) * 100}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className={i > 0 ? "border-t md:border-t-0 md:border-l border-fine" : ""}
                  >
                    <Link to={`/products/${p.id}`} className="group block">
                      <div className="h-[220px] overflow-hidden relative">
                        <ImageBlock
                          src={getImage(p)}
                          alt={t(p.name_en, p.name_ar || p.name_en)}
                          className="group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      </div>
                      <div className="p-5">
                        <p className="font-body text-[10px] tracking-[0.25em] uppercase text-mid mb-2">
                          {t(p.category_en || "", p.category_ar || p.category_en || "")}
                        </p>
                        <h3 className="font-display text-lg text-foreground mb-2">
                          {t(p.name_en, p.name_ar || p.name_en)}
                        </h3>
                        <p className="font-body font-light text-xs text-muted-foreground leading-[1.7] line-clamp-2 mb-4">
                          {t(
                            p.description_en || "",
                            p.description_ar || p.description_en || ""
                          )}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-display text-sm text-foreground">
                            {getPrice(p, t)}
                          </span>
                          <span className="font-body text-[10px] tracking-[0.15em] uppercase text-mid group-hover:text-foreground transition-colors duration-300 flex items-center gap-1">
                            {t("Order", "اطلب")} <ArrowRight size={11} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-16"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-3 px-8 py-4 border border-fine border-foreground font-body text-[11px] font-medium tracking-[0.22em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            {t("View All Collections", "عرض جميع المجموعات")} <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Collections;
