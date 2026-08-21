import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import img1 from '../assets/project/image-1.png';
import img2 from '../assets/project/image-2.png';
import img3 from '../assets/project/image-3.png';
import img4 from '../assets/project/image-4.png';
import img5 from '../assets/project/image-5.png';
import img6 from '../assets/project/image-6.png';
import img7 from '../assets/project/image-7.png';
import img8 from '../assets/project/image-8.png';

gsap.registerPlugin(ScrollTrigger);

const projectImages = [img1, img2, img3, img4, img5, img6, img7, img8];

const Projects = () => {
  const containerRef = useRef(null);
  const folderBackRef = useRef(null);
  const folderFrontRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {

      // Center folder pieces
      gsap.set([folderBackRef.current, folderFrontRef.current], {
        xPercent: -50,
        yPercent: -50
      });
      gsap.set(folderFrontRef.current, { transformOrigin: 'bottom center' });

      // Map card index → grid row/col
      const getGridPos = (index) => {
        if (index < 3) return { row: 0, col: index };
        if (index === 3) return { row: 1, col: 0 };
        if (index === 4) return { row: 1, col: 2 };
        return { row: 2, col: index - 5 };
      };

      // All cards start stacked inside the folder
      cardsRef.current.forEach((card) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          rotation: gsap.utils.random(-6, 6),
          scale: 0.85,
          x: 0,
          y: 0,
        });
      });

      // Shared animation builder — same logic for mobile & desktop
      const buildAnimation = ({ cardW, cardH, gap, scrollStart, scrollEnd }) => {
        let floatTween;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: scrollStart,
            end: scrollEnd,
            toggleActions: 'play reverse play reverse',
            onEnter: () => { if (floatTween) floatTween.kill(); },
            onEnterBack: () => { if (floatTween) floatTween.kill(); },
            onLeave: () => { if (floatTween) floatTween.kill(); },
            onLeaveBack: () => { if (floatTween) floatTween.kill(); },
          },
          onComplete: () => {
            floatTween = gsap.to(cardsRef.current, {
              y: '+=10',
              rotation: '+=1',
              duration: 3.5,
              yoyo: true,
              repeat: -1,
              ease: 'sine.inOut',
              stagger: { amount: 1.5, from: 'random' },
            });
          },
        });

        // 1. Folder flap opens
        tl.to(folderFrontRef.current, {
          rotationX: -130,
          duration: 1.2,
          ease: 'power3.inOut',
        });

        // 2. Cards rise from folder
        tl.to(cardsRef.current, {
          y: -80,
          scale: 0.9,
          zIndex: 70,
          duration: 0.6,
          stagger: 0.04,
          ease: 'back.out(1.2)',
        }, '-=0.6');

        // 3. Cards spread into 3×3 grid
        tl.to(cardsRef.current, {
          x: (i) => {
            const { col } = getGridPos(i);
            return (col - 1) * (cardW + gap);
          },
          y: (i) => {
            const { row } = getGridPos(i);
            return (row - 1) * (cardH + gap);
          },
          rotation: () => gsap.utils.random(-4, 4),
          scale: 1,
          duration: 1.4,
          stagger: { amount: 0.4, from: 'center' },
          ease: 'expo.out',
        }, '-=0.2');
      };

      let mm = gsap.matchMedia();
      mm.add({ isDesktop: '(min-width: 768px)', isMobile: '(max-width: 767px)' }, (ctx) => {
        const { isDesktop, isMobile } = ctx.conditions;

        if (isDesktop) {
          const cardW = Math.max(...cardsRef.current.map(c => c?.offsetWidth || 0)) || 320;
          const cardH = Math.max(...cardsRef.current.map(c => c?.offsetHeight || 0)) || 180;
          buildAnimation({ cardW, cardH, gap: 40, scrollStart: 'top 50%', scrollEnd: 'bottom 50%' });
        }

        if (isMobile) {
          // 42 vw cards — 3 columns fit neatly on any phone
          const cardW = window.innerWidth * 0.42;
          const cardH = cardW * (9 / 16);
          buildAnimation({ cardW, cardH, gap: 10, scrollStart: 'top 60%', scrollEnd: 'bottom 40%' });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="bg-[#f7f6f2] min-h-[80svh] md:min-h-[150vh] relative font-sans overflow-x-clip text-zinc-900 w-full flex items-center justify-center py-6 md:py-40"
    >

      {/* Background Typography */}
      <div className="absolute top-0 left-0 w-full flex items-start justify-center pointer-events-none z-0 pt-1 md:pt-0">
        <h1 className="text-[10vw] sm:text-[12vw] md:text-[14vw] font-black text-zinc-950 tracking-tighter leading-none whitespace-nowrap uppercase">
          My Work
        </h1>
      </div>

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-[#f4c400]/15 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Main Perspective Container */}
      <div className="mt-12 relative w-full max-w-7xl h-full flex items-center justify-center perspective-[2000px] z-10">

        {/* Centered Stacking Context */}
        <div className="relative w-0 h-0 transform-style-3d">

          {/* Folder Back */}
          <div
            ref={folderBackRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video bg-[#f4c400] rounded-[24px] shadow-[0_20px_50px_rgba(217,163,0,0.3)] flex items-center justify-center"
            style={{ zIndex: 5 }}
          >
            <div className="absolute -top-6 left-6 w-32 h-8 bg-[#d9a300] rounded-t-xl" />
            <div className="absolute inset-0 rounded-[24px] shadow-[inset_0_20px_40px_rgba(0,0,0,0.08)] opacity-60 pointer-events-none" />
            <div className="absolute inset-0 rounded-[24px] opacity-[0.08] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")' }} />
            <div className="relative z-10 text-[#d9a300] font-black text-2xl tracking-widest uppercase opacity-40">
              Archive
            </div>
          </div>

          {/* Project Cards — works for BOTH mobile and desktop */}
          {projectImages.map((img, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="absolute w-[42vw] md:w-[28vw] max-w-[340px] aspect-video will-change-transform"
              style={{ zIndex: 10 + i }}
            >
              <div className="w-full h-full rounded-[14px] md:rounded-[28px] overflow-hidden border border-white/60 bg-white shadow-[0_15px_35px_rgba(0,0,0,0.1)] transition-all duration-500 group hover:scale-[1.03] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] hover:-translate-y-2 cursor-pointer relative z-10 will-change-transform">
                <img src={img} alt={`Project ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />

                {/* Explore overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 md:p-6">
                  <span className="text-white font-semibold tracking-wider text-[10px] md:text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300">EXPLORE</span>
                </div>

                {/* Glow ring */}
                <div className="absolute inset-0 border-[2px] md:border-[3px] border-transparent group-hover:border-white/50 rounded-[14px] md:rounded-[28px] transition-colors duration-500 pointer-events-none" />
              </div>
            </div>
          ))}

          {/* Folder Front Flap */}
          <div
            ref={folderFrontRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video pointer-events-none will-change-transform"
            style={{ zIndex: 60 }}
          >
            <div className="absolute bottom-0 w-full h-[85%] bg-[#f4c400] rounded-b-[24px] rounded-t-md shadow-[0_-5px_20px_rgba(0,0,0,0.15)] flex flex-col justify-end p-6 border-t border-white/30">
              <div className="absolute inset-0 rounded-b-[24px] shadow-[inset_0_-10px_20px_rgba(0,0,0,0.05)] pointer-events-none" />
              <div className="absolute inset-0 rounded-b-[24px] opacity-[0.08] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")' }} />
              <div className="w-20 h-1.5 bg-black/10 rounded-full mx-auto mb-2" />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}

export default Projects;
