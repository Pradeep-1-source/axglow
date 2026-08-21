import { SpotlightLens3D, Wheel3DCarousel } from './animations';
import { Eye, Layers, Sparkles, ArrowRight } from 'lucide-react';

const servicesList = [
  {
    id: '01',
    title: 'Brand Identity & Logo Design',
    tag: '01 / BRANDING',
    desc: 'Crafting luxury visual identity, custom mark design, typography systems & 3D brand guidelines.',
    image: '/services/brand-identity.png',
    accentColor: '#06b6d4',
    bgGradient: 'from-cyan-600 via-blue-600 to-blue-800',
    borderColor: 'border-cyan-300/40',
    badgeStyle: 'bg-black/40 text-cyan-200 border-white/20',
  },
  {
    id: '02',
    title: 'Website Design & Development',
    tag: '02 / WEB CANVAS',
    desc: 'Immersive WebGL canvas engineering, 60FPS GSAP animations & bulletproof Next.js architecture.',
    image: '/services/web-design.png',
    accentColor: '#9333ea',
    bgGradient: 'from-purple-600 via-indigo-600 to-purple-800',
    borderColor: 'border-purple-300/40',
    badgeStyle: 'bg-black/40 text-purple-200 border-white/20',
  },
  {
    id: '03',
    title: 'UI/UX Design',
    tag: '03 / ERGONOMICS',
    desc: 'Bespoke product design systems, interactive dark-mode prototypes & conversion optimization.',
    image: '/services/ui-ux.png',
    accentColor: '#ec4899',
    bgGradient: 'from-pink-600 via-rose-600 to-pink-800',
    borderColor: 'border-pink-300/40',
    badgeStyle: 'bg-black/40 text-pink-200 border-white/20',
  },
  {
    id: '04',
    title: 'Video Editing & Multimedia',
    tag: '04 / CINEMATIC',
    desc: 'High-production commercial films, 3D motion graphics, commercial VFX & spatial sound design.',
    image: '/services/video-editing.png',
    accentColor: '#f59e0b',
    bgGradient: 'from-amber-500 via-orange-600 to-amber-700',
    borderColor: 'border-amber-300/40',
    badgeStyle: 'bg-black/40 text-amber-200 border-white/20',
  },
  {
    id: '05',
    title: 'Digital Marketing',
    tag: '05 / GROWTH ENGINE',
    desc: 'Data-informed creative campaigns, high-ROAS ad production, search supremacy & PR engines.',
    image: '/services/digital-marketing.png',
    accentColor: '#10b981',
    bgGradient: 'from-emerald-600 via-teal-600 to-emerald-800',
    borderColor: 'border-emerald-300/40',
    badgeStyle: 'bg-black/40 text-emerald-200 border-white/20',
  },
];

export function Animation3DShowcase() {
  return (
    <>
      {/* SECTION 1: 2.5D Spotlight Lens */}
      <section id="spotlight-section" className="relative w-full py-10 bg-transparent text-white border-t border-b border-white/10 overflow-hidden">
        {/* Ambient Glow Backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#3BD8D9]/15 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <SpotlightLens3D lensSize={320} accentColor="#3BD8D9" blurAmount="10px">
            <div className="w-full p-8 md:p-12 rounded-3xl bg-[#090b10]/80 border border-white/15 backdrop-blur-xl shadow-[0_0_50px_rgba(59,216,217,0.15)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#3BD8D9]/15 rounded-full filter blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8A46BB]/20 rounded-full filter blur-3xl pointer-events-none" />
              
              <div className="text-center mb-8">
                <span className="text-[#3BD8D9] text-xs font-bold uppercase tracking-widest px-3 py-1 bg-[#3BD8D9]/10 rounded-full border border-[#3BD8D9]/30 backdrop-blur-md">
                  Move Mouse Cursor Across Lens Container
                </span>
              </div>

              {/* Service Cards Grid in Spotlight */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {servicesList.slice(0, 3).map((service) => (
                  <div
                    key={service.id}
                    className={`p-6 rounded-2xl bg-gradient-to-br ${service.bgGradient} border ${service.borderColor} shadow-2xl flex flex-col justify-between text-white group`}
                  >
                    <div>
                      <div className="w-full h-36 rounded-xl overflow-hidden mb-4 border border-white/20 relative shadow-md">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      </div>
                      <span className={`inline-block text-[10px] font-black uppercase px-2.5 py-1 rounded-full border mb-2 ${service.badgeStyle}`}>
                        {service.tag}
                      </span>
                      <h4 className="text-lg font-black text-white uppercase leading-snug mb-2">
                        {service.title}
                      </h4>
                    </div>
                    <p className="text-xs text-white/90 font-medium leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </SpotlightLens3D>
        </div>
      </section>

      {/* SECTION 2: 3D Arc Wheel Carousel */}
      <section id="arc-wheel-section" className="relative w-full py-10 bg-transparent text-white border-b border-white/10 overflow-hidden">
        {/* Ambient Glow Backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[#8A46BB]/15 rounded-full blur-[180px] pointer-events-none" />

        <div className="w-full relative z-10">
          <Wheel3DCarousel
            items={servicesList}
            height="700px"
            scrollDistance="+=250%"
            renderItem={(service) => (
              <div className={`w-72 md:w-80 h-[440px] p-6 rounded-3xl bg-gradient-to-br ${service.bgGradient} shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col justify-between border ${service.borderColor} text-white backdrop-blur-md relative overflow-hidden group`}>
                {/* Top Badge & Tag */}
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border tracking-wider ${service.badgeStyle}`}>
                    {service.tag}
                  </span>
                  <Sparkles className="w-4 h-4 text-white/60" />
                </div>

                {/* Small Image Thumbnail Container with Logo Overlay */}
                <div className="w-full h-36 rounded-2xl overflow-hidden my-3 relative group border border-white/20 shadow-inner">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>

                {/* Service Title */}
                <div>
                  <h4 className="text-xl font-black uppercase leading-tight tracking-tight text-white mb-2">
                    {service.title}
                  </h4>
                  <p className="text-xs text-white/90 font-medium leading-relaxed line-clamp-2">
                    {service.desc}
                  </p>
                </div>

                {/* Bottom Action Button */}
                <div className="w-full py-2.5 rounded-xl bg-black/30 hover:bg-black/50 border border-white/20 text-center text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2 transition-colors mt-2">
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            )}
          />
        </div>
      </section>
    </>
  );
}

export default Animation3DShowcase;




