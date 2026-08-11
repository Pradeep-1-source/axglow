import React, { useEffect, useRef } from 'react';
import { Sparkles, Target, Compass } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutEditorial: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal main editorial quote on scroll
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stagger mission & vision cards
      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 px-6 md:px-12 overflow-hidden bg-transparent">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#8A46BB]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Editorial Subheader Badge */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-[1px] bg-[#3BD8D9]" />
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#3BD8D9]">
            01 / Editorial Manifesto
          </span>
        </div>

        {/* High Fashion Editorial Typography Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-28">
          {/* Left Main Editorial Statement */}
          <div className="lg:col-span-8">
            <h2
              ref={headlineRef}
              className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-white tracking-tight"
            >
              We don't build generic websites.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3BD8D9] via-white to-[#8A46BB]">
                We engineer digital monuments
              </span>{' '}
              that elevate market authority.
            </h2>
          </div>

          {/* Right Agency Overview Tagline */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:pt-4 border-l border-white/10 lg:pl-8">
            <p className="text-lg text-white/80 font-sans font-light leading-relaxed">
              AglowX is an elite creative collective based in Malaysia, operating at the intersection of haute couture aesthetics, cutting-edge technology, and brand psychology.
            </p>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex flex-col">
                <span className="font-display text-3xl font-bold text-[#3BD8D9]">8+</span>
                <span className="text-xs font-mono text-white/50 uppercase tracking-wider">Years Craft</span>
              </div>
              <div className="w-[1px] h-10 bg-white/10" />
              <div className="flex flex-col">
                <span className="font-display text-3xl font-bold text-[#8A46BB]">100%</span>
                <span className="text-xs font-mono text-white/50 uppercase tracking-wider">Bespoke Code</span>
              </div>
            </div>
          </div>
        </div>

        {/* Split Editorial Cards: Mission, Vision, and Graphic Artwork */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" ref={cardsRef}>
          {/* Mission Card */}
          <div className="lg:col-span-4 glass-card p-8 md:p-10 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#3BD8D9]/10 rounded-full blur-2xl group-hover:bg-[#3BD8D9]/25 transition-all duration-500" />
            <div className="w-12 h-12 rounded-2xl bg-[#3BD8D9]/10 border border-[#3BD8D9]/30 flex items-center justify-center text-[#3BD8D9] mb-8">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-white/40 uppercase tracking-widest block mb-2">01.01 — Catalyst</span>
            <h3 className="font-display text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-white/70 font-sans font-light text-sm leading-relaxed">
              To empower visionary brands with unforgettable digital presences that outshine competitors, captivate modern audiences, and turn customer attention into permanent brand equity.
            </p>
          </div>

          {/* Vision Card */}
          <div className="lg:col-span-4 glass-card p-8 md:p-10 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8A46BB]/10 rounded-full blur-2xl group-hover:bg-[#8A46BB]/25 transition-all duration-500" />
            <div className="w-12 h-12 rounded-2xl bg-[#8A46BB]/10 border border-[#8A46BB]/30 flex items-center justify-center text-[#8A46BB] mb-8">
              <Compass className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-white/40 uppercase tracking-widest block mb-2">01.02 — Horizon</span>
            <h3 className="font-display text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-white/70 font-sans font-light text-sm leading-relaxed">
              To set the benchmark for luxury interactive media, establishing a world where digital experiences evoke the same awe and emotional weight as fine art and architectural marvels.
            </p>
          </div>

          {/* Featured Visual Image Showcase */}
          <div className="lg:col-span-4 glass-panel rounded-3xl overflow-hidden relative min-h-[300px] group border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
              alt="AglowX Editorial Aesthetics"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#3BD8D9] uppercase tracking-widest">Visual Philosophy</span>
                <h4 className="font-display text-lg font-bold text-white">Haute Couture Motion</h4>
              </div>
              <Sparkles className="w-5 h-5 text-[#3BD8D9] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
