import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import chocolatesBoxes from "@/assets/chocolates-boxes.jpg";
import giftBox from "@/assets/gift-box.png";

const About = () => (
  <div className="min-h-screen pt-20">
    {/* Hero */}
    <section className="relative py-32 bg-chocolate overflow-hidden">
      <div className="absolute inset-0">
        <img src={chocolatesBoxes} alt="" className="w-full h-full object-cover opacity-20" />
      </div>
      <div className="relative container mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-body text-sm tracking-[0.4em] uppercase text-gold mb-4"
        >
          Our Story
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-4xl md:text-6xl text-primary-foreground font-medium"
        >
          A Legacy of Excellence
        </motion.h1>
      </div>
    </section>

    {/* Story */}
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img src={giftBox} alt="Basem Ghrawi gift box" className="w-full aspect-square object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-display text-3xl text-foreground">The Basem Ghrawi Heritage</h2>
            <div className="w-12 h-[2px] bg-accent" />
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              For generations, the Ghrawi family has been synonymous with the finest chocolates. Our journey began with a simple belief: that chocolate should be made only with the purest ingredients.
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              Today, Basem Ghrawi continues this tradition, using 100% pure cocoa butter and never compromising with hydrogenated oils. Every piece is a tribute to the art of chocolate-making.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Craftsmanship */}
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        <SectionHeading title="Our Craftsmanship" subtitle="Behind every piece lies a meticulous process perfected over generations." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {[
            { step: "01", title: "Selection", desc: "We source only the finest cocoa beans and premium ingredients from trusted origins." },
            { step: "02", title: "Creation", desc: "Master chocolatiers transform raw ingredients into exquisite pralines and truffles by hand." },
            { step: "03", title: "Presentation", desc: "Each piece is carefully packaged in elegant boxes, ready to delight and impress." },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <span className="font-display text-5xl text-accent/30">{item.step}</span>
              <h3 className="font-display text-xl text-foreground mt-4 mb-3">{item.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
