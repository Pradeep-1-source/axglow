import type { ServiceItem, PortfolioProject, TestimonialItem, ProcessStep, MetricItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'brand-identity',
    number: '01',
    title: 'Brand Identity & Logo Design',
    tagline: 'Forging Iconic Visual Legacies',
    description: 'We craft comprehensive brand visual architectures that transcend visual trends. From high-touch typography and dynamic mark design to custom brand guidelines, we position your business at the pinnacle of luxury and recognition.',
    features: ['Visual Architecture & Logo Mark', 'Typography Systems & Palette Design', 'Brand Guidelines & Tone Matrix', '3D Brand Assets & Motion Marks'],
    gradient: 'from-[#3BD8D9]/20 via-[#8A46BB]/10 to-transparent',
    accentColor: '#3BD8D9',
    illustrationType: 'branding',
  },
  {
    id: 'web-design-dev',
    number: '02',
    title: 'Website Design & Development',
    tagline: 'Immersive Digital Canvas Engineering',
    description: 'Bespoke web applications built with 60 FPS webGL animations, Lenis smooth scrolling, and bulletproof frontend engineering. We create Awwwards-caliber digital experiences that captivate users and drive conversion.',
    features: ['Awwwards-Grade Interactive Web Apps', 'GSAP & Three.js Shader Interactions', 'High-Performance Next.js / React', 'Mobile Motion Optimization'],
    gradient: 'from-[#8A46BB]/25 via-[#3BD8D9]/10 to-transparent',
    accentColor: '#8A46BB',
    illustrationType: 'web',
  },
  {
    id: 'ui-ux-design',
    number: '03',
    title: 'UI/UX Design',
    tagline: 'Intuitive Precision Meets Aesthetic Mastery',
    description: 'Transforming complex digital ecosystems into effortless, beautifully orchestrated user journeys. We blend deep cognitive ergonomics with sleek dark-mode micro-interactions.',
    features: ['Bespoke Product Architecture', 'Interactive High-Fidelity Prototypes', 'Design Systems & UI Kit Creation', 'Conversion & Ergonomic Optimization'],
    gradient: 'from-[#FF5D93]/20 via-[#3BD8D9]/15 to-transparent',
    accentColor: '#FF5D93',
    illustrationType: 'uiux',
  },
  {
    id: 'video-multimedia',
    number: '04',
    title: 'Video Editing & Multimedia',
    tagline: 'Cinematic Storytelling & Visual FX',
    description: 'High-production commercial video editing, 3D motion graphics, and audio design engineered to command attention. We bring brands to life with cinematic rhythm and breathtaking color grading.',
    features: ['Cinematic Brand Films & Trailers', '3D Motion Graphics & VFX', 'Commercial Color Grading', 'Spatial Audio & Sound Design'],
    gradient: 'from-[#3BD8D9]/20 via-[#FF5D93]/15 to-transparent',
    accentColor: '#3BD8D9',
    illustrationType: 'video',
  },
  {
    id: 'digital-marketing',
    number: '05',
    title: 'Digital Marketing',
    tagline: 'Precision Brand Elevation & Growth Engine',
    description: 'Data-informed creative campaigns designed to scale ultra-luxury and forward-thinking technology brands. We merge high-art content with performance marketing to dominate target markets.',
    features: ['Omnichannel Growth Strategy', 'High-ROAS Creative Ad Production', 'Influencer & Luxury PR Campaigns', 'Search Supremacy & Content Engine'],
    gradient: 'from-[#8A46BB]/20 via-[#FF5D93]/20 to-transparent',
    accentColor: '#8A46BB',
    illustrationType: 'marketing',
  },
];

export const PORTFOLIO_DATA: PortfolioProject[] = [
  {
    id: 'valkyrie-hypercars',
    title: 'Valkyrie Hypercar Digital Reveal',
    category: '3D Web & Brand Experience',
    year: '2025',
    client: 'Valkyrie Motors UK',
    description: 'An interactive 3D WebGL vehicle customizer and digital launch platform for a multi-million dollar electric hypercar.',
    challenge: 'Deliver 60 FPS interactive 3D car rendering with seamless lighting transitions while ensuring sub-second initial load times across global devices.',
    solution: 'Engineered a lightweight custom GLTF pipeline combined with GSAP scroll triggers and dynamic environment light baking.',
    results: ['2.4M Exclusive Visitors in 72 Hours', 'Awwwards Site of the Month', '+340% Pre-Order Inquiries'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'
    ],
    accentGlow: '#3BD8D9',
    link: '#',
    tags: ['WebGL', 'GSAP', 'Brand Identity', 'Interactive 3D']
  },
  {
    id: 'aetheria-luxury-wear',
    title: 'Aetheria Haute Couture',
    category: 'E-Commerce & Digital Identity',
    year: '2025',
    client: 'Aetheria Paris',
    description: 'Full brand re-imagination and immersive editorial e-commerce platform for a Parisian high-fashion house.',
    challenge: 'Refine a centuries-old heritage house into a cutting-edge futuristic digital storefront without losing brand prestige.',
    solution: 'Designed fluid editorial layouts, custom variable typography, and seamless video hero transitions.',
    results: ['$18.5M Online Revenue First Quarter', '+180% Average Session Duration', 'Global Design Excellence Award'],
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop'
    ],
    accentGlow: '#8A46BB',
    link: '#',
    tags: ['Luxury E-Commerce', 'Brand Identity', 'Editorial Design']
  },
  {
    id: 'chronos-quant-ai',
    title: 'Chronos Neural Trading Terminal',
    category: 'UI/UX Design & Product Strategy',
    year: '2024',
    client: 'Chronos Financial Zurich',
    description: 'Ultra-low latency institutional trading interface with real-time AI predictive analytics and dark-mode data visualization.',
    challenge: 'Render thousands of live tick data points simultaneously without micro-stuttering or user visual fatigue.',
    solution: 'Crafted a GPU-accelerated canvas chart architecture coupled with dynamic ergonomic dark mode color spectrums.',
    results: ['Adopted by 40+ Tier-1 Hedge Funds', 'Zero Interface Latency Bottlenecks', 'FWA Of The Day Winner'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop'
    ],
    accentGlow: '#FF5D93',
    link: '#',
    tags: ['UI/UX Product', 'AI Visualization', 'Fintech', 'Design System']
  },
  {
    id: 'solaris-spatial-audio',
    title: 'Solaris Spatial Audio System',
    category: 'Video Production & Sound Architecture',
    year: '2024',
    client: 'Solaris Acoustics Tokyo',
    description: 'Cinematic brand documentary film, spatial audio launch experience, and interactive product ecosystem visualizer.',
    challenge: 'Express abstract acoustics and acoustic physics in a visually mesmerizing, tangible medium.',
    solution: 'Produced 8K high-speed macro cinematography combined with procedural fluid dynamics visual effects.',
    results: ['14M Organic Views Across Channels', 'Red Dot Design Award Best of Best', 'Sold Out Initial Product Run'],
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1600&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop'
    ],
    accentGlow: '#3BD8D9',
    link: '#',
    tags: ['Video Production', 'Spatial Audio', '3D Motion', 'Brand Film']
  },
  {
    id: 'nebula-meta-real-estate',
    title: 'Nebula Architectural Sanctum',
    category: 'Full Digital Ecosystem',
    year: '2024',
    client: 'Nebula Group Dubai',
    description: 'An exclusive digital portal showcasing ultra-luxury architectural estates across Dubai and Monaco.',
    challenge: 'Capture the grandeur of $50M+ private estates for ultra-high-net-worth global buyers online.',
    solution: 'Built an interactive virtual walkthrough engine with dynamic daylight shaders and custom concierge scheduling.',
    results: ['$140M Real Estate Inquiries Generated', 'CSSDA Website of the Year Nominee'],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop'
    ],
    accentGlow: '#8A46BB',
    link: '#',
    tags: ['Real Estate', 'Virtual Reality', 'Web Development', 'Concierge UI']
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Discover',
    subtitle: 'Deep Brand Immersion & Audit',
    description: 'We deconstruct your market footprint, brand ethos, competitors, and aspirations. We listen, analyze data, and uncover the core catalyst that sets your brand apart.',
    deliverables: ['Brand Essence Blueprint', 'Competitive Landscape Matrix', 'Audience Psychology Map']
  },
  {
    step: '02',
    title: 'Research',
    subtitle: 'Market Intelligence & Technical Scoping',
    description: 'Synthesizing creative direction with emerging technology trends, interactive possibilities, and user behavioral science to establish a bulletproof execution plan.',
    deliverables: ['Creative Direction Concepts', 'Technical Architecture Stack', 'Interactive Moodboards']
  },
  {
    step: '03',
    title: 'Strategy',
    subtitle: 'Bespoke Brand & Digital Roadmap',
    description: 'Architecting the user journey, visual identity matrix, interaction language, and content narrative into a cohesive, high-impact strategic blueprint.',
    deliverables: ['Full Experience Wireframes', 'Content Architecture', 'Motion & Interaction Spec']
  },
  {
    step: '04',
    title: 'Design',
    subtitle: 'Aesthetic Mastery & Prototype Motion',
    description: 'Crafting pixel-perfect interface visuals, bespoke typography, 3D elements, and interactive high-fidelity prototypes that leave a lasting impression.',
    deliverables: ['High-Fidelity Interface System', '3D Visual Assets & Icons', 'Interactive Prototype']
  },
  {
    step: '05',
    title: 'Develop',
    subtitle: '60 FPS Frontend Engineering & Shaders',
    description: 'Transforming approved designs into lightning-fast, ultra-smooth code using modern React, GSAP animations, Lenis scroll integration, and WebGL lighting.',
    deliverables: ['Production-Grade React Build', 'Smooth Motion Controls', 'Cross-Device Responsiveness']
  },
  {
    step: '06',
    title: 'Launch',
    subtitle: 'Global Deployment & Ongoing Supremacy',
    description: 'Orchestrating a flawless digital launch, performance optimization, global CDN distribution, and continuous creative elevation to keep your brand rising.',
    deliverables: ['SEO & Performance Tuning', 'Global CDN Deployment', 'Post-Launch Analytics & Support']
  }
];

export const WHY_CHOOSE_US_ITEMS = [
  {
    title: 'Premium Design',
    desc: 'Uncompromising luxury aesthetics engineered to command high-end market presence.',
    iconName: 'Crown'
  },
  {
    title: 'Custom Strategy',
    desc: 'Bespoke roadmaps built around your unique market advantages, never generic templates.',
    iconName: 'Compass'
  },
  {
    title: 'Responsive Development',
    desc: 'Flawless 60 FPS performance across desktop screens, tablets, and mobile displays.',
    iconName: 'Cpu'
  },
  {
    title: 'Creative Branding',
    desc: 'Memorable brand identity visual systems that resonate with global audiences.',
    iconName: 'Sparkles'
  },
  {
    title: 'Video Production',
    desc: 'Cinematic brand films, motion graphics, and high-impact commercial visual effects.',
    iconName: 'Video'
  },
  {
    title: 'Digital Marketing',
    desc: 'Precision target acquisition campaigns that drive high-value client conversion.',
    iconName: 'TrendingUp'
  },
  {
    title: 'Collaborative Workflow',
    desc: 'Transparent executive communication, rapid iteration sprints, and dedicated stewardship.',
    iconName: 'Users'
  }
];

export const METRICS_DATA: MetricItem[] = [
  {
    value: 120,
    suffix: '+',
    label: 'Brands Elevated',
    subtext: 'Global visionaries empowered across tech, luxury & fashion.'
  },
  {
    value: 350,
    suffix: '+',
    label: 'Projects Delivered',
    subtext: 'Awwwards, FWA & CSSDA recognized digital masterworks.'
  },
  {
    value: 8,
    suffix: '+',
    label: 'Years of Excellence',
    subtext: 'Pioneering interactive design & digital motion philosophy.'
  },
  {
    value: 99.4,
    suffix: '%',
    label: 'Client Satisfaction',
    subtext: 'Unbroken track record of extraordinary results and trust.'
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 't1',
    quote: 'AglowX redefined how our hypercar brand is perceived globally. Their attention to motion detail and 3D web presentation is unmatched.',
    clientName: 'Alexander Vance',
    role: 'Chief Brand Officer',
    company: 'Valkyrie Motors UK',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    rating: 5,
    highlight: 'Awwwards Site of the Month'
  },
  {
    id: 't2',
    quote: 'The team at AglowX possesses a rare blend of high-fashion artistic sensibility and deep engineering brilliance. Our revenue doubled post-rebrand.',
    clientName: 'Elena Rostova',
    role: 'Creative Director',
    company: 'Aetheria Haute Couture Paris',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    rating: 5,
    highlight: '+$18.5M Quarter Growth'
  },
  {
    id: 't3',
    quote: 'From custom Lenis smooth scroll to the neural trading UI design, working with AglowX felt like crafting the future of fintech.',
    clientName: 'Dr. Marcus Thorne',
    role: 'Managing Partner',
    company: 'Chronos Quant Zurich',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    rating: 5,
    highlight: 'FWA Winner'
  },
  {
    id: 't4',
    quote: 'AglowX does not just deliver websites; they craft immersive digital universes. Their process, communication, and polish are world class.',
    clientName: 'Sophia Lin',
    role: 'VP of Marketing',
    company: 'Solaris Acoustics Tokyo',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    rating: 5,
    highlight: '14M Organic Reach'
  }
];
