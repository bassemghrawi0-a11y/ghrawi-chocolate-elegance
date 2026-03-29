import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Hero from "@/components/Hero";
import chocolateHero from "@/assets/chocolate-hero.png";
import giftBox from "@/assets/gift-box.png";
import chocolatesBoxes from "@/assets/chocolates-boxes.jpg";
import { useLang } from "@/hooks/use-lang";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const Index = () => {
  const { t } = useLang();

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Promise Section */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t("Our Promise", "وعدنا")}
            subtitle={t(
              "Every piece of Basem Ghrawi chocolate is a testament to our unwavering commitment to quality and authenticity.",
              "كل قطعة من شوكولاتة باسم غراوي هي شهادة على التزامنا الراسخ بالجودة والأصالة."
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {[
              { title: t("Pure Cocoa Butter", "زبدة كاكاو نقية"), desc: t("100% pure cocoa butter in every creation. No compromises, no substitutes.", "١٠٠٪ زبدة كاكاو نقية في كل قطعة. بلا تنازلات، بلا بدائل.") },
              { title: t("No Hydrogenated Oils", "بدون زيوت مهدرجة"), desc: t("We never use hydrogenated oils. Only natural, premium ingredients.", "لا نستخدم الزيوت المهدرجة أبداً. فقط مكونات طبيعية فاخرة.") },
              { title: t("Artisan Craftsmanship", "صناعة حرفية"), desc: t("Each piece is handcrafted with generations of expertise and passion.", "كل قطعة مصنوعة يدوياً بخبرة وشغف أجيال.") },
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
          <SectionHeading title={t("Featured Creations", "إبداعات مميزة")} subtitle={t("Discover our most beloved chocolates.", "اكتشف أكثر شوكولاتاتنا المحبوبة.")} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { img: chocolateHero, name: t("Hazelnut Dome", "قبة البندق"), cat: t("Pralines", "برالين") },
              { img: giftBox, name: t("Gold Collection", "المجموعة الذهبية"), cat: t("Gift Boxes", "علب هدايا") },
              { img: chocolatesBoxes, name: t("Signature Assortment", "التشكيلة المميزة"), cat: t("Assortments", "تشكيلات") },
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
                  <div className="aspect-square overflow-hidden bg-light-fill">
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
            <p className="font-body text-sm tracking-[0.3em] uppercase text-gold mb-4">
              {t("Experience Luxury", "عش الفخامة")}
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-primary-foreground font-medium">
              {t("Indulge in Perfection", "انغمس في الكمال")}
            </h2>
            <p className="mt-4 font-body text-primary-foreground/50 max-w-lg mx-auto">
              {t("From our hands to yours — every chocolate is a work of art.", "من أيدينا إلى أيديكم — كل قطعة شوكولاتة هي عمل فني.")}
            </p>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-3 px-8 py-4 border border-fine border-gold text-gold font-body text-sm tracking-[0.2em] uppercase hover:bg-gold hover:text-accent-foreground transition-colors duration-300"
            >
              {t("Get in Touch", "تواصل معنا")} <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
