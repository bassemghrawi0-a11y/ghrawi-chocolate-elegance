import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";
import logo from "@/assets/logo.svg";

const Footer = () => (
  <footer className="bg-foreground py-section-y">
    <div className="container mx-auto px-section-x-mobile md:px-section-x">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-col-gap items-start">
        <div className="flex flex-col items-center md:items-start gap-4">
          <img src={logo} alt="Basem Ghrawi" className="h-16 w-auto brightness-0 invert opacity-80" />
          <p className="font-body text-sm font-light text-primary-foreground/50 text-center md:text-left max-w-xs leading-[1.85]">
            Crafting moments of pure indulgence with 100% cocoa butter since generations.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <h4 className="font-display text-primary-foreground/70 text-lg font-light">Navigate</h4>
          {["Home", "Products", "About", "Contact"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="font-body text-[11px] font-normal text-primary-foreground/40 hover:text-accent transition-colors duration-300 tracking-[0.18em] uppercase"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <h4 className="font-display text-primary-foreground/70 text-lg font-light">Follow Us</h4>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/basemghrawi_chocolate" target="_blank" rel="noreferrer" className="text-primary-foreground/40 hover:text-accent transition-colors duration-300">
              <Instagram size={20} />
            </a>
            <a href="https://www.facebook.com/basemghrawichocolate" target="_blank" rel="noreferrer" className="text-primary-foreground/40 hover:text-accent transition-colors duration-300">
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-fine border-primary-foreground/10 text-center">
        <p className="font-body text-[11px] font-normal text-primary-foreground/30 tracking-[0.14em] uppercase">
          © {new Date().getFullYear()} Basem Ghrawi Chocolate. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
