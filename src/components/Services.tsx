import { Home, Key, TrendingUp, Users } from "lucide-react";
import { Reveal } from "./Reveal";

const services = [
  {
    icon: Home,
    title: "Residential Sales",
    description: "Expert guidance through every step of buying or selling your Maryland home.",
    delay: 0.2,
  },
  {
    icon: Key,
    title: "Rentals",
    description: "Find the perfect rental property or maximize your investment returns.",
    delay: 0.3,
  },
  {
    icon: TrendingUp,
    title: "Market Analysis",
    description: "Data-driven pricing strategies and comprehensive market insights.",
    delay: 0.4,
  },
  {
    icon: Users,
    title: "Multilingual Service",
    description: "Fluent support in English, Armenian, and Russian for international clients.",
    delay: 0.5,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-charcoal">
      <div className="container mx-auto px-6 text-center">
        <Reveal width="100%">
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-body font-semibold mb-3">
            What I Offer
          </p>
          <h2 className="text-3xl md:text-4xl font-heading text-warm-white mb-16">
            Tailored Real Estate <span className="italic">Services</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map(({ icon: Icon, title, description, delay }) => (
            <Reveal key={title} delay={delay}>
              <div
                className="group p-8 border border-warm-white/10 hover:border-gold/50 transition-all duration-500 hover:-translate-y-2 hover:bg-white/5"
              >
                <div className="w-14 h-14 mx-auto mb-6 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-500 group-hover:scale-110">
                  <Icon size={24} className="text-gold" />
                </div>
                <h3 className="text-lg font-heading text-warm-white mb-3 group-hover:text-gold transition-colors duration-300">{title}</h3>
                <p className="text-sm font-body text-warm-white/60 leading-relaxed group-hover:text-warm-white/80 transition-colors duration-300">
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
