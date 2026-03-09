import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { products, categories } from "@/data/products";

const Products = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-6">
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
                className={`px-6 py-2 font-body text-xs tracking-[0.2em] uppercase transition-colors border ${
                  active === cat
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-transparent text-muted-foreground border-border hover:border-accent hover:text-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link to={`/products/${product.id}`} className="group block">
                  <div className="aspect-square overflow-hidden bg-warm-beige">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">{product.category}</p>
                    <h3 className="font-display text-lg text-foreground mt-1">{product.name}</h3>
                    <p className="font-body text-sm text-muted-foreground mt-1">{product.description}</p>
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
