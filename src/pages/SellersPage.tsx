import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { Link } from "react-router-dom";
import {
    CheckCircle,
    BarChart2,
    Camera,
    Star,
    Megaphone,
    DollarSign,
    Clock,
    HelpCircle,
    ChevronDown,
    TrendingUp,
} from "lucide-react";
import { useState } from "react";

const sellingSteps = [
    {
        step: "01",
        icon: DollarSign,
        title: "Free Home Valuation",
        desc: "I provide a comprehensive Comparative Market Analysis (CMA) using live MLS data, recent neighborhood sales, and market trend analysis to pinpoint the optimal listing price — balancing maximum return with marketability.",
        tips: ["Pricing too high leads to stale listings", "I account for seasonal market shifts", "We review competing active listings"],
    },
    {
        step: "02",
        icon: Star,
        title: "Staging & Pre-Listing Prep",
        desc: "First impressions close deals. I provide a detailed staging consultation, recommending impactful updates (fresh paint, decluttering, curb appeal) that typically return 5–10x their cost. I also coordinate trusted local contractors if needed.",
        tips: ["Deep clean and depersonalize", "Focus on kitchen and primary bedroom", "Maximize natural light in photos"],
    },
    {
        step: "03",
        icon: Camera,
        title: "Professional Photography & Media",
        desc: "Your home is marketed like a luxury product. I coordinate professional real estate photography, twilight shots, and optional drone/video tours that make your listing stand out on every platform — Zillow, Realtor.com, and MLS.",
        tips: ["Schedule photos on a sunny day", "Clear driveways and yard before shoot", "Virtual tours are proven to increase showings"],
    },
    {
        step: "04",
        icon: Megaphone,
        title: "Multi-Channel Marketing Launch",
        desc: "Your property is syndicated to 100+ real estate platforms and promoted through targeted Facebook/Instagram ads, email campaigns to my buyer database, and neighborhood social groups. Every listing gets a custom marketing plan.",
        tips: ["Zillow Premier listing placement", "Targeted ads to local active buyers", "Open house strategy for maximum exposure"],
    },
    {
        step: "05",
        icon: BarChart2,
        title: "Showings, Offers & Negotiation",
        desc: "I coordinate all showings, collect direct agent feedback, and update our strategy accordingly. When offers come in, I analyze each one holistically — not just price, but contingencies, financing strength, and timeline — to secure the best possible deal.",
        tips: ["Multiple offers require careful comparison", "Strongest offer isn't always highest price", "I negotiate inspection repairs to your benefit"],
    },
    {
        step: "06",
        icon: TrendingUp,
        title: "Close with Confidence",
        desc: "From accepted offer to closing day, I coordinate with the title company, buyer's agent, and all parties to ensure a smooth transaction. You receive your proceeds, and I hand over the keys knowing we maximized your investment.",
        tips: ["Move out completely before final walkthrough", "Keep utilities on until closing", "Review your net sheet before closing day"],
    },
];

const faqs = [
    {
        q: "How do you determine the listing price for my home?",
        a: "I conduct a comprehensive Comparative Market Analysis (CMA) — reviewing homes sold within the past 90 days in your neighborhood with similar square footage, condition, and features. I also factor in active competition, market trends, and seasonal timing. The goal is an aggressive but realistic price that attracts buyers quickly and maximizes your net proceeds.",
    },
    {
        q: "What should I do to prepare my home for sale?",
        a: "Start with decluttering and deep cleaning. I provide every seller with a customized pre-listing checklist. Key high-ROI improvements include fresh neutral paint, updated light fixtures, landscaping, and minor kitchen/bath refreshes. I'll tour your home and give you specific, prioritized recommendations — never generic advice.",
    },
    {
        q: "How long will it take to sell my home in Maryland?",
        a: "In Howard County and surrounding areas, well-priced homes in good condition typically go under contract within 1–3 weeks. The full process from listing to closing takes 45–60 days. Overpriced or poorly marketed homes can sit for months — which is why strategy matters from day one.",
    },
    {
        q: "What is the commission or cost to sell?",
        a: "Commission structures have evolved with recent NAR changes. We'll discuss this transparently in our listing consultation. My job is to ensure your net proceeds — after all costs — exceed what you'd achieve with any other approach. I compete on value, not just cost.",
    },
    {
        q: "Should I renovate before selling?",
        a: "Not necessarily — and over-improving is a real risk. I help sellers understand which updates yield the highest return. In most cases, cosmetic improvements (paint, landscaping, deep clean, staging) outperform costly renovations like full kitchen remodels when calculating net return at closing.",
    },
    {
        q: "Can you help if my home previously failed to sell?",
        a: "Absolutely. Expired listings are a specialty. I start with an honest diagnostic — was it price, condition, marketing, or agent execution? From there, I create a relaunch strategy with fresh photography, updated pricing, and aggressive new marketing. We've helped many sellers get 'stuck' listings sold.",
    },
];

const SellersPage = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="min-h-screen">
            <SEO
                title="Sell Your Home in Maryland | Seller's Guide"
                description="Ready to sell your Maryland home? Get a free home valuation and expert guidance from Realtor Gayane Gevorgyan. Professional photography, strategic staging, and proven marketing to maximize your sale price in Ellicott City and Central Maryland."
                canonicalUrl="/sellers"
                keywords="sell my home Maryland, home valuation Ellicott City, list house for sale Howard County, Maryland real estate selling tips, best realtor to sell home Maryland, home staging Central Maryland, sell house fast Maryland"
            />
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-20 md:pb-28 bg-background relative overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, #C9A84C 0%, transparent 60%)" }} />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <Reveal>
                        <p className="text-xs tracking-[0.3em] uppercase text-gold font-body font-semibold mb-4">
                            Complete Seller's Guide
                        </p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h1 className="text-4xl md:text-6xl font-heading text-foreground mb-6 leading-tight">
                            Sell Smarter.{" "}
                            <span className="text-gold italic">Earn More.</span>
                            <br />
                            Stress Less.
                        </h1>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-lg font-body text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                            Selling your Maryland home is one of the biggest financial decisions you'll make. I combine local market expertise, luxury-level marketing, and fierce negotiation to ensure you walk away with maximum proceeds — and minimum headaches.
                        </p>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/contact"
                                className="px-10 py-4 bg-gold text-charcoal text-xs tracking-[0.25em] uppercase font-body font-bold hover:bg-charcoal hover:text-warm-white transition-all duration-400"
                            >
                                Get a Free Home Valuation
                            </Link>
                            <a
                                href="#steps"
                                className="px-10 py-4 border border-gold/40 text-foreground text-xs tracking-[0.25em] uppercase font-body font-semibold hover:border-gold hover:text-gold transition-all duration-400"
                            >
                                See How It Works
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Results Stats */}
            <section className="py-12 bg-charcoal">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { stat: "98%", label: "List-to-Sale Price Ratio" },
                            { stat: "14 Days", label: "Average Days on Market" },
                            { stat: "100+", label: "Maryland Families Served" },
                            { stat: "$0", label: "Cost for Consultation" },
                        ].map(({ stat, label }, i) => (
                            <Reveal key={label} delay={i * 0.1}>
                                <div className="text-center">
                                    <p className="text-3xl md:text-4xl font-heading text-gold font-bold">{stat}</p>
                                    <p className="text-xs tracking-wider uppercase font-body text-warm-white/50 mt-2">{label}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* What Sets Me Apart */}
            <section className="py-20 bg-cream">
                <div className="container mx-auto px-6">
                    <Reveal width="100%">
                        <div className="text-center mb-14">
                            <p className="text-xs tracking-[0.3em] uppercase text-gold font-body font-semibold mb-3">
                                The Gayane Difference
                            </p>
                            <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
                                Why Sellers Choose{" "}
                                <span className="italic text-gold">Gayane</span>
                            </h2>
                        </div>
                    </Reveal>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Camera,
                                title: "Luxury-Level Marketing",
                                desc: "Every listing receives professional HDR photography, targeted social media advertising, and syndication to 100+ platforms including Zillow, Realtor.com, and luxury portals. Your home is presented as the premium asset it is.",
                            },
                            {
                                icon: DollarSign,
                                title: "Hyper-Local Pricing Strategy",
                                desc: "I live and breathe Central Maryland market data. My CMAs go beyond Zestimate estimates — I analyze micro-neighborhood trends, school district premiums, and buyer demand patterns to price your home for maximum profit.",
                            },
                            {
                                icon: Star,
                                title: "Multilingual Reach",
                                desc: "Fluent in English, Armenian, and Russian, I can market your property to a broader international buyer pool. Maryland's diverse buyer demographics are an asset — I leverage them to generate more competing offers on your home.",
                            },
                        ].map(({ icon: Icon, title, desc }, i) => (
                            <Reveal key={title} delay={i * 0.15}>
                                <div className="p-8 bg-white border border-gold/10 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full">
                                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-6">
                                        <Icon size={20} className="text-gold" />
                                    </div>
                                    <h3 className="text-xl font-heading text-foreground mb-3">{title}</h3>
                                    <p className="font-body text-muted-foreground text-sm leading-relaxed">{desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Step-by-Step */}
            <section id="steps" className="py-20 md:py-28 bg-background">
                <div className="container mx-auto px-6">
                    <Reveal width="100%">
                        <div className="text-center mb-14">
                            <p className="text-xs tracking-[0.3em] uppercase text-gold font-body font-semibold mb-3">
                                The Selling Process
                            </p>
                            <h2 className="text-3xl md:text-4xl font-heading text-foreground">
                                How I Sell Your Home{" "}
                                <span className="italic text-gold">For Maximum Value</span>
                            </h2>
                        </div>
                    </Reveal>
                    <div className="space-y-8">
                        {sellingSteps.map(({ step, icon: Icon, title, desc, tips }, i) => (
                            <Reveal key={step} delay={i * 0.1}>
                                <div className="grid md:grid-cols-12 gap-6 p-8 border border-gold/10 hover:border-gold/30 transition-colors duration-300 bg-cream/30 group">
                                    <div className="md:col-span-1 flex items-start">
                                        <span className="text-5xl font-heading text-gold/20 group-hover:text-gold/40 transition-colors">{step}</span>
                                    </div>
                                    <div className="md:col-span-1 flex items-start justify-center pt-1">
                                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                                            <Icon size={18} className="text-gold" />
                                        </div>
                                    </div>
                                    <div className="md:col-span-6">
                                        <h3 className="text-xl font-heading text-foreground mb-3 group-hover:text-gold transition-colors">{title}</h3>
                                        <p className="font-body text-muted-foreground leading-relaxed text-sm">{desc}</p>
                                    </div>
                                    <div className="md:col-span-4">
                                        <p className="text-[10px] tracking-[0.2em] uppercase font-body font-semibold text-gold mb-2">Seller Tips</p>
                                        <ul className="space-y-1.5">
                                            {tips.map((tip) => (
                                                <li key={tip} className="flex items-start gap-2 text-xs font-body text-muted-foreground">
                                                    <CheckCircle size={12} className="text-gold mt-0.5 shrink-0" />
                                                    {tip}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Urgent CTA */}
            <section className="py-20 bg-charcoal">
                <div className="container mx-auto px-6 text-center">
                    <Reveal>
                        <Clock size={40} className="text-gold mx-auto mb-6" />
                        <h2 className="text-3xl md:text-4xl font-heading text-warm-white mb-4">
                            Ready to See What Your Home is Worth?
                        </h2>
                        <p className="font-body text-warm-white/60 max-w-xl mx-auto mb-8 text-sm leading-relaxed">
                            The Maryland market moves fast. I provide a free, no-obligation home valuation based on current live data — not automated estimates. Know your home's true market value before you decide to sell.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-block px-12 py-4 bg-gold text-charcoal text-xs tracking-[0.3em] uppercase font-body font-bold hover:bg-warm-white transition-all duration-400"
                        >
                            Get My Free Home Valuation
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-cream">
                <div className="container mx-auto px-6 max-w-3xl">
                    <Reveal width="100%">
                        <div className="text-center mb-12">
                            <p className="text-xs tracking-[0.3em] uppercase text-gold font-body font-semibold mb-3">
                                Common Questions
                            </p>
                            <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
                                Seller <span className="italic text-gold">FAQs</span>
                            </h2>
                        </div>
                    </Reveal>
                    <div className="space-y-3">
                        {faqs.map(({ q, a }, i) => (
                            <Reveal key={i} delay={i * 0.05}>
                                <div className="border border-gold/15 bg-white overflow-hidden">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="w-full flex items-center justify-between p-6 text-left hover:bg-cream/50 transition-colors duration-200"
                                    >
                                        <div className="flex items-center gap-3">
                                            <HelpCircle size={16} className="text-gold shrink-0" />
                                            <span className="font-body font-medium text-foreground text-sm leading-snug">{q}</span>
                                        </div>
                                        <ChevronDown
                                            size={16}
                                            className={`text-gold shrink-0 ml-4 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                    {openFaq === i && (
                                        <div className="px-6 pb-6">
                                            <p className="font-body text-muted-foreground text-sm leading-relaxed border-l-2 border-gold pl-4">{a}</p>
                                        </div>
                                    )}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default SellersPage;
