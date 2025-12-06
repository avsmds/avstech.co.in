"use client";

import * as React from "react";
import {
  MapPin, // For Local Presence
  Package, // For "Complete Package"
  BrainCircuit, // For AI
  TrendingUp, // For ROI/Growth
  Factory, // For Industrial/Manufacturing focus
  ShieldCheck, // For Trust/Transparency
} from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Nashik Roots, Global Code",
    description:
      "We understand the local ecosystem—from Satpur to Ambad—while delivering software that meets international quality standards.",
  },
  {
    icon: Package,
    title: "The Complete Package",
    description: "Stop juggling vendors. We handle everything: Domain, Hosting, Design, Development, and Marketing in one unified ecosystem.",
  },
  {
    icon: BrainCircuit,
    title: "Future-Ready AI",
    description: "Don't just build for today. We integrate predictive analytics and machine learning to keep you ahead of the curve.",
  },
  {
    icon: TrendingUp,
    title: "ROI-Obsessed",
    description: "We don't chase vanity metrics like 'likes.' We chase qualified leads, sales, and measurable growth for your business.",
  },
  {
    icon: Factory,
    title: "Industrial Specialization",
    description: "Custom ERP and CRM solutions specifically engineered for manufacturers and logistics businesses moving away from spreadsheets.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Partnership",
    description: "No technical jargon or hidden costs. We function as your internal digital growth partner, not just an outsourced agency.",
  },
];

export function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="py-32 bg-background border-t border-border relative overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "4rem 4rem",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 max-w-3xl">
          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest mb-6 text-muted-foreground">
            <span className="h-[2px] w-12 bg-border"></span>
            The AVSTECH Advantage
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground mb-6 leading-[0.95]">
            Local Understanding. <br />
            <span className="text-primary">Global Intelligence.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            We bridge the gap between complex technology and real business growth. 
            Here is why businesses in Nashik and beyond trust us to build their digital future.
          </p>
        </div>

        <div className="grid md:grid-cols-3 border-t border-l border-border">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group border-b border-r border-border p-10 hover:bg-accent/50 transition-colors duration-300"
            >
              <div className="w-12 h-12 mb-6 flex items-center justify-center bg-secondary border border-border group-hover:border-primary/50 transition-colors rounded-md">
                <feature.icon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}