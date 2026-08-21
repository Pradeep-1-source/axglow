import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface Wheel3DCarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number, activeIndex?: number) => React.ReactNode;
  height?: string; // e.g. '100vh' or '800px'
  scrollDistance?: string; // e.g. '+=400%'
  desktopRadius?: number; // default 1800
  mobileRadius?: number; // default 680
  desktopAngleSpread?: number; // default 18
  mobileAngleSpread?: number; // default 22
  onActiveIndexChange?: (index: number) => void;
  className?: string;
}

export function Wheel3DCarousel<T>({
  items,
  renderItem,
  height = '100vh',
  scrollDistance = '+=400%',
  desktopRadius = 1800,
  mobileRadius = 680,
  desktopAngleSpread = 18,
  mobileAngleSpread = 22,
  onActiveIndexChange,
  className = '',
}: Wheel3DCarouselProps<T>) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!sectionRef.current || items.length === 0) return;

    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 769px)',
          isMobile: '(max-width: 768px)',
        },
        (context) => {
          const isDesktop = context.conditions?.isDesktop ?? true;
          const radius = isDesktop ? desktopRadius : mobileRadius;
          const angleSpread = isDesktop ? desktopAngleSpread : mobileAngleSpread;

          const updateCards = (p: number) => {
            cardsRef.current.forEach((card, i) => {
              if (!card) return;
              const offset = i - p;
              const angle = offset * angleSpread;
              const rad = (angle * Math.PI) / 180;
              const x = Math.sin(rad) * radius;
              const y = radius - Math.cos(rad) * radius;
              const z = -Math.abs(offset) * 50;
              const scale = Math.max(0.4, 1 - Math.abs(offset) * 0.15);
              const opacity = Math.max(0.1, 1 - Math.abs(offset) * 0.3);
              const zIndex = Math.round(100 - Math.abs(offset) * 10);

              gsap.set(card, {
                x,
                y,
                z,
                scale,
                rotationZ: angle,
                rotationY: 0,
                opacity,
                zIndex,
                transformPerspective: 1000,
              });
            });

            if (onActiveIndexChange) {
              onActiveIndexChange(Math.round(p));
            }
          };

          updateCards(0);

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: scrollDistance,
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
              updateCards(self.progress * (items.length - 1));
            },
          });
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [items, desktopRadius, mobileRadius, desktopAngleSpread, mobileAngleSpread, scrollDistance, onActiveIndexChange]);

  return (
    <div
      ref={sectionRef}
      className={`relative w-full overflow-hidden flex items-center justify-center ${className}`}
      style={{ height }}
    >
      <div className="relative w-full h-full flex items-center justify-center perspective-[1200px] pointer-events-none">
        {items.map((item, index) => (
          <div
            key={index}
            ref={(el) => { cardsRef.current[index] = el; }}
            className="absolute will-change-transform pointer-events-auto"
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}
