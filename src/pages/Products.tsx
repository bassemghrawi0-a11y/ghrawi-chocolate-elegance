import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import AddToCartButton from "@/components/AddToCartButton";
import { useLang } from "@/hooks/use-lang";
import { supabase } from "@/integrations/supabase/client";

interface ProductSize {
  id: string;
  size_name: string;
  size_name_ar: string;
  price: number;
}

interface Product {
  id: string;
  name_en: string;
  name_ar: string | null;
  description_en: string | null;
  description_ar: string | null;
  category_id: string | null;
  category_en: string | null;
  category_ar: string | null;
  image_url: string | null;
  price: number;
  product_sizes?: ProductSize[];
  categories?: {
    id?: string;
    name_en?: string;
    name_ar?: string;
    slug?: string;
  } | null;
}

const Products = () => {
  const { t } = useLang();
  const [active, setActive] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: string; name_en: string; name_ar: string; slug: string }[]>(
    []
  );

  useEffect(() => {
    const fetchCatalog = async () => {
      const [{ data: categoriesData }, { data: productsData }] = await Promise.all([
        supabase
          .from("categories")
          .select("id, name_en, name_ar, slug")
          .order("name_en", { ascending: true }),
        supabase
          .from("products")
          .select(
            "id, name_en, name_ar, description_en, description_ar, category_id, category_en, category_ar, image_url, price, categories(id, name_en, name_ar, slug), product_sizes(id, size_name, size_name_ar, price)"
          )
          .order("created_at", { ascending: false }),
      ]);

      setCategories((categoriesData as { id: string; name_en: string; name_ar: string; slug: string }[]) ?? []);
      setProducts((productsData as Product[]) ?? []);
    };

    fetchCatalog();
  }, []);

  const categoryTabs = useMemo(
    () => [{ id: "all", name_en: "All", name_ar: "الكل", slug: "all" }, ...categories],
    [categories]
  );

  const filtered = useMemo(
    () =>
      active === "all"
        ? products
        : products.filter((product) => {
            const slug = product.categories?.slug;
            if (slug) return slug === active;
            return false;
          }),
    [active, products]
  );

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-section-y bg-cream">
        <div className="container mx-auto px-section-x-mobile md:px-section-x">
          <SectionHeading
            title="Our Collection"
            subtitle="Each creation is a masterpiece of flavor, crafted with 100% pure cocoa butter."
          />

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {categoryTabs.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.slug)}
                className={`group relative overflow-hidden font-body text-[11px] font-medium tracking-[0.22em] uppercase transition-colors duration-400 ${
                  active === cat.slug
                    ? "bg-foreground text-background border-fine border border-foreground"
                    : "bg-transparent text-foreground border-fine border border-foreground hover:bg-foreground hover:text-background"
                }`}
              >
                <span className="relative z-[1] px-8 py-3.5 inline-block">
                  {t(cat.name_en, cat.name_ar)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-section-y bg-background">
        <div className="container mx-auto px-section-x-mobile md:px-section-x">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-comp-gap max-w-6xl mx-auto">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to={`/products/${product.id}`} className="group block">
                  <div className="aspect-square overflow-hidden bg-light-fill relative">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={t(product.name_en, product.name_ar || product.name_en)}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-light-fill flex items-center justify-center">
                        <span className="font-body text-[11px] font-light tracking-[0.15em] text-text-hint">Product Photo</span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                  </div>
                  <div className="mt-4">
                    <p className="font-body text-[10px] font-normal tracking-[0.28em] uppercase text-text-hint">
                      {t(
                        product.categories?.name_en || product.category_en || "",
                        product.categories?.name_ar || product.category_ar || product.category_en || ""
                      )}
                    </p>
                    <h3 className="font-display text-lg text-foreground mt-1 group-hover:-translate-y-1 transition-transform duration-400">
                      {t(product.name_en, product.name_ar || product.name_en)}
                    </h3>
                    <p className="font-body text-sm font-light text-text-muted-warm mt-1 leading-[1.85]">
                      {t(
                        product.description_en || "",
                        product.description_ar || product.description_en || ""
                      )}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-display text-sm text-foreground">
                        {product.product_sizes?.length
                          ? t(
                              `From $${Math.min(...product.product_sizes.map((size) => size.price))}`,
                              `من $${Math.min(...product.product_sizes.map((size) => size.price))}`
                            )
                          : `$${product.price}`}
                      </span>
                      <span className="font-body text-[10px] tracking-[0.15em] uppercase text-text-hint group-hover:text-foreground transition-colors duration-300 flex items-center gap-1">
                        {t("Explore", "استكشف")} <ArrowRight size={11} />
                      </span>
                    </div>
                    <AddToCartButton
                      productId={product.id}
                      productSizes={product.product_sizes}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
