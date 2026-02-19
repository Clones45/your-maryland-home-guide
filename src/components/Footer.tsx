const Footer = () => {
  return (
    <footer className="py-12 bg-charcoal text-center">
      <div className="container mx-auto px-6">
        <p className="font-heading text-2xl text-warm-white mb-2">
          <span className="italic font-medium">Gayane</span>{" "}
          <span className="font-semibold">Gevorgyan</span>
        </p>
        <p className="text-[10px] tracking-[0.35em] uppercase font-body text-gold mb-6">
          Realtor · Bob Lucido Team · Keller Williams Lucido Agency
        </p>

        <div className="flex items-center justify-center gap-6 text-xs font-body text-warm-white/50 mb-6">
          <a href="tel:+14439228458" className="hover:text-gold transition-colors">(443) 922-8458</a>
          <span className="text-gold/30">|</span>
          <a href="mailto:gayanegevorgyan@boblucidoteam.com" className="hover:text-gold transition-colors">
            Email
          </a>
        </div>

        <p className="text-[11px] font-body text-warm-white/30">
          © {new Date().getFullYear()} Gayane Gevorgyan. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
