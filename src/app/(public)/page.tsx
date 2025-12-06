"use client";

import { HeroSlider } from "@/components/sections/heroslider";
import { ServicesOverview } from "@/components/sections/services-overview";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Testimonials } from "@/components/sections/testimonials";
import { CTASection } from "@/components/sections/cta-section";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  // No useState, no useEffect, no scroll listeners. 
  // Just the content.
  return (
    <div className="relative w-full">
      <HeroSlider />
      <div className="relative z-20 bg-background">
        <ServicesOverview />
        <WhyChooseUs />
        <FeaturedProjects />
        <Testimonials />
        <CTASection />
      </div>
      <Footer />
    </div>
  );
}