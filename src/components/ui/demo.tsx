"use client";

import IntroAnimation from "./scroll-morph-hero";

export default function Demo() {
    return (
        <section id="morph-hero" className="py-16 md:py-24 bg-transparent relative overflow-hidden">
            {/* Background Ambient Radial Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] bg-[#3BD8D9]/10 rounded-full blur-[180px] pointer-events-none" />

            {/* Seamless, borderless container for the 3D scroll morph animation */}
            <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-12">
                <div className="w-full h-[450px] sm:h-[650px] md:h-[750px] overflow-hidden relative bg-transparent">
                    <IntroAnimation />
                </div>
            </div>
        </section>
    );
}
