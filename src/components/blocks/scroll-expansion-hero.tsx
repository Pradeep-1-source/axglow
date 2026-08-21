"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

export interface ScrollExpandMediaProps {
  mediaType: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc?: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export default function ScrollExpandMedia({
  mediaType,
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand = "Scroll to expand",
  textBlend = false,
  children,
  className = "",
}: ScrollExpandMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll interpolation transforms for expansion
  const mediaWidth = useTransform(scrollYProgress, [0, 0.55], ["320px", "100%"]);
  const mediaHeight = useTransform(scrollYProgress, [0, 0.55], ["240px", "100vh"]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.45, 0.55], ["24px", "16px", "0px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.7], [0.85, 1, 1]);

  // Title text fade out & move up as video expands
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.25], [0, -40]);

  // Content reveal when fully expanded
  const contentOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.5, 0.7], [50, 0]);

  return (
    <div
      ref={containerRef}
      className={`relative h-[220vh] bg-black text-white ${className}`}
    >
      {/* Background Ambient Layer */}
      {bgImageSrc && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src={bgImageSrc}
            alt="Background Ambient"
            className="w-full h-full object-cover opacity-25 filter blur-md transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />
        </div>
      )}

      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center z-10">
        {/* Hero Overlay Text */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className={`absolute top-20 sm:top-28 text-center z-30 px-6 max-w-3xl pointer-events-none ${
            textBlend ? "mix-blend-difference" : ""
          }`}
        >
          {date && (
            <span className="inline-block px-4 py-1 mb-3 text-xs font-mono tracking-widest uppercase rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#3BD8D9]">
              {date}
            </span>
          )}
          {title && (
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase leading-none text-white drop-shadow-2xl">
              {title}
            </h1>
          )}
          {scrollToExpand && (
            <div className="mt-6 flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-[#3BD8D9]">
              <span>{scrollToExpand}</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </div>
          )}
        </motion.div>

        {/* Expanding Media Box */}
        <motion.div
          style={{
            width: mediaWidth,
            height: mediaHeight,
            borderRadius: borderRadius,
            opacity: opacity,
          }}
          className="relative overflow-hidden shadow-2xl z-10 border border-white/15 flex items-center justify-center bg-zinc-950 transition-all duration-75"
        >
          {mediaType === "video" ? (
            <video
              src={mediaSrc}
              poster={posterSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={mediaSrc}
              alt={title || "Expanded Media"}
              className="w-full h-full object-cover"
            />
          )}

          {/* Soft Gradient Overlay inside media */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />
        </motion.div>
      </div>

      {/* Children / Section Content after expansion */}
      {children && (
        <div className="relative z-20 max-w-6xl mx-auto px-6 py-24">
          <motion.div style={{ opacity: contentOpacity, y: contentY }}>
            {children}
          </motion.div>
        </div>
      )}
    </div>
  );
}
