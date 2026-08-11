export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  gradient: string;
  accentColor: string;
  illustrationType: 'branding' | 'web' | 'uiux' | 'video' | 'marketing';
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  year: string;
  client: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  secondaryImages: string[];
  accentGlow: string;
  link: string;
  tags: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  clientName: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  highlight: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export interface MetricItem {
  value: number;
  suffix: string;
  label: string;
  subtext: string;
}
