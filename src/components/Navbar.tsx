import { useState, useEffect } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-6"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <a href="#home" className="group">
          <div className={`font-heading text-2xl md:text-3xl tracking-wide transition-colors duration-300 ${isScrolled ? "text-charcoal" : "text-white"}`}>
            <span className="font-medium">Gayane</span>{" "}
            <span className="font-bold text-gold">Gevorgyan</span>
          </div>
          <div className={`h-[1px] w-12 bg-gold mt-1 transition-all duration-500 group-hover:w-full`}></div>
          <span className={`block text-[10px] tracking-[0.3em] uppercase font-body font-medium mt-1 ${isScrolled ? "text-charcoal-light" : "text-gray-200"}`}>
            Realtor · Lucido Global
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`text-xs tracking-[0.2em] uppercase font-body font-medium relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full ${isScrolled ? "text-charcoal hover:text-gold" : "text-white hover:text-gold"
                  }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className={`h-4 w-[1px] bg-gold/50`}></li>
          <li>
            <a href="tel:+14439228458" className={`flex items-center gap-2 text-xs tracking-wider transition-colors ${isScrolled ? "text-charcoal hover:text-gold" : "text-white hover:text-gold"}`}>
              <Phone size={14} className="text-gold" />
              <span>(443) 922-8458</span>
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden transition-colors ${isScrolled ? "text-charcoal" : "text-white"}`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full justify-center items-center gap-8">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-8 right-6 text-charcoal hover:text-gold transition-colors"
          >
            <X size={32} />
          </button>
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl text-charcoal">Gayane <span className="text-gold">Gevorgyan</span></h2>
            <div className="w-16 h-[1px] bg-gold mx-auto my-4"></div>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-xl tracking-[0.2em] uppercase font-body font-light text-charcoal hover:text-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-8 flex flex-col items-center gap-4">
            <a href="tel:+14439228458" className="text-sm tracking-widest text-charcoal-light flex items-center gap-2">
              <Phone size={16} className="text-gold" /> (443) 922-8458
            </a>
            <a href="mailto:gayanegevorgyan@boblucidoteam.com" className="text-sm tracking-widest text-charcoal-light flex items-center gap-2">
              <Mail size={16} className="text-gold" /> Email Me
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
