import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ParallaxFloat3DProps {
  children: React.ReactNode;
  yOffset?: number; // pixel parallax move on scroll, e.g. 100 or -50
  fadeOnScroll?: boolean; // default false
  scrubSpeed?: number; // default 1.2
  className?: string;
}

export const ParallaxFloat3D: React.FC<ParallaxFloat3DProps> = ({
  children,
  yOffset = 80,
  fadeOnScroll = false,
  scrubSpeed = 1.2,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        y: yOffset,
        opacity: fadeOnScroll ? 0 : 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: scrubSpeed,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [yOffset, fadeOnScroll, scrubSpeed]);

  return (
    <div ref={containerRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
};
