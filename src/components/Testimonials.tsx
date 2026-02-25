import { Star, Quote } from "lucide-react";
import { Reveal } from "./Reveal";

const testimonials = [
    {
        quote:
            "Ms. Gayane Gevorgyan possess outstanding and exceptional behavior and patience. She talks honestly and never thinks for her benefits. I congratulate Bob Lucido Team for having such team member. Well done.",
        name: "Sayed Sharif Siddiqi",
        location: "Maryland",
        type: "Buyer",
        stars: 5,
    },
    {
        quote:
            "Gayane was very helpful throughout the whole process, providing quick responses, kindness, and reassurance. She was able to help our family smoothly transition into our new place on short notice. We appreciate her guidance and highly recommend!!",
        name: "Moses Holloway",
        location: "Maryland",
        type: "Buyer",
        stars: 5,
    },
    {
        quote:
            "Gayane is a very professional and knowledgeable agent. She was always available to answer our questions and provided excellent guidance throughout the process. We are very happy with the results.",
        name: "Mike Alpert",
        location: "Maryland",
        type: "Buyer",
        stars: 5,
    },
    {
        quote:
            "Gayane did an outstanding job helping us find a home that met all of our needs. She was patient and was always available to answer any questions or address any concerns we had.",
        name: "Jim Geier",
        location: "Maryland",
        type: "Buyer",
        stars: 5,
    },
    {
        quote:
            "Great personality, very helpful, she's always available and ready to put in the work in order to provide her clients with just what they need. I definitely recommend her to whosoever needs a real estate agent.",
        name: "Ntowen Manfred",
        location: "Maryland",
        type: "Buyer",
        stars: 5,
    },
    {
        quote:
            "An amazing experience! The customer support was fantastic! I highly recommend Gayane for any real estate needs. She made the process very smooth and stress-free.",
        name: "Brittney Norman",
        location: "Maryland",
        type: "Buyer",
        stars: 5,
    },
    {
        quote:
            "I recently had the pleasure of working with Gayane from Bob Lucido Team of Keller Williams agency, and I can't speak highly enough of her. Her level of professionalism, expertise, and dedication is truly unmatched.",
        name: "Kamal Kaur",
        location: "Maryland",
        type: "Buyer",
        stars: 5,
    },
    {
        quote:
            "Gayane is an amazing person and a great realtor. She is very helpful and knowledgeable. I highly recommend her to anyone looking for a realtor.",
        name: "Reem Saadi",
        location: "Maryland",
        type: "Buyer",
        stars: 5,
    },
];

const Stars = ({ count }: { count: number }) => (
    <div className="flex gap-1 mb-4">
        {Array.from({ length: count }).map((_, i) => (
            <Star key={i} size={12} className="fill-gold text-gold" />
        ))}
    </div>
);

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-24 md:py-32 bg-cream overflow-hidden">
            <div className="container mx-auto px-6">
                <Reveal width="100%">
                    <div className="text-center mb-6">
                        <p className="text-xs tracking-[0.3em] uppercase text-gold font-body font-semibold mb-3">
                            Client Stories
                        </p>
                        <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
                            What Clients Are <span className="italic">Saying</span>
                        </h2>

                        {/* Google badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gold/20 shadow-sm mb-10">
                            <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} size={11} className="fill-gold text-gold" />
                                ))}
                            </div>
                            <span className="text-[11px] font-body font-semibold text-charcoal tracking-wide">
                                5.0 on Google Reviews
                            </span>
                            <span className="text-[10px] font-body text-muted-foreground">· 8 reviews</span>
                        </div>
                    </div>
                </Reveal>

                {/* Grid of all testimonials */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map(({ quote, name, location, type, stars }, i) => (
                        <Reveal key={name} delay={i * 0.1}>
                            <div className="bg-white shadow-md p-8 relative flex flex-col h-full hover:shadow-xl transition-shadow duration-500 group">
                                {/* Decorative quote mark */}
                                <Quote
                                    size={36}
                                    className="absolute top-5 right-6 text-gold/10 group-hover:text-gold/20 transition-colors duration-500"
                                />

                                <Stars count={stars} />

                                {/* Type badge */}
                                <span className="inline-block px-2 py-0.5 bg-cream border border-gold/20 text-[9px] tracking-[0.2em] uppercase font-body font-semibold text-gold mb-3 self-start">
                                    {type}
                                </span>

                                <p className="font-body text-sm text-foreground/80 leading-relaxed mb-6 flex-1">
                                    "{quote}"
                                </p>

                                <div className="border-t border-gold/20 pt-4">
                                    <p className="font-body font-semibold text-sm text-foreground">{name}</p>
                                    <p className="font-body text-xs text-gold tracking-[0.15em] uppercase mt-0.5">
                                        {location}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.6} width="100%">
                    <div className="mt-12 text-center flex flex-col items-center gap-6">
                        <p className="text-sm font-body text-muted-foreground">
                            Join 100+ Maryland families who trusted Gayane with their biggest move.
                        </p>
                        <a
                            href="https://g.page/r/CeTML7oLGD76EAE/review"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-3 bg-gold text-charcoal text-xs tracking-[0.2em] uppercase font-body font-bold hover:bg-charcoal hover:text-gold transition-colors duration-300"
                        >
                            Leave a Review
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default Testimonials;
