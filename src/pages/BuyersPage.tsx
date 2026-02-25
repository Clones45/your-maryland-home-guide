import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { Link } from "react-router-dom";
import {
    CheckCircle,
    Home,
    CreditCard,
    Search,
    FileText,
    Key,
    Shield,
    HelpCircle,
    ChevronDown,
} from "lucide-react";
import { useState } from "react";

const buyingSteps = [
    {
        step: "01",
        icon: CreditCard,
        title: "Get Pre-Approved",
        desc: "Before you fall in love with a home, know your budget. I'll connect you with trusted Maryland lenders who can pre-approve you quickly and guide you through your financing options — FHA, conventional, VA, or USDA loans.",
        tips: ["Check your credit score early", "Save for 3–20% down payment", "Account for closing costs (2–5%)"],
    },
    {
        step: "02",
        icon: Search,
        title: "Define Your Dream Home",
        desc: "We start with a detailed buyer consultation to understand your must-haves, deal breakers, and dream features. I provide a curated list of properties matching your criteria, including off-market listings not available publicly.",
        tips: ["Prioritize needs vs. wants", "Research school districts (GreatSchools.org)", "Consider commute times to major employers"],
    },
    {
        step: "03",
        icon: Home,
        title: "Tour Homes & Make an Offer",
        desc: "I schedule private tours, providing expert analysis of each property — from structural integrity to neighborhood appreciation trends. When you find the one, I craft a competitive offer strategy that wins without overpaying.",
        tips: ["In competitive markets, escalation clauses help", "Write a personal buyer letter", "Inspect before you waive contingencies"],
    },
    {
        step: "04",
        icon: Shield,
        title: "Inspections & Due Diligence",
        desc: "Once under contract, we order a thorough home inspection. I negotiate repairs or credits on your behalf, ensuring you're protected. We also review the title report and HOA documents to ensure no surprises.",
        tips: ["Never skip a home inspection", "Radon and sewer scope tests are worthwhile", "Review HOA financials and rules"],
    },
    {
        step: "05",
        icon: FileText,
        title: "Secure Your Mortgage",
        desc: "Your lender will finalize the loan with updated financials and an appraisal. I coordinate closely with all parties — lender, title company, and seller's agent — to ensure every deadline is met on time.",
        tips: ["Avoid large purchases during this period", "Respond to lender requests promptly", "Lock your rate at the right time"],
    },
    {
        step: "06",
        icon: Key,
        title: "Close & Celebrate!",
        desc: "On closing day, you'll sign documents, funds are transferred, and you receive the keys. I'll be there every step of the way. Congratulations — you're a Maryland homeowner!",
        tips: ["Do a final walkthrough 24 hours before closing", "Bring photo ID and a cashier's check", "Change your locks after closing"],
    },
];

const faqs = [
    {
        q: "How much do I need for a down payment in Maryland?",
        a: "Down payments in Maryland range from 0% (VA/USDA loans for eligible buyers) to 3–5% (FHA/conventional) to 20% for the best rates. Maryland also offers the Maryland Mortgage Program with down payment assistance for first-time buyers, potentially up to $5,000.",
    },
    {
        q: "What are typical closing costs for buyers in Maryland?",
        a: "Buyers in Maryland typically pay 2–5% of the purchase price in closing costs. This includes lender fees, title insurance, transfer taxes, recording fees, and prepaid items like homeowners insurance and property tax escrow. I always review these with my clients upfront.",
    },
    {
        q: "How long does it take to buy a home in Maryland?",
        a: "From pre-approval to closing, the process typically takes 45–90 days. In competitive markets, finding the right home may take longer, but the contract-to-close period is usually 30–45 days with a prepared buyer.",
    },
    {
        q: "Do I need a buyer's agent? Is it free?",
        a: "Yes, having buyer representation is crucial — and traditionally it costs you nothing. The seller typically pays both agents' commissions. As your buyer's agent, my sole job is to protect your interests and get you the best terms possible.",
    },
    {
        q: "Is now a good time to buy in Central Maryland?",
        a: "Central Maryland has historically strong appreciation rates, especially in Howard County (Ellicott City, Columbia) and the I-95 corridor. While interest rates affect affordability, building equity through homeownership beats renting long-term. Let's discuss your specific situation.",
    },
];

const BuyersPage = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="min-h-screen">
            <SEO
                title="Maryland Home Buyer's Guide"
                description="Your complete guide to buying a home in Central Maryland. Step-by-step process from pre-approval to closing, with expert tips from Realtor Gayane Gevorgyan in Ellicott City, MD."
                canonicalUrl="/buyers"
                keywords="buying a home in Maryland, Maryland home buyer guide, first time home buyer Maryland, Ellicott City homes for sale, Howard County real estate, Maryland mortgage, home buying process Maryland"
            />
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-20 md:pb-28 bg-charcoal relative overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #C9A84C 0%, transparent 50%)" }} />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <Reveal>
                        <p className="text-xs tracking-[0.3em] uppercase text-gold font-body font-semibold mb-4">
                            Complete Buyer's Guide
                        </p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h1 className="text-4xl md:text-6xl font-heading text-warm-white mb-6 leading-tight">
                            Buy Your Dream Home in{" "}
                            <span className="text-gold italic">Central Maryland</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-lg font-body text-warm-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Navigating Maryland's competitive real estate market requires strategy, local knowledge, and an advocate in your corner. I'll guide you through every step — from finding your perfect neighborhood to handing you the keys.
                        </p>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/contact"
                                className="px-10 py-4 bg-gold text-charcoal text-xs tracking-[0.25em] uppercase font-body font-bold hover:bg-warm-white transition-all duration-400"
                            >
                                Book Free Buyer Consultation
                            </Link>
                            <a
                                href="#steps"
                                className="px-10 py-4 border border-warm-white/30 text-warm-white text-xs tracking-[0.25em] uppercase font-body font-semibold hover:border-gold hover:text-gold transition-all duration-400"
                            >
                                See the Process
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Why Buy in Maryland */}
            <section className="py-20 bg-cream">
                <div className="container mx-auto px-6">
                    <Reveal width="100%">
                        <div className="text-center mb-14">
                            <p className="text-xs tracking-[0.3em] uppercase text-gold font-body font-semibold mb-3">
                                Why Maryland?
                            </p>
                            <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
                                One of the Best Places to{" "}
                                <span className="italic text-gold">Own a Home</span> in America
                            </h2>
                            <p className="font-body text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                                Maryland consistently ranks among the top states for quality of life, median household income, and educational attainment. Central Maryland — particularly Howard County and Anne Arundel County — offers a unique blend of suburban comfort, urban access, and long-term investment value.
                            </p>
                        </div>
                    </Reveal>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Top-Ranked Schools",
                                desc: "Howard County Public Schools is consistently rated among the best in the nation, making it a prime destination for families. Columbia, Ellicott City, and Fulton feed into award-winning high schools.",
                                stat: "#1",
                                statLabel: "Howard County Schools Ranked in Maryland",
                            },
                            {
                                title: "Strong Job Market",
                                desc: "With proximity to Washington D.C., BWI Airport, Fort Meade, and NSA, Central Maryland is a hub for government, defense, cybersecurity, and healthcare careers — supporting high home values.",
                                stat: "$120K+",
                                statLabel: "Median Household Income, Howard County",
                            },
                            {
                                title: "Investment Appreciation",
                                desc: "Maryland homes appreciate at a rate above the national average. Ellicott City and Columbia have seen consistent year-over-year value growth, making homeownership one of the smartest financial decisions you can make.",
                                stat: "6–8%",
                                statLabel: "Avg. Annual Home Appreciation, Central MD",
                            },
                        ].map(({ title, desc, stat, statLabel }, i) => (
                            <Reveal key={title} delay={i * 0.15}>
                                <div className="p-8 bg-white border border-gold/10 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                                    <div className="mb-6">
                                        <p className="text-4xl font-heading text-gold font-bold">{stat}</p>
                                        <p className="text-xs tracking-wider uppercase font-body text-muted-foreground mt-1">{statLabel}</p>
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
                                Step-by-Step Roadmap
                            </p>
                            <h2 className="text-3xl md:text-4xl font-heading text-foreground">
                                Your Path to{" "}
                                <span className="italic text-gold">Homeownership</span>
                            </h2>
                        </div>
                    </Reveal>
                    <div className="space-y-8">
                        {buyingSteps.map(({ step, icon: Icon, title, desc, tips }, i) => (
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
                                        <p className="text-[10px] tracking-[0.2em] uppercase font-body font-semibold text-gold mb-2">Quick Tips</p>
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

            {/* Communities CTA */}
            <section className="py-16 bg-gold">
                <div className="container mx-auto px-6 text-center">
                    <Reveal>
                        <h2 className="text-3xl font-heading text-charcoal mb-4">
                            Explore Maryland Communities
                        </h2>
                        <p className="font-body text-charcoal/70 max-w-xl mx-auto mb-8 text-sm leading-relaxed">
                            From the award-winning neighborhoods of Ellicott City to the master-planned community of Columbia — I know every pocket of Central Maryland intimately.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/communities" className="px-10 py-4 bg-charcoal text-warm-white text-xs tracking-[0.25em] uppercase font-body font-bold hover:bg-warm-white hover:text-charcoal transition-all duration-400">
                                Explore Communities
                            </Link>
                            <Link to="/contact" className="px-10 py-4 border-2 border-charcoal text-charcoal text-xs tracking-[0.25em] uppercase font-body font-bold hover:bg-charcoal hover:text-warm-white transition-all duration-400">
                                Schedule a Tour
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-6 max-w-3xl">
                    <Reveal width="100%">
                        <div className="text-center mb-12">
                            <p className="text-xs tracking-[0.3em] uppercase text-gold font-body font-semibold mb-3">
                                Common Questions
                            </p>
                            <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
                                Buyer <span className="italic text-gold">FAQs</span>
                            </h2>
                            <p className="font-body text-muted-foreground text-sm">
                                Real answers to questions Maryland home buyers ask me every week.
                            </p>
                        </div>
                    </Reveal>
                    <div className="space-y-3">
                        {faqs.map(({ q, a }, i) => (
                            <Reveal key={i} delay={i * 0.05}>
                                <div className="border border-gold/15 overflow-hidden">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="w-full flex items-center justify-between p-6 text-left group hover:bg-cream/50 transition-colors duration-200"
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
                    <Reveal delay={0.3}>
                        <div className="mt-10 text-center">
                            <p className="font-body text-muted-foreground text-sm mb-4">Have a question I haven't answered?</p>
                            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-charcoal text-warm-white text-xs tracking-[0.25em] uppercase font-body font-semibold hover:bg-gold hover:text-charcoal transition-all duration-400">
                                Ask Me Directly
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default BuyersPage;
