'use client';
import { ZoomParallax } from "@/components/ui/zoom-parallax";

export default function ZoomParallaxDemo() {
	const serviceImages = [
		{
			// Image 0 (Center Focus): UI/UX Design System
			src: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1600&q=80',
			alt: 'UI/UX Interface & Experience Design',
		},
		{
			// Image 1: Website Development & Coding
			src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80',
			alt: 'Modern Website Development & Architecture',
		},
		{
			// Image 2: Digital Marketing & Growth Analytics
			src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
			alt: 'Digital Marketing & Strategy Dashboards',
		},
		{
			// Image 3: Creative Video & Image Editing Production
			src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80',
			alt: 'Professional Image & Video Editing Studio',
		},
		{
			// Image 4: Mobile App UI/UX Design
			src: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?w=1200&q=80',
			alt: 'Mobile App Interface & Component System',
		},
		{
			// Image 5: Full-Stack Web Development Workspace
			src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80',
			alt: 'Frontend & Backend Web Development',
		},
		{
			// Image 6: Digital Marketing Campaign & Content
			src: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200&q=80',
			alt: 'Brand Strategy & Digital Growth Marketing',
		},
	];

	return (
		<section id="zoom-parallax-showcase" className="w-full bg-black relative">
			{/* Clean, seamless transition directly below NewHero without circular radius artifacts */}
			<ZoomParallax images={serviceImages} />
		</section>
	);
}
