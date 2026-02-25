import { useState } from "react";
import { Home, Key, TrendingUp, Users, CheckCircle, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { Link } from "react-router-dom";

const buyerServices = [
  {
    icon: Home,
    title: "First-Time Buyers",
    tagline: "Education, confidence, and zero surprises.",
    bullets: [
      "Step-by-step walkthrough from pre-approval to closing",
      "Access to off-market and early-listing opportunities",
      "Negotiation strategy that protects your money",
    ],
    delay: 0.2,
  },
  {
    icon: Users,
    title: "Families in Transition",
    tagline: "Empathy meets precision for life's biggest pivots.",
    bullets: [
      "Divorce, relocation, and life-change specialists",
      "Discretion and patience through every step",
      "School district and neighborhood guidance",
    ],
    delay: 0.3,
  },
];

const sellerServices = [
  {
    icon: TrendingUp,
    title: "Strategic Sellers",
    tagline: "Treat your listing like a business launch.",
    bullets: [
      "Professional photography, staging consultation & MLS syndication",
      "Pricing strategy backed by hyper-local market data",
      "Targeted social & digital marketing campaigns",
    ],
    delay: 0.2,
  },
  {
    icon: Key,
    title: "Expired Listings",
    tagline: "A second chance — done right this time.",
    bullets: [
      "Honest audit of why your home didn't sell",
      "Strategic relaunch plan with fresh marketing",
      "Proven track record turning stale listings into sold",
    ],
    delay: 0.3,
  },
];

const processSteps = {
  buyers: [
    { step: "01", title: "Free Consultation", desc: "Understand your goals, budget, and timeline." },
    { step: "02", title: "Pre-Approval", desc: "Connect with a trusted lender to clarify your buying power." },
    { step: "03", title: "Home Search", desc: "Curated listings, private tours, and expert guidance." },
    { step: "04", title: "Offer & Close", desc: "Strategic offer, negotiation, and a smooth closing." },
  ],
  sellers: [
    { step: "01", title: "Strategy Session", desc: "Review your home, goals, timeline, and pricing." },
    { step: "02", title: "Staging & Pricing", desc: "Professional prep and data-backed list price." },
    { step: "03", title: "Marketing Launch", desc: "Photography, MLS, social ads, and open houses." },
    { step: "04", title: "Sold!", desc: "Negotiate best terms, coordinate closing, hand over keys." },
  ],
};

const Services = () => {
  const [tab, setTab] = useState<"buyers" | "sellers">("buyers");
  const cards = tab === "buyers" ? buyerServices : sellerServices;
  const steps = processSteps[tab];

  return (
    <section id="services" className="py-24 md:py-32 bg-charcoal">
      <div className="container mx-auto px-6">
        {/* Header */}
        <Reveal width="100%">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-gold font-body font-semibold mb-3">
              What I Offer
            </p>
            <h2 className="text-3xl md:text-4xl font-heading text-warm-white mb-8">
              Tailored Real Estate <span className="italic">Services</span>
            </h2>

            {/* Tab toggle */}
            <div className="inline-flex border border-warm-white/20">
              {(["buyers", "sellers"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-10 py-3 text-xs tracking-[0.25em] uppercase font-body font-semibold transition-all duration-300 ${tab === t
                      ? "bg-gold text-charcoal"
                      : "text-warm-white/60 hover:text-warm-white"
                    }`}
                >
                  For {t === "buyers" ? "Buyers" : "Sellers"}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {cards.map(({ icon: Icon, title, tagline, bullets, delay }) => (
            <Reveal key={title} delay={delay}>
              <div className="group p-8 border border-warm-white/10 hover:border-gold/50 transition-all duration-500 hover:-translate-y-1 hover:bg-white/5 h-full">
                <div className="w-14 h-14 mb-6 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-500">
                  <Icon size={24} className="text-gold" />
                </div>
                <h3 className="text-xl font-heading text-warm-white mb-2 group-hover:text-gold transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-sm text-gold/80 font-body italic mb-5">{tagline}</p>
                <ul className="space-y-2.5 mb-6">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm font-body text-warm-white/60 group-hover:text-warm-white/80 transition-colors duration-300">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs tracking-[0.2em] uppercase font-body font-semibold text-gold hover:text-warm-white transition-colors duration-300 group/link"
                >
                  Let's Talk <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Process timeline */}
        <Reveal width="100%">
          <div className="mb-8 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-gold font-body font-semibold mb-2">
              The Process
            </p>
            <h3 className="text-2xl font-heading text-warm-white">
              How We Get It <span className="italic">Done</span>
            </h3>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {steps.map(({ step, title, desc }, i) => (
            <Reveal key={step} delay={i * 0.1}>
              <div className="relative p-6 border border-warm-white/10 text-center group hover:border-gold/40 transition-all duration-300">
                <p className="text-4xl font-heading text-gold/20 group-hover:text-gold/40 transition-colors mb-3">{step}</p>
                <h4 className="text-sm font-heading text-warm-white mb-2 group-hover:text-gold transition-colors">{title}</h4>
                <p className="text-xs font-body text-warm-white/50 leading-relaxed">{desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-[1px] bg-gold/30" />
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <Reveal delay={0.4} width="100%">
          <div className="border border-warm-white/10 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-heading text-lg text-warm-white mb-1">
                Not sure which service fits your situation?
              </p>
              <p className="text-sm font-body text-warm-white/50">
                Let's talk — no pressure, no obligation, just clarity.
              </p>
            </div>
            <Link
              to="/contact"
              className="shrink-0 px-10 py-3 border border-gold/60 text-gold text-xs tracking-[0.25em] uppercase font-body font-semibold hover:bg-gold hover:text-charcoal transition-all duration-500"
            >
              Schedule a Free Call
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Services;
