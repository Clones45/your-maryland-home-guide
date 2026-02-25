import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedCTA = () => {
    return (
        <div className="bg-gold py-4 px-6">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
                <div className="flex items-center gap-2 text-charcoal">
                    <MapPin size={14} className="shrink-0" />
                    <p className="text-xs md:text-sm font-body font-medium tracking-wide">
                        <span className="font-semibold">Currently active</span> in Ellicott City, Columbia, Howard County & surrounding Maryland areas
                    </p>
                </div>
                <div className="hidden sm:block w-[1px] h-4 bg-charcoal/30" />
                <Link
                    to="/contact"
                    className="flex items-center gap-1.5 text-xs font-body font-bold tracking-[0.15em] uppercase text-charcoal hover:opacity-70 transition-opacity whitespace-nowrap"
                >
                    Book a Free Call <ArrowRight size={13} className="mt-[1px]" />
                </Link>
            </div>
        </div>
    );
};

export default FeaturedCTA;
