import React, { useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../data/content';
import type { PortfolioProject } from '../types';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PortfolioProps {
  onSelectProject: (project: PortfolioProject) => void;
}

export const PortfolioHorizontal: React.FC<PortfolioProps> = ({ onSelectProject }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const trigger = triggerRef.current;
      if (!section || !trigger) return;

      const totalWidth = section.scrollWidth - window.innerWidth;

      gsap.to(section, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          scrub: 1,
          end: () => `+=${section.scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="projects" ref={triggerRef} className="relative bg-transparent overflow-hidden">
      {/* Ambient Radial Background Light */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[700px] bg-[#8A46BB]/15 rounded-full blur-[200px] pointer-events-none" />

      {/* Horizontal Pinning Canvas */}
      <div className="min-h-screen flex flex-col justify-center py-20">
        {/* Header Title Bar */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[1px] bg-[#3BD8D9]" />
              <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#3BD8D9]">
                03 / Featured Showcases
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight uppercase">
              Curated <span className="text-[#3BD8D9]">Digital</span> Works
            </h2>
          </div>
          <div className="text-xs font-mono text-white/50 flex items-center gap-2">
            <span>DRAG / SCROLL TO EXPLORE</span>
            <ArrowRight className="w-4 h-4 text-[#3BD8D9] animate-pulse" />
          </div>
        </div>

        {/* Horizontal Track Container */}
        <div
          ref={sectionRef}
          className="flex gap-8 md:gap-12 px-6 md:px-12 w-max items-center"
        >
          {PORTFOLIO_DATA.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              data-cursor="project"
              className="w-[85vw] sm:w-[550px] md:w-[680px] lg:w-[750px] flex-shrink-0 group cursor-pointer"
            >
              {/* Image Container with Hover Zoom */}
              <div className="relative rounded-3xl overflow-hidden glass-card border border-white/10 aspect-[16/10] mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                />

                {/* Gradient Glass Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                {/* Top Badge Info */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
                  <span className="px-4 py-1.5 rounded-full bg-[#050505]/70 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-widest text-[#3BD8D9]">
                    {project.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-mono text-white">
                    {project.year}
                  </span>
                </div>

                {/* Hover Quick Action Disc */}
                <div className="absolute bottom-6 right-6 z-10 w-12 h-12 rounded-full bg-[#3BD8D9] text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-[0_0_20px_#3BD8D9]">
                  <ExternalLink className="w-5 h-5" />
                </div>
              </div>

              {/* Project Meta Information */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-white/40">0{idx + 1}</span>
                  <span className="text-xs uppercase font-mono text-[#3BD8D9]">{project.client}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white group-hover:text-[#3BD8D9] transition-colors flex items-center justify-between">
                  <span>{project.title}</span>
                </h3>
                <p className="text-white/60 font-sans text-sm line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-white/60 border border-white/5">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
