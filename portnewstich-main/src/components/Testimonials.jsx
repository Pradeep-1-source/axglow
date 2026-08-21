

const testimonials = [
  {
    name: "Alex Johnson",
    role: "CEO at TechFlow",
    message: "Leeshark is an absolute genius. The web app was delivered ahead of schedule and the attention to detail is mind-blowing.",
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    name: "Sarah Parker",
    role: "Creative Director",
    message: "The most incredible and futuristic design work I have ever seen. The portfolio literally wowed our entire agency.",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    name: "Michael Chen",
    role: "Startup Founder",
    message: "Flawless fullstack execution. From GSAP animations to backend logic, everything was built to perfection.",
    avatar: "https://i.pravatar.cc/150?img=8"
  }
];

const Testimonials = () => {
  return (
    <section className="bg-zinc-950 py-32 relative overflow-hidden text-white" id="testimonials">
      <div className="absolute inset-0 bg-[#f4c400]/5 blur-[150px] rounded-full w-[80vw] h-[80vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-center mb-16">
          Client <span className="text-[#f4c400]">Feedback</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="bg-zinc-900/50 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:border-[#f4c400]/50 transition-colors duration-500 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-white/10 group-hover:border-[#f4c400] transition-colors" />
                <div>
                  <h4 className="font-bold text-lg">{t.name}</h4>
                  <p className="text-sm text-zinc-400">{t.role}</p>
                </div>
              </div>
              <p className="text-zinc-300 leading-relaxed font-medium">"{t.message}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
