import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });

  const [cursorText, setCursorText] = useState('');
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'project' | 'drag'>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const updatePosition = (clientX: number, clientY: number) => {
      mousePos.current = { x: clientX, y: clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%) scale(${cursorState === 'hover' ? 0.4 : 1})`;
      }

      const target = document.elementFromPoint(clientX, clientY) as HTMLElement | null;
      if (!target) return;

      const projectCard = target.closest('[data-cursor="project"]');
      const interactiveBtn = target.closest('button, a, [data-cursor="pointer"]');
      const dragArea = target.closest('[data-cursor="drag"]');

      if (projectCard) {
        setCursorState('project');
        setCursorText('VIEW PROJECT');
      } else if (dragArea) {
        setCursorState('drag');
        setCursorText('SWIPE');
      } else if (interactiveBtn) {
        setCursorState('hover');
        setCursorText('');
      } else {
        setCursorState('default');
        setCursorText('');
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      updatePosition(e.clientX, e.clientY);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setIsVisible(true);
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setIsVisible(true);
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchEnd = () => {
      // Keep cursor visible briefly after touch release
      setTimeout(() => {
        setIsVisible(false);
      }, 1500);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [cursorState]);

  // Smooth easing animation loop using direct DOM transform
  useEffect(() => {
    if (!isVisible) return;
    let animationFrameId: number;

    const loop = () => {
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.18;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.18;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Primary Dot Cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 bg-[#3BD8D9] rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`,
        }}
      />

      {/* Outer Eased Ring with Contextual Label */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out flex items-center justify-center font-medium text-[10px] tracking-widest text-black shadow-[0_0_25px_rgba(59,216,217,0.5)] ${
          cursorState === 'project'
            ? 'w-28 h-28 bg-[#3BD8D9] backdrop-blur-md opacity-95 text-black border-2 border-white font-bold'
            : cursorState === 'drag'
            ? 'w-20 h-20 bg-[#8A46BB]/90 text-white border border-[#3BD8D9]'
            : cursorState === 'hover'
            ? 'w-14 h-14 bg-[#3BD8D9]/20 border border-[#3BD8D9]/60 backdrop-blur-sm'
            : 'w-10 h-10 border border-white/20 bg-transparent'
        }`}
        style={{
          transform: `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        {cursorText && (
          <span className="animate-fade-in text-center px-1 font-sans uppercase font-bold tracking-wider">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
};
