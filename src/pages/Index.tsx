import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import chocolateHero from "@/assets/chocolate-hero.png";
import giftBox from "@/assets/gift-box.png";
import chocolatesBoxes from "@/assets/chocolates-boxes.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-chocolate">
        <div className="absolute inset-0">
          <img
            src={chocolatesBoxes}
            alt="Basem Ghrawi chocolates"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-chocolate/60 via-chocolate/40 to-chocolate/80" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-body text-sm tracking-[0.4em] uppercase text-gold mb-6"
          >
            Since Generations
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground font-medium leading-tight"
          >
            The Art of Pure{" "}
            <span className="italic text-gold">Chocolate</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 font-body text-primary-foreground/60 text-lg max-w-xl mx-auto"
          >
            Crafted with 100% pure cocoa butter. No hydrogenated oils. Only perfection.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-body text-sm tracking-[0.2em] uppercase hover:bg-accent/90 transition-colors"
            >
              Explore Collection <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Promise Section */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="Our Promise"
            subtitle="Every piece of Basem Ghrawi chocolate is a testament to our unwavering commitment to quality and authenticity."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {[
              { title: "Pure Cocoa Butter", desc: "100% pure cocoa butter in every creation. No compromises, no substitutes." },
              { title: "No Hydrogenated Oils", desc: "We never use hydrogenated oils. Only natural, premium ingredients." },
              { title: "Artisan Craftsmanship", desc: "Each piece is handcrafted with generations of expertise and passion." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center"
              >
                <h3 className="font-display text-xl text-foreground mb-3">{item.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <SectionHeading title="Featured Creations" subtitle="Discover our most beloved chocolates." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { img: chocolateHero, name: "Hazelnut Dome", cat: "Pralines" },
              { img: giftBox, name: "Gold Collection", cat: "Gift Boxes" },
              { img: chocolatesBoxes, name: "Signature Assortment", cat: "Assortments" },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Link to="/products" className="group block">
                  <div className="aspect-square overflow-hidden bg-warm-beige">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">{item.cat}</p>
                    <h3 className="font-display text-lg text-foreground mt-1">{item.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-chocolate text-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-gold mb-4">Experience Luxury</p>
            <h2 className="font-display text-3xl md:text-5xl text-primary-foreground font-medium">
              Indulge in Perfection
            </h2>
            <p className="mt-4 font-body text-primary-foreground/50 max-w-lg mx-auto">
              From our hands to yours — every chocolate is a work of art.
            </p>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-3 px-8 py-4 border border-gold text-gold font-body text-sm tracking-[0.2em] uppercase hover:bg-gold hover:text-accent-foreground transition-colors"
            >
              Get in Touch <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
