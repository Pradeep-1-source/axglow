import React, { useState, useRef } from 'react';
import { X, Send, CheckCircle2, Check, Sparkles, Flame, DollarSign, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Full-Width Magnetic Button Component with Micro-Interactions
const MagneticCTAButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}> = ({ children, onClick, disabled }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [contentPos, setContentPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * 0.28;
    const distanceY = (e.clientY - centerY) * 0.28;

    setPosition({ x: distanceX, y: distanceY });
    setContentPos({ x: distanceX * 0.45, y: distanceY * 0.45 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setContentPos({ x: 0, y: 0 });
  };

  return (
    <div className="w-full relative group">
      {/* Outer Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#3BD8D9] via-[#8A46BB] to-[#FF5D93] rounded-full blur-xl opacity-40 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />

      <button
        ref={btnRef}
        type="submit"
        disabled={disabled}
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
        className="relative w-full py-5 rounded-full bg-gradient-to-r from-[#3BD8D9] via-[#8A46BB] to-[#FF5D93] text-black font-sans font-extrabold text-xs uppercase tracking-[0.25em] shadow-[0_0_35px_rgba(59,216,217,0.4)] overflow-hidden cursor-pointer select-none"
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

// Spring Physics Filter Chip Component
const SpringChip: React.FC<{
  label: string;
  selected: boolean;
  onToggle: () => void;
  accentColor?: string;
}> = ({ label, selected, onToggle, accentColor = '#3BD8D9' }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      type="button"
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={onToggle}
      style={{
        transform: isPressed ? 'scale(0.92)' : selected ? 'scale(1.03)' : 'scale(1)',
        borderColor: selected ? accentColor : undefined,
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

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>(['Brand Strategy & Identity']);
  const [selectedBudget, setSelectedBudget] = useState<string>('$30k - $50k');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('Standard (1 - 3 Mo)');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  if (!isOpen) return null;

  const PROJECT_TYPES = [
    'Brand Strategy & Identity',
    '3D Web Experience',
    'UI/UX Design Systems',
    'Cinematic Video & VFX',
    'Performance Marketing',
    'Full Ecosystem Rebrand',
  ];

  const BUDGET_RANGES = ['< $15k', '$15k - $30k', '$30k - $50k', '$50k - $100k', '$100k+'];
  const TIMELINES = ['Urgent (< 1 Mo)', 'Standard (1 - 3 Mo)', 'Flexible (3+ Mo)'];

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.length > 1
          ? prev.filter((s) => s !== service)
          : prev
        : [...prev, service]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#3BD8D9', '#8A46BB', '#FF5D93', '#FFFFFF'],
    });
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-[#030407]/90 backdrop-blur-2xl flex justify-center items-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#090b10] border border-white/15 rounded-3xl p-6 sm:p-10 my-auto shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Ambient Top Lighting Orb */}
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#3BD8D9]/10 rounded-full blur-[150px] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          data-cursor="pointer"
          className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-[#3BD8D9] text-white hover:text-black transition-all duration-300 border border-white/10 z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="relative z-10">
            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#3BD8D9]/30 mb-3 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#3BD8D9]" />
                <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#3BD8D9] font-semibold">
                  Interactive Briefing
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
                Start Your Project Inquiry
              </h2>
              <p className="text-white/60 text-sm font-sans font-light mt-1 max-w-xl">
                Configure your project scope using the interactive tags below. Our senior team will review your parameters and respond within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Section 1: Project Type Spring Chips */}
              <div>
                <label className="text-xs font-mono text-white/60 block mb-3 uppercase tracking-wider font-semibold flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#3BD8D9]" />
                  <span>1. Select Scope / Project Type</span>
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

              {/* Section 2: Budget Range Spring Chips */}
              <div>
                <label className="text-xs font-mono text-white/60 block mb-3 uppercase tracking-wider font-semibold flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#8A46BB]" />
                  <span>2. Estimated Budget Range</span>
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

              {/* Section 3: Timeline Spring Chips */}
              <div>
                <label className="text-xs font-mono text-white/60 block mb-3 uppercase tracking-wider font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#FF5D93]" />
                  <span>3. Expected Timeline</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {TIMELINES.map((t) => (
                    <SpringChip
                      key={t}
                      label={t}
                      selected={selectedTimeline === t}
                      onToggle={() => setSelectedTimeline(t)}
                    />
                  ))}
                </div>
              </div>

              {/* Section 4: Contact & Brief Inputs */}
              <div className="space-y-4 pt-2 border-t border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-white/50 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alexander Vance"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#3BD8D9] focus:bg-white/[0.07] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-white/50 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alexander@brand.com"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#3BD8D9] focus:bg-white/[0.07] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-white/50 block mb-1">Company / Organization</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Vance Global Holdings"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#3BD8D9] focus:bg-white/[0.07] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-white/50 block mb-1">Project Brief / Objectives *</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your vision, target audience, or specific challenges..."
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#3BD8D9] focus:bg-white/[0.07] outline-none transition-all resize-none"
                  />
                </div>
              </div>

              {/* Magnetic Full-Width CTA Button */}
              <div className="pt-2">
                <MagneticCTAButton>
                  <Send className="w-4 h-4 fill-black" />
                  <span>Submit Project Brief</span>
                </MagneticCTAButton>
              </div>
            </form>
          </div>
        ) : (
          /* Submission Feedback Screen */
          <div className="text-center py-14 space-y-6 relative z-10">
            <div className="w-20 h-20 rounded-full bg-[#3BD8D9]/20 border-2 border-[#3BD8D9] flex items-center justify-center text-[#3BD8D9] mx-auto shadow-[0_0_40px_rgba(59,216,217,0.5)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-display text-3xl font-bold text-white uppercase tracking-tight">
              Inquiry Submitted Successfully
            </h3>

            <p className="text-white/70 font-sans text-sm max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-[#3BD8D9] font-bold">{formData.name}</span>. We have received your project brief for <span className="text-[#8A46BB] font-bold">{selectedServices.join(', ')}</span> with a budget of <span className="text-[#FF5D93] font-bold">{selectedBudget}</span>.
            </p>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-9 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-widest transition-colors border border-white/15"
            >
              Return to Site
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
