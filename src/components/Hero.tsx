import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLang } from "@/hooks/use-lang";
import chocolateHero from "@/assets/chocolate-hero.png";

const anim = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const, delay: delay / 1000 },
});

const Hero = () => {
  const { isAr, t } = useLang();

  return (
    <section className="min-h-[90vh] flex items-center pt-[72px] bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[55fr_45fr] gap-12 md:gap-16 items-center">
          {/* Left column */}
          <div className="flex flex-col gap-0 order-1">
            {/* Eyebrow */}
            <motion.p
              {...anim(0)}
              className="font-body text-[10px] tracking-[0.28em] uppercase text-mid-tone mb-6"
            >
              {t("— Artisan Chocolate · صُنع بعناية", "— شوكولاتة حرفية · صُنع بعناية")}
            </motion.p>

            {/* Headline */}
            <motion.h1
              {...anim(120)}
              className="font-display text-[42px] md:text-[64px] font-light leading-[1.05] text-foreground mb-6"
            >
              {isAr ? (
                <span className="font-arabic">الشوكولاتة الحقيقية تُصنع هكذا</span>
              ) : (
                <>
                  Real Chocolate Is{" "}
                  <br className="hidden md:block" />
                  Made <em className="italic">Like This.</em>
                </>
              )}
            </motion.h1>

            {/* Body */}
            <motion.p
              {...anim(240)}
              className="font-body text-sm font-light leading-[1.85] text-muted-foreground max-w-[380px] mb-8"
            >
              {t(
                "100% pure cocoa butter. No hydrogenated oils. Every piece is crafted to reflect what chocolate truly tastes like — felt before it's even tasted.",
                "١٠٠٪ زبدة كاكاو نقية. بدون زيوت مهدرجة. كل قطعة صُنعت لتعكس المذاق الحقيقي للشوكولاتة — تُحَسّ قبل أن تُذاق."
              )}
            </motion.p>

            {/* CTAs */}
            <motion.div {...anim(360)} className="flex items-center gap-6">
              <Link
                to="/products"
                className="inline-block bg-foreground text-background font-body text-[11px] font-medium tracking-[0.22em] uppercase px-7 py-3.5 hover:bg-accent transition-colors duration-300"
              >
                {t("Explore Collections", "استكشف المجموعات")}
              </Link>
              <Link
                to="/about"
                className="font-body text-sm text-mid-tone hover:text-foreground transition-colors duration-300"
              >
                {t("Our Story →", "قصتنا →")}
              </Link>
            </motion.div>
          </div>

          {/* Right column */}
          <div className="relative order-2 flex justify-center md:justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Main image */}
              <div className="w-[320px] md:w-[480px] h-[400px] md:h-[560px] bg-light-fill overflow-hidden">
                <img
                  src={chocolateHero}
                  alt={t("Basem Ghrawi premium chocolate", "شوكولاتة باسم غراوي الفاخرة")}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 md:-left-10 bg-background border-fine border border-foreground/10 px-5 py-4 z-10">
                <p className="font-body text-[10px] tracking-[0.2em] uppercase text-mid-tone mb-1">
                  {t("Core Ingredient", "المكوّن الأساسي")}
                </p>
                <p className="font-display text-[22px] md:text-[26px] text-foreground font-normal">
                  {t("100% Cocoa Butter", "١٠٠٪ زبدة كاكاو")}
                </p>
              </div>

              {/* Round badge */}
              <div className="absolute -top-4 -right-4 md:-top-5 md:-right-5 w-[72px] h-[72px] rounded-full bg-accent flex items-center justify-center z-10">
                <p className="font-body text-[8px] text-accent-foreground uppercase leading-[1.4] text-center px-2 font-medium">
                  {t("Zero Hydrogenated Oils", "صفر زيوت مهدرجة")}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
