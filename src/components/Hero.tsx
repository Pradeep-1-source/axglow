import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Eye, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenContact: () => void;
}

const TOTAL_FRAMES = 168;

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const logoBoxRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [_loadProgress, setLoadProgress] = useState(0);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Preload all 168 image frames
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/frames/ezgif-frame-${frameNum}.png`;

      const handleLoad = () => {
        loadedCount++;
        setLoadProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoading(false);
        }
      };

      img.onload = handleLoad;
      img.onerror = handleLoad;

      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;
  }, []);

  // Render current frame to HiDPI Canvas with Aspect Ratio Cover Math
  const renderFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // Cover math preserving aspect ratio
    const hRatio = width / img.naturalWidth;
    const vRatio = height / img.naturalHeight;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (width - img.naturalWidth * ratio) / 2;
    const centerShift_y = (height - img.naturalHeight * ratio) / 2;

    ctx.drawImage(
      img,
      0,
      0,
      img.naturalWidth,
      img.naturalHeight,
      centerShift_x,
      centerShift_y,
      img.naturalWidth * ratio,
      img.naturalHeight * ratio
    );

    ctx.restore();
  };

  // Initial setup and window resize listener
  useEffect(() => {
    if (isLoading || !containerRef.current) return;

    // Render initial frame immediately
    renderFrame(0);

    const ctx = gsap.context(() => {
      // Clean entrance animation for text
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }, containerRef);

    const handleResize = () => {
      renderFrame(currentFrameRef.current);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isLoading]);

  // Autoplay Reel Loop
  useEffect(() => {
    if (isLoading) return;
    const interval = setInterval(() => {
      currentFrameRef.current = (currentFrameRef.current + 1) % TOTAL_FRAMES;
      renderFrame(currentFrameRef.current);
    }, 40);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >

      {/* HTML5 Fullscreen Canvas for HD Image Sequence */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Subtle Dark Ambient Lighting Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none z-10" />

      {/* Hero Website Content Overlay */}
      <div
        ref={contentRef}
        className="relative z-20 w-full h-full flex flex-col justify-center items-center pt-28 pb-16 px-6 md:px-12 text-center"
      >
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          {/* Logo Emblem */}
          <div ref={logoBoxRef} className="relative mb-8 group cursor-pointer" data-cursor="pointer">
            <div className="absolute -inset-4 bg-[#3BD8D9] rounded-full blur-xl opacity-30 group-hover:opacity-75 transition-all duration-500 pointer-events-none" />
            <div className="relative glass-panel p-5 sm:p-6 rounded-3xl border border-white/10 shadow-[0_0_25px_rgba(59,216,217,0.15)] backdrop-blur-2xl flex items-center justify-center">
              <img
                src="/aglowx-logo.png"
                alt="AglowX Logo"
                className="h-16 sm:h-24 w-auto object-contain filter drop-shadow-[0_0_15px_rgba(59,216,217,0.5)] transition-all duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Subhead Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#3BD8D9]" />
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#3BD8D9] font-medium">
              Creative Agency & Digital Studio
            </span>
          </div>

          {/* Main Headline */}
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold tracking-tight leading-[0.93] uppercase text-white mb-8"
          >
            <span className="block overflow-hidden">
              <span className="inline-block">Where Brands</span>
            </span>
            <span className="block overflow-hidden">
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#3BD8D9] to-[#8A46BB]">
                Rise in
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="inline-block text-white">
                Brilliance.
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="max-w-2xl text-base sm:text-lg md:text-xl text-white/70 font-sans font-light leading-relaxed mb-12"
          >
            A boutique creative agency specializing in <span className="text-white font-normal">Branding</span>, <span className="text-white font-normal">UI/UX Design</span>, <span className="text-white font-normal">Website Development</span>, <span className="text-white font-normal">Digital Marketing</span>, and <span className="text-white font-normal">Video Production</span>.
          </p>

          {/* CTA Buttons */}
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={onOpenContact}
              data-cursor="pointer"
              className="w-full sm:w-auto group relative px-8 py-4 rounded-full bg-[#3BD8D9] hover:bg-[#32c2c3] text-black font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_0_25px_rgba(59,216,217,0.3)] flex items-center justify-center gap-2"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <a
              href="#projects"
              data-cursor="pointer"
              className="w-full sm:w-auto group relative px-8 py-4 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 text-white font-sans font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4 text-[#3BD8D9]" />
              <span>View Portfolio</span>
            </a>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
          <a href="#about" className="p-2 rounded-full border border-white/15 text-white/70 hover:text-[#3BD8D9] transition-colors">
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
