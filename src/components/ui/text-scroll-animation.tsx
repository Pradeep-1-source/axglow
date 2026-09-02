"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
  highlightColor?: string;
  isHighlight?: boolean;
};

const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
  highlightColor = "text-[#3BD8D9]",
  isHighlight = false,
}: CharacterProps) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.7], [distanceFromCenter * 35, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.7], [distanceFromCenter * 30, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.1, 1]);

  return (
    <motion.span
      className={cn(
        "inline-block will-change-transform",
        isHighlight ? highlightColor : ""
      )}
      style={{ x, rotateX, opacity }}
    >
      {char}
    </motion.span>
  );
};

const CharacterV2 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
  highlightColor = "text-[#3BD8D9]",
  isHighlight = false,
}: CharacterProps) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.7], [distanceFromCenter * 40, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.7], [0.7, 1]);
  const y = useTransform(scrollYProgress, [0, 0.7], [Math.abs(distanceFromCenter) * 20, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.1, 1]);

  return (
    <motion.span
      className={cn(
        "inline-block will-change-transform origin-center",
        isHighlight ? highlightColor : ""
      )}
      style={{ x, scale, y, opacity }}
    >
      {char}
    </motion.span>
  );
};

const CharacterV3 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
  highlightColor = "text-[#3BD8D9]",
  isHighlight = false,
}: CharacterProps) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.7], [distanceFromCenter * 50, 0]);
  const rotate = useTransform(scrollYProgress, [0, 0.7], [distanceFromCenter * 35, 0]);
  const y = useTransform(scrollYProgress, [0, 0.7], [-Math.abs(distanceFromCenter) * 15, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.7], [0.75, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.1, 1]);

  return (
    <motion.span
      className={cn(
        "inline-block will-change-transform origin-center",
        isHighlight ? highlightColor : ""
      )}
      style={{ x, rotate, y, scale, opacity }}
    >
      {char}
    </motion.span>
  );
};

export interface TextScrollAnimationProps {
  text: string;
  highlightText?: string;
  highlightColor?: string;
  className?: string;
  variant?: "v1" | "v2" | "v3";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

/**
 * Reusable Scroll Text Animation Component
 * Applies 3D character scroll animation to any title across the website.
 */
export const TextScrollAnimation = ({
  text,
  highlightText,
  highlightColor = "text-[#3BD8D9]",
  className,
  variant = "v1",
  as: Component = "h2",
}: TextScrollAnimationProps) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.95", "start 0.35"],
  });

  const words = text.split(" ");
  const totalChars = text.length;
  const centerIndex = Math.floor(totalChars / 2);

  let globalCharIndex = 0;

  const renderCharacter = (char: string, index: number, isHighlight: boolean) => {
    const props: CharacterProps = {
      char,
      index,
      centerIndex,
      scrollYProgress,
      highlightColor,
      isHighlight,
    };

    if (variant === "v2") return <CharacterV2 key={index} {...props} />;
    if (variant === "v3") return <CharacterV3 key={index} {...props} />;
    return <CharacterV1 key={index} {...props} />;
  };

  return (
    <Component
      ref={targetRef as any}
      className={cn("inline-flex flex-wrap items-center justify-center gap-x-[0.25em]", className)}
      style={{ perspective: "600px" }}
    >
      {words.map((word, wordIdx) => {
        const isHighlightWord = highlightText
          ? word.toLowerCase().includes(highlightText.toLowerCase())
          : false;

        return (
          <span key={wordIdx} className="inline-block whitespace-nowrap">
            {word.split("").map((char) => {
              const currentIndex = globalCharIndex++;
              return renderCharacter(char, currentIndex, isHighlightWord);
            })}
          </span>
        );
      })}
    </Component>
  );
};

export { CharacterV1, CharacterV2, CharacterV3 };
