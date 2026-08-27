import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Target, Compass, ArrowRight, Layers, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  {
    url: '/philosophy.png',
    title: 'Haute Couture Motion',
    category: 'Fluid Shader FX',
    tag: '01.03 — Philosophy'
  },
  {
    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
    title: 'Parisian Editorial Art',
    category: 'Aesthetic Identity',
    tag: '01.04 — Atelier'
  },
  {
    url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop',
    title: 'Hypercar Electric Form',
    category: '3D WebGL Canvas',
    tag: '01.05 — Kinetic'
  }
];

const SCROLL_REEL_ITEMS = [
  {
    img: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop',
    title: 'Obsidian Geometry',
    subtitle: 'Procedural 3D Structures'
  },
  {
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
    title: 'Luxury Architecture',
    subtitle: 'Bespoke Spatial Design'
  },
  {
    img: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=1000&auto=format&fit=crop',
    title: 'Liquid Iridescence',
    subtitle: 'Dynamic Shader Canvas'
  },
  {
    img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop',
    title: 'Cybernetic Interface',
    subtitle: 'Tactile Data Density'
  },
  {
    img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000&auto=format&fit=crop',
    title: 'Acoustic Waveforms',
    subtitle: 'Kinetic Motion Graphic'
  }
];

export const AboutEditorial: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const highlightSpanRef = useRef<HTMLSpanElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const reelContainerRef = useRef<HTMLDivElement>(null);

  const missionImgRef = useRef<HTMLImageElement>(null);
  const visionImgRef = useRef<HTMLImageElement>(null);

  const [activeSlide, setActiveSlide] = useState(0);

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  // GSAP ScrollTrigger Section Reveal Animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Main Headline Reveal
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

      // Staggered Cards Reveal
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 82%',
            },
          }
        );
      }

      // Parallax Image Scrub - Mission
      if (missionImgRef.current) {
        gsap.fromTo(
          missionImgRef.current,
          { yPercent: -15, scale: 1.1 },
          {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: missionImgRef.current.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // Parallax Image Scrub - Vision
      if (visionImgRef.current) {
        gsap.fromTo(
          visionImgRef.current,
          { yPercent: -15, scale: 1.1 },
          {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: visionImgRef.current.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // Horizontal Scroll Reel Motion
      if (reelRef.current && reelContainerRef.current) {
        gsap.to(reelRef.current, {
          x: () => -(reelRef.current!.scrollWidth - reelContainerRef.current!.clientWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: reelContainerRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            scrub: 1.2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 px-6 md:px-12 overflow-hidden bg-transparent select-none min-h-screen"
    >
      {/* Background Lighting Glow Orbs */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#3BD8D9]/10 rounded-full blur-[200px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#8A46BB]/10 rounded-full blur-[180px] pointer-events-none z-0" />

      {/* Main Content Layer */}
      <div className="max-w-7xl mx-auto relative z-20">
        {/* Editorial Subheader Badge */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-[1px] bg-[#3BD8D9]" />
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#3BD8D9]">
            01 / Editorial Manifesto
          </span>
        </div>

        {/* High Fashion Editorial Typography Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          {/* Left Main Editorial Statement */}
          <div className="lg:col-span-8">
            <h2
              ref={headlineRef}
              className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-white tracking-tight transition-all duration-500"
            >
              We don't build generic websites.{' '}
              <span
                ref={highlightSpanRef}
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#3BD8D9] via-white to-[#8A46BB] transition-all duration-500"
              >
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

        {/* Split Editorial Cards: Mission, Vision, and Interactive Graphic Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20" ref={cardsRef}>
          {/* Mission Card with Parallax */}
          <div className="lg:col-span-4 min-h-[420px] rounded-3xl relative overflow-hidden group border border-white/10 backdrop-blur-xl bg-[#090b10]/80 p-8 md:p-10 flex flex-col justify-between transition-all duration-500 hover:border-[#3BD8D9]/50 hover:shadow-[0_0_50px_rgba(59,216,217,0.15)]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                ref={missionImgRef}
                src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop"
                alt="AglowX Mission Aesthetic"
                className="w-full h-[130%] object-cover opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 filter brightness-90 saturate-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-[#06070a]/70 to-transparent" />
            </div>

            <div className="absolute top-0 right-0 w-36 h-36 bg-[#3BD8D9]/15 rounded-full blur-3xl group-hover:bg-[#3BD8D9]/30 transition-all duration-500 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#3BD8D9]/10 border border-[#3BD8D9]/30 flex items-center justify-center text-[#3BD8D9] group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-[#3BD8D9] bg-[#3BD8D9]/10 px-3 py-1 rounded-full border border-[#3BD8D9]/20 uppercase">
                  Catalyst
                </span>
              </div>
              
              <span className="text-xs font-mono text-white/40 uppercase tracking-widest block mb-2">01.01 — Strategic Core</span>
              <h3 className="font-display text-2xl font-bold text-white mb-4 group-hover:text-[#3BD8D9] transition-colors duration-300">
                Our Mission
              </h3>
              <p className="text-white/75 font-sans font-light text-sm leading-relaxed">
                To empower visionary brands with unforgettable digital presences that outshine competitors, captivate modern audiences, and turn customer attention into permanent brand equity.
              </p>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-white/50 group-hover:text-white transition-colors">
              <span>EXPLORE DIRECTIVE</span>
              <ArrowRight className="w-4 h-4 text-[#3BD8D9] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Vision Card with Parallax */}
          <div className="lg:col-span-4 min-h-[420px] rounded-3xl relative overflow-hidden group border border-white/10 backdrop-blur-xl bg-[#090b10]/80 p-8 md:p-10 flex flex-col justify-between transition-all duration-500 hover:border-[#8A46BB]/50 hover:shadow-[0_0_50px_rgba(138,70,187,0.15)]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                ref={visionImgRef}
                src="https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=1000&auto=format&fit=crop"
                alt="AglowX Vision Aesthetic"
                className="w-full h-[130%] object-cover opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 filter brightness-90 saturate-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-[#06070a]/70 to-transparent" />
            </div>

            <div className="absolute top-0 right-0 w-36 h-36 bg-[#8A46BB]/15 rounded-full blur-3xl group-hover:bg-[#8A46BB]/30 transition-all duration-500 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#8A46BB]/10 border border-[#8A46BB]/30 flex items-center justify-center text-[#8A46BB] group-hover:scale-110 transition-transform duration-300">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-[#8A46BB] bg-[#8A46BB]/10 px-3 py-1 rounded-full border border-[#8A46BB]/20 uppercase">
                  Horizon
                </span>
              </div>
              
              <span className="text-xs font-mono text-white/40 uppercase tracking-widest block mb-2">01.02 — Global Vision</span>
              <h3 className="font-display text-2xl font-bold text-white mb-4 group-hover:text-[#8A46BB] transition-colors duration-300">
                Our Vision
              </h3>
              <p className="text-white/75 font-sans font-light text-sm leading-relaxed">
                To set the benchmark for luxury interactive media, establishing a world where digital experiences evoke the same awe and emotional weight as fine art and architectural marvels.
              </p>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-white/50 group-hover:text-white transition-colors">
              <span>EXPLORE HORIZON</span>
              <ArrowRight className="w-4 h-4 text-[#8A46BB] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Interactive Haute Couture Motion Image Carousel Showcase */}
          <div className="lg:col-span-4 min-h-[420px] rounded-3xl overflow-hidden relative group border border-white/15 bg-[#08080c] flex flex-col justify-between transition-all duration-500 hover:border-[#3BD8D9]/40">
            {GALLERY_IMAGES.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === activeSlide ? 'opacity-100 scale-100 z-0' : 'opacity-0 scale-105 -z-10'
                }`}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-75 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-[#06070a]/40 to-transparent" />
              </div>
            ))}

            <div className="relative z-10 p-6 flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#3BD8D9] uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-[#3BD8D9]/30">
                {GALLERY_IMAGES[activeSlide].tag}
              </span>
              <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
                {GALLERY_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeSlide ? 'w-5 bg-[#3BD8D9]' : 'w-1.5 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="relative z-10 p-6 md:p-8 flex items-end justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-white/60 uppercase tracking-wider block mb-1">
                  {GALLERY_IMAGES[activeSlide].category}
                </span>
                <h4 className="font-display text-xl font-bold text-white tracking-tight">
                  {GALLERY_IMAGES[activeSlide].title}
                </h4>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handlePrevSlide}
                  className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-[#3BD8D9] hover:bg-[#3BD8D9]/20 transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-[#3BD8D9] hover:bg-[#3BD8D9]/20 transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Horizontal Scroll-Parallax Aesthetic Reel */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-[#3BD8D9]" />
              <span className="text-xs uppercase font-mono tracking-[0.25em] text-white/70">
                AglowX Visual Spectrum — Scroll Motion Reel
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-white/40">
              <Eye className="w-4 h-4 text-[#3BD8D9] animate-pulse" />
              <span>SWIPE OR SCROLL TO TRAVERSE</span>
            </div>
          </div>

          <div ref={reelContainerRef} className="overflow-x-auto sm:overflow-hidden w-full relative py-4 no-scrollbar">
            <div ref={reelRef} className="flex gap-6 w-max cursor-grab active:cursor-grabbing">
              {SCROLL_REEL_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="w-[280px] sm:w-[340px] md:w-[380px] h-[220px] sm:h-[260px] rounded-2xl overflow-hidden relative group border border-white/10 bg-[#090b10] shrink-0 transition-all duration-500 hover:border-[#3BD8D9]/40 hover:scale-[1.02]"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-transparent to-transparent opacity-85" />
                  
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#3BD8D9] uppercase tracking-widest block mb-0.5">
                        01.06 / Art Direction
                      </span>
                      <h4 className="font-display text-base sm:text-lg font-bold text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs text-white/60 font-mono mt-0.5">{item.subtitle}</p>
                    </div>
                    <Sparkles className="w-4 h-4 text-[#3BD8D9] group-hover:rotate-45 transition-transform duration-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutEditorial;
