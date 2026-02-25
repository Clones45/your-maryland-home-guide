import { Phone, Mail, MapPin, CheckCircle, ArrowRight, Calendar } from "lucide-react";
import { useState } from "react";
import { Reveal } from "./Reveal";

const nextSteps = [
  { label: "Schedule a Call", desc: "Pick a time that works for you, same day often available." },
  { label: "Free Market Analysis", desc: "Gayane reviews your goals and local market data." },
  { label: "Your Action Plan", desc: "A clear, pressure-free roadmap. Buy, sell, or both." },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:gayanegevorgyan@boblucidoteam.com?subject=Inquiry from ${formData.name}&body=${formData.message}%0A%0APhone: ${formData.phone}%0AEmail: ${formData.email}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <Reveal width="100%">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-gold font-body font-semibold mb-3">
              Let's Connect
            </p>
            <h2 className="text-3xl md:text-5xl font-heading text-foreground leading-tight mb-3">
              Let's Find Your Home
            </h2>
            <p className="text-base font-body text-muted-foreground">
              Gayane responds within hours, not days.{" "}
              <span className="text-gold font-semibold">No pressure. No obligation.</span>
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Left side */}
          <div className="space-y-10">
            <Reveal delay={0.2}>
              <p className="text-muted-foreground font-body leading-relaxed">
                Whether you're buying your first home, selling a property, or navigating a
                complex life change, Gayane will meet you where you are and guide you every
                step of the way through Maryland's real estate market.
              </p>
            </Reveal>

            {/* Contact details */}
            <div className="space-y-5">
              {[
                { icon: Phone, label: "(443) 922-8458", href: "tel:+14439228458", delay: 0.3 },
                { icon: Mail, label: "gayanegevorgyan@boblucidoteam.com", href: "mailto:gayanegevorgyan@boblucidoteam.com", delay: 0.4 },
                { icon: MapPin, label: "Ellicott City, Maryland", href: "#", delay: 0.5 },
              ].map(({ icon: Icon, label, href, delay }) => (
                <Reveal key={label} delay={delay}>
                  <a
                    href={href}
                    className="flex items-center gap-4 text-foreground hover:text-gold transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center group-hover:bg-gold/10 transition-colors shrink-0">
                      <Icon size={18} className="text-gold" />
                    </div>
                    <span className="text-sm font-body break-all">{label}</span>
                  </a>
                </Reveal>
              ))}
            </div>

            {/* What happens next */}
            <Reveal delay={0.6}>
              <div>
                <p className="text-xs tracking-[0.25em] uppercase font-body font-semibold text-gold mb-4">
                  What Happens Next
                </p>
                <div className="space-y-4">
                  {nextSteps.map(({ label, desc }, i) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-7 h-7 rounded-full bg-cream border border-gold/30 flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-body font-bold text-gold">{i + 1}</span>
                      </div>
                      <div>
                        <p className="text-sm font-body font-semibold text-foreground">{label}</p>
                        <p className="text-xs font-body text-muted-foreground mt-0.5">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Calendly-style prompt */}
            <Reveal delay={0.7}>
              <a
                href="tel:+14439228458"
                className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-body font-semibold text-gold border-b border-gold/40 pb-0.5 hover:border-gold transition-colors group"
              >
                <Calendar size={13} />
                Prefer to call directly? (443) 922-8458
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </Reveal>
          </div>

          {/* Right side — form */}
          <Reveal delay={0.4}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center animate-fade-in-up">
                  <CheckCircle size={32} className="text-gold" />
                </div>
                <h3 className="text-2xl font-heading text-foreground animate-fade-in-up">
                  Thank You, {formData.name}!
                </h3>
                <p className="text-sm font-body text-muted-foreground max-w-xs animate-fade-in-up">
                  Gayane will be in touch within a few hours to set up your free consultation.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", message: "" }); }}
                  className="mt-4 text-xs tracking-[0.2em] uppercase font-body text-gold hover:text-foreground transition-colors underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div className="bg-cream p-8 border border-gold/10">
                <p className="text-xs tracking-[0.25em] uppercase font-body font-semibold text-charcoal mb-6">
                  Send a Message
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { name: "name" as const, placeholder: "Your Full Name", type: "text" },
                    { name: "email" as const, placeholder: "Email Address", type: "email" },
                    { name: "phone" as const, placeholder: "Phone Number (optional)", type: "tel" },
                  ].map(({ name, placeholder, type }) => (
                    <input
                      key={name}
                      type={type}
                      placeholder={placeholder}
                      value={formData[name]}
                      onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
                      required={name !== "phone"}
                      className="w-full px-5 py-4 bg-white border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
                    />
                  ))}
                  <textarea
                    placeholder="How can I help you? (buying, selling, both, or just curious)"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full px-5 py-4 bg-white border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-4 bg-charcoal text-warm-white text-xs tracking-[0.3em] uppercase font-body font-semibold hover:bg-gold hover:text-charcoal transition-all duration-500"
                  >
                    Get My Free Consultation
                  </button>
                  <p className="text-[10px] text-center font-body text-muted-foreground">
                    Typically responds within 2–4 hours · No spam, ever
                  </p>
                </form>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
