import React from 'react';
import { Sparkles, ArrowUpRight, Globe, Mail, Phone } from 'lucide-react';

interface CTAProps {
  onOpenContact: () => void;
}

export const CTASection: React.FC<CTAProps> = ({ onOpenContact }) => {
  return (
    <section className="relative py-36 px-6 md:px-12 bg-transparent overflow-hidden">
      {/* Background Radial Light Swirls */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-to-r from-[#3BD8D9]/20 via-[#8A46BB]/20 to-[#FF5D93]/20 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Subtitle Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.04] border border-[#3BD8D9]/30 mb-8 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-[#3BD8D9]" />
          <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#3BD8D9]">
            Ready to Ascend?
          </span>
        </div>

        {/* Huge Headline */}
        <h2 className="font-display text-4xl sm:text-6xl md:text-8xl font-black text-white uppercase tracking-tight leading-[0.95] mb-10">
          Let's Build Something <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3BD8D9] via-white to-[#FF5D93] drop-shadow-[0_0_40px_rgba(59,216,217,0.4)]">
            Extraordinary.
          </span>
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-xl text-white/70 font-sans font-light leading-relaxed mb-12">
          Partner with AglowX to redefine your brand, captivate global audiences, and set new visual benchmarks in your industry.
        </p>

        {/* Massive Glowing Magnetic Button */}
        <div className="flex justify-center mb-16">
          <button
            onClick={onOpenContact}
            data-cursor="pointer"
            className="group relative px-12 py-6 rounded-full font-sans font-extrabold text-sm uppercase tracking-[0.25em] overflow-hidden shadow-[0_0_50px_rgba(59,216,217,0.5)] transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#3BD8D9] via-[#8A46BB] to-[#FF5D93] animate-pulse-glow" />
            <div className="relative z-10 flex items-center gap-4 text-black">
              <span>Start Your Project</span>
              <ArrowUpRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </button>
        </div>

        {/* Direct Contact Links */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-white/60 pt-8 border-t border-white/10">
          <a href="mailto:hello@aglowx.design" className="flex items-center gap-2 hover:text-[#3BD8D9] transition-colors">
            <Mail className="w-4 h-4 text-[#3BD8D9]" />
            <span>hello@aglowx.design</span>
          </a>
          <a href="tel:+60123456789" className="flex items-center gap-2 hover:text-[#3BD8D9] transition-colors">
            <Phone className="w-4 h-4 text-[#8A46BB]" />
            <span>+60 (12) 345-6789</span>
          </a>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#FF5D93]" />
            <span>Kuala Lumpur, Malaysia</span>
          </div>
        </div>
      </div>
    </section>
  );
};
