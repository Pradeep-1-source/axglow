import React, { useEffect, useRef, useState } from 'react';
import { SERVICES_DATA } from '../data/content';
import { CheckCircle2, ArrowUpRight, Palette, Code, Layout, Film, Megaphone, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServicesProps {
  onOpenContact: () => void;
}

// 3D Soft-Clay Animated Graphic Component
const SoftClayGraphic: React.FC<{ type: string; color: string }> = ({ type, color }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const elements = container.querySelectorAll('.clay-element');
    elements.forEach((el, index) => {
      const depth = (index + 1) * 18;
      (el as HTMLElement).style.transform = `translate3d(${x * depth}px, ${y * depth}px, ${depth}px) rotateX(${-y * 25}deg) rotateY(${x * 25}deg)`;
    });
  };

  const handleMouseLeave = () => {
    const container = containerRef.current;
    if (!container) return;
    const elements = container.querySelectorAll('.clay-element');
    elements.forEach((el) => {
      (el as HTMLElement).style.transform = `translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg)`;
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full relative overflow-hidden flex items-center justify-center p-6 select-none group/clay cursor-pointer"
      style={{ perspective: '1000px' }}
    >
      {/* Soft Ambient Radial Glow */}
      <div
        className="absolute w-56 h-56 rounded-full blur-3xl opacity-35 group-hover/clay:opacity-65 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: color }}
      />

      {/* Soft Clay Sculpture Variants */}
      {type === 'branding' && (
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Main Soft Clay Torus Ring */}
          <div
            className="clay-element absolute w-36 h-36 transition-transform duration-300 ease-out"
            style={{
              background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${color} 45%, #0d0f17 100%)`,
              boxShadow: `inset 6px 6px 14px rgba(255,255,255,0.65), inset -10px -10px 20px rgba(0,0,0,0.85), 0 25px 50px rgba(0,0,0,0.75), 0 0 35px ${color}44`,
              borderRadius: '50%',
            }}
          />
          {/* Inner Floating Soft Clay Sphere */}
          <div
            className="clay-element absolute w-20 h-20 rounded-full transition-transform duration-300 ease-out animate-bounce-slow"
            style={{
              background: `radial-gradient(circle at 30% 30%, #ffffff 0%, #FF5D93 50%, #3a0b1e 100%)`,
              boxShadow: `inset 5px 5px 12px rgba(255,255,255,0.75), inset -8px -8px 16px rgba(0,0,0,0.8), 0 15px 35px rgba(0,0,0,0.6)`,
            }}
          />
          {/* Floating Soft Clay Pill */}
          <div
            className="clay-element absolute -top-2 right-2 w-10 h-10 rounded-2xl transition-transform duration-300 ease-out"
            style={{
              background: `radial-gradient(circle at 30% 30%, #ffffff 0%, #8A46BB 60%, #150924 100%)`,
              boxShadow: `inset 3px 3px 8px rgba(255,255,255,0.75), inset -5px -5px 10px rgba(0,0,0,0.8), 0 10px 20px rgba(0,0,0,0.5)`,
            }}
          />
        </div>
      )}

      {type === 'web' && (
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Stacked Soft Clay Cubes */}
          <div
            className="clay-element absolute w-32 h-32 rounded-3xl transition-transform duration-300 ease-out"
            style={{
              background: `linear-gradient(135deg, #ffffff 0%, ${color} 40%, #0c0817 100%)`,
              boxShadow: `inset 6px 6px 16px rgba(255,255,255,0.65), inset -10px -10px 20px rgba(0,0,0,0.85), 0 25px 45px rgba(0,0,0,0.75)`,
              transform: 'rotate(-12deg)',
            }}
          />
          <div
            className="clay-element absolute w-28 h-28 rounded-3xl transition-transform duration-300 ease-out"
            style={{
              background: `linear-gradient(135deg, #ffffff 0%, #3BD8D9 50%, #062324 100%)`,
              boxShadow: `inset 5px 5px 12px rgba(255,255,255,0.75), inset -8px -8px 16px rgba(0,0,0,0.8), 0 20px 35px rgba(0,0,0,0.6)`,
              transform: 'rotate(15deg)',
            }}
          />
          <div
            className="clay-element absolute w-14 h-14 rounded-2xl transition-transform duration-300 ease-out"
            style={{
              background: `radial-gradient(circle at 30% 30%, #ffffff 0%, #FF5D93 60%, #450c20 100%)`,
              boxShadow: `inset 4px 4px 10px rgba(255,255,255,0.8), inset -6px -6px 12px rgba(0,0,0,0.8), 0 12px 25px rgba(0,0,0,0.5)`,
              transform: 'rotate(45deg)',
            }}
          />
        </div>
      )}

      {type === 'uiux' && (
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Soft Clay UI Modules */}
          <div
            className="clay-element absolute w-40 h-20 rounded-full transition-transform duration-300 ease-out"
            style={{
              background: `radial-gradient(circle at 25% 30%, #ffffff 0%, ${color} 50%, #3d0a21 100%)`,
              boxShadow: `inset 6px 6px 14px rgba(255,255,255,0.7), inset -8px -8px 16px rgba(0,0,0,0.8), 0 20px 40px rgba(0,0,0,0.6)`,
              transform: 'translateY(-20px) rotate(-8deg)',
            }}
          />
          <div
            className="clay-element absolute w-16 h-16 rounded-full transition-transform duration-300 ease-out"
            style={{
              background: `radial-gradient(circle at 30% 30%, #ffffff 0%, #3BD8D9 60%, #072a2b 100%)`,
              boxShadow: `inset 5px 5px 12px rgba(255,255,255,0.8), inset -7px -7px 14px rgba(0,0,0,0.8), 0 15px 30px rgba(0,0,0,0.5)`,
              transform: 'translate(-40px, -20px)',
            }}
          />
          <div
            className="clay-element absolute w-36 h-16 rounded-full transition-transform duration-300 ease-out"
            style={{
              background: `radial-gradient(circle at 30% 30%, #ffffff 0%, #8A46BB 55%, #180929 100%)`,
              boxShadow: `inset 5px 5px 12px rgba(255,255,255,0.6), inset -8px -8px 16px rgba(0,0,0,0.8), 0 20px 35px rgba(0,0,0,0.6)`,
              transform: 'translateY(25px) rotate(6deg)',
            }}
          />
        </div>
      )}

      {type === 'video' && (
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Soft Clay Play Sphere & Reel Drop */}
          <div
            className="clay-element absolute w-36 h-36 rounded-full transition-transform duration-300 ease-out"
            style={{
              background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${color} 45%, #052627 100%)`,
              boxShadow: `inset 7px 7px 15px rgba(255,255,255,0.7), inset -10px -10px 20px rgba(0,0,0,0.8), 0 25px 45px rgba(0,0,0,0.7), 0 0 35px ${color}55`,
            }}
          />
          <div
            className="clay-element absolute w-16 h-16 rounded-3xl transition-transform duration-300 ease-out flex items-center justify-center"
            style={{
              background: `radial-gradient(circle at 30% 30%, #ffffff 0%, #FF5D93 60%, #3b0a1c 100%)`,
              boxShadow: `inset 4px 4px 10px rgba(255,255,255,0.8), inset -6px -6px 12px rgba(0,0,0,0.8), 0 15px 30px rgba(0,0,0,0.6)`,
              transform: 'rotate(45deg)',
            }}
          />
          <div
            className="clay-element absolute w-8 h-8 rounded-full transition-transform duration-300 ease-out"
            style={{
              background: `radial-gradient(circle at 30% 30%, #ffffff 0%, #8A46BB 70%, #150624 100%)`,
              boxShadow: `inset 3px 3px 6px rgba(255,255,255,0.8), inset -4px -4px 8px rgba(0,0,0,0.8), 0 8px 16px rgba(0,0,0,0.5)`,
              transform: 'translate(45px, -35px)',
            }}
          />
        </div>
      )}

      {type === 'marketing' && (
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Soft Clay Growth Pillars */}
          <div
            className="clay-element absolute w-12 h-36 rounded-full transition-transform duration-300 ease-out"
            style={{
              background: `linear-gradient(180deg, #ffffff 0%, ${color} 40%, #170929 100%)`,
              boxShadow: `inset 5px 5px 12px rgba(255,255,255,0.7), inset -7px -7px 14px rgba(0,0,0,0.8), 0 20px 35px rgba(0,0,0,0.6)`,
              transform: 'translate(-40px, 0px)',
            }}
          />
          <div
            className="clay-element absolute w-12 h-44 rounded-full transition-transform duration-300 ease-out"
            style={{
              background: `linear-gradient(180deg, #ffffff 0%, #3BD8D9 40%, #062324 100%)`,
              boxShadow: `inset 5px 5px 12px rgba(255,255,255,0.8), inset -7px -7px 14px rgba(0,0,0,0.8), 0 25px 40px rgba(0,0,0,0.6)`,
              transform: 'translate(0px, -15px)',
            }}
          />
          <div
            className="clay-element absolute w-12 h-28 rounded-full transition-transform duration-300 ease-out"
            style={{
              background: `linear-gradient(180deg, #ffffff 0%, #FF5D93 40%, #380a1c 100%)`,
              boxShadow: `inset 4px 4px 10px rgba(255,255,255,0.7), inset -6px -6px 12px rgba(0,0,0,0.8), 0 15px 30px rgba(0,0,0,0.5)`,
              transform: 'translate(40px, 15px)',
            }}
          />
        </div>
      )}
    </div>
  );
};

export const ServicesFullscreen: React.FC<ServicesProps> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'branding':
        return <Palette className="w-8 h-8 text-[#3BD8D9]" />;
      case 'web':
        return <Code className="w-8 h-8 text-[#8A46BB]" />;
      case 'uiux':
        return <Layout className="w-8 h-8 text-[#FF5D93]" />;
      case 'video':
        return <Film className="w-8 h-8 text-[#3BD8D9]" />;
      case 'marketing':
        return <Megaphone className="w-8 h-8 text-[#8A46BB]" />;
      default:
        return <Sparkles className="w-8 h-8 text-[#3BD8D9]" />;
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.sticky-service-card') as HTMLElement[];

      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;

        const nextCard = cards[index + 1];

        gsap.to(card, {
          scale: 0.96 - (cards.length - index) * 0.008,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: nextCard,
            start: 'top 85%',
            end: 'top 25%',
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getCardStyle = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-gradient-to-br from-[#0284c7] via-[#0369a1] to-[#075985] border-cyan-300/60 text-white';
      case 1:
        return 'bg-gradient-to-br from-[#7e22ce] via-[#6b21a8] to-[#581c87] border-purple-300/60 text-white';
      case 2:
        return 'bg-gradient-to-br from-[#be185d] via-[#9d174d] to-[#831843] border-pink-300/60 text-white';
      case 3:
        return 'bg-gradient-to-br from-[#d97706] via-[#b45309] to-[#78350f] border-amber-300/60 text-white';
      case 4:
        return 'bg-gradient-to-br from-[#059669] via-[#047857] to-[#064e3b] border-emerald-300/60 text-white';
      default:
        return 'bg-gradient-to-br from-[#0284c7] via-[#0369a1] to-[#075985] border-cyan-300/60 text-white';
    }
  };

  return (
    <section id="services" ref={containerRef} className="relative py-32 px-6 md:px-12 bg-transparent">
      {/* Background Lighting */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#3BD8D9]/10 rounded-full blur-[200px] pointer-events-none" />

      {/* Header */}
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

      {/* Scroll-Triggered Sticky Stacked Service Cards */}
      <div className="max-w-7xl mx-auto relative space-y-16 pb-24">
        {SERVICES_DATA.map((service, index) => (
          <div
            key={service.id}
            onMouseEnter={() => setHoveredService(service.id)}
            onMouseLeave={() => setHoveredService(null)}
            style={{
              position: 'sticky',
              top: `calc(6.5rem + ${index * 1.25}rem)`,
              zIndex: 10 + index,
            }}
            className={`sticky-service-card relative rounded-3xl p-8 sm:p-12 md:p-14 border transition-all duration-500 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] group ${getCardStyle(index)}`}
          >
            {/* Background Parallax Image Texture */}
            {service.image && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity duration-700">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 filter brightness-95 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              {/* Left Column: Number, Title, Description, Features, CTA */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-5xl md:text-7xl font-black text-white/40 tracking-tighter">
                      {service.number}
                    </span>
                    <div className="p-3.5 rounded-2xl bg-black/60 border border-white/25 shadow-md">
                      {getServiceIcon(service.illustrationType)}
                    </div>
                  </div>

                  <span className="text-xs uppercase font-mono tracking-[0.2em] text-white bg-black/60 px-3.5 py-1.5 rounded-full border border-white/25 inline-block mb-3 font-extrabold shadow-sm">
                    {service.tagline}
                  </span>

                  <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight drop-shadow-sm">
                    {service.title}
                  </h3>

                  <p className="text-white font-sans font-medium text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                    {service.description}
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-6 border-t border-white/25 mb-8">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm font-bold text-white">
                      <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Inquiry Link */}
                <div>
                  <button
                    onClick={onOpenContact}
                    data-cursor="pointer"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-black/60 hover:bg-black/80 text-white font-mono font-extrabold text-xs uppercase tracking-widest border border-white/30 transition-all duration-300 shadow-xl group/btn"
                  >
                    <span>Request Proposal</span>
                    <ArrowUpRight className="w-4 h-4 text-white transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </button>
                </div>
              </div>

              {/* Right Column: Custom 3D Artwork Showcase Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full h-72 sm:h-96 rounded-2xl border border-white/30 relative overflow-hidden flex flex-col justify-between transition-all duration-500 shadow-2xl group/card bg-black/80">
                  {/* Top Bar Indicator */}
                  <div className="relative z-20 p-5 flex justify-between items-center text-xs font-mono">
                    <span className="bg-black/80 px-3.5 py-1.5 rounded-full border border-white/25 text-white font-bold shadow-md">
                      FEATURED DISCIPLINE {service.number}
                    </span>
                    <div className="p-2 rounded-xl bg-black/80 border border-white/25 shadow-md">
                      {getServiceIcon(service.illustrationType)}
                    </div>
                  </div>

                  {/* Real Professional Agency Photography Centerpiece */}
                  <div className="absolute inset-0 z-10 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700 filter brightness-95 saturate-[1.05] contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  </div>

                  {/* Bottom Content Badge */}
                  <div className="relative z-20 p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
                    <span className="text-[10px] font-mono text-[#3BD8D9] uppercase tracking-widest block mb-1 font-extrabold">
                      {service.tagline}
                    </span>
                    <h4 className="font-display text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-md">
                      {service.title}
                    </h4>
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

export default ServicesFullscreen;
