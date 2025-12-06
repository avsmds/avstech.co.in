"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowDown, MoveRight, Sparkles } from "lucide-react";
import Image from "next/image";

// Updated SLIDES content for AVSTECH
const SLIDES = [
  {
    id: 1,
    phase: "Phase 01: The Foundation",
    title: "SCALABLE DEVELOPMENT",
    description:
      "We don't just write code; we build businesses. From custom MERN stack web apps to high-performance native mobile solutions, we craft the digital backbone of your success.",
    // Image: Coding/Tech setup
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    cssVar: "--foreground",
  },
  {
    id: 2,
    phase: "Phase 02: The Growth",
    title: "PRECISION MARKETING",
    description:
      "Dominate the digital landscape. We turn 'likes' into leads with data-driven SEO, targeted performance campaigns, and a complete online presence strategy.",
    // Image: Analytics/Data/Abstract Connectivity
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    cssVar: "--primary",
  },
  {
    id: 3,
    phase: "Phase 03: The Future",
    title: "INTELLIGENCE & AI",
    description:
      "Innovating today, intelligence for tomorrow. Empowering industries with predictive analytics, machine learning, and automated solutions for a smarter future.",
    // Image: AI/Futuristic/Abstract
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
    cssVar: "--chart-3",
  },
];

function MobileHero() {
  return (
    <div className="xl:hidden w-full h-[100dvh] bg-background">
      <div className="w-full h-full relative">
        <Carousel 
          className="h-full w-full"
          opts={{ loop: true }} 
        >
          <CarouselContent className="h-full -ml-0">
            {SLIDES.map((slide) => (
              <CarouselItem 
                key={slide.id} 
                className="h-[100dvh] w-full relative pl-0"
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50" />

                <div className="absolute bottom-20 left-6 right-6 text-white space-y-4 z-10">
                  <div 
                    className="text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: `var(${slide.cssVar})` }} 
                  >
                    {slide.phase}
                  </div>
                  <h1 className="text-4xl font-black drop-shadow-md leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-base opacity-90 line-clamp-3">
                    {slide.description}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

export function DesktopHeroSlider() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !api) return;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const scrolled = -rect.top;
      const scrollableDistance = rect.height - window.innerHeight;

      if (scrollableDistance <= 0) return;

      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      const targetSlide = Math.min(
        SLIDES.length - 1,
        Math.floor(progress * SLIDES.length),
      );

      if (targetSlide !== currentSlide) {
        api.scrollTo(targetSlide);
        setCurrentSlide(targetSlide);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [api, currentSlide]);

  return (
    <div
      ref={containerRef}
      className="hidden xl:block relative h-[300vh] w-full bg-background z-10"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        <Carousel
          setApi={setApi}
          className="w-full h-full relative"
          opts={{ loop: false, watchDrag: false, duration: 60 }}
        >
          <CarouselContent className="absolute inset-0 h-full w-full flex -ml-0">
            {SLIDES.map((slide, index) => (
              <CarouselItem
                key={slide.id}
                className="h-full w-full basis-full flex-shrink-0 min-w-full pl-0 relative"
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-background/40 transition-colors duration-500" />
                </div>

                <div className="relative z-10 w-full h-full flex flex-col justify-center items-start md:items-end px-6 md:pr-24">
                  {/* Content Card */}
                  <div
                    className={`w-full max-w-2xl p-8 md:p-12 border-l-4 shadow-2xl backdrop-blur-xl
                      bg-card/85
                      text-card-foreground
                      transition-all duration-1000
                      ${
                        currentSlide === index
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-10"
                      }
                    `}
                    style={{
                      borderLeftColor: `var(${slide.cssVar})`,
                    }}
                  >
                    {/* Phase Indicator */}
                    <div
                      className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest mb-5"
                      style={{ color: `var(${slide.cssVar})` }}
                    >
                      <span
                        className="h-[2px] w-10"
                        style={{ backgroundColor: `var(${slide.cssVar})` }}
                      ></span>
                      {slide.phase}
                    </div>

                    <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9] drop-shadow-sm text-foreground">
                      {slide.title}
                    </h1>

                    <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed mb-8">
                      {slide.description}
                    </p>

                    {index === SLIDES.length - 1 ? (
                      <Button
                        size="lg"
                        className="w-full md:w-auto text-lg h-14 px-8 rounded-none border-0
                          bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Start Your Project <Sparkles className="ml-2 h-5 w-5" />
                      </Button>
                    ) : (
                      <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                        Scroll to explore{" "}
                        <ArrowDown className="animate-bounce h-4 w-4" />
                      </div>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

export function HeroSlider() {
  return (
    <section className="w-full relative bg-background">
      <MobileHero />
      <DesktopHeroSlider />
    </section>
  );
}