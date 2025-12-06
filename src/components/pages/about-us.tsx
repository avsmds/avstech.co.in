"use client";

import Image from "next/image";
import { Linkedin, Twitter } from "lucide-react";

const team = [
  { name: "Alex Vossen", role: "Chief Executive Officer", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80" },
  { name: "Sarah Chen", role: "CTO & Engineering", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" },
  { name: "Marcus Reid", role: "Head of Product", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80" },
  { name: "Elena Rodriguez", role: "Design Director", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80" },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-20 border-b border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest mb-6 text-muted-foreground">
            <span className="h-[2px] w-12 bg-border"></span>
            Who We Are
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.9] mb-12">
            ENGINEERING <br />
            THE FUTURE.
          </h1>
          <div className="grid md:grid-cols-2 gap-12">
            <p className="text-2xl text-muted-foreground font-light leading-relaxed">
              AVSTECH is a collective of visionaries, engineers, and designers dedicated to solving the world's most complex digital challenges.
            </p>
            <div className="grid grid-cols-2 gap-8">
               <div>
                 <div className="text-4xl font-black text-foreground">10+</div>
                 <div className="text-sm uppercase tracking-widest text-muted-foreground mt-1">Years Experience</div>
               </div>
               <div>
                 <div className="text-4xl font-black text-foreground">500+</div>
                 <div className="text-sm uppercase tracking-widest text-muted-foreground mt-1">Projects Delivered</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="mb-12">
             <h2 className="text-4xl font-black tracking-tighter mb-4">THE SQUAD</h2>
             <div className="h-[1px] w-full bg-border" />
           </div>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
             {team.map((member) => (
               <div key={member.name} className="group relative">
                 <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-muted mb-4">
                   <Image 
                     src={member.image} 
                     alt={member.name} 
                     fill 
                     className="object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                   />
                   {/* Overlay Socials */}
                   <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex gap-3 justify-end">
                        <Linkedin className="w-5 h-5 text-white cursor-pointer hover:text-primary" />
                        <Twitter className="w-5 h-5 text-white cursor-pointer hover:text-primary" />
                      </div>
                   </div>
                 </div>
                 <h3 className="text-xl font-bold uppercase tracking-tight">{member.name}</h3>
                 <p className="text-sm text-muted-foreground uppercase tracking-widest">{member.role}</p>
               </div>
             ))}
           </div>
        </div>
      </section>
    </div>
  );
}