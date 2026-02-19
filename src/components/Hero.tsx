import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <img
        src={heroBg}
        alt="Luxury Maryland home at sunset"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-charcoal/55" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading text-warm-white tracking-wide animate-fade-in-up">
          YOUR HOME.
          <br />
          <span className="text-gold italic font-medium">Your Story.</span>
        </h1>
        <p className="mt-6 text-sm md:text-base tracking-[0.25em] uppercase font-body font-light text-warm-white/80 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          Maryland Real Estate · Ellicott City
        </p>
        <a
          href="#contact"
          className="mt-10 px-10 py-4 border border-warm-white/60 text-warm-white text-xs tracking-[0.3em] uppercase font-body font-medium hover:bg-gold hover:border-gold hover:text-charcoal transition-all duration-500 animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          Get In Touch
        </a>
      </div>
    </section>
  );
};

export default Hero;
