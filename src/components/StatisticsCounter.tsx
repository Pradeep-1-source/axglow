import React, { useEffect, useRef, useState } from 'react';
import { METRICS_DATA } from '../data/content';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const StatisticsCounter: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<number[]>(METRICS_DATA.map(() => 0));

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
        onEnter: () => {
          METRICS_DATA.forEach((metric, index) => {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: metric.value,
              duration: 2.5,
              ease: 'power2.out',
              onUpdate: () => {
                setCounts((prev) => {
                  const updated = [...prev];
                  updated[index] = Number(obj.val.toFixed(metric.value % 1 !== 0 ? 1 : 0));
                  return updated;
                });
              },
            });
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-12 bg-transparent relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#3BD8D9]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto glass-panel p-10 md:p-16 rounded-3xl border border-white/10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {METRICS_DATA.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start border-l-2 border-[#3BD8D9]/40 pl-6 space-y-2 group hover:border-[#3BD8D9] transition-colors"
            >
              <div className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight flex items-baseline gap-1">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#3BD8D9] to-white">
                  {counts[idx]}
                </span>
                <span className="text-3xl sm:text-4xl font-bold text-[#3BD8D9]">{item.suffix}</span>
              </div>
              <h3 className="font-display text-lg font-bold text-white uppercase tracking-wide">
                {item.label}
              </h3>
              <p className="text-white/60 font-sans text-xs font-light leading-relaxed">
                {item.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
