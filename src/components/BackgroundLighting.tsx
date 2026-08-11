import React, { useEffect, useState } from 'react';

export const BackgroundLighting: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#061f21]">
      {/* Primary Deep Teal to Dark Emerald Base Gradient */}
      <div 
        className="absolute inset-0 opacity-95"
        style={{
          background: 'linear-gradient(180deg, #051a1c 0%, #07282b 35%, #093438 60%, #151b20 100%)',
        }}
      />

      {/* Warm Vibrant Sunset Crimson Glow (Bottom Horizon - exact match to reference image) */}
      <div
        className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[130%] h-[70%] rounded-[100%] blur-[130px] opacity-80 animate-pulse-glow"
        style={{
          background: 'radial-gradient(ellipse at bottom, #ff3b30 0%, #e63946 30%, #b81d1d 65%, transparent 100%)',
        }}
      />

      {/* Dynamic Mouse Spotlight Emerald Glow */}
      <div
        className="absolute w-[650px] h-[650px] rounded-full blur-[140px] opacity-40 transition-all duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, #0e5e63 0%, rgba(14,94,99,0) 70%)',
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Upper Deep Teal Ambient Lighting (Top Left) */}
      <div className="absolute -top-[15%] -left-[10%] w-[800px] h-[800px] rounded-full bg-[#0a484c]/50 blur-[170px]" />

      {/* Crimson Sunset Accent Glow (Bottom Left Horizon) */}
      <div className="absolute bottom-[2%] -left-[10%] w-[650px] h-[550px] rounded-full bg-[#ff3b30]/35 blur-[150px] animate-float-slow" />

      {/* Right Sunset Highlight (Bottom Right Horizon) */}
      <div className="absolute -bottom-[10%] right-[-5%] w-[600px] h-[500px] rounded-full bg-[#d62828]/25 blur-[160px]" />

      {/* Subtle Background Geometric Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-screen"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
};
