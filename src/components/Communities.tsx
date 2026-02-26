import communityEllicott from "@/assets/community-ellicott.jpg";
import communityColumbia from "@/assets/community-columbia.webp";
import communityBowie from "@/assets/community-bowie.webp";
import communityTowson from "@/assets/community-towson.webp";
import communityNottingham from "@/assets/community-nottingham.webp";
import communityClarksville from "@/assets/community-clarksville.webp";
import { Reveal } from "./Reveal";
import { Search } from "lucide-react";

const communities = [
  {
    name: "Ellicott City",
    image: communityEllicott,
    badge: "Gayane's Home Market",
    medal: "gold",
    tagline: "Charming streets, top-rated schools & a vibrant community.",
    highlights: ["Top Howard Co. schools", "Historic downtown", "Avg. $600K–$800K"],
    searchUrl: "https://gayanegevorgyan.boblucidoteam.com/listing?condition=%7B%22location%22%3A%7B%22city%22%3A%5B%22Ellicott%20City%2C%20MD%22%5D%7D%7D&uiConfig=%7B%7D&zoom=10&page=1",
    delay: 0.2,
  },
  {
    name: "Columbia",
    image: communityColumbia,
    badge: "Master-Planned Living",
    medal: "silver",
    tagline: "Award-winning planned city with lakes, trails & diversity.",
    highlights: ["10 planned villages", "Walk-to-amenity lifestyle", "Avg. $450K–$650K"],
    searchUrl: "https://gayanegevorgyan.boblucidoteam.com/listing?condition=%7B%22location%22%3A%7B%22city%22%3A%5B%22Columbia%2C%20MD%22%5D%7D%7D&uiConfig=%7B%7D&zoom=11&page=1",
    delay: 0.3,
  },
  {
    name: "Bowie",
    image: communityBowie,
    badge: "Excellent Connectivity",
    medal: null,
    tagline: "A diverse and growing city with fantastic amenities and parks.",
    highlights: ["Rich history", "Family-friendly", "Excellent parks"],
    searchUrl: "https://gayanegevorgyan.boblucidoteam.com/listing?condition=%7B%22location%22%3A%7B%22city%22%3A%5B%22Bowie%2C%20MD%22%5D%7D%7D&uiConfig=%7B%7D&zoom=14&page=1",
    delay: 0.5,
  },
  {
    name: "Towson",
    image: communityTowson,
    badge: "Vibrant Hub",
    medal: null,
    tagline: "A bustling college town with a perfect mix of urban and suburban vibes.",
    highlights: ["Shopping & dining", "University town", "Walkable areas"],
    searchUrl: "https://gayanegevorgyan.boblucidoteam.com/listing?condition=%7B%22location%22%3A%7B%22city%22%3A%5B%22Towson%2C%20MD%22%5D%7D%7D&uiConfig=%7B%7D&zoom=11&page=1",
    delay: 0.6,
  },
  {
    name: "Nottingham",
    image: communityNottingham,
    badge: "Peaceful Suburbs",
    medal: null,
    tagline: "A relaxed, community-focused area perfect for setting down roots.",
    highlights: ["Convenient location", "Quiet neighborhoods", "Great value"],
    searchUrl: "https://gayanegevorgyan.boblucidoteam.com/listing?condition=%7B%22location%22%3A%7B%22city%22%3A%5B%22Nottingham%2C%20MD%22%5D%7D%7D&uiConfig=%7B%7D&zoom=14&page=1",
    delay: 0.7,
  },
  {
    name: "Clarksville",
    image: communityClarksville,
    badge: "Luxury Living",
    medal: "gold",
    tagline: "Upscale estates, top-tier schools, and tranquil landscapes.",
    highlights: ["Luxury homes", "Prime location", "Exceptional schools"],
    searchUrl: "https://gayanegevorgyan.boblucidoteam.com/listing?condition=%7B%22location%22%3A%7B%22city%22%3A%5B%22Clarksville%2C%20MD%22%5D%7D%7D&uiConfig=%7B%7D&zoom=10&page=1",
    delay: 0.8,
  },
];

const Communities = () => {
  return (
    <section id="communities" className="py-24 md:py-32 bg-cream overflow-hidden">
      <div className="container mx-auto px-6">
        <Reveal width="100%">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-gold font-body font-semibold mb-3">
              Areas I Serve
            </p>
            <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
              Maryland <span className="italic">Communities</span>
            </h2>
            <p className="text-sm font-body text-muted-foreground max-w-xl mx-auto">
              Deep local knowledge, block by block. Gayane doesn't just show homes —
              she knows the neighborhoods, the schools, and what each zip code feels like to live in.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {communities.map(({ name, image, badge, medal, tagline, highlights, searchUrl, delay }) => (
            <Reveal key={name} delay={delay}>
              <div className="group relative overflow-hidden shadow-lg bg-white">
                {/* Image */}
                <div className="relative overflow-hidden h-64">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/60 transition-colors duration-500" />

                  {/* Badge */}
                  {medal === "gold" && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-gold text-charcoal text-[10px] tracking-[0.2em] uppercase font-body font-bold">
                      {badge}
                    </div>
                  )}
                  {medal === "special" && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-charcoal/80 backdrop-blur-sm border border-gold/60 text-gold text-[10px] tracking-[0.2em] uppercase font-body font-bold">
                      {badge}
                    </div>
                  )}
                  {(medal === "silver" || medal === null) && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[10px] tracking-[0.2em] uppercase font-body font-semibold">
                      {badge}
                    </div>
                  )}

                  {/* Area name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-xl tracking-[0.15em] uppercase font-body font-semibold text-warm-white">
                      {name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-sm font-body text-muted-foreground italic mb-4">{tagline}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {highlights.map((h) => (
                      <span
                        key={h}
                        className="px-3 py-1 bg-cream text-[10px] tracking-[0.1em] uppercase font-body font-semibold text-charcoal border border-gold/20"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                  <a
                    href={searchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-body font-semibold text-gold hover:text-charcoal transition-colors duration-300 group/link"
                  >
                    <Search size={12} />
                    Search Homes in {name}
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.7} width="100%">
          <div className="mt-12 text-center border-t border-gold/30 pt-10">
            <p className="text-sm md:text-base font-body text-foreground/80 leading-relaxed">
              Also actively serving:{" "}
              <strong className="font-semibold text-charcoal">
                Bowie, Laurel, Towson, Potomac, Bethesda, Columbia, Rockville, Nottingham, Catonsville, Hyattsville, College Park, Gaithersburg, Ellicott City, Silver Spring, Westlake, Baltimore & Clarksville
              </strong>.
            </p>
            <p className="mt-2 text-[11px] tracking-[0.2em] uppercase text-gold font-body font-semibold">
              Don't see your area? Reach out — Gayane likely covers it.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Communities;
