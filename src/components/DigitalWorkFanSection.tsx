import React from 'react';
import SocialCards, { type CardItem } from './ui/card-fan-carousel';
import { Layers } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/content';
import type { PortfolioProject } from '../types';

interface DigitalWorkFanSectionProps {
  onSelectProject?: (project: PortfolioProject) => void;
}

export const DigitalWorkFanSection: React.FC<DigitalWorkFanSectionProps> = ({ onSelectProject }) => {
  const cards: CardItem[] = PORTFOLIO_DATA.map((p) => ({
    imgUrl: p.image,
    alt: p.title,
  }));

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 md:px-12 bg-transparent overflow-hidden border-t border-b border-white/10">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#3BD8D9]/10 rounded-full blur-[220px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#3BD8D9]/30 mb-4 backdrop-blur-xl">
          <Layers className="w-3.5 h-3.5 text-[#3BD8D9]" />
          <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#3BD8D9]">
            DIGITAL WORK SESSIONS & GALLERY
          </span>
        </div>

        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight uppercase leading-tight">
          Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3BD8D9] via-[#8A46BB] to-[#FF5D93]">Digital Works</span>
        </h2>

        <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-white/70 font-light leading-relaxed">
          Explore interactive work sessions. Hover over cards to expand visual details or click navigation to cycle through our portfolio.
        </p>
      </div>

      {/* 3D Fan Deck Carousel */}
      <div
        className="relative z-20"
        onClick={() => {
          if (onSelectProject && PORTFOLIO_DATA.length > 0) {
            onSelectProject(PORTFOLIO_DATA[0]);
          }
        }}
      >
        <SocialCards cards={cards} />
      </div>
    </section>
  );
};

export default DigitalWorkFanSection;
