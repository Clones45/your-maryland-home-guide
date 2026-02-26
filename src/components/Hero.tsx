import heroBg from "@/assets/hero-bg.jpg";
import bkgImage from "@/assets/Bkg.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      <div className="absolute inset-0 bg-hero-overlay/50" />

      {/* Decorative border frame */}
      <div className="absolute inset-8 border border-white/20 z-20 pointer-events-none hidden md:block" />

      {/* Lucido Global badge — bottom right */}
      <div className="absolute bottom-10 right-10 z-30 hidden md:flex flex-col items-end gap-1 pointer-events-none">
        <p className="text-[9px] tracking-[0.3em] uppercase text-white/50 font-body">
          Represented by
        </p>
        <p className="text-xs tracking-[0.2em] uppercase text-gold font-body font-semibold">
          Lucido Global
        </p>
        <div className="w-8 h-[1px] bg-gold/60 ml-auto" />
      </div>

      {/* Floating stat chips — bottom left */}
      <div className="absolute bottom-10 left-10 z-30 hidden md:flex flex-col gap-2 pointer-events-none">
        {["4+ Years Experience", "98% Satisfaction Rate"].map((stat) => (
          <div
            key={stat}
            className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
            <span className="text-[10px] tracking-[0.2em] uppercase font-body text-white font-medium">
              {stat}
            </span>
          </div>
        ))}
      </div>

      <div
        className="relative z-30 flex flex-col items-center justify-center h-full text-center px-6"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >

        <img
          src={bkgImage}
          alt="Gayane Gevorgyan Realtor Logo"
          className="w-72 md:w-[28rem] lg:w-[36rem] mb-8 object-contain animate-fade-in-up"
          style={{ filter: "sepia(1) saturate(4) hue-rotate(5deg) brightness(1.2)" }}
        />
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading text-white tracking-tight animate-fade-in-up leading-tight">
          YOUR HOME.
          <br />
          <span className="text-gold italic font-medium relative inline-block">
            Your Story.
            <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-white/30 transform scale-x-0 transition-transform duration-700 origin-left hover:scale-x-100"></span>
          </span>
        </h1>


        <p className="mt-6 text-[10px] md:text-sm tracking-[0.3em] uppercase font-body font-medium text-white/90 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          Strong <span className="text-gold mx-1">•</span> Professional{" "}
          <span className="text-gold mx-1">•</span> Warm{" "}
          <span className="text-gold mx-1">•</span> Resilient{" "}
          <span className="text-gold mx-1">•</span> Strategic
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <Link
            to="/contact"
            className="px-12 py-4 bg-gold text-charcoal text-xs tracking-[0.3em] uppercase font-body font-bold hover:bg-white hover:text-charcoal transition-all duration-500"
          >
            Book Free Consultation
          </Link>
          <Link
            to="/communities"
            className="px-12 py-4 bg-transparent border border-white/50 text-white text-xs tracking-[0.3em] uppercase font-body font-semibold hover:bg-white hover:text-charcoal hover:border-white transition-all duration-500 backdrop-blur-sm"
          >
            View My Areas
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
