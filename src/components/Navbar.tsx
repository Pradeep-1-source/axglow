import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GradientShimmer } from '@/components/ui/gradient-shimmer';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 400);

      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Detect active section
      const sections = ['home', 'about', 'services', 'projects', 'why-us', 'process'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Work', href: '#projects', id: 'projects' },
    { name: 'Why Us', href: '#why-us', id: 'why-us' },
    { name: 'Process', href: '#process', id: 'process' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center ${
          scrolled ? 'py-4' : 'py-7'
        }`}
      >
        <div
          className={`w-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? 'bg-[#0B0B0B]/80 backdrop-blur-xl border border-white/10 rounded-full py-3.5 px-7 shadow-2xl shadow-black/80'
              : 'bg-transparent'
          }`}
        >
          {/* Professional Brand Logo with Refined Glow */}
          <a
            href="#home"
            className="flex items-center gap-3.5 group relative cursor-pointer"
            data-cursor="pointer"
          >
            <div className="relative flex items-center justify-center">
              {/* Soft Ambient Radial Light Flare */}
              <div
                className={`absolute inset-0 bg-[#3BD8D9] rounded-full blur-md transition-all duration-500 pointer-events-none ${
                  isScrolling
                    ? 'opacity-80 scale-125'
                    : 'opacity-30 group-hover:opacity-75 scale-100'
                }`}
              />

              {/* Preserved Metallic Logo Image */}
              <img
                src="/aglowx-logo.png"
                alt="AglowX"
                className={`h-8 md:h-9 w-auto relative z-10 object-contain transition-all duration-300 ${
                  isScrolling
                    ? 'filter drop-shadow-[0_0_18px_rgba(59,216,217,0.9)] scale-105'
                    : 'filter drop-shadow-[0_0_8px_rgba(59,216,217,0.4)] group-hover:scale-105'
                }`}
              />
            </div>

            <GradientShimmer gradient="sunrise" spread={3} duration={1.6} className="font-display text-lg md:text-xl font-bold tracking-wider hidden sm:block">
              AGLOWX
            </GradientShimmer>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-full p-1.5 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  data-cursor="pointer"
                  className={`px-5 py-2 text-xs uppercase tracking-widest font-medium rounded-full transition-all duration-300 relative ${
                    isActive
                      ? 'text-black font-semibold bg-[#3BD8D9] shadow-[0_0_15px_rgba(59,216,217,0.4)]'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Start Project CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onOpenContact}
              data-cursor="pointer"
              className="relative group overflow-hidden rounded-full p-[1px] font-semibold text-xs tracking-widest uppercase"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#3BD8D9] to-[#8A46BB] rounded-full opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="relative px-6 py-2.5 rounded-full bg-[#050505] group-hover:bg-transparent transition-all duration-300 flex items-center gap-2 text-white group-hover:text-black">
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:border-[#3BD8D9] transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#3BD8D9]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-2xl md:hidden flex flex-col justify-between p-8 pt-24"
          >
            <div className="flex flex-col gap-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#3BD8D9] font-mono">Navigation</p>
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-display font-bold text-white hover:text-[#3BD8D9] transition-colors flex items-center justify-between border-b border-white/10 pb-4"
                >
                  <span>{link.name}</span>
                  <span className="text-xs font-mono text-white/40">0{idx + 1}</span>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-4 rounded-full bg-[#3BD8D9] text-black font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,216,217,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                <span>Start a Project</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
