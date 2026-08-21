import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import { GradientShimmer } from '@/components/ui/gradient-shimmer';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#05181a]/90 backdrop-blur-md text-white border-t border-white/10 py-16 overflow-hidden">
      {/* Subtle Cyan Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-[#3BD8D9]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          {/* Left Column: Brand & Tagline */}
          <div className="lg:col-span-5 space-y-6">
            <a href="#home" className="inline-flex items-center gap-4 group">
              <img
                src="/aglowx-logo.png"
                alt="AglowX Footer Logo"
                className="h-12 w-auto object-contain filter drop-shadow-[0_0_20px_rgba(59,216,217,0.8)]"
              />
              <GradientShimmer gradient="sunrise" spread={4} duration={1.8} className="font-display text-3xl font-bold tracking-wider">
                AGLOWX
              </GradientShimmer>
            </a>

            <p className="text-white/60 font-sans text-sm leading-relaxed max-w-sm">
              Where Brands Rise in Brilliance. A boutique creative agency crafting high-end digital identity systems, web applications, and visual stories.
            </p>

            <div className="flex items-center gap-3 text-xs font-mono text-[#3BD8D9]">
              <span className="w-2 h-2 rounded-full bg-[#3BD8D9] animate-ping" />
              <span>HQ: Kuala Lumpur, Malaysia • Global Execution</span>
            </div>

            <div>
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3BD8D9]/10 hover:bg-[#3BD8D9] text-[#3BD8D9] hover:text-black font-mono font-bold text-xs uppercase tracking-widest border border-[#3BD8D9]/40 transition-all duration-300"
              >
                <Sparkles className="w-4 h-4" />
                <span>Initiate Contact</span>
              </button>
            </div>
          </div>

          {/* Middle Column: Quick Links */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs uppercase font-mono tracking-widest text-white/40 mb-4">Navigation</h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li><a href="#home" className="hover:text-[#3BD8D9] transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-[#3BD8D9] transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-[#3BD8D9] transition-colors">Services</a></li>
                <li><a href="#projects" className="hover:text-[#3BD8D9] transition-colors">Portfolio</a></li>
                <li><a href="#process" className="hover:text-[#3BD8D9] transition-colors">Process</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase font-mono tracking-widest text-white/40 mb-4">Capabilities</h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li><a href="#services" className="hover:text-[#3BD8D9] transition-colors">Brand Identity</a></li>
                <li><a href="#services" className="hover:text-[#3BD8D9] transition-colors">Website Design</a></li>
                <li><a href="#services" className="hover:text-[#3BD8D9] transition-colors">UI/UX Design</a></li>
                <li><a href="#services" className="hover:text-[#3BD8D9] transition-colors">Video Production</a></li>
                <li><a href="#services" className="hover:text-[#3BD8D9] transition-colors">Digital Marketing</a></li>
              </ul>
            </div>
          </div>

          {/* Right Column: Socials & Back to top */}
          <div className="lg:col-span-3 flex flex-col justify-between items-start lg:items-end">
            <div>
              <h4 className="text-xs uppercase font-mono tracking-widest text-white/40 mb-4">Social Network</h4>
              <div className="flex flex-wrap gap-3">
                {['Instagram', 'Twitter', 'LinkedIn', 'Dribbble'].map((name) => (
                  <a
                    key={name}
                    href="#"
                    data-cursor="pointer"
                    className="px-4 py-2 rounded-full bg-white/5 hover:bg-[#3BD8D9] text-white hover:text-black border border-white/10 text-xs font-mono transition-all duration-300"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>

            <button
              onClick={scrollToTop}
              data-cursor="pointer"
              className="mt-8 lg:mt-0 flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-white/60 hover:text-[#3BD8D9] transition-colors group"
            >
              <span>Back to Top</span>
              <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-[#3BD8D9] group-hover:-translate-y-1 transition-all">
                <ArrowUp className="w-4 h-4 text-[#3BD8D9]" />
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/40 gap-4">
          <p>© {new Date().getFullYear()} AglowX Creative Agency. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Malaysia HQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

