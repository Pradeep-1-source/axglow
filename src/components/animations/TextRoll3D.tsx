import React from 'react';

export interface TextRoll3DProps {
  words: string[];
  height?: string; // e.g. '10.2vw' or '5rem'
  strokeColor?: string; // e.g. 'black' or 'white'
  duration?: number; // seconds, default 8
  className?: string;
}

export const TextRoll3D: React.FC<TextRoll3DProps> = ({
  words,
  height = '5rem',
  strokeColor = 'black',
  duration = 8,
  className = '',
}) => {
  // Ensure the list loops seamlessly back to the first item
  const displayWords = words.length > 0 ? [...words, words[0]] : words;

  return (
    <div className={`overflow-hidden relative leading-[0.85] ${className}`} style={{ height }}>
      <style>{`
        @keyframes textRollAnimation {
          0%, 20% { transform: translateY(0%); }
          25%, 45% { transform: translateY(-20%); }
          50%, 70% { transform: translateY(-40%); }
          75%, 95% { transform: translateY(-60%); }
          100% { transform: translateY(-80%); }
        }
        .animate-text-roll-custom {
          animation: textRollAnimation ${duration}s cubic-bezier(0.25, 1, 0.5, 1) infinite;
        }
      `}</style>

      <div className="animate-text-roll-custom flex flex-col">
        {displayWords.map((word, idx) => (
          <h1
            key={idx}
            className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter text-transparent m-0 p-0 pb-1 leading-[0.85]"
            style={{ WebkitTextStroke: `2px ${strokeColor}` }}
          >
            {word}
          </h1>
        ))}
      </div>
    </div>
  );
};
