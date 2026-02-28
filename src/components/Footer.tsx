import { Instagram, Linkedin, Facebook, Phone, Mail, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";
import { useSeoStats } from "@/hooks/useSeoStats";
import kwLogo from "@/assets/KwLogo.png";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/gayane.gevorgyan.724473", label: "Facebook" },
];

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Communities", to: "/communities" },
  { label: "Contact", to: "/contact" },
];

const resourceLinks = [
  { label: "Buyer's Guide", to: "/buyers" },
  { label: "Seller's Guide", to: "/sellers" },
  { label: "Market Reports", to: "/market-reports" },
];

const Footer = () => {
  const { stats } = useSeoStats();
  return (
    <footer className="py-16 bg-charcoal">
      <div className="container mx-auto px-6">
        <Reveal width="100%">
          <div className="grid md:grid-cols-4 gap-10 mb-12 border-b border-warm-white/10 pb-12">
            {/* Brand column */}
            <div className="md:col-span-1">
              <p className="font-heading text-2xl text-warm-white mb-1">
                <span className="italic font-medium">Gayane</span>{" "}
                <span className="font-semibold">Gevorgyan</span>
              </p>
              <p className="text-[10px] tracking-[0.35em] uppercase font-body text-gold mb-4">
                REALTOR<sup>®</sup> · Keller Williams Lucido Agency
              </p>
              {/* Live Rank badge — only shown when data is available */}
              {stats?.localPackRank != null && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gold/10 border border-gold/30 text-gold text-[10px] tracking-[0.2em] uppercase font-body font-semibold">
                    <MapPin size={10} className="shrink-0" />
                    Google #{stats.localPackRank} Local Pack
                  </span>
                  {stats.rating != null && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gold/10 border border-gold/30 text-gold text-[10px] tracking-[0.15em] font-body font-semibold">
                      <Star size={10} className="shrink-0 fill-gold" />
                      {stats.rating.toFixed(1)}
                      {stats.reviewCount != null && (
                        <span className="text-warm-white/70 ml-0.5">({stats.reviewCount})</span>
                      )}
                    </span>
                  )}
                </div>
              )}
              <p className="text-xs font-body text-warm-white/90 leading-relaxed mb-6">
                Licensed Maryland REALTOR® with Keller Williams Lucido Agency (Bob Lucido Team), serving Central Maryland, Ellicott City, Columbia, Laurel, Severn, and beyond with heart-led, results-driven service.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 border border-warm-white/30 flex items-center justify-center text-warm-white/80 hover:border-gold hover:text-gold transition-all duration-300 hover:scale-110"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigate column */}
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold text-gold mb-5">
                Navigate
              </p>
              <ul className="space-y-3">
                {navLinks.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm font-body text-warm-white/90 hover:text-gold transition-colors duration-300"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Client Reviews column — only rendered when we have review data */}
            {stats?.reviews && stats.reviews.length > 0 && (
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold text-gold mb-5">
                  Client Reviews
                </p>
                <ul className="space-y-4">
                  {stats.reviews.slice(0, 3).map((review, i) => (
                    <li key={i} className="border-l border-gold/20 pl-3">
                      <div className="flex items-center gap-1 mb-1">
                        {Array.from({ length: Math.round(review.rating ?? 5) }).map((_, s) => (
                          <Star key={s} size={9} className="fill-gold text-gold" />
                        ))}
                      </div>
                      <p className="text-[11px] font-body text-warm-white/90 leading-relaxed line-clamp-3">
                        &ldquo;{review.text}&rdquo;
                      </p>
                      <p className="text-[10px] font-body text-warm-white/70 mt-1">
                        — {review.author}
                        {review.relativeDate && (
                          <span className="ml-1.5 text-warm-white/50">{review.relativeDate}</span>
                        )}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Resources column */}
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold text-gold mb-5">
                Free Guides
              </p>
              <ul className="space-y-3">
                {resourceLinks.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm font-body text-warm-white/90 hover:text-gold transition-colors duration-300"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold text-gold mb-3">
                  Areas Served
                </p>
                <p className="text-xs font-body text-warm-white/80 leading-relaxed">
                  Bowie · Laurel · Towson · Potomac · Bethesda · Columbia · Rockville · Nottingham · Catonsville · Hyattsville · College Park · Gaithersburg · Ellicott City · Silver Spring · Westlake · Baltimore · Clarksville
                </p>
              </div>
            </div>

            {/* Contact column */}
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold text-gold mb-5">
                Get In Touch
              </p>
              <div className="space-y-4">
                <a
                  href="tel:+14439228458"
                  className="flex items-center gap-3 text-sm font-body text-warm-white/90 hover:text-gold transition-colors group"
                >
                  <Phone size={14} className="text-gold shrink-0" />
                  Direct: (443) 922-8458
                </a>
                <a
                  href="tel:+14104656900"
                  className="flex items-center gap-3 text-sm font-body text-warm-white/90 hover:text-gold transition-colors group"
                >
                  <Phone size={14} className="text-gold shrink-0" />
                  Office: (410) 465-6900
                </a>
                <a
                  href="mailto:gayanegevorgyan@boblucidoteam.com"
                  className="flex items-center gap-3 text-sm font-body text-warm-white/90 hover:text-gold transition-colors break-all"
                >
                  <Mail size={14} className="text-gold shrink-0" />
                  Gayanegevorgyanrealtor@gmail.com
                </a>
                <Link
                  to="/contact"
                  className="inline-block mt-2 px-6 py-2.5 border border-gold/50 text-gold text-[10px] tracking-[0.25em] uppercase font-body font-semibold hover:bg-gold hover:text-charcoal transition-all duration-500"
                >
                  Book Free Consultation
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-body text-white">
            <p>© {new Date().getFullYear()} Gayane Gevorgyan. All rights reserved.</p>

            {/* Compliance & Team Logos */}
            <div className="flex items-center gap-5">
              {/* EHO + REALTOR badge */}
              <img
                src={`${import.meta.env.BASE_URL}eho-realtor.png`}
                alt="Equal Housing Opportunity · REALTOR®"
                className="h-28 w-auto object-contain"
              />
              {/* Bob Lucido Team logo — links to lucidoglobal.com */}
              <a
                href="https://lucidoglobal.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bob Lucido Team – Keller Williams Lucido Agency"
                className="hover:opacity-80 transition-opacity duration-300"
              >
                <img
                  src={`${import.meta.env.BASE_URL}team-logo.webp`}
                  alt="Bob Lucido Team · Keller Williams Lucido Agency"
                  style={{ filter: "invert(1)" }}
                  className="h-16 w-auto object-contain"
                />
              </a>
              {/* KW Logo */}
              <img
                src={kwLogo}
                alt="Keller Williams"
                className="h-14 w-auto object-contain"
                style={{ filter: "brightness(0)" }}
              />
            </div>

            <div className="flex items-center gap-4 text-white">
              <Link to="/buyers" className="hover:text-gold transition-colors">Buyer's Guide</Link>
              <Link to="/sellers" className="hover:text-gold transition-colors">Seller's Guide</Link>
              <Link to="/market-reports" className="hover:text-gold transition-colors">Market Reports</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
};

export default Footer;
