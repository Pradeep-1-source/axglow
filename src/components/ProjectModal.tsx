import React from 'react';
import type { PortfolioProject } from '../types';
import { X, CheckCircle, Sparkles } from 'lucide-react';

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenContact }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-[#050505]/90 backdrop-blur-2xl overflow-y-auto flex justify-center p-4 sm:p-6 md:p-12 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#0B0B0B] border border-white/15 rounded-3xl p-6 sm:p-10 md:p-14 my-auto shadow-[0_0_80px_rgba(59,216,217,0.2)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          data-cursor="pointer"
          className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-[#3BD8D9] text-white hover:text-black transition-all duration-300 border border-white/10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header Metadata */}
        <div className="flex items-center gap-3 mb-6">
          <span className="px-4 py-1.5 rounded-full bg-[#3BD8D9]/20 text-[#3BD8D9] text-xs font-mono uppercase tracking-widest border border-[#3BD8D9]/40">
            {project.category}
          </span>
          <span className="text-xs font-mono text-white/40">{project.year}</span>
        </div>

        {/* Title */}
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white mb-6 uppercase tracking-tight">
          {project.title}
        </h2>

        {/* Hero Visual */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-10 border border-white/10">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Case Study Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Left Challenge & Solution */}
          <div className="md:col-span-8 space-y-8">
            <div>
              <h3 className="text-xs uppercase font-mono tracking-widest text-[#3BD8D9] mb-3">01. The Challenge</h3>
              <p className="text-white/80 font-sans font-light text-base leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div>
              <h3 className="text-xs uppercase font-mono tracking-widest text-[#8A46BB] mb-3">02. Creative & Technical Solution</h3>
              <p className="text-white/80 font-sans font-light text-base leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Right Impact Metrics */}
          <div className="md:col-span-4 glass-panel p-6 rounded-2xl border border-white/10 h-fit space-y-4">
            <h3 className="text-xs uppercase font-mono tracking-widest text-[#FF5D93]">Measured Results</h3>
            {project.results.map((res, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-white font-medium border-b border-white/10 pb-3 last:border-0">
                <CheckCircle className="w-5 h-5 text-[#3BD8D9] shrink-0 mt-0.5" />
                <span>{res}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary Showcase Gallery */}
        {project.secondaryImages && project.secondaryImages.length > 0 && (
          <div className="space-y-6 mb-12">
            <h3 className="text-xs uppercase font-mono tracking-widest text-white/50">Visual Showcase Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.secondaryImages.map((img, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-white/10 aspect-[4/3]">
                  <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8">
          <div>
            <span className="text-xs font-mono text-white/50 block">Inspired by this project?</span>
            <span className="text-base font-bold text-white">Let's create a custom result for your brand.</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#3BD8D9] to-[#8A46BB] text-black font-bold uppercase tracking-wider text-xs flex items-center gap-2 shadow-[0_0_30px_rgba(59,216,217,0.4)]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Inquire Similar Experience</span>
          </button>
        </div>
      </div>
    </div>
  );
};
