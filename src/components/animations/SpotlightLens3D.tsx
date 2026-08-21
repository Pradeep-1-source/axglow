import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export interface SpotlightLens3DProps {
  children: React.ReactNode;
  lensSize?: number; // default 280
  blurAmount?: string; // default '6px'
  brightness?: number; // default 0.85
  accentColor?: string; // default '#3b82f6' (blue) or '#f4c400'
  className?: string;
}

export const SpotlightLens3D: React.FC<SpotlightLens3DProps> = ({
  children,
  lensSize = 280,
  blurAmount = '6px',
  brightness = 0.85,
  accentColor = '#3b82f6',
  className = '',
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cropBoxRef = useRef<HTMLDivElement>(null);
  const holeRectRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !cropBoxRef.current || !holeRectRef.current) return;

    // Initial hidden state
    gsap.set([cropBoxRef.current, holeRectRef.current], {
      scale: 0.8,
      opacity: 0,
      transformOrigin: '50% 50%',
    });

    const xToBox = gsap.quickTo(cropBoxRef.current, 'x', { duration: 0.8, ease: 'power3.out' });
    const yToBox = gsap.quickTo(cropBoxRef.current, 'y', { duration: 0.8, ease: 'power3.out' });
    const xToHole = gsap.quickTo(holeRectRef.current, 'x', { duration: 0.8, ease: 'power3.out' });
    const yToHole = gsap.quickTo(holeRectRef.current, 'y', { duration: 0.8, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const targetX = x - lensSize / 2;
      const targetY = y - lensSize / 2;

      xToBox(targetX);
      yToBox(targetY);
      xToHole(targetX);
      yToHole(targetY);
    };

    const handleMouseEnter = () => {
      gsap.to([cropBoxRef.current, holeRectRef.current], {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.5)',
      });
    };

    const handleMouseLeave = () => {
      gsap.to([cropBoxRef.current, holeRectRef.current], {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: 'power2.inOut',
      });
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseenter', handleMouseEnter);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseenter', handleMouseEnter);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [lensSize]);

  const maskId = `spotlight-mask-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div
      ref={sectionRef}
      className={`relative w-full overflow-hidden cursor-crosshair ${className}`}
    >
      {/* 1. Base Layer (Original content) */}
      <div className="relative z-10">{children}</div>

      {/* 2. Soft Blur Overlay (Static backdrop filter) */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          WebkitBackdropFilter: `blur(${blurAmount}) brightness(${brightness})`,
          backdropFilter: `blur(${blurAmount}) brightness(${brightness})`,
        }}
      />

      {/* 3. SVG Mask Definition */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <filter id={`soft-edges-${maskId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="15" />
          </filter>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill="black" />
            <rect
              ref={holeRectRef}
              width={lensSize}
              height={lensSize}
              fill="white"
              x="0"
              y="0"
              filter={`url(#soft-edges-${maskId})`}
            />
          </mask>
        </defs>
      </svg>

      {/* 4. Reveal Layer (Clipped clear content layer) */}
      <div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          WebkitMaskImage: `url(#${maskId})`,
          maskImage: `url(#${maskId})`,
        }}
      >
        {children}
      </div>

      {/* 5. Crop Box Frame (Marching ants SVG border & corners) */}
      <div
        ref={cropBoxRef}
        className="absolute top-0 left-0 z-40 pointer-events-none flex items-center justify-center"
        style={{ width: lensSize, height: lensSize }}
      >
        <style>{`
          @keyframes marchAnts {
            0% { stroke-dashoffset: 20; }
            100% { stroke-dashoffset: 0; }
          }
          .marching-ants-line {
            stroke-dasharray: 10;
            animation: marchAnts 0.6s linear infinite;
          }
        `}</style>

        {/* Glow */}
        <div
          className="absolute inset-0 opacity-40 blur-md pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />

        {/* Animated Dashed Border */}
        <svg className="absolute inset-0 w-full h-full">
          <rect
            width="100%"
            height="100%"
            fill="none"
            stroke={accentColor}
            strokeWidth="2.5"
            className="marching-ants-line"
          />
        </svg>

        {/* Corner Handles */}
        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border border-white" style={{ backgroundColor: accentColor }} />
        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border border-white" style={{ backgroundColor: accentColor }} />
        <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border border-white" style={{ backgroundColor: accentColor }} />
        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border border-white" style={{ backgroundColor: accentColor }} />
      </div>
    </div>
  );
};
