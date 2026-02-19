import { Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { Reveal } from "./Reveal";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:gayanegevorgyan@boblucidoteam.com?subject=Inquiry from ${formData.name}&body=${formData.message}%0A%0APhone: ${formData.phone}%0AEmail: ${formData.email}`;
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <Reveal width="100%">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-gold font-body font-semibold mb-3">
              Let's Connect
            </p>
            <h2 className="text-3xl md:text-4xl font-heading text-foreground">
              Ready to Make a <span className="italic">Move?</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <div className="space-y-8">
            <Reveal delay={0.2}>
              <p className="text-muted-foreground font-body leading-relaxed">
                Whether you're buying, selling, or renting, I'm here to help you navigate
                the Maryland real estate market with confidence and care.
              </p>
            </Reveal>

            <div className="space-y-6">
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
                    <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                      <Icon size={18} className="text-gold" />
                    </div>
                    <span className="text-sm font-body">{label}</span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.6}>
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { name: "name" as const, placeholder: "Your Name", type: "text" },
                { name: "email" as const, placeholder: "Email Address", type: "email" },
                { name: "phone" as const, placeholder: "Phone Number", type: "tel" },
              ].map(({ name, placeholder, type }) => (
                <input
                  key={name}
                  type={type}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
                  required={name !== "phone"}
                  className="w-full px-5 py-4 bg-cream border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
                />
              ))}
              <textarea
                placeholder="How can I help you?"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="w-full px-5 py-4 bg-cream border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full py-4 bg-charcoal text-warm-white text-xs tracking-[0.3em] uppercase font-body font-medium hover:bg-gold hover:text-charcoal transition-all duration-500"
              >
                Send Message
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
