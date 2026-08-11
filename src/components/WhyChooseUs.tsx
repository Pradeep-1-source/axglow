import React from 'react';
import { WHY_CHOOSE_US_ITEMS } from '../data/content';
import { Crown, Compass, Cpu, Sparkles, Video, TrendingUp, Users, Check } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crown':
        return <Crown className="w-6 h-6 text-[#3BD8D9]" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#8A46BB]" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-[#FF5D93]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#3BD8D9]" />;
      case 'Video':
        return <Video className="w-6 h-6 text-[#8A46BB]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-[#FF5D93]" />;
      case 'Users':
        return <Users className="w-6 h-6 text-[#3BD8D9]" />;
      default:
        return <Check className="w-6 h-6 text-[#3BD8D9]" />;
    }
  };

  return (
    <section id="why-us" className="relative py-32 px-6 md:px-12 bg-transparent overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 -left-[10%] w-[500px] h-[500px] bg-[#3BD8D9]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-[1px] bg-[#3BD8D9]" />
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#3BD8D9]">
            Why Us
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight uppercase">
              Why Ambitious Brands <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3BD8D9] via-white to-[#FF5D93]">
                Choose AglowX
              </span>
            </h2>
          </div>
          <p className="max-w-md text-white/60 font-sans text-sm leading-relaxed font-light">
            We combine high-end aesthetic design with technical precision to deliver memorable experiences that drive real business impact.
          </p>
        </div>

        {/* Glass Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {WHY_CHOOSE_US_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-7 rounded-3xl relative overflow-hidden group hover:-translate-y-1.5 transition-all duration-400 border border-white/10 hover:border-[#3BD8D9]/40 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#3BD8D9]/50 transition-colors">
                  {getIcon(item.iconName)}
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-[#3BD8D9] transition-colors">
                  {item.title}
                </h3>

                <p className="text-white/60 font-sans text-xs leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
