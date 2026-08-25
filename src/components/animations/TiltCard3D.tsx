import React, { useRef } from 'react';
import { gsap } from 'gsap';

export interface TiltCard3DProps {
  children: React.ReactNode;
  maxTilt?: number; // max tilt angle in degrees, default 15
  scaleOnHover?: number; // default 1.05
  glowColor?: string; // e.g. 'rgba(244, 196, 0, 0.4)' or 'rgba(6, 182, 212, 0.4)'
  className?: string;
}

export const TiltCard3D: React.FC<TiltCard3DProps> = ({
  children,
  maxTilt = 15,
  scaleOnHover = 1.05,
  glowColor = 'rgba(244, 196, 0, 0.4)',
  className = '',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      scale: scaleOnHover,
      boxShadow: `0 20px 40px ${glowColor}`,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current || e.touches.length === 0) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      scale: scaleOnHover,
      boxShadow: `0 20px 40px ${glowColor}`,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      className={`will-change-transform transform-gpu perspective-[1000px] cursor-pointer transition-shadow ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};
