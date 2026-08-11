import React, { useEffect, useRef } from 'react';
import { PROCESS_STEPS } from '../data/content';
import { CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ProcessTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const line = lineRef.current;
      if (!line) return;

      const pathLength = line.getTotalLength();
      gsap.set(line, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

      gsap.to(line, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: 1,
        },
      });

      const nodes = gsap.utils.toArray('.process-node') as HTMLElement[];
      nodes.forEach((node) => {
        gsap.fromTo(
          node,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 85%',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={containerRef} className="relative py-32 px-6 md:px-12 bg-transparent overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#8A46BB]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-[1px] bg-[#3BD8D9]" />
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#3BD8D9]">
            Process
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight uppercase">
              From Concept to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3BD8D9] via-[#8A46BB] to-[#FF5D93]">
                Digital Launch
              </span>
            </h2>
          </div>
          <p className="max-w-md text-white/60 font-sans text-sm leading-relaxed font-light">
            Our structured 6-step workflow ensures design excellence, seamless collaboration, and predictable project milestones.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative">
          {/* Central Connecting SVG Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 -translate-x-1/2 w-1 z-0 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <path
                ref={lineRef}
                d="M 2 0 L 2 2000"
                fill="none"
                stroke="#3BD8D9"
                strokeWidth="2"
                className="filter drop-shadow-[0_0_6px_#3BD8D9]"
              />
            </svg>
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-12 md:space-y-20 relative z-10">
            {PROCESS_STEPS.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={item.step}
                  className={`process-node flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } gap-8 md:gap-16`}
                >
                  {/* Content Box */}
                  <div className="w-full md:w-1/2 pl-14 md:pl-0">
                    <div className="glass-card p-7 md:p-9 rounded-3xl border border-white/10 hover:border-[#3BD8D9]/40 transition-colors relative group">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-display text-4xl font-bold text-[#3BD8D9]">
                          {item.step}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl font-bold text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs uppercase font-mono text-[#8A46BB] mb-4 font-semibold">
                        {item.subtitle}
                      </p>

                      <p className="text-white/70 font-sans text-sm font-light leading-relaxed mb-6">
                        {item.description}
                      </p>

                      {/* Deliverables List */}
                      <div className="space-y-2 border-t border-white/10 pt-4">
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-2">Key Deliverables</span>
                        {item.deliverables.map((del, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-white/80">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#3BD8D9] shrink-0" />
                            <span>{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Center Node Indicator */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0B0B0B] border-2 border-[#3BD8D9] flex items-center justify-center text-[#3BD8D9] shadow-[0_0_15px_rgba(59,216,217,0.4)] z-20">
                    <span className="font-mono text-xs font-bold">{item.step}</span>
                  </div>

                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
