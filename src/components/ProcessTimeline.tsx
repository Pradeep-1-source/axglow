import React, { useEffect, useRef, useState } from 'react';
import { PROCESS_STEPS } from '../data/content';
import { Search, BarChart3, Target, Palette, Code2, Rocket } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Step configuration mapping with exact reference colors & icons
const STEP_CONFIG = [
  {
    step: '01',
    color: '#00F0FF', // Cyan / Blue
    colorRgb: '0, 240, 255',
    side: 'RIGHT',
    icon: Search,
    glow: 'shadow-[0_0_35px_rgba(0,240,255,0.45)]',
    border: 'border-[#00F0FF]',
    textAccent: 'text-[#00F0FF]',
    bgGradient: 'from-[#00F0FF]/15 via-[#00F0FF]/5 to-transparent',
    speedTrail: 'from-[#00F0FF]/60 via-[#00F0FF]/25 to-transparent',
  },
  {
    step: '02',
    color: '#10B981', // Emerald / Neon Green
    colorRgb: '16, 185, 129',
    side: 'LEFT',
    icon: BarChart3,
    glow: 'shadow-[0_0_35px_rgba(16,185,129,0.45)]',
    border: 'border-[#10B981]',
    textAccent: 'text-[#10B981]',
    bgGradient: 'from-[#10B981]/15 via-[#10B981]/5 to-transparent',
    speedTrail: 'from-[#10B981]/60 via-[#10B981]/25 to-transparent',
  },
  {
    step: '03',
    color: '#FF2E93', // Pink / Magenta
    colorRgb: '255, 46, 147',
    side: 'RIGHT',
    icon: Target,
    glow: 'shadow-[0_0_35px_rgba(255,46,147,0.45)]',
    border: 'border-[#FF2E93]',
    textAccent: 'text-[#FF2E93]',
    bgGradient: 'from-[#FF2E93]/15 via-[#FF2E93]/5 to-transparent',
    speedTrail: 'from-[#FF2E93]/60 via-[#FF2E93]/25 to-transparent',
  },
  {
    step: '04',
    color: '#FACC15', // Yellow / Gold
    colorRgb: '250, 204, 21',
    side: 'LEFT',
    icon: Palette,
    glow: 'shadow-[0_0_35px_rgba(250,204,21,0.45)]',
    border: 'border-[#FACC15]',
    textAccent: 'text-[#FACC15]',
    bgGradient: 'from-[#FACC15]/15 via-[#FACC15]/5 to-transparent',
    speedTrail: 'from-[#FACC15]/60 via-[#FACC15]/25 to-transparent',
  },
  {
    step: '05',
    color: '#A855F7', // Purple / Violet
    colorRgb: '168, 85, 247',
    side: 'RIGHT',
    icon: Code2,
    glow: 'shadow-[0_0_35px_rgba(168,85,247,0.45)]',
    border: 'border-[#A855F7]',
    textAccent: 'text-[#A855F7]',
    bgGradient: 'from-[#A855F7]/15 via-[#A855F7]/5 to-transparent',
    speedTrail: 'from-[#A855F7]/60 via-[#A855F7]/25 to-transparent',
  },
  {
    step: '06',
    color: '#00F0FF', // Cyan / Teal
    colorRgb: '0, 240, 255',
    side: 'LEFT',
    icon: Rocket,
    glow: 'shadow-[0_0_35px_rgba(0,240,255,0.45)]',
    border: 'border-[#00F0FF]',
    textAccent: 'text-[#00F0FF]',
    bgGradient: 'from-[#00F0FF]/15 via-[#00F0FF]/5 to-transparent',
    speedTrail: 'from-[#00F0FF]/60 via-[#00F0FF]/25 to-transparent',
  },
];

interface SportsCarProps {
  color: string;
  isActive?: boolean;
  scale?: number;
}

const SportsCar: React.FC<SportsCarProps> = ({ color, isActive = false, scale = 1.0 }) => {
  const filterId = React.useId();
  return (
    <g transform={`scale(${scale})`}>
      {/* Dynamic Underglow Reflection */}
      <ellipse
        cx="0"
        cy="0"
        rx="16"
        ry="24"
        fill={color}
        opacity={isActive ? 0.85 : 0.35}
        className="filter blur-md transition-opacity duration-300"
      />

      {/* Headlight Forward Light Beams */}
      <g opacity={isActive ? 1 : 0.4} className="transition-opacity duration-300">
        <path d="M -7 -22 L -16 -46 L 0 -46 Z" fill={color} opacity="0.35" />
        <path d="M 7 -22 L 16 -46 L 0 -46 Z" fill={color} opacity="0.35" />
        <path d="M -6.5 -22 L -11 -42 L -2 -42 Z" fill="#FFFFFF" opacity="0.7" />
        <path d="M 6.5 -22 L 11 -42 L 2 -42 Z" fill="#FFFFFF" opacity="0.7" />
      </g>

      {/* Main Miniature Sports Car Body */}
      <g transform="scale(0.85)">
        {/* Wheels (4 corners) */}
        <rect x="-13.5" y="-18" width="4" height="9" rx="1.5" fill="#111318" stroke="#374151" strokeWidth="0.6" />
        <rect x="9.5" y="-18" width="4" height="9" rx="1.5" fill="#111318" stroke="#374151" strokeWidth="0.6" />
        <rect x="-13.5" y="10" width="4" height="9" rx="1.5" fill="#111318" stroke="#374151" strokeWidth="0.6" />
        <rect x="9.5" y="10" width="4" height="9" rx="1.5" fill="#111318" stroke="#374151" strokeWidth="0.6" />

        {/* Rear Spoiler Wing */}
        <path d="M -11 18 L 11 18 L 9.5 15 L -9.5 15 Z" fill={color} opacity="0.95" stroke="#FFFFFF" strokeWidth="0.4" />

        {/* Aerodynamic Body Shell */}
        <path
          d="M -10 15 C -12 4, -13 -6, -11 -16 C -9 -23, -6 -27, 0 -28 C 6 -27, 9 -23, 11 -16 C 13 -6, 12 4, 10 15 Z"
          fill={`url(#carBodyGrad-${filterId})`}
          stroke={color}
          strokeWidth="1.2"
        />

        {/* Hood Vents */}
        <path d="M -4 -16 L -2 -22 L 2 -22 L 4 -16" fill="none" stroke="#000000" strokeWidth="1" opacity="0.6" />

        {/* Tinted Cockpit Glass Canopy */}
        <path
          d="M -7 -3 C -7 -12, 7 -12, 7 -3 L 6 7 C 6 10, -6 10, -6 7 Z"
          fill="#090a0f"
          stroke={color}
          strokeWidth="0.8"
        />
        {/* Metallic Windshield Highlights */}
        <path d="M -5.5 -2 L 5.5 -2 L 4 -7 L -4 -7 Z" fill="#FFFFFF" opacity="0.4" />
        <path d="M -4 4 L 4 4 L 4.5 7 L -4.5 7 Z" fill="#FFFFFF" opacity="0.2" />

        {/* Front Headlight Bulbs */}
        <ellipse cx="-7" cy="-24" rx="2" ry="1.2" fill="#FFFFFF" className="filter drop-shadow-[0_0_5px_#ffffff]" />
        <ellipse cx="7" cy="-24" rx="2" ry="1.2" fill="#FFFFFF" className="filter drop-shadow-[0_0_5px_#ffffff]" />

        {/* Rear Taillights */}
        <rect x="-9" y="16.5" width="4" height="1.8" rx="0.6" fill="#EF4444" className="filter drop-shadow-[0_0_6px_#ef4444]" />
        <rect x="5" y="16.5" width="4" height="1.8" rx="0.6" fill="#EF4444" className="filter drop-shadow-[0_0_6px_#ef4444]" />
      </g>

      <defs>
        <linearGradient id={`carBodyGrad-${filterId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="65%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0B0D14" />
        </linearGradient>
      </defs>
    </g>
  );
};

export const ProcessTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const roadPathRef = useRef<SVGPathElement>(null);

  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [carPositions, setCarPositions] = useState<{ x: number; y: number; rotation: number }[]>([]);
  const [paceCarPos, setPaceCarPos] = useState<{ x: number; y: number; rotation: number } | null>(null);

  // S-Curve road path definition centered around x=500 in viewBox 0 0 1000 3200
  const roadCurvePath =
    'M 500 40 C 600 220, 600 380, 500 560 C 400 740, 400 900, 500 1080 C 600 1260, 600 1420, 500 1600 C 400 1780, 400 1940, 500 2120 C 600 2300, 600 2460, 500 2640 C 400 2820, 400 2980, 500 3160';

  useEffect(() => {
    const roadPath = roadPathRef.current;
    if (!roadPath) return;

    const totalLength = roadPath.getTotalLength();

    // Compute car positions at each step peak along the S-curve
    const positions = STEP_CONFIG.map((_, idx) => {
      const fraction = (idx + 0.5) / STEP_CONFIG.length;
      const len = fraction * totalLength;
      const pt = roadPath.getPointAtLength(len);
      const ptPrev = roadPath.getPointAtLength(Math.max(0, len - 5));
      const ptNext = roadPath.getPointAtLength(Math.min(totalLength, len + 5));
      const angle = (Math.atan2(ptNext.y - ptPrev.y, ptNext.x - ptPrev.x) * 180) / Math.PI + 90;
      return { x: pt.x, y: pt.y, rotation: angle };
    });

    setCarPositions(positions);

    // Initial Pace Car Position
    const initialPt = roadPath.getPointAtLength(0.08 * totalLength);
    const initNext = roadPath.getPointAtLength(0.08 * totalLength + 5);
    const initAngle = (Math.atan2(initNext.y - initialPt.y, initNext.x - initialPt.x) * 180) / Math.PI + 90;
    setPaceCarPos({ x: initialPt.x, y: initialPt.y, rotation: initAngle });

    // Smooth Car Motion & Step Highlight Timeline via GSAP ScrollTrigger
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 75%',
        end: 'bottom 25%',
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentLen = progress * totalLength;

          const pt = roadPath.getPointAtLength(currentLen);
          const ptPrev = roadPath.getPointAtLength(Math.max(0, currentLen - 4));
          const ptNext = roadPath.getPointAtLength(Math.min(totalLength, currentLen + 4));

          const angleRad = Math.atan2(ptNext.y - ptPrev.y, ptNext.x - ptPrev.x);
          const angleDeg = (angleRad * 180) / Math.PI + 90;

          setPaceCarPos({ x: pt.x, y: pt.y, rotation: angleDeg });

          // Determine current active process step
          const stepIndex = Math.min(STEP_CONFIG.length - 1, Math.floor(progress * STEP_CONFIG.length));
          setActiveStepIndex(stepIndex);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const activeConfig = STEP_CONFIG[activeStepIndex] || STEP_CONFIG[0];

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative py-16 px-4 sm:px-6 md:px-12 bg-[#05060a] text-white overflow-hidden min-h-screen flex flex-col justify-between"
    >
      {/* Background Ambient Glows synchronized to current step color */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[220px] pointer-events-none transition-all duration-700 opacity-20"
        style={{ background: activeConfig.color }}
      />
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#00F0FF]/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#A855F7]/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-6xl mx-auto w-full relative z-20 mb-8 sm:mb-12">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="px-3.5 py-1 rounded-full text-[11px] uppercase font-mono font-bold tracking-[0.25em] border backdrop-blur-md transition-colors duration-500"
            style={{
              borderColor: `${activeConfig.color}80`,
              color: activeConfig.color,
              backgroundColor: `${activeConfig.color}15`,
            }}
          >
            Process
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-none">
              Our Proven <br />
              <span
                className="text-transparent bg-clip-text transition-all duration-700"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${activeConfig.color}, #FFFFFF)`,
                }}
              >
                Creative Workflow
              </span>
            </h2>
          </div>
          <p className="max-w-md text-white/70 font-sans text-xs sm:text-sm leading-relaxed font-normal">
            An interactive 6-step roadmap driven by precision engineering, luxury aesthetics, and relentless execution.
          </p>
        </div>
      </div>

      {/* Main Interactive Track Container */}
      <div className="max-w-6xl mx-auto w-full relative z-10 my-auto">
        {/* Central S-Curve SVG Road Overlay */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <svg viewBox="0 0 1000 3200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            {/* Ambient Neon Shadow under road */}
            <path
              d={roadCurvePath}
              fill="none"
              stroke={activeConfig.color}
              strokeWidth="48"
              opacity="0.18"
              className="filter blur-2xl transition-colors duration-500"
            />

            {/* Glowing Neon Road Outer Borders */}
            <path
              d={roadCurvePath}
              fill="none"
              stroke={activeConfig.color}
              strokeWidth="38"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="filter drop-shadow-[0_0_15px_rgba(0,240,255,0.7)] transition-colors duration-500"
            />

            {/* Dark Charcoal Asphalt Road Base */}
            <path
              d={roadCurvePath}
              fill="none"
              stroke="#090b10"
              strokeWidth="32"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Inner Textured Road Surface */}
            <path
              d={roadCurvePath}
              fill="none"
              stroke="#131622"
              strokeWidth="28"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* White Dashed Center Lane Marking */}
            <path
              ref={roadPathRef}
              d={roadCurvePath}
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeDasharray="10 14"
              opacity="0.9"
              className="filter drop-shadow-[0_0_4px_#ffffff]"
            />

            {/* Glowing Connector Lines between Markers & Side Cards */}
            {carPositions.map((pos, idx) => {
              const config = STEP_CONFIG[idx];
              const isStepActive = activeStepIndex === idx;
              const isRight = config.side === 'RIGHT';
              return (
                <line
                  key={`connector-${idx}`}
                  x1={pos.x}
                  y1={pos.y}
                  x2={isRight ? 720 : 280}
                  y2={pos.y}
                  stroke={config.color}
                  strokeWidth={isStepActive ? '2.5' : '1'}
                  strokeDasharray={isStepActive ? 'none' : '4 4'}
                  opacity={isStepActive ? 0.9 : 0.25}
                  className="transition-all duration-300 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                />
              );
            })}

            {/* Stationery Miniature Sports Cars at Each Step */}
            {carPositions.map((pos, idx) => {
              const config = STEP_CONFIG[idx];
              const isStepActive = activeStepIndex === idx;
              return (
                <g key={`car-${idx}`} transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.rotation})`}>
                  <SportsCar color={config.color} isActive={isStepActive} scale={0.9} />
                </g>
              );
            })}

            {/* Active Pace Car Driving on Scroll */}
            {paceCarPos && (
              <g transform={`translate(${paceCarPos.x}, ${paceCarPos.y}) rotate(${paceCarPos.rotation})`}>
                <SportsCar color={activeConfig.color} isActive={true} scale={1.05} />
              </g>
            )}

            {/* Step Number Road Markers (01 - 06) */}
            {carPositions.map((pos, idx) => {
              const config = STEP_CONFIG[idx];
              const isStepActive = activeStepIndex === idx;
              return (
                <g key={`marker-${idx}`} transform={`translate(${pos.x}, ${pos.y})`}>
                  {/* Glowing Radar Pulse Ring on Active */}
                  {isStepActive && (
                    <circle
                      cx="0"
                      cy="0"
                      r="26"
                      fill="none"
                      stroke={config.color}
                      strokeWidth="2"
                      opacity="0.7"
                      className="animate-ping"
                    />
                  )}
                  {/* Outer Marker Circle */}
                  <circle
                    cx="0"
                    cy="0"
                    r={isStepActive ? '22' : '18'}
                    fill="#090b10"
                    stroke={config.color}
                    strokeWidth={isStepActive ? '3' : '1.5'}
                    opacity="0.95"
                    className="transition-all duration-300 filter drop-shadow-[0_0_12px_rgba(0,0,0,0.9)]"
                  />
                  {/* Step Number Text */}
                  <text
                    x="0"
                    y="5"
                    textAnchor="middle"
                    fill={isStepActive ? config.color : '#ffffff'}
                    fontSize={isStepActive ? '14' : '12'}
                    fontWeight="900"
                    fontFamily="monospace"
                  >
                    {config.step}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Alternating Process Cards Grid */}
        <div className="space-y-12 md:space-y-20 relative z-10 py-4">
          {PROCESS_STEPS.map((item, idx) => {
            const config = STEP_CONFIG[idx] || STEP_CONFIG[0];
            const isActive = activeStepIndex === idx;
            const IconComponent = config.icon;
            const isRight = config.side === 'RIGHT';

            return (
              <div
                key={item.step}
                className={`flex items-center ${
                  isRight ? 'justify-end' : 'justify-start'
                } relative`}
              >
                {/* 3D Glass Card Container */}
                <div
                  className={`w-full md:w-[410px] lg:w-[450px] p-6 sm:p-7 rounded-3xl backdrop-blur-2xl transition-all duration-500 border relative overflow-visible ${
                    isActive
                      ? `${config.border} ${config.glow} bg-gradient-to-br ${config.bgGradient} opacity-100 scale-[1.03] z-30`
                      : 'border-white/10 bg-[#090b10]/85 opacity-60 scale-[0.95] z-10 hover:opacity-80'
                  }`}
                  style={{
                    transform: isActive
                      ? `perspective(1200px) rotateY(${isRight ? '-5deg' : '5deg'}) rotateX(2deg) translateZ(15px)`
                      : `perspective(1200px) rotateY(${isRight ? '-12deg' : '12deg'}) scale(0.95)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Horizontal Speed Blur Trails on Card Outer Edge */}
                  {isRight ? (
                    <div
                      className={`absolute top-0 bottom-0 -right-16 w-20 pointer-events-none transition-opacity duration-500 hidden sm:block ${
                        isActive ? 'opacity-100' : 'opacity-25'
                      }`}
                    >
                      <div className={`w-full h-full bg-gradient-to-r ${config.speedTrail} blur-xl rounded-r-3xl`} />
                      <div className="absolute top-1/4 right-0 w-16 h-[2px] opacity-80" style={{ background: config.color }} />
                      <div className="absolute top-1/2 right-4 w-20 h-[1.5px] opacity-90" style={{ background: config.color }} />
                      <div className="absolute top-3/4 right-2 w-12 h-[2px] opacity-80" style={{ background: config.color }} />
                    </div>
                  ) : (
                    <div
                      className={`absolute top-0 bottom-0 -left-16 w-20 pointer-events-none transition-opacity duration-500 hidden sm:block ${
                        isActive ? 'opacity-100' : 'opacity-25'
                      }`}
                    >
                      <div className={`w-full h-full bg-gradient-to-l ${config.speedTrail} blur-xl rounded-l-3xl`} />
                      <div className="absolute top-1/4 left-0 w-16 h-[2px] opacity-80" style={{ background: config.color }} />
                      <div className="absolute top-1/2 left-4 w-20 h-[1.5px] opacity-90" style={{ background: config.color }} />
                      <div className="absolute top-3/4 left-2 w-12 h-[2px] opacity-80" style={{ background: config.color }} />
                    </div>
                  )}

                  {/* Card Header & Content */}
                  <div className="flex items-start justify-between relative z-10 mb-3">
                    <div>
                      <span className={`font-display text-3xl sm:text-4xl font-black ${config.textAccent} block mb-0.5`}>
                        {item.step}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                        {item.title}
                      </h3>
                      <span className={`text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] uppercase block mt-1 ${config.textAccent}`}>
                        {item.subtitle}
                      </span>
                    </div>

                    {/* Right-side Decorative Stroke Icon */}
                    <div
                      className={`p-3 rounded-2xl border backdrop-blur-md transition-colors ${
                        isActive ? `${config.border} bg-white/5` : 'border-white/10 bg-white/[0.02]'
                      }`}
                    >
                      <IconComponent className={`w-6 h-6 sm:w-7 sm:h-7 ${config.textAccent}`} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Card Body Text */}
                  <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed relative z-10 font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
