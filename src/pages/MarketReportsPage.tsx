import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { Link } from "react-router-dom";
import {
    TrendingUp,
    TrendingDown,
    Home,
    Clock,
    BarChart2,
    Map,
    AlertTriangle,
    RefreshCw,
    CalendarDays,
} from "lucide-react";

// ---------- Type definitions ----------
interface CountyData {
    name: string;
    medianPrice: number;
    priceChangePct: number;
    avgDaysOnMarket: number;
    listToSaleRatio: number;
    activeListings: number;
    trend: "up" | "down";
    description: string;
}

interface Neighborhood {
    name: string;
    county: string;
    medianPrice: number;
    yoyChangePct: number;
    schoolRating: number;
    marketTemp: "Very Hot" | "Hot" | "Warm" | "Cool";
    description: string;
    highlight: string;
}

interface MarketData {
    lastUpdated: string;
    dataSource: string;
    note: string;
    marketCondition: string;
    marketSummary: string;
    interestRateNote: string;
    counties: {
        howardCounty: CountyData;
        anneArundelCounty: CountyData;
        baltimoreMSA: CountyData;
    };
    neighborhoods: Neighborhood[];
    statewideMetrics: {
        medianPrice: number;
        priceChangePct: number;
        inventoryMonths: number;
        closedSalesYoYChange: number;
    };
}

// ---------- Helper formatters ----------
const fmtPrice = (n: number) =>
    "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

const fmtPct = (n: number) => (n >= 0 ? "+" : "") + n.toFixed(1) + "%";

// ---------- Skeleton ----------
const SkeletonCard = () => (
    <div className="p-8 border border-gold/10 animate-pulse h-64 bg-cream/30">
        <div className="h-5 bg-gray-200 rounded w-1/2 mb-4" />
        <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                </div>
            ))}
        </div>
    </div>
);

// ---------- Main component ----------
const MarketReportsPage = () => {
    const [data, setData] = useState<MarketData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const BASE = import.meta.env.BASE_URL || "/";
        fetch(`${BASE}data/market_data.json?ts=${Date.now()}`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json() as Promise<MarketData>;
            })
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Market data fetch failed:", err);
                setError("Could not load market data. Please try again later.");
                setLoading(false);
            });
    }, []);

    const counties = data
        ? [data.counties.howardCounty, data.counties.anneArundelCounty, data.counties.baltimoreMSA]
        : [];

    // Format the lastUpdated date nicely
    const formattedDate = data?.lastUpdated
        ? new Date(data.lastUpdated + "T00:00:00").toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : null;

    return (
        <div className="min-h-screen">
            <SEO
                title="Maryland Real Estate Market Report 2026"
                description="Live Maryland real estate market data for Central Maryland including Ellicott City, Columbia, Laurel, Severn, and Hanover. Median prices, days on market, and local trends from Realtor Gayane Gevorgyan."
                canonicalUrl="/market-reports"
                keywords="Maryland real estate market 2026, Ellicott City home prices, Howard County real estate trends, Columbia MD housing market, Maryland housing market report, home prices Central Maryland, real estate trends Maryland"
            />
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-20 bg-charcoal relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-5"
                    style={{ backgroundImage: "radial-gradient(circle at 60% 40%, #C9A84C 0%, transparent 60%)" }}
                />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <Reveal>
                        <p className="text-xs tracking-[0.3em] uppercase text-gold font-body font-semibold mb-4">
                            Live Market Intelligence
                        </p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h1 className="text-4xl md:text-6xl font-heading text-warm-white mb-6 leading-tight">
                            Central Maryland{" "}
                            <span className="text-gold italic">Real Estate</span>
                            <br />
                            Market Report
                        </h1>
                    </Reveal>

                    {/* Live data badge */}
                    <Reveal delay={0.2}>
                        <div className="flex items-center justify-center gap-3 mb-8">
                            {loading ? (
                                <div className="flex items-center gap-2 px-4 py-2 bg-warm-white/10 border border-warm-white/20 text-warm-white/60 text-xs font-body">
                                    <RefreshCw size={12} className="animate-spin" />
                                    Loading live data…
                                </div>
                            ) : data ? (
                                <div className="flex flex-col sm:flex-row items-center gap-3">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-green-900/30 border border-green-600/30 text-green-400 text-xs font-body">
                                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                        Data Current
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-warm-white/10 border border-warm-white/20 text-warm-white/60 text-xs font-body">
                                        <CalendarDays size={12} className="text-gold" />
                                        Last updated: {formattedDate}
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-warm-white/10 border border-warm-white/20 text-warm-white/50 text-xs font-body">
                                        <RefreshCw size={11} />
                                        Auto-refreshed weekly
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </Reveal>

                    <Reveal delay={0.3}>
                        <p className="text-lg font-body text-warm-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Understanding the market is the foundation of every smart real estate decision. Here's what the
                            data says about buying and selling conditions across Howard County, Anne Arundel County, and
                            surrounding areas right now.
                        </p>
                    </Reveal>
                    <Reveal delay={0.4}>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/contact"
                                className="px-10 py-4 bg-gold text-charcoal text-xs tracking-[0.25em] uppercase font-body font-bold hover:bg-warm-white transition-all duration-400"
                            >
                                Discuss Your Local Market
                            </Link>
                            <Link
                                to="/communities"
                                className="px-10 py-4 border border-warm-white/30 text-warm-white text-xs tracking-[0.25em] uppercase font-body font-semibold hover:border-gold hover:text-gold transition-all duration-400"
                            >
                                Explore Communities
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Market Condition Alert */}
            {data && (
                <section className="py-10 bg-gold/10 border-y border-gold/20">
                    <div className="container mx-auto px-6">
                        <div className="flex items-center gap-4 max-w-4xl mx-auto">
                            <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center shrink-0">
                                <AlertTriangle size={20} className="text-gold" />
                            </div>
                            <p className="font-body text-foreground text-sm leading-relaxed">
                                <strong>Current Market Condition: {data.marketCondition}.</strong>{" "}
                                {data.marketSummary}
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* County-Level Stats */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-6">
                    <Reveal width="100%">
                        <div className="text-center mb-14">
                            <p className="text-xs tracking-[0.3em] uppercase text-gold font-body font-semibold mb-3">
                                County-Level Overview
                            </p>
                            <h2 className="text-3xl md:text-4xl font-heading text-foreground">
                                Market <span className="italic text-gold">Snapshot</span>
                            </h2>
                            {data && (
                                <p className="font-body text-muted-foreground mt-3 text-xs flex items-center justify-center gap-2">
                                    <CalendarDays size={13} className="text-gold" />
                                    Data current as of {formattedDate} · Source: {data.dataSource}
                                </p>
                            )}
                        </div>
                    </Reveal>

                    {error && (
                        <div className="max-w-lg mx-auto text-center text-sm font-body text-red-600 bg-red-50 border border-red-200 p-6 mb-10">
                            {error}
                        </div>
                    )}

                    <div className="grid md:grid-cols-3 gap-6">
                        {loading ? (
                            [1, 2, 3].map((i) => <SkeletonCard key={i} />)
                        ) : (
                            counties.map((county) => (
                                <Reveal key={county.name} delay={0.1}>
                                    <div className="p-8 border border-gold/15 hover:border-gold/40 transition-all duration-300 hover:-translate-y-1 bg-cream/30 h-full">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-lg font-heading text-foreground">{county.name}</h3>
                                            {county.trend === "up" ? (
                                                <TrendingUp size={18} className="text-green-600" />
                                            ) : (
                                                <TrendingDown size={18} className="text-red-500" />
                                            )}
                                        </div>
                                        <div className="space-y-4 mb-6">
                                            {[
                                                { icon: Home, label: "Median Price", value: fmtPrice(county.medianPrice) },
                                                { icon: TrendingUp, label: "YoY Change", value: fmtPct(county.priceChangePct), color: county.priceChangePct >= 0 ? "text-green-600" : "text-red-500" },
                                                { icon: Clock, label: "Avg. Days on Market", value: `${county.avgDaysOnMarket} days` },
                                                { icon: BarChart2, label: "List-to-Sale", value: `${county.listToSaleRatio}%` },
                                                { icon: Map, label: "Active Listings", value: county.activeListings.toLocaleString() },
                                            ].map(({ icon: Icon, label, value, color }) => (
                                                <div key={label} className="flex justify-between items-center py-2 border-b border-gold/10 last:border-0">
                                                    <span className="text-xs font-body text-muted-foreground flex items-center gap-2">
                                                        <Icon size={12} /> {label}
                                                    </span>
                                                    <span className={`text-sm font-body font-semibold ${color ?? "text-foreground"}`}>
                                                        {value}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-xs font-body text-muted-foreground leading-relaxed">{county.description}</p>
                                    </div>
                                </Reveal>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Neighborhood Deep Dive */}
            <section className="py-20 bg-cream">
                <div className="container mx-auto px-6">
                    <Reveal width="100%">
                        <div className="text-center mb-14">
                            <p className="text-xs tracking-[0.3em] uppercase text-gold font-body font-semibold mb-3">
                                Neighborhood Intelligence
                            </p>
                            <h2 className="text-3xl md:text-4xl font-heading text-foreground">
                                Community-Level <span className="italic text-gold">Analysis</span>
                            </h2>
                            <p className="font-body text-muted-foreground mt-3 text-sm max-w-2xl mx-auto">
                                Market conditions vary dramatically from neighborhood to neighborhood. Here's what's happening in the
                                communities I serve most actively.
                            </p>
                        </div>
                    </Reveal>
                    <div className="grid md:grid-cols-2 gap-6">
                        {loading
                            ? [1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)
                            : data?.neighborhoods.map(({ name, county, medianPrice, yoyChangePct, schoolRating, marketTemp, description, highlight }, i) => (
                                <Reveal key={name} delay={i * 0.1}>
                                    <div className="p-8 bg-white border border-gold/10 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1 shadow-sm h-full flex flex-col">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-xl font-heading text-foreground">{name}</h3>
                                                <p className="text-xs font-body text-muted-foreground mt-1">{county}</p>
                                            </div>
                                            <span
                                                className={`px-3 py-1 text-[10px] tracking-[0.15em] uppercase font-body font-semibold ${marketTemp === "Very Hot"
                                                    ? "bg-red-100 text-red-700"
                                                    : marketTemp === "Hot"
                                                        ? "bg-orange-100 text-orange-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {marketTemp}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-3 mb-5">
                                            <div className="text-center p-3 bg-cream rounded">
                                                <p className="text-base font-heading text-gold font-bold">{fmtPrice(medianPrice)}</p>
                                                <p className="text-[10px] font-body text-muted-foreground">Median Price</p>
                                            </div>
                                            <div className="text-center p-3 bg-cream rounded">
                                                <p className={`text-base font-heading font-bold ${yoyChangePct >= 0 ? "text-green-600" : "text-red-500"}`}>
                                                    {fmtPct(yoyChangePct)}
                                                </p>
                                                <p className="text-[10px] font-body text-muted-foreground">YoY Growth</p>
                                            </div>
                                            <div className="text-center p-3 bg-cream rounded">
                                                <p className="text-base font-heading text-foreground font-bold">{schoolRating}/10</p>
                                                <p className="text-[10px] font-body text-muted-foreground">Schools</p>
                                            </div>
                                        </div>
                                        <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{description}</p>
                                        <div className="p-3 bg-gold/5 border-l-2 border-gold">
                                            <p className="text-xs font-body text-foreground italic">💡 {highlight}</p>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                    </div>
                </div>
            </section>

            {/* Market Timing */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-6">
                    <Reveal width="100%">
                        <div className="text-center mb-12">
                            <p className="text-xs tracking-[0.3em] uppercase text-gold font-body font-semibold mb-3">
                                Timing Insights
                            </p>
                            <h2 className="text-3xl font-heading text-foreground mb-4">
                                Is It a Good Time to Buy or Sell{" "}
                                <span className="italic text-gold">in Maryland?</span>
                            </h2>
                        </div>
                    </Reveal>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <Reveal delay={0.1}>
                            <div className="p-8 bg-cream border border-gold/15">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                    <TrendingUp size={22} className="text-green-700" />
                                </div>
                                <h3 className="text-xl font-heading text-foreground mb-4">For Sellers: Yes, Act Now</h3>
                                <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
                                    Central Maryland is experiencing historically low inventory relative to buyer demand. This means
                                    well-priced, well-presented homes are receiving multiple offers and often selling above asking price.
                                    If you've been considering selling, market conditions strongly favor sellers.
                                </p>
                                <ul className="space-y-2">
                                    {[
                                        "Low inventory creates competitive bidding",
                                        "Days on market at near-historic lows",
                                        "Buyer demand remains robust despite rate changes",
                                        "Relocation buyers continuously entering the market",
                                    ].map((pt) => (
                                        <li key={pt} className="flex items-start gap-2 text-xs font-body text-muted-foreground">
                                            <TrendingUp size={12} className="text-green-600 mt-0.5 shrink-0" />
                                            {pt}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/sellers" className="inline-block mt-6 text-xs tracking-[0.2em] uppercase font-body font-semibold text-gold hover:text-charcoal transition-colors">
                                    Get Free Valuation →
                                </Link>
                            </div>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <div className="p-8 bg-cream border border-gold/15">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                    <Home size={22} className="text-blue-700" />
                                </div>
                                <h3 className="text-xl font-heading text-foreground mb-4">For Buyers: Buy Now, Wait Less</h3>
                                <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
                                    While interest rates remain above pandemic lows, waiting for a "perfect rate" often costs more in the
                                    long run as home prices continue to appreciate. The right strategy is to buy now with a competitive
                                    offer, then refinance when rates drop. Equity builds from day one.
                                </p>
                                <ul className="space-y-2">
                                    {[
                                        "Prices continue appreciating — waiting costs equity",
                                        "Refinancing available when rates drop",
                                        "Maryland Mortgage Program offers down payment assistance",
                                        "Better to compete now than against more buyers later",
                                    ].map((pt) => (
                                        <li key={pt} className="flex items-start gap-2 text-xs font-body text-muted-foreground">
                                            <Home size={12} className="text-blue-600 mt-0.5 shrink-0" />
                                            {pt}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/buyers" className="inline-block mt-6 text-xs tracking-[0.2em] uppercase font-body font-semibold text-gold hover:text-charcoal transition-colors">
                                    Start Your Home Search →
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Data source footer note */}
            {data && (
                <section className="py-8 bg-cream/50 border-t border-gold/10">
                    <div className="container mx-auto px-6 text-center">
                        <p className="text-xs font-body text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
                            <CalendarDays size={13} className="text-gold" />
                            Market data last updated: <strong>{formattedDate}</strong>
                            <span className="opacity-40 mx-1">·</span>
                            Source: {data.dataSource}
                            <span className="opacity-40 mx-1">·</span>
                            <RefreshCw size={11} className="text-gold" />
                            {data.note}
                        </p>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-16 bg-charcoal">
                <div className="container mx-auto px-6 text-center">
                    <Reveal>
                        <h2 className="text-3xl font-heading text-warm-white mb-4">
                            Want a Personalized Market Analysis?
                        </h2>
                        <p className="font-body text-warm-white/60 max-w-xl mx-auto mb-8 text-sm leading-relaxed">
                            Aggregate data tells part of the story. Your specific street, neighborhood, and home features
                            dramatically affect value. Let me give you a hyper-local analysis tailored to your situation.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-block px-12 py-4 bg-gold text-charcoal text-xs tracking-[0.3em] uppercase font-body font-bold hover:bg-warm-white transition-all duration-400"
                        >
                            Get My Local Market Report
                        </Link>
                    </Reveal>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default MarketReportsPage;
