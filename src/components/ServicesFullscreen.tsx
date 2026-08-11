import React, { useEffect, useRef, useState } from 'react';
import { SERVICES_DATA } from '../data/content';
import { CheckCircle2, ArrowUpRight, Palette, Code, Layout, Film, Megaphone, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServicesProps {
  onOpenContact: () => void;
}

export const ServicesFullscreen: React.FC<ServicesProps> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'branding':
        return <Palette className="w-10 h-10 text-[#3BD8D9]" />;
      case 'web':
        return <Code className="w-10 h-10 text-[#8A46BB]" />;
      case 'uiux':
        return <Layout className="w-10 h-10 text-[#FF5D93]" />;
      case 'video':
        return <Film className="w-10 h-10 text-[#3BD8D9]" />;
      case 'marketing':
        return <Megaphone className="w-10 h-10 text-[#8A46BB]" />;
      default:
        return <Sparkles className="w-10 h-10 text-[#3BD8D9]" />;
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.service-panel') as HTMLElement[];

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.4, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 30%',
              scrub: 0.8,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={containerRef} className="relative py-32 px-6 md:px-12 bg-transparent">
      {/* Background Lighting */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#3BD8D9]/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto mb-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-[1px] bg-[#3BD8D9]" />
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#3BD8D9]">
            Capabilities
          </span>
        </div>
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight uppercase">
          Our Full-Spectrum <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3BD8D9] via-[#8A46BB] to-[#FF5D93]">
            Creative Disciplines
          </span>
        </h2>
      </div>

      {/* Fullscreen Stacked Service Cards */}
      <div className="max-w-7xl mx-auto space-y-12">
        {SERVICES_DATA.map((service) => (
          <div
            key={service.id}
            onMouseEnter={() => setHoveredService(service.id)}
            onMouseLeave={() => setHoveredService(null)}
            className={`service-panel relative rounded-3xl p-8 sm:p-12 md:p-14 border border-white/10 backdrop-blur-2xl transition-all duration-500 overflow-hidden group ${
              hoveredService === service.id
                ? 'border-[#3BD8D9]/40 bg-white/[0.03] shadow-[0_0_40px_rgba(59,216,217,0.1)]'
                : 'bg-white/[0.015]'
            }`}
          >
            {/* Ambient Card Radial Light */}
            <div
              className={`absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-br ${service.gradient} rounded-full blur-[140px] transition-opacity duration-500 pointer-events-none ${
                hoveredService === service.id ? 'opacity-100' : 'opacity-30'
              }`}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              {/* Left Column: Number, Title, Description */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-5xl md:text-7xl font-bold text-white/30">
                      {service.number}
                    </span>
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                      {getServiceIcon(service.illustrationType)}
                    </div>
                  </div>

                  <span className="text-xs uppercase font-mono tracking-[0.2em] text-[#3BD8D9] block mb-2 font-medium">
                    {service.tagline}
                  </span>

                  <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 group-hover:text-[#3BD8D9] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-white/70 font-sans font-light text-base leading-relaxed mb-8 max-w-xl">
                    {service.description}
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-6 border-t border-white/10 mb-8">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-[#3BD8D9] flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Inquiry Link */}
                <div>
                  <button
                    onClick={onOpenContact}
                    data-cursor="pointer"
                    className="inline-flex items-center gap-2 text-xs uppercase font-mono font-bold tracking-widest text-[#3BD8D9] hover:text-white transition-colors group/btn"
                  >
                    <span>Request Proposal</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Custom Animated Visual Graphic */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full h-64 sm:h-80 rounded-2xl glass-panel p-6 border border-white/10 relative overflow-hidden flex flex-col justify-between group-hover:border-[#3BD8D9]/30 transition-colors">
                  <div className="flex justify-between items-center text-xs font-mono text-white/40">
                    <span>AGLOWX STUDIO</span>
                    <span>CREATIVE DISCIPLINE</span>
                  </div>

                  {/* Clean Visual Icon Representation */}
                  <div className="relative my-auto flex items-center justify-center">
                    <div className="w-36 h-36 rounded-full border border-white/10 flex items-center justify-center relative">
                      <div className="w-24 h-24 rounded-full border border-[#3BD8D9]/40 flex items-center justify-center bg-[#0B0B0B]/80 backdrop-blur-md">
                        {getServiceIcon(service.illustrationType)}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-white/40 border-t border-white/10 pt-3">
                    <span>SERVICE FOCUS</span>
                    <span className="text-white font-medium">{service.title}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
