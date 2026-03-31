import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import chocolatesBoxes from "@/assets/chocolates-boxes.jpg";
import giftBox from "@/assets/gift-box.png";

const reveal = (delayMs = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { delay: delayMs / 1000, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
});

const About = () => (
  <div className="min-h-screen pt-20">
    {/* Hero */}
    <section className="relative py-section-y bg-foreground overflow-hidden">
      <div className="absolute inset-0">
        {chocolatesBoxes ? (
          <img src={chocolatesBoxes} alt="" className="w-full h-full object-cover opacity-20" />
        ) : (
          <div className="w-full h-full bg-light-fill" />
        )}
      </div>
      <div className="relative container mx-auto px-section-x-mobile md:px-section-x text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="font-body text-[10px] font-normal tracking-[0.28em] uppercase text-accent mb-4"
        >
          Our Story
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[42px] md:text-[56px] font-light text-primary-foreground leading-[1.05] tracking-[-0.01em]"
        >
          A Legacy of Excellence
        </motion.h1>
      </div>
    </section>

    {/* Story */}
    <section className="py-section-y bg-background">
      <div className="container mx-auto px-section-x-mobile md:px-section-x max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-col-gap items-center">
          <motion.div {...reveal(0)}>
            {giftBox ? (
              <img src={giftBox} alt="Basem Ghrawi gift box" className="w-full aspect-square object-cover" />
            ) : (
              <div className="w-full aspect-square bg-light-fill flex items-center justify-center">
                <span className="font-body text-[11px] font-light tracking-[0.15em] text-text-hint">Product Photo</span>
              </div>
            )}
          </motion.div>
          <motion.div {...reveal(120)} className="space-y-6">
            <h2 className="font-display text-[28px] font-normal text-foreground leading-[1.12]">The Basem Ghrawi Heritage</h2>
            <div className="w-16 h-[0.5px] bg-accent" />
            <p className="font-body text-sm font-light text-text-muted-warm leading-[1.85]">
              For generations, the Ghrawi family has been synonymous with the finest chocolates. Our journey began with a simple belief: that chocolate should be made only with the purest ingredients.
            </p>
            <p className="font-body text-sm font-light text-text-muted-warm leading-[1.85]">
              Today, Basem Ghrawi continues this tradition, using 100% pure cocoa butter and never compromising with hydrogenated oils. Every piece is a tribute to the art of chocolate-making.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Craftsmanship */}
    <section className="py-section-y bg-cream">
      <div className="container mx-auto px-section-x-mobile md:px-section-x">
        <SectionHeading title="Our Craftsmanship" subtitle="Behind every piece lies a meticulous process perfected over generations." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-col-gap max-w-5xl mx-auto">
          {[
            { step: "01", title: "Selection", desc: "We source only the finest cocoa beans and premium ingredients from trusted origins." },
            { step: "02", title: "Creation", desc: "Master chocolatiers transform raw ingredients into exquisite pralines and truffles by hand." },
            { step: "03", title: "Presentation", desc: "Each piece is carefully packaged in elegant boxes, ready to delight and impress." },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              {...reveal(i * 120)}
              className="text-center"
            >
              <span className="font-display text-[48px] font-light text-accent/30">{item.step}</span>
              <h3 className="font-display text-[24px] font-normal text-foreground mt-4 mb-3">{item.title}</h3>
              <p className="font-body text-sm font-light text-text-muted-warm leading-[1.85]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
