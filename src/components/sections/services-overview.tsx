"use client";

import * as React from "react";
import {
  Code2,
  BrainCircuit, // Changed from LineChart for better AI relevance
  Megaphone,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

const services = [
  {
    id: 1,
    icon: Code2,
    title: "Software & ERP Solutions",
    subtitle: "The Core: Engineering",
    description:
      "We build the digital backbone of your business. From custom MERN stack web apps to industrial ERPs tailored for Nashik's manufacturing sectors.",
    // Image: Modern coding/office setup
    image:
      "https://images.unsplash.com/photo-1605629921711-2f6b00c6bbf4?w=1920&q=80",
    features: [
      "Custom MERN/MEAN Apps",
      "Native Mobile (iOS/Kotlin)",
      "Cross-Platform (Flutter)",
      "Industrial ERP & CRM Tools",
      "eCommerce (Shopify/Magento)",
      "Legacy Modernization",
    ],
    technologies: ["React", "Node.js", "Flutter", "MongoDB", "AWS", "Swift"],
    stats: [
      { label: "Delivery", value: "100%" },
      { label: "Scalability", value: "Enterprise" },
      { label: "Security", value: "Bank-Grade" },
    ],
    accentColor: "bg-blue-500",
  },
  {
    id: 2,
    icon: Megaphone,
    title: "Digital Growth & SEO",
    subtitle: "The Service Layer: Growth",
    description:
      "We don't just launch websites; we launch businesses. Our 'Complete Online Presence Package' ensures you dominate local 'Near Me' searches and global markets.",
    // Image: Marketing strategy/Growth
    image:
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1920&q=80",
    features: [
      "Local SEO ('Near Me' Domination)",
      "Complete Online Presence Pkg",
      "Social Media Management",
      "Performance Marketing (PPC)",
      "Brand Identity Design",
      "Lead Generation Funnels",
    ],
    technologies: [
      "Google Ads",
      "Meta Business",
      "GA4",
      "SEMrush",
      "WordPress",
      "HubSpot",
    ],
    stats: [
      { label: "Avg ROI", value: "320%" },
      { label: "Ranking", value: "Top 3" },
      { label: "Setup Time", value: "7 Days" },
    ],
    accentColor: "bg-rose-500",
  },
  {
    id: 3,
    icon: BrainCircuit,
    title: "AI & Future Tech",
    subtitle: "The Expansion: Innovation",
    description:
      "Future-proofing local industries. We implement predictive analytics and intelligent chatbots to automate processes and predict maintenance needs.",
    // Image: AI/Futuristic/Abstract
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&q=80",
    features: [
      "AI Customer Support Bots",
      "Predictive Maintenance Analytics",
      "Computer Vision for QC",
      "Data Mining & Insights",
      "Process Automation",
      "Smart Algorithms",
    ],
    technologies: [
      "Python",
      "TensorFlow",
      "OpenAI API",
      "PyTorch",
      "Computer Vision",
      "NLP",
    ],
    stats: [
      { label: "Efficiency", value: "+40%" },
      { label: "Accuracy", value: "99%" },
      { label: "Response", value: "Instant" },
    ],
    accentColor: "bg-violet-500",
  },
];

// --- Mobile/Tablet Layout (Vertical Stack) ---
function VerticalServicesLayout() {
  return (
    <div className="xl:hidden bg-background py-24 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 text-muted-foreground">
            <span className="h-[2px] w-8 bg-border"></span>
            Our Expertise
            <span className="h-[2px] w-8 bg-border"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tighter text-foreground mb-4">
            Services
          </h2>
        </div>

        <div className="space-y-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative bg-card border border-border overflow-hidden rounded-2xl shadow-sm"
            >
              {/* Image Header */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <div className="absolute top-4 left-4 w-12 h-12 flex items-center justify-center border border-border bg-background/90 backdrop-blur-md rounded-xl shadow-sm">
                  <service.icon className="w-6 h-6 text-foreground" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3 text-muted-foreground">
                  <span
                    className={`h-[2px] w-6 ${service.accentColor}`}
                  ></span>
                  {service.subtitle}
                </div>
                <h3 className="text-2xl font-black text-card-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Mini Stats for Mobile */}
                <div className="grid grid-cols-3 gap-2 py-4 mb-6 border-y border-border/50">
                    {service.stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                             <div className="text-lg font-bold text-foreground">{stat.value}</div>
                             <div className="text-[10px] text-muted-foreground uppercase">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <Button className="w-full sm:w-auto" variant="outline">
                  View Details <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Desktop Scrollytelling Layout ---
function DesktopScrollyLayout() {
  const [currentService, setCurrentService] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Dynamic scroll height
  const scrollHeight = `${services.length * 250}vh`;

  React.useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const scrolled = -rect.top;
      const scrollableDistance = rect.height - window.innerHeight;

      if (scrollableDistance <= 0) return;

      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      
      const serviceIndex = Math.min(
        services.length - 1,
        Math.floor(progress * services.length)
      );
      setCurrentService(serviceIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="hidden xl:block relative bg-background"
      style={{ height: scrollHeight }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="absolute inset-0 transition-all duration-1000 ease-in-out"
              style={{
                opacity: currentService === index ? 1 : 0,
                transform: currentService === index ? "scale(1.05)" : "scale(1)",
              }}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                priority={index === 0}
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
          ))}
        </div>

        {/* Decorative Grid */}
        <div
          className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "4rem 4rem",
          }}
        />

        {/* Main Content Grid */}
        <div className="relative z-10 h-full w-full flex items-center">
          <div className="container mx-auto px-8 h-full">
            <div className="grid grid-cols-12 gap-12 h-full items-center">
              
              {/* LEFT COLUMN: Text Content */}
              <div className="col-span-5 relative h-full max-h-[600px] flex flex-col justify-center pb-24">
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    className="absolute top-0 left-0 w-full h-full flex flex-col justify-center transition-all duration-700 ease-out"
                    style={{
                      opacity: currentService === index ? 1 : 0,
                      transform: `translateY(${
                        currentService === index ? 0 : 40
                      }px)`,
                      pointerEvents: currentService === index ? "auto" : "none",
                    }}
                  >
                    <div className="w-16 h-16 mb-8 flex items-center justify-center border border-border bg-card/30 backdrop-blur-md rounded-2xl shadow-sm">
                      <service.icon className="w-8 h-8 text-foreground" />
                    </div>

                    <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest mb-6 text-muted-foreground">
                      <span className={cn("h-[3px] w-8 rounded-full", service.accentColor)}></span>
                      {service.subtitle}
                    </div>

                    <h2 className="text-5xl xl:text-6xl font-black tracking-tighter text-foreground mb-6 leading-tight">
                      {service.title}
                    </h2>

                    <p className="text-xl text-muted-foreground font-light leading-relaxed mb-10 max-w-lg">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* RIGHT COLUMN: Feature Cards */}
              <div className="col-span-7 relative h-full max-h-[600px] flex flex-col justify-center items-end pb-24">
                {services.map((service, index) => (
                  <div
                    key={`details-${service.id}`}
                    className="absolute w-full max-w-xl transition-all duration-700 ease-out delay-100"
                    style={{
                      opacity: currentService === index ? 1 : 0,
                      transform: `translateX(${
                        currentService === index ? 0 : 40
                      }px)`,
                      pointerEvents: currentService === index ? "auto" : "none",
                    }}
                  >
                    {/* Glass Card */}
                    <div className="bg-card/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                        
                        {/* Features List */}
                        <div className="mb-8">
                            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6 border-b border-white/10 pb-2">
                                Capabilities
                            </h3>
                            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                {service.features.map((feature) => (
                                <div key={feature} className="flex items-start gap-3">
                                    <CheckCircle2 className={cn("w-5 h-5 shrink-0 mt-0.5", service.accentColor.replace('bg-', 'text-'))} />
                                    <span className="text-sm font-medium text-foreground/90">{feature}</span>
                                </div>
                                ))}
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-3 gap-4 p-4 bg-background/40 rounded-xl border border-white/5">
                             {service.stats.map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <div className="text-2xl font-black text-foreground">{stat.value}</div>
                                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                                </div>
                             ))}
                        </div>

                        {/* Tech Tags */}
                        <div className="mt-8 flex flex-wrap gap-2">
                             {service.technologies.map(tech => (
                                 <span key={tech} className="px-3 py-1 rounded-full bg-background/50 border border-white/10 text-xs font-medium text-muted-foreground">
                                     {tech}
                                 </span>
                             ))}
                        </div>

                        {/* CTA Button */}
                        <div className="mt-8 pt-6 border-t border-white/10">
                            <Button
                            size="lg"
                            className="w-full h-14 px-8 text-base font-bold shadow-lg transition-transform hover:translate-x-1"
                            >
                            Start Project <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Indicators */}
          <div className="absolute bottom-10 left-0 w-full px-8 z-50">
            <div className="container mx-auto max-w-7xl">
                <div className="flex items-center gap-4">
                    {services.map((service, index) => (
                    <button
                        key={`nav-${service.id}`}
                        onClick={() => setCurrentService(index)}
                        className="group flex-1 h-2 rounded-full bg-muted/30 overflow-hidden transition-all hover:bg-muted/50 focus:outline-none"
                    >
                        <div
                        className={cn("h-full w-full origin-left transition-transform duration-500 ease-out", service.accentColor)}
                        style={{
                            transform: currentService === index ? "scaleX(1)" : "scaleX(0)",
                        }}
                        />
                    </button>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServicesOverview() {
  return (
    <section id="services" className="w-full bg-background relative">
      <VerticalServicesLayout />
      <DesktopScrollyLayout />
    </section>
  );
}