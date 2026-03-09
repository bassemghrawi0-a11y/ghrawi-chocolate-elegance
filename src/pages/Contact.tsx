import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Facebook, Mail, MapPin } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-6">
          <SectionHeading title="Get in Touch" subtitle="We'd love to hear from you. Reach out for inquiries, orders, or collaborations." />
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <h3 className="font-display text-2xl text-foreground">Thank You</h3>
                  <p className="font-body text-muted-foreground">We'll get back to you shortly.</p>
                  <div className="w-12 h-[2px] bg-accent" />
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { name: "name", label: "Name", type: "text" },
                    { name: "email", label: "Email", type: "email" },
                    { name: "subject", label: "Subject", type: "text" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        required
                        className="w-full px-4 py-3 bg-cream border border-border font-body text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-cream border border-border font-body text-sm text-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-accent text-accent-foreground font-body text-sm tracking-[0.2em] uppercase hover:bg-accent/90 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-10"
            >
              <div>
                <h3 className="font-display text-2xl text-foreground mb-6">Connect With Us</h3>
                <div className="w-12 h-[2px] bg-accent mb-8" />
              </div>

              <div className="flex items-start gap-4">
                <Mail size={20} className="text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">Email</p>
                  <p className="font-body text-sm text-foreground">info@basemghrawi.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">Location</p>
                  <p className="font-body text-sm text-foreground">Lebanon</p>
                </div>
              </div>

              <div>
                <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">Follow Us</p>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/basemghrawi_chocolate"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-foreground hover:text-accent transition-colors font-body text-sm"
                  >
                    <Instagram size={18} /> Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/basemghrawichocolate"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-foreground hover:text-accent transition-colors font-body text-sm"
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
