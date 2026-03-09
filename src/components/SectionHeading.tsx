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
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center mb-16"
  >
    <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-medium ${light ? "text-primary-foreground" : "text-foreground"}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`mt-4 font-body text-base max-w-2xl mx-auto ${light ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
        {subtitle}
      </p>
    )}
    <div className="mt-6 mx-auto w-16 h-[2px] bg-accent" />
  </motion.div>
);

export default SectionHeading;
