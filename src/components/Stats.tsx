import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

const stats = [
  { value: 4, suffix: "+", label: "Years of Experience" },
  { value: 3, suffix: "", label: "Languages Spoken" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];


const AnimatedCounter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1800;
          const step = Math.ceil(target / (duration / 16));
          const interval = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(start);
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const Stats = () => {
  return (
    <section className="py-16 bg-charcoal">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-3 gap-4 md:gap-8">
          {stats.map(({ value, suffix, label }, i) => (
            <Reveal key={label} delay={i * 0.1}>
              <div className="text-center group">
                <div className="relative inline-block">
                  <p className="text-4xl md:text-5xl font-heading font-semibold text-gold mb-2 group-hover:scale-110 transition-transform duration-300">
                    <AnimatedCounter target={value} suffix={suffix} />
                  </p>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-gold/40 group-hover:w-full transition-all duration-500" />
                </div>
                <p className="mt-4 text-[11px] tracking-[0.25em] uppercase font-body text-warm-white/60 group-hover:text-warm-white/90 transition-colors duration-300">
                  {label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
