import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Instagram, ChevronDown } from "lucide-react";


const primaryLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/About" },
  { label: "Services", to: "/Services" },
  { label: "Properties", to: "/Properties" },
  { label: "Communities", to: "/Communities" },
  { label: "Contact", to: "/Contact" },
];

const resourceLinks = [
  { label: "Buyer's Guide", to: "/Buyers" },
  { label: "Seller's Guide", to: "/Sellers" },
  { label: "Market Reports", to: "/Market-Reports" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLLIElement>(null);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 50);
      if (currentY > 80) {
        setIsHidden(currentY > lastScrollY.current);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setResourcesOpen(false);
  }, [location.pathname]);

  // Close resources dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  const isResourceActive = resourceLinks.some((l) => location.pathname.startsWith(l.to));

  const isHome = location.pathname === "/";
  // On inner pages the navbar is always solid; on home it transitions on scroll
  const isSolid = !isHome || isScrolled || isOpen;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out
          ${isSolid ? "bg-white/95 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-6"}
          ${isHidden && !isOpen ? "opacity-0 -translate-y-full pointer-events-none" : "opacity-100 translate-y-0"}
        `}
      >
        <div className="container mx-auto flex items-center justify-between px-6">
          <Link to="/" className="group flex items-center gap-4">
            <div className="flex flex-col">
              <div
                className={`font-heading text-xl lg:text-2xl xl:text-3xl tracking-wide transition-colors duration-300 ${isSolid ? "text-charcoal" : "text-white"
                  }`}
              >
                <span className="font-medium">Gayane</span>{" "}
                <span className="font-bold text-gold">Gevorgyan</span>
              </div>
              <div className="h-[1px] w-12 bg-gold mt-1 transition-all duration-500 group-hover:w-full"></div>
              <span
                className={`hidden xl:block text-[10px] tracking-[0.3em] uppercase font-body font-medium mt-1 ${isSolid ? "text-charcoal-light" : "text-gray-200"
                  }`}
              >
                <span className="hidden 2xl:inline">REALTOR<sup>®</sup> · Bob Lucido Team of Keller Williams Lucido Agency</span>
                <span className="2xl:hidden">REALTOR<sup>®</sup> · KW Lucido Agency</span>
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-3 xl:gap-6">
            {primaryLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className={`text-xs tracking-[0.2em] uppercase font-body font-medium relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300 ${isActive(link.to)
                    ? "after:w-full text-gold"
                    : `after:w-0 hover:after:w-full ${isSolid
                      ? "text-charcoal hover:text-gold"
                      : "text-white hover:text-gold"
                    }`
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Resources dropdown */}
            <li ref={resourcesRef} className="relative">
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className={`flex items-center gap-1 text-xs tracking-[0.2em] uppercase font-body font-medium py-1 transition-colors ${isResourceActive ? "text-gold" : isSolid ? "text-charcoal hover:text-gold" : "text-white hover:text-gold"}`}
              >
                Guides
                <ChevronDown size={12} className={`transition-transform duration-300 ${resourcesOpen ? "rotate-180" : ""}`} />
              </button>
              {resourcesOpen && (
                <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-white shadow-lg border border-gold/10 min-w-[180px] z-50">
                  {resourceLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      className={`block px-5 py-3 text-xs tracking-[0.15em] uppercase font-body font-medium border-b border-gold/5 last:border-0 transition-colors ${isActive(link.to) ? "text-gold bg-cream" : "text-charcoal hover:text-gold hover:bg-cream"}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li className="h-4 w-[1px] bg-gold/50 hidden xl:block"></li>
            <li className="hidden xl:block">
              <a
                href="tel:+14439228458"
                className={`flex items-center gap-2 text-xs tracking-wider transition-colors whitespace-nowrap ${isSolid ? "text-charcoal hover:text-gold" : "text-white hover:text-gold"}`}
              >
                <Phone size={14} className="text-gold" />
                <span>(443) 922-8458</span>
              </a>
            </li>
            <li className="hidden xl:block">
              <a
                href="#"
                aria-label="Instagram"
                className={`flex items-center transition-colors hover:text-gold ${isSolid ? "text-charcoal" : "text-white"}`}
              >
                <Instagram size={16} className="text-gold" />
              </a>
            </li>
          </ul>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden transition-colors ${isSolid ? "text-charcoal" : "text-white"}`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — outside <nav> so z-[60] works globally above everything */}
      <div
        className={`fixed inset-0 bg-white z-[60] transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full justify-center items-center gap-6 overflow-y-auto py-16">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-8 right-6 text-charcoal hover:text-gold transition-colors"
          >
            <X size={32} />
          </button>
          <div className="text-center mb-4">
            <h2 className="font-heading text-3xl text-charcoal">
              Gayane <span className="text-gold">Gevorgyan</span>
            </h2>
            <div className="w-16 h-[1px] bg-gold mx-auto my-4"></div>
          </div>
          {primaryLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`text-xl tracking-[0.2em] uppercase font-body font-light transition-colors ${isActive(link.to) ? "text-gold" : "text-charcoal hover:text-gold"
                }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="w-12 h-[1px] bg-gold/30 my-2" />
          <p className="text-[10px] tracking-[0.3em] uppercase font-body text-gold font-semibold">Guides &amp; Resources</p>
          {resourceLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`text-base tracking-[0.15em] uppercase font-body font-light transition-colors ${isActive(link.to) ? "text-gold" : "text-charcoal hover:text-gold"
                }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-6 flex flex-col items-center gap-4">
            <a
              href="tel:+14439228458"
              className="text-sm tracking-widest text-charcoal-light flex items-center gap-2"
            >
              <Phone size={16} className="text-gold" /> (443) 922-8458
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
