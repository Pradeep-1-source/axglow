import React from 'react';

export interface MarqueeScroll3DProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  speedSeconds?: number; // default 25
  reverse?: boolean; // default false
  pauseOnHover?: boolean; // default true
  className?: string;
}

export function MarqueeScroll3D<T>({
  items,
  renderItem,
  speedSeconds = 25,
  reverse = false,
  pauseOnHover = true,
  className = '',
}: MarqueeScroll3DProps<T>) {
  // Duplicate items array to ensure seamless infinite looping
  const duplicatedItems = [...items, ...items];

  return (
    <div className={`relative w-full overflow-hidden py-4 ${className}`}>
      <style>{`
        @keyframes marqueeScrollAnimation {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeScrollAnimation ${speedSeconds}s linear infinite;
          animation-direction: ${reverse ? 'reverse' : 'normal'};
        }
        .animate-marquee-track:hover {
          ${pauseOnHover ? 'animation-play-state: paused;' : ''}
        }
      `}</style>

      <div className="animate-marquee-track gap-6">
        {duplicatedItems.map((item, idx) => (
          <div
            key={idx}
            className="shrink-0 transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-[0_16px_40px_rgba(244,196,0,0.3)] rounded-2xl"
          >
            {renderItem(item, idx % items.length)}
          </div>
        ))}
      </div>
    </div>
  );
}
