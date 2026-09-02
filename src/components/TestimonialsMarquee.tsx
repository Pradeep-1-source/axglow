import React from 'react';
import { TESTIMONIALS_DATA } from '../data/content';
import { Star, Quote } from 'lucide-react';
import { TextScrollAnimation } from './ui/text-scroll-animation';

export const TestimonialsMarquee: React.FC = () => {
  // Duplicate array to achieve seamless infinite loop
  const marqueeItems = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA];

  return (
    <section id="testimonials" className="py-32 bg-transparent relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#8A46BB]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-[1px] bg-[#3BD8D9]" />
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#3BD8D9]">
            06 / Client Endorsements
          </span>
        </div>

        <TextScrollAnimation
          text="Words from Visionary Leaders"
          highlightText="Leaders"
          variant="v1"
          className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight uppercase justify-start"
        />
      </div>

      {/* Infinite Marquee Track */}
      <div className="relative w-full overflow-hidden group">
        {/* Left & Right Gradient Mask Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

        <div className="flex gap-6 w-max animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] px-6">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[350px] sm:w-[420px] glass-card p-8 rounded-3xl border border-white/10 flex-shrink-0 flex flex-col justify-between group/card hover:border-[#3BD8D9]/40 transition-colors"
            >
              <div>
                {/* Header Rating & Quote Icon */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#3BD8D9] text-[#3BD8D9]" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-white/10 group-hover/card:text-[#3BD8D9]/40 transition-colors" />
                </div>

                {/* Quote Text */}
                <p className="text-white/80 font-sans text-sm md:text-base font-light italic leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Client Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <img
                  src={item.avatar}
                  alt={item.clientName}
                  className="w-12 h-12 rounded-full object-cover border border-[#3BD8D9]/40"
                />
                <div>
                  <h4 className="font-display font-bold text-sm text-white">{item.clientName}</h4>
                  <span className="text-xs font-sans text-white/50 block">
                    {item.role}, <span className="text-[#3BD8D9]">{item.company}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tailwind Marquee Keyframe Definition */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
};
