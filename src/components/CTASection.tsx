import React, { useState, useRef } from 'react';
import { Sparkles, ArrowUpRight, Check, Flame, DollarSign } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CTAProps {
  onOpenContact: () => void;
}

// Magnetic Button Micro-interaction Component
const MagneticCTAButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ children, onClick }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [contentPos, setContentPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * 0.32;
    const distanceY = (e.clientY - centerY) * 0.32;

    setPosition({ x: distanceX, y: distanceY });
    setContentPos({ x: distanceX * 0.5, y: distanceY * 0.5 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setContentPos({ x: 0, y: 0 });
  };

  return (
    <div className="w-full relative group">
      {/* Dynamic Background Glow */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-[#3BD8D9] via-[#8A46BB] to-[#FF5D93] rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <button
        ref={btnRef}
        type="button"
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0px)`,
          transition:
            position.x === 0 && position.y === 0
              ? 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
              : 'transform 0.1s ease-out',
        }}
        className="relative w-full py-5 sm:py-6 rounded-full bg-gradient-to-r from-[#3BD8D9] via-[#8A46BB] to-[#FF5D93] text-black font-sans font-extrabold text-xs sm:text-sm uppercase tracking-[0.25em] shadow-[0_0_40px_rgba(59,216,217,0.5)] overflow-hidden cursor-pointer select-none"
      >
        <div
          style={{
            transform: `translate3d(${contentPos.x}px, ${contentPos.y}px, 0px)`,
            transition:
              contentPos.x === 0 && contentPos.y === 0
                ? 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                : 'transform 0.1s ease-out',
          }}
          className="w-full h-full flex items-center justify-center gap-3 text-black pointer-events-none"
        >
          {children}
        </div>
      </button>
    </div>
  );
};

// Spring Physics Tag Chip Component
const SpringChip: React.FC<{
  label: string;
  selected: boolean;
  onToggle: () => void;
}> = ({ label, selected, onToggle }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      type="button"
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={onToggle}
      style={{
        transform: isPressed ? 'scale(0.92)' : selected ? 'scale(1.04)' : 'scale(1)',
        transition:
          'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      className={`group relative px-4 sm:px-5 py-2.5 rounded-full text-xs font-mono tracking-wider flex items-center gap-2 border transition-all duration-300 select-none cursor-pointer ${
        selected
          ? 'bg-[#3BD8D9]/15 text-white border-[#3BD8D9] shadow-[0_0_20px_rgba(59,216,217,0.35)] font-bold'
          : 'bg-white/[0.04] text-white/70 border-white/10 hover:border-white/30 hover:text-white'
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          selected ? 'bg-[#3BD8D9] scale-125 shadow-[0_0_8px_#3BD8D9]' : 'bg-white/30 group-hover:bg-white/60'
        }`}
      />
      <span>{label}</span>
      {selected && (
        <Check className="w-3.5 h-3.5 text-[#3BD8D9] animate-in zoom-in-50 duration-200" />
      )}
    </button>
  );
};

export const CTASection: React.FC<CTAProps> = ({ onOpenContact }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(['Brand Strategy & Identity', '3D Web Experience']);
  const [selectedBudget, setSelectedBudget] = useState<string>('$30k - $50k');

  const PROJECT_TYPES = [
    'Brand Strategy & Identity',
    '3D Web Experience',
    'UI/UX Design Systems',
    'Cinematic Video',
    'Performance Marketing',
  ];

  const BUDGET_RANGES = ['< $15k', '$15k - $30k', '$30k - $50k', '$50k - $100k', '$100k+'];

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.length > 1
          ? prev.filter((s) => s !== service)
          : prev
        : [...prev, service]
    );
  };

  const handleLaunchInquiry = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#3BD8D9', '#8A46BB', '#FF5D93'],
    });
    onOpenContact();
  };

  return (
    <section className="relative py-36 px-6 md:px-12 bg-transparent overflow-hidden">
      {/* Background Radial Light Swirls */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-to-r from-[#3BD8D9]/15 via-[#8A46BB]/15 to-[#FF5D93]/15 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Subtitle Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.04] border border-[#3BD8D9]/30 mb-8 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-[#3BD8D9]" />
          <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#3BD8D9]">
            Interactive Project Inquiry
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tight leading-[0.95] mb-6">
          Ready to Build <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3BD8D9] via-white to-[#FF5D93] filter drop-shadow-[0_0_40px_rgba(59,216,217,0.4)]">
            Something Iconic?
          </span>
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/70 font-sans font-light leading-relaxed mb-12">
          Select your desired scope and budget parameters using the interactive tags below to launch your project brief.
        </p>

        {/* Interactive Inquiry Form Card */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/15 backdrop-blur-2xl text-left max-w-4xl mx-auto mb-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          {/* Service Scope Chips */}
          <div className="mb-8">
            <label className="text-xs font-mono text-white/60 block mb-3 uppercase tracking-wider font-semibold flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#3BD8D9]" />
              <span>Project Scope / Services</span>
            </label>
            <div className="flex flex-wrap gap-2.5">
              {PROJECT_TYPES.map((service) => (
                <SpringChip
                  key={service}
                  label={service}
                  selected={selectedServices.includes(service)}
                  onToggle={() => toggleService(service)}
                />
              ))}
            </div>
          </div>

          {/* Budget Range Chips */}
          <div className="mb-10">
            <label className="text-xs font-mono text-white/60 block mb-3 uppercase tracking-wider font-semibold flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#8A46BB]" />
              <span>Target Budget Range</span>
            </label>
            <div className="flex flex-wrap gap-2.5">
              {BUDGET_RANGES.map((b) => (
                <SpringChip
                  key={b}
                  label={b}
                  selected={selectedBudget === b}
                  onToggle={() => setSelectedBudget(b)}
                />
              ))}
            </div>
          </div>

          {/* Full-Width Magnetic CTA Button */}
          <MagneticCTAButton onClick={handleLaunchInquiry}>
            <span>Launch Briefing & Submit</span>
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </MagneticCTAButton>
        </div>
      </div>
    </section>
  );
};
