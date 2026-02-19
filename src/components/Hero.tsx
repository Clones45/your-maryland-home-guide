import heroBg from "@/assets/hero-bg.jpg";
import { useEffect, useState } from "react";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <img
        src={heroBg}
        alt="Luxury Maryland home at sunset"
        className="absolute inset-0 w-full h-full object-cover animate-fade-in scale-105"
        style={{ transform: `translateY(${scrollY * 0.5}px) scale(1.05)` }}
      />
      <div className="absolute inset-0 bg-hero-overlay/40" />

      {/* Decorative border frame */}
      <div className="absolute inset-8 border border-white/20 z-20 pointer-events-none hidden md:block" />

      <div className="relative z-30 flex flex-col items-center justify-center h-full text-center px-6"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <div className="mb-6 w-[1px] h-24 bg-gold animate-fade-in-up"></div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading text-white tracking-tight animate-fade-in-up leading-tight">
          YOUR HOME.
          <br />
          <span className="text-gold italic font-medium relative inline-block">
            Your Story.
            {/* Underline for 'Your Story' */}
            <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-white/30 transform scale-x-0 transition-transform duration-700 origin-left hover:scale-x-100"></span>
          </span>
        </h1>

        <p className="mt-8 text-xs md:text-sm tracking-[0.4em] uppercase font-body font-medium text-white/90 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          Maryland Real Estate <span className="text-gold mx-2">•</span> Ellicott City
        </p>

        <a
          href="#contact"
          className="mt-12 px-12 py-4 border border-white/40 text-white text-xs tracking-[0.3em] uppercase font-body font-semibold hover:bg-white hover:text-charcoal hover:border-white transition-all duration-500 animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          Get In Touch
        </a>
      </div>
    </section>
  );
};

export default Hero;
