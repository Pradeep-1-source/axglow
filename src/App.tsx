import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CustomCursor } from './components/CustomCursor';
import { NoiseOverlay } from './components/NoiseOverlay';
import { BackgroundLighting } from './components/BackgroundLighting';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { NewHero } from './components/NewHero';
import { AboutEditorial } from './components/AboutEditorial';
import { ServicesFullscreen } from './components/ServicesFullscreen';
import { DigitalWorkFanSection } from './components/DigitalWorkFanSection';
import { ProjectModal } from './components/ProjectModal';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProcessTimeline } from './components/ProcessTimeline';
import { StatisticsCounter } from './components/StatisticsCounter';
import { TestimonialsMarquee } from './components/TestimonialsMarquee';
import { CTASection } from './components/CTASection';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';

import type { PortfolioProject } from './types';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [heroVariant, setHeroVariant] = useState<'new' | 'classic'>('new');

  // Initialize Lenis Smooth Scroll with enhanced inertia & lag smoothing
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative bg-transparent text-white selection:bg-[#3BD8D9] selection:text-black min-h-screen">
      {/* Custom Liquid Mouse Cursor */}
      <CustomCursor />

      {/* Film Grain Noise Texture */}
      <NoiseOverlay />

      {/* Dynamic Background Shader / Lighting Orbs */}
      <BackgroundLighting />

      {/* Transparent -> Floating Glass Navbar */}
      <Navbar onOpenContact={() => setContactOpen(true)} />

      {/* Main Website Sections */}
      <main className="relative z-10">
        {heroVariant === 'new' ? (
          <NewHero
            onOpenContact={() => setContactOpen(true)}
            onSwitchToOriginal={() => setHeroVariant('classic')}
          />
        ) : (
          <Hero onOpenContact={() => setContactOpen(true)} />
        )}
        <AboutEditorial />
        <ServicesFullscreen onOpenContact={() => setContactOpen(true)} />
        <DigitalWorkFanSection onSelectProject={(project) => setSelectedProject(project)} />
        <WhyChooseUs />
        <ProcessTimeline />
        <StatisticsCounter />
        <TestimonialsMarquee />
        <CTASection onOpenContact={() => setContactOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenContact={() => setContactOpen(true)} />

      {/* Case Study Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Luxury Contact Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}

export default App;
