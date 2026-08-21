import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollZoomHero3DProps {
  sourceElementSelector: string; // CSS selector of element to zoom/fly, e.g. '#hero-image'
  desktopScale?: number; // default 3.8
  mobileScale?: number; // default 2.8
  children: React.ReactNode;
  className?: string;
}

export const ScrollZoomHero3D: React.FC<ScrollZoomHero3DProps> = ({
  sourceElementSelector,
  desktopScale = 3.8,
  mobileScale = 2.8,
  children,
  className = '',
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    let ctx = gsap.context(() => {
      const targetElement = document.querySelector(sourceElementSelector);

      if (targetElement) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'top top',
            scrub: 1,
          },
        });

        tl.to(
          targetElement,
          {
            y: () => {
              const rect = targetElement.getBoundingClientRect();
              const originalTopY = rect.top + window.scrollY;
              const welcomeRect = sectionRef.current!.getBoundingClientRect();
              const welcomeTopY = welcomeRect.top + window.scrollY;
              const targetTopY = welcomeTopY - window.innerHeight * 0.08;
              return targetTopY - originalTopY;
            },
            scale: () => (window.innerWidth < 1024 ? mobileScale : desktopScale),
            transformOrigin: 'top center',
            x: () => {
              const rect = targetElement.getBoundingClientRect();
              const originalCenterX = rect.left + window.scrollX + rect.width / 2;
              const targetCenterX = window.innerWidth / 2;
              return targetCenterX - originalCenterX;
            },
            ease: 'power2.inOut',
          },
          0
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [sourceElementSelector, desktopScale, mobileScale]);

  return (
    <div
      ref={sectionRef}
      className={`relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
};
