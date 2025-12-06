"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail, Phone, MapPin, Send } from "lucide-react";

export function CTASection() {
  return (
    <section
      id="contact"
      className="relative min-h-screen bg-background overflow-hidden py-20 flex items-center transition-colors duration-300"
    >
      {/* Animated Grid Background - Uses theme border color */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)`,
          backgroundSize: "4rem 4rem",
        }}
      />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div>
            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest mb-6 text-muted-foreground">
              <span className="h-[2px] w-12 bg-border"></span>
              Lets Talk
            </div>

            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground mb-6 leading-[0.95]">
              Start Your <br />
              Next Project
            </h2>

            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Transform your vision into reality. Our team of experts is ready
              to discuss your project and provide tailored solutions.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:AVSTECHinc@gmail.com"
                className="flex items-center gap-4 p-4 bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all group rounded-sm"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-background border border-border rounded-sm">
                  <Mail className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Email
                  </div>
                  <div className="text-foreground font-semibold">
                    AVSTECHinc@gmail.com
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="tel:+917058351255"
                className="flex items-center gap-4 p-4 bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all group rounded-sm"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-background border border-border rounded-sm">
                  <Phone className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Phone
                  </div>
                  <div className="text-foreground font-semibold">
                    +91 7058351255
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-card border border-border p-8 md:p-12 relative overflow-hidden shadow-sm rounded-lg">
            <h3 className="text-3xl font-black text-card-foreground mb-2 tracking-tight">
              Get Started Today
            </h3>
            <p className="text-muted-foreground mb-8">
              Fill out the form below and well get back to you within 24 hours.
            </p>

            <form className="space-y-6">
              <div>
                <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <Input
                  className="bg-background border-input text-foreground placeholder:text-muted-foreground/50 focus:border-primary h-12 rounded-sm"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <Input
                  className="bg-background border-input text-foreground placeholder:text-muted-foreground/50 focus:border-primary h-12 rounded-sm"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Project Details
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-background border border-input text-foreground p-4 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50 resize-none rounded-sm text-sm"
                  placeholder="Tell us about your project..."
                />
              </div>

              <Button
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg font-bold rounded-sm shadow-md"
              >
                Send Message <Send className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
