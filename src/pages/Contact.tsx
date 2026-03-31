import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Facebook, Mail, MapPin } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const reveal = (delayMs = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: delayMs / 1000, duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
});

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="py-section-y bg-cream">
        <div className="container mx-auto px-section-x-mobile md:px-section-x">
          <SectionHeading title="Get in Touch" subtitle="We'd love to hear from you. Reach out for inquiries, orders, or collaborations." />
        </div>
      </section>

      <section className="py-section-y bg-background">
        <div className="container mx-auto px-section-x-mobile md:px-section-x max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-col-gap">
            {/* Form */}
            <motion.div {...reveal(0)}>
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <h3 className="font-display text-[28px] font-normal text-foreground">Thank You</h3>
                  <p className="font-body text-sm font-light text-text-muted-warm">We'll get back to you shortly.</p>
                  <div className="w-16 h-[0.5px] bg-accent" />
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { name: "name", label: "Name", type: "text" },
                    { name: "email", label: "Email", type: "email" },
                    { name: "subject", label: "Subject", type: "text" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block font-body text-[10px] font-normal tracking-[0.28em] uppercase text-text-hint mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        required
                        className="w-full px-internal py-3 bg-cream border border-fine border-foreground/10 font-body text-sm font-light text-foreground focus:outline-none focus:border-accent transition-colors duration-300"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block font-body text-[10px] font-normal tracking-[0.28em] uppercase text-text-hint mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-internal py-3 bg-cream border border-fine border-foreground/10 font-body text-sm font-light text-foreground focus:outline-none focus:border-accent transition-colors duration-300 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="group relative w-full inline-flex items-center justify-center overflow-hidden bg-foreground font-body text-[11px] font-medium tracking-[0.22em] uppercase text-background transition-colors duration-400"
                  >
                    <span
                      className="absolute inset-0 origin-left bg-accent scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-x-100"
                      aria-hidden
                    />
                    <span className="relative z-[1] px-8 py-3.5 transition-colors duration-400 group-hover:text-accent-foreground">
                      Send Message
                    </span>
                  </button>
                </form>
              )}
            </motion.div>

            {/* Info */}
            <motion.div {...reveal(120)} className="space-y-10">
              <div>
                <h3 className="font-display text-[28px] font-normal text-foreground mb-6">Connect With Us</h3>
                <div className="w-16 h-[0.5px] bg-accent mb-8" />
              </div>

              <div className="flex items-start gap-4">
                <Mail size={18} className="text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-body text-[10px] font-normal tracking-[0.28em] uppercase text-text-hint mb-1">Email</p>
                  <p className="font-body text-sm font-light text-foreground">info@basemghrawi.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin size={18} className="text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-body text-[10px] font-normal tracking-[0.28em] uppercase text-text-hint mb-1">Location</p>
                  <p className="font-body text-sm font-light text-foreground">Lebanon</p>
                </div>
              </div>

              <div>
                <p className="font-body text-[10px] font-normal tracking-[0.28em] uppercase text-text-hint mb-4">Follow Us</p>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/basemghrawi_chocolate"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-foreground hover:text-accent transition-colors duration-300 font-body text-sm font-light"
                  >
                    <Instagram size={18} /> Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/basemghrawichocolate"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-foreground hover:text-accent transition-colors duration-300 font-body text-sm font-light"
                  >
                    <Facebook size={18} /> Facebook
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
