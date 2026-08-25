import React, { useEffect, useRef } from 'react';
import { WHY_CHOOSE_US_ITEMS } from '../data/content';
import { Crown, Compass, Cpu, Sparkles, Video, TrendingUp, Users, Check } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const WhyChooseUs: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.why-card') as HTMLElement[];

      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 12;
    const rotateY = (centerX - x) / 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 12;
    const rotateY = (centerX - x) / 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.SyntheticEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crown':
        return <Crown className="w-6 h-6 text-[#3BD8D9]" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#8A46BB]" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-[#FF5D93]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#3BD8D9]" />;
      case 'Video':
        return <Video className="w-6 h-6 text-[#8A46BB]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-[#FF5D93]" />;
      case 'Users':
        return <Users className="w-6 h-6 text-[#3BD8D9]" />;
      default:
        return <Check className="w-6 h-6 text-[#3BD8D9]" />;
    }
  };

  return (
    <section id="why-us" ref={containerRef} className="relative py-32 px-6 md:px-12 bg-transparent overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 -left-[10%] w-[500px] h-[500px] bg-[#3BD8D9]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-[1px] bg-[#3BD8D9]" />
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#3BD8D9]">
            Why Us
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight uppercase">
              Why Ambitious Brands <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3BD8D9] via-white to-[#FF5D93]">
                Choose AglowX
              </span>
            </h2>
          </div>
          <p className="max-w-md text-white/60 font-sans text-sm leading-relaxed font-light">
            We combine high-end aesthetic design with technical precision to deliver memorable experiences that drive real business impact.
          </p>
        </div>

        {/* 3D Glass Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {WHY_CHOOSE_US_ITEMS.map((item, idx) => (
            <div
              key={idx}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseLeave}
              className="why-card glass-card p-6 rounded-3xl relative overflow-hidden group transition-all duration-500 border border-white/10 hover:border-[#3BD8D9]/50 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Spotlight Ambient Light Overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
                style={{
                  background: 'radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59,216,217,0.15), transparent 80%)',
                }}
              />

              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  {/* Top Bar: Icon & Step Number */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/15 flex items-center justify-center group-hover:border-[#3BD8D9]/60 group-hover:bg-[#3BD8D9]/20 transition-all duration-300 shadow-md">
                      {getIcon(item.iconName)}
                    </div>
                    <span className="font-mono text-xs text-white/40 group-hover:text-[#3BD8D9] transition-colors font-extrabold px-2.5 py-1 rounded-full border border-white/10 bg-black/40">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Real Stock Photography Container */}
                  <div className="w-full h-36 rounded-2xl overflow-hidden mb-4 relative border border-white/15 shadow-md group/img bg-black/40">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 saturate-[1.05] contrast-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#3BD8D9] transition-colors leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-white/70 font-sans text-xs leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
