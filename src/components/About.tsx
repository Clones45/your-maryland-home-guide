import aboutImg from "@/assets/about-portrait.png";
import { Globe, Heart, Award } from "lucide-react";
import { Reveal } from "./Reveal";

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <Reveal width="100%">
          <div className="relative group">
            <img
              src={aboutImg}
              alt="Gayane Gevorgyan, Realtor"
              className="w-full max-w-md mx-auto object-cover shadow-2xl transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute -bottom-4 -right-4 w-full max-w-md h-full border-2 border-gold -z-10 transition-transform duration-1000 ease-out group-hover:translate-x-3 group-hover:translate-y-3" />
          </div>
        </Reveal>

        <div>
          <Reveal delay={0.2}>
            <p className="text-xs tracking-[0.3em] uppercase text-gold font-body font-semibold mb-3">
              About
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <h2 className="text-3xl md:text-4xl font-heading text-foreground leading-snug mb-6">
              Meet <span className="italic text-gold">Gayane</span>
            </h2>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              With a degree in International Relations and over four years of dedicated experience
              in real estate, Gayane Gevorgyan brings a global perspective and genuine passion to
              every transaction. As a proud member of the Bob Lucido Team at Keller Williams Lucido
              Agency, she specializes in residential listings, sales, and rentals across Maryland.
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <p className="text-muted-foreground font-body leading-relaxed mb-8">
              Fluent in English, Armenian, and Russian, Gayane connects with a diverse clientele,
              offering clear communication and honest guidance through life's biggest transitions.
            </p>
          </Reveal>

          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Globe, label: "3 Languages", delay: 0.6 },
              { icon: Heart, label: "Client-First", delay: 0.7 },
              { icon: Award, label: "Lucido Global", delay: 0.8 },
            ].map(({ icon: Icon, label, delay }) => (
              <Reveal key={label} delay={delay}>
                <div className="flex flex-col items-center text-center gap-2 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center transition-all duration-500 group-hover:bg-gold group-hover:scale-110">
                    <Icon size={20} className="text-gold transition-colors duration-500 group-hover:text-white" />
                  </div>
                  <span className="text-xs tracking-wider uppercase font-body text-muted-foreground transition-colors duration-500 group-hover:text-gold block mt-2">
                    {label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
