import communityEllicott from "@/assets/community-ellicott.jpg";
import communityHoward from "@/assets/community-howard.jpg";
import communityColumbia from "@/assets/community-columbia.jpg";
import { Reveal } from "./Reveal";

const communities = [
  { name: "Ellicott City", image: communityEllicott, delay: 0.2 },
  { name: "Howard County", image: communityHoward, delay: 0.3 },
  { name: "Columbia", image: communityColumbia, delay: 0.4 },
];

const Communities = () => {
  return (
    <section id="communities" className="py-24 md:py-32 bg-cream">
      <div className="container mx-auto px-6 text-center">
        <Reveal width="100%">
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-body font-semibold mb-3">
            Areas I Serve
          </p>
          <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-16">
            Maryland <span className="italic">Communities</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {communities.map(({ name, image, delay }) => (
            <Reveal key={name} delay={delay}>
              <div className="group relative overflow-hidden cursor-pointer shadow-lg">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-96 object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/50 transition-colors duration-500 flex flex-col items-center justify-center p-6">
                  <div className="border border-white/0 group-hover:border-white/50 px-8 py-4 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 backdrop-blur-sm">
                    <h3 className="text-xl tracking-[0.2em] uppercase font-body font-medium text-warm-white">
                      {name}
                    </h3>
                  </div>
                  {/* Always visible label, fades out on hover */}
                  <h3 className="absolute bottom-8 text-lg tracking-[0.2em] uppercase font-body font-medium text-warm-white group-hover:opacity-0 transition-opacity duration-500">
                    {name}
                  </h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Communities;
