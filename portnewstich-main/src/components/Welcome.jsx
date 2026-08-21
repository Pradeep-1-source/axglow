import { useLayoutEffect, useRef } from 'react';
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

// ── Skill card imports ─────────────────────────────────────────────────────
import skillPython from '../assets/certificatesandskills/skills/pyt.png';
import skillAIAgents from '../assets/certificatesandskills/skills/aiagents.png';
import skillLLMs from '../assets/certificatesandskills/skills/llms.png';
import skillLangChain from '../assets/certificatesandskills/skills/langchain.png';
import skillLangGraph from '../assets/certificatesandskills/skills/langgraph.png';
import skillRAG from '../assets/certificatesandskills/skills/rag.png';
import skillFastAPI from '../assets/certificatesandskills/skills/fastapi.png';
import skillDjango from '../assets/certificatesandskills/skills/django.png';
import skillReact from '../assets/certificatesandskills/skills/react.png';
import skillPostgres from '../assets/certificatesandskills/skills/postgresql.png';
import skillDocker from '../assets/certificatesandskills/skills/docker.png';
import skillVercel from '../assets/certificatesandskills/skills/vercel.png';
import skillGit from '../assets/certificatesandskills/skills/git.png';

gsap.registerPlugin(ScrollTrigger);

// ── Data ───────────────────────────────────────────────────────────────────
const certsData = [
  {
    image: certFullstack,
    alt: 'IBM Full Stack Software Developer Professional Certificate',
    link: 'https://drive.google.com/file/d/1uqUkon9YTswIdHy1z95_6txG-BtzHDfe/view?usp=sharing'
  },
  {
    image: certGenAI,
    alt: 'Generative AI: Elevate Your Software Development Career',
    link: 'https://drive.google.com/file/d/1uY18c-HI9EaO0BuwIOy5Pd-NaqQ7JLtL/view?usp=sharing'
  },
  {
    image: certFlask,
    alt: 'Developing AI Applications with Python and Flask',
    link: 'https://drive.google.com/file/d/1trjnlZJ6-JIhYvoNeCIDpSQy9dfOSGzf/view?usp=sharing'
  },
  {
    image: certPythonDS,
    alt: 'Python for Data Science, AI & Development',
    link: 'https://drive.google.com/file/d/1uJ1di0aC0THijm7ns3Bq6wRaxOsl9nFt/view?usp=sharing'
  },
  {
    image: certReact,
    alt: 'Developing Front-End Apps with React',
    link: 'https://drive.google.com/file/d/1tYVBHbLUPrdZaJ1EvDIEagcbo6bgrlsT/view?usp=sharing'
  },
  {
    image: certMicroservices,
    alt: 'Application Development using Microservices and Serverless',
    link: 'https://drive.google.com/file/d/1ub7VizlA2WN-v6SF_8HemnwKG65TdgxK/view?usp=sharing'
  },
  {
    image: certCapstone,
    alt: 'Full Stack Application Development Capstone Project',
    link: 'https://drive.google.com/file/d/1uq4EecABZDyciPvHgrl0UogkPfgV0nmP/view?usp=sharing'
  },
  {
    image: certISRO,
    alt: 'ISRO AI/ML for Geodata Analysis',
    link: 'https://drive.google.com/file/d/1VzukE2tph91-KX4rxRnd8zVVFqQWM8uB/view?usp=sharing'
  },
];

const skillsData = [
  { image: skillPython, alt: 'Python' },
  { image: skillAIAgents, alt: 'AI Agents' },
  { image: skillLLMs, alt: 'LLMs' },
  { image: skillLangChain, alt: 'LangChain' },
  { image: skillLangGraph, alt: 'LangGraph' },
  { image: skillRAG, alt: 'RAG' },
  { image: skillFastAPI, alt: 'FastAPI' },
  { image: skillDjango, alt: 'Django' },
  { image: skillReact, alt: 'React' },
  { image: skillPostgres, alt: 'PostgreSQL' },
  { image: skillDocker, alt: 'Docker' },
  { image: skillVercel, alt: 'Vercel' },
  { image: skillGit, alt: 'Git' },
];

// ── Card components ────────────────────────────────────────────────────────
const CertCard = ({ cert }) => (
  <div
    className="cert-card mx-4 shrink-0 cursor-pointer"
    onClick={() => {
      if (cert.link) {
        window.open(cert.link, '_blank');
      } else {
        alert("Verification link is coming soon!");
      }
    }}
  >
    <img
      src={cert.image}
      alt={cert.alt}
      draggable={false}
    />
  </div>
);

const SkillCard = ({ skill }) => (
  <div className="skill-card mx-4 shrink-0 cursor-pointer">
    <img
      src={skill.image}
      alt={skill.alt}
      draggable={false}
    />
  </div>
);

// ── Main component ─────────────────────────────────────────────────────────
const Welcome = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const heroImgNode = document.querySelector("#hero-image");

      if (heroImgNode) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top top",
            scrub: 1,
          }
        });

        tl.to(heroImgNode, {
          y: () => {
            const rect = heroImgNode.getBoundingClientRect();
            const originalTopY = rect.top + window.scrollY;
            const welcomeRect = sectionRef.current.getBoundingClientRect();
            const welcomeTopY = welcomeRect.top + window.scrollY;
            const targetTopY = welcomeTopY - (window.innerHeight * 0.08);
            return targetTopY - originalTopY;
          },
          scale: () => window.innerWidth < 1024 ? 2.8 : 3.8,
          transformOrigin: "top center",
          x: () => {
            const rect = heroImgNode.getBoundingClientRect();
            const originalCenterX = rect.left + window.scrollX + rect.width / 2;
            const targetCenterX = window.innerWidth / 2;
            return targetCenterX - originalCenterX;
          },
          ease: "power2.inOut"
        }, 0);

        tl.fromTo(".welcome-huge-text", {
          y: -100,
          scale: 0.9,
          opacity: 0,
        }, {
          y: 0,
          scale: 1,
          opacity: 0.15,
          ease: "power2.out"
        }, 0);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full h-auto md:h-[200vh] bg-transparent text-black flex flex-col items-center justify-start overflow-hidden pointer-events-none"
    >
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,1)_0%,rgba(240,240,240,1)_100%)]"></div>
        <div
          className="absolute inset-0 mix-blend-overlay opacity-20 pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        ></div>
      </div>

      {/* ── SCREEN 1: WELCOME TEXT ── */}
      <div className="w-full h-screen text-center z-10 flex flex-col items-center justify-start pt-[20vh] md:justify-center md:pt-0 relative">
        <h2 className="welcome-huge-text text-[22vw] sm:text-[20vw] md:text-[14vw] font-black uppercase tracking-tighter text-black leading-none whitespace-nowrap">
          WELCOME
        </h2>
        <p className="welcome-huge-text mt-2 text-zinc-500 font-medium tracking-widest uppercase text-xs md:text-base">
          To my creative space
        </p>

        {/* Mobile clip masks */}
        <div className="md:hidden absolute bottom-0 left-0 w-full h-[40%] bg-white z-30 pointer-events-none" />
        <div className="md:hidden absolute bottom-[40%] left-0 w-full h-20 bg-gradient-to-b from-transparent to-white z-30 pointer-events-none" />
      </div>

      {/* ── SCREEN 2: CERTIFICATIONS & SKILLS ── */}
      <div className="w-full md:min-h-screen z-20 flex flex-col justify-center gap-10 md:gap-6 relative bg-white pointer-events-auto pt-10 pb-20 md:pt-20 md:pb-60">
        {/* Gradient blend from Screen 1 */}
        <div className="absolute -top-32 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>

        {/* ── Section header ── */}
        <div className="text-center z-30 px-6 mb-16 md:mb-0">
          <h3
            className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black mb-2"
            data-aos="fade-up"
          >
            Certifications &amp; <span style={{ color: '#f4c400' }}>Skills</span>
          </h3>
          <p
            className="text-zinc-500 font-medium"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Professional credentials and technologies I work with.
          </p>
        </div>

        {/* ── Marquee rows ── */}
        <div className="flex flex-col gap-5 pt-2 md:pt-0">
          <style>{`
            /* ── Preserved animation (unchanged) ── */
            @keyframes marqueeScroll {
              0%   { transform: translateX(0%);   }
              100% { transform: translateX(-50%); }
            }
            .marquee-inner {
              animation: marqueeScroll 10s linear infinite;
            }
            @media (min-width: 768px) {
              .marquee-inner {
                animation: marqueeScroll 25s linear infinite;
              }
            }
            .marquee-reverse {
              animation-direction: reverse;
            }

            /* ── Cert card ── */
            .cert-card {
              width: 180px;
              flex-shrink: 0;
              border-radius: 20px;
              overflow: hidden;
              background: #fff;
              border: 1.5px solid #f0f0f0;
              box-shadow: 0 4px 18px rgba(0,0,0,0.07);
              transition: transform 250ms ease-out, box-shadow 250ms ease-out, border-color 250ms ease-out;
              will-change: transform;
            }
            @media (min-width: 768px) {
              .cert-card {
                width: 288px;
                border-radius: 28px;
              }
            }
            .cert-card img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
              pointer-events: none;
              user-select: none;
            }
            .cert-card:hover {
              transform: translateY(-7px) scale(1.07);
              box-shadow: 0 16px 40px rgba(244,196,0,0.22), 0 6px 20px rgba(0,0,0,0.10);
              border-color: rgba(244,196,0,0.65);
              z-index: 50;
              position: relative;
            }

            /* ── Skill card ── */
            .skill-card {
              width: 90px;
              height: 90px;
              flex-shrink: 0;
              border-radius: 20px;
              overflow: hidden;
              background: #fff;
              border: 1.5px solid #f0f0f0;
              box-shadow: 0 4px 18px rgba(0,0,0,0.07);
              transition: transform 250ms ease-out, box-shadow 250ms ease-out, border-color 250ms ease-out;
              will-change: transform;
            }
            @media (min-width: 768px) {
              .skill-card {
                width: 120px;
                height: 120px;
                border-radius: 28px;
              }
            }
            .skill-card img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
              pointer-events: none;
              user-select: none;
            }
            .skill-card:hover {
              transform: translateY(-7px) scale(1.07);
              box-shadow: 0 16px 40px rgba(99,102,241,0.18), 0 6px 20px rgba(0,0,0,0.10);
              border-color: rgba(99,102,241,0.55);
              z-index: 50;
              position: relative;
            }

            /* ── Marquee row clip fix ── */
            .marquee-row-wrap {
              position: relative;
              width: 100%;
              max-width: 100vw;
            }
            /* horizontal-only clip so hover lift is never cut */
            .marquee-row-clip {
              overflow: hidden;
              width: 100%;
            }
            .marquee-row {
              overflow: visible;
              padding-top: 12px;
              padding-bottom: 12px;
            }
            /* fade masks sit OUTSIDE the clip layer, pointer-events off */
            .marquee-fade-left,
            .marquee-fade-right {
              position: absolute;
              top: 0;
              height: 100%;
              z-index: 10;
              pointer-events: none;
            }
            .marquee-fade-left  { left:  0; width: 80px;  background: linear-gradient(to right, white, transparent); }
            .marquee-fade-right { right: 0; width: 80px;  background: linear-gradient(to left,  white, transparent); }
            @media (min-width: 768px) {
              .marquee-fade-right { width: 160px; }
            }

            /* ── View All pill button ── */
            .view-all-pill {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              padding: 6px 16px 6px 14px;
              border-radius: 999px;
              font-size: 12px;
              font-weight: 600;
              letter-spacing: 0.04em;
              color: #3f3f46;
              background: rgba(244,196,0,0.10);
              border: 1.5px solid rgba(244,196,0,0.45);
              cursor: pointer;
              transition: background 200ms ease, border-color 200ms ease, color 200ms ease, box-shadow 200ms ease;
              white-space: nowrap;
              user-select: none;
            }
            .view-all-pill:hover {
              background: rgba(244,196,0,0.22);
              border-color: rgba(244,196,0,0.8);
              color: #18181b;
              box-shadow: 0 2px 12px rgba(244,196,0,0.25);
            }
          `}</style>

          {/* ── ROW 1: Certifications ── */}
          <div>
            {/* Row header */}
            <div
              className="flex items-center justify-between px-6 md:px-12 mb-3"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <span className="text-sm font-bold tracking-widest uppercase text-zinc-700 flex items-center gap-1.5">
                🏆 Certifications
              </span>
              <button
                className="view-all-pill"
                type="button"
                aria-label="View all certifications"
                onClick={() => navigate('/certifications')}
              >
                View All
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Scrolling row — forward */}
            <div className="marquee-row-wrap">
              <div className="marquee-fade-left"></div>
              <div className="marquee-row-clip">
                <div className="marquee-row">
                  <div className="marquee-inner flex transform-gpu min-w-[200%]">
                    {[...certsData, ...certsData, ...certsData, ...certsData].map((cert, index) => (
                      <CertCard key={index} cert={cert} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="marquee-fade-right"></div>
            </div>
          </div>

          {/* ── ROW 2: Skills ── */}
          <div>
            {/* Row header */}
            <div
              className="flex items-center px-6 md:px-12 mb-3"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <span className="text-sm font-bold tracking-widest uppercase text-zinc-700 flex items-center gap-1.5">
                ⚡ Skills
              </span>
            </div>

            {/* Scrolling row — reverse */}
            <div className="marquee-row-wrap">
              <div className="marquee-fade-left"></div>
              <div className="marquee-row-clip">
                <div className="marquee-row">
                  <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%]">
                    {[...skillsData, ...skillsData, ...skillsData, ...skillsData].map((skill, index) => (
                      <SkillCard key={index} skill={skill} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="marquee-fade-right"></div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Welcome;
