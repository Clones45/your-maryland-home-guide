import aboutImg from "@/assets/about1.png";
import aboutImg2 from "@/assets/about2.png";
import aboutImg3 from "@/assets/about3.png";
import { Globe, Heart, Award, BookOpen } from "lucide-react";
import { Reveal } from "./Reveal";
import { Link } from "react-router-dom";

const credentials = [
  "Licensed Maryland REALTOR®",
  "Lucido Global · Bob Lucido Team",
  "NAR Member",
  "EN · RU · AM",
];

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <Reveal width="100%">
          <div className="relative group flex flex-col items-center">

            {/* Rectangular crossfading portrait */}
            <div className="relative w-full max-w-md mx-auto">
              {/* Gold offset border frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold -z-10 transition-transform duration-1000 ease-out group-hover:translate-x-3 group-hover:translate-y-3" />

              {/* Stacked images — crossfade now loops 3 images */}
              <div className="relative w-full overflow-hidden shadow-2xl" style={{ aspectRatio: "3/4" }}>
                <img
                  src={aboutImg}
                  alt="Gayane Gevorgyan, Maryland Realtor"
                  className="absolute inset-0 w-full h-full object-cover object-top animate-photo-a"
                />
                <img
                  src={aboutImg2}
                  alt="Gayane Gevorgyan, Maryland Realtor"
                  className="absolute inset-0 w-full h-full object-cover object-top animate-photo-b"
                />
                <img
                  src={aboutImg3}
                  alt="Gayane Gevorgyan, Maryland Realtor"
                  className="absolute inset-0 w-full h-full object-cover object-top animate-photo-c"
                />
              </div>
            </div>

            {/* Credentials ribbon */}
            <div className="mt-12 max-w-md w-full mx-auto grid grid-cols-2 gap-2">
              {credentials.map((c) => (
                <div key={c} className="px-3 py-2 bg-cream border border-gold/20 text-center">
                  <span className="text-[10px] tracking-[0.15em] uppercase font-body font-semibold text-charcoal">
                    {c}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal delay={0.2}>
            <p className="text-xs tracking-[0.3em] uppercase text-gold font-body font-semibold mb-3">
              The "Why" &amp; Philosophy
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <h2 className="text-3xl md:text-4xl font-heading text-foreground leading-snug mb-6">
              More than a <span className="italic text-gold">Profession</span>
            </h2>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="text-muted-foreground font-body leading-relaxed mb-4">
              I didn't choose real estate because it looked glamorous, I chose it because I
              understand what "home" truly means. As a full-time single mom who rebuilt her
              life from the ground up, I know what stability feels like when you finally earn it.
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <p className="text-muted-foreground font-body leading-relaxed mb-4">
              I navigated divorce, custody, financial pressure, and starting over, all while
              raising my son and building my career. Real estate became a way to help people
              feel secure, empowered, and confident in one of the biggest decisions of their
              lives. I stay passionate because I know every transaction represents someone's
              future, not just a contract.
            </p>
          </Reveal>
          <Reveal delay={0.55}>
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              Fluent in English, Russian, and Armenian, and backed by the global reach of
              Keller Williams Lucido Agency, I serve Maryland's diverse communities with cultural sensitivity
              and world-class resources. Whether you're a local family or relocating
              internationally, I speak your language, literally and figuratively.
            </p>
          </Reveal>
          <Reveal delay={0.6}>
            <p className="text-foreground font-body font-medium leading-relaxed mb-8 border-l-2 border-gold pl-4 italic">
              "Strong but patient. Strategic but caring. Direct but never pushy."
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Globe, label: "3 Languages", desc: "EN, RU, AM", delay: 0.6 },
              { icon: Heart, label: "Heart-Led", desc: "Empathetic guide", delay: 0.7 },
              { icon: Award, label: "Strategic", desc: "Fierce negotiator", delay: 0.8 },
              { icon: Globe, label: "Intl Relations", desc: "Diplomatic edge", delay: 0.9 },
            ].map(({ icon: Icon, label, desc, delay }) => (
              <Reveal key={label} delay={delay}>
                <div className="flex flex-col items-center text-center gap-1 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center transition-all duration-500 group-hover:bg-gold group-hover:scale-110">
                    <Icon size={16} className="text-gold transition-colors duration-500 group-hover:text-white" />
                  </div>
                  <span className="text-[10px] tracking-wider uppercase font-body font-semibold text-foreground transition-colors duration-500 group-hover:text-gold block mt-2">
                    {label}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{desc}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={1.0}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-3 bg-charcoal text-warm-white text-xs tracking-[0.25em] uppercase font-body font-semibold hover:bg-gold hover:text-charcoal transition-all duration-500 group"
            >
              <BookOpen size={14} className="group-hover:scale-110 transition-transform" />
              Get Your Free Buyer or Seller Guide
            </Link>
          </Reveal>
        </div>
      </div >
    </section >
  );
};

export default About;
