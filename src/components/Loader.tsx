import React, { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              onComplete();
            }, 600);
          }, 200);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 4;
        const next = Math.min(prev + increment, 100);
        return next;
      });
    }, 35);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-[#050508] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
        isExiting ? 'opacity-0 scale-105 blur-md pointer-events-none' : 'opacity-100 scale-100 blur-0'
      }`}
    >
      {/* Ambient background glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#3BD8D9]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Cinematic Overlay UI */}
      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 pointer-events-none">
        {/* AglowX Luxury Emblem */}
        <div className="relative mb-6 transform transition-all duration-700 hover:scale-105">
          <img
            src="/aglowx-logo.png"
            alt="AglowX"
            className="h-16 md:h-20 w-auto object-contain filter drop-shadow-[0_0_25px_rgba(59,216,217,0.85)] animate-pulse"
          />
        </div>

        {/* Cinematic Tagline */}
        <p className="text-xs uppercase tracking-[0.35em] text-[#3BD8D9]/80 font-sans mb-8 text-center font-medium drop-shadow-[0_0_10px_rgba(59,216,217,0.4)]">
          Where Brands Rise in Brilliance
        </p>

        {/* Progress Bar Container */}
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative mb-4 backdrop-blur-md">
          <div
            className="h-full bg-gradient-to-r from-[#8A46BB] via-[#3BD8D9] to-[#8fe6ff] transition-all duration-150 ease-out shadow-[0_0_15px_#3BD8D9]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Status Counter */}
        <div className="w-full flex justify-between items-center text-[11px] font-mono text-white/50">
          <span className="tracking-widest uppercase text-[#3BD8D9]/70 font-semibold">INITIALIZING</span>
          <span className="text-[#3BD8D9] font-bold tracking-wider">{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
