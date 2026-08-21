"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
    src: string;
    index: number;
    total: number;
    phase: AnimationPhase;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
    isMobile: boolean;
}

// --- FlipCard Component ---
function FlipCard({
    src,
    index,
    target,
    isMobile,
}: FlipCardProps) {
    // Dynamic dimensions based on mobile / desktop
    const imgWidth = isMobile ? 48 : 64;
    const imgHeight = isMobile ? 68 : 90;

    return (
        <motion.div
            // Smoothly animate to the coordinates defined by the parent
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{
                type: "spring",
                stiffness: 45,
                damping: 16,
            }}

            // Initial style
            style={{
                position: "absolute",
                width: imgWidth,
                height: imgHeight,
                transformStyle: "preserve-3d", // Essential for the 3D hover effect
                perspective: "1000px",
            }}
            className="cursor-pointer group"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180 }}
                whileTap={{ rotateY: 180 }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-lg sm:rounded-xl bg-[#091b1d] border border-white/20 group-hover:border-[#3BD8D9]/70 transition-colors"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <img
                        src={src}
                        alt={`hero-${index}`}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-0 transition-opacity" />
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-lg sm:rounded-xl bg-[#061f21] flex flex-col items-center justify-center p-1.5 border border-[#3BD8D9]/50 backdrop-blur-md"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="text-center">
                        <p className="text-[7px] sm:text-[8px] font-bold text-[#3BD8D9] uppercase tracking-widest mb-0.5">View</p>
                        <p className="text-[10px] sm:text-[11px] font-bold text-white tracking-wide">Details</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Main Hero Component ---
const TOTAL_IMAGES = 20;
const MAX_SCROLL = 2400; // Virtual scroll range

// Unsplash Images
const IMAGES = [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&q=80",
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=300&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&q=80",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&q=80",
    "https://images.unsplash.com/photo-1506765515384-028b60a970df?w=300&q=80",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&q=80",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&q=80",
    "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?w=300&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&q=80",
    "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=300&q=80",
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&q=80",
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=300&q=80",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=300&q=80",
    "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=300&q=80",
    "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=300&q=80",
    "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=300&q=80",
    "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=300&q=80",
    "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=300&q=80",
];

// Helper for linear interpolation
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function IntroAnimation() {
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // --- Container Size ---
    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        };

        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);

        // Initial set
        setContainerSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
        });

        return () => observer.disconnect();
    }, []);

    const isMobile = containerSize.width > 0 && containerSize.width < 640;

    // --- Virtual Scroll Logic ---
    const virtualScroll = useMotionValue(0);
    const scrollRef = useRef(0); // Keep track of scroll value without re-renders

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            const current = scrollRef.current;
            const deltaY = e.deltaY;
            const newScroll = Math.min(Math.max(current + deltaY, 0), MAX_SCROLL);

            // Allow standard page scrolling when at the top or bottom boundaries
            if ((deltaY < 0 && current <= 0) || (deltaY > 0 && current >= MAX_SCROLL)) {
                return;
            }

            e.preventDefault();
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        // Touch support with boundary release
        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };
        const handleTouchMove = (e: TouchEvent) => {
            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;
            touchStartY = touchY;

            const current = scrollRef.current;
            const newScroll = Math.min(Math.max(current + deltaY, 0), MAX_SCROLL);

            // Release touch to page scroll if at animation bounds
            if ((deltaY < 0 && current <= 0) || (deltaY > 0 && current >= MAX_SCROLL)) {
                return;
            }

            if (e.cancelable) {
                e.preventDefault();
            }
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        // Attach listeners to container
        container.addEventListener("wheel", handleWheel, { passive: false });
        container.addEventListener("touchstart", handleTouchStart, { passive: true });
        container.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            container.removeEventListener("wheel", handleWheel);
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, [virtualScroll]);

    // 1. Morph Progress: 0 (Circle) -> 1 (Bottom Arc)
    const morphProgress = useTransform(virtualScroll, [0, 500], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 45, damping: 20 });

    // 2. Scroll Rotation (Shuffling): Starts after morph
    const scrollRotate = useTransform(virtualScroll, [500, MAX_SCROLL], [0, 360]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 45, damping: 20 });

    // --- Mouse Parallax ---
    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;
            const normalizedX = (relativeX / rect.width) * 2 - 1;
            mouseX.set(normalizedX * (isMobile ? 40 : 100));
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, isMobile]);

    // --- Intro Sequence ---
    useEffect(() => {
        const timer1 = setTimeout(() => setIntroPhase("line"), 400);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 2200);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    // --- Random Scatter Positions ---
    const scatterPositions = useMemo(() => {
        const boundX = containerSize.width ? containerSize.width * 0.8 : 800;
        const boundY = containerSize.height ? containerSize.height * 0.8 : 600;
        return IMAGES.map(() => ({
            x: (Math.random() - 0.5) * boundX,
            y: (Math.random() - 0.5) * boundY,
            rotation: (Math.random() - 0.5) * 180,
            scale: isMobile ? 0.5 : 0.6,
            opacity: 0,
        }));
    }, [containerSize.width, containerSize.height, isMobile]);

    // --- Render Loop ---
    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
        const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
        const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
        return () => {
            unsubscribeMorph();
            unsubscribeRotate();
            unsubscribeParallax();
        };
    }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

    // --- Content Opacity ---
    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
    const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

    return (
        <div ref={containerRef} className="relative w-full h-full bg-transparent overflow-hidden select-none">
            {/* Background Soft Glow Spots */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#3BD8D9]/10 rounded-full blur-[140px] pointer-events-none" />

            {/* Container */}
            <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">

                {/* Intro Text (Fades out) */}
                <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2 px-4 w-full">
                    <motion.h1
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 1 }}
                        className="font-display text-lg sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase"
                    >
                        THE FUTURE IS BUILT ON <span className="text-[#3BD8D9]">AI</span>.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 0.5 - morphValue } : { opacity: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mt-3 text-[10px] sm:text-xs font-mono font-bold tracking-[0.3em] text-[#3BD8D9]"
                    >
                        SCROLL TO EXPLORE
                    </motion.p>
                </div>

                {/* Arc Active Content (Fades in) */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute top-[4%] sm:top-[8%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4 w-full max-w-2xl"
                >
                    <h2 className="font-display text-xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white uppercase mb-2 sm:mb-3">
                        Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3BD8D9] via-white to-[#FF5D93]">Vision</span>
                    </h2>
                    <p className="font-sans text-[11px] sm:text-sm md:text-base text-white/70 leading-relaxed max-w-xs sm:max-w-xl">
                        Discover a world where technology meets creativity. <br className="hidden sm:block" />
                        Scroll through our curated collection of innovations designed to shape the future.
                    </p>
                </motion.div>

                {/* Main Cards Container */}
                <div className="relative flex items-center justify-center w-full h-full">
                    {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => {
                        let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                        if (introPhase === "scatter") {
                            target = scatterPositions[i] || { x: 0, y: 0, rotation: 0, scale: 0.6, opacity: 0 };
                        } else if (introPhase === "line") {
                            const lineSpacing = isMobile ? 42 : 72;
                            const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
                            const lineX = i * lineSpacing - lineTotalWidth / 2;
                            target = { x: lineX, y: 0, rotation: 0, scale: isMobile ? 0.85 : 1, opacity: 1 };
                        } else {
                            const minDimension = Math.min(containerSize.width || 360, containerSize.height || 600);

                            // Circle Position
                            const circleRadius = isMobile
                                ? Math.min(minDimension * 0.32, 130)
                                : Math.min(minDimension * 0.35, 340);

                            const circleAngle = (i / TOTAL_IMAGES) * 360;
                            const circleRad = (circleAngle * Math.PI) / 180;
                            const circlePos = {
                                x: Math.cos(circleRad) * circleRadius,
                                y: Math.sin(circleRad) * circleRadius,
                                rotation: circleAngle + 90,
                            };

                            // Bottom Arc Position
                            const baseRadius = Math.min(containerSize.width || 360, (containerSize.height || 600) * 1.5);
                            const arcRadius = baseRadius * (isMobile ? 1.25 : 1.1);

                            const arcApexY = (containerSize.height || 600) * (isMobile ? 0.38 : 0.25);
                            const arcCenterY = arcApexY + arcRadius;

                            const spreadAngle = isMobile ? 120 : 130;
                            const startAngle = -90 - (spreadAngle / 2);
                            const step = spreadAngle / (TOTAL_IMAGES - 1);

                            const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                            const maxRotation = spreadAngle * 0.8;
                            const boundedRotation = -scrollProgress * maxRotation;

                            const currentArcAngle = startAngle + (i * step) + boundedRotation;
                            const arcRad = (currentArcAngle * Math.PI) / 180;

                            const arcPos = {
                                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                                rotation: currentArcAngle + 90,
                                scale: isMobile ? 1.15 : 1.8,
                            };

                            // Interpolate (Morph)
                            target = {
                                x: lerp(circlePos.x, arcPos.x, morphValue),
                                y: lerp(circlePos.y, arcPos.y, morphValue),
                                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                                scale: lerp(1, arcPos.scale, morphValue),
                                opacity: 1,
                            };
                        }

                        return (
                            <FlipCard
                                key={i}
                                src={src}
                                index={i}
                                total={TOTAL_IMAGES}
                                phase={introPhase}
                                target={target}
                                isMobile={isMobile}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
