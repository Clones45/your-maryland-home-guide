import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Communities", href: "#communities" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-charcoal/90 backdrop-blur-sm">
      <div className="hidden md:flex items-center justify-center gap-6 py-2 text-xs tracking-widest bg-charcoal-light text-warm-white">
        <a href="tel:+14439228458" className="flex items-center gap-1.5 hover:text-gold transition-colors">
          <Phone size={12} />
          (443) 922-8458
        </a>
        <span className="text-gold">|</span>
        <a href="mailto:gayanegevorgyan@boblucidoteam.com" className="flex items-center gap-1.5 hover:text-gold transition-colors">
          <Mail size={12} />
          gayanegevorgyan@boblucidoteam.com
        </a>
      </div>

      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a href="#home" className="font-heading text-2xl md:text-3xl text-warm-white tracking-wide">
          <span className="italic font-medium">Gayane</span>{" "}
          <span className="font-semibold">Gevorgyan</span>
          <span className="block text-[10px] tracking-[0.35em] uppercase font-body font-light text-gold">
            Realtor · Lucido Global
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-xs tracking-[0.2em] uppercase font-body font-medium text-warm-white hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-warm-white hover:text-gold transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-charcoal border-t border-gold/20 animate-fade-in">
          <ul className="flex flex-col items-center py-6 gap-5">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm tracking-[0.2em] uppercase font-body font-medium text-warm-white hover:text-gold transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-3 border-t border-gold/20 w-32 text-center">
              <a href="tel:+14439228458" className="text-xs text-gold">
                (443) 922-8458
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
