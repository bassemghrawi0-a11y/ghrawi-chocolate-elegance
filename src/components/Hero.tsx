import { Link } from "react-router-dom";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useRef } from "react";
import { useLang } from "@/hooks/use-lang";
import chocolateHero from "@/assets/chocolate-hero.png";

const anim = (delayMs: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.65,
    ease: [0.22, 1, 0.36, 1] as const,
    delay: delayMs / 1000,
  },
});

const Hero = () => {
  const { isAr, t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  const boxTX = useMotionValue(0);
  const boxTY = useMotionValue(0);
  const badgeTX = useMotionValue(0);
  const badgeTY = useMotionValue(0);
  const springOpts = { stiffness: 28, damping: 17, mass: 0.42 };
  const boxX = useSpring(boxTX, springOpts);
  const boxY = useSpring(boxTY, springOpts);
  const badgeSpring = { stiffness: 36, damping: 15, mass: 0.32 };
  const badgeX = useSpring(badgeTX, badgeSpring);
  const badgeY = useSpring(badgeTY, badgeSpring);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      boxTX.set(nx * 14);
      boxTY.set(ny * 10);
      badgeTX.set(nx * 22);
      badgeTY.set(ny * 16);
    },
    [boxTX, boxTY, badgeTX, badgeTY]
  );

  const handlePointerLeave = useCallback(() => {
    boxTX.set(0);
    boxTY.set(0);
    badgeTX.set(0);
    badgeTY.set(0);
  }, [boxTX, boxTY, badgeTX, badgeTY]);

  const boxTransform = useMotionTemplate`translate3d(${boxX}px, ${boxY}px, 0)`;
  const badgeTransform = useMotionTemplate`translate3d(${badgeX}px, ${badgeY}px, 0)`;

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="min-h-[90vh] flex items-center pt-[72px] bg-background"
    >
      <div className="container mx-auto px-section-x-mobile md:px-section-x">
        <div className="grid grid-cols-1 md:grid-cols-[55fr_45fr] gap-comp-gap md:gap-col-gap items-center">
          {/* Left column */}
          <div className="flex flex-col gap-0 order-1">
            <motion.p
              {...anim(0)}
              className="font-body text-[10px] font-normal tracking-[0.28em] uppercase text-text-hint mb-6"
            >
              {t("— Artisan Chocolate · صُنع بعناية", "— شوكولاتة حرفية · صُنع بعناية")}
            </motion.p>

            <motion.h1
              {...anim(120)}
              className="font-display text-[42px] md:text-[60px] font-light leading-[1.05] tracking-[-0.01em] text-foreground mb-6"
            >
              {isAr ? (
                <span className="font-arabic">الشوكولاتة الحقيقية تُصنع هكذا</span>
              ) : (
                <>
                  Real Chocolate Is{" "}
                  <br className="hidden md:block" />
                  Made{" "}
                  <span className="font-display font-light italic tracking-tight text-foreground">
                    Like This.
                  </span>
                </>
              )}
            </motion.h1>

            <motion.p
              {...anim(240)}
              className="font-body text-sm font-light leading-[1.85] text-text-muted-warm max-w-[380px] mb-10"
            >
              {t(
                "100% pure cocoa butter. No hydrogenated oils. Every piece is crafted to reflect what chocolate truly tastes like — felt before it's even tasted.",
                "١٠٠٪ زبدة كاكاو نقية. بدون زيوت مهدرجة. كل قطعة صُنعت لتعكس المذاق الحقيقي للشوكولاتة — تُحَسّ قبل أن تُذاق."
              )}
            </motion.p>

            <div className="flex items-center gap-6">
              <motion.div {...anim(360)}>
                <Link
                  to="/products"
                  className="group relative inline-flex overflow-hidden border-fine border border-foreground/10 bg-foreground font-body text-[11px] font-medium tracking-[0.22em] uppercase text-background transition-[border-color] duration-400 hover:border-accent/40"
                >
                  <span
                    className="absolute inset-0 origin-left bg-accent scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-x-100"
                    aria-hidden
                  />
                  <span className="relative z-[1] px-8 py-3.5 transition-colors duration-400 group-hover:text-accent-foreground">
                    {t("Explore Collections", "استكشف المجموعات")}
                  </span>
                </Link>
              </motion.div>

              <motion.div {...anim(480)}>
                <Link
                  to="/about"
                  className="relative inline-block font-body text-sm text-text-hint transition-colors duration-300 hover:text-foreground after:absolute after:bottom-0 after:left-1/2 after:h-[0.5px] after:w-full after:max-w-full after:-translate-x-1/2 after:origin-center after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100"
                >
                  {t("Our Story →", "قصتنا →")}
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right column */}
          <div className="relative order-2 flex justify-center md:justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative isolate"
            >
              <div className="w-[320px] md:w-[480px] h-[400px] md:h-[460px] bg-light-fill overflow-hidden border-fine border border-foreground/[0.08]">
                {chocolateHero ? (
                  <img
                    src={chocolateHero}
                    alt={t("Basem Ghrawi premium chocolate", "شوكولاتة باسم غراوي الفاخرة")}
                    className="h-full w-full object-cover animate-ken-burns will-change-transform contrast-[1.04] saturate-[1.1] [backface-visibility:hidden]"
                    style={{ transformOrigin: "50% 55%" }}
                  />
                ) : (
                  <div className="h-full w-full bg-light-fill flex items-center justify-center">
                    <span className="font-body text-[11px] font-light tracking-[0.15em] text-text-hint">Hero Image</span>
                  </div>
                )}
              </div>

              <motion.div
                style={{ transform: boxTransform }}
                className="absolute -bottom-6 -left-6 md:-left-10 z-10 bg-background border-fine border border-foreground/10 px-5 py-4"
              >
                <p className="font-body text-[10px] font-normal tracking-[0.2em] uppercase text-text-hint mb-1">
                  {t("Core Ingredient", "المكوّن الأساسي")}
                </p>
                <p className="font-display text-[22px] md:text-[26px] text-foreground font-light">
                  {t("100% Cocoa Butter", "١٠٠٪ زبدة كاكاو")}
                </p>
              </motion.div>

              <motion.div
                style={{ transform: badgeTransform }}
                className="absolute -top-4 -right-4 md:-top-5 md:-right-5 z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full border-fine border border-foreground/10 bg-accent"
              >
                <p className="font-body text-[8px] text-accent-foreground uppercase leading-[1.4] text-center px-2 font-medium">
                  {t("Zero Hydrogenated Oils", "صفر زيوت مهدرجة")}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
