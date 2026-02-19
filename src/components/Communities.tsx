import communityEllicott from "@/assets/community-ellicott.jpg";
import communityHoward from "@/assets/community-howard.jpg";
import communityColumbia from "@/assets/community-columbia.jpg";

const communities = [
  { name: "Ellicott City", image: communityEllicott },
  { name: "Howard County", image: communityHoward },
  { name: "Columbia", image: communityColumbia },
];

const Communities = () => {
  return (
    <section id="communities" className="py-24 md:py-32 bg-cream">
      <div className="container mx-auto px-6 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-gold font-body font-semibold mb-3">
          Areas I Serve
        </p>
        <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-16">
          Maryland <span className="italic">Communities</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {communities.map(({ name, image }) => (
            <div key={name} className="group relative overflow-hidden cursor-pointer">
              <img
                src={image}
                alt={name}
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/60 transition-colors duration-500 flex items-end justify-center pb-8">
                <h3 className="text-lg tracking-[0.2em] uppercase font-body font-medium text-warm-white">
                  {name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Communities;
