import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/hooks/use-lang";
import { useCartStore } from "@/stores/cart-store";

const navLinks = [
  { to: "/products", en: "Collections", ar: "المجموعات" },
  { to: "/products?cat=Gift+Boxes", en: "Gifting", ar: "إهداء" },
  { to: "/about", en: "Our Story", ar: "قصتنا" },
  { to: "/contact", en: "Order Now", ar: "اطلب الآن" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAr, toggleLang, t } = useLang();
  const location = useLocation();
  const navigate = useNavigate();
  const itemCount = useCartStore((s) => s.getItemCount());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-fine border-foreground/10 ${
        scrolled ? "bg-background/96 backdrop-blur-sm" : "bg-background"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-[72px] px-section-x-mobile md:px-section-x">
        <Link to="/" className="flex flex-col items-start gap-0 leading-none">
          <span className="font-display text-lg tracking-[0.12em] text-foreground font-light">
            Basem Ghrawi
          </span>
          <span className="font-body text-[9px] font-normal tracking-[0.3em] uppercase text-text-hint">
            CHOCOLATE · شوكولاتة
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative font-body text-[11px] font-normal tracking-[0.18em] uppercase transition-colors duration-300 hover:text-foreground group ${
                location.pathname === link.to ? "text-foreground" : "text-text-hint"
              }`}
            >
              {isAr ? link.ar : link.en}
              <span className="absolute left-0 -bottom-1 h-[0.5px] w-0 bg-foreground transition-all duration-400 ease-out group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="font-body text-[10px] font-normal tracking-[0.14em] text-text-hint border border-fine border-foreground/10 px-3 py-1.5 hover:text-foreground hover:border-foreground/20 transition-colors duration-300"
          >
            EN · AR
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="relative text-text-hint hover:text-foreground transition-colors duration-300"
            aria-label="Cart"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-accent flex items-center justify-center font-display text-[10px] font-medium text-white leading-none">
                {itemCount}
              </span>
            )}
          </button>
          <a
            href="https://wa.me/message"
            target="_blank"
            rel="noreferrer"
            className="text-text-hint hover:text-foreground transition-colors duration-300"
            aria-label="WhatsApp"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden bg-background border-b border-fine border-foreground/10 overflow-hidden"
          >
            <div className="flex flex-col items-center py-8 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`font-body text-[11px] font-normal tracking-[0.18em] uppercase transition-colors duration-300 ${
                    location.pathname === link.to ? "text-foreground" : "text-text-hint"
                  }`}
                >
                  {isAr ? link.ar : link.en}
                </Link>
              ))}
              <div className="flex items-center gap-4 mt-2">
                <button
                  onClick={toggleLang}
                  className="font-body text-[10px] font-normal tracking-[0.14em] text-text-hint border border-fine border-foreground/10 px-3 py-1.5"
                >
                  EN · AR
                </button>
                <a href="https://wa.me/message" target="_blank" rel="noreferrer" className="text-text-hint" aria-label="WhatsApp">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
