import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { products, categories } from "@/data/products";
import AddToCartButton from "@/components/AddToCartButton";
import { useLang } from "@/hooks/use-lang";
const Products = () => {
  const { t } = useLang();
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

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
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`group relative overflow-hidden font-body text-[11px] font-medium tracking-[0.22em] uppercase transition-colors duration-400 ${
                  active === cat
                    ? "bg-foreground text-background border-fine border border-foreground"
                    : "bg-transparent text-foreground border-fine border border-foreground hover:bg-foreground hover:text-background"
                }`}
              >
                <span className="relative z-[1] px-8 py-3.5 inline-block">{cat}</span>
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
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
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
                    <p className="font-body text-[10px] font-normal tracking-[0.28em] uppercase text-text-hint">{product.category}</p>
                    <h3 className="font-display text-lg text-foreground mt-1 group-hover:-translate-y-1 transition-transform duration-400">{product.name}</h3>
                    <p className="font-body text-sm font-light text-text-muted-warm mt-1 leading-[1.85]">{product.description}</p>
                    <AddToCartButton
                      productId={product.id}
                      name_en={product.name}
                      name_ar={product.name}
                      image_url={product.image || null}
                      price={product.price}
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
