import { Home, Key, TrendingUp, Users } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Residential Sales",
    description: "Expert guidance through every step of buying or selling your Maryland home.",
  },
  {
    icon: Key,
    title: "Rentals",
    description: "Find the perfect rental property or maximize your investment returns.",
  },
  {
    icon: TrendingUp,
    title: "Market Analysis",
    description: "Data-driven pricing strategies and comprehensive market insights.",
  },
  {
    icon: Users,
    title: "Multilingual Service",
    description: "Fluent support in English, Armenian, and Russian for international clients.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-charcoal">
      <div className="container mx-auto px-6 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-gold font-body font-semibold mb-3">
          What I Offer
        </p>
        <h2 className="text-3xl md:text-4xl font-heading text-warm-white mb-16">
          Tailored Real Estate <span className="italic">Services</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group p-8 border border-warm-white/10 hover:border-gold/50 transition-all duration-500"
            >
              <div className="w-14 h-14 mx-auto mb-6 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-500">
                <Icon size={24} className="text-gold" />
              </div>
              <h3 className="text-lg font-heading text-warm-white mb-3">{title}</h3>
              <p className="text-sm font-body text-warm-white/60 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
