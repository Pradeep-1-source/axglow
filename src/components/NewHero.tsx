import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, ArrowUpRight, ShieldCheck, Flame, Zap, Layers } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface NewHeroProps {
  onOpenContact: () => void;
}

const TOTAL_FRAMES = 200;

export const NewHero: React.FC<NewHeroProps> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [_loadProgress, setLoadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'branding' | 'digital' | 'production'>('branding');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);
  const playIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Preload all 200 frame images
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

  // Render current frame image to high-DPI canvas
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

  // Initial setup and window resize listener (without pinned scroll-jacking)
  useEffect(() => {
    if (isLoading || !containerRef.current) return;

    renderFrame(0);

    const ctx = gsap.context(() => {
      // Clean hero entrance text animation
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

    playIntervalRef.current = setInterval(() => {
      currentFrameRef.current = (currentFrameRef.current + 1) % TOTAL_FRAMES;
      renderFrame(currentFrameRef.current);
    }, 40);

    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, [isLoading]);

  // Ambient Particle Canvas System
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.5 ? '#3BD8D9' : '#8A46BB',
    }));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) return;
    const { clientX, clientY } = e.touches[0];
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full min-h-[100dvh] sm:h-screen overflow-hidden bg-black select-none flex flex-col justify-between items-center"
    >
      {/* Frame Canvas Sequence */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Dynamic Particle Canvas System */}
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      />

      {/* Lighting Gradients Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/90 pointer-events-none z-10" />

      {/* Hero Content Container */}
      <div
        ref={contentRef}
        className="relative z-20 w-full h-full flex flex-col justify-center items-center px-4 sm:px-12 pt-24 sm:pt-20 pb-8 sm:pb-12 text-center my-auto"
        style={{
          transform: `perspective(1000px) rotateX(${mousePos.y * 0.15}deg) rotateY(${mousePos.x * 0.15}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          {/* Animated Glow Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/[0.05] border border-[#3BD8D9]/40 mb-4 sm:mb-6 backdrop-blur-2xl shadow-[0_0_25px_rgba(59,216,217,0.2)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3BD8D9] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#3BD8D9]" />
            </span>
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] sm:tracking-[0.25em] text-[#3BD8D9] font-bold">
              NEXT-GEN DIGITAL ARCHITECTS
            </span>
          </div>

          {/* Futuristic Headline */}
          <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold uppercase tracking-tight text-white mb-4 sm:mb-6 leading-[1.0] sm:leading-[0.95] px-2 sm:px-0">
            Crafting Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3BD8D9] via-white to-[#8A46BB] filter drop-shadow-[0_0_35px_rgba(59,216,217,0.4)]">
              Masterpieces
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-xs sm:text-lg md:text-xl text-white/80 font-sans font-light leading-relaxed mb-6 sm:mb-8 px-2 sm:px-0">
            We fuse hyper-luxurious design aesthetics with high-performance engineering to transform visionary ideas into industry-leading digital platforms.
          </p>

          {/* Interactive Specialty Tab Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-10 px-2 sm:px-0">
            {[
              { id: 'branding', label: 'Brand Strategy', icon: Flame, color: '#3BD8D9' },
              { id: 'digital', label: '3D Web Experience', icon: Zap, color: '#8A46BB' },
              { id: 'production', label: 'Cinematic Production', icon: Layers, color: '#FF5D93' },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  data-cursor="pointer"
                  className={`px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-mono tracking-wider sm:tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5 sm:gap-2 border ${
                    isActive
                      ? 'bg-white/15 text-white border-[#3BD8D9] shadow-[0_0_20px_rgba(59,216,217,0.3)]'
                      : 'bg-black/40 text-white/60 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: isActive ? tab.color : 'inherit' }} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* CTA Action Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
            <button
              onClick={onOpenContact}
              data-cursor="pointer"
              className="w-full sm:w-auto group relative px-7 py-3.5 sm:px-9 sm:py-4 rounded-full bg-gradient-to-r from-[#3BD8D9] to-[#8A46BB] text-black font-sans font-bold text-[11px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] transition-all duration-300 shadow-[0_0_35px_rgba(59,216,217,0.5)] hover:shadow-[0_0_50px_rgba(138,70,187,0.8)] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Launch Your Vision</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>

            <a
              href="#projects"
              data-cursor="pointer"
              className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-white/[0.05] hover:bg-white/15 border border-white/15 text-white font-sans font-medium text-[11px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-xl"
            >
              <ShieldCheck className="w-4 h-4 text-[#3BD8D9]" />
              <span>Explore Selected Work</span>
            </a>
          </div>
        </div>

        {/* Floating Stats Badges */}
        <div className="flex flex-row justify-between items-center gap-2 sm:absolute sm:bottom-8 left-4 sm:left-12 right-4 sm:right-12 pointer-events-auto z-30 w-full sm:w-auto px-4 sm:px-0 mt-8 sm:mt-0">
          <div className="glass-panel px-3 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-white/10 flex items-center gap-2 sm:gap-4 backdrop-blur-xl">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#3BD8D9] shadow-[0_0_10px_#3BD8D9] shrink-0" />
            <div className="text-left">
              <span className="block text-[9px] sm:text-xs font-mono text-white/50 uppercase">Frame Sync</span>
              <span className="text-[10px] sm:text-sm font-bold font-mono text-white">200 HD FRAMES REEL</span>
            </div>
          </div>

          <div className="glass-panel px-3 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-white/10 flex items-center gap-2 sm:gap-4 backdrop-blur-xl">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#8A46BB] shadow-[0_0_10px_#8A46BB] shrink-0" />
            <div className="text-left">
              <span className="block text-[9px] sm:text-xs font-mono text-white/50 uppercase">Satisfaction</span>
              <span className="text-[10px] sm:text-sm font-bold font-mono text-white">99.8% VERIFIED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHero;
