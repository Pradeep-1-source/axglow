import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import greenImg  from '../assets/service/green.jpeg';
import orangeImg from '../assets/service/orange.jpeg';
import purpleImg from '../assets/service/purple.jpeg';
import redImg    from '../assets/service/red.jpeg';
import whiteImg  from '../assets/service/white.jpeg';
import yellowImg from '../assets/service/yellow.jpeg';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  { img: greenImg,  bgColor: '#648c11', title: 'Business Website',  desc: 'Corporate websites optimized for conversion, speed, and premium brand presence.',       tag: 'Corporate' },
  { img: orangeImg, bgColor: '#ff4500', title: 'Admin Dashboard',   desc: 'Complex data visualization and intuitive management interfaces for enterprises.',         tag: 'SaaS'      },
  { img: purpleImg, bgColor: '#000080', title: 'E-Commerce Store',  desc: 'High-performance online stores with seamless checkout and beautiful product showcases.',   tag: 'Retail'    },
  { img: redImg,    bgColor: '#ff0000', title: 'Full Stack Web App', desc: 'Custom web applications built with scalable architecture and robust logic.',               tag: 'App'       },
  { img: yellowImg, bgColor: '#fff000', title: 'Portfolio Website',  desc: 'Breathtaking creative portfolios for agencies, artists, and photographers.',              tag: 'Creative'  },
  { img: whiteImg,  bgColor: '#f5f5f5', title: 'Website Redesign',  desc: 'Modernizing legacy websites with fresh, award-winning aesthetics and animations.',        tag: 'Design'    },
];

const Services = () => {
  const sectionRef = useRef(null);
  const cardsRef   = useRef([]);
  const bgRefs     = useRef([]);
  const textRefs   = useRef([]);
  const hintRef    = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 769px)',
          isMobile:  '(max-width: 768px)',
        },
        (context) => {
          const { isDesktop } = context.conditions;

          // ── Parameters: desktop vs mobile ──────────────────────────
          const radius      = isDesktop ? 1800 : 680;   // circle radius
          const angleSpread = isDesktop ? 18   : 22;    // degrees between cards

          const updateCards = (p) => {
            cardsRef.current.forEach((card, i) => {
              if (!card) return;
              const offset  = i - p;
              const angle   = offset * angleSpread;
              const rad     = (angle * Math.PI) / 180;
              const x       = Math.sin(rad) * radius;
              const y       = radius - Math.cos(rad) * radius;
              const z       = -Math.abs(offset) * 50;
              const scale   = Math.max(0.4, 1 - Math.abs(offset) * 0.15);
              const opacity = Math.max(0.1, 1 - Math.abs(offset) * 0.3);
              const zIndex  = Math.round(100 - Math.abs(offset) * 10);

              gsap.set(card, {
                x, y, z,
                scale,
                rotationZ: angle,
                rotationY: 0,
                opacity,
                zIndex,
              });
            });

            bgRefs.current.forEach((bg, i) => {
              if (!bg) return;
              const op = Math.max(0, 1 - Math.abs(i - p));
              gsap.set(bg, { opacity: op });
              if (textRefs.current[i]) gsap.set(textRefs.current[i], { opacity: op });
            });

            // Fade out scroll hint once user starts scrolling
            if (hintRef.current) {
              gsap.set(hintRef.current, { opacity: Math.max(0, 1 - p * 4) });
            }
          };

          // Initialise at p=0
          updateCards(0);

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start:   'top top',
            end:     '+=500%',
            pin:     true,
            scrub:   1,
            onUpdate: (self) => {
              updateCards(self.progress * (servicesData.length - 1));
            },
          });
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="service"
      ref={sectionRef}
      className="relative w-full h-screen bg-white text-black overflow-hidden flex items-center justify-center [perspective:1000px]"
    >
      {/* ── Dynamic background colours ─────────────────────── */}
      {servicesData.map((s, i) => (
        <div
          key={`bg-${i}`}
          ref={el => (bgRefs.current[i] = el)}
          className="absolute inset-0 z-0 pointer-events-none opacity-0 transition-none"
          style={{ backgroundColor: s.bgColor }}
        />
      ))}

      {/* ── Background SERVICES stroke text ────────────────── */}
      <div className="absolute inset-0 flex items-start pt-10 md:items-center justify-center z-0 pointer-events-none overflow-hidden">
        {servicesData.map((s, i) => (
          <h1
            key={`txt-${i}`}
            ref={el => (textRefs.current[i] = el)}
            className="absolute text-[18vw] font-black uppercase text-transparent leading-none tracking-tighter mix-blend-overlay whitespace-nowrap"
            style={{
              WebkitTextStroke: `2px ${i === 5 ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.4)'}`,
              opacity: 0,
            }}
          >
            SERVICES
          </h1>
        ))}
      </div>

      {/* ── Cards (shared for both mobile & desktop) ─────────── */}
      <div className="relative w-full h-full flex items-center justify-center z-10 [transform-style:preserve-3d]">
        {servicesData.map((s, i) => (
          <div
            key={`card-${i}`}
            ref={el => (cardsRef.current[i] = el)}
            className="absolute
              w-[82vw] h-[460px]
              md:w-[420px] md:h-[550px]
              rounded-[28px] overflow-hidden
              bg-white border border-gray-200
              shadow-[0_20px_50px_rgba(0,0,0,0.12)]
              group will-change-transform"
          >
            {/* Card image */}
            <div className="w-full h-full relative">
              <img
                src={s.img}
                alt={s.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Mobile info overlay (always visible on mobile, hover-only on desktop) */}
              <div className="
                absolute inset-0
                bg-gradient-to-t from-black/80 via-black/10 to-transparent
                flex flex-col justify-end p-5
                md:opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-300
              ">
                <span
                  className="text-[10px] font-bold tracking-[0.2em] uppercase px-2 py-0.5 rounded-full w-fit mb-2 inline-block"
                  style={{
                    backgroundColor: s.bgColor,
                    color: i === 4 ? '#000' : '#fff',
                  }}
                >
                  {s.tag}
                </span>
                <h3 className="text-white font-black text-xl leading-tight mb-1">{s.title}</h3>
                <p className="text-white/75 text-xs leading-relaxed">{s.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Mobile scroll hint (fades out after first card advances) ─ */}
      <div
        ref={hintRef}
        className="md:hidden absolute bottom-8 left-0 w-full flex flex-col items-center gap-2 z-30 pointer-events-none"
      >
        {/* Animated arrow */}
        <div className="flex flex-col items-center gap-1 animate-bounce">
          <span className="text-white/70 text-[11px] tracking-[0.2em] uppercase font-semibold">Scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>

        {/* Progress dots */}
        <div className="flex gap-1.5 mt-1">
          {servicesData.map((_, i) => (
            <div
              key={`dot-${i}`}
              className="rounded-full bg-white/40"
              style={{ width: i === 0 ? '20px' : '6px', height: '6px' }}
            />
          ))}
        </div>
      </div>

    </section>
  );
};

export default Services;
