"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: 1,
    title: "MIDC Smart-Manufacturing ERP",
    subtitle: "Industrial Automation System",
    category: "Custom Software",
    description:
      "A bespoke ERP solution designed for a leading auto-component manufacturer in Satpur MIDC. We replaced legacy Excel workflows with real-time inventory tracking, production scheduling, and automated QC reporting.",
    // Image: Industrial/Factory Dashboard
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80",
    year: "2024",
    client: "Apex Industries",
    metrics: [
      { label: "Efficiency", value: "+45%" },
      { label: "Paperwork", value: "-90%" },
      { label: "Shift", value: "Satpur" },
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "IoT"],
    accentColor: "bg-blue-500",
  },
  {
    id: 2,
    title: "Agro-Export Quality AI",
    subtitle: "Computer Vision Grading",
    category: "AI & Machine Learning",
    description:
      "An AI-powered quality control system for a Nashik-based grape exporter. Using computer vision, the system automatically grades fruit quality, detects defects, and predicts shelf-life for international shipments.",
    // Image: Agriculture/Tech/Data
    image:
      "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    year: "2023",
    client: "GreenLeaf Exports",
    metrics: [
      { label: "Speed", value: "3x Faster" },
      { label: "Accuracy", value: "98.5%" },
      { label: "Rejections", value: "-25%" },
    ],
    technologies: ["Python", "TensorFlow", "OpenCV", "AWS"],
    accentColor: "bg-green-500",
  },
];

// --- Mobile/Tablet Layout (Standard Stack) ---
function MobileProjectsLayout() {
  return (
    <div className="xl:hidden bg-background py-20 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 text-muted-foreground">
            <span className="h-[2px] w-8 bg-border"></span>
            Case Studies
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tighter text-foreground leading-tight">
            Built in Nashik,<br />
            Deployed for Success.
          </h2>
        </div>

        <div className="space-y-16">
          {projects.map((project) => (
            <div key={project.id} className="group">
              {/* Image Card */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border mb-8 shadow-sm">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1280px) 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                   <span className="px-3 py-1 bg-background/90 backdrop-blur-md text-xs font-bold uppercase tracking-wider rounded-full">
                      {project.year}
                   </span>
                </div>
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest mb-3 text-muted-foreground">
                  <span className={cn("h-[2px] w-6 rounded-full", project.accentColor)} />
                  {project.category}
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-black text-foreground mb-2 leading-tight">
                  {project.title}
                </h3>
                <p className="text-lg text-muted-foreground font-medium mb-4">
                    {project.subtitle}
                </p>
                <p className="text-foreground/80 leading-relaxed mb-6 max-w-2xl">
                  {project.description}
                </p>

                {/* Metrics Grid - Mobile */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="bg-card border border-border p-3 rounded-lg text-center">
                      <div className="text-lg font-black text-foreground">{m.value}</div>
                      <div className="text-[10px] text-muted-foreground uppercase">{m.label}</div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="group/btn w-full sm:w-auto">
                  Read Full Story <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
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
function DesktopProjectsLayout() {
  const [currentProject, setCurrentProject] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // 250vh per project for comfortable scroll speed
  const scrollHeight = `${projects.length * 250}vh`;

  React.useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const scrolled = -rect.top;
      const scrollableDistance = rect.height - window.innerHeight;

      if (scrollableDistance <= 0) return;

      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      
      const projectIndex = Math.min(
        projects.length - 1,
        Math.floor(progress * projects.length)
      );
      setCurrentProject(projectIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="projects"
      ref={containerRef}
      className="hidden xl:block relative bg-background text-foreground"
      style={{ height: scrollHeight }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        
        {/* Background Images Layer */}
        <div className="absolute inset-0 z-0">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
              style={{ opacity: currentProject === index ? 1 : 0 }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                quality={100}
                priority={index === 0}
              />
              {/* Gradients for readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
          ))}
        </div>

        {/* Content Layer */}
        <div className="relative z-10 h-full w-full">
          <div className="container mx-auto px-8 max-w-7xl h-full">
            <div className="grid grid-cols-12 gap-12 w-full h-full items-center">
              
              {/* Text Content Area */}
              <div className="col-span-6 relative h-full flex flex-col justify-center">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="absolute top-0 left-0 w-full h-full flex flex-col justify-center transition-all duration-700 ease-out"
                    style={{
                      opacity: currentProject === index ? 1 : 0,
                      transform: `translateY(${currentProject === index ? 0 : 40}px)`,
                      pointerEvents: currentProject === index ? "auto" : "none",
                    }}
                  >
                    {/* Glass Panel */}
                    <div className="backdrop-blur-md bg-background/40 border border-white/10 p-8 rounded-3xl shadow-2xl">
                        <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest mb-6 text-muted-foreground">
                        <span
                            className={cn("h-[3px] w-8 rounded-full", project.accentColor)}
                        ></span>
                        {project.category}
                        </div>

                        <h2 className="text-5xl xl:text-6xl font-black tracking-tighter text-foreground mb-4 leading-[0.95]">
                        {project.title}
                        </h2>
                        
                        <p className="text-xl text-foreground/90 font-medium tracking-wide mb-6">
                        {project.subtitle}
                        </p>
                        
                        <p className="text-muted-foreground leading-relaxed mb-8 text-base max-w-xl">
                        {project.description}
                        </p>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                        {project.metrics.map((m) => (
                            <div
                            key={m.label}
                            className="bg-background/60 backdrop-blur-sm border border-white/10 p-4 rounded-xl"
                            >
                            <div className="text-2xl font-black text-foreground">
                                {m.value}
                            </div>
                            <div className="text-[10px] text-muted-foreground uppercase mt-1 font-bold tracking-wider">
                                {m.label}
                            </div>
                            </div>
                        ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <Button
                            size="lg"
                            className="bg-foreground text-background hover:bg-foreground/90 h-14 px-8 font-bold shadow-lg"
                            >
                            View Case Study <ExternalLink className="ml-2 w-5 h-5" />
                            </Button>
                            <div className="text-sm font-mono text-muted-foreground bg-background/50 px-3 py-1 rounded-md border border-white/10">
                                {project.client} / {project.year}
                            </div>
                        </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Side - Empty for visual balance */}
              <div className="col-span-6" />
            </div>
          </div>
        </div>

        {/* Project Counter */}
        <div className="absolute top-32 right-12 z-20">
            <div className="flex flex-col items-end gap-2">
                <div className="text-6xl font-black text-foreground/10">
                    {String(currentProject + 1).padStart(2, "0")}
                </div>
                <div className="h-[2px] w-12 bg-foreground/20" />
                <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                    Featured Project
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}

export function FeaturedProjects() {
  return (
    <section>
      <MobileProjectsLayout />
      <DesktopProjectsLayout />
    </section>
  );
}