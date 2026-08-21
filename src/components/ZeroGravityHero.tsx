import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, Move, RotateCcw, Zap, Compass, ArrowUpRight, Box, Circle, Triangle } from 'lucide-react';

interface FloatingPhysicsItem {
  id: string;
  type: 'badge' | 'icon' | 'button' | 'card';
  title: string;
  subtext?: string;
  icon?: React.ReactNode;
  color: string; // Tailwind border & glow color
  bgColor: string;
  textColor: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  isDragging: boolean;
  rotation: number;
  vRot: number; // rotational velocity
}

const INITIAL_ITEMS = [
  {
    id: 'badge-1',
    type: 'badge' as const,
    title: '✨ AI Motion Systems',
    color: '#06b6d4', // Cyan
    bgColor: 'bg-cyan-950/80',
    textColor: 'text-cyan-300',
    initialPos: { xRatio: 0.12, yRatio: 0.2 },
    initialVel: { vx: 0.8, vy: -0.5 },
  },
  {
    id: 'badge-2',
    type: 'badge' as const,
    title: '⚡ 120 FPS Zero-G Physics',
    color: '#f59e0b', // Amber
    bgColor: 'bg-amber-950/80',
    textColor: 'text-amber-300',
    initialPos: { xRatio: 0.72, yRatio: 0.18 },
    initialVel: { vx: -0.6, vy: 0.9 },
  },
  {
    id: 'card-1',
    type: 'card' as const,
    title: '3D WebGL Canvas',
    subtext: 'Drag & Throw Anywhere',
    icon: <Box className="w-6 h-6 text-cyan-400" />,
    color: '#06b6d4',
    bgColor: 'bg-zinc-900/90',
    textColor: 'text-white',
    initialPos: { xRatio: 0.08, yRatio: 0.55 },
    initialVel: { vx: 0.9, vy: 0.4 },
  },
  {
    id: 'card-2',
    type: 'card' as const,
    title: 'Luxury Brand Identity',
    subtext: 'Elastic Bounce Enabled',
    icon: <Circle className="w-6 h-6 text-purple-400" />,
    color: '#a855f7',
    bgColor: 'bg-zinc-900/90',
    textColor: 'text-white',
    initialPos: { xRatio: 0.75, yRatio: 0.62 },
    initialVel: { vx: -0.7, vy: -0.8 },
  },
  {
    id: 'icon-1',
    type: 'icon' as const,
    title: '🔮 Quantum Shader',
    icon: <Triangle className="w-5 h-5 text-emerald-400" />,
    color: '#10b981',
    bgColor: 'bg-emerald-950/80',
    textColor: 'text-emerald-300',
    initialPos: { xRatio: 0.48, yRatio: 0.15 },
    initialVel: { vx: 0.5, vy: 0.6 },
  },
  {
    id: 'button-1',
    type: 'button' as const,
    title: 'Launch Project ↗',
    icon: <ArrowUpRight className="w-4 h-4" />,
    color: '#3b82f6', // Blue
    bgColor: 'bg-blue-600',
    textColor: 'text-white',
    initialPos: { xRatio: 0.22, yRatio: 0.78 },
    initialVel: { vx: 0.7, vy: -0.9 },
  },
  {
    id: 'button-2',
    type: 'button' as const,
    title: 'Explore Work ⚡',
    icon: <Zap className="w-4 h-4" />,
    color: '#ec4899', // Pink
    bgColor: 'bg-pink-600',
    textColor: 'text-white',
    initialPos: { xRatio: 0.62, yRatio: 0.8 },
    initialVel: { vx: -0.8, vy: -0.4 },
  },
  {
    id: 'badge-3',
    type: 'badge' as const,
    title: '💎 Fluid Inertia Decay',
    color: '#a855f7',
    bgColor: 'bg-purple-950/80',
    textColor: 'text-purple-300',
    initialPos: { xRatio: 0.38, yRatio: 0.85 },
    initialVel: { vx: 0.4, vy: -0.6 },
  },
];

export const ZeroGravityHero: React.FC<{ onOpenContact?: () => void }> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<FloatingPhysicsItem[]>([]);
  const [, setRenderTrigger] = useState(0);

  // Mouse tracking state for velocity calculation during drag
  const dragInfoRef = useRef<{
    activeId: string | null;
    startX: number;
    startY: number;
    lastMouseX: number;
    lastMouseY: number;
    lastTime: number;
    vxHistory: number[];
    vyHistory: number[];
  }>({
    activeId: null,
    startX: 0,
    startY: 0,
    lastMouseX: 0,
    lastMouseY: 0,
    lastTime: 0,
    vxHistory: [],
    vyHistory: [],
  });

  const [zeroGActive, setZeroGActive] = useState(true);

  // Initialize Item Positions on Mount & Resize
  const initPositions = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    itemsRef.current = INITIAL_ITEMS.map((item) => {
      // Estimate dimensions based on type
      let width = 180;
      let height = 48;
      if (item.type === 'card') {
        width = 240;
        height = 80;
      } else if (item.type === 'button') {
        width = 160;
        height = 48;
      }

      return {
        ...item,
        x: item.initialPos.xRatio * w,
        y: item.initialPos.yRatio * h,
        vx: item.initialVel.vx * 3.5,
        vy: item.initialVel.vy * 3.5,
        width,
        height,
        isDragging: false,
        rotation: (Math.random() - 0.5) * 12,
        vRot: (Math.random() - 0.5) * 0.4,
      };
    });

    setRenderTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    initPositions();
    window.addEventListener('resize', initPositions);
    return () => window.removeEventListener('resize', initPositions);
  }, [initPositions]);

  // Main RAF Physics Animation Loop
  useEffect(() => {
    let animId: number;

    const updatePhysics = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const boundsW = rect.width;
      const boundsH = rect.height;

      const friction = 0.988; // Air drag inertia decay
      const bounce = 0.82; // Elastic restitution coefficient on screen boundaries

      itemsRef.current.forEach((item) => {
        if (item.isDragging) return;

        // Position update
        item.x += item.vx;
        item.y += item.vy;

        // Rotation update
        item.rotation += item.vRot;

        // Inertia decay
        item.vx *= friction;
        item.vy *= friction;
        item.vRot *= 0.98;

        // Ambient micro-float force when velocity gets low
        const currentSpeed = Math.sqrt(item.vx * item.vx + item.vy * item.vy);
        if (zeroGActive && currentSpeed < 0.5) {
          item.vx += (Math.random() - 0.5) * 0.15;
          item.vy += (Math.random() - 0.5) * 0.15;
        }

        // --- WALL COLLISION DETECT & BOUNCE ---
        // Left Wall
        if (item.x < 12) {
          item.x = 12;
          item.vx = Math.abs(item.vx) * bounce;
          item.vRot = (Math.random() - 0.5) * 1.5;
        }
        // Right Wall
        else if (item.x + item.width > boundsW - 12) {
          item.x = boundsW - 12 - item.width;
          item.vx = -Math.abs(item.vx) * bounce;
          item.vRot = (Math.random() - 0.5) * 1.5;
        }

        // Top Wall
        if (item.y < 12) {
          item.y = 12;
          item.vy = Math.abs(item.vy) * bounce;
          item.vRot = (Math.random() - 0.5) * 1.5;
        }
        // Bottom Wall
        else if (item.y + item.height > boundsH - 12) {
          item.y = boundsH - 12 - item.height;
          item.vy = -Math.abs(item.vy) * bounce;
          item.vRot = (Math.random() - 0.5) * 1.5;
        }
      });

      setRenderTrigger((prev) => (prev + 1) % 1000);
      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, [zeroGActive]);

  // Pointer Handlers for Dragging and Throwing
  const handlePointerDown = (id: string, e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    const item = itemsRef.current.find((i) => i.id === id);
    if (!item || !containerRef.current) return;

    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    item.isDragging = true;
    item.vx = 0;
    item.vy = 0;

    const now = performance.now();
    dragInfoRef.current = {
      activeId: id,
      startX: e.clientX - item.x,
      startY: e.clientY - item.y,
      lastMouseX: e.clientX,
      lastMouseY: e.clientY,
      lastTime: now,
      vxHistory: [],
      vyHistory: [],
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const { activeId, startX, startY, lastMouseX, lastMouseY, lastTime, vxHistory, vyHistory } =
      dragInfoRef.current;
    if (!activeId) return;

    const item = itemsRef.current.find((i) => i.id === activeId);
    if (!item) return;

    const now = performance.now();
    const dt = Math.max(1, now - lastTime);

    // Update item position to pointer
    item.x = e.clientX - startX;
    item.y = e.clientY - startY;

    // Calculate instantaneous mouse velocity
    const instVx = ((e.clientX - lastMouseX) / dt) * 16; // normalized to ~60fps frame delta
    const instVy = ((e.clientY - lastMouseY) / dt) * 16;

    vxHistory.push(instVx);
    vyHistory.push(instVy);
    if (vxHistory.length > 5) {
      vxHistory.shift();
      vyHistory.shift();
    }

    dragInfoRef.current.lastMouseX = e.clientX;
    dragInfoRef.current.lastMouseY = e.clientY;
    dragInfoRef.current.lastTime = now;
  };

  const handlePointerUp = (id: string, e: React.PointerEvent<HTMLDivElement>) => {
    const item = itemsRef.current.find((i) => i.id === id);
    if (!item) return;

    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if capture already lost
    }

    item.isDragging = false;

    // Impart smooth throw velocity using average of recent velocity history
    const { vxHistory, vyHistory } = dragInfoRef.current;
    if (vxHistory.length > 0) {
      const avgVx = vxHistory.reduce((a, b) => a + b, 0) / vxHistory.length;
      const avgVy = vyHistory.reduce((a, b) => a + b, 0) / vyHistory.length;

      // Clamp max throw velocity to avoid clipping walls
      const maxVel = 28;
      item.vx = Math.max(-maxVel, Math.min(maxVel, avgVx * 1.2));
      item.vy = Math.max(-maxVel, Math.min(maxVel, avgVy * 1.2));
      item.vRot = (Math.random() - 0.5) * 4;
    }

    dragInfoRef.current.activeId = null;
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-black text-white overflow-hidden flex flex-col items-center justify-center select-none pt-24 pb-12"
    >
      {/* Background Decorative Gradients & Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.12)_0%,rgba(0,0,0,0.95)_70%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Hero Center Typography & Title (Static Content Layer) */}
      <div className="relative z-10 max-w-4xl px-6 text-center pointer-events-none">
        {/* Anti-gravity Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold uppercase tracking-widest mb-6 shadow-[0_0_25px_rgba(6,182,212,0.3)]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          Zero-Gravity Interactive Physics Engine
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white leading-none mb-6 drop-shadow-2xl">
          ZERO <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400">GRAVITY</span> CREATIVITY
        </h1>

        {/* Hero Description */}
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed font-medium mb-10">
          Click, drag, and throw floating elements across the viewport with smooth dynamic velocity, elastic wall bouncing, and fluid inertia decay.
        </p>

        {/* Fixed Control Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
          <button
            onClick={() => onOpenContact && onOpenContact()}
            className="px-8 py-4 rounded-full bg-white text-black font-bold text-sm tracking-wide uppercase shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105 transition-transform"
          >
            Start Project
          </button>
          <button
            onClick={() => initPositions()}
            className="flex items-center gap-2 px-6 py-4 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-200 font-bold text-xs uppercase tracking-wider hover:border-cyan-400 hover:text-cyan-300 transition-all hover:scale-105"
          >
            <RotateCcw className="w-4 h-4" /> Reset Positions
          </button>
          <button
            onClick={() => setZeroGActive(!zeroGActive)}
            className={`flex items-center gap-2 px-6 py-4 rounded-full border text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 ${
              zeroGActive
                ? 'bg-cyan-950/80 border-cyan-500/60 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400'
            }`}
          >
            <Compass className={`w-4 h-4 ${zeroGActive ? 'animate-spin' : ''}`} />
            {zeroGActive ? 'Zero-G Drift: ON' : 'Zero-G Drift: OFF'}
          </button>
        </div>
      </div>

      {/* Floating Interactive Physics Items Layer */}
      <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
        {itemsRef.current.map((item) => (
          <div
            key={item.id}
            onPointerDown={(e) => handlePointerDown(item.id, e)}
            onPointerMove={handlePointerMove}
            onPointerUp={(e) => handlePointerUp(item.id, e)}
            className={`absolute top-0 left-0 cursor-grab active:cursor-grabbing pointer-events-auto touch-none transition-shadow ${
              item.isDragging ? 'z-50 scale-105 shadow-[0_0_40px_rgba(255,255,255,0.4)]' : 'z-20'
            }`}
            style={{
              transform: `translate3d(${item.x}px, ${item.y}px, 0px) rotate(${item.rotation}deg)`,
              willChange: 'transform',
            }}
          >
            {/* ITEM TYPE: BADGE */}
            {item.type === 'badge' && (
              <div
                className={`px-5 py-2.5 rounded-full border backdrop-blur-md font-mono text-xs font-bold tracking-wide shadow-xl flex items-center gap-2 ${item.bgColor} ${item.textColor}`}
                style={{ borderColor: item.color }}
              >
                <Move className="w-3.5 h-3.5 opacity-60" />
                {item.title}
              </div>
            )}

            {/* ITEM TYPE: CARD */}
            {item.type === 'card' && (
              <div
                className={`p-4 rounded-2xl border backdrop-blur-lg shadow-2xl flex items-center gap-3.5 ${item.bgColor} ${item.textColor}`}
                style={{ borderColor: `${item.color}60` }}
              >
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-tight">{item.title}</h4>
                  {item.subtext && (
                    <p className="text-[10px] text-zinc-400 font-mono mt-0.5">{item.subtext}</p>
                  )}
                </div>
              </div>
            )}

            {/* ITEM TYPE: ICON */}
            {item.type === 'icon' && (
              <div
                className={`px-4 py-2.5 rounded-2xl border backdrop-blur-md shadow-lg flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider ${item.bgColor} ${item.textColor}`}
                style={{ borderColor: item.color }}
              >
                {item.icon}
                {item.title}
              </div>
            )}

            {/* ITEM TYPE: BUTTON */}
            {item.type === 'button' && (
              <button
                type="button"
                className={`px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2 hover:brightness-110 transition-all ${item.bgColor} ${item.textColor}`}
                style={{ boxShadow: `0 10px 30px ${item.color}60` }}
              >
                {item.title}
                {item.icon}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Footer Floating Instruction */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none opacity-60">
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest text-center flex items-center gap-2">
          <Move className="w-3.5 h-3.5" /> Drag & throw floating badges across the screen to test wall bounces
        </p>
      </div>
    </section>
  );
};

export default ZeroGravityHero;
