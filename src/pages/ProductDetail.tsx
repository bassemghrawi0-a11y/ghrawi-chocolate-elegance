import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { products } from "@/data/products";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-display text-[38px] font-light text-foreground mb-4">Product not found</h1>
          <Link to="/products" className="text-accent font-body text-[11px] font-normal tracking-[0.18em] uppercase hover:text-foreground transition-colors duration-300">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <section className="py-section-y bg-background">
        <div className="container mx-auto px-section-x-mobile md:px-section-x max-w-5xl">
          <Link to="/products" className="inline-flex items-center gap-2 text-text-hint hover:text-foreground transition-colors duration-300 font-body text-[11px] font-normal tracking-[0.18em] uppercase mb-12">
            <ArrowLeft size={14} /> Back to Collection
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-col-gap items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="aspect-square overflow-hidden bg-light-fill"
            >
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-light-fill flex items-center justify-center">
                  <span className="font-body text-[11px] font-light tracking-[0.15em] text-text-hint">Product Photo</span>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6"
            >
              <p className="font-body text-[10px] font-normal tracking-[0.28em] uppercase text-accent">{product.category}</p>
              <h1 className="font-display text-[38px] md:text-[44px] font-light text-foreground leading-[1.12]">{product.name}</h1>
              <p className="font-display text-[24px] font-light text-text-muted-warm italic">{product.nameAr}</p>
              <div className="w-16 h-[0.5px] bg-accent" />
              <p className="font-body text-sm font-light text-text-muted-warm leading-[1.85]">{product.details}</p>

              <div className="mt-4 p-internal bg-cream border-t border-fine border-foreground/10">
                <h4 className="font-display text-lg font-light text-foreground mb-3">Our Guarantee</h4>
                <ul className="space-y-2 font-body text-sm font-light text-text-muted-warm">
                  <li>✓ 100% Pure Cocoa Butter</li>
                  <li>✓ No Hydrogenated Oils</li>
                  <li>✓ Handcrafted with Care</li>
                  <li>✓ Premium Ingredients Only</li>
                </ul>
              </div>

              <Link
                to="/contact"
                className="mt-4 group relative inline-flex items-center justify-center overflow-hidden bg-foreground font-body text-[11px] font-medium tracking-[0.22em] uppercase text-background transition-colors duration-400 self-start"
              >
                <span
                  className="absolute inset-0 origin-left bg-accent scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-x-100"
                  aria-hidden
                />
                <span className="relative z-[1] px-8 py-3.5 transition-colors duration-400 group-hover:text-accent-foreground">
                  Inquire About This Product
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
