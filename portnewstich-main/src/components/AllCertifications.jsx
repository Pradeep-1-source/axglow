import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { navigate } from '../utils/navigation';

// ── Certificate badge imports ──────────────────────────────────────────────
import certFullstack from '../assets/certificatesandskills/certifiactes/fullstack.png';
import certGenAI from '../assets/certificatesandskills/certifiactes/genai.png';
import certFlask from '../assets/certificatesandskills/certifiactes/pythonwithflask.png';
import certPythonDS from '../assets/certificatesandskills/certifiactes/pythonfords.png';
import certReact from '../assets/certificatesandskills/certifiactes/react.png';
import certMicroservices from '../assets/certificatesandskills/certifiactes/microservices.png';
import certCapstone from '../assets/certificatesandskills/certifiactes/fullstackcapstone.png';
import certISRO from '../assets/certificatesandskills/certifiactes/aimlisro.png';

gsap.registerPlugin(ScrollTrigger);

// ── Certificates Data ──────────────────────────────────────────────────────
const certsData = [
  {
    id: 1,
    title: 'IBM Full Stack Software Developer Professional Certificate',
    image: certFullstack,
    accentColor: '#0f62fe', // IBM Blue
    glowShadow: 'rgba(15, 98, 254, 0.35)',
    issuer: 'IBM',
    link: 'https://drive.google.com/file/d/1uqUkon9YTswIdHy1z95_6txG-BtzHDfe/view?usp=sharing',
    description: 'Comprehensive 12-course program covering cloud-native developer techniques, HTML/CSS/JS, Git, Node.js, Express, Python, Flask, SQL, NoSQL, containers, Kubernetes, microservices, serverless, and React, ending with a comprehensive Capstone Project.'
  },
  {
    id: 2,
    title: 'Generative AI: Elevate Your Software Development Career',
    image: certGenAI,
    accentColor: '#10b981', // Emerald/Green
    glowShadow: 'rgba(16, 185, 129, 0.35)',
    issuer: 'IBM',
    link: 'https://drive.google.com/file/d/1uY18c-HI9EaO0BuwIOy5Pd-NaqQ7JLtL/view?usp=sharing',
    description: 'Deep dive into applying Generative AI models, prompt engineering, and LLMs to accelerate and optimize modern software engineering workflows.'
  },
  {
    id: 3,
    title: 'Developing AI Applications with Python and Flask',
    image: certFlask,
    accentColor: '#06b6d4', // Cyan
    glowShadow: 'rgba(6, 182, 212, 0.35)',
    issuer: 'IBM',
    link: 'https://drive.google.com/file/d/1trjnlZJ6-JIhYvoNeCIDpSQy9dfOSGzf/view?usp=sharing',
    description: 'Building, structuring, and deploying web applications integrated with Artificial Intelligence services using Python, Flask, and RESTful APIs.'
  },
  {
    id: 4,
    title: 'Python for Data Science, AI & Development',
    image: certPythonDS,
    accentColor: '#eab308', // Yellow
    glowShadow: 'rgba(234, 179, 8, 0.35)',
    issuer: 'IBM',
    link: 'https://drive.google.com/file/d/1uJ1di0aC0THijm7ns3Bq6wRaxOsl9nFt/view?usp=sharing',
    description: 'Mastery of Python programming fundamentals, data structures, data analysis libraries (Pandas, NumPy), and API interactions.'
  },
  {
    id: 5,
    title: 'Developing Front-End Apps with React',
    image: certReact,
    accentColor: '#0ea5e9', // Sky Blue
    glowShadow: 'rgba(14, 165, 233, 0.35)',
    issuer: 'IBM',
    link: 'https://drive.google.com/file/d/1tYVBHbLUPrdZaJ1EvDIEagcbo6bgrlsT/view?usp=sharing',
    description: 'Creating dynamic, responsive single-page user interfaces with React, state management, hooks, and modern component design.'
  },
  {
    id: 6,
    title: 'Application Development using Microservices & Serverless',
    image: certMicroservices,
    accentColor: '#a855f7', // Purple
    glowShadow: 'rgba(168, 85, 247, 0.35)',
    issuer: 'IBM',
    link: 'https://drive.google.com/file/d/1ub7VizlA2WN-v6SF_8HemnwKG65TdgxK/view?usp=sharing',
    description: 'Designing, packaging, and deploying cloud-native systems, developing REST APIs as microservices, and deploying containerized services using serverless tech.'
  },
  {
    id: 7,
    title: 'Full Stack Application Development Capstone Project',
    image: certCapstone,
    accentColor: '#6366f1', // Indigo
    glowShadow: 'rgba(99, 102, 241, 0.35)',
    issuer: 'IBM',
    link: 'https://drive.google.com/file/d/1uq4EecABZDyciPvHgrl0UogkPfgV0nmP/view?usp=sharing',
    description: 'End-to-end implementation of a complex full-stack web application featuring user authentication, database operations, and live deployment.'
  },
  {
    id: 8,
    title: 'ISRO AI/ML for Geodata Analysis',
    image: certISRO,
    accentColor: '#f97316', // Orange
    glowShadow: 'rgba(249, 115, 22, 0.35)',
    issuer: 'ISRO',
    link: 'https://drive.google.com/file/d/1VzukE2tph91-KX4rxRnd8zVVFqQWM8uB/view?usp=sharing',
    description: 'Specialized training in applying Machine Learning and Deep Learning architectures for processing and interpreting satellite geodata and remote sensing imagery.'
  }
];

const AllCertifications = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const bgRefs = useRef([]);
  const textRefs = useRef([]);
  const hintRef = useRef(null);
  const bottomRef = useRef(null);

  const [selectedCert, setSelectedCert] = useState(null);

  useLayoutEffect(() => {
    document.title = "Bhuvanesh V | All Certifications";
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 769px)',
          isMobile: '(max-width: 768px)',
        },
        (context) => {
          const { isDesktop } = context.conditions;

          // ── Trajectory Parameters matching Services.jsx ──
          const radius = isDesktop ? 1800 : 680;
          const angleSpread = isDesktop ? 18 : 22;

          const updateCards = (p) => {
            cardsRef.current.forEach((card, i) => {
              if (!card) return;
              const offset = i - p;
              const angle = offset * angleSpread;
              const rad = (angle * Math.PI) / 180;
              const x = Math.sin(rad) * radius;
              const y = radius - Math.cos(rad) * radius;
              const z = -Math.abs(offset) * 50;
              const scale = Math.max(0.4, 1 - Math.abs(offset) * 0.15);
              const opacity = Math.max(0.1, 1 - Math.abs(offset) * 0.3);
              const zIndex = Math.round(100 - Math.abs(offset) * 10);

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

            if (hintRef.current) {
              gsap.set(hintRef.current, { opacity: Math.max(0, 1 - p * 4) });
            }

            // Real-time layout style adjustments for dynamic background contrasts
            const activeIdx = Math.round(p);
            const headerTitle = document.querySelector('.cert-header-title');
            const headerSubtitle = document.querySelector('.cert-header-subtitle');
            const backButton = document.querySelector('.cert-back-button');

            if (activeIdx === 3) {
              // Yellow background contrast adjustments
              if (headerTitle) {
                headerTitle.style.color = '#18181b';
                const highlight = headerTitle.querySelector('.accent-highlight');
                if (highlight) highlight.style.color = '#000000';
              }
              if (headerSubtitle) headerSubtitle.style.color = '#3f3f46';
              if (backButton) {
                backButton.style.color = '#18181b';
                const underline = backButton.querySelector('.accent-underline');
                if (underline) underline.style.backgroundColor = '#18181b';
              }
            } else {
              // Saturated dark background adjustments
              if (headerTitle) {
                headerTitle.style.color = '#ffffff';
                const highlight = headerTitle.querySelector('.accent-highlight');
                if (highlight) highlight.style.color = '#f4c400';
              }
              if (headerSubtitle) headerSubtitle.style.color = 'rgba(255,255,255,0.75)';
              if (backButton) {
                backButton.style.color = '#ffffff';
                const underline = backButton.querySelector('.accent-underline');
                if (underline) underline.style.backgroundColor = '#f4c400';
              }
            }
          };

          updateCards(0);

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=700%',
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
              updateCards(self.progress * (certsData.length - 1));
            },
          });
        }
      );

      // Bottom section scroll reveal
      gsap.fromTo(bottomRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bottomRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (cert, index) => {
    const cardEl = cardsRef.current[index];
    if (cardEl) {
      const innerCard = cardEl.querySelector('.cert-card-inner');
      if (innerCard) {
        gsap.timeline()
          .to(innerCard, { scale: 0.96, duration: 0.1, ease: 'power2.out' })
          .to(innerCard, {
            scale: 1.03, duration: 0.15, ease: 'back.out(1.5)', onComplete: () => {
              setSelectedCert(cert);
            }
          });
      } else {
        setSelectedCert(cert);
      }
    } else {
      setSelectedCert(cert);
    }
  };

  return (
    <div ref={containerRef} className="w-full bg-white select-none">
      <style>{`
        @keyframes modalScaleIn {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-enter {
          animation: modalScaleIn 350ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      {/* ── Section 1: Carousel ── */}
      <section
        id="certifications-carousel"
        ref={sectionRef}
        className="relative w-full h-screen bg-white text-white overflow-hidden flex items-center justify-center [perspective:1000px] z-10"
      >
        {/* Dynamic colorful backgrounds */}
        {certsData.map((c, i) => (
          <div
            key={`bg-${i}`}
            ref={el => (bgRefs.current[i] = el)}
            className="absolute inset-0 z-0 pointer-events-none opacity-0 transition-none"
            style={{ backgroundColor: c.accentColor }}
          />
        ))}

        {/* Parallax giant stroke text reading CERTIFICATES */}
        <div className="absolute inset-0 flex items-start pt-24 md:items-center justify-center z-0 pointer-events-none overflow-hidden">
          {certsData.map((c, i) => (
            <h1
              key={`txt-${i}`}
              ref={el => (textRefs.current[i] = el)}
              className="absolute text-[13vw] font-black uppercase text-transparent leading-none tracking-tighter mix-blend-overlay whitespace-nowrap hidden md:block"
              style={{
                WebkitTextStroke: `2px ${i === 3 ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.4)'}`,
                opacity: 0,
              }}
            >
              CERTIFICATES
            </h1>
          ))}
        </div>

        {/* Modern back button floating at top-left */}
        <div className="absolute top-8 left-8 z-50">
          <button
            onClick={() => navigate('/')}
            className="cert-back-button relative text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-white transition-colors duration-300 group flex items-center gap-2 cursor-pointer py-2"
          >
            ← Back
            <span className="accent-underline absolute left-0 -bottom-0.5 w-0 h-[2px] bg-[#f4c400] rounded-full transition-all duration-300 group-hover:w-full"></span>
          </button>
        </div>

        {/* Title and Subtitle floating at top */}
        <div className="absolute top-20 md:top-24 left-0 w-full text-center px-6 z-30 pointer-events-none">
          <h1 className="cert-header-title text-[9vw] sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white transition-colors duration-300">
            All <span className="accent-highlight transition-colors duration-300" style={{ color: '#f4c400' }}>Certifications</span>
          </h1>
          <p className="cert-header-subtitle text-white/80 font-semibold tracking-wider text-[10px] md:text-xs uppercase mt-2 max-w-xl mx-auto leading-relaxed transition-colors duration-300">
            A collection of my professional credentials and achievements.
          </p>
        </div>

        {/* Carousel Cards Container — Only showing the image inside a clean wrapper */}
        <div className="relative w-full h-full flex items-center justify-center z-10 [transform-style:preserve-3d] pointer-events-none">
          {certsData.map((c, i) => (
            <div
              key={`card-${i}`}
              ref={el => (cardsRef.current[i] = el)}
              className="absolute
                w-[90vw] aspect-[1.38/1]
                md:w-[460px] md:h-[333px]
                pointer-events-auto"
            >
              <div
                className="cert-card-inner w-full h-full rounded-[24px] md:rounded-[32px] overflow-hidden bg-white border border-zinc-200/50 shadow-[0_15px_45px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-3 hover:scale-[1.04] cursor-pointer group flex items-center justify-center p-1 md:p-1.5"
                style={{
                  '--glow-color': c.accentColor,
                  '--glow-shadow': c.glowShadow
                }}
                onClick={() => handleCardClick(c, i)}
              >
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-contain rounded-[20px] md:rounded-[26px]"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Scroll down hint arrow */}
        <div
          ref={hintRef}
          className="absolute bottom-8 left-0 w-full flex flex-col items-center gap-2 z-30 pointer-events-none"
        >
          <div className="flex flex-col items-center gap-1 animate-bounce">
            <span className="text-white/70 text-[10px] tracking-[0.2em] uppercase font-semibold mix-blend-difference">Scroll</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" className="mix-blend-difference">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── Section 2: Bottom Message ── */}
      <section
        ref={bottomRef}
        className="w-full bg-[#fcfbfa] py-32 text-center px-6 relative z-30 border-t border-zinc-100 flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#f4c400]/5 rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="relative z-10">
          <div className="w-12 h-1 bg-[#f4c400] rounded-full mx-auto mb-8"></div>
          <h2 className="text-3xl md:text-5xl font-black text-zinc-950 uppercase tracking-tight mb-4">
            Learning never stops.
          </h2>
          <p className="text-zinc-500 font-semibold tracking-wider text-xs md:text-sm uppercase max-w-lg mx-auto leading-relaxed">
            Always exploring new technologies, frameworks and AI innovations.
          </p>
        </div>
      </section>

      {/* ── Certificate Details Modal ── */}
      {selectedCert && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-md z-[200] flex items-center justify-center p-4 md:p-6 transition-all duration-300"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="bg-white text-zinc-900 w-full max-w-3xl rounded-[28px] md:rounded-[36px] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.2)] border border-zinc-200/50 flex flex-col md:flex-row relative animate-modal-enter"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Left/Top Side Gradient container */}
            <div
              className="w-full md:w-[40%] flex items-center justify-center p-8 md:p-12 relative"
              style={{
                background: `radial-gradient(circle at center, #ffffff 0%, ${selectedCert.accentColor}18 100%)`,
              }}
            >
              <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="w-40 h-40 md:w-52 md:h-52 object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)] transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => {
                  if (selectedCert.link) {
                    window.open(selectedCert.link, '_blank');
                  } else {
                    alert("Verification link is coming soon!");
                  }
                }}
              />
            </div>

            {/* Modal Right/Bottom Side content container */}
            <div className="w-full md:w-[60%] p-6 md:p-10 flex flex-col justify-between">
              {/* Close Icon button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-zinc-50 hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 flex items-center justify-center transition-all hover:scale-105 cursor-pointer border border-zinc-200/50"
                aria-label="Close details"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="pt-2 md:pt-0">
                <span
                  className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full w-fit mb-4 inline-block"
                  style={{
                    backgroundColor: `${selectedCert.accentColor}12`,
                    color: selectedCert.accentColor,
                    border: `1px solid ${selectedCert.accentColor}25`
                  }}
                >
                  Credential Verified — {selectedCert.issuer}
                </span>
                <h2 className="text-xl md:text-2xl font-black text-zinc-950 leading-snug mb-4">
                  {selectedCert.title}
                </h2>
                <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-normal mb-8">
                  {selectedCert.description}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="flex-1 px-6 py-3 border border-zinc-200 text-zinc-600 hover:text-zinc-800 rounded-full text-xs uppercase tracking-wider font-bold transition-all hover:bg-zinc-50 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    if (selectedCert.link) {
                      window.open(selectedCert.link, '_blank');
                    } else {
                      alert("Verification link is coming soon!");
                    }
                  }}
                  className="flex-1 px-6 py-3 text-white rounded-full text-xs uppercase tracking-wider font-bold transition-all hover:scale-[1.02] cursor-pointer shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
                  style={{
                    backgroundColor: selectedCert.accentColor,
                    boxShadow: `0 10px 20px ${selectedCert.glowShadow}`
                  }}
                >
                  Verify Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCertifications;
