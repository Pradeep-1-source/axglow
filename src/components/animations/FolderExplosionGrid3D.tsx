import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface FolderExplosionGrid3DProps<T> {
  items: T[];
  renderCard: (item: T, index: number) => React.ReactNode;
  folderTitle?: string;
  folderSubtitle?: string;
  folderColor?: string; // e.g. '#f4c400' or Tailwind class
  cardWidth?: number; // e.g. 240
  cardHeight?: number; // e.g. 160
  gap?: number; // e.g. 20
  className?: string;
}

export function FolderExplosionGrid3D<T>({
  items,
  renderCard,
  folderTitle = 'PROJECTS',
  folderSubtitle = 'Folder Vault',
  folderColor = '#f4c400',
  cardWidth = 240,
  cardHeight = 160,
  gap = 24,
  className = '',
}: FolderExplosionGrid3DProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const folderBackRef = useRef<HTMLDivElement>(null);
  const folderFrontRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;

    let ctx = gsap.context(() => {
      // Center folder pieces
      gsap.set([folderBackRef.current, folderFrontRef.current], {
        xPercent: -50,
        yPercent: -50,
      });
      gsap.set(folderFrontRef.current, {
        transformOrigin: 'bottom center',
        transformPerspective: 1000,
      });

      // Calculate grid coordinates (up to 3x3)
      const getGridPos = (index: number) => {
        if (index < 3) return { row: 0, col: index };
        if (index === 3) return { row: 1, col: 0 };
        if (index === 4) return { row: 1, col: 2 };
        return { row: 2, col: index - 5 };
      };

      // Stack cards inside the folder
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          rotation: gsap.utils.random(-6, 6),
          scale: 0.85,
          x: 0,
          y: 0,
        });
      });

      let floatTween: gsap.core.Tween | null = null;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1,
          onEnter: () => { if (floatTween) floatTween.kill(); },
          onEnterBack: () => { if (floatTween) floatTween.kill(); },
          onLeave: () => { if (floatTween) floatTween.kill(); },
          onLeaveBack: () => { if (floatTween) floatTween.kill(); },
        },
        onComplete: () => {
          floatTween = gsap.to(cardsRef.current, {
            y: '+=8',
            rotation: '+=1',
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
            stagger: { amount: 1.2, from: 'random' },
          });
        },
      });

      // 1. Folder flap opens with 3D rotation
      tl.to(folderFrontRef.current, {
        rotationX: -130,
        duration: 1.2,
        ease: 'power3.inOut',
      });

      // 2. Cards rise up from folder
      tl.to(
        cardsRef.current,
        {
          y: -80,
          scale: 0.9,
          zIndex: 70,
          duration: 0.6,
          stagger: 0.04,
          ease: 'back.out(1.2)',
        },
        '-=0.6'
      );

      // 3. Cards explode/fan out into grid positions
      tl.to(
        cardsRef.current,
        {
          x: (i) => {
            const { col } = getGridPos(i);
            return (col - 1) * (cardWidth + gap);
          },
          y: (i) => {
            const { row } = getGridPos(i);
            return (row - 1) * (cardHeight + gap);
          },
          rotation: () => gsap.utils.random(-4, 4),
          scale: 1,
          duration: 1.4,
          stagger: { amount: 0.4, from: 'center' },
          ease: 'expo.out',
        },
        '-=0.2'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [items, cardWidth, cardHeight, gap]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden flex items-center justify-center bg-black/5 dark:bg-black/40 ${className}`}
    >
      {/* Folder Container */}
      <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
        {/* Back Folder Panel */}
        <div
          ref={folderBackRef}
          className="absolute top-1/2 left-1/2 w-[300px] h-[200px] md:w-[400px] md:h-[260px] rounded-2xl shadow-2xl flex flex-col justify-end p-6 z-10"
          style={{ backgroundColor: folderColor }}
        >
          <div className="opacity-40 text-black font-black text-2xl tracking-widest uppercase">
            {folderSubtitle}
          </div>
        </div>

        {/* Stacked Cards */}
        <div className="absolute top-1/2 left-1/2 z-20 pointer-events-auto">
          {items.map((item, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="absolute top-0 left-0 will-change-transform shadow-xl rounded-xl overflow-hidden"
              style={{ width: cardWidth, height: cardHeight }}
            >
              {renderCard(item, index)}
            </div>
          ))}
        </div>

        {/* Front Folder Flap (Rotates in 3D) */}
        <div
          ref={folderFrontRef}
          className="absolute top-1/2 left-1/2 w-[300px] h-[200px] md:w-[400px] md:h-[260px] rounded-2xl shadow-2xl flex items-center justify-center p-6 z-30 border-t-2 border-white/40"
          style={{
            backgroundColor: folderColor,
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          }}
        >
          <h2 className="text-black font-black text-3xl md:text-5xl tracking-tighter uppercase">
            {folderTitle}
          </h2>
        </div>
      </div>
    </div>
  );
}
