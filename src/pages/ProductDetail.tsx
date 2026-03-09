import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { products } from "@/data/products";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl text-foreground mb-4">Product not found</h1>
          <Link to="/products" className="text-accent font-body text-sm tracking-widest uppercase hover:underline">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors font-body text-sm tracking-widest uppercase mb-12">
            <ArrowLeft size={16} /> Back to Collection
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="aspect-square overflow-hidden bg-warm-beige"
            >
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-6"
            >
              <p className="font-body text-xs tracking-[0.3em] uppercase text-accent">{product.category}</p>
              <h1 className="font-display text-3xl md:text-4xl text-foreground">{product.name}</h1>
              <p className="font-display text-xl text-muted-foreground italic">{product.nameAr}</p>
              <div className="w-12 h-[2px] bg-accent" />
              <p className="font-body text-base text-muted-foreground leading-relaxed">{product.details}</p>

              <div className="mt-4 p-6 bg-cream">
                <h4 className="font-display text-lg text-foreground mb-3">Our Guarantee</h4>
                <ul className="space-y-2 font-body text-sm text-muted-foreground">
                  <li>✓ 100% Pure Cocoa Butter</li>
                  <li>✓ No Hydrogenated Oils</li>
                  <li>✓ Handcrafted with Care</li>
                  <li>✓ Premium Ingredients Only</li>
                </ul>
              </div>

              <Link
                to="/contact"
                className="mt-4 inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-foreground font-body text-sm tracking-[0.2em] uppercase hover:bg-accent/90 transition-colors self-start"
              >
                Inquire About This Product
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
