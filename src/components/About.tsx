import aboutImg from "@/assets/about-portrait.jpg";
import { Globe, Heart, Award } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img
            src={aboutImg}
            alt="Gayane Gevorgyan, Realtor"
            className="w-full max-w-md mx-auto object-cover shadow-2xl"
          />
          <div className="absolute -bottom-4 -right-4 w-full max-w-md h-full border-2 border-gold -z-10" />
        </div>

        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-body font-semibold mb-3">
            About
          </p>
          <h2 className="text-3xl md:text-4xl font-heading text-foreground leading-snug mb-6">
            Meet <span className="italic text-gold">Gayane</span>
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-6">
            With a degree in International Relations and over four years of dedicated experience
            in real estate, Gayane Gevorgyan brings a global perspective and genuine passion to
            every transaction. As a proud member of the Bob Lucido Team at Keller Williams Lucido
            Agency, she specializes in residential listings, sales, and rentals across Maryland.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed mb-8">
            Fluent in English, Armenian, and Russian, Gayane connects with a diverse clientele,
            offering clear communication and honest guidance through life's biggest transitions.
          </p>

          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Globe, label: "3 Languages" },
              { icon: Heart, label: "Client-First" },
              { icon: Award, label: "Lucido Global" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center">
                  <Icon size={20} className="text-gold" />
                </div>
                <span className="text-xs tracking-wider uppercase font-body text-muted-foreground">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
