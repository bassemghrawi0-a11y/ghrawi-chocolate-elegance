import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";
import logo from "@/assets/logo.svg";

const Footer = () => (
  <footer className="bg-chocolate py-16">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <div className="flex flex-col items-center md:items-start gap-4">
          <img src={logo} alt="Basem Ghrawi" className="h-16 w-auto brightness-0 invert opacity-80" />
          <p className="font-body text-sm text-primary-foreground/60 text-center md:text-left max-w-xs">
            Crafting moments of pure indulgence with 100% cocoa butter since generations.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <h4 className="font-display text-primary-foreground/80 text-lg">Navigate</h4>
          {["Home", "Products", "About", "Contact"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="font-body text-sm text-primary-foreground/50 hover:text-gold transition-colors tracking-widest uppercase"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <h4 className="font-display text-primary-foreground/80 text-lg">Follow Us</h4>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/basemghrawi_chocolate" target="_blank" rel="noreferrer" className="text-primary-foreground/50 hover:text-gold transition-colors">
              <Instagram size={22} />
            </a>
            <a href="https://www.facebook.com/basemghrawichocolate" target="_blank" rel="noreferrer" className="text-primary-foreground/50 hover:text-gold transition-colors">
              <Facebook size={22} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center">
        <p className="font-body text-xs text-primary-foreground/40 tracking-widest uppercase">
          © {new Date().getFullYear()} Basem Ghrawi Chocolate. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
