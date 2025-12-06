"use client";

import * as React from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "AVSTECH Inc transformed our legacy systems into a modern, scalable platform. Their expertise in cloud architecture is unmatched.",
    author: "Sarah Chen",
    role: "CTO, TechCorp Global",
  },
  {
    text: "The digital marketing strategy they crafted tripled our online revenue. Their data-driven approach sets them apart.",
    author: "Michael Rodriguez",
    role: "VP Marketing, GrowthHub",
  },
  {
    text: "Their AI solutions gave us insights we never thought possible. The analytics platform is now central to our decision making.",
    author: "Emily Watson",
    role: "CEO, DataFlow",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-32 bg-background border-t border-border transition-colors duration-300"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest mb-16 text-muted-foreground">
          <span className="h-[2px] w-12 bg-border"></span>
          Client Testimonials
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-card border border-border p-8 backdrop-blur-sm relative shadow-sm transition-colors duration-300"
            >
              {/* Quote Icon - Subtle accent color */}
              <Quote className="w-10 h-10 text-muted mb-6" />

              <p className="text-card-foreground/90 text-lg leading-relaxed mb-8">
                {t.text}
              </p>

              <div>
                <div className="text-card-foreground font-bold">{t.author}</div>
                <div className="text-muted-foreground text-sm uppercase tracking-wider">
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
