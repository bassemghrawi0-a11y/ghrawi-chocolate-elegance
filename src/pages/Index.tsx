import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Collections from "@/components/Collections";
import { useLang } from "@/hooks/use-lang";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const Index = () => {
  const { t } = useLang();

  return (
    <div className="min-h-screen">
      <Hero />
      <Philosophy />

      {/* Promise Section */}
      <section className="py-section-y bg-cream">
        <div className="container mx-auto px-section-x-mobile md:px-section-x">
          <SectionHeading
            title={t("Our Promise", "وعدنا")}
            subtitle={t(
              "Every piece of Basem Ghrawi chocolate is a testament to our unwavering commitment to quality and authenticity.",
              "كل قطعة من شوكولاتة باسم غراوي هي شهادة على التزامنا الراسخ بالجودة والأصالة."
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-col-gap max-w-4xl mx-auto">
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
                viewport={{ once: true, margin: "-60px" }}
                className="text-center"
              >
                <h3 className="font-display text-[24px] font-normal text-foreground mb-3">{item.title}</h3>
                <p className="font-body text-sm font-light text-text-muted-warm leading-[1.85]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <Collections />

      {/* CTA — dark section (only one on page) */}
      <section className="py-section-y bg-foreground text-center">
        <div className="container mx-auto px-section-x-mobile md:px-section-x">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-body text-[10px] font-normal tracking-[0.28em] uppercase text-accent mb-4">
              {t("Experience Luxury", "عش الفخامة")}
            </p>
            <h2 className="font-display text-[38px] md:text-[44px] font-light text-primary-foreground leading-[1.12]">
              {t("Indulge in Perfection", "انغمس في الكمال")}
            </h2>
            <p className="mt-4 font-body text-sm font-light text-primary-foreground/40 max-w-lg mx-auto leading-[1.85]">
              {t("From our hands to yours — every chocolate is a work of art.", "من أيدينا إلى أيديكم — كل قطعة شوكولاتة هي عمل فني.")}
            </p>
            <Link
              to="/contact"
              className="mt-10 group relative inline-flex overflow-hidden border-fine border border-accent text-accent font-body text-[11px] font-medium tracking-[0.22em] uppercase transition-colors duration-400"
            >
              <span
                className="absolute inset-0 origin-left bg-accent scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-x-100"
                aria-hidden
              />
              <span className="relative z-[1] px-8 py-3.5 transition-colors duration-400 group-hover:text-accent-foreground flex items-center gap-3">
                {t("Get in Touch", "تواصل معنا")} <ArrowRight size={14} />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
