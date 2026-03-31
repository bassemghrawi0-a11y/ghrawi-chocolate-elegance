import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle?: string;
  light?: boolean;
}

const SectionHeading = ({ title, subtitle, light }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    className="text-center mb-16"
  >
    <h2 className={`font-display text-[38px] md:text-[44px] font-light leading-[1.12] ${light ? "text-primary-foreground" : "text-foreground"}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`mt-4 font-body text-sm font-light max-w-2xl mx-auto leading-[1.85] ${light ? "text-primary-foreground/50" : "text-text-muted-warm"}`}>
        {subtitle}
      </p>
    )}
    <div className="mt-6 mx-auto w-16 h-[0.5px] bg-accent" />
  </motion.div>
);

export default SectionHeading;
