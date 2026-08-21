import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface FooterOverlapPin3DProps {
  pinnedContent: React.ReactNode;
  overlayContent: React.ReactNode;
  pinnedBgColor?: string; // default bg-zinc-950
  overlayBgColor?: string; // default bg-black
  className?: string;
}

export const FooterOverlapPin3D: React.FC<FooterOverlapPin3DProps> = ({
  pinnedContent,
  overlayContent,
  pinnedBgColor = 'bg-zinc-950',
  overlayBgColor = 'bg-black',
  className = '',
}) => {
  const pinnedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pinnedRef.current) return;

    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinnedRef.current,
        start: 'bottom bottom',
        pin: true,
        pinSpacing: false, // Key effect: allows following section to slide over top!
      });
    }, pinnedRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Pinned Section */}
      <div
        ref={pinnedRef}
        className={`relative z-10 w-full min-h-screen ${pinnedBgColor} rounded-t-[40px] border-t border-white/10 flex flex-col items-center justify-center`}
      >
        {pinnedContent}
      </div>

      {/* Overlay Unveiling Section */}
      <div className={`relative z-20 w-full ${overlayBgColor} border-t border-zinc-800`}>
        {overlayContent}
      </div>
    </div>
  );
};
