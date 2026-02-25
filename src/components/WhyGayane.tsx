import { Globe, Clock, Users, TrendingUp, Shield, Star } from "lucide-react";
import { Reveal } from "./Reveal";

const differentiators = [
    {
        icon: Globe,
        title: "Trilingual Advantage",
        desc: "English, Russian & Armenian — Gayane bridges communication gaps most agents can't, serving diverse Maryland families with zero friction.",
        delay: 0.1,
    },
    {
        icon: Clock,
        title: "Same-Day Response",
        desc: "Real estate moves fast. Gayane is a full-time, dedicated agent — not a side-hustler. Expect responses within hours, not days.",
        delay: 0.2,
    },
    {
        icon: Users,
        title: "100+ Families Served",
        desc: "From first-time buyers to complex transitions, Gayane has navigated every type of transaction with care and precision.",
        delay: 0.3,
    },
    {
        icon: TrendingUp,
        title: "Above-Ask Results",
        desc: "Strategic pricing, professional photography, and targeted marketing consistently deliver above-list-price outcomes for sellers.",
        delay: 0.4,
    },
    {
        icon: Shield,
        title: "Lucido Global Network",
        desc: "Backed by one of Maryland's top-producing teams, Gayane carries the power of a globally connected brokerage behind every deal.",
        delay: 0.5,
    },
    {
        icon: Star,
        title: "Heart-Led Service",
        desc: "As a single mom who rebuilt her own life, Gayane understands what \"home\" really means. She fights for you like it's her own future.",
        delay: 0.6,
    },
];

const WhyGayane = () => {
    return (
        <section className="py-24 md:py-32 bg-charcoal relative overflow-hidden">
            {/* Subtle background texture */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #C9A96E 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C9A96E 0%, transparent 40%)" }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <Reveal width="100%">
                    <div className="text-center mb-16">
                        <p className="text-xs tracking-[0.3em] uppercase text-gold font-body font-semibold mb-3">
                            The Difference
                        </p>
                        <h2 className="text-3xl md:text-5xl font-heading text-warm-white leading-tight">
                            What Makes Gayane{" "}
                            <span className="italic text-gold">Different</span>
                        </h2>
                        <div className="w-16 h-[1px] bg-gold mx-auto mt-8" />
                    </div>
                </Reveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {differentiators.map(({ icon: Icon, title, desc, delay }) => (
                        <Reveal key={title} delay={delay}>
                            <div className="group relative p-8 border border-warm-white/10 hover:border-gold/60 transition-all duration-500 hover:-translate-y-1 hover:bg-white/5 cursor-default">
                                {/* Gold corner accent */}
                                <div className="absolute top-0 left-0 w-8 h-[2px] bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute top-0 left-0 w-[2px] h-8 bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="w-12 h-12 mb-6 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold/15 group-hover:border-gold/60 transition-all duration-500">
                                    <Icon size={20} className="text-gold" />
                                </div>
                                <h3 className="text-base font-heading text-warm-white mb-3 group-hover:text-gold transition-colors duration-300 tracking-wide">
                                    {title}
                                </h3>
                                <p className="text-sm font-body text-warm-white/55 leading-relaxed group-hover:text-warm-white/80 transition-colors duration-300">
                                    {desc}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.8}>
                    <div className="mt-16 text-center">
                        <a
                            href="/your-maryland-home-guide/contact"
                            className="inline-block px-12 py-4 border border-gold/60 text-gold text-xs tracking-[0.3em] uppercase font-body font-semibold hover:bg-gold hover:text-charcoal transition-all duration-500"
                        >
                            Work With Gayane
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default WhyGayane;
